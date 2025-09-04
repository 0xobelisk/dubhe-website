'use client'

import { useEffect } from 'react'

export function ServiceWorkerProvider() {
  useEffect(() => {
    // Only register in production
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      // Register service worker
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw-cache.js')
          .then((registration) => {
            console.log('Service Worker registered successfully:', registration.scope)

            // Check for updates periodically
            setInterval(() => {
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
      })

      // Handle controller change (new service worker activated)
      let refreshing = false
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true
          window.location.reload()
        }
      })
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