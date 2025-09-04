import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { withSentryConfig } from '@sentry/nextjs';
import bundleAnalyzer from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@workspace/ui"],
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    domains: ["images.unsplash.com", "cdn.prod.website-files.com"],
    formats: ['image/avif', 'image/webp'], // Prefer AVIF over WebP
    minimumCacheTTL: 31536000, // 1 year
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Content Security Policy for images
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Disable static imports to reduce build time
    disableStaticImages: false,
    // Enable blur placeholder generation
    dangerouslyAllowSVG: true,
  },
  // Enable compression
  compress: true,
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', '@sentry/nextjs', 'react-countup'],
  },
  // Optimize production builds
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  // Webpack optimizations
  webpack(config, { dev, isServer }) {
    // Optimize bundle size
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 25,
          minSize: 20000,
          cacheGroups: {
            default: false,
            vendors: false,
            // Framework chunks
            framework: {
              name: 'framework',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-sync-external-store)[\\/]/,
              priority: 40,
              enforce: true,
            },
            // Commons chunk for shared code
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 20,
            },
            // Vendor chunks split by package
            lib: {
              test(module: any) {
                return module.size() > 160000 &&
                  /node_modules[\\/]/.test(module.identifier());
              },
              name(module: any) {
                const hash = require('crypto').createHash('sha1');
                hash.update(module.identifier());
                return hash.digest('hex').substring(0, 8);
              },
              priority: 30,
              minChunks: 1,
            },
            // Sentry separate chunk
            sentry: {
              test: /[\\/]node_modules[\\/]@sentry[\\/]/,
              name: 'sentry',
              priority: 35,
              enforce: true,
            },
            // Intl separate chunk
            intl: {
              test: /[\\/]node_modules[\\/]next-intl[\\/]/,
              name: 'intl',
              priority: 35,
              enforce: true,
            },
            // Animation libraries
            motion: {
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              name: 'motion',
              priority: 35,
              enforce: true,
            },
          },
        },
      }
    }
    return config
  },
  // Turbopack configuration
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

// Sentry configuration options
const sentryOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options
  
  silent: process.env.NODE_ENV === 'production', // Suppresses source map uploading logs during build
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  
  // Upload source maps in production for better error tracking
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  hideSourceMaps: true,
  disableLogger: process.env.NODE_ENV === 'production',
  automaticVercelMonitors: true,
}

export default withSentryConfig(withBundleAnalyzer(withNextIntl(nextConfig)), sentryOptions);