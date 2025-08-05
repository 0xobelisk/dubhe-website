import { Geist, Geist_Mono } from 'next/font/google';
import type { Metadata, Viewport } from 'next';

import '@workspace/ui/globals.css';
import { Providers } from '@/components/providers';
import ServiceWorkerCleanup from '@/components/sw-cleanup';

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
		process.env.NEXT_PUBLIC_SITE_URL || 'https://dubhe.network'
	),
	title: {
		default: 'Dubhe - Next-Generation Move Blockchain Platform',
		template: '%s | Dubhe'
	},
	description:
		'Dubhe is a revolutionary Move-based blockchain platform offering 80% code auto-generation, real-time P2P channels, and seamless cross-chain interoperability for Web3 developers.',
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
			name: 'Dubhe Foundation',
			url: 'https://dubhe.network'
		}
	],
	creator: 'Dubhe Foundation',
	publisher: 'Dubhe Foundation',
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
		alternateLocale: ['zh_CN', 'ja_JP', 'ko_KR'],
		url: 'https://dubhe.network',
		siteName: 'Dubhe',
		title: 'Dubhe - Next-Generation Move Blockchain Platform',
		description:
			'Revolutionary Move-based blockchain platform with 80% code auto-generation, real-time P2P channels, and cross-chain interoperability.',
		images: [
			{
				url: '/og-image.png',
				width: 1200,
				height: 630,
				alt: 'Dubhe - Move Blockchain Platform',
				type: 'image/png',
			},
			{
				url: '/logo/light.png',
				width: 800,
				height: 400,
				alt: 'Dubhe Logo',
				type: 'image/png',
			}
		],
	},
	twitter: {
		card: 'summary_large_image',
		site: '@DubheNetwork',
		creator: '@DubheNetwork',
		title: 'Dubhe - Next-Generation Move Blockchain Platform',
		description:
			'Revolutionary Move-based blockchain platform with 80% code auto-generation, real-time P2P channels, and cross-chain interoperability.',
		images: ['/og-image.png'],
	},
	verification: {
		google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
		yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
		other: {
			'baidu-site-verification': process.env.NEXT_PUBLIC_BAIDU_VERIFICATION || '',
		}
	},
	alternates: {
		canonical: 'https://dubhe.network',
		languages: {
			'en-US': 'https://dubhe.network',
			'zh-CN': 'https://dubhe.network/zh',
			'ja-JP': 'https://dubhe.network/ja',
			'ko-KR': 'https://dubhe.network/ko',
		}
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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
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
				<link rel="dns-prefetch" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				
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
						
						/* Reduce animations on mobile for performance */
						@media (max-width: 768px) {
							* {
								animation-duration: 0.3s !important;
								transition-duration: 0.3s !important;
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
							"name": "Dubhe Foundation",
							"alternateName": "Dubhe",
							"url": "https://dubhe.network",
							"logo": {
								"@type": "ImageObject",
								"url": "https://dubhe.network/logo/light.png",
								"width": 800,
								"height": 400
							},
							"description": "Revolutionary Move-based blockchain platform with 80% code auto-generation, real-time P2P channels, and cross-chain interoperability.",
							"foundingDate": "2024",
							"sameAs": [
								"https://twitter.com/DubheNetwork",
								"https://github.com/dubhe",
								"https://discord.gg/dubhe",
								"https://t.me/dubhe"
							],
							"hasOfferCatalog": {
								"@type": "OfferCatalog",
								"name": "Dubhe Services",
								"itemListElement": [
									{
										"@type": "Offer",
										"itemOffered": {
											"@type": "SoftwareApplication",
											"name": "Dubhe Engine",
											"description": "Move development platform with code auto-generation"
										}
									},
									{
										"@type": "Offer",
										"itemOffered": {
											"@type": "Service",
											"name": "Foundation Grants",
											"description": "Non-repayable grants for open-source Move projects"
										}
									},
									{
										"@type": "Offer",
										"itemOffered": {
											"@type": "Service",
											"name": "Incubation Program",
											"description": "Collaborative startup incubation with ecosystem partners"
										}
									}
								]
							}
						})
					}}
				/>
			</head>
			<body
				className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased min-h-screen bg-black text-white`}
			>
				<Providers>
					<ServiceWorkerCleanup />
					{children}
				</Providers>
			</body>
		</html>
	);
}
