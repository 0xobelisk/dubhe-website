import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  environment: process.env.NODE_ENV,
  
  // Performance Monitoring for server-side
  integrations: [
    // Server-side integrations will be configured automatically
  ],

  // Error Filtering for server
  beforeSend(event, hint) {
    // Filter out development noise
    if (process.env.NODE_ENV === 'development') {
      console.warn('Sentry server event (dev):', hint.originalException)
      return null
    }
    
    return event
  },

  // Set sample rate for profiling
  profilesSampleRate: 0.1,

  // Release information
  release: process.env.VERCEL_GIT_COMMIT_SHA || 'unknown',

  // Server specific options
  debug: process.env.NODE_ENV === 'development',
  
  // Increase max breadcrumbs for better debugging
  maxBreadcrumbs: 100,
})