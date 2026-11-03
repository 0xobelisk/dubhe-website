import { describe, expect, it, vi } from 'vitest'
import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import proxy from '../proxy'
import { routing } from '../i18n/routing'

vi.unmock('next/server')
vi.unmock('next-intl/middleware')
vi.unmock('next-intl/routing')

const origin = 'https://dubhe.obelisk.build'
const originalIntlProxy = createMiddleware(routing)
let requestNumber = 0

function request(pathname: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers)
  if (!headers.has('x-forwarded-for')) {
    headers.set('x-forwarded-for', `192.0.2.${++requestNumber}`)
  }
  return new NextRequest(`${origin}${pathname}`, { ...init, headers })
}

function expectSecurityHeaders(response: Response) {
  expect(response.headers.get('X-Frame-Options')).toBe('DENY')
  expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff')
  expect(response.headers.get('X-XSS-Protection')).toBe('1; mode=block')
  expect(response.headers.get('Referrer-Policy')).toBe('strict-origin-when-cross-origin')
  expect(response.headers.get('Permissions-Policy')).toBe('camera=(), microphone=(), geolocation=()')
  expect(response.headers.get('Strict-Transport-Security')).toBe('max-age=31536000; includeSubDomains; preload')
  expect(response.headers.get('Content-Security-Policy')).toContain("default-src 'self';")
  expect(response.headers.get('Content-Security-Policy')).toContain("frame-ancestors 'none';")
  expect(response.headers.get('Content-Security-Policy')).toContain("form-action 'self';")
}

function expectOriginalRouting(actual: NextResponse, expected: NextResponse) {
  expect(actual.status).toBe(expected.status)
  for (const header of [
    'Location', 'x-middleware-rewrite', 'x-middleware-next',
    'x-middleware-request-x-next-intl-locale', 'Link',
  ]) {
    expect(actual.headers.get(header), header).toBe(expected.headers.get(header))
  }
}

