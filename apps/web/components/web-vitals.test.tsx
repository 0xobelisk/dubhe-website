import { act, render, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { WebVitals } from './web-vitals'

const metrics = vi.hoisted(() => ({
  handlers: {} as Record<string, (metric: Record<string, unknown>) => void>,
  breadcrumb: vi.fn(),
}))

vi.mock('@sentry/nextjs', () => ({ addBreadcrumb: metrics.breadcrumb }))
vi.mock('web-vitals', () => Object.fromEntries(
  ['CLS', 'FCP', 'INP', 'LCP', 'TTFB'].map(name => [
    `on${name}`,
    (callback: (metric: Record<string, unknown>) => void) => { metrics.handlers[name] = callback },
  ])
))

describe('Web Vitals analytics receivers', () => {
  beforeEach(() => {
    metrics.handlers = {}
    metrics.breadcrumb.mockClear()
    vi.stubEnv('NODE_ENV', 'production')
    vi.stubEnv('NEXT_PUBLIC_SENTRY_DSN', 'https://public@example.test/1')
    vi.stubEnv('NEXT_PUBLIC_ANALYTICS_ENDPOINT', undefined)
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }))
    vi.stubGlobal('PerformanceObserver', class { observe() {} })
    window.gtag = vi.fn()
    window.dataLayer = []
  })

  afterEach(() => {
    delete window.gtag
    delete window.dataLayer
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it.each([undefined, '', '   '])('does not call a nonexistent receiver when its configuration is %s', async endpoint => {
    vi.stubEnv('NEXT_PUBLIC_ANALYTICS_ENDPOINT', endpoint)
    render(<WebVitals />)
    await waitFor(() => expect(Object.keys(metrics.handlers)).toHaveLength(5))
    act(() => metrics.handlers.LCP({
      id: 'lcp-default', name: 'LCP', value: 1234, delta: 1234, rating: 'good', navigationType: 'navigate',
    }))

    expect(fetch).not.toHaveBeenCalled()
    expect(window.gtag).toHaveBeenCalledWith('event', 'page_view', expect.any(Object))
    expect(window.gtag).toHaveBeenCalledWith('event', 'web_vitals', expect.objectContaining({ metric_name: 'LCP', metric_value: 1234 }))
    expect(window.dataLayer).toContainEqual(expect.objectContaining({ event: 'web_vitals', metric_name: 'LCP' }))
    expect(metrics.breadcrumb).toHaveBeenCalledWith(expect.objectContaining({ category: 'web-vital', message: 'LCP: 1234' }))
  })

  it('sends page views and performance violations to an explicitly configured receiver', async () => {
    vi.stubEnv('NEXT_PUBLIC_ANALYTICS_ENDPOINT', 'https://metrics.example.test/events')
    render(<WebVitals />)
    await waitFor(() => expect(metrics.handlers.LCP).toBeTypeOf('function'))
    act(() => metrics.handlers.LCP({ id: 'lcp-slow', name: 'LCP', value: 4500, delta: 4500, rating: 'poor' }))

    const requests = vi.mocked(fetch).mock.calls
    expect(requests).toHaveLength(3)
    for (const [url, options] of requests) {
      expect(url).toBe('https://metrics.example.test/events')
      expect(options).toMatchObject({ method: 'POST', headers: { 'Content-Type': 'application/json' } })
    }
    const events = requests.map(([, options]) => JSON.parse(options?.body as string))
    expect(events[0]).toMatchObject({ name: 'page_view', properties: { page_path: '/' } })
    expect(events[1]).toMatchObject({ name: 'web_vitals', properties: { metric_name: 'LCP', metric_value: 4500, navigation_type: 'unknown' } })
    expect(events[2]).toMatchObject({ name: 'performance_budget_exceeded', properties: { metric_name: 'LCP', severity: 'high' } })
  })

  it('keeps the page mounted when a configured receiver cannot be reached', async () => {
    vi.stubEnv('NEXT_PUBLIC_ANALYTICS_ENDPOINT', '/custom-metrics')
    const failure = new Error('receiver unavailable')
    vi.mocked(fetch).mockRejectedValue(failure)
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const { container } = render(<><h1>Public page</h1><WebVitals /></>)

    await waitFor(() => expect(warn).toHaveBeenCalledWith('Failed to send analytics:', failure))
    expect(container.querySelector('h1')).toHaveTextContent('Public page')
  })

  it('uses development diagnostics without posting to a production receiver', async () => {
    vi.stubEnv('NODE_ENV', 'development')
    vi.stubEnv('NEXT_PUBLIC_ANALYTICS_ENDPOINT', '/custom-metrics')
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})
    sessionStorage.clear()
    render(<WebVitals />)
    await waitFor(() => expect(metrics.handlers.FCP).toBeTypeOf('function'))
    act(() => metrics.handlers.FCP({ id: 'fcp-dev', name: 'FCP', value: 400, delta: 400, rating: 'good' }))

    expect(fetch).not.toHaveBeenCalled()
    expect(log).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ name: 'page_view' }))
    expect(JSON.parse(sessionStorage.getItem('web-vitals') || '[]')).toContainEqual(expect.objectContaining({ id: 'fcp-dev', name: 'FCP', value: 400 }))
    sessionStorage.clear()
  })
})
