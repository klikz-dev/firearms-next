const { removeDuplicates } = require('./functions/removeDuplicates')
const { fetchAcfOptions, normalizePath } = require('./functions/acfOptions')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  images: {
    domains: process.env.NEXT_PUBLIC_IMAGE_DOMAINS.split('|'),
  },
  compress: true,
  // The CMS and product API slow down under the load of a full build; give
  // each page up to 3 minutes before Next.js gives up on it (default 60s).
  staticPageGenerationTimeout: 180,
  async redirects() {
    // Affiliate (/recommends) rules are served at request time by
    // middleware.js so that edits in WordPress go live without a rebuild.
    // Only the "Redirects" options page is compiled in here.
    const { redirects } = await fetchAcfOptions()

    const rules = (redirects ?? [])
      .filter((rule) => rule.source && rule.destination)
      .map((rule) => ({
        source: normalizePath(rule.source),
        destination: normalizePath(rule.destination),
        permanent: Boolean(rule.permanent),
      }))

    return removeDuplicates(rules)
  },
  async rewrites() {
    const { rewrites } = await fetchAcfOptions()

    const rules = (rewrites ?? [])
      .filter((rule) => rule.source && rule.destination)
      .map((rule) => ({
        source: normalizePath(rule.source),
        destination: normalizePath(rule.destination),
      }))

    return removeDuplicates(rules)
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    })
    if (!isServer) {
      config.resolve.alias['@apollo/client'] = false
    }
    return config
  },
}

module.exports = withBundleAnalyzer(nextConfig)
