import { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Dubhe Foundation - Building the Future of Decentralized Computing',
  description: 'Dubhe ecosystem information, open-source development and community programs. Legal status and funding terms await confirmation.',
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
    description: 'Dubhe ecosystem information, open-source development and community programs. Legal status and funding terms await confirmation.',
    url: '/foundation',
    type: 'website',
    images: [
      {
        url: '/mediakit/dubhe/png/a.png',
        width: 3821,
        height: 906,
        alt: 'Dubhe Foundation - Decentralized Computing',
      },
    ],
  },
  twitter: {
    title: 'Dubhe Foundation - Building the Future of Decentralized Computing',
    description: 'Dubhe ecosystem information, open-source development and community programs. Legal status and funding terms await confirmation.',
    images: ['/mediakit/dubhe/png/a.png'],
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
            "description": "Dubhe ecosystem information, open-source development and community programs. Legal status and funding terms await confirmation.",
            "url": "https://dubhe.obelisk.build/foundation",
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
                "description": "Dubhe ecosystem information, open-source development and community programs. Legal status and funding terms await confirmation."
              },
              {
                "@type": "Thing",
                "name": "Research",
                "description": "Dubhe ecosystem information, open-source development and community programs. Legal status and funding terms await confirmation."
              },
              {
                "@type": "Thing",
                "name": "Ecosystem development",
                "description": "Dubhe ecosystem information, open-source development and community programs. Legal status and funding terms await confirmation."
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
