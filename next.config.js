/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    backendURL: 'https://mv-nodesend-server.herokuapp.com/',
    frontEndURL: 'https://nodesend-cliente-mvesce.vercel.app/'
  }
}

module.exports = nextConfig
