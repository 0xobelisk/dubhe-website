import { BadGateway502 } from '@/components/error-pages'

export default function BadGatewayPage() {
  return <BadGateway502 />
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }]
}