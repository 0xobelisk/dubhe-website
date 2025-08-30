import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'

// Mock messages for testing - comprehensive coverage
const mockMessages = {
  navigation: {
    learn: 'Learn',
    build: 'Build',
    ecosystem: 'Ecosystem',
    media: 'Media',
    community: 'Community',
    documentation: 'Documentation',
    papers: 'Papers',
    openMenu: 'Open Menu',
    closeMenu: 'Close Menu'
  },
  home: {
    features: {
      title: 'Features',
      mainTitle: 'Main Title',
      moveCompatible: {
        title: 'Move Compatible',
        description: 'Compatible with Move language'
      },
      zeroGas: {
        title: 'Zero Gas',
        description: 'No gas fees'
      },
      realTime: {
        title: 'Real Time'
      },
      unlimited: {
        title: 'Unlimited',
        subtitle: 'Subtitle',
        description: 'Unlimited description'
      },
      syncFinality: {
        title: 'Sync Finality'
      }
    },
    hero: {
      title: 'Hero Title',
      subtitle: 'Hero Subtitle',
      description: 'Hero Description'
    },
    networkArchitecture: {
      title: 'Network Architecture',
      description: 'Architecture Description'
    }
  },
  papers: {
    hero: {
      badge: 'Technical Documentation',
      title: 'Technical Papers',
      subtitle: 'Explore Dubhe\'s technical architecture and implementation details through our comprehensive documentation.'
    },
    whitepaper: {
      title: 'Whitepaper',
      description: 'Comprehensive technical overview of Dubhe\'s architecture, consensus mechanisms, and ecosystem design.',
      downloadLabel: 'Download Whitepaper'
    },
    lightpaper: {
      title: 'Lightpaper',
      description: 'Concise overview of Dubhe\'s key features, use cases, and technical innovations.',
      downloadLabel: 'Download Lightpaper'
    },
    openInNewTab: 'Opens in new tab'
  },
  common: {
    learnMore: 'Learn More',
    getStarted: 'Get Started',
    loading: 'Loading...',
    error: 'Error occurred'
  }
}

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextIntlClientProvider locale="en" messages={mockMessages}>
      {children}
    </NextIntlClientProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): ReturnType<typeof render> => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }