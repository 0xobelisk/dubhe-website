import { Unauthorized401 } from '@/components/error-pages'

export default function UnauthorizedPage() {
  return <Unauthorized401 />
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }]
}