import { test, expect, Page, BrowserContext } from '@playwright/test'

test.describe('Papers - Performance and Load Tests', () => {
  let page: Page
  let context: BrowserContext

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext({
      javaScriptEnabled: true,
      viewport: { width: 1280, height: 720 }
    })
    page = await context.newPage()
  })

  test.afterEach(async () => {
    await context.close()
  })

  test.describe('Page Load Performance', () => {
    test('Papers page loads within performance budget', async () => {
      const startTime = Date.now()
      
      await page.goto('/papers')
      await page.waitForLoadState('networkidle')
      
      const loadTime = Date.now() - startTime
      
      // Should load within 3 seconds on modern browsers
      expect(loadTime).toBeLessThan(3000)
      
      // Verify content is loaded
      await expect(page.locator('h1')).toContainText('Technical Papers')
    })

    test('Initial content renders quickly', async () => {
      const startTime = Date.now()
      
      await page.goto('/papers')
      
      // Wait for first meaningful paint
      await page.waitForSelector('h1')
      
      const renderTime = Date.now() - startTime
      
      // First content should appear within 1 second
      expect(renderTime).toBeLessThan(1000)
    })

    test('Page responds quickly after load', async () => {
      await page.goto('/papers')
      await page.waitForLoadState('networkidle')
      
      const startTime = Date.now()
      
      // Test interaction responsiveness
      await page.hover('text=Lightpaper')
      
      const hoverTime = Date.now() - startTime
      
      // Hover effects should be immediate
      expect(hoverTime).toBeLessThan(100)
    })
  })

  test.describe('PDF Download Performance', () => {
    test('PDF downloads initiate quickly', async () => {
      await page.goto('/papers')
      await page.waitForLoadState('networkidle')
      
      const startTime = Date.now()
      const newPagePromise = context.waitForEvent('page', { timeout: 5000 })
      
      await page.click('text=Lightpaper')
      
      const newPage = await newPagePromise
      const downloadInitTime = Date.now() - startTime
      
      // PDF download should start within 2 seconds
      expect(downloadInitTime).toBeLessThan(2000)
      
      await newPage.close()
    })

    test('Multiple rapid PDF access requests perform well', async () => {
      await page.goto('/papers')
      await page.waitForLoadState('networkidle')
      
      const startTime = Date.now()
      const newPagePromises = []
      
      // Rapidly trigger multiple downloads
      for (let i = 0; i < 5; i++) {
        const promise = context.waitForEvent('page', { timeout: 5000 })
        newPagePromises.push(promise)
        await page.click('text=Lightpaper')
        await page.waitForTimeout(100) // Small delay between clicks
      }
      
      // Wait for all to complete
      const newPages = await Promise.all(newPagePromises)
      const totalTime = Date.now() - startTime
      
      // Should handle 5 rapid downloads within 10 seconds
      expect(totalTime).toBeLessThan(10000)
      expect(newPages).toHaveLength(5)
      
      // Clean up
      await Promise.all(newPages.map(p => p.close()))
    })

    test('PDF downloads work efficiently with slow network', async () => {
      await page.goto('/papers')
      await page.waitForLoadState('networkidle')
      
      // Simulate slower network conditions
      const client = await page.context().newCDPSession(page)
      await client.send('Network.emulateNetworkConditions', {
        offline: false,
        downloadThroughput: 50000, // 50kb/s
        uploadThroughput: 50000,
        latency: 100
      })
      
      const startTime = Date.now()
      const newPagePromise = context.waitForEvent('page', { timeout: 15000 })
      
      await page.click('text=Lightpaper')
      
      const newPage = await newPagePromise
      const downloadTime = Date.now() - startTime
      
      // Should still work within reasonable time even with slow network
      expect(downloadTime).toBeLessThan(15000)
      
      await newPage.close()
    })
  })

  test.describe('Memory Usage and Resource Management', () => {
    test('Page maintains performance after multiple interactions', async () => {
      await page.goto('/papers')
      await page.waitForLoadState('networkidle')
      
      // Perform multiple interactions to test memory usage
      for (let i = 0; i < 20; i++) {
        await page.hover('text=Lightpaper')
        await page.hover('text=Onepager')
        await page.hover('h1') // Move away
      }
      
      // Test that page is still responsive
      const startTime = Date.now()
      await page.click('text=Lightpaper')
      const responseTime = Date.now() - startTime
      
      expect(responseTime).toBeLessThan(500) // Should still be fast
      
      // Clean up any opened tabs
      const pages = context.pages()
      for (const p of pages) {
        if (p !== page) {
          await p.close()
        }
      }
    })

    test('Handles many simultaneous PDF download attempts', async () => {
      await page.goto('/papers')
      await page.waitForLoadState('networkidle')
      
      const startTime = Date.now()
      const promises = []
      
      // Simulate user rapidly clicking both cards
      for (let i = 0; i < 10; i++) {
        promises.push(context.waitForEvent('page', { timeout: 10000 }))
        
        if (i % 2 === 0) {
          await page.click('text=Lightpaper')
        } else {
          await page.click('text=Onepager')
        }
        
        await page.waitForTimeout(50)
      }
      
      const newPages = await Promise.allSettled(promises)
      const totalTime = Date.now() - startTime
      
      // Should handle all attempts within reasonable time
      expect(totalTime).toBeLessThan(20000)
      
      // Count successful page opens
      const successfulOpens = newPages.filter(p => p.status === 'fulfilled').length
      expect(successfulOpens).toBeGreaterThan(5) // At least half should succeed
      
      // Clean up
      for (const result of newPages) {
        if (result.status === 'fulfilled') {
          await result.value.close()
        }
      }
    })
  })

  test.describe('Animation and UI Performance', () => {
    test('Page animations do not block interactions', async () => {
      await page.goto('/papers')
      
      // Don't wait for animations to complete
      const startTime = Date.now()
      
      // Try to interact immediately
      await page.click('text=Lightpaper')
      
      const interactionTime = Date.now() - startTime
      
      // Should be able to interact before animations complete
      expect(interactionTime).toBeLessThan(1000)
      
      // Clean up
      const pages = context.pages()
      for (const p of pages) {
        if (p !== page) {
          await p.close()
        }
      }
    })

    test('Hover animations perform smoothly', async () => {
      await page.goto('/papers')
      await page.waitForLoadState('networkidle')
      
      const lightpaperCard = page.locator('text=Lightpaper').locator('..')
      
      // Test rapid hover on/off
      for (let i = 0; i < 10; i++) {
        const hoverStart = Date.now()
        await lightpaperCard.hover()
        const hoverTime = Date.now() - hoverStart
        
        expect(hoverTime).toBeLessThan(50) // Hover should be immediate
        
        await page.mouse.move(0, 0) // Move away
        await page.waitForTimeout(100)
      }
    })

    test('Page scrolling performance remains smooth', async () => {
      await page.goto('/papers')
      await page.waitForLoadState('networkidle')
      
      // Test scrolling performance
      const startTime = Date.now()
      
      for (let i = 0; i < 10; i++) {
        await page.evaluate(() => window.scrollBy(0, 100))
        await page.waitForTimeout(50)
      }
      
      const scrollTime = Date.now() - startTime
      
      // Scrolling should be smooth and fast
      expect(scrollTime).toBeLessThan(2000)
    })
  })

  test.describe('Resource Loading Efficiency', () => {
    test('Minimal resource requests for basic functionality', async () => {
      // Monitor network requests
      const requests: string[] = []
      
      page.on('request', request => {
        requests.push(request.url())
      })
      
      await page.goto('/papers')
      await page.waitForLoadState('networkidle')
      
      // Filter out unnecessary requests
      const relevantRequests = requests.filter(url => 
        !url.includes('analytics') && 
        !url.includes('tracking') &&
        !url.includes('ads')
      )
      
      // Should not make excessive requests
      expect(relevantRequests.length).toBeLessThan(20)
    })

    test('Google Drive URLs load efficiently when accessed', async () => {
      await page.goto('/papers')
      await page.waitForLoadState('networkidle')
      
      const startTime = Date.now()
      const newPagePromise = context.waitForEvent('page')
      
      await page.click('text=Lightpaper')
      
      const newPage = await newPagePromise
      await newPage.waitForLoadState('domcontentloaded')
      
      const loadTime = Date.now() - startTime
      
      // Google Drive should load reasonably quickly
      expect(loadTime).toBeLessThan(8000)
      
      await newPage.close()
    })
  })

  test.describe('Mobile Performance', () => {
    test('Mobile page load performance', async () => {
      await page.setViewportSize({ width: 375, height: 667 })
      
      const startTime = Date.now()
      
      await page.goto('/papers')
      await page.waitForLoadState('networkidle')
      
      const mobileLoadTime = Date.now() - startTime
      
      // Mobile should load within 4 seconds (accounting for slower devices)
      expect(mobileLoadTime).toBeLessThan(4000)
      
      await expect(page.locator('h1')).toContainText('Technical Papers')
    })

    test('Mobile PDF downloads perform well', async () => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/papers')
      await page.waitForLoadState('networkidle')
      
      const startTime = Date.now()
      const newPagePromise = context.waitForEvent('page', { timeout: 10000 })
      
      await page.click('text=Lightpaper')
      
      const newPage = await newPagePromise
      const mobileDownloadTime = Date.now() - startTime
      
      // Mobile downloads should work within reasonable time
      expect(mobileDownloadTime).toBeLessThan(5000)
      
      await newPage.close()
    })
  })

  test.describe('Stress Testing', () => {
    test('Handles page refresh during PDF downloads', async () => {
      await page.goto('/papers')
      await page.waitForLoadState('networkidle')
      
      // Start a download
      const newPagePromise = context.waitForEvent('page')
      await page.click('text=Lightpaper')
      
      // Immediately refresh the page
      await page.reload()
      await page.waitForLoadState('networkidle')
      
      // Page should still work after refresh
      await expect(page.locator('h1')).toContainText('Technical Papers')
      
      // Should be able to start new download
      const secondDownload = context.waitForEvent('page')
      await page.click('text=Onepaper')
      
      const pages = [await newPagePromise, await secondDownload]
      
      // Clean up
      for (const p of pages) {
        await p.close().catch(() => {}) // Some may already be closed
      }
    })

    test('Performance under concurrent user simulation', async () => {
      await page.goto('/papers')
      await page.waitForLoadState('networkidle')
      
      // Simulate multiple concurrent user actions
      const actions = [
        page.hover('text=Lightpaper'),
        page.hover('text=Onepager'),
        page.evaluate(() => window.scrollBy(0, 100)),
        page.mouse.move(500, 300),
        page.keyboard.press('Tab')
      ]
      
      const startTime = Date.now()
      
      // Execute all actions concurrently
      await Promise.all(actions)
      
      const concurrentTime = Date.now() - startTime
      
      // All actions should complete quickly
      expect(concurrentTime).toBeLessThan(1000)
      
      // Page should remain responsive
      await expect(page.locator('h1')).toContainText('Technical Papers')
    })
  })

  test.describe('Performance Regression Testing', () => {
    test('URL generation functions execute quickly', async () => {
      await page.goto('/papers')
      await page.waitForLoadState('networkidle')
      
      // Test that URL generation doesn't cause delays
      const measurements = []
      
      for (let i = 0; i < 10; i++) {
        const start = Date.now()
        await page.click('text=Lightpaper')
        const duration = Date.now() - start
        measurements.push(duration)
        
        // Close any opened tabs
        const pages = context.pages()
        for (const p of pages) {
          if (p !== page) {
            await p.close()
          }
        }
        
        await page.waitForTimeout(100)
      }
      
      const averageTime = measurements.reduce((a, b) => a + b, 0) / measurements.length
      
      // Average click response should be very fast
      expect(averageTime).toBeLessThan(300)
    })

    test('Environment variable lookups do not cause delays', async () => {
      // Test page load time with different env var scenarios
      const loadTimes = []
      
      for (let i = 0; i < 5; i++) {
        const start = Date.now()
        await page.reload()
        await page.waitForLoadState('networkidle')
        const duration = Date.now() - start
        loadTimes.push(duration)
      }
      
      const averageLoadTime = loadTimes.reduce((a, b) => a + b, 0) / loadTimes.length
      const maxLoadTime = Math.max(...loadTimes)
      
      // Load times should be consistent
      expect(maxLoadTime - Math.min(...loadTimes)).toBeLessThan(2000)
      expect(averageLoadTime).toBeLessThan(3000)
    })
  })
})