describe('proxy locale routing with real next-intl middleware', () => {
  it.each([
    ['/', '/en'],
    ['/engine?source=lighthouse&mode=preview', '/en/engine?source=lighthouse&mode=preview'],
  ])('internally rewrites default-locale GET %s without a redirect', async (pathname, target) => {
    const response = await proxy(request(pathname))

    expect(response).toBeInstanceOf(NextResponse)
    expect(response.status).toBe(200)
    expect(response.headers.get('Location')).toBeNull()
    expect(response.headers.get('x-middleware-rewrite')).toBe(`${origin}${target}`)
    expect(response.headers.get('x-middleware-request-x-next-intl-locale')).toBe('en')
    expect(response.headers.get('Link')).toBeNull()
    expectSecurityHeaders(response)
  })

  it('internally rewrites an unprefixed HEAD request and preserves its query', async () => {
    const response = await proxy(request('/engine?source=head', { method: 'HEAD' }))

    expect(response.status).toBe(200)
    expect(response.headers.get('Location')).toBeNull()
    expect(response.headers.get('x-middleware-rewrite')).toBe(`${origin}/en/engine?source=head`)
    expectSecurityHeaders(response)
  })

  it('keeps all 16 existing locale-prefixed routes on their original middleware', async () => {
    expect(routing.locales).toHaveLength(16)
    for (const locale of routing.locales) {
      const pathname = `/${locale}/engine?source=prefixed`
      const init = { headers: { 'accept-language': 'fr', cookie: 'NEXT_LOCALE=fr' } }
      const response = await proxy(request(pathname, init))
      const original = originalIntlProxy(request(pathname, init))

      expectOriginalRouting(response, original)
      expect(response.status).toBe(200)
      expect(response.headers.get('Location')).toBeNull()
      expect(response.headers.get('x-middleware-request-x-next-intl-locale')).toBe(locale)
      expectSecurityHeaders(response)
    }
  })

  it('preserves normalization of case variants and encoded locale prefixes', async () => {
    for (const pathname of ['/EN/engine', '/%65n/engine', '/zh-tw/engine']) {
      const response = await proxy(request(pathname))
      expectOriginalRouting(response, originalIntlProxy(request(pathname)))
    }
  })

  it.each(['/', '/engine?source=language'])('negotiates French for unprefixed %s via Accept-Language', async pathname => {
    const response = await proxy(request(pathname, { headers: { 'accept-language': 'fr-FR,fr;q=0.9,en;q=0.8' } }))
    const target = pathname === '/' ? '/fr' : `/fr${pathname}`

    expect(response.status).toBe(307)
    expect(response.headers.get('Location')).toBe(`${origin}${target}`)
    expect(response.headers.get('x-middleware-rewrite')).toBeNull()
    // next-intl does not add a preference cookie when the language header already matches.
    expect(response.cookies.get('NEXT_LOCALE')).toBeUndefined()
    expectSecurityHeaders(response)
  })

  it('gives a supported locale cookie precedence over Accept-Language', async () => {
    const response = await proxy(request('/engine?source=cookie', {
      headers: { cookie: 'NEXT_LOCALE=fr', 'accept-language': 'en-US,en;q=0.9' },
    }))

    expect(response.status).toBe(307)
    expect(response.headers.get('Location')).toBe(`${origin}/fr/engine?source=cookie`)
    expectSecurityHeaders(response)
  })

  it('ignores an unsupported cookie and serves the negotiated default locale', async () => {
    const response = await proxy(request('/engine', {
      headers: { cookie: 'NEXT_LOCALE=unsupported', 'accept-language': 'en-US,en;q=0.9' },
    }))

    expect(response.status).toBe(200)
    expect(response.headers.get('Location')).toBeNull()
    expect(response.headers.get('x-middleware-rewrite')).toBe(`${origin}/en/engine`)
  })

  it('keeps contact POST redirects and form rate-limit headers unchanged', async () => {
    const response = await proxy(request('/contact?source=form', { method: 'POST' }))

    expect(response.status).toBe(307)
    expect(response.headers.get('Location')).toBe(`${origin}/en/contact?source=form`)
    expect(response.headers.get('X-RateLimit-Limit')).toBe('100')
    expect(response.headers.get('X-RateLimit-Remaining')).toBe('99')
    expectSecurityHeaders(response)
  })

  it.each(['PUT', 'PATCH', 'DELETE', 'OPTIONS'])('preserves the original unprefixed %s page behavior', async method => {
    const response = await proxy(request('/contact?source=method', { method }))
    expectOriginalRouting(response, originalIntlProxy(request('/contact?source=method', { method })))
    expect(response.status).toBe(307)
    expect(response.headers.get('X-RateLimit-Limit')).toBeNull()
  })

  it.each(['GET', 'HEAD', 'POST'])('keeps API %s requests as next responses with rate-limit headers', async method => {
    const response = await proxy(request('/api/contact?source=api', { method }))

    expect(response.status).toBe(200)
    expect(response.headers.get('x-middleware-next')).toBe('1')
    expect(response.headers.get('x-middleware-rewrite')).toBeNull()
    expect(response.headers.get('Location')).toBeNull()
    expect(response.headers.get('X-RateLimit-Limit')).toBe('100')
    expect(response.headers.get('X-RateLimit-Remaining')).toBe('99')
    expectSecurityHeaders(response)
  })

  it('preserves API CORS preflight headers for allowed origins only', async () => {
    const allowed = await proxy(request('/api/contact', { method: 'OPTIONS', headers: { origin } }))
    expect(allowed.status).toBe(200)
    expect(allowed.headers.get('Access-Control-Allow-Origin')).toBe(origin)
    expect(allowed.headers.get('Access-Control-Allow-Credentials')).toBe('true')
    expect(allowed.headers.get('Access-Control-Allow-Methods')).toBe('GET, POST, PUT, DELETE, OPTIONS')
    expect(allowed.headers.get('Access-Control-Allow-Headers')).toBe('Content-Type, Authorization, X-Requested-With')
    expect(allowed.headers.get('Access-Control-Max-Age')).toBe('86400')
    expectSecurityHeaders(allowed)

    const denied = await proxy(request('/api/contact', { method: 'OPTIONS', headers: { origin: 'https://example.invalid' } }))
    expect(denied.headers.get('Access-Control-Allow-Origin')).toBeNull()
    expect(denied.headers.get('Access-Control-Allow-Credentials')).toBeNull()
  })

  it('retains the API request limit and its existing 429 security response', async () => {
    const init = { headers: { 'x-forwarded-for': '198.51.100.100' } }
    for (let index = 0; index < 100; index++) {
      const response = await proxy(request('/api/contact', init))
      expect(response.status).toBe(200)
      expect(response.headers.get('X-RateLimit-Remaining')).toBe(String(99 - index))
    }
    const limited = await proxy(request('/api/contact', init))
    expect(limited.status).toBe(429)
    expect(limited.headers.get('Retry-After')).toBe('900')
    expect(await limited.json()).toMatchObject({ success: false, retryAfter: 900 })
    expectSecurityHeaders(limited)
  })

  it('retains sensitive-file blocking and internal-route robots restrictions', async () => {
    for (const pathname of ['/.env', '/debug.log', '/package.json', '/next.config.js']) {
      const response = await proxy(request(pathname))
      expect(response.status).toBe(404)
      expect(await response.text()).toBe('Not Found')
    }
    const internal = await proxy(request('/api/internal/status'))
    expect(internal.headers.get('X-Robots-Tag')).toBe('noindex, nofollow, noarchive, nosnippet')
    expect(internal.headers.get('X-RateLimit-Limit')).toBe('100')
  })

  it('leaves file-like GET paths on their original routing and cache behavior', async () => {
    const pathname = '/assets/styles.css?version=1'
    const response = await proxy(request(pathname))
    expectOriginalRouting(response, originalIntlProxy(request(pathname)))
    expect(response.headers.get('Cache-Control')).toBe('public, max-age=31536000, immutable')
  })
})
