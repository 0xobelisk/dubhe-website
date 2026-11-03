import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { addBreadcrumb, captureException } from './browser-monitoring'

const sdk = vi.hoisted(() => ({
  captureException: vi.fn(),
  addBreadcrumb: vi.fn(),
}))

vi.mock('@sentry/nextjs', () => sdk)

describe('browser monitoring configuration', () => {
  beforeEach(() => {
    sdk.captureException.mockReset()
    sdk.addBreadcrumb.mockReset()
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it.each([undefined, ''])('does not call the SDK without a DSN (%s)', dsn => {
    vi.stubEnv('NEXT_PUBLIC_SENTRY_DSN', dsn)

    expect(captureException(new Error('Request failed'), { level: 'error' })).toBeUndefined()
    expect(addBreadcrumb({ message: 'Request started' })).toBeUndefined()
    expect(sdk.captureException).not.toHaveBeenCalled()
    expect(sdk.addBreadcrumb).not.toHaveBeenCalled()
  })

  it('synchronously forwards the original exception and options and returns the SDK event ID', () => {
    vi.stubEnv('NEXT_PUBLIC_SENTRY_DSN', 'https://public@example.test/1')
    const error = new Error('Request failed')
    const options = { tags: { section: 'api_error' }, extra: { attempt: 1 }, level: 'error' as const }
    const eventId = '0123456789abcdef0123456789abcdef'
    const calls: string[] = []
    sdk.captureException.mockImplementationOnce((receivedError, receivedOptions) => {
      expect(receivedError).toBe(error)
      expect(receivedOptions).toBe(options)
      calls.push('sdk')
      return eventId
    })

    calls.push('before')
    const result = captureException(error, options)
    calls.push('after')

    expect(result).toBe(eventId)
    expect(calls).toEqual(['before', 'sdk', 'after'])
    expect(sdk.captureException).toHaveBeenCalledExactlyOnceWith(error, options)
  })

  it('synchronously forwards the original breadcrumb and hint', () => {
    vi.stubEnv('NEXT_PUBLIC_SENTRY_DSN', 'https://public@example.test/1')
    const breadcrumb = { category: 'navigation', message: 'Page opened', data: { path: '/en' } }
    const hint = { event: new Event('click') }
    const calls: string[] = []
    sdk.addBreadcrumb.mockImplementationOnce((receivedBreadcrumb, receivedHint) => {
      expect(receivedBreadcrumb).toBe(breadcrumb)
      expect(receivedHint).toBe(hint)
      calls.push('sdk')
    })

    calls.push('before')
    const result = addBreadcrumb(breadcrumb, hint)
    calls.push('after')

    expect(result).toBeUndefined()
    expect(calls).toEqual(['before', 'sdk', 'after'])
    expect(sdk.addBreadcrumb).toHaveBeenCalledExactlyOnceWith(breadcrumb, hint)
  })

  it('preserves omitted optional SDK arguments', () => {
    vi.stubEnv('NEXT_PUBLIC_SENTRY_DSN', 'https://public@example.test/1')
    const error = new Error('Request failed')
    const breadcrumb = { message: 'Page opened' }

    captureException(error)
    addBreadcrumb(breadcrumb)

    expect(sdk.captureException).toHaveBeenCalledExactlyOnceWith(error)
    expect(sdk.addBreadcrumb).toHaveBeenCalledExactlyOnceWith(breadcrumb)
  })

  it('preserves synchronous SDK capture failures', () => {
    vi.stubEnv('NEXT_PUBLIC_SENTRY_DSN', 'https://public@example.test/1')
    const failure = new Error('SDK capture failed')
    sdk.captureException.mockImplementationOnce(() => { throw failure })

    expect(() => captureException(new Error('Request failed'))).toThrow(failure)
  })

  it('preserves synchronous SDK breadcrumb failures', () => {
    vi.stubEnv('NEXT_PUBLIC_SENTRY_DSN', 'https://public@example.test/1')
    const failure = new Error('SDK breadcrumb failed')
    sdk.addBreadcrumb.mockImplementationOnce(() => { throw failure })

    expect(() => addBreadcrumb({ message: 'Page opened' })).toThrow(failure)
  })
})
