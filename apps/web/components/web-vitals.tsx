/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect } from 'react'
import { CLSMetric, FCPMetric, INPMetric, LCPMetric, TTFBMetric } from 'web-vitals'

interface WebVitalsMetric {
  id: string
  name: string
  value: number
  delta: number
  rating: 'good' | 'needs-improvement' | 'poor'
  navigationType: string
}

interface AnalyticsEvent {
  name: string
  properties: Record<string, unknown>
}

// Send analytics events (implement your analytics service)
function sendAnalyticsEvent(event: AnalyticsEvent) {
  if (typeof window === 'undefined') return

  // Example implementations:
  
  // 1. Google Analytics 4 (gtag)
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', event.name, event.properties)
  }

  // 2. Google Analytics 4 (gtm)
  if (typeof window.dataLayer !== 'undefined') {
    window.dataLayer.push({
      event: event.name,
      ...event.properties
    })
  }

  // 3. Custom analytics endpoint
  if (process.env.NODE_ENV === 'production') {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    }).catch(error => {
      console.warn('Failed to send analytics:', error)
    })
  }

  // 4. Console logging for development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Web Vitals:', event)
  }
}

// Format metric for analytics
function formatMetric(metric: CLSMetric | FCPMetric | INPMetric | LCPMetric | TTFBMetric): WebVitalsMetric {
  return {
    id: metric.id,
    name: metric.name,
    value: Math.round(metric.value),
    delta: Math.round(metric.delta),
    rating: metric.rating,
    navigationType: metric.navigationType || 'unknown'
  }
}

// Send metric to analytics
function sendMetric(metric: CLSMetric | FCPMetric | INPMetric | LCPMetric | TTFBMetric) {
  const formattedMetric = formatMetric(metric)
  
  sendAnalyticsEvent({
    name: 'web_vitals',
    properties: {
      metric_name: formattedMetric.name,
      metric_value: formattedMetric.value,
      metric_delta: formattedMetric.delta,
      metric_rating: formattedMetric.rating,
      metric_id: formattedMetric.id,
      navigation_type: formattedMetric.navigationType,
      page_path: window.location.pathname,
      page_url: window.location.href,
      user_agent: navigator.userAgent,
      connection_type: (navigator as any)?.connection?.effectiveType || 'unknown',
      device_memory: (navigator as any)?.deviceMemory || 'unknown'
    }
  })

  // Also store in session storage for debugging
  if (process.env.NODE_ENV === 'development') {
    const existingMetrics = JSON.parse(sessionStorage.getItem('web-vitals') || '[]')
    existingMetrics.push({
      ...formattedMetric,
      timestamp: Date.now(),
      url: window.location.href
    })
    sessionStorage.setItem('web-vitals', JSON.stringify(existingMetrics))
  }
}

// Performance observer for additional metrics
function observePerformance() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return

  // Observe navigation timing
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming
          
          sendAnalyticsEvent({
            name: 'navigation_timing',
            properties: {
              dns_lookup: Math.round(navEntry.domainLookupEnd - navEntry.domainLookupStart),
              tcp_connection: Math.round(navEntry.connectEnd - navEntry.connectStart),
              server_response: Math.round(navEntry.responseStart - navEntry.requestStart),
              dom_content_loaded: Math.round(navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart),
              load_complete: Math.round(navEntry.loadEventEnd - navEntry.loadEventStart),
              page_load_time: Math.round(navEntry.loadEventEnd - navEntry.fetchStart),
              redirect_count: navEntry.redirectCount,
              page_path: window.location.pathname
            }
          })
        }
      }
    })

    observer.observe({ entryTypes: ['navigation'] })
  } catch (error) {
    console.warn('Failed to observe navigation timing:', error)
  }

  // Observe resource timing for critical resources
  try {
    const resourceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const resource = entry as PerformanceResourceTiming
        
        // Only track critical resources
        if (resource.name.includes('.js') || resource.name.includes('.css') || resource.name.includes('font')) {
          sendAnalyticsEvent({
            name: 'resource_timing',
            properties: {
              resource_name: resource.name,
              resource_type: resource.initiatorType,
              duration: Math.round(resource.duration),
              size: resource.transferSize,
              page_path: window.location.pathname
            }
          })
        }
      }
    })

    resourceObserver.observe({ entryTypes: ['resource'] })
  } catch (error) {
    console.warn('Failed to observe resource timing:', error)
  }
}

