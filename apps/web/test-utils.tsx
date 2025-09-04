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
    engine: 'Engine',
    channel: 'Channel',
    os: 'OS',
    foundation: 'Foundation',
    labs: 'Labs',
    grants: 'Grants',
    incubation: 'Incubation',
    proposal: 'Proposal',
    ambassador: 'Ambassador',
    moderators: 'Moderators',
    events: 'Events',
    contact: 'Contact',
    mediaKit: 'Media Kit',
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
      description: 'Architecture Description',
      keyMetrics: 'Key Metrics',
      moveEcosystemFeatures: 'Move Ecosystem Features',
      architectureLayers: {
        moveApplications: {
          title: 'Move Applications',
          subtitle: 'Decentralized Applications',
          description: 'Build powerful dApps with Move',
          features: ['Smart Contracts', 'DeFi', 'Gaming', 'NFTs']
        },
        dubheEngine: {
          title: 'Dubhe Engine',
          subtitle: 'High-Performance Blockchain',
          description: 'Scalable and secure blockchain infrastructure',
          features: ['High Throughput', 'Low Latency', 'Secure']
        },
        dubheChannel: {
          title: 'Dubhe Channel',
          subtitle: 'Cross-chain Communication',
          description: 'Seamless interoperability',
          features: ['Bridge', 'Messaging', 'Asset Transfer']
        },
        dubheOS: {
          title: 'Dubhe OS',
          subtitle: 'Operating System',
          description: 'Complete blockchain OS',
          features: ['SDK', 'Tools', 'Runtime']
        }
      }
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
  },
  mediaKit: {
    hero: {
      badge: 'Brand Resources',
      title1: 'Dubhe',
      title2: 'Media Kit',
      subtitle: 'Download our brand assets, guidelines, and resources for partnerships, media coverage, and community content.',
      downloadPack: 'Download Brand Pack'
    },
    logo: {
      title: 'Logo & Brand Assets',
      subtitle: 'Our logo represents the innovation and reliability of the Dubhe blockchain platform.',
      availableFormats: 'Available formats',
      download: 'Download',
      dos: {
        title: 'Logo Usage Guidelines',
        item1: 'Use original logo files without modification',
        item2: 'Maintain minimum clear space around logo',
        item3: 'Use on high contrast backgrounds',
        item4: 'Ensure proper scaling and proportions'
      },
      donts: {
        title: 'Logo Usage Restrictions',
        hide: 'Hide restrictions',
        show: 'Show restrictions',
        item1: 'Don\'t stretch, distort, or modify the logo',
        item2: 'Don\'t use low resolution or pixelated versions',
        item3: 'Don\'t place on busy or low contrast backgrounds',
        item4: 'Don\'t recreate the logo with different fonts'
      }
    },
    clearspace: {
      title: 'Clear Space Guidelines',
      subtitle: 'Maintain proper spacing around the Dubhe logo to ensure visual impact and brand recognition.',
      minimum: 'Minimum Clear Space',
      description: 'The Dubhe logo should always be surrounded by clear space to maintain its visual integrity and impact.',
      specifications: 'Technical Specifications',
      spec1: 'Minimum clear space: 1x logo height on all sides',
      spec2: 'For digital use: minimum 32px height recommended',
      spec3: 'For print use: minimum 0.5 inch height recommended'
    },
    symbol: {
      title: 'Symbol & Mark',
      subtitle: 'The Dubhe symbol can be used independently when the full logo is not suitable or space is limited.',
      meaning: {
        title: 'Symbol Meaning',
        description: 'The Dubhe symbol represents the constellation that guides navigation, symbolizing our role in guiding developers through the blockchain ecosystem with reliable and innovative tools.'
      },
      usage: {
        standalone: 'Standalone Usage',
        standaloneDesc: 'Use when space is limited or brand recognition is established',
        app: 'App Icons',
        appDesc: 'Perfect for mobile apps, favicons, and small format applications'
      }
    },
    partnership: {
      title: 'Partnership Guidelines',
      subtitle: 'Guidelines for co-branding and partnership materials to ensure consistent brand presentation.',
      cobranding: 'Co-branding Example',
      partnerLogo: 'Partner Logo',
      spacing: {
        title: 'Logo Spacing Rules',
        rule1: 'Maintain equal visual weight between logos',
        rule2: 'Use separator line or adequate white space',
        rule3: 'Align logos on the same baseline'
      },
      approval: {
        title: 'Partnership Approval',
        description: 'All partnership and co-branding materials require approval from the Dubhe team before publication.',
        contact: 'Contact for Approval'
      }
    },
    colors: {
      title: 'Color Palette',
      subtitle: 'Our color system creates a cohesive and accessible brand experience across all touchpoints.',
      base: {
        title: 'Base Colors'
      },
      primary: {
        title: 'Primary Brand Colors'
      }
    },
    typography: {
      title: 'Typography',
      subtitle: 'Our typography system ensures consistent and readable communication across all brand materials.',
      primary: {
        title: 'Primary Typeface',
        description: 'Geist Sans is our primary typeface for all brand communications'
      },
      mono: {
        title: 'Monospace Typeface',
        description: 'Geist Mono is used for code, technical documentation, and developer content'
      },
      scale: {
        title: 'Typography Scale'
      }
    },
    download: {
      title: 'Download Resources',
      subtitle: 'Access all brand assets, guidelines, and resources in one convenient package.',
      pack: {
        title: 'Complete Brand Pack',
        description: 'Includes logos, color palettes, typography guidelines, and usage examples in multiple formats.',
        button: 'Download Brand Pack'
      },
      contact: {
        description: 'Need custom assets or have questions?',
        button: 'Contact Our Team'
      }
    }
  },
  errors: {
    status: {
      404: '404',
      401: '401',
      403: '403',
      429: '429',
      500: '500',
      502: '502',
      503: '503'
    },
    common: {
      goHome: 'Go Home',
      goBack: 'Go Back',
      tryAgain: 'Try Again',
      contactSupport: 'Contact Support'
    },
    notFound: {
      title: 'Page Not Found',
      description: 'The page you are looking for does not exist or has been moved.',
      suggestion: 'Don\'t worry, let\'s get you back on track.',
      suggestions: {
        title: 'Popular Pages'
      },
      actions: {
        home: 'Go Home',
        back: 'Go Back',
        report: 'Report broken link'
      }
    },
    serverError: {
      title: 'Server Error',
      description: 'An error occurred on our side.',
      suggestion: 'Our team has been notified and is working on a fix.'
    },
    unauthorized: {
      title: 'Authentication Required',
      description: 'You need to be logged in to access this page.',
      suggestion: 'Please log in with your credentials.'
    },
    forbidden: {
      title: 'Access Forbidden',
      description: 'You do not have permission to access this resource.',
      suggestion: 'Please check your credentials or contact the administrator.'
    },
    rateLimited: {
      title: 'Too Many Requests',
      description: 'You\'re making requests too quickly. Please slow down.',
      suggestion: 'Wait a moment before trying again.'
    },
    serviceUnavailable: {
      title: 'Service Unavailable',
      description: 'We\'re temporarily under maintenance.',
      suggestion: 'We\'ll be back online shortly. Thank you for your patience!'
    },
    badGateway: {
      title: 'Bad Gateway',
      description: 'There\'s an issue with our server connection.',
      suggestion: 'This is usually temporary. Please try again in a few moments.'
    }
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