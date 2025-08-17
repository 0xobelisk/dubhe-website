import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Foundation Grants - Open Source Funding Program',
  description: 'Apply for non-repayable grants from Dubhe Foundation. Fund your open-source Move projects with up to $100K. All projects must complete milestones and use MIT/Apache licenses.',
  keywords: [
    'Dubhe Foundation grants',
    'open source funding',
    'Move blockchain grants',
    'non-repayable grants',
    'blockchain development funding',
    'Web3 grants',
    'smart contract funding',
    'DeFi project grants'
  ],
  openGraph: {
    title: 'Dubhe Foundation Grants - Open Source Funding',
    description: 'Get non-repayable grants up to $100K for open-source Move projects. Complete milestones and contribute to the Dubhe ecosystem.',
    url: '/grants',
    type: 'website',
    images: [
      {
        url: '/og-grants.png',
        width: 1200,
        height: 630,
        alt: 'Dubhe Foundation Grants Program',
      },
    ],
  },
  twitter: {
    title: 'Dubhe Foundation Grants - Open Source Funding',
    description: 'Get non-repayable grants up to $100K for open-source Move projects. Complete milestones and contribute to the Dubhe ecosystem.',
    images: ['/og-grants.png'],
  },
  alternates: {
    canonical: '/grants',
  },
}