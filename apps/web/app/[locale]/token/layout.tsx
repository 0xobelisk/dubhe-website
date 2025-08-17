import React from 'react'
import { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'DUBHE Token - Governance & Utility Token',
  description: 'Discover DUBHE token, the native governance and utility token of the Dubhe ecosystem. Stake, vote, pay fees, and participate in decentralized governance.',
  keywords: [
    'DUBHE token',
    'governance token',
    'utility token',
    'staking rewards',
    'blockchain governance',
    'DeFi token',
    'voting rights',
    'tokenomics'
  ],
  openGraph: {
    title: 'DUBHE Token - Governance & Utility Token',
    description: 'The native token powering the Dubhe ecosystem with governance, staking, and utility features.',
    url: '/token',
    type: 'website',
    images: [
      {
        url: '/og-token.png',
        width: 1200,
        height: 630,
        alt: 'DUBHE Token - Governance & Utility',
      },
    ],
  },
  twitter: {
    title: 'DUBHE Token - Governance & Utility Token',
    description: 'The native token powering the Dubhe ecosystem with governance, staking, and utility features.',
    images: ['/og-token.png'],
  },
  alternates: {
    canonical: '/token',
  },
}

export default function TokenLayout({
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
            "@type": "FinancialProduct",
            "name": "DUBHE Token",
            "description": "Native governance and utility token of the Dubhe blockchain ecosystem",
            "url": "https://dubhe.network/token",
            "provider": {
              "@type": "Organization",
              "name": "Dubhe Foundation"
            },
            "category": "Cryptocurrency",
            "featureList": [
              "Governance voting",
              "Staking rewards",
              "Transaction fees",
              "Cross-chain bridging",
              "Ecosystem participation"
            ],
            "additionalProperty": [
              {
                "@type": "PropertyValue",
                "name": "Token Type",
                "value": "Utility & Governance"
              },
              {
                "@type": "PropertyValue",
                "name": "Blockchain",
                "value": "Dubhe Network"
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