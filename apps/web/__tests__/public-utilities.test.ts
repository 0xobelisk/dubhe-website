import { afterEach, describe, expect, it, vi } from 'vitest'
import { webcrypto } from 'node:crypto'
import fs from 'fs/promises'
import path from 'node:path'
import { getPlaiceholder } from 'plaiceholder'
import {
  checkForMaliciousPatterns, generateCSP, generateRateLimitKey, hashSensitiveData,
  sanitizeEmail, sanitizeHtml, sanitizeText, validateAndSanitizeContactForm,
  validateAndSanitizeErrorReport, validateOrigin,
} from '../lib/security'
import { generateSrcSet, getBlurDataURL, getOptimizedImageProps, preloadImage } from '../lib/image-utils'
import { PrefetchPriority, prefetchRoute } from '../lib/prefetch'
import { act, renderHook } from '@testing-library/react'
import { useLocalStorage, useSessionStorage } from '../hooks/useLocalStorage'
import { useCopyToClipboard } from '../hooks/useCopyToClipboard'
import { useCountUp } from '../hooks/useCountUp'

vi.mock('plaiceholder', () => ({ getPlaiceholder: vi.fn() }))
vi.mock('fs/promises', () => ({ default: { readFile: vi.fn() } }))

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  vi.useRealTimers()
  window.localStorage.clear()
  window.sessionStorage.clear()
  document.head.querySelectorAll('link[rel="preload"], link[rel="prefetch"]').forEach(link => link.remove())
})

const contact = { name: 'Alice', email: 'alice@example.test', subject: 'Developer integration', message: 'Please explain the developer tooling.' }

describe('public form validation', () => {
  it('normalizes email and removes executable markup from accepted contact data without sending it', () => {
    const result = validateAndSanitizeContactForm({
      ...contact, name: ' <Alice> ', email: ' ALICE@Example.Test ',
      subject: ' Developer <integration> ', message: '<p>Developer question</p><script>alert(1)</script>',
    }, { ip: ' 127.0.0.1 ', userAgent: '<browser>' })
    expect(result.valid).toBe(true)
    expect(result.data).toMatchObject({
      name: 'Alice', email: 'alice@example.test', subject: 'Developer integration',
      message: '<p>Developer question</p>', ipAddress: '127.0.0.1', userAgent: 'browser',
    })
    expect(Number.isNaN(Date.parse(result.data!.timestamp))).toBe(false)
  })

  it.each([null, 'not an object', 12])('rejects non-object contact submissions (%s)', data => {
    expect(validateAndSanitizeContactForm(data)).toEqual({ valid: false, errors: ['Invalid form data'] })
  })

  it('reports all missing fields together', () => {
    expect(validateAndSanitizeContactForm({})).toEqual({
      valid: false, errors: ['Name is required', 'Email is required', 'Subject is required', 'Message is required'],
    })
  })

  it.each([
    [{ name: 'x'.repeat(101) }, 'Name must be between 1 and 100 characters'],
    [{ email: 'missing-at.example.test' }, 'Please provide a valid email address'],
    [{ subject: 'x'.repeat(201) }, 'Subject must be between 1 and 200 characters'],
    [{ message: 'x'.repeat(2001) }, 'Message must be between 1 and 2000 characters'],
    [{ message: 'https://one.test https://two.test https://three.test' }, 'Message appears to be spam'],
  ])('rejects invalid contact content with an actionable error', (patch, error) => {
    const result = validateAndSanitizeContactForm({ ...contact, ...patch })
    expect(result.valid).toBe(false)
    expect(result.errors).toContain(error)
    expect(result.data).toBeUndefined()
  })

  it('accepts a normal message at the documented length boundaries', () => {
    expect(validateAndSanitizeContactForm({ ...contact, name: 'a'.repeat(100), subject: 'b'.repeat(200), message: 'c'.repeat(2000) }).valid).toBe(true)
    expect(validateAndSanitizeContactForm(contact).data).toMatchObject({ ipAddress: undefined, userAgent: undefined })
  })

  it.each(['bad', 'a..b@example.test', '.alice@example.test', 'alice@example.test.', `${'a'.repeat(250)}@x.test`])('rejects malformed email %s', email => {
    expect(sanitizeEmail(email).valid).toBe(false)
  })

  it('normalizes email and handles unexpected non-string inputs', () => {
    expect(sanitizeEmail('  Alice@EXAMPLE.TEST ')).toEqual({ valid: true, sanitized: 'alice@example.test' })
    expect(sanitizeEmail(null as unknown as string)).toEqual({ valid: false, sanitized: '' })
    expect(sanitizeText(null as unknown as string)).toBe('')
    expect(sanitizeHtml(null as unknown as string)).toBe('')
  })

  it('removes known active content and bounds the size of retained input', () => {
    expect(sanitizeHtml('<p>Keep</p><script>bad()</script><iframe>bad</iframe><object>bad</object><embed>bad</embed><style>bad</style><link href="x"><meta name="x">')).toBe('<p>Keep</p>')
    expect(sanitizeText('  <Hello>\u0000\n"world"  ')).toBe('Helloworld')
    expect(sanitizeText('a'.repeat(1100))).toHaveLength(1000)
    expect(sanitizeHtml('a'.repeat(11000))).toHaveLength(10000)
  })
})

