/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add any custom webpack config if needed
  webpack: (config) => {
    return config;
  },
}

module.exports = nextConfig;
