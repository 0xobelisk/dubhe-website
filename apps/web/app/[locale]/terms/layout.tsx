import { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Terms of Service - Legal Terms & Conditions',
  description: 'Read the Terms of Service for Dubhe blockchain platform. Legal terms, conditions, and agreements governing the use of Dubhe services and infrastructure.',
  keywords: [
    'terms of service',
    'legal terms',
    'terms and conditions',
    'user agreement',
    'blockchain terms',
    'service agreement',
    'legal compliance',
    'user rights'
  ],
  openGraph: {
    title: 'Dubhe Terms of Service - Legal Terms & Conditions',
    description: 'Legal terms and conditions governing the use of Dubhe blockchain platform and services.',
    url: '/terms',
    type: 'website',
    images: [
      {
        url: '/mediakit/dubhe/png/a.png',
        width: 3821,
        height: 906,
        alt: 'Dubhe Terms of Service',
      },
    ],
  },
  twitter: {
    title: 'Dubhe Terms of Service - Legal Terms & Conditions',
    description: 'Legal terms and conditions governing the use of Dubhe blockchain platform and services.',
    images: ['/mediakit/dubhe/png/a.png'],
  },
  alternates: {
    canonical: '/terms',
  },
}

export default function TermsLayout({
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
            "@type": "WebPage",
            "name": "Terms of Service",
            "description": "Dubhe Foundation terms of service and legal agreements",
            "url": "https://dubhe.obelisk.build/terms",
            "isPartOf": {
              "@type": "WebSite",
              "name": "Dubhe",
              "url": "https://dubhe.obelisk.build"
            },
            "about": {
              "@type": "Thing",
              "name": "Legal Terms and Service Agreements"
            },
            "dateModified": "2025-01-01",
            "inLanguage": "en-US"
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
