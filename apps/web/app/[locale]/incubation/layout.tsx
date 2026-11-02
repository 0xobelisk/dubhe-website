import { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Startup Incubation - Collaborative Ecosystem Program',
  description: 'Dubhe ecosystem incubation information. Historical program terms and external partner commitments await confirmation.',
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
    description: 'Dubhe ecosystem incubation information. Historical program terms and external partner commitments await confirmation.',
    url: '/incubation',
    type: 'website',
    images: [
      {
        url: '/mediakit/dubhe/png/a.png',
        width: 3821,
        height: 906,
        alt: 'Dubhe Foundation Incubation Program',
      },
    ],
  },
  twitter: {
    title: 'Dubhe Foundation Incubation - Collaborative Startup Ecosystem',
    description: 'Dubhe ecosystem incubation information. Historical program terms and external partner commitments await confirmation.',
    images: ['/mediakit/dubhe/png/a.png'],
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
            "description": "Dubhe ecosystem incubation information. Historical program terms and external partner commitments await confirmation.",
            "url": "https://dubhe.obelisk.build/incubation",
            "founder": {
              "@type": "Organization",
              "name": "Dubhe Foundation"
            },
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
