import { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Community Events - Conferences & Meetups',
  description: 'Discover upcoming Dubhe community events, conferences, and meetups. Connect with the Move blockchain community worldwide.',
  keywords: [
    'Dubhe events',
    'blockchain conferences',
    'Move meetups',
    'community events',
    'Web3 conferences',
    'blockchain networking'
  ],
  openGraph: {
    title: 'Dubhe Community Events - Conferences & Meetups',
    description: 'Join upcoming community events, conferences, and meetups to connect with the Move blockchain ecosystem.',
    url: '/events',
    type: 'website',
  },
  alternates: {
    canonical: '/events',
  },
}

export default function EventsLayout({
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
            "@type": "EventSeries",
            "name": "Dubhe Community Events",
            "description": "Series of blockchain conferences, meetups, and community events",
            "url": "https://dubhe.network/events",
            "organizer": {
              "@type": "Organization",
              "name": "Dubhe Foundation"
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