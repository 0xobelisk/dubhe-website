/* eslint-disable @next/next/no-img-element */
import { render, screen } from '@/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Footer from './footer'
import englishMessages from '@/messages/en.json'

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
    default: ({ src, alt, width, height, className }: {
      src: string;
      alt: string;
      width?: number;
      height?: number;
      className?: string;
    }) => (
      <img src={src} alt={alt} width={width} height={height} className={className} />
    )
  }
})

// Mock lucide-react
vi.mock('lucide-react', () => ({
  ExternalLink: () => <span>ExternalLink</span>
}))

describe('Footer Component', () => {
  it('renders footer content', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('displays copyright information', () => {
    render(<Footer />)
    expect(screen.getByText(englishMessages.footer.copyright)).toBeInTheDocument()
  })

  it('renders footer navigation links', () => {
    render(<Footer />)
    
    // Check for key footer links
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getAllByText('Contact')).toHaveLength(2) // One in community, one in legal section
    expect(screen.getByText('Terms of Service')).toBeInTheDocument()
  })

  it('renders product links section', () => {
    render(<Footer />)
    
    // Check for product navigation links
    expect(screen.getByText('Engine')).toBeInTheDocument()
    expect(screen.getByText('Channel')).toBeInTheDocument()
    expect(screen.getByText('OS')).toBeInTheDocument()
  })

  it('renders ecosystem links section', () => {
    render(<Footer />)
    
    // Check for ecosystem navigation links
    expect(screen.getByText('Foundation')).toBeInTheDocument()
    expect(screen.getByText('Labs')).toBeInTheDocument()
    expect(screen.getByText('Grants')).toBeInTheDocument()
  })

  it('renders community links section', () => {
    render(<Footer />)
    
    // Check for community navigation links
    expect(screen.getByRole('link', { name: 'Media Kit' })).toHaveAttribute('href', '/en/media-kit')
    expect(screen.getByText('Moderators')).toBeInTheDocument()
    expect(screen.getByText('Events')).toBeInTheDocument()
  })
})