describe('error report and request metadata', () => {
  it('sanitizes an error report and preserves its valid timestamp', () => {
    const result = validateAndSanitizeErrorReport({
      error: '<Failed>', stack: '<frame>', url: 'https://example.test/<path>', userAgent: '<browser>',
      timestamp: '2026-11-03T00:00:00Z', userId: '<alice>', sessionId: '<session>',
    })
    expect(result).toEqual({ valid: true, data: {
      error: 'Failed', stack: 'frame', url: 'https://example.test/path', userAgent: 'browser',
      timestamp: '2026-11-03T00:00:00Z', userId: 'alice', sessionId: 'session',
    } })
    expect(validateAndSanitizeErrorReport({ error: 'Unavailable', timestamp: '2026-11-03' }).valid).toBe(true)
  })

  it.each([
    [null, 'Invalid error report data'],
    [{ timestamp: '2026-11-03' }, 'Error message is required'],
    [{ error: 'x'.repeat(2001), timestamp: '2026-11-03' }, 'Error message too long'],
    [{ error: 'failure' }, 'Timestamp is required'],
    [{ error: 'failure', timestamp: 'not-a-date' }, 'Invalid timestamp format'],
  ])('rejects unusable error reports', (report, error) => {
    expect(validateAndSanitizeErrorReport(report)).toMatchObject({ valid: false, errors: [error] })
  })

  it.each(['SELECT * FROM accounts', '<script>alert(1)</script>', 'javascript:alert(1)', 'onerror=alert', 'a; rm -rf', '../private', '$where'])('recognizes the supported malicious pattern %s', value => {
    expect(checkForMaliciousPatterns(value)).toBe(true)
  })

  it('keeps ordinary text valid and creates a sanitized rate-limit namespace', () => {
    expect(checkForMaliciousPatterns('A normal developer question')).toBe(false)
    expect(generateRateLimitKey('contact', ' <visitor>\u0000 ')).toBe('rate_limit:contact:visitor')
    expect(validateOrigin(null, ['https://dubhe.example.test'])).toBe(false)
    expect(validateOrigin('https://dubhe.example.test', ['https://dubhe.example.test'])).toBe(true)
    expect(validateOrigin('https://other.example.test', ['https://dubhe.example.test'])).toBe(false)
  })

  it('uses a supplied CSP nonce instead of permissive script directives', () => {
    const csp = generateCSP('request-specific-nonce')
    const scripts = csp.split('; ').find(rule => rule.startsWith('script-src'))!
    expect(scripts).toContain("'nonce-request-specific-nonce'")
    expect(scripts).not.toContain('unsafe-inline')
    expect(scripts).not.toContain('unsafe-eval')
    expect(csp).toContain("frame-ancestors 'none'")
    expect(csp).toContain("object-src 'none'")
    expect(generateCSP()).toContain("default-src 'self'")
  })

  it('hashes deterministically using SHA-256 and changes the digest when a salt is supplied', async () => {
    vi.stubGlobal('crypto', webcrypto)
    expect(await hashSensitiveData('abc')).toBe('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad')
    expect(await hashSensitiveData('abc', 'salt')).not.toBe(await hashSensitiveData('abc'))
    expect(await hashSensitiveData('abc', 'salt')).toMatch(/^[a-f0-9]{64}$/)
  })
})

