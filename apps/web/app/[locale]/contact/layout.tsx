import { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch with Dubhe Team',
  description: 'Contact the Dubhe team about technical support, ecosystem programs and general inquiries.',
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
    description: 'Contact the Dubhe team about technical support, ecosystem programs and general inquiries.',
    url: '/contact',
    type: 'website',
    images: [
      {
        url: '/mediakit/dubhe/png/a.png',
        width: 3821,
        height: 906,
        alt: 'Contact Dubhe Foundation',
      },
    ],
  },
  twitter: {
    title: 'Contact Dubhe - Get in Touch with Our Team',
    description: 'Contact the Dubhe team about technical support, ecosystem programs and general inquiries.',
    images: ['/mediakit/dubhe/png/a.png'],
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
            "description": "Contact the Dubhe team about technical support, ecosystem programs and general inquiries.",
            "url": "https://dubhe.obelisk.build/contact",
            "mainEntity": {
              "@type": "Organization",
              "name": "Dubhe Foundation",
              "email": "hello@dubhe.network",
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "contactType": "Customer Service",
                  "email": "hello@obelisk.build",
                  "availableLanguage": ["English"]
                },
                {
                  "@type": "ContactPoint", 
                  "contactType": "Business Development",
                  "email": "dubhe@obelisk.build",
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
