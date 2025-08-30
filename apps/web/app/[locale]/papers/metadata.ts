import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Technical Papers - Dubhe Whitepaper & Lightpaper',
  description: 'Explore Dubhe\'s technical architecture and implementation details through our comprehensive whitepaper and lightpaper. Learn about our Move-based blockchain infrastructure, consensus mechanisms, and ecosystem design.',
  keywords: [
    'Dubhe whitepaper',
    'Dubhe lightpaper',
    'technical documentation',
    'Move blockchain',
    'blockchain architecture',
    'consensus mechanisms',
    'Web3 documentation',
    'smart contract platform',
    'DeFi infrastructure',
    'decentralized applications',
    'technical papers'
  ],
  openGraph: {
    title: 'Dubhe Technical Papers - Whitepaper & Lightpaper',
    description: 'Comprehensive technical documentation of Dubhe\'s Move-based blockchain architecture, consensus mechanisms, and ecosystem design.',
    url: '/papers',
    type: 'website',
    images: [
      {
        url: '/og-papers.png',
        width: 1200,
        height: 630,
        alt: 'Dubhe Technical Papers - Whitepaper and Lightpaper',
      },
    ],
  },
  twitter: {
    title: 'Dubhe Technical Papers - Whitepaper & Lightpaper',
    description: 'Comprehensive technical documentation of Dubhe\'s Move-based blockchain architecture, consensus mechanisms, and ecosystem design.',
    images: ['/og-papers.png'],
  },
  alternates: {
    canonical: '/papers',
  },
}