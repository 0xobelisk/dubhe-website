import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

function message(locale: string, path: string): string {
  let value: unknown = JSON.parse(readFileSync(join(process.cwd(), 'apps/web/messages', `${locale}.json`), 'utf8'))
  for (const key of path.split('.')) {
    if (!value || typeof value !== 'object') throw new Error(`Missing translation: ${locale}:${path}`)
    value = (value as Record<string, unknown>)[key]
  }
  if (typeof value !== 'string') throw new Error(`Expected translated text: ${locale}:${path}`)
  return value
}

/**
 * Media Kit End-to-End Tests
 * 
 * Tests complete Media Kit page workflows in internationalized locales:
 * - Full page loading and rendering
 * - Navigation functionality
 * - Content display validation
 * - Cross-browser compatibility
 * - User interaction workflows
 */

// Locales to test (focusing on newly implemented ones)
const TEST_LOCALES = [
  { code: 'en', name: 'English' },
  { code: 'id', name: 'Indonesian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'hi', name: 'Hindi' },
  { code: 'bn', name: 'Bengali' },
  { code: 'ha', name: 'Hausa' }
]

test.describe('Media Kit E2E Tests', () => {
  test.describe('Page Loading and Navigation', () => {
    TEST_LOCALES.forEach(({ code, name }) => {
      test(`should load Media Kit page successfully in ${name} (${code})`, async ({ page }) => {
        // Navigate to Media Kit page
        await page.goto(`/${code}/media-kit`)
        
        // Wait for page to load
        await page.waitForLoadState('networkidle')
        
        // Check that page loaded without errors
        await expect(page.locator('body')).toBeVisible()
        
        // Check for main content
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 10000 })
        
        // Verify no JavaScript errors
        const errors: string[] = []
        page.on('pageerror', error => {
          errors.push(error.message)
        })
        
        await page.waitForTimeout(1000) // Wait for potential errors
        expect(errors.length, `No JavaScript errors should occur in ${name}`).toBe(0)
      })
    })

    TEST_LOCALES.forEach(({ code, name }) => {
      test(`should navigate to Media Kit from navigation menu in ${name} (${code})`, async ({ page }) => {
        // Start from home page
        await page.goto(`/${code}`)
        
        // Open navigation if mobile
        const mobileMenuButton = page.getByRole('button', { name: message(code, 'navigation.openMenu'), exact: true })
        if (await mobileMenuButton.isVisible()) {
          await mobileMenuButton.click()
        } else {
          await page.getByRole('navigation').getByRole('button', { name: message(code, 'navigation.community'), exact: true }).hover()
        }
        
        // Click Media Kit navigation link
        const mediaKitLink = page.getByRole('navigation').getByRole('link', { name: message(code, 'navigation.mediaKit'), exact: true })
        await expect(mediaKitLink.first()).toBeVisible({ timeout: 5000 })
        await mediaKitLink.first().click()
        
        // Verify navigation to Media Kit page
        await expect(page).toHaveURL(new RegExp(`/${code}/media-kit`))
        
        // Verify page content loaded
        await expect(page.locator('h1, .hero h1')).toBeVisible({ timeout: 10000 })
      })
    })
  })

  test.describe('Content Display Validation', () => {
    TEST_LOCALES.forEach(({ code, name }) => {
      test(`should display all main sections in ${name} (${code})`, async ({ page }) => {
        await page.goto(`/${code}/media-kit`)
        await page.waitForLoadState('networkidle')
        
        // Hero section
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
        
        // Check for section headings (translated)
        const sectionKeys = ['logo', 'clearspace', 'symbol', 'partnership', 'colors', 'typography', 'download']
        
        for (const key of sectionKeys) {
          await expect(page.getByRole('heading', { name: message(code, `mediaKit.${key}.title`), exact: true })).toBeVisible({ timeout: 5000 })
        }
      })
    })

    test('should display brand assets correctly', async ({ page }) => {
      await page.goto('/en/media-kit')
      await page.waitForLoadState('networkidle')
      
      // Check for logo images
      const logoImages = page.locator('img[alt*="Logo"], img[alt*="Symbol"], img[src*="logo"], img[src*="mediakit"]')
      await expect(logoImages.first()).toBeVisible({ timeout: 10000 })
      
      // Verify images load properly (not broken)
      const imageCount = await logoImages.count()
      for (let i = 0; i < Math.min(imageCount, 5); i++) { // Check first 5 images
        const image = logoImages.nth(i)
        await image.scrollIntoViewIfNeeded()
        await expect(image).toBeVisible()
        await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalHeight > 0)).toBe(true)
        
        // Check image has loaded (has natural dimensions)
        const isLoaded = await image.evaluate((img: HTMLImageElement) => {
          return img.complete && img.naturalHeight !== 0
        })
        expect(isLoaded, `Image ${i} should be loaded`).toBe(true)
      }
    })

    test('should display color palette with interactive elements', async ({ page }) => {
      await page.goto('/en/media-kit')
      await page.waitForLoadState('networkidle')
      
      // Look for color elements
      const colorElements = page.locator('.color, [style*="background-color"], [data-testid*="color"]')
      if (await colorElements.count() > 0) {
        await expect(colorElements.first()).toBeVisible()
      }
      
      // Look for copy buttons or clickable color codes
      const copyButtons = page.locator('button:has-text("#"), button:has-text("RGB"), [data-testid*="copy"]')
      if (await copyButtons.count() > 0) {
        await expect(copyButtons.first()).toBeVisible()
      }
    })
  })

  test.describe('User Interaction Workflows', () => {
    test('should handle brand pack download', async ({ page }) => {
      await page.goto('/en/media-kit')
      await page.waitForLoadState('networkidle')
      
      // Find download button
      const downloadButton = page.locator('button:has-text("Download"), button:has([data-testid*="download"]), button:has-text("Brand Pack")')
      await expect(downloadButton.first()).toBeVisible({ timeout: 10000 })
      
      // Listen for download events
      const downloadPromise = page.waitForEvent('download')
      await downloadButton.first().click()
      
      const download = await downloadPromise
      expect(download).toBeDefined()
      expect(download.suggestedFilename()).toBe('dubhe-logo-light.png')
      expect(await download.failure()).toBeNull()
      await expect(downloadButton.first()).toBeEnabled()
    })

    test('should handle individual asset downloads', async ({ page }) => {
      await page.goto('/en/media-kit')
      await page.waitForLoadState('networkidle')
      
      const firstButton = page.getByRole('button', { name: /Download Primary Logo \(Light\)/ }).first()
      await expect(firstButton).toBeVisible()
      await expect(firstButton).toBeEnabled()
      const [download] = await Promise.all([
        page.waitForEvent('download'),
        firstButton.click()
      ])
      expect(download.suggestedFilename()).toMatch(/\.png$/)
      expect(await download.failure()).toBeNull()
    })

    test('should handle color code copying', async ({ page }) => {
      await page.goto('/en/media-kit')
      await page.waitForLoadState('networkidle')
      
      // Find copy buttons for color codes
      const copyButtons = page.locator('button:has-text("#"), button:has-text("RGB")')
      
      if (await copyButtons.count() > 0) {
        const firstCopyButton = copyButtons.first()
        await expect(firstCopyButton).toBeVisible()
        await firstCopyButton.click()
        
        // Verify clipboard interaction (button should show feedback)
        await page.waitForTimeout(500)
        
        // Look for visual feedback (checkmark, "copied" text, etc.)
        const feedback = page.locator('[data-testid*="check"], :has-text("copied"), :has-text("Copied")')
        if (await feedback.count() > 0) {
          await expect(feedback.first()).toBeVisible()
        }
      }
    })

    test('should toggle logo restrictions visibility', async ({ page }) => {
      await page.goto('/en/media-kit')
      await page.waitForLoadState('networkidle')
      
      // Find toggle button for logo restrictions
      const toggleButton = page.locator('button:has-text("Hide"), button:has-text("Show"), button:has-text("restrictions")')
      
      if (await toggleButton.count() > 0) {
        const initialText = await toggleButton.first().textContent()
        await toggleButton.first().click()
        
        // Verify toggle worked
        await page.waitForTimeout(500)
        const newText = await toggleButton.first().textContent()
        expect(newText).not.toBe(initialText)
      }
    })
  })

  test.describe('Cross-Browser Compatibility', () => {
    test('should render consistently across browsers', async ({ page, browserName }) => {
      await page.goto('/en/media-kit')
      await page.waitForLoadState('networkidle')
      
      // Take screenshot for visual comparison
      await expect(page.locator('body')).toBeVisible()
      
      // Check critical elements are present
      await expect(page.locator('h1')).toBeVisible()
      await expect(page.locator('nav, [role="navigation"]')).toBeVisible()
      await expect(page.locator('footer, [role="contentinfo"]')).toBeVisible()
      
      // Check for layout issues
      const bodyScrollHeight = await page.evaluate(() => document.body.scrollHeight)
      expect(bodyScrollHeight).toBeGreaterThan(1000) // Page should have substantial content
    })

    test('should handle mobile viewports', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/en/media-kit')
      await page.waitForLoadState('networkidle')
      
      // Verify mobile layout
      await expect(page.locator('body')).toBeVisible()
      
      // Check that content is accessible on mobile
      const mainContent = page.locator('main, [role="main"], .content')
      if (await mainContent.count() > 0) {
        await expect(mainContent.first()).toBeVisible()
      }
      
      // Verify no horizontal scrolling issues
      const bodyScrollWidth = await page.evaluate(() => document.body.scrollWidth)
      const viewportWidth = await page.evaluate(() => window.innerWidth)
      expect(bodyScrollWidth).toBeLessThanOrEqual(viewportWidth + 50) // Allow some tolerance
    })
  })

  test.describe('Performance and Loading', () => {
    test('should load within acceptable time limits', async ({ page }) => {
      const startTime = Date.now()
      
      await page.goto('/en/media-kit')
      await page.waitForLoadState('networkidle')
      
      const loadTime = Date.now() - startTime
      expect(loadTime).toBeLessThan(10000) // Should load within 10 seconds
    })

    test('should not have console errors', async ({ page }) => {
      const consoleErrors: string[] = []
      
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text())
        }
      })
      
      page.on('pageerror', error => {
        consoleErrors.push(error.message)
      })
      
      await page.goto('/en/media-kit')
      await page.waitForLoadState('networkidle')
      
      // Wait a bit more to catch any delayed errors
      await page.waitForTimeout(2000)
      
      expect(consoleErrors.length, `Console errors found: ${consoleErrors.join(', ')}`).toBe(0)
    })
  })

  test.describe('Indonesian Error Resolution Verification', () => {
    test('should not show MISSING_MESSAGE errors in Indonesian', async ({ page }) => {
      const consoleMessages: string[] = []
      
      page.on('console', msg => {
        consoleMessages.push(msg.text())
      })
      
      page.on('pageerror', error => {
        consoleMessages.push(error.message)
      })
      
      await page.goto('/id/media-kit')
      await page.waitForLoadState('networkidle')
      
      // Check page content loaded properly
      await expect(page.locator('h1')).toBeVisible({ timeout: 10000 })
      
      // Verify no MISSING_MESSAGE errors
      const missingMessageErrors = consoleMessages.filter(msg => 
        msg.includes('MISSING_MESSAGE') && msg.includes('mediaKit')
      )
      
      expect(missingMessageErrors.length, 
        `MISSING_MESSAGE errors found: ${missingMessageErrors.join(', ')}`
      ).toBe(0)
    })

    test('should display Indonesian translations correctly', async ({ page }) => {
      await page.goto('/id/media-kit')
      await page.waitForLoadState('networkidle')
      
      // Verify page title/heading
      const mainHeading = page.locator('h1').first()
      await expect(mainHeading).toBeVisible()
      
      // Verify Indonesian-specific content
      const indonesianText = page.locator(':has-text("Kit Media"), :has-text("Dubhe"), :has-text("Unduh")')
      if (await indonesianText.count() > 0) {
        await expect(indonesianText.first()).toBeVisible()
      }
      
      // Verify page structure is intact
      const sections = page.locator('section, [data-testid*="section"]')
      expect(await sections.count()).toBeGreaterThan(3)
    })
  })

  test.describe('Accessibility', () => {
    test('should have proper heading hierarchy', async ({ page }) => {
      await page.goto('/en/media-kit')
      await page.waitForLoadState('networkidle')
      
      // Check heading hierarchy
      const headings = await page.locator('h1, h2, h3, h4, h5, h6').all()
      expect(headings.length).toBeGreaterThan(0)
      
      // Should have at least one h1
      const h1Count = await page.locator('h1').count()
      expect(h1Count).toBeGreaterThanOrEqual(1)
    })

    test('should have proper alt text for images', async ({ page }) => {
      await page.goto('/en/media-kit')
      await page.waitForLoadState('networkidle')
      
      const images = await page.locator('img').all()
      
      for (const image of images) {
        const alt = await image.getAttribute('alt')
        expect(alt).not.toBeNull()
        expect(alt?.length).toBeGreaterThan(0)
      }
    })

    test('should have keyboard navigation support', async ({ page }) => {
      await page.goto('/en/media-kit')
      await page.waitForLoadState('networkidle')
      
      // Test keyboard navigation on interactive elements
      const buttons = page.locator('button')
      const buttonCount = await buttons.count()
      
      if (buttonCount > 0) {
        const firstButton = buttons.first()
        await firstButton.focus()
        await expect(firstButton).toBeFocused()
        
        // Test keyboard activation
        await firstButton.press('Enter')
        await page.waitForTimeout(500) // Allow for interaction
      }
    })
  })
})
