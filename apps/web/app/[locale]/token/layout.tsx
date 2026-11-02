import { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'DUBHE Token - Governance & Utility Token',
  description: 'Historical DUBHE and STARS token design. Supply, allocation, rewards and current availability await confirmation.',
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
    description: 'Historical DUBHE and STARS token design. Supply, allocation, rewards and current availability await confirmation.',
    url: '/token',
    type: 'website',
    images: [
      {
        url: '/mediakit/dubhe/png/a.png',
        width: 3821,
        height: 906,
        alt: 'DUBHE Token - Governance & Utility',
      },
    ],
  },
  twitter: {
    title: 'DUBHE Token - Governance & Utility Token',
    description: 'Historical DUBHE and STARS token design. Supply, allocation, rewards and current availability await confirmation.',
    images: ['/mediakit/dubhe/png/a.png'],
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
            "description": "Historical DUBHE and STARS token design. Supply, allocation, rewards and current availability await confirmation.",
            "url": "https://dubhe.obelisk.build/token",
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
