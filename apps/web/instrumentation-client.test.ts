import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const monitoring = vi.hoisted(() => ({
  init: vi.fn(),
  replayIntegration: vi.fn(() => ({ name: 'Replay' })),
  browserProfilingIntegration: vi.fn(() => ({ name: 'BrowserProfiling' })),
}))
vi.mock('@sentry/nextjs', () => monitoring)

describe('configured browser monitoring', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })
  afterEach(() => vi.unstubAllEnvs())

  it.each([undefined, ''])('does not initialize recording or profiling without a DSN (%s)', async dsn => {
    vi.stubEnv('NEXT_PUBLIC_SENTRY_DSN', dsn)
    await import('./instrumentation-client')
    expect(monitoring.init).not.toHaveBeenCalled()
    expect(monitoring.replayIntegration).not.toHaveBeenCalled()
    expect(monitoring.browserProfilingIntegration).not.toHaveBeenCalled()
  })

  it('retains synchronous initialization, sampling and privacy settings with a production DSN', async () => {
    vi.stubEnv('NEXT_PUBLIC_SENTRY_DSN', 'https://public@example.test/1')
    vi.stubEnv('NODE_ENV', 'production')
    vi.stubEnv('VERCEL_GIT_COMMIT_SHA', 'verified-release')
    await import('./instrumentation-client')

    expect(monitoring.init).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({
      dsn: 'https://public@example.test/1',
      tracesSampleRate: 0.1,
      profilesSampleRate: 0.1,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1,
      environment: 'production',
      release: 'verified-release',
      integrations: [{ name: 'Replay' }, { name: 'BrowserProfiling' }],
    }))
    expect(monitoring.replayIntegration).toHaveBeenCalledExactlyOnceWith({ maskAllText: true, blockAllMedia: true })
    expect(monitoring.browserProfilingIntegration).toHaveBeenCalledOnce()
    const options = monitoring.init.mock.calls[0][0]
    const error = { exception: { values: [{ type: 'TypeError' }] } }
    expect(options.beforeSend(error, {})).toBe(error)
    expect(options.beforeSend({ exception: { values: [{ type: 'ChunkLoadError' }] } }, {})).toBeNull()
  })
})
