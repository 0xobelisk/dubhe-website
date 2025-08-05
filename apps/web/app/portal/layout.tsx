import { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Developer Portal - Tools & Resources',
  description: 'Access the Dubhe Developer Portal with comprehensive tools, documentation, and resources for Move blockchain development.',
  keywords: [
    'Dubhe portal',
    'developer tools',
    'Move development',
    'blockchain portal',
    'developer resources',
    'Web3 tools'
  ],
  openGraph: {
    title: 'Dubhe Developer Portal - Tools & Resources',
    description: 'Comprehensive developer portal with tools and resources for Move blockchain development.',
    url: '/portal',
    type: 'website',
  },
  alternates: {
    canonical: '/portal',
  },
}

export default function PortalLayout({
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
            "name": "Dubhe Developer Portal",
            "description": "Comprehensive developer portal for Move blockchain development",
            "url": "https://dubhe.network/portal",
            "applicationCategory": "DeveloperApplication",
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