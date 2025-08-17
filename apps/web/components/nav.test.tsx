/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @next/next/no-img-element */
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Navigation from './navigation'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, whileHover, whileTap, initial, animate, exit, transition, onMouseEnter, onMouseLeave, ...props }: any) => 
      <div {...props}>{children}</div>,
  },
}))

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en'
}))

// Mock next/link
vi.mock('next/link', () => {
  return {
    __esModule: true,
    default: ({ children, href }: { children: React.ReactNode; href: string }) => (
      <a href={href}>{children}</a>
    )
  }
})

// Mock next/image
vi.mock('next/image', () => {
  return {
    __esModule: true,
    default: ({ src, alt, width, height, className }: any) => (
      <img src={src} alt={alt} width={width} height={height} className={className} />
    )
  }
})

// Mock LocaleSwitcher
vi.mock('./LocaleSwitcher', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="locale-switcher">Locale Switcher</div>
  }
})

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Menu: () => <span>Menu</span>,
  X: () => <span>X</span>,
  ExternalLink: () => <span>ExternalLink</span>,
  ChevronDown: () => <span>ChevronDown</span>
}))

describe('Nav Component', () => {
  it('renders navigation menu', () => {
    render(<Navigation />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('shows mobile menu toggle button', () => {
    render(<Navigation />)
    const mobileToggle = screen.getByLabelText('openMenu')
    expect(mobileToggle).toBeInTheDocument()
  })

  it('toggles mobile menu when clicked', () => {
    render(<Navigation />)
    const mobileToggle = screen.getByLabelText('openMenu')
    
    // Initially closed, mobile menu content not visible
    expect(screen.queryByLabelText('closeMenu')).not.toBeInTheDocument()
    
    // Click to open
    fireEvent.click(mobileToggle)
    expect(screen.getByLabelText('closeMenu')).toBeInTheDocument()
  })

  it('renders desktop navigation links', () => {
    render(<Navigation />)
    
    // Check for main navigation sections
    expect(screen.getByText('learn')).toBeInTheDocument()
    expect(screen.getByText('build')).toBeInTheDocument()
    expect(screen.getByText('ecosystem')).toBeInTheDocument()
    expect(screen.getByText('community')).toBeInTheDocument()
  })

  it('renders locale switcher', () => {
    render(<Navigation />)
    // Check for locale switcher presence
    expect(screen.getByTestId('locale-switcher')).toBeInTheDocument()
  })
})