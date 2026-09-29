import { NextResponse } from 'next/server'
import { fetchAcfOptions, normalizePath } from '@/functions/acfOptions'

/**
 * Affiliate redirects (/recommends/...) are resolved at request time from the
 * ACF "Affiliates" options page and served as temporary (307) redirects, so an
 * edit in WordPress goes live within TTL_MS without a rebuild and browsers
 * never cache the destination.
 */
export const config = {
  matcher: ['/recommends/:path*'],
}

const TTL_MS = 60 * 1000

let rules = null
let fetchedAt = 0
let inflight = null

function refresh() {
  if (!inflight) {
    inflight = fetchAcfOptions()
      .then((acf) => {
        const map = new Map()
        for (const rule of acf?.affiliates ?? []) {
          if (rule?.source && rule?.destination) {
            map.set(normalizePath(rule.source), rule.destination.trim())
          }
        }
        rules = map
        fetchedAt = Date.now()
        return map
      })
      .catch((error) => {
        console.error('[affiliates] failed to refresh redirect rules', error)
        return rules
      })
      .finally(() => {
        inflight = null
      })
  }
  return inflight
}

async function getRules() {
  const fresh = rules && Date.now() - fetchedAt < TTL_MS
  if (fresh) return rules
  if (rules) {
    // Stale-while-revalidate: answer from the cached copy, refresh in background
    refresh()
    return rules
  }
  return refresh()
}

export async function middleware(request) {
  const map = await getRules()
  const destination = map?.get(normalizePath(request.nextUrl.pathname))

  if (!destination) {
    return NextResponse.next()
  }

  const response = NextResponse.redirect(new URL(destination, request.url), 307)
  response.headers.set('cache-control', 'no-store')
  return response
}
