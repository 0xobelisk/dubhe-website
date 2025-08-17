import { Forbidden403 } from '@/components/error-pages'

export default function ForbiddenPage() {
  return <Forbidden403 />
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }]
}