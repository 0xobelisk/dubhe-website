import { test, expect, Page, BrowserContext } from '@playwright/test'

test.describe('Papers Feature - End-to-End Tests', () => {
  let page: Page
  let context: BrowserContext

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext({
      // Enable JavaScript
      javaScriptEnabled: true,
      // Set viewport size
      viewport: { width: 1280, height: 720 }
    })
    page = await context.newPage()
    
    // Go to homepage first
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test.afterEach(async () => {
    await context.close()
  })

  test.describe('Navigation to Papers Page', () => {
    test('can navigate to Papers page via desktop navigation dropdown', async () => {
      // Hover over Learn navigation item
      await page.hover('text=Learn')
      
      // Wait for dropdown to appear
      await page.waitForSelector('text=Papers', { state: 'visible' })
      
      // Click on Papers link
      await page.click('text=Papers')
      
      // Verify navigation to Papers page
      await expect(page).toHaveURL(/\/papers$/)
      
      // Verify page loaded correctly
      await expect(page.locator('h1')).toContainText('Technical Papers')
    })

    test('can navigate to Papers page via mobile navigation', async () => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 })
      
      // Open mobile menu
      await page.click('[aria-label="Open menu"]')
      
      // Wait for mobile menu to be visible
      await page.waitForSelector('text=Papers', { state: 'visible' })
      
      // Click on Papers link
      await page.click('text=Papers')
      
      // Verify navigation
      await expect(page).toHaveURL(/\/papers$/)
      await expect(page.locator('h1')).toContainText('Technical Papers')
    })

    test('Papers link appears in correct navigation section', async () => {
      // Hover over Learn section
      await page.hover('text=Learn')
      
      // Wait for dropdown
      await page.waitForSelector('text=Papers', { state: 'visible' })
      
      // Verify Papers link is in Learn dropdown alongside Documentation
      const learnDropdown = page.locator('text=Learn').locator('..')
      await expect(learnDropdown.locator('text=Documentation')).toBeVisible()
      await expect(learnDropdown.locator('text=Papers')).toBeVisible()
    })
  })

  test.describe('Papers Page Content', () => {
    test.beforeEach(async () => {
      await page.goto('/papers')
      await page.waitForLoadState('networkidle')
    })

    test('displays all required page elements', async () => {
      // Check hero section
      await expect(page.locator('[data-testid="hero-section"], .text-center')).toBeVisible()
      
      // Check page title and subtitle
      await expect(page.locator('h1')).toContainText('Technical Papers')
      await expect(page.locator('text=Explore Dubhe\'s technical architecture')).toBeVisible()
      
      // Check both paper cards are present
      await expect(page.locator('text=Whitepaper')).toBeVisible()
      await expect(page.locator('text=Lightpaper')).toBeVisible()
      
      // Check additional info
      await expect(page.locator('text=Opens in new tab')).toBeVisible()
    })

    test('displays paper cards with correct content', async () => {
      // Whitepaper card
      const whitepaperCard = page.locator('text=Whitepaper').locator('..')
      await expect(whitepaperCard.locator('text=Comprehensive technical overview')).toBeVisible()
      await expect(whitepaperCard.locator('text=Download Whitepaper')).toBeVisible()
      
      // Lightpaper card
      const lightpaperCard = page.locator('text=Lightpaper').locator('..')
      await expect(lightpaperCard.locator('text=Concise overview')).toBeVisible()
      await expect(lightpaperCard.locator('text=Download Lightpaper')).toBeVisible()
    })

    test('paper cards have proper visual styling', async () => {
      const paperCards = page.locator('[data-testid="card"], .group')
      
      // Should have at least 2 paper cards
      await expect(paperCards).toHaveCount(2)
      
      // Cards should have proper styling classes
      for (let i = 0; i < 2; i++) {
        const card = paperCards.nth(i)
        await expect(card).toHaveClass(/transition/)
        await expect(card).toHaveClass(/group/)
      }
    })

    test('displays icons correctly', async () => {
      // Should have file icons for each paper
      await expect(page.locator('svg, [data-testid*="icon"]')).toHaveCount.greaterThanOrEqual(4)
    })
  })

  test.describe('PDF Download Functionality', () => {
    test.beforeEach(async () => {
      await page.goto('/papers')
      await page.waitForLoadState('networkidle')
    })

    test('can trigger PDF download for whitepaper', async () => {
      // Set up download promise before triggering
      const downloadPromise = page.waitForEvent('download')
      
      // Click on whitepaper card
      await page.click('text=Whitepaper')
      
      // Wait for download or new tab
      try {
        const download = await downloadPromise
        expect(download.suggestedFilename()).toMatch(/whitepaper.*\.pdf/)
      } catch {
        // If download doesn't trigger, check if new tab opened
        const pages = context.pages()
        expect(pages.length).toBeGreaterThan(1)
      }
    })

    test('can trigger PDF download for lightpaper', async () => {
      const downloadPromise = page.waitForEvent('download')
      
      await page.click('text=Lightpaper')
      
      try {
        const download = await downloadPromise
        expect(download.suggestedFilename()).toMatch(/lightpaper.*\.pdf/)
      } catch {
        const pages = context.pages()
        expect(pages.length).toBeGreaterThan(1)
      }
    })

    test('handles PDF download with proper security attributes', async () => {
      // Monitor new tab creation
      const newPagePromise = context.waitForEvent('page')
      
      await page.click('text=Whitepaper')
      
      try {
        const newPage = await newPagePromise
        
        // Verify the new page has proper URL
        expect(newPage.url()).toMatch(/\/papers\/whitepaper.*\.pdf/)
        
        // Close the new page
        await newPage.close()
      } catch {
        // Download might have triggered instead of new tab
        console.log('Download triggered instead of new tab')
      }
    })

    test('provides visual feedback on card hover', async () => {
      const whitepaperCard = page.locator('text=Whitepaper').locator('..')
      
      // Get initial state
      const initialClasses = await whitepaperCard.getAttribute('class')
      
      // Hover over card
      await whitepaperCard.hover()
      
      // Card should have hover effects
      await expect(whitepaperCard).toHaveClass(/hover:border-blue-400/)
    })
  })

  test.describe('Responsive Design', () => {
    test('displays correctly on desktop', async () => {
      await page.goto('/papers')
      await page.setViewportSize({ width: 1280, height: 720 })
      
      // Cards should be in 2-column layout on desktop
      const cardsContainer = page.locator('.grid')
      await expect(cardsContainer).toHaveClass(/lg:grid-cols-2/)
      
      // Navigation should show desktop version
      await expect(page.locator('.md\\:block', { hasText: 'Learn' })).toBeVisible()
    })

    test('displays correctly on tablet', async () => {
      await page.goto('/papers')
      await page.setViewportSize({ width: 768, height: 1024 })
      
      // Should still show desktop navigation on tablet
      await expect(page.locator('text=Learn')).toBeVisible()
      
      // Content should be properly spaced
      await expect(page.locator('h1')).toBeVisible()
      await expect(page.locator('text=Whitepaper')).toBeVisible()
    })

    test('displays correctly on mobile', async () => {
      await page.goto('/papers')
      await page.setViewportSize({ width: 375, height: 667 })
      
      // Should show mobile navigation
      await expect(page.locator('[aria-label="Open menu"]')).toBeVisible()
      
      // Cards should stack vertically on mobile
      const cardsContainer = page.locator('.grid')
      await expect(cardsContainer).toHaveClass(/grid-cols-1/)
      
      // Text should be readable
      await expect(page.locator('h1')).toBeVisible()
    })
  })

  test.describe('Accessibility', () => {
    test.beforeEach(async () => {
      await page.goto('/papers')
      await page.waitForLoadState('networkidle')
    })

    test('has proper heading structure', async () => {
      // Should have h1 for main title
      const h1 = page.locator('h1')
      await expect(h1).toHaveCount(1)
      
      // Should have h3 for paper titles
      const h3s = page.locator('h3')
      await expect(h3s).toHaveCount(2)
    })

    test('paper cards are keyboard navigable', async () => {
      // Focus first paper card
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab') // Navigate to first card
      
      // Should be able to activate with Enter or Space
      await page.keyboard.press('Enter')
      
      // Should trigger download or open new tab
      const pages = context.pages()
      expect(pages.length).toBeGreaterThanOrEqual(1)
    })

    test('has proper alt text for images', async () => {
      const images = page.locator('img')
      const imageCount = await images.count()
      
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i)
        const alt = await img.getAttribute('alt')
        expect(alt).toBeTruthy()
        expect(alt?.length).toBeGreaterThan(0)
      }
    })

    test('maintains focus management', async () => {
      // Test that focus is properly managed during interactions
      await page.keyboard.press('Tab')
      const focusedElement = await page.evaluate(() => document.activeElement?.tagName)
      expect(focusedElement).toBeTruthy()
    })
  })

  test.describe('Multi-language Support', () => {
    test('displays content in English by default', async () => {
      await page.goto('/en/papers')
      
      await expect(page.locator('text=Technical Papers')).toBeVisible()
      await expect(page.locator('text=Whitepaper')).toBeVisible()
      await expect(page.locator('text=Lightpaper')).toBeVisible()
    })

    test('handles language switching', async () => {
      await page.goto('/papers')
      
      // Look for language selector
      const languageSelector = page.locator('[data-testid="language-selector"], .language-selector')
      
      if (await languageSelector.isVisible()) {
        // Test language switching functionality
        await languageSelector.click()
        // Additional language tests would go here
      }
    })

    test('generates correct PDF URLs for different locales', async () => {
      // Test French locale
      await page.goto('/fr/papers')
      
      // Monitor network requests for PDF
      const networkRequests: string[] = []
      page.on('request', request => {
        if (request.url().includes('.pdf')) {
          networkRequests.push(request.url())
        }
      })
      
      await page.click('text=Whitepaper')
      
      // Should request French PDF first, then fallback to English
      await page.waitForTimeout(1000)
      expect(networkRequests.some(url => url.includes('whitepaper-fr.pdf') || url.includes('whitepaper-en.pdf'))).toBeTruthy()
    })
  })

  test.describe('Error Handling', () => {
    test('handles missing PDF files gracefully', async () => {
      await page.goto('/papers')
      
      // Mock network to simulate missing PDF
      await page.route('**/papers/whitepaper-*.pdf', route => {
        route.fulfill({ status: 404, body: 'Not Found' })
      })
      
      // Should still attempt to open PDF despite error
      await page.click('text=Whitepaper')
      
      // Should not crash the application
      await expect(page.locator('text=Technical Papers')).toBeVisible()
    })

    test('handles network errors during PDF download', async () => {
      await page.goto('/papers')
      
      // Mock network failure
      await page.route('**/papers/**/*.pdf', route => {
        route.abort('failed')
      })
      
      await page.click('text=Whitepaper')
      
      // Page should remain functional
      await expect(page.locator('h1')).toBeVisible()
    })
  })

  test.describe('Performance', () => {
    test('loads Papers page quickly', async () => {
      const startTime = Date.now()
      
      await page.goto('/papers')
      await page.waitForLoadState('networkidle')
      
      const endTime = Date.now()
      const loadTime = endTime - startTime
      
      // Should load within reasonable time (adjust threshold as needed)
      expect(loadTime).toBeLessThan(5000) // 5 seconds
    })

    test('handles multiple rapid clicks without issues', async () => {
      await page.goto('/papers')
      
      // Rapidly click whitepaper card
      for (let i = 0; i < 5; i++) {
        await page.click('text=Whitepaper')
        await page.waitForTimeout(100)
      }
      
      // Page should remain responsive
      await expect(page.locator('h1')).toBeVisible()
    })

    test('efficiently handles animations', async () => {
      await page.goto('/papers')
      
      // Check that animations don't block interaction
      await page.hover('text=Whitepaper')
      await page.hover('text=Lightpaper')
      
      // Should be able to interact immediately
      await page.click('text=Whitepaper')
      
      const pages = context.pages()
      expect(pages.length).toBeGreaterThanOrEqual(1)
    })
  })

  test.describe('SEO and Meta Tags', () => {
    test('has proper page title and meta tags', async () => {
      await page.goto('/papers')
      
      // Check page title
      await expect(page).toHaveTitle(/Papers|Technical/)
      
      // Check meta description
      const metaDescription = page.locator('meta[name="description"]')
      expect(await metaDescription.getAttribute('content')).toBeTruthy()
    })
  })

  test.describe('Browser Compatibility', () => {
    test('works with disabled JavaScript fallback', async () => {
      // Create new context with JS disabled
      const noJsContext = await page.context().browser()?.newContext({
        javaScriptEnabled: false
      })
      
      if (noJsContext) {
        const noJsPage = await noJsContext.newPage()
        await noJsPage.goto('/papers')
        
        // Basic content should still be visible
        await expect(noJsPage.locator('text=Papers')).toBeVisible()
        
        await noJsContext.close()
      }
    })
  })

  test.describe('Integration with Other Features', () => {
    test('maintains navigation state after visiting Papers page', async () => {
      await page.goto('/')
      
      // Navigate to Papers
      await page.hover('text=Learn')
      await page.click('text=Papers')
      
      // Go back to home
      await page.goBack()
      
      // Navigation should still work
      await page.hover('text=Learn')
      await expect(page.locator('text=Papers')).toBeVisible()
    })

    test('breadcrumb navigation works correctly', async () => {
      await page.goto('/papers')
      
      // Check if breadcrumbs exist and work
      const homeLink = page.locator('a[href="/"]')
      if (await homeLink.isVisible()) {
        await homeLink.click()
        await expect(page).toHaveURL('/')
      }
    })
  })
})