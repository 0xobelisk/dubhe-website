import { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Developer Portal - Tools & Resources',
  description: 'Example rewards interface. Balances, dates and addresses are sample data, not a verified account balance or payment record.',
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
    description: 'Example rewards interface. Balances, dates and addresses are sample data, not a verified account balance or payment record.',
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
            "description": "Example rewards interface. Balances, dates and addresses are sample data, not a verified account balance or payment record.",
            "url": "https://dubhe.obelisk.build/portal",
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
