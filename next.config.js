/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'api.mapbox.com', 'res.cloudinary.com'],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'gsap'],
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // Enable standalone output for Firebase deployment
  output: 'standalone',
}

module.exports = withNextIntl(nextConfig);
