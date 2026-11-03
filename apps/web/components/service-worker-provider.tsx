'use client'

import { useEffect } from 'react'
import { ensureServiceWorkerCleanup } from './sw-cleanup'

export function ServiceWorkerProvider() {
  useEffect(() => {
    // Only register in production
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      let disposed = false
      let updateInterval: ReturnType<typeof setInterval> | undefined
      let hadController = Boolean(navigator.serviceWorker.controller)
      // Register service worker
      const register = () => {
        ensureServiceWorkerCleanup()
          .then(() => disposed ? undefined : navigator.serviceWorker.register('/sw-cache.js'))
          .then((registration) => {
            if (disposed || !registration) return
            console.log('Service Worker registered successfully:', registration.scope)

            // Check for updates periodically
            updateInterval = setInterval(() => {
              registration.update()
            }, 60000) // Check every minute

            // Handle updates
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // New content available
                    console.log('New content available, refresh to update')
                    // You could show a notification here
                  }
                })
              }
            })
          })
          .catch((error) => {
            console.error('Service Worker registration failed:', error)
          })
      }

      if (document.readyState === 'complete') {
        register()
      } else {
        window.addEventListener('load', register, { once: true })
      }

      // Handle controller change (new service worker activated)
      let refreshing = false
      const handleControllerChange = () => {
        // First installation claims an already rendered page; it needs no reload.
        if (!hadController) {
          hadController = Boolean(navigator.serviceWorker.controller)
          return
        }
        if (!refreshing) {
          refreshing = true
          window.location.reload()
        }
      }
      navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange)

      return () => {
        disposed = true
        window.removeEventListener('load', register)
        navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange)
        if (updateInterval) clearInterval(updateInterval)
      }
    }
  }, [])

  return null
}

// Hook to control service worker
export function useServiceWorker() {
  const skipWaiting = () => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' })
    }
  }

  const clearCache = () => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'CLEAR_CACHE' })
    }
  }

  const unregister = async () => {
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations()
      for (const registration of registrations) {
        await registration.unregister()
      }
    }
  }

  return {
    skipWaiting,
    clearCache,
    unregister,
  }
}
