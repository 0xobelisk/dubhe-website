import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { renderToString } from 'react-dom/server'
import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@/test-utils'
import { DeferredWebVitalsDashboard } from './deferred-web-vitals-dashboard'

const triggerTitle = 'Web Vitals Dashboard (Ctrl+Shift+V)'
const dashboardHeading = { name: 'Web Vitals Dashboard', level: 2 }

describe('DeferredWebVitalsDashboard', () => {
  beforeEach(() => {
    vi.stubEnv('NODE_ENV', 'production')
    localStorage.clear()
    sessionStorage.clear()
  })

  afterEach(() => {
    cleanup()
    localStorage.clear()
    sessionStorage.clear()
    vi.unstubAllEnvs()
  })

  it('keeps the public page free of dashboard UI and shortcuts without production opt-in', () => {
    sessionStorage.setItem('web-vitals', JSON.stringify([
      { name: 'LCP', value: 1200, rating: 'good', timestamp: 1 }
    ]))

    render(<><h1>Public page</h1><DeferredWebVitalsDashboard /></>)

    expect(screen.getByRole('heading', { name: 'Public page' })).toBeVisible()
    expect(screen.queryByTitle(triggerTitle)).not.toBeInTheDocument()
    fireEvent.keyDown(document, { key: 'V', ctrlKey: true, shiftKey: true })
    expect(screen.queryByRole('heading', dashboardHeading)).not.toBeInTheDocument()
  })

  it('renders no dashboard and reads no browser storage during server rendering', () => {
    vi.stubEnv('NODE_ENV', 'development')
    const getItem = vi.spyOn(Storage.prototype, 'getItem')

    try {
      expect(renderToString(<DeferredWebVitalsDashboard />)).toBe('')
      expect(getItem).not.toHaveBeenCalled()
    } finally {
      getItem.mockRestore()
    }
  })

  it('preserves real metric data, score, controls, and shortcuts for a production opt-in', async () => {
    // The existing preference is based on key presence, including an empty value.
    localStorage.setItem('showVitalsDashboard', '')
    sessionStorage.setItem('web-vitals', JSON.stringify([
      { name: 'LCP', value: 4500, rating: 'poor', timestamp: 1 },
      { name: 'LCP', value: 3000, rating: 'needs-improvement', timestamp: 2 },
      { name: 'CLS', value: 0.05, rating: 'good', timestamp: 2 }
    ]))

    render(<DeferredWebVitalsDashboard />)
    await act(async () => { await vi.dynamicImportSettled() })
    fireEvent.click(await screen.findByTitle(triggerTitle))

    await screen.findByRole('heading', dashboardHeading)
    await waitFor(() => {
      expect(screen.getByText(/^Score:\s*75$/)).toBeVisible()
      expect(screen.getByRole('heading', { name: 'LCP', level: 3 })).toBeVisible()
      expect(screen.getByText('3000ms')).toBeVisible()
      expect(screen.queryByText('4500ms')).not.toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'CLS', level: 3 })).toBeVisible()
      expect(screen.getByText('0.050')).toBeVisible()
    })

    fireEvent.click(screen.getByRole('button', { name: 'Show Tips' }))
    expect(screen.getByText('Performance Tips')).toBeVisible()
    fireEvent.click(screen.getByRole('button', { name: 'Hide Tips' }))
    expect(screen.queryByText('Performance Tips')).not.toBeInTheDocument()

    const header = screen.getByRole('heading', dashboardHeading).parentElement!.parentElement!
    fireEvent.click(within(header).getByRole('button'))
    await waitFor(() => expect(screen.queryByRole('heading', dashboardHeading)).not.toBeInTheDocument())
    await waitFor(() => expect(screen.getByTitle(triggerTitle)).toBeVisible())
    expect(JSON.parse(sessionStorage.getItem('web-vitals')!)).toHaveLength(3)

    fireEvent.keyDown(document, { key: 'V', ctrlKey: true, shiftKey: true })
    await screen.findByRole('heading', dashboardHeading)
    fireEvent.click(screen.getByRole('button', { name: 'Clear Data' }))
    expect(sessionStorage.getItem('web-vitals')).toBeNull()
    await waitFor(() => {
      expect(screen.getByText('No Web Vitals data yet')).toBeVisible()
      expect(screen.getByText(/^Score:\s*0$/)).toBeVisible()
    })
    fireEvent.keyDown(document, { key: 'V', ctrlKey: true, shiftKey: true })
    await waitFor(() => expect(screen.queryByRole('heading', dashboardHeading)).not.toBeInTheDocument())
  })

  it('enables the real floating button and empty dashboard in development without a preference', async () => {
    vi.stubEnv('NODE_ENV', 'development')

    render(<DeferredWebVitalsDashboard />)
    await act(async () => { await vi.dynamicImportSettled() })

    await screen.findByTitle(triggerTitle)
    expect(localStorage.getItem('showVitalsDashboard')).toBeNull()
    fireEvent.keyDown(document, { key: 'V', ctrlKey: true, shiftKey: true })
    await screen.findByRole('heading', dashboardHeading)
    await waitFor(() => {
      expect(screen.getByText('No Web Vitals data yet')).toBeVisible()
      expect(screen.getByText(/^Score:\s*0$/)).toBeVisible()
    })
  })
})
