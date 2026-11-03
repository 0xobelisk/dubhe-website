import React, { useState } from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
import { AnimatePresence, m } from 'framer-motion'
import Link from 'next/link'
import RootLayout from '../app/layout'
import { MotionProvider } from './motion-provider'

// Exercise the installed animation library rather than the semantic DOM mock
// used by page-content tests.
vi.unmock('framer-motion')

describe('Motion feature provider', () => {
  it('keeps SSR content visible through the root boundary without a DOM wrapper', () => {
    const markup = renderToStaticMarkup(
      <RootLayout>
        <m.h1 initial={false} animate={{ opacity: 1, y: 0 }}>
          We make the Dubhe.
        </m.h1>
        <Link href="/en/engine">Explore the engine</Link>
      </RootLayout>
    )
    const container = document.createElement('div')
    container.innerHTML = markup
    const heading = container.querySelector('h1')

    expect(container.children).toHaveLength(2)
    expect(container.firstElementChild).toBe(heading)
    expect(heading).toHaveTextContent('We make the Dubhe.')
    expect(heading?.style.opacity).toBe('1')
    expect(heading?.style.transform).toBe('none')
    expect(container.querySelector('a')).toHaveAttribute('href', '/en/engine')
  })

  it('keeps content and native interactions available while optional features wait for idle', async () => {
    let resume: IdleRequestCallback | undefined
    vi.stubGlobal('requestIdleCallback', (callback: IdleRequestCallback) => {
      resume = callback
      return 1
    })
    function Scene() {
      const [count, setCount] = useState(0)
      return (
        <MotionProvider>
          <m.h1 initial={false} animate={{ opacity: 1 }}>Ready content</m.h1>
          <button onClick={() => setCount(value => value + 1)}>Count: {count}</button>
        </MotionProvider>
      )
    }
    try {
      render(<Scene />)
      expect(screen.getByRole('heading')).toHaveStyle({ opacity: '1' })
      fireEvent.click(screen.getByRole('button', { name: 'Count: 0' }))
      expect(screen.getByRole('button', { name: 'Count: 1' })).toBeInTheDocument()
      expect(resume).toBeTypeOf('function')
      await act(async () => {
        resume!({ didTimeout: false, timeRemaining: () => 50 })
      })
    } finally {
      vi.unstubAllGlobals()
    }
  })

  it('runs an existing animate transition with the real loaded feature bundle', async () => {
    const onComplete = vi.fn()
    render(
      <MotionProvider>
        <m.div
          data-testid="animated-panel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0 }}
          onAnimationComplete={onComplete}
        >
          Visible content
        </m.div>
      </MotionProvider>
    )

    await waitFor(() => expect(onComplete).toHaveBeenCalledOnce())
    expect(screen.getByTestId('animated-panel')).toHaveStyle({ opacity: '1' })
  })

  it('preserves AnimatePresence exit completion and removal', async () => {
    const onExitComplete = vi.fn()
    function Scene({ visible }: { visible: boolean }) {
      return (
        <MotionProvider>
          <AnimatePresence onExitComplete={onExitComplete}>
            {visible && (
              <m.div
                key="panel"
                initial={false}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0 }}
              >
                Closing panel
              </m.div>
            )}
          </AnimatePresence>
        </MotionProvider>
      )
    }
    const { rerender } = render(<Scene visible />)
    expect(screen.getByText('Closing panel')).toBeInTheDocument()

    rerender(<Scene visible={false} />)

    await waitFor(() => expect(onExitComplete).toHaveBeenCalledOnce())
    expect(screen.queryByText('Closing panel')).not.toBeInTheDocument()
  })
})
