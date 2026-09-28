/**
 * Amazon Creators API client (replacement for the retired Product
 * Advertising API). Server-side only: used from getStaticProps to fill in
 * name, image and price for Amazon Product blocks.
 *
 * Results are cached in memory for an hour so pages revalidating every few
 * minutes do not hit Amazon on every rebuild, while prices stay current.
 */
const TOKEN_URL = 'https://api.amazon.com/auth/o2/token'
const GET_ITEMS_URL = 'https://creatorsapi.amazon/catalog/v1/getItems'
const MARKETPLACE = 'www.amazon.com'
const BATCH_SIZE = 10
const ITEM_TTL_MS = 60 * 60 * 1000
const TIMEOUT_MS = 8000

let token = null
let tokenExpiresAt = 0
const itemCache = new Map()

function isConfigured() {
  return Boolean(
    process.env.AMAZON_CREATORS_CREDENTIAL_ID &&
      process.env.AMAZON_CREATORS_CREDENTIAL_SECRET &&
      process.env.AMAZON_PARTNER_TAG
  )
}

async function postJson(url, body, headers = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...headers },
      body: JSON.stringify(body),
      signal: controller.signal,
    })
    const data = await response.json().catch(() => null)
    if (!response.ok) {
      throw new Error(
        `${response.status} ${JSON.stringify(data)?.slice(0, 300) ?? ''}`
      )
    }
    return data
  } finally {
    clearTimeout(timer)
  }
}

async function getToken() {
  if (token && Date.now() < tokenExpiresAt) return token

  const data = await postJson(TOKEN_URL, {
    grant_type: 'client_credentials',
    client_id: process.env.AMAZON_CREATORS_CREDENTIAL_ID,
    client_secret: process.env.AMAZON_CREATORS_CREDENTIAL_SECRET,
    scope: 'creatorsapi::default',
  })

  token = data.access_token
  // Refresh a minute before Amazon's expiry
  tokenExpiresAt = Date.now() + ((data.expires_in ?? 3600) - 60) * 1000
  return token
}

function normalizeItem(item) {
  const image = item.images?.primary?.large
  const listing = item.offersV2?.listings?.[0]
  const amount = listing?.price?.money?.amount

  return {
    title: item.itemInfo?.title?.displayValue ?? null,
    image: image?.url
      ? {
          sourceUrl: image.url,
          altText: item.itemInfo?.title?.displayValue ?? '',
          mediaDetails: { width: image.width, height: image.height },
        }
      : null,
    price: typeof amount === 'number' ? amount.toFixed(2) : null,
    detailPageURL: item.detailPageURL ?? null,
  }
}

async function fetchBatch(asins) {
  const accessToken = await getToken()
  const data = await postJson(
    GET_ITEMS_URL,
    {
      itemIds: asins,
      itemIdType: 'ASIN',
      marketplace: MARKETPLACE,
      partnerTag: process.env.AMAZON_PARTNER_TAG,
      resources: [
        'itemInfo.title',
        'images.primary.large',
        'offersV2.listings.price',
      ],
    },
    { authorization: `Bearer ${accessToken}`, 'x-marketplace': MARKETPLACE }
  )

  return data?.itemsResult?.items ?? []
}

/**
 * Looks up ASINs and returns a Map of ASIN -> { title, image, price,
 * detailPageURL }. Never throws: on any failure the affected ASINs are simply
 * missing from the map and the page falls back to CMS fields.
 */
export async function getAmazonItems(asinList = []) {
  const result = new Map()
  if (!isConfigured()) return result

  const now = Date.now()
  const asins = [...new Set(asinList.map((a) => a?.trim()).filter(Boolean))]
  const missing = []

  for (const asin of asins) {
    const cached = itemCache.get(asin)
    if (cached && cached.expiresAt > now) {
      if (cached.item) result.set(asin, cached.item)
    } else {
      missing.push(asin)
    }
  }

  for (let i = 0; i < missing.length; i += BATCH_SIZE) {
    const batch = missing.slice(i, i + BATCH_SIZE)
    try {
      const items = await fetchBatch(batch)
      const found = new Map(items.map((item) => [item.asin, item]))

      for (const asin of batch) {
        const item = found.has(asin) ? normalizeItem(found.get(asin)) : null
        itemCache.set(asin, { item, expiresAt: now + ITEM_TTL_MS })
        if (item) result.set(asin, item)
      }
    } catch (error) {
      console.error(`[amazon] lookup failed for ${batch.join(',')}`, error)
    }
  }

  return result
}
