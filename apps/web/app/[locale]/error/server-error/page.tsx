'use client'

import { useTranslations } from 'next-intl'
import { ErrorPage } from '@/components/error-pages'

export default function ServerErrorPage() {
  const t = useTranslations('errors')
  return (
    <ErrorPage
      statusCode={500}
      title={t('500.title')}
      description={t('500.description')}
      suggestion={t('500.suggestion')}
      showRetry={true}
      showHome={true}
      showContact={true}
      onRetry={() => window.location.reload()}
    />
  )
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }]
}
