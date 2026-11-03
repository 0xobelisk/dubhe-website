"use client"

import { useEffect } from 'react'

let cleanupPromise: Promise<void> | undefined

// Both the legacy cleanup component and registration await this same operation.
export function ensureServiceWorkerCleanup(): Promise<void> {
  if (!cleanupPromise) {
    cleanupPromise = (async () => {
      let hasCleanedUp = false
      try {
        hasCleanedUp = Boolean(localStorage.getItem('sw-cleaned-up'))
      } catch {
        // Storage can be unavailable in a private browser context.
      }
      if (hasCleanedUp || !('serviceWorker' in navigator)) return

      console.log('Cleaning up old service workers...')

      try {
        const registrations = await navigator.serviceWorker.getRegistrations()
        await Promise.all(registrations.map(registration => {
          console.log('Unregistering service worker:', registration.scope)
          return registration.unregister()
        }))

        // Clear all caches
        if ('caches' in window) {
          const cacheNames = await caches.keys()
          await Promise.all(cacheNames.map(cacheName => {
            console.log('Deleting cache:', cacheName)
            return caches.delete(cacheName)
          }))
        }
        console.log('Service worker cleanup completed')
      } catch (error) {
        console.error('Error during service worker cleanup:', error)
      } finally {
        try {
          localStorage.setItem('sw-cleaned-up', 'true')
        } catch {
          // The in-memory promise still prevents duplicate cleanup.
        }
      }
    })()
  }
  return cleanupPromise
}

export default function ServiceWorkerCleanup() {
  useEffect(() => {
    void ensureServiceWorkerCleanup()
  }, [])

  return null // This component doesn't render anything
}
