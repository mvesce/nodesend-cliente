/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    backendURL: 'http://localhost:4000',
    frontEndURL: 'http://localhost:3000'
  }
}

module.exports = nextConfig
