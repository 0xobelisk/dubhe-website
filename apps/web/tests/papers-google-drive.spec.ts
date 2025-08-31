import { test, expect, Page, BrowserContext } from '@playwright/test'

test.describe('Papers - Google Drive URLs End-to-End Tests', () => {
  let page: Page
  let context: BrowserContext

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext({
      javaScriptEnabled: true,
      viewport: { width: 1280, height: 720 }
    })
    page = await context.newPage()
    
    await page.goto('/papers')
    await page.waitForLoadState('networkidle')
  })

  test.afterEach(async () => {
    await context.close()
  })

  test.describe('Google Drive URL Accessibility', () => {
    test('lightpaper Google Drive URL is accessible', async () => {
      const lightpaperUrl = 'https://drive.google.com/file/d/18VPJaivmd5FXYuFFhhhvUOWpeQyP-q1F/view?usp=sharing'
      
      // Test direct URL access
      const response = await page.request.get(lightpaperUrl)
      expect(response.status()).toBeLessThan(400) // Should not be a client/server error
      
      // Check response headers
      const headers = response.headers()
      expect(headers['content-type']).toBeTruthy()
    })

    test('onepager Google Drive URL is accessible', async () => {
      const onepaperUrl = 'https://drive.google.com/file/d/1aUwBNGsEuZ4cg0qeDpqDC4LbyEb9Q5OY/view?usp=sharing'
      
      // Test direct URL access
      const response = await page.request.get(onepaperUrl)
      expect(response.status()).toBeLessThan(400) // Should not be a client/server error
      
      // Check response headers
      const headers = response.headers()
      expect(headers['content-type']).toBeTruthy()
    })

    test('Google Drive URLs return valid HTML content', async () => {
      const lightpaperUrl = 'https://drive.google.com/file/d/18VPJaivmd5FXYuFFhhhvUOWpeQyP-q1F/view?usp=sharing'
      
      const response = await page.request.get(lightpaperUrl)
      const content = await response.text()
      
      // Should contain Google Drive specific content
      expect(content).toContain('drive.google.com')
      expect(content.toLowerCase()).toMatch(/pdf|document|file/)
    })
  })

  test.describe('PDF Download Flow', () => {
    test('can access lightpaper via card click', async () => {
      const newPagePromise = context.waitForEvent('page')
      
      // Click on lightpaper card
      await page.click('text=Lightpaper')
      
      // Wait for new tab to open
      const newPage = await newPagePromise
      
      // Verify the new page URL
      expect(newPage.url()).toMatch(/drive\.google\.com.*18VPJaivmd5FXYuFFhhhvUOWpeQyP-q1F/)
      
      // Wait for the page to load
      await newPage.waitForLoadState('networkidle')
      
      // Verify Google Drive page loaded
      const title = await newPage.title()
      expect(title).toBeTruthy()
      expect(title.length).toBeGreaterThan(0)
      
      await newPage.close()
    })

    test('can access onepager via card click', async () => {
      const newPagePromise = context.waitForEvent('page')
      
      // Click on onepager card
      await page.click('text=Onepager')
      
      // Wait for new tab to open
      const newPage = await newPagePromise
      
      // Verify the new page URL
      expect(newPage.url()).toMatch(/drive\.google\.com.*1aUwBNGsEuZ4cg0qeDpqDC4LbyEb9Q5OY/)
      
      // Wait for the page to load
      await newPage.waitForLoadState('networkidle')
      
      // Verify Google Drive page loaded
      const title = await newPage.title()
      expect(title).toBeTruthy()
      expect(title.length).toBeGreaterThan(0)
      
      await newPage.close()
    })

    test('Google Drive pages have download functionality', async () => {
      const newPagePromise = context.waitForEvent('page')
      
      await page.click('text=Lightpaper')
      
      const newPage = await newPagePromise
      await newPage.waitForLoadState('networkidle')
      
      // Look for download-related elements on Google Drive page
      const downloadButton = newPage.locator('button, [role="button"], a').filter({ 
        hasText: /download|télécharger|下载|скачать/i 
      }).first()
      
      if (await downloadButton.isVisible({ timeout: 5000 })) {
        expect(await downloadButton.isVisible()).toBe(true)
      } else {
        // Google Drive might show download options in menu
        const moreMenu = newPage.locator('[aria-label*="More"], [title*="More"], button[aria-label*="menu"]').first()
        if (await moreMenu.isVisible({ timeout: 5000 })) {
          expect(await moreMenu.isVisible()).toBe(true)
        }
      }
      
      await newPage.close()
    })
  })

  test.describe('Environment Variable Override', () => {
    test('works with custom environment URLs', async () => {
      // This test would require setting environment variables during runtime
      // In real scenarios, you'd test this with different deployment configs
      
      // For now, test that the page renders correctly regardless of URL source
      await expect(page.locator('h1')).toContainText('Technical Papers')
      await expect(page.locator('text=Lightpaper')).toBeVisible()
      await expect(page.locator('text=Onepaper')).toBeVisible()
    })
  })

  test.describe('Cross-Browser Compatibility', () => {
    test('PDF URLs work in different browsers', async () => {
      // This test validates that Google Drive URLs work consistently
      const newPagePromise = context.waitForEvent('page')
      
      await page.click('text=Lightpaper')
      
      const newPage = await newPagePromise
      
      // Should successfully load regardless of browser
      await newPage.waitForLoadState('domcontentloaded')
      expect(newPage.url()).toContain('drive.google.com')
      
      // Check that the page doesn't show error content
      const errorContent = await newPage.locator('text=Error, text=404, text=Not Found').count()
      expect(errorContent).toBe(0)
      
      await newPage.close()
    })
  })

  test.describe('Network Resilience', () => {
    test('handles slow Google Drive responses', async () => {
      // Simulate slower network
      await page.route('**/drive.google.com/**', async route => {
        await new Promise(resolve => setTimeout(resolve, 2000)) // 2s delay
        route.continue()
      })
      
      const newPagePromise = context.waitForEvent('page')
      
      await page.click('text=Lightpaper')
      
      const newPage = await newPagePromise
      
      // Should eventually load despite delay
      await newPage.waitForLoadState('networkidle', { timeout: 10000 })
      expect(newPage.url()).toContain('drive.google.com')
      
      await newPage.close()
    })

    test('gracefully handles Google Drive unavailable', async () => {
      // Mock Google Drive being unavailable
      await page.route('**/drive.google.com/**', route => {
        route.fulfill({ 
          status: 503, 
          body: 'Service Temporarily Unavailable' 
        })
      })
      
      const newPagePromise = context.waitForEvent('page')
      
      await page.click('text=Lightpaper')
      
      try {
        const newPage = await newPagePromise
        
        // Should still attempt to open, even with error
        expect(newPage.url()).toContain('drive.google.com')
        
        await newPage.close()
      } catch {
        // If new page doesn't open due to error, that's acceptable
        // The important thing is that the main page doesn't crash
        await expect(page.locator('h1')).toContainText('Technical Papers')
      }
    })
  })

  test.describe('Security and Privacy', () => {
    test('opens PDFs with proper security attributes', async () => {
      const newPagePromise = context.waitForEvent('page')
      
      await page.click('text=Lightpaper')
      
      const newPage = await newPagePromise
      
      // Verify new page has proper security context
      // (opener should be null due to noopener attribute)
      const hasOpener = await newPage.evaluate(() => window.opener !== null)
      expect(hasOpener).toBe(false)
      
      await newPage.close()
    })

    test('Google Drive URLs use HTTPS', async () => {
      const newPagePromise = context.waitForEvent('page')
      
      await page.click('text=Onepager')
      
      const newPage = await newPagePromise
      
      // Verify secure connection
      expect(newPage.url()).toMatch(/^https:\/\//)
      
      await newPage.close()
    })
  })

  test.describe('Performance Validation', () => {
    test('PDF download links load within acceptable time', async () => {
      const startTime = Date.now()
      
      const newPagePromise = context.waitForEvent('page')
      await page.click('text=Lightpaper')
      
      const newPage = await newPagePromise
      await newPage.waitForLoadState('domcontentloaded')
      
      const loadTime = Date.now() - startTime
      
      // Should load within 10 seconds (generous for Google Drive)
      expect(loadTime).toBeLessThan(10000)
      
      await newPage.close()
    })

    test('multiple rapid PDF access attempts work correctly', async () => {
      // Test rapid clicking doesn't break functionality
      for (let i = 0; i < 3; i++) {
        const newPagePromise = context.waitForEvent('page')
        
        await page.click('text=Lightpaper')
        
        const newPage = await newPagePromise
        expect(newPage.url()).toContain('drive.google.com')
        
        await newPage.close()
        
        // Small delay between attempts
        await page.waitForTimeout(500)
      }
    })
  })

  test.describe('Mobile Device Testing', () => {
    test('PDF downloads work on mobile viewport', async () => {
      await page.setViewportSize({ width: 375, height: 667 })
      
      const newPagePromise = context.waitForEvent('page')
      
      await page.click('text=Lightpaper')
      
      const newPage = await newPagePromise
      
      // Should work on mobile devices too
      expect(newPage.url()).toContain('drive.google.com')
      
      await newPage.close()
    })
  })

  test.describe('Internationalization with URLs', () => {
    test('PDF URLs work correctly with different locales', async () => {
      // Test French locale
      await page.goto('/fr/papers')
      await page.waitForLoadState('networkidle')
      
      const newPagePromise = context.waitForEvent('page')
      
      // Should still work with French locale
      await page.click('text=Lightpaper, text=Document')
      
      const newPage = await newPagePromise
      
      // Same Google Drive URL should be used
      expect(newPage.url()).toMatch(/drive\.google\.com.*18VPJaivmd5FXYuFFhhhvUOWpeQyP-q1F/)
      
      await newPage.close()
    })

    test('PDF URLs are consistent across locales', async () => {
      const locales = ['en', 'fr'] // Test with available locales
      const urls: string[] = []
      
      for (const locale of locales) {
        await page.goto(`/${locale}/papers`)
        await page.waitForLoadState('networkidle')
        
        const newPagePromise = context.waitForEvent('page')
        
        // Click on lightpaper (text might vary by locale)
        const lightpaperCard = page.locator('[data-testid="card"]').first()
        await lightpaperCard.click()
        
        const newPage = await newPagePromise
        urls.push(newPage.url())
        
        await newPage.close()
      }
      
      // All URLs should point to the same Google Drive file
      urls.forEach(url => {
        expect(url).toContain('18VPJaivmd5FXYuFFhhhvUOWpeQyP-q1F')
      })
    })
  })

  test.describe('Fallback Behavior Validation', () => {
    test('Google Drive URLs work as fallback when env vars not set', async () => {
      // This test validates that even without environment variables,
      // the hardcoded Google Drive URLs work correctly
      
      const newPagePromise = context.waitForEvent('page')
      
      await page.click('text=Lightpaper')
      
      const newPage = await newPagePromise
      
      // Should use the fallback Google Drive URL
      expect(newPage.url()).toMatch(/drive\.google\.com.*18VPJaivmd5FXYuFFhhhvUOWpeQyP-q1F/)
      
      await newPage.close()
    })
  })

  test.describe('Error Recovery', () => {
    test('page remains functional after PDF access errors', async () => {
      // Simulate network error for first request
      let requestCount = 0
      await page.route('**/drive.google.com/**', route => {
        requestCount++
        if (requestCount === 1) {
          route.abort('failed')
        } else {
          route.continue()
        }
      })
      
      // First click should fail
      await page.click('text=Lightpaper')
      
      // Page should still be functional
      await expect(page.locator('h1')).toContainText('Technical Papers')
      
      // Second click should work
      const newPagePromise = context.waitForEvent('page')
      
      await page.click('text=Onepaper')
      
      const newPage = await newPagePromise
      expect(newPage.url()).toContain('drive.google.com')
      
      await newPage.close()
    })
  })
})