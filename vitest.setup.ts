import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'
import React from 'react'

// Cleanup after each test case
afterEach(() => {
  cleanup()
})

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn()
  }),
  useSearchParams: () => ({
    get: vi.fn()
  }),
  usePathname: () => '/'
}))

// Mock Next.js image
vi.mock('next/image', () => ({
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return React.createElement('img', props)
  }
}))


// Mock Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    div: (props: any) => React.createElement('div', props, props.children),
    section: (props: any) => React.createElement('section', props, props.children),
    h1: (props: any) => React.createElement('h1', props, props.children),
    h2: (props: any) => React.createElement('h2', props, props.children),
    p: (props: any) => React.createElement('p', props, props.children),
    img: (props: any) => React.createElement('img', props, props.children),
    button: (props: any) => React.createElement('button', props, props.children)
  },
  AnimatePresence: ({ children }: any) => children,
  useInView: () => true,
  useAnimation: () => ({
    start: vi.fn(),
    stop: vi.fn(),
    set: vi.fn()
  })
}))

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}))

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
})