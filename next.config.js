const { removeDuplicates } = require('./functions/removeDuplicates')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  images: {
    domains: process.env.NEXT_PUBLIC_IMAGE_DOMAINS.split('|'),
  },
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
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    })
    return config
  },
}

module.exports = nextConfig
