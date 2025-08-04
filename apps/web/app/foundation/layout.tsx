import { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Dubhe Foundation - Building the Future of Decentralized Computing',
  description: 'Learn about Dubhe Foundation, a non-profit organization dedicated to advancing decentralized computing, funding open-source projects, and supporting blockchain innovation.',
  keywords: [
    'Dubhe Foundation',
    'blockchain foundation',
    'decentralized computing',
    'open source funding',
    'blockchain research',
    'Web3 foundation',
    'non-profit blockchain',
    'ecosystem development'
  ],
  openGraph: {
    title: 'Dubhe Foundation - Building the Future of Decentralized Computing',
    description: 'Non-profit organization advancing decentralized computing through research, funding, and ecosystem development.',
    url: '/foundation',
    type: 'website',
    images: [
      {
        url: '/og-foundation.png',
        width: 1200,
        height: 630,
        alt: 'Dubhe Foundation - Decentralized Computing',
      },
    ],
  },
  twitter: {
    title: 'Dubhe Foundation - Building the Future of Decentralized Computing',
    description: 'Non-profit organization advancing decentralized computing through research, funding, and ecosystem development.',
    images: ['/og-foundation.png'],
  },
  alternates: {
    canonical: '/foundation',
  },
}

export default function FoundationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Dubhe Foundation",
            "description": "Non-profit organization dedicated to advancing decentralized computing and blockchain innovation",
            "url": "https://dubhe.network/foundation",
            "foundingDate": "2023",
            "legalName": "Dubhe Foundation",
            "organizationType": "Non-profit",
            "areaServed": "Worldwide",
            "knowsAbout": [
              "Blockchain technology",
              "Decentralized computing",
              "Open source development",
              "Web3 innovation"
            ],
            "mission": "To advance decentralized computing through research, funding, and ecosystem development",
            "activity": [
              {
                "@type": "Thing",
                "name": "Grant funding",
                "description": "Providing grants to open-source blockchain projects"
              },
              {
                "@type": "Thing",
                "name": "Research",
                "description": "Supporting blockchain and decentralized computing research"
              },
              {
                "@type": "Thing",
                "name": "Ecosystem development",
                "description": "Building and nurturing the Dubhe ecosystem"
              }
            ]
          })
        }}
      />
      <Navigation />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
    </>
  )
}