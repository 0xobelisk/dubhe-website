import { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Foundation Grants - Open Source Funding Program',
  description: 'Dubhe ecosystem grant information. Historical terms and funding availability await confirmation; contact the team for current details.',
  keywords: [
    'Dubhe Foundation grants',
    'open source funding',
    'Move blockchain grants',
    'non-repayable grants',
    'blockchain development funding',
    'Web3 grants',
    'smart contract funding',
    'DeFi project grants'
  ],
  openGraph: {
    title: 'Dubhe Foundation Grants - Open Source Funding',
    description: 'Dubhe ecosystem grant information. Historical terms and funding availability await confirmation; contact the team for current details.',
    url: '/grants',
    type: 'website',
    images: [
      {
        url: '/mediakit/dubhe/png/a.png',
        width: 3821,
        height: 906,
        alt: 'Dubhe Foundation Grants Program',
      },
    ],
  },
  twitter: {
    title: 'Dubhe Foundation Grants - Open Source Funding',
    description: 'Dubhe ecosystem grant information. Historical terms and funding availability await confirmation; contact the team for current details.',
    images: ['/mediakit/dubhe/png/a.png'],
  },
  alternates: {
    canonical: '/grants',
  },
}

export default function GrantsLayout({
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
            "@type": "FinancialProduct",
            "name": "Dubhe Foundation Grants",
            "description": "Dubhe ecosystem grant information. Historical terms and funding availability await confirmation; contact the team for current details.",
            "provider": {
              "@type": "Organization",
              "name": "Dubhe Foundation",
              "url": "https://dubhe.obelisk.build"
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