// Check if metrics meet performance budgets
function checkPerformanceBudgets(metric: WebVitalsMetric) {
  const budgets = {
    CLS: { good: 0.1, poor: 0.25 },
    INP: { good: 200, poor: 500 },
    LCP: { good: 2500, poor: 4000 },
    FCP: { good: 1800, poor: 3000 },
    TTFB: { good: 800, poor: 1800 }
  }

  const budget = budgets[metric.name as keyof typeof budgets]
  if (!budget) return

  if (metric.rating === 'poor') {
    sendAnalyticsEvent({
      name: 'performance_budget_exceeded',
      properties: {
        metric_name: metric.name,
        metric_value: metric.value,
        budget_threshold: budget.poor,
        page_path: window.location.pathname,
        severity: 'high'
      }
    })
  }
}

export function WebVitals() {
  useEffect(() => {
    // Dynamically import web-vitals to avoid affecting the main bundle
    import('web-vitals').then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
      // Core Web Vitals
      onCLS(metric => {
        sendMetric(metric)
        checkPerformanceBudgets(formatMetric(metric))
      })
      
      onINP(metric => {
        sendMetric(metric)
        checkPerformanceBudgets(formatMetric(metric))
      })
      
      onLCP(metric => {
        sendMetric(metric)
        checkPerformanceBudgets(formatMetric(metric))
      })

      // Additional metrics
      onFCP(metric => {
        sendMetric(metric)
        checkPerformanceBudgets(formatMetric(metric))
      })
      
      onTTFB(metric => {
        sendMetric(metric)
        checkPerformanceBudgets(formatMetric(metric))
      })
    }).catch(error => {
      console.warn('Failed to load web-vitals:', error)
    })

    // Observe additional performance metrics
    observePerformance()

    // Send page view analytics
    sendAnalyticsEvent({
      name: 'page_view',
      properties: {
        page_path: window.location.pathname,
        page_title: document.title,
        referrer: document.referrer,
        viewport_width: window.innerWidth,
        viewport_height: window.innerHeight,
        screen_width: window.screen.width,
        screen_height: window.screen.height,
        color_depth: window.screen.colorDepth,
        pixel_ratio: window.devicePixelRatio,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language,
        languages: navigator.languages.join(','),
        platform: navigator.platform,
        cookie_enabled: navigator.cookieEnabled,
        online: navigator.onLine
      }
    })

    // Track connection changes
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      const sendConnectionData = () => {
        sendAnalyticsEvent({
          name: 'connection_change',
          properties: {
            effective_type: connection.effectiveType,
            downlink: connection.downlink,
            rtt: connection.rtt,
            save_data: connection.saveData
          }
        })
      }

      connection.addEventListener('change', sendConnectionData)
      return () => connection.removeEventListener('change', sendConnectionData)
    }
  }, [])

  return null // This component doesn't render anything
}

// Hook to access Web Vitals data
export function useWebVitals() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    // Only available in development for debugging
    const vitals = sessionStorage.getItem('web-vitals')
    if (vitals) {
      console.group('🚀 Web Vitals Debug')
      JSON.parse(vitals).forEach((metric: any) => {
        console.log(`${metric.name}: ${metric.value}ms (${metric.rating})`)
      })
      console.groupEnd()
    }
  }, [])

  return {
    clearMetrics: () => {
      if (process.env.NODE_ENV === 'development') {
        sessionStorage.removeItem('web-vitals')
        console.log('Web Vitals data cleared')
      }
    }
  }
}

// Global type declarations
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}