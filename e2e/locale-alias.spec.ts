import { expect, test, type Page } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

type Locale = 'en' | 'fr'

function openMenuLabel(locale: Locale): string {
  const messages = JSON.parse(readFileSync(join(process.cwd(), 'apps/web/messages', `${locale}.json`), 'utf8'))
  return messages.navigation.openMenu
}

async function currentLanguageButton(page: Page, locale: Locale) {
  const navigation = page.getByRole('navigation')
  const openMenu = navigation.getByRole('button', { name: openMenuLabel(locale), exact: true })
  if (await openMenu.isVisible()) await openMenu.click()

  const button = navigation.locator('button[aria-expanded][aria-haspopup]:visible')
  await expect(button).toHaveCount(1)
  await button.scrollIntoViewIfNeeded()
  await expect(button).toBeVisible()
  await expect(button).toContainText(new RegExp(`\\b${locale.toUpperCase()}\\b`))
  return button
}

async function selectLanguage(page: Page, current: Locale, target: Locale) {
  const button = await currentLanguageButton(page, current)
  await button.click()

  const filter = page.getByRole('navigation').getByPlaceholder('Type to filter')
  await expect(filter).toBeVisible()
  await filter.fill(target === 'fr' ? 'French' : 'English')

  const option = page.getByRole('navigation').getByRole('button').filter({
    has: page.getByRole('heading', { level: 4, name: target === 'fr' ? 'Français' : 'English', exact: true })
  })
  await expect(option).toHaveCount(1)
  await expect(option).toBeVisible()
  await option.click()
}

for (const { entry, french, english } of [
  { entry: '/', french: '/fr', english: '/en' },
  { entry: '/engine', french: '/fr/engine', english: '/en/engine' }
]) {
  test(`switches French and English from the unprefixed ${entry} entry`, async ({ page }) => {
    const response = await page.goto(entry)
    await page.waitForLoadState('networkidle')
    expect(response?.status()).toBe(200)
    await expect(page).toHaveURL(entry)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')

    await selectLanguage(page, 'en', 'fr')
    await expect(page).toHaveURL(french)
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr')
    await currentLanguageButton(page, 'fr')

    await selectLanguage(page, 'fr', 'en')
    await expect(page).toHaveURL(english)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await currentLanguageButton(page, 'en')
  })
}
