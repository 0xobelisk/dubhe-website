/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { 
  ErrorPage, 
  Forbidden403, 
  Unauthorized401, 
  RateLimited429,
  ServiceUnavailable503,
  BadGateway502
} from './error-pages'

// Mock UI components
vi.mock('@workspace/ui/components/button', () => ({
  Button: ({ children, onClick, variant, className }: any) => (
    <button onClick={onClick} className={className} data-variant={variant}>
      {children}
    </button>
  )
}))

// Mock Next.js Link
vi.mock('next/link', () => {
  return {
    __esModule: true,
    default: ({ children, href }: { children: React.ReactNode; href: string }) => (
      <a href={href}>{children}</a>
    )
  }
})

describe('ErrorPage Component', () => {
  const defaultProps = {
    statusCode: 404,
    title: 'Not Found',
    description: 'Page not found',
    suggestion: 'Try again'
  }

  it('renders error information correctly', () => {
    render(<ErrorPage {...defaultProps} />)

    expect(screen.getByText('404 • Not Found')).toBeInTheDocument()
    expect(screen.getByText('Not Found')).toBeInTheDocument()
    expect(screen.getByText('Page not found')).toBeInTheDocument()
    expect(screen.getByText('Try again')).toBeInTheDocument()
  })

  it('shows retry button when showRetry is true', () => {
    const onRetry = vi.fn()
    render(<ErrorPage {...defaultProps} showRetry={true} onRetry={onRetry} />)

    const retryButton = screen.getByText('Try Again')
    expect(retryButton).toBeInTheDocument()
    
    fireEvent.click(retryButton)
    expect(onRetry).toHaveBeenCalledOnce()
  })

  it('shows home button when showHome is true', () => {
    render(<ErrorPage {...defaultProps} showHome={true} />)

    expect(screen.getByText('Go to Homepage')).toBeInTheDocument()
  })

  it('shows contact button when showContact is true', () => {
    render(<ErrorPage {...defaultProps} showContact={true} />)

    expect(screen.getByText('Contact Support')).toBeInTheDocument()
  })

  it('displays correct icon for 4xx errors', () => {
    render(<ErrorPage {...defaultProps} statusCode={403} />)
    
    // Check for orange icon color (4xx client errors)
    const icon = screen.getByRole('img')
    expect(icon).toHaveClass('text-orange-400')
  })

  it('displays correct icon for 5xx errors', () => {
    render(<ErrorPage {...defaultProps} statusCode={500} />)
    
    // Check for red icon color (5xx server errors)  
    const icon = screen.getByRole('img')
    expect(icon).toHaveClass('text-red-400')
  })
})

describe('Specific Error Components', () => {
  it('renders Forbidden403 correctly', () => {
    render(<Forbidden403 />)
    
    expect(screen.getByText('403 • Forbidden')).toBeInTheDocument()
    expect(screen.getByText('Access Forbidden')).toBeInTheDocument()
    expect(screen.getByText('You don\'t have permission to access this resource.')).toBeInTheDocument()
  })

  it('renders Unauthorized401 correctly', () => {
    render(<Unauthorized401 />)
    
    expect(screen.getByText('401 • Unauthorized')).toBeInTheDocument()
    expect(screen.getByText('Authentication Required')).toBeInTheDocument()
    expect(screen.getByText('You need to sign in to access this page.')).toBeInTheDocument()
  })

  it('renders RateLimited429 with retry functionality', () => {
    // Mock window.location.reload properly
    Object.defineProperty(window, 'location', {
      value: { reload: vi.fn() },
      writable: true
    })
    
    render(<RateLimited429 />)
    
    expect(screen.getByText('429 • Too Many Requests')).toBeInTheDocument()
    expect(screen.getByText('Too Many Requests')).toBeInTheDocument()
    
    const retryButton = screen.getByRole('button', { name: 'Try Again' })
    fireEvent.click(retryButton)
    expect(window.location.reload).toHaveBeenCalledOnce()
  })

  it('renders ServiceUnavailable503 with retry functionality', () => {
    render(<ServiceUnavailable503 />)
    
    expect(screen.getByText('503 • Service Unavailable')).toBeInTheDocument()
    expect(screen.getByText('Service Unavailable')).toBeInTheDocument()
    expect(screen.getByText('We\'re temporarily down for maintenance.')).toBeInTheDocument()
    
    const retryButton = screen.getByRole('button', { name: 'Try Again' })
    fireEvent.click(retryButton)
    expect(window.location.reload).toHaveBeenCalled()
  })

  it('renders BadGateway502 with retry functionality', () => {
    render(<BadGateway502 />)
    
    expect(screen.getByText('502 • Bad Gateway')).toBeInTheDocument()
    expect(screen.getByText('Bad Gateway')).toBeInTheDocument()
    expect(screen.getByText('There\'s a problem with our server connection.')).toBeInTheDocument()
    
    const retryButton = screen.getByRole('button', { name: 'Try Again' })
    fireEvent.click(retryButton)
    expect(window.location.reload).toHaveBeenCalled()
  })
})