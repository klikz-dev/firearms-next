/**
 * Shared access to the WordPress ACF options endpoint that stores the
 * redirect, rewrite and affiliate rules. Used by next.config.js (build time)
 * and middleware.js (request time), so it must stay CommonJS and free of
 * Node-only APIs.
 */
const ACF_OPTIONS_URL =
  'https://cms.americanfirearms.org/wp-json/acf/v3/options/options'

function normalizePath(path) {
  if (!path || typeof path !== 'string') return ''
  let normalized = path.trim()
  if (normalized.length > 1 && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1)
  }
  return normalized
}

async function fetchAcfOptions() {
  const response = await fetch(ACF_OPTIONS_URL, {
    headers: { accept: 'application/json' },
  })
  if (!response.ok) {
    throw new Error(`ACF options request failed with ${response.status}`)
  }
  const data = await response.json()
  return data?.acf ?? {}
}

let affiliatesPromise = null

/**
 * Resolves an affiliate source path (e.g. /recommends/foo) to its destination
 * URL using the ACF Affiliates options page, cached for the life of the
 * process (one fetch per build). Returns null when there is no rule.
 */
async function getAffiliateDestination(source) {
  const key = normalizePath(source)
  if (!key.startsWith('/recommends')) return null

  if (!affiliatesPromise) {
    affiliatesPromise = fetchAcfOptions()
      .then((options) => {
        const map = new Map()
        for (const rule of options?.affiliates ?? []) {
          if (rule?.source && rule?.destination) {
            map.set(normalizePath(rule.source), rule.destination.trim())
          }
        }
        return map
      })
      .catch((error) => {
        console.error('[affiliates] lookup unavailable', error)
        affiliatesPromise = null
        return new Map()
      })
  }

  const map = await affiliatesPromise
  return map.get(key) ?? null
}

module.exports = {
  ACF_OPTIONS_URL,
  normalizePath,
  fetchAcfOptions,
  getAffiliateDestination,
}
