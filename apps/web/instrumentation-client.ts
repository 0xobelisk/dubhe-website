import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Capture replay sessions on errors
  replaysSessionSampleRate: 0.1, 
  replaysOnErrorSampleRate: 1.0, 

  environment: process.env.NODE_ENV,
  
  // Performance Monitoring
  integrations: [
    Sentry.replayIntegration({
      // Capture text and media is disabled by default for privacy concerns,
      // Enable it based on your use-case
      maskAllText: true,
      blockAllMedia: true,
    }),
    Sentry.browserProfilingIntegration(),
  ],

  // Session Tracking is now handled automatically

  // Error Filtering
  beforeSend(event, hint) {
    // Filter out known issues
    if (event.exception?.values?.[0]?.type === 'ChunkLoadError') {
      return null // Ignore chunk load errors (common with code splitting)
    }
    
    // Filter out localhost errors in development
    if (process.env.NODE_ENV === 'development' && 
        event.request?.url?.includes('localhost')) {
      console.warn('Sentry event filtered in development:', hint.originalException)
      return null
    }
    
    return event
  },

  // Set sample rate for profiling
  profilesSampleRate: 0.1,

  // Release information
  release: process.env.VERCEL_GIT_COMMIT_SHA || 'unknown',
})

export function onRouterTransitionStart() {
  // Required by Sentry for Next.js App Router navigation tracking
}