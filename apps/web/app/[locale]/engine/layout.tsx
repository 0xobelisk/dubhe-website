import { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Dubhe Engine - High-Performance Move Virtual Machine',
  description: 'Dubhe Engine provides schema-based Move development tooling, code generation and application libraries.',
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
    description: 'Dubhe Engine provides schema-based Move development tooling, code generation and application libraries.',
    url: '/engine',
    type: 'website',
    images: [
      {
        url: '/mediakit/dubhe/png/a.png',
        width: 3821,
        height: 906,
        alt: 'Dubhe Engine - Move Virtual Machine',
      },
    ],
  },
  twitter: {
    title: 'Dubhe Engine - High-Performance Move Virtual Machine',
    description: 'Dubhe Engine provides schema-based Move development tooling, code generation and application libraries.',
    images: ['/mediakit/dubhe/png/a.png'],
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
            "description": "Dubhe Engine provides schema-based Move development tooling, code generation and application libraries.",
            "url": "https://dubhe.obelisk.build/engine",
            "applicationCategory": "Blockchain Infrastructure",
            "operatingSystem": "Cross-platform",
            "provider": {
              "@type": "Organization",
              "name": "Dubhe Foundation"
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
