/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
  env: {
    API: process.env.API,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    MAGICLINK_PUBLISHABLE_KEY: process.env.MAGICLINK_PUBLISHABLE_KEY,
    HASHCASE_API_KEY: process.env.HASHCASE_API_KEY
  }
}

module.exports = nextConfig
