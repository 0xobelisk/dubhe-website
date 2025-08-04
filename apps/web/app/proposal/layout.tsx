import { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Dubhe Proposals - Decentralized Governance System',
  description: 'Participate in Dubhe governance through DubheOS proposals. Submit treasury requests, runtime upgrades, and governance changes using Polkadot GOV2 framework.',
  keywords: [
    'Dubhe proposals',
    'decentralized governance',
    'treasury proposals',
    'Polkadot GOV2',
    'DubheOS governance',
    'blockchain voting',
    'governance participation',
    'referendum system'
  ],
  openGraph: {
    title: 'Dubhe Proposals - Decentralized Governance System',
    description: 'Shape the future of Dubhe through decentralized governance. Submit proposals and participate in community voting.',
    url: '/proposal',
    type: 'website',
    images: [
      {
        url: '/og-proposal.png',
        width: 1200,
        height: 630,
        alt: 'Dubhe Proposals - Decentralized Governance',
      },
    ],
  },
  twitter: {
    title: 'Dubhe Proposals - Decentralized Governance System',
    description: 'Shape the future of Dubhe through decentralized governance. Submit proposals and participate in community voting.',
    images: ['/og-proposal.png'],
  },
  alternates: {
    canonical: '/proposal',
  },
}

export default function ProposalLayout({
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
            "@type": "GovernmentService",
            "name": "Dubhe Governance System",
            "description": "Decentralized governance platform for Dubhe ecosystem proposals and voting",
            "url": "https://dubhe.network/proposal",
            "provider": {
              "@type": "Organization",
              "name": "Dubhe Foundation"
            },
            "serviceType": "Decentralized Governance",
            "areaServed": "Global",
            "availableChannel": {
              "@type": "ServiceChannel",
              "name": "DubheOS Governance Portal",
              "description": "Submit and vote on proposals through DubheOS"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Governance Proposals",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "name": "Treasury Proposals",
                  "description": "Request funding from Dubhe Treasury"
                },
                {
                  "@type": "Offer",
                  "name": "Runtime Upgrades",
                  "description": "Protocol and system upgrades"
                },
                {
                  "@type": "Offer",
                  "name": "Governance Changes",
                  "description": "Modifications to governance parameters"
                }
              ]
            }
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