// Optimized Sentry imports - only import what we need
export {
  // Core functionality
  init,
  captureException,
  captureMessage,
  captureEvent,
  
  // Breadcrumbs and context
  addBreadcrumb,
  setUser,
  setContext,
  setTag,
  setTags,
  setExtra,
  setExtras,
  
  // Integrations
  replayIntegration,
  browserProfilingIntegration,
  
  // Types
  type Breadcrumb,
  type Event,
  type EventHint,
} from '@sentry/nextjs'

// Helper functions for common operations
export function logError(error: Error, context?: Record<string, unknown>) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { captureException, setContext } = require('@sentry/nextjs')
  if (context) {
    setContext('error_context', context)
  }
  captureException(error)
}

export function logMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { captureMessage } = require('@sentry/nextjs')
  captureMessage(message, level)
}

export async function trackPerformance(name: string, fn: () => void | Promise<void>) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { addBreadcrumb } = require('@sentry/nextjs')
  const startTime = Date.now()
  
  try {
    addBreadcrumb({
      category: 'performance',
      message: `Start: ${name}`,
      level: 'info',
    })
    
    const result = await fn()
    
    const duration = Date.now() - startTime
    addBreadcrumb({
      category: 'performance',
      message: `Complete: ${name} (${duration}ms)`,
      level: 'info',
      data: { duration }
    })
    
    return result
  } catch (error) {
    const duration = Date.now() - startTime
    addBreadcrumb({
      category: 'performance',
      message: `Failed: ${name} (${duration}ms)`,
      level: 'error',
      data: { duration }
    })
    throw error
  }
}