describe('image loading and internal prefetch contracts', () => {
  it('generates responsive candidates only for local images', () => {
    expect(generateSrcSet('/logo.png', [320, 640])).toBe('/logo.png?w=320 320w, /logo.png?w=640 640w')
    expect(generateSrcSet('https://images.example.test/logo.png')).toBe('')
    expect(generateSrcSet('/logo.png')).toContain('/logo.png?w=1920 1920w')
  })

  it('generates and caches local placeholders without rereading the image', async () => {
    vi.mocked(fs.readFile).mockResolvedValue(Buffer.from([1, 2, 3]))
    vi.mocked(getPlaiceholder).mockResolvedValue({ base64: 'data:image/png;base64,local' } as never)
    expect(await getBlurDataURL('/images/cache-contract.png')).toBe('data:image/png;base64,local')
    expect(await getBlurDataURL('/images/cache-contract.png')).toBe('data:image/png;base64,local')
    expect(fs.readFile).toHaveBeenCalledWith(path.join(process.cwd(), 'public', '/images/cache-contract.png'))
    expect(fs.readFile).toHaveBeenCalledTimes(1)
  })

  it('uses bytes from the external image boundary and applies explicit critical-image props', async () => {
    const fetch = vi.fn().mockResolvedValue({ arrayBuffer: async () => Uint8Array.from([4, 5]).buffer })
    vi.stubGlobal('fetch', fetch)
    vi.mocked(getPlaiceholder).mockResolvedValue({ base64: 'data:image/png;base64,external' } as never)
    const props = await getOptimizedImageProps({ src: 'https://images.example.test/critical.png', alt: 'Product', width: 600, height: 300, priority: true, quality: 90 })
    expect(fetch).toHaveBeenCalledOnce()
    expect(props).toMatchObject({ alt: 'Product', width: 600, height: 300, priority: true, quality: 90, placeholder: 'blur', blurDataURL: 'data:image/png;base64,external' })
    expect(props.loading).toBeUndefined()
  })

  it('falls back to a data image when loading fails and keeps ordinary images lazy', async () => {
    vi.mocked(fs.readFile).mockRejectedValue(new Error('unavailable fixture'))
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})
    const props = await getOptimizedImageProps({ src: 'missing-fixture.png', alt: 'Unavailable' })
    expect(props.blurDataURL).toMatch(/^data:image\/png;base64,/)
    expect(props).toMatchObject({ loading: 'lazy', quality: 75, sizes: '100vw', priority: false })
    expect(error).toHaveBeenCalledWith(expect.stringContaining('Failed to generate blur placeholder'), expect.any(Error))
  })

  it('preloads a critical image with a browser hint', () => {
    preloadImage('/critical-contract.png')
    expect(document.head.querySelector('link[rel="preload"]')).toHaveAttribute('href', '/critical-contract.png')
    expect((document.head.querySelector('link[rel="preload"]') as HTMLLinkElement).as).toBe('image')
  })

  it('prefetches a high-priority internal route once and never prefetches an external URL', async () => {
    await prefetchRoute('/contract-route', PrefetchPriority.HIGH)
    await prefetchRoute('/contract-route', PrefetchPriority.HIGH)
    await prefetchRoute('https://external.example.test', PrefetchPriority.HIGH)
    expect(document.head.querySelectorAll('link[rel="prefetch"]')).toHaveLength(2)
    expect((document.head.querySelector('link[href="/contract-route"]') as HTMLLinkElement).as).toBe('document')
    expect(document.head.querySelector('link[href="https://external.example.test"]')).toBeNull()
  })

  it('defers medium-priority prefetch and leaves low-priority routes untouched', async () => {
    vi.useFakeTimers()
    await prefetchRoute('/contract-idle', PrefetchPriority.MEDIUM)
    await prefetchRoute('/contract-hover', PrefetchPriority.LOW)
    expect(document.head.querySelectorAll('link[rel="prefetch"]')).toHaveLength(0)
    await vi.advanceTimersByTimeAsync(100)
    expect((document.head.querySelector('link[href="/contract-idle"]') as HTMLLinkElement).as).toBe('document')
    expect(document.head.querySelector('link[href="/contract-hover"]')).toBeNull()
  })
})

