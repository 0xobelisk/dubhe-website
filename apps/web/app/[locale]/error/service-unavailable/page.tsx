import { ServiceUnavailable503 } from '@/components/error-pages'

export default function ServiceUnavailablePage() {
  return <ServiceUnavailable503 />
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }]
}