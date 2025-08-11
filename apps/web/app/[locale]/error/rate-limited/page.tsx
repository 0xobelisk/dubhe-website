import { RateLimited429 } from '@/components/error-pages'

export default function RateLimitedPage() {
  return <RateLimited429 />
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }]
}