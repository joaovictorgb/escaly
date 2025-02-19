/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'firebasestorage.googleapis.com'],
  },
  env: {
    API_URL: process.env.API_URL,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
      bodySizeLimit: '2mb'
    }
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig 