/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  reactStrictMode: true,
  env:{
    apiKey: "AIzaSyCq1x-cq2RI-ypRLQJq1FvC8_-_ILwQzHU",
  }
}

module.exports = nextConfig
