import React from 'react'
import { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Privacy Policy - Data Protection & Security',
  description: 'Learn how Dubhe Foundation protects your privacy and handles your data with transparency and security. Comprehensive privacy policy and data protection practices.',
  keywords: [
    'privacy policy',
    'data protection',
    'security',
    'GDPR compliance',
    'personal information',
    'blockchain privacy',
    'data security',
    'user rights'
  ],
  openGraph: {
    title: 'Dubhe Privacy Policy - Data Protection & Security',
    description: 'Transparent data practices and comprehensive privacy protection for the Dubhe ecosystem.',
    url: '/privacy',
    type: 'website',
    images: [
      {
        url: '/og-privacy.png',
        width: 1200,
        height: 630,
        alt: 'Dubhe Privacy Policy',
      },
    ],
  },
  twitter: {
    title: 'Dubhe Privacy Policy - Data Protection & Security',
    description: 'Transparent data practices and comprehensive privacy protection for the Dubhe ecosystem.',
    images: ['/og-privacy.png'],
  },
  alternates: {
    canonical: '/privacy',
  },
}

export default function PrivacyLayout({
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
            "name": "Privacy Policy",
            "description": "Dubhe Foundation privacy policy and data protection practices",
            "url": "https://dubhe.network/privacy",
            "isPartOf": {
              "@type": "WebSite",
              "name": "Dubhe",
              "url": "https://dubhe.network"
            },
            "about": {
              "@type": "Thing",
              "name": "Data Privacy and Protection"
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