const { removeDuplicates } = require('./functions/removeDuplicates')
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
  async redirects() {
    const response = await fetch(
      'https://cms.americanfirearms.org/wp-json/acf/v3/options/options'
    )
    const data = await response.json()
    const { redirects, affiliates } = data?.acf ?? {}

    const rules =
      [...redirects, ...affiliates]
        .filter((rule) => rule.source && rule.destination)
        .map((rule) => {
          let source = rule.source
          let destination = rule.destination

          if (source[source.length - 1] === '/' && source !== '/') {
            source = source.substring(0, source.length - 1)
          }

          if (
            destination[destination.length - 1] === '/' &&
            destination !== '/'
          ) {
            destination = destination.substring(0, destination.length - 1)
          }

          return {
            source: source,
            destination: destination,
            permanent: rule.permanent,
          }
        }) ?? []

    return removeDuplicates(rules)
  },
  async rewrites() {
    const response = await fetch(
      'https://cms.americanfirearms.org/wp-json/acf/v3/options/options'
    )
    const data = await response.json()
    const { rewrites } = data?.acf ?? {}

    const rules =
      rewrites
        .filter((rule) => rule.source && rule.destination)
        .map((rule) => {
          let source = rule.source
          let destination = rule.destination

          if (source[source.length - 1] === '/' && source !== '/') {
            source = source.substring(0, source.length - 1)
          }

          if (
            destination[destination.length - 1] === '/' &&
            destination !== '/'
          ) {
            destination = destination.substring(0, destination.length - 1)
          }

          return {
            source: source,
            destination: destination,
          }
        }) ?? []

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
