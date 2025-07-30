/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@workspace/ui"],
  images: {
    domains: ["images.unsplash.com"],
  },
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['css-loader'],
        as: '*.css',
      },
    },
  },
}

export default nextConfig
