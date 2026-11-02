import { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Dubhe Proposals - Decentralized Governance System',
  description: 'Dubhe governance information. Historical rules and example referenda await verification; examples are not live treasury or voting data.',
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
    description: 'Dubhe governance information. Historical rules and example referenda await verification; examples are not live treasury or voting data.',
    url: '/proposal',
    type: 'website',
    images: [
      {
        url: '/mediakit/dubhe/png/a.png',
        width: 3821,
        height: 906,
        alt: 'Dubhe Proposals - Decentralized Governance',
      },
    ],
  },
  twitter: {
    title: 'Dubhe Proposals - Decentralized Governance System',
    description: 'Dubhe governance information. Historical rules and example referenda await verification; examples are not live treasury or voting data.',
    images: ['/mediakit/dubhe/png/a.png'],
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
            "description": "Dubhe governance information. Historical rules and example referenda await verification; examples are not live treasury or voting data.",
            "url": "https://dubhe.obelisk.build/proposal",
            "provider": {
              "@type": "Organization",
              "name": "Dubhe Foundation"
            },
            "serviceType": "Decentralized Governance",
            "areaServed": "Global",
            "availableChannel": {
              "@type": "ServiceChannel",
              "name": "DubheOS Governance Portal",
              "description": "Dubhe governance information. Historical rules and example referenda await verification; examples are not live treasury or voting data."
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Governance Proposals",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "name": "Treasury Proposals",
                  "description": "Dubhe governance information. Historical rules and example referenda await verification; examples are not live treasury or voting data."
                },
                {
                  "@type": "Offer",
                  "name": "Runtime Upgrades",
                  "description": "Dubhe governance information. Historical rules and example referenda await verification; examples are not live treasury or voting data."
                },
                {
                  "@type": "Offer",
                  "name": "Governance Changes",
                  "description": "Dubhe governance information. Historical rules and example referenda await verification; examples are not live treasury or voting data."
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
