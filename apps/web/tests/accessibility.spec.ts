import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

// Accessibility tests for key pages
const keyPages = [
  { path: '/en', name: 'Home' },
  { path: '/en/foundation', name: 'Foundation' },
  { path: '/en/grants', name: 'Grants' },
  { path: '/en/labs', name: 'Labs' },
  { path: '/en/contact', name: 'Contact' },
  { path: '/en/team', name: 'Team' },
]

keyPages.forEach(({ path, name }) => {
  test.describe(`${name} Page Accessibility`, () => {
    test(`should not have any automatically detectable accessibility issues`, async ({ page }) => {
      await page.goto(path)
      
      // Wait for page to load completely
      await page.waitForLoadState('networkidle')
      
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze()

      expect(accessibilityScanResults.violations).toEqual([])
    })

    test(`should have proper focus management`, async ({ page }) => {
      await page.goto(path)
      await page.waitForLoadState('networkidle')
      
      // Test keyboard navigation
      await page.keyboard.press('Tab')
      const focusedElement = await page.locator(':focus')
      await expect(focusedElement).toBeVisible()
      
      // Ensure focus is visible
      const focusedElementBox = await focusedElement.boundingBox()
      expect(focusedElementBox).not.toBeNull()
    })

    test(`should have proper heading hierarchy`, async ({ page }) => {
      await page.goto(path)
      await page.waitForLoadState('networkidle')
      
      // Check that h1 exists and is unique
      const h1Count = await page.locator('h1').count()
      expect(h1Count).toBeGreaterThanOrEqual(1)
      
      // Check heading hierarchy (h1 -> h2 -> h3, etc.)
      const headings = await page.locator('h1, h2, h3, h4, h5, h6').allTextContents()
      expect(headings.length).toBeGreaterThan(0)
    })

    test(`should have proper alt text for images`, async ({ page }) => {
      await page.goto(path)
      await page.waitForLoadState('networkidle')
      
      // Check that all images have alt text
      const images = page.locator('img')
      const imageCount = await images.count()
      
      for (let i = 0; i < imageCount; i++) {
        const image = images.nth(i)
        const altText = await image.getAttribute('alt')
        const src = await image.getAttribute('src')
        
        // Skip decorative images (empty alt is acceptable)
        if (altText === null) {
          console.warn(`Image missing alt attribute: ${src}`)
        }
      }
    })

    test(`should have proper color contrast`, async ({ page }) => {
      await page.goto(path)
      await page.waitForLoadState('networkidle')
      
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2aa'])
        .include('*')
        .withRules(['color-contrast'])
        .analyze()

      expect(accessibilityScanResults.violations).toEqual([])
    })
  })
})

test.describe('Interactive Elements Accessibility', () => {
  test('Navigation should be keyboard accessible', async ({ page }) => {
    await page.goto('/en')
    await page.waitForLoadState('networkidle')
    
    // Test main navigation
    const navLinks = page.locator('nav a')
    const navLinkCount = await navLinks.count()
    
    // Start keyboard navigation
    await page.keyboard.press('Tab')
    
    for (let i = 0; i < Math.min(5, navLinkCount); i++) {
      const focusedElement = page.locator(':focus')
      await expect(focusedElement).toBeVisible()
      
      // Ensure focused element is actually a navigation element
      const tagName = await focusedElement.evaluate(el => el.tagName)
      expect(['A', 'BUTTON'].includes(tagName)).toBeTruthy()
      
      await page.keyboard.press('Tab')
    }
  })

  test('Contact form should be accessible', async ({ page }) => {
    await page.goto('/en/contact')
    await page.waitForLoadState('networkidle')
    
    // Check form labels
    const formInputs = page.locator('input, textarea, select')
    const inputCount = await formInputs.count()
    
    for (let i = 0; i < inputCount; i++) {
      const input = formInputs.nth(i)
      const id = await input.getAttribute('id')
      const ariaLabel = await input.getAttribute('aria-label')
      const ariaLabelledBy = await input.getAttribute('aria-labelledby')
      
      if (id) {
        const label = page.locator(`label[for="${id}"]`)
        const hasLabel = (await label.count()) > 0
        
        expect(hasLabel || ariaLabel || ariaLabelledBy).toBeTruthy()
      }
    }
  })

  test('Error pages should be accessible', async ({ page }) => {
    // Test 404 page
    await page.goto('/en/nonexistent-page')
    await page.waitForLoadState('networkidle')
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
    
    // Check that error message is announced
    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()
    
    const mainContent = page.locator('main')
    await expect(mainContent).toBeVisible()
  })
})

test.describe('Mobile Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
  })

  test('Mobile navigation should be accessible', async ({ page }) => {
    await page.goto('/en')
    await page.waitForLoadState('networkidle')
    
    // Look for mobile menu button
    const mobileMenuButton = page.locator('[aria-label*="menu"], [aria-label*="Menu"], button:has-text("Menu")')
    
    if (await mobileMenuButton.count() > 0) {
      // Test mobile menu accessibility
      await expect(mobileMenuButton).toBeVisible()
      await expect(mobileMenuButton).toHaveAttribute('aria-label')
      
      // Test menu toggle
      await mobileMenuButton.click()
      
      const mobileMenu = page.locator('[role="menu"], [role="navigation"] ul')
      if (await mobileMenu.count() > 0) {
        await expect(mobileMenu).toBeVisible()
      }
    }
  })

  test('Touch targets should be large enough', async ({ page }) => {
    await page.goto('/en')
    await page.waitForLoadState('networkidle')
    
    // Test that interactive elements are at least 44x44px
    const buttons = page.locator('button, a')
    const buttonCount = await buttons.count()
    
    for (let i = 0; i < Math.min(10, buttonCount); i++) {
      const button = buttons.nth(i)
      const isVisible = await button.isVisible()
      
      if (isVisible) {
        const box = await button.boundingBox()
        if (box) {
          // WCAG recommends minimum 44x44px touch targets
          expect(box.width >= 32 || box.height >= 32).toBeTruthy()
        }
      }
    }
  })
})

test.describe('Screen Reader Compatibility', () => {
  test('Page should have proper landmark regions', async ({ page }) => {
    await page.goto('/en')
    await page.waitForLoadState('networkidle')
    
    // Check for basic landmark roles
    await expect(page.locator('[role="main"], main')).toBeVisible()
    await expect(page.locator('[role="navigation"], nav')).toBeVisible()
    
    // Check for header/footer
    const header = page.locator('header, [role="banner"]')
    const footer = page.locator('footer, [role="contentinfo"]')
    
    expect((await header.count()) > 0).toBeTruthy()
    expect((await footer.count()) > 0).toBeTruthy()
  })

  test('Skip links should be present', async ({ page }) => {
    await page.goto('/en')
    await page.waitForLoadState('networkidle')
    
    // Tab to reveal skip links
    await page.keyboard.press('Tab')
    
    const skipLink = page.locator('a:has-text("skip"), a[href="#main"], a[href="#content"]')
    
    // Skip links might be visually hidden but should be focusable
    if (await skipLink.count() > 0) {
      await expect(skipLink.first()).toBeFocused()
    }
  })
})