describe('browser state and clipboard utilities', () => {
  it('loads persisted preferences, applies functional updates and removes the stored value', () => {
    window.localStorage.setItem('contract-preferences', JSON.stringify({ compact: false }))
    const { result } = renderHook(() => useLocalStorage('contract-preferences', { compact: true }))
    expect(result.current[0]).toEqual({ compact: false })
    act(() => { result.current[1](previous => ({ compact: !previous.compact })) })
    expect(result.current[0]).toEqual({ compact: true })
    expect(JSON.parse(window.localStorage.getItem('contract-preferences')!)).toEqual({ compact: true })
    act(() => { result.current[2]() })
    expect(window.localStorage.getItem('contract-preferences')).toBeNull()
    expect(result.current[0]).toEqual({ compact: true })
  })

  it('synchronizes matching storage events and ignores another preference key', () => {
    const { result, unmount } = renderHook(() => useLocalStorage('contract-theme', 'dark'))
    act(() => { window.dispatchEvent(new StorageEvent('storage', { key: 'other-key', newValue: '"light"', storageArea: window.localStorage })) })
    expect(result.current[0]).toBe('dark')
    act(() => { window.dispatchEvent(new StorageEvent('storage', { key: 'contract-theme', newValue: '"light"', storageArea: window.localStorage })) })
    expect(result.current[0]).toBe('light')
    act(() => { window.dispatchEvent(new StorageEvent('storage', { key: 'contract-theme', newValue: null, storageArea: window.localStorage })) })
    expect(result.current[0]).toBe('dark')
    const remove = vi.spyOn(window, 'removeEventListener')
    unmount()
    expect(remove).toHaveBeenCalledWith('storage', expect.any(Function))
  })

  it('recovers from corrupt persisted data and ignores corrupt cross-tab updates', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    window.localStorage.setItem('contract-corrupt', 'invalid json')
    const { result } = renderHook(() => useLocalStorage('contract-corrupt', 'fallback'))
    expect(result.current[0]).toBe('fallback')
    act(() => { window.dispatchEvent(new StorageEvent('storage', { key: 'contract-corrupt', newValue: '{invalid', storageArea: window.localStorage })) })
    expect(result.current[0]).toBe('fallback')
    expect(warn).toHaveBeenCalledTimes(2)
  })

  it('keeps session values scoped to session storage and supports reset', () => {
    window.sessionStorage.setItem('contract-session', '2')
    const { result } = renderHook(() => useSessionStorage('contract-session', 0))
    expect(result.current[0]).toBe(2)
    act(() => { result.current[1](previous => previous + 3) })
    expect(result.current[0]).toBe(5)
    expect(window.sessionStorage.getItem('contract-session')).toBe('5')
    expect(window.localStorage.getItem('contract-session')).toBeNull()
    act(() => { result.current[2]() })
    expect(result.current[0]).toBe(0)
    expect(window.sessionStorage.getItem('contract-session')).toBeNull()
  })

  it('uses the session default for invalid persisted JSON', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    window.sessionStorage.setItem('contract-session-corrupt', '{')
    const { result } = renderHook(() => useSessionStorage('contract-session-corrupt', false))
    expect(result.current[0]).toBe(false)
    expect(warn).toHaveBeenCalledOnce()
  })

  it('copies the exact requested text and resets feedback on its configured timer', async () => {
    vi.useFakeTimers()
    const writeText = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', { clipboard: { writeText } })
    const { result } = renderHook(() => useCopyToClipboard(50))
    let success = false
    await act(async () => { success = await result.current.copyToClipboard('0x-public-example') })
    expect(success).toBe(true)
    expect(writeText).toHaveBeenCalledWith('0x-public-example')
    expect(result.current.isCopied).toBe(true)
    act(() => { vi.advanceTimersByTime(49) })
    expect(result.current.isCopied).toBe(true)
    act(() => { vi.advanceTimersByTime(1) })
    expect(result.current.isCopied).toBe(false)
    await act(async () => { await result.current.copyToClipboard('another example') })
    act(() => { result.current.resetCopyState() })
    expect(result.current.isCopied).toBe(false)
  })

  it('returns failure and clears feedback when clipboard permission is denied', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('permission denied'))
    vi.stubGlobal('navigator', { clipboard: { writeText } })
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})
    const { result } = renderHook(() => useCopyToClipboard())
    let success = true
    await act(async () => { success = await result.current.copyToClipboard('example') })
    expect(success).toBe(false)
    expect(result.current.isCopied).toBe(false)
    expect(error).toHaveBeenCalledWith('Failed to copy text to clipboard:', expect.any(Error))
  })
})

