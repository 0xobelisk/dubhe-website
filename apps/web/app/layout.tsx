import { Geist, Geist_Mono } from 'next/font/google';
import type { Metadata, Viewport } from 'next';

import '@workspace/ui/globals.css';
import { Providers } from '@/components/providers';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

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
		process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
	),
	title: 'Dubhe Engine | Professional Game Development Platform',
	description:
		'Dubhe Engine is a powerful, versatile game engine designed for creators who want to bring their visions to life with advanced tools and workflows.',
	openGraph: {
		title: 'Dubhe Engine | Professional Game Development Platform',
		description:
			'Dubhe Engine is a powerful, versatile game engine designed for creators who want to bring their visions to life with advanced tools and workflows.',
		url: new URL(
			process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
		),
		siteName: 'Dubhe Engine',
		images: [
			{
				url: '/manifest-icon-512.png',
				alt: 'Dubhe Engine Logo',
			},
		],
		type: 'website',
	},
};

export const viewport: Viewport = {
	themeColor: '#fff',
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
					href="/favicon.ico"
					media="(prefers-color-scheme: dark)"
				/>
			</head>
			<body
				className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased min-h-screen flex flex-col bg-black text-white`}
			>
				<Providers>
					<Navbar />
					<div className="flex-1">{children}</div>
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
