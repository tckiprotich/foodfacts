/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Increase this to whatever size you need
    },
  },
}

module.exports = nextConfig
