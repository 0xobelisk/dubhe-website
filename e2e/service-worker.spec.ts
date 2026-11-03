import { expect, test } from '@playwright/test'

test('the first service worker activation keeps the rendered page open', async ({ page }) => {
  const navigations: string[] = []
  page.on('request', request => {
    if (request.isNavigationRequest() && request.frame() === page.mainFrame()) navigations.push(request.url())
  })
  await page.addInitScript(() => {
    if (window.top !== window) return
    const key = 'ci-sw-document-starts'
    sessionStorage.setItem(key, String(Number(sessionStorage.getItem(key) || '0') + 1))
  })

  await page.goto('/en', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await page.waitForFunction(() => Boolean(navigator.serviceWorker.controller), undefined, { timeout: 30000 })
  await page.evaluate(() => new Promise<void>(resolve => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  }))

  expect(navigations).toEqual([new URL('/en', page.url()).href])
  expect(await page.evaluate(() => sessionStorage.getItem('ci-sw-document-starts'))).toBe('1')
  expect(await page.evaluate(async () => {
    const registration = await navigator.serviceWorker.getRegistration()
    return registration?.active ? new URL(registration.active.scriptURL).pathname : null
  })).toBe('/sw-cache.js')
  expect(await page.evaluate(async () => {
    if (!(await caches.keys()).includes('dubhe-cache-v1')) return false
    const cache = await caches.open('dubhe-cache-v1')
    return Boolean((await cache.match('/logo/light.png'))?.ok)
  })).toBe(true)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/We make the Dubhe\.\s*You make it Move\./)
})