describe('controlled counter animation', () => {
  function frames() {
    const pending: FrameRequestCallback[] = []
    const request = vi.fn((callback: FrameRequestCallback) => pending.push(callback))
    const cancel = vi.fn()
    vi.stubGlobal('requestAnimationFrame', request)
    vi.stubGlobal('cancelAnimationFrame', cancel)
    return { pending, request, cancel }
  }

  it('supports manual start, intermediate updates, completion and reset', () => {
    const animation = frames()
    const complete = vi.fn()
    const onUpdate = vi.fn()
    const { result } = renderHook(() => useCountUp({ start: 10, end: 110, duration: 1000, autoStart: false, easing: 'linear', onComplete: complete, onUpdate }))
    expect(result.current.value).toBe(10)
    expect(animation.request).not.toHaveBeenCalled()
    act(() => { result.current.start() })
    expect(result.current.isAnimating).toBe(true)
    act(() => { animation.pending.shift()!(10) })
    act(() => { animation.pending.shift()!(510) })
    expect(result.current.value).toBe(60)
    act(() => { animation.pending.shift()!(1010) })
    expect(result.current.value).toBe(110)
    expect(result.current.isAnimating).toBe(false)
    expect(complete).toHaveBeenCalledOnce()
    expect(onUpdate).toHaveBeenLastCalledWith(110)
    act(() => { result.current.reset() })
    expect(result.current.value).toBe(10)
  })

  it.each([
    ['linear', 25], ['easeIn', 6.25], ['easeOut', 43.75], ['easeInOut', 12.5],
  ] as const)('honors the %s easing curve', (easing, expected) => {
    const animation = frames()
    const { result } = renderHook(() => useCountUp({ end: 100, duration: 1000, decimals: 2, easing, autoStart: false }))
    act(() => { result.current.start() })
    act(() => { animation.pending.shift()!(10) })
    act(() => { animation.pending.shift()!(260) })
    expect(result.current.value).toBe(expected)
    act(() => { result.current.stop() })
    expect(result.current.isAnimating).toBe(false)
    expect(animation.cancel).toHaveBeenCalledWith(expect.any(Number))
  })

  it('formats explicit values and cancels a pending automatic animation on unmount', () => {
    const animation = frames()
    const { result, unmount } = renderHook(() => useCountUp({ end: 10, decimals: 2, autoStart: true }))
    expect(animation.request).toHaveBeenCalledOnce()
    act(() => { result.current.update(12.345) })
    expect(result.current.value).toBe(12.35)
    unmount()
    expect(animation.cancel).toHaveBeenCalledWith(expect.any(Number))
  })
})
