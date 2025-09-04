import { useEffect } from 'react'

// Priority levels for prefetching
export enum PrefetchPriority {
  HIGH = 'high',     // Immediate prefetch
  MEDIUM = 'medium', // Prefetch on idle
  LOW = 'low'        // Prefetch on hover
}

// Routes configuration with priorities
export const ROUTE_PRIORITIES = {
  // High priority - prefetch immediately
  high: [
    '/',
    '/foundation',
    '/grants',
  ],
  // Medium priority - prefetch when idle
  medium: [
    '/incubation',
    '/team',
    '/contact',
    '/papers',
  ],
  // Low priority - prefetch on hover
  low: [
    '/privacy',
    '/terms',
    '/media-kit',
    '/portal',
  ]
}

// Cache for prefetched routes
const prefetchedRoutes = new Set<string>()

/**
 * Prefetch a route with priority
 */
export async function prefetchRoute(
  href: string,
  priority: PrefetchPriority = PrefetchPriority.MEDIUM
) {
  // Skip if already prefetched
  if (prefetchedRoutes.has(href)) {
    return
  }

  // Mark as prefetched
  prefetchedRoutes.add(href)

  // Only prefetch internal routes
  if (!href.startsWith('/') || href.startsWith('http')) {
    return
  }

  switch (priority) {
    case PrefetchPriority.HIGH:
      // Immediate prefetch
      await fetchRoute(href)
      break
    
    case PrefetchPriority.MEDIUM:
      // Prefetch when idle
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => fetchRoute(href), { timeout: 2000 })
      } else {
        setTimeout(() => fetchRoute(href), 100)
      }
      break
    
    case PrefetchPriority.LOW:
      // Will be prefetched on hover (handled by Link component)
      break
  }
}

/**
 * Fetch route data
 */
async function fetchRoute(href: string) {
  try {
    // Create a prefetch link
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = href
    link.as = 'document'
    document.head.appendChild(link)

    // Also prefetch JSON data for App Router
    const dataHref = `/_next/data/${href}.json`
    const dataLink = document.createElement('link')
    dataLink.rel = 'prefetch'
    dataLink.href = dataHref
    dataLink.as = 'fetch'
    document.head.appendChild(dataLink)
  } catch (error) {
    console.warn(`Failed to prefetch ${href}:`, error)
  }
}

/**
 * Hook to prefetch routes based on priority
 */
export function usePrefetch() {

  useEffect(() => {
    // Prefetch high priority routes immediately
    ROUTE_PRIORITIES.high.forEach(route => {
      prefetchRoute(route, PrefetchPriority.HIGH)
    })

    // Prefetch medium priority routes when idle
    const idleTimeout = setTimeout(() => {
      ROUTE_PRIORITIES.medium.forEach(route => {
        prefetchRoute(route, PrefetchPriority.MEDIUM)
      })
    }, 2000)

    return () => clearTimeout(idleTimeout)
  }, [])
}

/**
 * Smart prefetch based on user behavior
 */
export function useSmartPrefetch() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Track mouse position for predictive prefetching
    let lastX = 0
    let lastY = 0
    
    const handleMouseMove = (e: MouseEvent) => {
      const deltaY = e.clientY - lastY
      
      // Detect movement towards navigation area (top of page)
      if (e.clientY < 100 && deltaY < 0) {
        // User might be moving to navigation
        ROUTE_PRIORITIES.high.forEach(route => {
          prefetchRoute(route, PrefetchPriority.HIGH)
        })
      }
      
      lastX = e.clientX
      lastY = e.clientY
    }

    // Prefetch based on viewport visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const link = entry.target as HTMLAnchorElement
            const href = link.getAttribute('href')
            if (href && href.startsWith('/')) {
              prefetchRoute(href, PrefetchPriority.MEDIUM)
            }
          }
        })
      },
      {
        rootMargin: '50px',
        threshold: 0.01
      }
    )

    // Observe all internal links
    const links = document.querySelectorAll('a[href^="/"]')
    links.forEach(link => observer.observe(link))

    // Add mouse tracking
    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      links.forEach(link => observer.unobserve(link))
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])
}

/**
 * Prefetch based on network conditions
 */
export function useAdaptivePrefetch() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Check connection type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection

    if (connection) {
      // Only prefetch on good connections
      if (connection.effectiveType === '4g' || connection.effectiveType === 'wifi') {
        // Prefetch all medium priority routes
        ROUTE_PRIORITIES.medium.forEach(route => {
          prefetchRoute(route, PrefetchPriority.MEDIUM)
        })
      } else if (connection.effectiveType === '3g') {
        // Only prefetch high priority on slower connections
        ROUTE_PRIORITIES.high.forEach(route => {
          prefetchRoute(route, PrefetchPriority.HIGH)
        })
      }
      // Skip prefetching on 2g or slower
    }
  }, [])
}