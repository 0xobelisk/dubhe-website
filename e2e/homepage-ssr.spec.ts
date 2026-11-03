import { expect, test } from '@playwright/test'

test.describe('Homepage content before hydration', () => {
  test.use({ javaScriptEnabled: false })

  test('renders the real headline and developer links without client JavaScript', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'domcontentloaded' })

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/We make the Dubhe\.\s*You make it Move\./)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    expect(await page.getByRole('heading', { level: 1 }).evaluate(heading => {
      for (let element: Element | null = heading; element; element = element.parentElement) {
        if (Number(getComputedStyle(element).opacity) < 1) return false
      }
      return true
    })).toBe(true)
    await expect(page.getByRole('link', { name: 'Get Dubhe Stack', exact: true })).toHaveAttribute('href', 'https://github.com/0xobelisk/dubhe')
    await expect(page.getByRole('link', { name: 'Learn about licensing', exact: true })).toHaveAttribute('href', 'https://github.com/0xobelisk/Dubhe/tree/main?tab=License-1-ov-file#readme')
  })

  test('serves the declared icons and service worker without locale redirects', async ({ request }) => {
    for (const path of ['/favicon-black.ico', '/favicon-white.ico', '/sw-cache.js']) {
      const response = await request.get(path, { maxRedirects: 0 })
      expect(response.status(), path).toBe(200)
      expect(response.headers()['content-type'], path).toMatch(path.endsWith('.js') ? /javascript/ : /image/)
    }
  })
})
