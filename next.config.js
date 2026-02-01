/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    return config
  },
  turbopack: {}, // 👈 THIS LINE SILENCES THE ERROR
}

module.exports = nextConfig

