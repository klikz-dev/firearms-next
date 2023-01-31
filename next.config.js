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
      'https://firearms-wp.klikz.us/wp-json/acf/v3/options/options'
    )
    const data = await response.json()
    const { redirects, affiliates } = data?.acf ?? {}

    const rules = [...redirects, ...affiliates].filter(
      (rule) => rule.source && rule.destination
    )

    return rules
  },
  async rewrites() {
    const response = await fetch(
      'https://firearms-wp.klikz.us/wp-json/acf/v3/options/options'
    )
    const data = await response.json()
    const { rewrites } = data?.acf ?? {}

    return rewrites.filter((rule) => rule.source && rule.destination) ?? []
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
