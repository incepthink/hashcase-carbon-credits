/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API: process.env.API,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    MAGICLINK_PUBLISHABLE_KEY: process.env.MAGICLINK_PUBLISHABLE_KEY,
    HASHCASE_API_KEY: process.env.HASHCASE_API_KEY
  }
}

module.exports = nextConfig
