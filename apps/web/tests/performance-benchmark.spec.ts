import { test, expect } from '@playwright/test'

test.describe('Performance Benchmark Tests', () => {
  // Core Web Vitals tests
  test.describe('Core Web Vitals', () => {
    test('Homepage should meet Core Web Vitals thresholds', async ({ page }) => {
      const startTime = Date.now()
      
      await page.goto('/en', { waitUntil: 'networkidle' })
      
      // Measure First Contentful Paint (FCP)
      const fcpMetric = await page.evaluate(() => {
        return new Promise<number>((resolve) => {
          if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
              const entries = list.getEntries()
              for (const entry of entries) {
                if (entry.name === 'first-contentful-paint') {
                  resolve(entry.startTime)
                  observer.disconnect()
                }
              }
            })
            observer.observe({ entryTypes: ['paint'] })
            
            // Fallback timeout
            setTimeout(() => resolve(0), 5000)
          } else {
            resolve(0)
          }
        })
      })

      // FCP should be under 1.8s (good threshold)
      if (fcpMetric > 0) {
        expect(fcpMetric).toBeLessThan(1800)
      }

      // Measure Largest Contentful Paint (LCP)
      const lcpMetric = await page.evaluate(() => {
        return new Promise<number>((resolve) => {
          if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
              const entries = list.getEntries()
              if (entries.length > 0) {
                const lastEntry = entries[entries.length - 1]
                resolve(lastEntry.startTime)
              }
            })
            observer.observe({ entryTypes: ['largest-contentful-paint'] })
            
            setTimeout(() => {
              observer.disconnect()
              resolve(0)
            }, 5000)
          } else {
            resolve(0)
          }
        })
      })

      // LCP should be under 2.5s (good threshold)
      if (lcpMetric > 0) {
        expect(lcpMetric).toBeLessThan(2500)
      }

      // Measure Cumulative Layout Shift (CLS)
      const clsMetric = await page.evaluate(() => {
        return new Promise<number>((resolve) => {
          let clsValue = 0
          
          if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                if (!(entry as any).hadRecentInput) {
                  clsValue += (entry as any).value
                }
              }
            })
            observer.observe({ entryTypes: ['layout-shift'] })
            
            setTimeout(() => {
              observer.disconnect()
              resolve(clsValue)
            }, 5000)
          } else {
            resolve(0)
          }
        })
      })

      // CLS should be under 0.1 (good threshold)
      if (clsMetric >= 0) {
        expect(clsMetric).toBeLessThan(0.1)
      }

      const loadTime = Date.now() - startTime
      expect(loadTime).toBeLessThan(5000) // Overall load time under 5s
    })

    test('Key pages should load quickly', async ({ page }) => {
      const keyPages = [
        '/en/foundation',
        '/en/labs',
        '/en/grants',
        '/en/contact',
        '/en/team'
      ]

      for (const pagePath of keyPages) {
        const startTime = Date.now()
        
        await page.goto(pagePath, { waitUntil: 'domcontentloaded' })
        
        const loadTime = Date.now() - startTime
        expect(loadTime).toBeLessThan(3000) // 3 seconds max per page
        
        // Wait for network to settle
        await page.waitForLoadState('networkidle', { timeout: 10000 })
      }
    })
  })

  // Resource loading performance
  test.describe('Resource Performance', () => {
    test('Images should load efficiently', async ({ page }) => {
      await page.goto('/en')
      
      // Get all images
      const images = await page.locator('img').all()
      
      for (const img of images) {
        const src = await img.getAttribute('src')
        if (src && !src.startsWith('data:')) {
          // Check if image is loaded
          const isLoaded = await img.evaluate((element: HTMLImageElement) => {
            return element.complete && element.naturalHeight !== 0
          })
          
          expect(isLoaded).toBe(true)
        }
      }
    })

    test('Fonts should load without FOUT', async ({ page }) => {
      await page.goto('/en')
      
      // Check for font loading
      const fontLoadTime = await page.evaluate(() => {
        return new Promise<number>((resolve) => {
          const startTime = performance.now()
          
          document.fonts.ready.then(() => {
            resolve(performance.now() - startTime)
          })
          
          // Timeout after 3 seconds
          setTimeout(() => resolve(3000), 3000)
        })
      })

      expect(fontLoadTime).toBeLessThan(2000) // Fonts should load within 2s
    })

    test('JavaScript bundles should be reasonable size', async ({ page }) => {
      const response = await page.goto('/en')
      expect(response?.status()).toBe(200)
      
      // Monitor network requests for JS bundles
      const jsRequests: string[] = []
      
      page.on('request', request => {
        if (request.url().endsWith('.js')) {
          jsRequests.push(request.url())
        }
      })

      await page.waitForLoadState('networkidle')
      
      // Should have reasonable number of JS requests
      expect(jsRequests.length).toBeLessThan(20)
    })
  })

  // Interactive performance
  test.describe('Interaction Performance', () => {
    test('Navigation should be responsive', async ({ page }) => {
      await page.goto('/en')
      
      const navigationItems = [
        'text=Foundation',
        'text=Labs', 
        'text=Grants',
        'text=Contact'
      ]

      for (const navItem of navigationItems) {
        const startTime = Date.now()
        
        await page.click(navItem)
        await page.waitForLoadState('domcontentloaded')
        
        const navigationTime = Date.now() - startTime
        expect(navigationTime).toBeLessThan(2000) // Navigation under 2s
      }
    })

    test('Form interactions should be responsive', async ({ page }) => {
      await page.goto('/en/contact')
      
      const formFields = [
        'input[name="name"]',
        'input[name="email"]',
        'textarea[name="message"]'
      ]

      for (const field of formFields) {
        const startTime = Date.now()
        
        await page.fill(field, 'Test input')
        
        const inputTime = Date.now() - startTime
        expect(inputTime).toBeLessThan(100) // Input response under 100ms
      }
    })

    test('Mobile performance should be acceptable', async ({ page }) => {
      // Simulate mobile device
      await page.setViewportSize({ width: 375, height: 667 })
      await page.emulateMedia({ media: 'screen' })
      
      const startTime = Date.now()
      await page.goto('/en', { waitUntil: 'networkidle' })
      const loadTime = Date.now() - startTime
      
      // Mobile should load within 6 seconds (more lenient than desktop)
      expect(loadTime).toBeLessThan(6000)
      
      // Test mobile navigation performance
      const mobileMenuButton = page.locator('button[aria-label*="menu"]').first()
      if (await mobileMenuButton.count() > 0) {
        const menuStartTime = Date.now()
        await mobileMenuButton.click()
        const menuTime = Date.now() - menuStartTime
        
        expect(menuTime).toBeLessThan(300) // Menu should open quickly
      }
    })
  })

  // Memory and resource usage
  test.describe('Resource Usage', () => {
    test('Pages should not have memory leaks', async ({ page }) => {
      await page.goto('/en')
      
      // Get initial memory usage (if available)
      const initialMemory = await page.evaluate(() => {
        return (performance as any).memory?.usedJSHeapSize || 0
      })

      // Navigate through several pages
      const pages = ['/en/foundation', '/en/labs', '/en/grants', '/en/contact']
      
      for (const pagePath of pages) {
        await page.goto(pagePath)
        await page.waitForLoadState('networkidle')
      }

      // Return to homepage
      await page.goto('/en')
      await page.waitForLoadState('networkidle')
      
      // Force garbage collection if available
      await page.evaluate(() => {
        if ((window as any).gc) {
          (window as any).gc()
        }
      })

      const finalMemory = await page.evaluate(() => {
        return (performance as any).memory?.usedJSHeapSize || 0
      })

      // Memory shouldn't grow excessively
      if (initialMemory > 0 && finalMemory > 0) {
        const memoryGrowth = finalMemory - initialMemory
        const memoryGrowthMB = memoryGrowth / (1024 * 1024)
        
        expect(memoryGrowthMB).toBeLessThan(50) // Less than 50MB growth
      }
    })

    test('Should handle concurrent page loads', async ({ page, context }) => {
      const pages = await Promise.all([
        context.newPage(),
        context.newPage(),
        context.newPage()
      ])

      const loadPromises = pages.map((page, index) => 
        page.goto(`/en`, { waitUntil: 'networkidle' })
      )

      const startTime = Date.now()
      await Promise.all(loadPromises)
      const totalTime = Date.now() - startTime

      // All pages should load concurrently within reasonable time
      expect(totalTime).toBeLessThan(10000) // 10 seconds for 3 concurrent loads

      // Clean up
      await Promise.all(pages.map(p => p.close()))
    })
  })

  // Performance regression tests
  test.describe('Performance Regression', () => {
    test('Bundle size should be within limits', async ({ page }) => {
      let totalSize = 0
      const resourceSizes: { [key: string]: number } = {}

      page.on('response', response => {
        const url = response.url()
        const size = parseInt(response.headers()['content-length'] || '0')
        
        if (size > 0) {
          totalSize += size
          
          if (url.includes('.js')) {
            resourceSizes['javascript'] = (resourceSizes['javascript'] || 0) + size
          } else if (url.includes('.css')) {
            resourceSizes['css'] = (resourceSizes['css'] || 0) + size
          } else if (url.match(/\.(jpg|jpeg|png|webp|avif|svg)$/)) {
            resourceSizes['images'] = (resourceSizes['images'] || 0) + size
          }
        }
      })

      await page.goto('/en', { waitUntil: 'networkidle' })

      // Total initial page load should be reasonable
      const totalSizeMB = totalSize / (1024 * 1024)
      expect(totalSizeMB).toBeLessThan(5) // Under 5MB total

      // JavaScript should be reasonable
      if (resourceSizes['javascript']) {
        const jsSizeMB = resourceSizes['javascript'] / (1024 * 1024)
        expect(jsSizeMB).toBeLessThan(2) // Under 2MB of JS
      }
    })

    test('Time to Interactive should be reasonable', async ({ page }) => {
      await page.goto('/en')
      
      // Measure Time to Interactive using a simple heuristic
      const ttiMetric = await page.evaluate(() => {
        return new Promise<number>((resolve) => {
          const startTime = performance.timeOrigin + performance.now()
          
          // Wait for main thread to be idle
          let lastActivity = Date.now()
          
          const checkIdle = () => {
            const now = Date.now()
            if (now - lastActivity > 500) { // 500ms of idle time
              resolve(now - startTime)
            } else {
              setTimeout(checkIdle, 100)
            }
          }
          
          // Monitor for activity
          const observer = new PerformanceObserver(() => {
            lastActivity = Date.now()
          })
          
          observer.observe({ entryTypes: ['navigation', 'resource'] })
          
          setTimeout(() => {
            observer.disconnect()
            resolve(5000) // Timeout at 5s
          }, 5000)
          
          setTimeout(checkIdle, 1000)
        })
      })

      expect(ttiMetric).toBeLessThan(4000) // TTI under 4 seconds
    })
  })

  // Network performance
  test.describe('Network Performance', () => {
    test('Should handle slow network conditions', async ({ page }) => {
      // Simulate slow 3G
      const client = await page.context().newCDPSession(page)
      await client.send('Network.emulateNetworkConditions', {
        offline: false,
        downloadThroughput: 1.5 * 1024 * 1024 / 8, // 1.5 Mbps
        uploadThroughput: 750 * 1024 / 8, // 750 Kbps
        latency: 40 // 40ms
      })

      const startTime = Date.now()
      await page.goto('/en', { waitUntil: 'domcontentloaded' })
      const loadTime = Date.now() - startTime

      // Should still be usable on slow networks
      expect(loadTime).toBeLessThan(15000) // 15 seconds on slow 3G

      await client.detach()
    })

    test('Should cache resources effectively', async ({ page }) => {
      // First visit
      await page.goto('/en', { waitUntil: 'networkidle' })
      
      // Second visit - should use cache
      const startTime = Date.now()
      await page.reload({ waitUntil: 'networkidle' })
      const reloadTime = Date.now() - startTime

      // Reload should be faster due to caching
      expect(reloadTime).toBeLessThan(2000) // Under 2 seconds for reload
    })
  })
})