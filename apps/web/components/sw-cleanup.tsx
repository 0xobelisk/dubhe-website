"use client"

import { useEffect } from 'react'

export default function ServiceWorkerCleanup() {
  useEffect(() => {
    // Only run cleanup once
    const hasCleanedUp = localStorage.getItem('sw-cleaned-up')
    
    if (!hasCleanedUp && 'serviceWorker' in navigator) {
      console.log('Cleaning up old service workers...')
      
      // Get all service worker registrations
      navigator.serviceWorker.getRegistrations().then(function(registrations) {
        // Unregister all service workers
        const unregisterPromises = registrations.map(function(registration) {
          console.log('Unregistering service worker:', registration.scope)
          return registration.unregister()
        })
        
        return Promise.all(unregisterPromises)
      }).then(function() {
        // Clear all caches
        if ('caches' in window) {
          return caches.keys().then(function(cacheNames) {
            const deletePromises = cacheNames.map(function(cacheName) {
              console.log('Deleting cache:', cacheName)
              return caches.delete(cacheName)
            })
            return Promise.all(deletePromises)
          })
        }
      }).then(function() {
        console.log('Service worker cleanup completed')
        localStorage.setItem('sw-cleaned-up', 'true')
        
        // Optionally reload the page after cleanup
        // window.location.reload()
      }).catch(function(error) {
        console.error('Error during service worker cleanup:', error)
        localStorage.setItem('sw-cleaned-up', 'true') // Mark as done even if error
      })
    }
  }, [])

  return null // This component doesn't render anything
}