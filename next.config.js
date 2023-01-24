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

    return [...redirects, ...affiliates]
  },
  async rewrites() {
    const response = await fetch(
      'https://firearms-wp.klikz.us/wp-json/acf/v3/options/options'
    )
    const data = await response.json()
    const { rewrites } = data?.acf ?? {}

    return rewrites ?? []
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
