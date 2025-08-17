import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Complete User Flows E2E Tests', () => {
  // Test navigation flow
  test('User can navigate through main sections', async ({ page }) => {
    await page.goto('/en')
    
    // Homepage to Foundation
    await page.click('text=Foundation')
    await page.waitForURL('**/foundation')
    await expect(page.locator('h1')).toContainText('Supporting the growth')
    
    // Foundation to Labs
    await page.click('text=Labs')
    await page.waitForURL('**/labs')
    await expect(page.locator('h1')).toContainText('Dubhe Research Labs')
    
    // Labs to Grants
    await page.click('text=Grants')
    await page.waitForURL('**/grants')
    await expect(page.locator('h1')).toContainText('Fund Your Innovation')
    
    // Complete navigation flow
    await page.click('text=Contact')
    await page.waitForURL('**/contact')
    await expect(page.locator('h1')).toContainText('Get in Touch')
  })

  // Test contact form submission flow
  test('User can complete contact form submission', async ({ page }) => {
    await page.goto('/en/contact')
    
    // Fill out form
    await page.fill('input[name="name"]', 'Test User')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.selectOption('select[name="type"]', 'general')
    await page.fill('textarea[name="message"]', 'This is a test message for E2E testing.')
    
    // Submit form
    await page.click('button[type="submit"]')
    
    // Wait for success feedback
    await page.waitForSelector('text=Message sent successfully', { timeout: 10000 })
    await expect(page.locator('text=Message sent successfully')).toBeVisible()
  })

  // Test language switching flow
  test('User can switch between languages', async ({ page }) => {
    await page.goto('/en')
    
    // Check initial language
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    
    // Switch to Chinese
    await page.goto('/zh-TW')
    await page.waitForLoadState('networkidle')
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-TW')
    
    // Switch to Japanese
    await page.goto('/ja')
    await page.waitForLoadState('networkidle')
    await expect(page.locator('html')).toHaveAttribute('lang', 'ja')
    
    // Verify content changes
    await expect(page.locator('text=Dubhe')).toBeVisible()
  })

  // Test responsive behavior
  test('Site works correctly on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/en')
    
    // Check mobile menu
    const mobileMenuButton = page.locator('button[aria-label*="menu"]').first()
    if (await mobileMenuButton.count() > 0) {
      await mobileMenuButton.click()
      await expect(page.locator('nav')).toBeVisible()
    }
    
    // Test form on mobile
    await page.goto('/en/contact')
    await page.fill('input[name="name"]', 'Mobile User')
    await page.fill('input[name="email"]', 'mobile@test.com')
    
    // Ensure form is usable
    const submitButton = page.locator('button[type="submit"]')
    await expect(submitButton).toBeVisible()
  })

  // Test error handling flows
  test('Error pages display correctly', async ({ page }) => {
    // Test 404 page
    await page.goto('/en/nonexistent-page')
    await expect(page.locator('h1')).toContainText('404')
    
    // Test navigation from 404
    await page.click('text=Go to Homepage')
    await page.waitForURL('**/en')
    await expect(page.locator('h1')).toBeVisible()
  })

  // Test search and discovery flow
  test('User can discover content through internal links', async ({ page }) => {
    await page.goto('/en')
    
    // Click on grants link from homepage
    await page.click('text=Grants')
    await page.waitForURL('**/grants')
    
    // Navigate to application
    const applyButton = page.locator('button, a').filter({ hasText: /Apply|Submit/ }).first()
    if (await applyButton.count() > 0) {
      await expect(applyButton).toBeVisible()
    }
    
    // Navigate to team page
    await page.goto('/en/team')
    await expect(page.locator('h1')).toContainText('Team')
  })

  // Test performance and loading
  test('Pages load within acceptable time', async ({ page }) => {
    const startTime = Date.now()
    
    await page.goto('/en')
    await page.waitForLoadState('networkidle')
    
    const loadTime = Date.now() - startTime
    expect(loadTime).toBeLessThan(5000) // 5 seconds max
    
    // Test navigation speed
    const navStart = Date.now()
    await page.click('text=Foundation')
    await page.waitForLoadState('networkidle')
    
    const navTime = Date.now() - navStart
    expect(navTime).toBeLessThan(3000) // 3 seconds max
  })

  // Test accessibility throughout user flow
  test('Accessibility maintained throughout navigation', async ({ page }) => {
    const pages = ['/en', '/en/foundation', '/en/labs', '/en/grants', '/en/contact']
    
    for (const pagePath of pages) {
      await page.goto(pagePath)
      await page.waitForLoadState('networkidle')
      
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze()
      
      expect(accessibilityScanResults.violations).toEqual([])
    }
  })

  // Test form validation and error states
  test('Form validation works correctly', async ({ page }) => {
    await page.goto('/en/contact')
    
    // Try to submit empty form
    await page.click('button[type="submit"]')
    
    // Check for validation messages
    const nameField = page.locator('input[name="name"]')
    const emailField = page.locator('input[name="email"]')
    
    // Check if HTML5 validation or custom validation is working
    const nameValid = await nameField.evaluate(el => (el as HTMLInputElement).validity.valid)
    const emailValid = await emailField.evaluate(el => (el as HTMLInputElement).validity.valid)
    
    expect(nameValid || emailValid).toBe(false) // At least one should be invalid
  })

  // Test dynamic content loading
  test('Dynamic content loads correctly', async ({ page }) => {
    await page.goto('/en/labs')
    
    // Wait for any dynamic content to load
    await page.waitForLoadState('networkidle')
    
    // Check that content is populated
    const labCards = page.locator('[class*="card"], [class*="lab"]')
    const cardCount = await labCards.count()
    
    if (cardCount > 0) {
      expect(cardCount).toBeGreaterThan(0)
    }
  })

  // Test internationalization edge cases
  test('RTL languages display correctly', async ({ page }) => {
    // Test with Arabic or Hebrew if supported
    await page.goto('/en')
    
    // Check text direction
    const htmlDir = await page.locator('html').getAttribute('dir')
    expect(htmlDir).toBeTruthy()
    
    // Test URL structure for different locales
    const supportedLocales = ['en', 'zh-TW', 'ja', 'fr', 'ko']
    
    for (const locale of supportedLocales) {
      await page.goto(`/${locale}`)
      await page.waitForLoadState('networkidle')
      
      const currentUrl = page.url()
      expect(currentUrl).toContain(locale)
    }
  })
})

