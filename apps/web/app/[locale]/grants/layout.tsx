import React from 'react'
import { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Foundation Grants - Open Source Funding Program',
  description: 'Apply for non-repayable grants from Dubhe Foundation. Fund your open-source Move projects with up to $100K. All projects must complete milestones and use MIT/Apache licenses.',
  keywords: [
    'Dubhe Foundation grants',
    'open source funding',
    'Move blockchain grants',
    'non-repayable grants',
    'blockchain development funding',
    'Web3 grants',
    'smart contract funding',
    'DeFi project grants'
  ],
  openGraph: {
    title: 'Dubhe Foundation Grants - Open Source Funding',
    description: 'Get non-repayable grants up to $100K for open-source Move projects. Complete milestones and contribute to the Dubhe ecosystem.',
    url: '/grants',
    type: 'website',
    images: [
      {
        url: '/og-grants.png',
        width: 1200,
        height: 630,
        alt: 'Dubhe Foundation Grants Program',
      },
    ],
  },
  twitter: {
    title: 'Dubhe Foundation Grants - Open Source Funding',
    description: 'Get non-repayable grants up to $100K for open-source Move projects. Complete milestones and contribute to the Dubhe ecosystem.',
    images: ['/og-grants.png'],
  },
  alternates: {
    canonical: '/grants',
  },
}

export default function GrantsLayout({
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
            "name": "Dubhe Foundation Grants",
            "description": "Non-repayable grants for open-source Move blockchain projects",
            "provider": {
              "@type": "Organization",
              "name": "Dubhe Foundation",
              "url": "https://dubhe.network"
            },
            "offers": {
              "@type": "Offer",
              "name": "Foundation Grant",
              "description": "Up to $100K non-repayable grant for open-source projects",
              "eligibilityRequirement": [
                "Open source commitment (MIT/Apache 2.0 license)",
                "Detailed milestone-based development plan",
                "Fully functional deliverables"
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