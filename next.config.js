/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'api.mapbox.com', 'res.cloudinary.com', 'www.digitalsilk.com'],
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // Enable standalone output for Firebase deployment
  output: 'standalone',
  // Serve /favicon.ico as /favicon.png without using middleware (avoids middleware-manifest race in dev)
  async rewrites() {
    return [{ source: '/favicon.ico', destination: '/favicon.png' }]
  },
}

module.exports = withNextIntl(nextConfig);
