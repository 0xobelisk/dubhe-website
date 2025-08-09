import React from 'react'
import { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Dubhe Engine - High-Performance Move Virtual Machine',
  description: 'Experience lightning-fast smart contract execution with Dubhe Engine. Built on Move VM with advanced optimization, parallel processing, and developer-friendly tools.',
  keywords: [
    'Dubhe Engine',
    'Move virtual machine',
    'smart contract execution',
    'blockchain VM',
    'Move VM optimization',
    'parallel processing',
    'high-performance blockchain',
    'Move smart contracts'
  ],
  openGraph: {
    title: 'Dubhe Engine - High-Performance Move Virtual Machine',
    description: 'Lightning-fast smart contract execution with advanced optimization and parallel processing capabilities.',
    url: '/engine',
    type: 'website',
    images: [
      {
        url: '/og-engine.png',
        width: 1200,
        height: 630,
        alt: 'Dubhe Engine - Move Virtual Machine',
      },
    ],
  },
  twitter: {
    title: 'Dubhe Engine - High-Performance Move Virtual Machine',
    description: 'Lightning-fast smart contract execution with advanced optimization and parallel processing capabilities.',
    images: ['/og-engine.png'],
  },
  alternates: {
    canonical: '/engine',
  },
}

export default function EngineLayout({
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
            "@type": "SoftwareApplication",
            "name": "Dubhe Engine",
            "description": "High-performance Move virtual machine for smart contract execution",
            "url": "https://dubhe.network/engine",
            "applicationCategory": "Blockchain Infrastructure",
            "operatingSystem": "Cross-platform",
            "provider": {
              "@type": "Organization",
              "name": "Dubhe Foundation"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock"
            },
            "featureList": [
              "Move VM execution",
              "Parallel processing",
              "Gas optimization",
              "Developer tools",
              "Security auditing"
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