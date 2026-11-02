import { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'DubheOS - Decentralized Operating System',
  description: 'Experience the future with DubheOS, a blockchain-native operating system. Built for Web3, featuring decentralized governance, native DeFi integration, and seamless dApp execution.',
  keywords: [
    'DubheOS',
    'decentralized operating system',
    'blockchain OS',
    'Web3 operating system',
    'decentralized governance',
    'native DeFi',
    'dApp execution',
    'blockchain native OS'
  ],
  openGraph: {
    title: 'DubheOS - Decentralized Operating System',
    description: 'The first blockchain-native OS with decentralized governance, native DeFi integration, and seamless Web3 experience.',
    url: '/os',
    type: 'website',
    images: [
      {
        url: '/mediakit/dubhe/png/a.png',
        width: 3821,
        height: 906,
        alt: 'DubheOS - Decentralized Operating System',
      },
    ],
  },
  twitter: {
    title: 'DubheOS - Decentralized Operating System',
    description: 'The first blockchain-native OS with decentralized governance, native DeFi integration, and seamless Web3 experience.',
    images: ['/mediakit/dubhe/png/a.png'],
  },
  alternates: {
    canonical: '/os',
  },
}

export default function OSLayout({
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
            "name": "DubheOS",
            "description": "Decentralized operating system built for Web3 with blockchain-native features",
            "url": "https://dubhe.obelisk.build/os",
            "applicationCategory": "Operating System",
            "operatingSystem": "DubheOS",
            "provider": {
              "@type": "Organization",
              "name": "Dubhe Foundation"
            },
            "featureList": [
              "Decentralized governance",
              "Native DeFi integration",
              "Seamless dApp execution",
              "Blockchain-native architecture",
              "Web3 user experience"
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
