"use client"

import { useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'

export function reportWebVitals({ id, name, label, value }: {
  id: string
  name: string
  label: string
  value: number
}) {
  // Send Web Vitals to Sentry
  Sentry.addBreadcrumb({
    category: 'web-vital',
    message: name,
    level: 'info',
    data: {
      id,
      name,
      label,
      value,
    },
  })

  // Log performance metrics
  if (name === 'CLS' || name === 'FID' || name === 'FCP' || name === 'LCP' || name === 'TTFB') {
    // Note: Transaction API has changed in newer Sentry versions

    // Also send as custom event for better tracking
    Sentry.captureMessage(`Web Vital: ${name}`, {
      level: 'info',
      tags: {
        'web-vital': name,
      },
      extra: {
        id,
        value,
        label,
        rating: getRating(name, value),
      },
    })
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vital] ${name}:`, value)
  }
}

// Helper function to determine performance rating
function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const thresholds: Record<string, [number, number]> = {
    CLS: [0.1, 0.25],
    FID: [100, 300],
    FCP: [1800, 3000],
    LCP: [2500, 4000],
    TTFB: [800, 1800],
  }

  const [good, needsImprovement] = thresholds[name] || [0, 0]
  
  if (value <= good) return 'good'
  if (value <= needsImprovement) return 'needs-improvement'
  return 'poor'
}

export default function WebVitalsReporter() {
  useEffect(() => {
    // Track page views
    Sentry.captureMessage('Page View', {
      level: 'info',
      tags: {
        page: window.location.pathname,
      },
    })
  }, [])

  return null
}