import React from 'react'
import { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Startup Incubation - Collaborative Ecosystem Program',
  description: 'Join our collaborative incubation ecosystem supported by Dubhe Foundation, partnered with Obelisk Mesh and leading Move ecosystem companies. Build the next unicorn startup.',
  keywords: [
    'startup incubation',
    'Dubhe Foundation incubation',
    'Obelisk Mesh partnership',
    'Move startup accelerator',
    'blockchain startup funding',
    'Web3 incubator',
    'cryptocurrency startup',
    'DeFi startup incubation'
  ],
  openGraph: {
    title: 'Dubhe Foundation Incubation - Collaborative Startup Ecosystem',
    description: 'Partner with Dubhe Foundation, Obelisk Mesh, and ecosystem companies to build the next generation of Move startups.',
    url: '/incubation',
    type: 'website',
    images: [
      {
        url: '/og-incubation.png',
        width: 1200,
        height: 630,
        alt: 'Dubhe Foundation Incubation Program',
      },
    ],
  },
  twitter: {
    title: 'Dubhe Foundation Incubation - Collaborative Startup Ecosystem',
    description: 'Partner with Dubhe Foundation, Obelisk Mesh, and ecosystem companies to build the next generation of Move startups.',
    images: ['/og-incubation.png'],
  },
  alternates: {
    canonical: '/incubation',
  },
}

export default function IncubationLayout({
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
            "@type": "EducationalOrganization",
            "name": "Dubhe Foundation Incubation",
            "description": "Collaborative startup incubation program for Move blockchain companies",
            "url": "https://dubhe.network/incubation",
            "founder": {
              "@type": "Organization",
              "name": "Dubhe Foundation"
            },
            "partner": [
              {
                "@type": "Organization",
                "name": "Obelisk Mesh",
                "description": "Technical infrastructure partner"
              }
            ],
            "offers": [
              {
                "@type": "Course",
                "name": "Foundation Accelerator",
                "description": "3-month intensive program with Foundation funding and Obelisk Mesh support",
                "provider": {
                  "@type": "Organization",
                  "name": "Dubhe Foundation"
                }
              },
              {
                "@type": "Course",
                "name": "Collaborative Studio",
                "description": "6-12 month co-building program with ecosystem companies",
                "provider": {
                  "@type": "Organization",
                  "name": "Dubhe Foundation"
                }
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