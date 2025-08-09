import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Adjust this value in production
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  environment: process.env.NODE_ENV,
  
  // Edge runtime specific config
  beforeSend(event, hint) {
    // Filter out development noise
    if (process.env.NODE_ENV === 'development') {
      console.warn('Sentry edge event (dev):', hint.originalException)
      return null
    }
    
    return event
  },

  // Release information
  release: process.env.VERCEL_GIT_COMMIT_SHA || 'unknown',

  // Keep edge runtime lightweight
  debug: false,
})