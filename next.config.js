/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'storage.googleapis.com'], // Ajuste conforme necessário
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