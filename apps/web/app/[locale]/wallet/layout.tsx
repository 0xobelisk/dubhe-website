import React from 'react'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'wallet.meta' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'Dubhe Wallet',
      'Move wallet',
      'Sui wallet',
      'production wallet',
      'wallet security',
      'permission management',
      'high-value execution'
    ],
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: '/wallet',
      type: 'website'
    },
    twitter: {
      title: t('title'),
      description: t('description')
    },
    alternates: {
      canonical: '/wallet'
    }
  }
}

export default async function WalletLayout({
  children,
  params,
}: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'wallet.meta' })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: t('name'),
            description: t('description'),
            url: 'https://dubhe.network/wallet',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web',
            provider: {
              '@type': 'Organization',
              name: 'Dubhe Foundation'
            },
            featureList: [0, 1, 2, 3].map((index) => t(`featureList.${index}`))
          })
        }}
      />
      <Navigation />
      <main className="pt-16">{children}</main>
      <Footer />
    </>
  )
}