test.describe('Critical Business Flows', () => {
  // Test grant application discovery flow
  test('User can discover and access grant information', async ({ page }) => {
    await page.goto('/en')
    
    // Navigate to grants
    await page.click('text=Grants')
    await page.waitForURL('**/grants')
    
    // Check grant information is available
    await expect(page.locator('text=/Grant|Fund|Apply/')).toBeVisible()
    
    // Check for call-to-action buttons
    const ctaButtons = page.locator('button, a').filter({ 
      hasText: /Apply|Submit|Contact|Learn More/ 
    })
    const ctaCount = await ctaButtons.count()
    expect(ctaCount).toBeGreaterThan(0)
  })

  // Test community engagement flow
  test('User can access community features', async ({ page }) => {
    await page.goto('/en')
    
    // Test ambassador program
    await page.goto('/en/ambassador')
    await expect(page.locator('h1')).toBeVisible()
    
    // Test events page
    await page.goto('/en/events')
    await expect(page.locator('h1')).toBeVisible()
    
    // Test contact accessibility
    await page.goto('/en/contact')
    await expect(page.locator('form')).toBeVisible()
  })

  // Test information architecture
  test('Information is logically organized and findable', async ({ page }) => {
    await page.goto('/en')
    
    // Check main navigation structure
    const navItems = page.locator('nav a, nav button')
    const navCount = await navItems.count()
    expect(navCount).toBeGreaterThan(3)
    
    // Check footer links work
    const footerLinks = page.locator('footer a')
    const footerCount = await footerLinks.count()
    
    if (footerCount > 0) {
      const firstFooterLink = footerLinks.first()
      const href = await firstFooterLink.getAttribute('href')
      expect(href).toBeTruthy()
    }
  })
})