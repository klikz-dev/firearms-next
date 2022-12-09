/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  images: {
    domains: process.env.NEXT_PUBLIC_IMAGE_DOMAINS.split('|'),
  },
}

module.exports = nextConfig
