import React from 'react'
import { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Investor Relations - Partnership Opportunities',
  description: 'Explore investment and partnership opportunities with Dubhe. Connect with our team for strategic partnerships.',
  keywords: [
    'Dubhe investors',
    'blockchain investment',
    'partnership opportunities',
    'strategic partnerships',
    'Move blockchain funding',
    'Web3 investment'
  ],
  openGraph: {
    title: 'Dubhe Investor Relations - Partnership Opportunities',
    description: 'Discover investment and strategic partnership opportunities with the Dubhe ecosystem.',
    url: '/investor',
    type: 'website',
  },
  alternates: {
    canonical: '/investor',
  },
}

export default function InvestorLayout({
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
            "name": "Dubhe Investor Relations",
            "description": "Investment and partnership opportunities in the Dubhe ecosystem",
            "url": "https://dubhe.network/investor",
            "parentOrganization": {
              "@type": "Organization",
              "name": "Dubhe Foundation"
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