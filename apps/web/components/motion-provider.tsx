'use client'

import type { ReactNode } from 'react'
import { LazyMotion } from 'framer-motion'

// Keep hydration and native event handlers immediate. Animation features can
// wait for a rendering opportunity instead of competing with the first paint.
const loadMotionFeatures = () => new Promise<void>(resolve => {
  if (typeof window === 'undefined') {
    resolve()
  } else if (typeof window.requestIdleCallback === 'function') {
    const ready = () => {
      window.removeEventListener('pointerdown', ready)
      window.removeEventListener('keydown', ready)
      if (typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId)
      }
      resolve()
    }
    window.addEventListener('pointerdown', ready, { once: true, passive: true })
    window.addEventListener('keydown', ready, { once: true })
    const idleId = window.requestIdleCallback(ready, { timeout: 1000 })
  } else {
    window.requestAnimationFrame(() => window.setTimeout(resolve, 0))
  }
}).then(() => import('./motion-features')).then(module => module.default)

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      {children}
    </LazyMotion>
  )
}
