/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@workspace/ui"],
  images: {
    domains: ["images.unsplash.com"],
  },
}

export default nextConfig
