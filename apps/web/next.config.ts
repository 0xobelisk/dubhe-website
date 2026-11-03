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
  env: {
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN ?? '',
  },
  transpilePackages: ["@workspace/ui"],
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
      },
    ],
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
}

const configuredNext = withBundleAnalyzer(withNextIntl(nextConfig));
export default process.env.NEXT_PUBLIC_SENTRY_DSN
  ? withSentryConfig(configuredNext, sentryOptions)
  : configuredNext;
