'use client'

import { lazy, Suspense, useEffect, useState } from 'react'

const LazyWebVitalsDashboard = lazy(() => import('./web-vitals-dashboard').then(module => ({
  default: module.WebVitalsDashboard
})))

export function DeferredWebVitalsDashboard() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    setEnabled(process.env.NODE_ENV === 'development' || localStorage.getItem('showVitalsDashboard') !== null)
  }, [])

  if (!enabled) return null

  return (
    <Suspense fallback={null}>
      <LazyWebVitalsDashboard />
    </Suspense>
  )
}
