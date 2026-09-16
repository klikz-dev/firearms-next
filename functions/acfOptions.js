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

module.exports = { ACF_OPTIONS_URL, normalizePath, fetchAcfOptions }
