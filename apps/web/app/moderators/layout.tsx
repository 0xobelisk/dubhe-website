import { Metadata } from 'next'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Community Moderators - Discord & Support Team',
  description: 'Meet the Dubhe community moderators and support team. Join our Discord community for help and engagement.',
  keywords: [
    'Dubhe moderators',
    'community support',
    'Discord moderators',
    'community team',
    'blockchain support',
    'Web3 community'
  ],
  openGraph: {
    title: 'Dubhe Community Moderators - Support Team',
    description: 'Meet our community moderators and support team helping users in the Dubhe ecosystem.',
    url: '/moderators',
    type: 'website',
  },
  alternates: {
    canonical: '/moderators',
  },
}

export default function ModeratorsLayout({
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
            "@type": "Organization",
            "name": "Dubhe Community Moderators",
            "description": "Community support and moderation team for Dubhe ecosystem",
            "url": "https://dubhe.network/moderators",
            "parentOrganization": {
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