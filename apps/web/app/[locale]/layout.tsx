import { Geist, Geist_Mono } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '../../i18n/routing';

import '@workspace/ui/globals.css';
import { Providers } from '@/components/providers';
import ServiceWorkerCleanup from '@/components/sw-cleanup';
import { ErrorBoundary } from '@/components/error-boundary';
import { WebVitals } from '@/components/web-vitals';
import { ServiceWorkerProvider } from '@/components/service-worker-provider';
import { WebVitalsDashboard } from '@/components/web-vitals-dashboard';

const fontSans = Geist({
	subsets: ['latin'],
	variable: '--font-sans',
});

const fontMono = Geist_Mono({
	subsets: ['latin'],
	variable: '--font-mono',
});

export const metadata: Metadata = {
	metadataBase: new URL(
		process.env.NEXT_PUBLIC_SITE_URL || 'https://dubhe.obelisk.build'
	),
	title: {
		default: 'Dubhe - Next-Generation Move Blockchain Platform',
		template: '%s | Dubhe'
	},
	description:
		'Dubhe provides Move development tooling and infrastructure developed by Obelisk Labs. Dubhe Wallet supports wallet and identity workflows. Numeron is a separate game in development.',
	keywords: [
		'Dubhe',
		'Move blockchain',
		'Web3 development',
		'DeFi',
		'smart contracts',
		'cross-chain',
		'P2P channels',
		'code generation',
		'OpenGov',
		'treasury funding',
		'incubation',
		'grants'
	],
	authors: [
		{
			name: 'Obelisk Labs',
			url: 'https://dubhe.obelisk.build'
		}
	],
	creator: 'Obelisk Labs',
	publisher: 'Obelisk Labs',
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	openGraph: {
		type: 'website',
		locale: 'en_US',
		alternateLocale: routing.locales.filter(locale => locale !== "en"),
		url: 'https://dubhe.obelisk.build',
		siteName: 'Dubhe',
		title: 'Dubhe - Next-Generation Move Blockchain Platform',
		description:
			'Dubhe provides Move development tooling and infrastructure developed by Obelisk Labs. Dubhe Wallet supports wallet and identity workflows. Numeron is a separate game in development.',
		images: [
			{
				url: '/mediakit/dubhe/png/a.png',
				width: 3821,
				height: 906,
				alt: 'Dubhe - Move Blockchain Platform',
				type: 'image/png',
			},
			{
				url: '/logo/light.png',
				width: 3821,
				height: 906,
				alt: 'Dubhe Logo',
				type: 'image/png',
			}
		],
	},
	twitter: {
		card: 'summary_large_image',
		site: '@DubheEngine',
		creator: '@DubheEngine',
		title: 'Dubhe - Next-Generation Move Blockchain Platform',
		description:
			'Dubhe provides Move development tooling and infrastructure developed by Obelisk Labs. Dubhe Wallet supports wallet and identity workflows. Numeron is a separate game in development.',
		images: ['/mediakit/dubhe/png/a.png'],
	},
	verification: {
		google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
		yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
		other: {
			'baidu-site-verification': process.env.NEXT_PUBLIC_BAIDU_VERIFICATION || '',
		}
	},
	alternates: {
		canonical: 'https://dubhe.obelisk.build',
		languages: Object.fromEntries(routing.locales.map(locale => [locale, `https://dubhe.obelisk.build/${locale}`]))
	},
	category: 'Technology',
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 5,
	userScalable: true,
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#ffffff' },
		{ media: '(prefers-color-scheme: dark)', color: '#0f172a' }
	],
};

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export default async function LocaleLayout({
  children,
  params
}: Props) {
  const {locale} = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="/favicon-black.ico"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          href="/favicon-white.ico"
          media="(prefers-color-scheme: dark)"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="msapplication-TileColor" content="#6366f1" />
        <meta name="theme-color" content="#6366f1" />
        
        {/* Performance Optimizations for Core Web Vitals */}
        <link rel="preload" href="/logo/light.png" as="image" type="image/png" />
        <link rel="preload" href="/marketing/logos/move-white.svg" as="image" type="image/svg+xml" />
        
        {/* DNS Prefetch for external domains */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://cdn.prod.website-files.com" />
        
        {/* Preconnect to critical third-party services */}
        <link rel="preconnect" href="https://o1293971.ingest.sentry.io" />
        
        {/* Prefetch critical routes */}
        <link rel="prefetch" href="/" as="document" />
        <link rel="prefetch" href="/foundation" as="document" />
        <link rel="prefetch" href="/grants" as="document" />
        
        {/* Prevent layout shift and optimize animations */}
        <style dangerouslySetInnerHTML={{
          __html: `
            html { scroll-behavior: smooth; }
            body { min-height: 100vh; }
            /* Prevent FOUC (Flash of Unstyled Content) */
            .loading { opacity: 0; }
            .loaded { opacity: 1; transition: opacity 0.3s ease-in-out; }
            /* Optimize animations for performance */
            * { backface-visibility: hidden; }
            [data-motion] { will-change: transform; }
            /* Improve text rendering */
            body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
            
            /* Mobile optimizations */
            .mobile-touch-target {
              min-height: 44px;
              min-width: 44px;
              touch-action: manipulation;
            }
            
            /* Optimize only heavy animations on mobile for performance */
            @media (max-width: 768px) {
              /* Only reduce duration for performance-heavy animations */
              .floating-cube,
              [data-motion="heavy"] {
                animation-duration: 0.5s !important;
              }
              /* Keep normal durations for UI interactions */
              button, a, .hover\\:* {
                transition-duration: 0.2s !important;
              }
            }
            
            /* Respect user's motion preferences */
            @media (prefers-reduced-motion: reduce) {
              * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
              }
            }
            
            /* Improve touch scrolling on iOS */
            * {
              -webkit-overflow-scrolling: touch;
            }
            
            /* Prevent zoom on input focus on iOS */
            @media screen and (max-width: 768px) {
              input, textarea, select {
                font-size: 16px !important;
              }
            }
          `
        }} />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Dubhe",
              "alternateName": "Dubhe",
              "url": "https://dubhe.obelisk.build",
              "logo": {
                "@type": "ImageObject",
                "url": "https://dubhe.obelisk.build/mediakit/dubhe/png/a.png",
                "width": 3821,
                "height": 906
              },
              "description": "Dubhe provides Move development tooling and infrastructure developed by Obelisk Labs. Dubhe Wallet supports wallet and identity workflows. Numeron is a separate game in development.",
              "sameAs": [
                "https://x.com/DubheEngine",
                "https://github.com/0xobelisk/dubhe",
                "https://discord.gg/J76zPyGWau",
                "https://t.me/dubheengine"
              ],
            })
          }}
        />
      </head>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased min-h-screen bg-black text-white`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ErrorBoundary>
            <Providers>
              <WebVitals />
              <WebVitalsDashboard />
              <ServiceWorkerProvider />
              <ServiceWorkerCleanup />
              {children}
            </Providers>
          </ErrorBoundary>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
