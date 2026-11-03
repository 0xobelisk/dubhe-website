import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NextIntlClientProvider } from 'next-intl'
import LanguageSelector from './LanguageSelector'
import { routing } from '../i18n/routing'

const navigation = vi.hoisted(() => ({
  pathname: '/',
  router: { replace: vi.fn() },
}))

vi.mock('next/navigation', () => ({
  usePathname: () => navigation.pathname,
  useRouter: () => navigation.router,
}))

function renderSelector(locale: string, pathname: string) {
  navigation.pathname = pathname
  return render(
    <NextIntlClientProvider
      locale={locale}
      timeZone="UTC"
      messages={{ LocaleSwitcher: { label: 'Language' } }}
    >
      <LanguageSelector />
    </NextIntlClientProvider>,
  )
}

async function chooseLanguage(nativeName: string) {
  const user = userEvent.setup()
  await user.click(screen.getByRole('button', { name: /Language/ }))
  await user.click(screen.getByRole('button', { name: new RegExp(nativeName) }))
}

beforeEach(() => {
  navigation.router.replace.mockReset()
  navigation.pathname = '/'
  window.history.replaceState(null, '', '/')
})

describe('LanguageSelector route changes through its actual controls', () => {
  it.each([
    { pathname: '/', locale: 'en', target: 'Français', expected: '/fr' },
    { pathname: '/en', locale: 'en', target: 'Français', expected: '/fr' },
    { pathname: '/engine', locale: 'en', target: 'Français', expected: '/fr/engine' },
    { pathname: '/en/engine', locale: 'en', target: 'Français', expected: '/fr/engine' },
    { pathname: '/fr/engine', locale: 'fr', target: 'English', expected: '/en/engine' },
    { pathname: '/engineer', locale: 'en', target: 'Français', expected: '/fr/engineer' },
    { pathname: '/channel/en/engine', locale: 'en', target: 'Français', expected: '/fr/channel/en/engine' },
  ])('navigates $pathname to $expected', async ({ pathname, locale, target, expected }) => {
    renderSelector(locale, pathname)

    await chooseLanguage(target)

    expect(navigation.router.replace).toHaveBeenCalledExactlyOnceWith(expected)
    expect(screen.getByRole('button', { name: /Language/ })).toHaveAttribute('aria-expanded', 'false')
  })

  it.each(routing.locales)('preserves existing %s-prefixed home and nested routes', async locale => {
    const target = locale === 'fr' ? 'English' : 'Français'
    const expectedHome = locale === 'fr' ? '/en' : '/fr'
    const expectedNested = locale === 'fr' ? '/en/engine' : '/fr/engine'

    for (const [pathname, expected] of [
      [`/${locale}`, expectedHome],
      [`/${locale}/engine`, expectedNested],
    ]) {
      navigation.router.replace.mockClear()
      const view = renderSelector(locale, pathname)

      await chooseLanguage(target)

      expect(navigation.router.replace).toHaveBeenCalledExactlyOnceWith(expected)
      view.unmount()
    }
  })

  it('keeps the existing pathname-only behavior when the current URL has a query', async () => {
    window.history.replaceState(null, '', '/engine?source=campaign')
    renderSelector('en', '/engine')

    await chooseLanguage('Français')

    expect(window.location.search).toBe('?source=campaign')
    expect(navigation.router.replace).toHaveBeenCalledExactlyOnceWith('/fr/engine')
  })

  it('still closes the menu and clears its filter after selecting a language', async () => {
    const user = userEvent.setup()
    renderSelector('en', '/engine')
    const toggle = screen.getByRole('button', { name: /Language/ })
    await user.click(toggle)
    await user.type(screen.getByPlaceholderText('Type to filter'), 'Français')
    expect(screen.getByText('Filter list (1 languages)')).toBeVisible()

    await user.click(screen.getByRole('button', { name: /Français/ }))

    expect(navigation.router.replace).toHaveBeenCalledExactlyOnceWith('/fr/engine')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByPlaceholderText('Type to filter')).not.toBeInTheDocument()
    await user.click(toggle)
    expect(screen.getByPlaceholderText('Type to filter')).toHaveValue('')
    expect(screen.getByText('Filter list (16 languages)')).toBeVisible()
  })
})
