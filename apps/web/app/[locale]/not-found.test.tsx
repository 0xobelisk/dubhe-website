import { render, screen, fireEvent } from '@/test-utils'
import { describe, it, expect, vi } from 'vitest'
import NotFound from './not-found'

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string, options?: { default?: string }) => {
    if (options?.default) {
      return options.default
    }
    return key
  },
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => children
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

// Mock UI components
vi.mock('@workspace/ui/components/button', () => ({
  Button: ({ children, onClick, className }: { children: React.ReactNode; onClick?: () => void; className?: string }) => (
    <button onClick={onClick} className={className}>{children}</button>
  )
}))

// Mock window.history.back
const mockHistoryBack = vi.fn()
Object.defineProperty(window, 'history', {
  value: { back: mockHistoryBack },
  writable: true
})

describe('NotFound Page', () => {
  beforeEach(() => {
    mockHistoryBack.mockClear()
  })

  it('renders 404 error message', () => {
    render(<NotFound />)
    
    expect(screen.getAllByText('404').length).toBeGreaterThan(0)
    expect(screen.getByText('Page Not Found')).toBeInTheDocument()
    expect(screen.getByText('The page you\'re looking for doesn\'t exist or has been moved.')).toBeInTheDocument()
  })

  it('displays popular pages section', () => {
    render(<NotFound />)
    
    expect(screen.getByText('Popular Pages')).toBeInTheDocument()
    expect(screen.getByText('Engine')).toBeInTheDocument()
    expect(screen.getByText('OS')).toBeInTheDocument()
    expect(screen.getByText('Channel')).toBeInTheDocument()
    expect(screen.getByText('Labs')).toBeInTheDocument()
    expect(screen.getByText('Grants')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('renders navigation links correctly', () => {
    render(<NotFound />)
    
    const engineLink = screen.getByText('Engine').closest('a')
    const osLink = screen.getByText('OS').closest('a')
    const channelLink = screen.getByText('Channel').closest('a')
    
    expect(engineLink).toHaveAttribute('href', '/engine')
    expect(osLink).toHaveAttribute('href', '/os')
    expect(channelLink).toHaveAttribute('href', '/channel')
  })

  it('shows action buttons', () => {
    render(<NotFound />)
    
    expect(screen.getByText('Go to Homepage')).toBeInTheDocument()
    expect(screen.getByText('Go Back')).toBeInTheDocument()
    expect(screen.getByText('Report a broken link')).toBeInTheDocument()
  })

  it('handles go back button click', () => {
    render(<NotFound />)
    
    const goBackButton = screen.getByText('Go Back')
    fireEvent.click(goBackButton)
    
    expect(mockHistoryBack).toHaveBeenCalledOnce()
  })

  it('renders homepage link correctly', () => {
    render(<NotFound />)
    
    const homepageLink = screen.getByText('Go to Homepage').closest('a')
    expect(homepageLink).toHaveAttribute('href', '/')
  })

  it('renders contact link correctly', () => {
    render(<NotFound />)
    
    const contactLink = screen.getByText('Report a broken link')
    expect(contactLink).toHaveAttribute('href', '/contact')
  })

  it('has proper visual styling classes', () => {
    render(<NotFound />)
    
    // Check for gradient background using main container
    let container = screen.getByText('Page Not Found').closest('div')
    while (container && container.parentElement) {
      if (container.classList.contains('bg-gradient-to-br')) {
        break
      }
      container = container.parentElement as HTMLElement
    }
    expect(container).toHaveClass('bg-gradient-to-br', 'from-slate-900', 'via-purple-900', 'to-slate-900')
    
    // Check for 404 styling using the first h1 element
    const title = screen.getAllByText('404')[0]  
    expect(title).toHaveClass('text-8xl', 'md:text-9xl', 'font-bold')
  })
})