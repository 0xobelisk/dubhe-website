import { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Dubhe Channel - Decentralized Communication Network',
  description: 'Connect through Dubhe Channel, a secure, decentralized communication infrastructure. Experience peer-to-peer messaging, encrypted channels, and Web3 social networking.',
  keywords: [
    'Dubhe Channel',
    'decentralized communication',
    'peer-to-peer messaging',
    'encrypted channels',
    'Web3 social network',
    'blockchain communication',
    'secure messaging',
    'decentralized networking'
  ],
  openGraph: {
    title: 'Dubhe Channel - Decentralized Communication Network',
    description: 'Secure peer-to-peer communication with encrypted channels and Web3 social networking capabilities.',
    url: '/channel',
    type: 'website',
    images: [
      {
        url: '/og-channel.png',
        width: 1200,
        height: 630,
        alt: 'Dubhe Channel - Decentralized Communication',
      },
    ],
  },
  twitter: {
    title: 'Dubhe Channel - Decentralized Communication Network',
    description: 'Secure peer-to-peer communication with encrypted channels and Web3 social networking capabilities.',
    images: ['/og-channel.png'],
  },
  alternates: {
    canonical: '/channel',
  },
}

export default function ChannelLayout({
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
            "name": "Dubhe Channel",
            "description": "Decentralized communication network with encrypted messaging and Web3 social features",
            "url": "https://dubhe.network/channel",
            "applicationCategory": "Communication",
            "operatingSystem": "Cross-platform",
            "provider": {
              "@type": "Organization",
              "name": "Dubhe Foundation"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock"
            },
            "featureList": [
              "Peer-to-peer messaging",
              "End-to-end encryption",
              "Decentralized channels",
              "Web3 social networking",
              "Privacy protection"
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