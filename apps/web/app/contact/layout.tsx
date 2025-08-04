import { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch with Dubhe Team',
  description: 'Contact Dubhe Foundation for partnerships, grants, technical support, or general inquiries. We respond within 24-48 hours to all messages.',
  keywords: [
    'contact Dubhe',
    'Dubhe support',
    'business inquiries',
    'partnership',
    'technical support',
    'grant applications',
    'investor relations',
    'media inquiries'
  ],
  openGraph: {
    title: 'Contact Dubhe - Get in Touch with Our Team',
    description: 'Reach out to Dubhe Foundation for partnerships, grants, technical support, or any questions about our platform.',
    url: '/contact',
    type: 'website',
    images: [
      {
        url: '/og-contact.png',
        width: 1200,
        height: 630,
        alt: 'Contact Dubhe Foundation',
      },
    ],
  },
  twitter: {
    title: 'Contact Dubhe - Get in Touch with Our Team',
    description: 'Reach out to Dubhe Foundation for partnerships, grants, technical support, or any questions about our platform.',
    images: ['/og-contact.png'],
  },
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactLayout({
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
            "@type": "ContactPage",
            "name": "Contact Dubhe Foundation",
            "description": "Get in touch with Dubhe Foundation for partnerships, grants, and support",
            "url": "https://dubhe.network/contact",
            "mainEntity": {
              "@type": "Organization",
              "name": "Dubhe Foundation",
              "email": "hello@dubhe.network",
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "contactType": "Customer Service",
                  "email": "hello@dubhe.network",
                  "availableLanguage": ["English"]
                },
                {
                  "@type": "ContactPoint", 
                  "contactType": "Business Development",
                  "email": "business@dubhe.network",
                  "availableLanguage": ["English"]
                }
              ]
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