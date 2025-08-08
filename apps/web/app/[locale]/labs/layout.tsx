import { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Development Labs - Innovation Hub',
  description: 'Explore cutting-edge research and development projects at Dubhe Labs. Building the future of Move blockchain technology.',
  keywords: [
    'Dubhe Labs',
    'blockchain research',
    'Move development',
    'innovation lab',
    'R&D projects',
    'blockchain technology'
  ],
  openGraph: {
    title: 'Dubhe Development Labs - Innovation Hub',
    description: 'Cutting-edge research and development projects building the future of Move blockchain.',
    url: '/labs',
    type: 'website',
  },
  alternates: {
    canonical: '/labs',
  },
}

export default function LabsLayout({
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
            "@type": "ResearchOrganization",
            "name": "Dubhe Development Labs",
            "description": "Innovation hub for Move blockchain research and development",
            "url": "https://dubhe.network/labs",
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