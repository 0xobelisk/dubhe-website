import React from 'react'
import { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Ambassador Program - Community Leadership',
  description: 'Join the Dubhe Ambassador Program and become a community leader. Help grow the Move ecosystem and earn rewards.',
  keywords: [
    'Dubhe Ambassador',
    'community program',
    'blockchain ambassador',
    'Move ecosystem',
    'community leadership',
    'Web3 ambassador'
  ],
  openGraph: {
    title: 'Dubhe Ambassador Program - Community Leadership',
    description: 'Become a community leader and help grow the Move ecosystem through the Dubhe Ambassador Program.',
    url: '/ambassador',
    type: 'website',
  },
  alternates: {
    canonical: '/ambassador',
  },
}

export default function AmbassadorLayout({
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
            "@type": "ProfessionalService",
            "name": "Dubhe Ambassador Program",
            "description": "Community leadership program for Move blockchain ecosystem growth",
            "url": "https://dubhe.network/ambassador",
            "provider": {
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