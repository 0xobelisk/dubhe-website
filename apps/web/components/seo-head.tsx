"use client"

import Head from 'next/head'

interface SEOHeadProps {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  ogType?: string
  structuredData?: object
}

export default function SEOHead({
  title,
  description,
  keywords = [],
  canonical,
  ogImage = '/og-image.png',
  ogType = 'website',
  structuredData
}: SEOHeadProps) {
  const fullTitle = `${title} | Dubhe`
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dubhe.network'
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : baseUrl

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={`${baseUrl}${ogImage}`} />
      <meta property="og:site_name" content="Dubhe" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@DubheNetwork" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}${ogImage}`} />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
    </Head>
  )
}