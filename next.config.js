/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      }
    ],
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
}

module.exports = nextConfig 