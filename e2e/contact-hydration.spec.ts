import { expect, test } from '@playwright/test'

test('contact controls wait for hydration and preserve the first input with delayed JavaScript', async ({ page }) => {
  let releaseScripts!: () => void
  const scriptGate = new Promise<void>(resolve => { releaseScripts = resolve })
  const blockedScripts: string[] = []
  const submissions: string[] = []
  const navigations: string[] = []

  await page.route(/\/_next\/static\/.*\.js(?:\?.*)?$/, async route => {
    blockedScripts.push(route.request().url())
    await scriptGate
    await route.continue()
  })
  await page.route('**/api/contact', async route => {
    submissions.push(route.request().method())
    await route.abort()
  })
  page.on('request', request => {
    if (request.isNavigationRequest() && request.frame() === page.mainFrame()) navigations.push(request.url())
  })
  await page.addInitScript(() => {
    if (window.top !== window) return
    const key = 'ci-contact-document-starts'
    sessionStorage.setItem(key, String(Number(sessionStorage.getItem(key) || '0') + 1))
  })

  try {
    await page.goto('/en/contact', { waitUntil: 'commit' })
    await expect(page.locator('form')).toBeVisible()
    await expect.poll(() => blockedScripts.length).toBeGreaterThan(0)

    const name = page.locator('input[name="name"]')
    const email = page.locator('input[name="email"]')
    const subject = page.locator('select[name="subject"]')
    const message = page.locator('textarea[name="message"]')
    const submit = page.locator('button[type="submit"]')

    for (const control of [name, email, subject, message, submit]) await expect(control).toBeDisabled()

    releaseScripts()
    for (const control of [name, email, subject, message, submit]) await expect(control).toBeEnabled()

    await name.fill('John Doe')
    await email.fill('john@example.com')
    await subject.selectOption('partnership')
    await message.fill('I would like to discuss partnership opportunities.')
    await page.waitForLoadState('load')

    await expect(name).toHaveValue('John Doe')
    await expect(email).toHaveValue('john@example.com')
    await expect(subject).toHaveValue('partnership')
    await expect(message).toHaveValue('I would like to discuss partnership opportunities.')
    expect(await page.evaluate(() => sessionStorage.getItem('ci-contact-document-starts'))).toBe('1')
    expect(navigations).toEqual([new URL('/en/contact', page.url()).href])
    expect(submissions).toEqual([])
  } finally {
    releaseScripts()
  }
})
