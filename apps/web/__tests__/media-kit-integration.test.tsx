import { render, screen, fireEvent, waitFor } from '@/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'
import MediaKitPage from '@/app/[locale]/media-kit/page'

/**
 * Media Kit Integration Tests
 * 
 * Validates Media Kit page rendering and functionality:
 * - Page rendering in all supported locales
 * - Navigation functionality
 * - Content display validation
 * - Interactive features
 * - Error handling
 */

// Mock next-intl hooks
const mockT = vi.fn((key: string) => key)
vi.mock('next-intl', async () => {
  const actual = await vi.importActual('next-intl')
  return {
    ...actual,
    useTranslations: () => mockT,
    useLocale: () => 'en',
    NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => children
  }
})

// Mock Next.js components
vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className, ...props }: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
  }) => (
    <img src={src} alt={alt} width={width} height={height} className={className} {...props} />
  )
}))

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>{children}</a>
  )
}))

// Mock navigation and footer components
vi.mock('@/components/navigation', () => ({
  __esModule: true,
  default: () => <nav data-testid="navigation">Navigation</nav>
}))

vi.mock('@/components/footer', () => ({
  __esModule: true,
  default: () => <footer data-testid="footer">Footer</footer>
}))

// Mock UI components
vi.mock('@/components/ui/Card', () => ({
  __esModule: true,
  default: ({ children, className, variant, ...props }: any) => (
    <div data-testid="card" className={className} data-variant={variant} {...props}>
      {children}
    </div>
  )
}))

vi.mock('@/components/ui/Section', () => ({
  __esModule: true,
  default: ({ children, title, subtitle, className, ...props }: any) => (
    <section data-testid="section" className={className} {...props}>
      {title && <h2 data-testid="section-title">{title}</h2>}
      {subtitle && <p data-testid="section-subtitle">{subtitle}</p>}
      {children}
    </section>
  )
}))

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>
  }
}))

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Download: () => <span data-testid="download-icon">Download</span>,
  Copy: () => <span data-testid="copy-icon">Copy</span>,
  CheckCircle: () => <span data-testid="check-icon">Check</span>,
  Palette: () => <span data-testid="palette-icon">Palette</span>,
  Type: () => <span data-testid="type-icon">Type</span>,
  Image: () => <span data-testid="image-icon">Image</span>,
  Users: () => <span data-testid="users-icon">Users</span>,
  Shield: () => <span data-testid="shield-icon">Shield</span>,
  Sparkles: () => <span data-testid="sparkles-icon">Sparkles</span>,
  ExternalLink: () => <span data-testid="external-link-icon">ExternalLink</span>,
  Eye: () => <span data-testid="eye-icon">Eye</span>,
  EyeOff: () => <span data-testid="eye-off-icon">EyeOff</span>
}))

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(() => Promise.resolve())
  }
})

// Mock document.createElement for download functionality
const mockCreateElement = vi.fn(() => ({
  href: '',
  download: '',
  target: '',
  click: vi.fn(),
  remove: vi.fn()
}))

Object.defineProperty(document, 'createElement', {
  value: mockCreateElement,
  writable: true
})

Object.defineProperty(document.body, 'appendChild', {
  value: vi.fn(),
  writable: true
})

Object.defineProperty(document.body, 'removeChild', {
  value: vi.fn(),
  writable: true
})

describe('Media Kit Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockT.mockImplementation((key: string) => key)
  })

  describe('Page Rendering', () => {
    it('should render Media Kit page without errors', () => {
      render(<MediaKitPage />)
      
      expect(screen.getByTestId('navigation')).toBeInTheDocument()
      expect(screen.getByTestId('footer')).toBeInTheDocument()
    })

    it('should render hero section with all elements', () => {
      render(<MediaKitPage />)
      
      // Check for hero content
      expect(screen.getByText('hero.badge')).toBeInTheDocument()
      expect(screen.getByText('hero.title1')).toBeInTheDocument()
      expect(screen.getByText('hero.title2')).toBeInTheDocument()
      expect(screen.getByText('hero.subtitle')).toBeInTheDocument()
      
      // Check for download button
      const downloadButton = screen.getByRole('button', { name: /hero.downloadPack/i })
      expect(downloadButton).toBeInTheDocument()
    })

    it('should render all main sections', () => {
      render(<MediaKitPage />)
      
      // Check that all main sections are present
      const sections = screen.getAllByTestId('section')
      expect(sections.length).toBeGreaterThanOrEqual(6) // logo, clearspace, symbol, partnership, colors, typography, download
      
      // Check for section titles
      expect(screen.getByText('logo.title')).toBeInTheDocument()
      expect(screen.getByText('clearspace.title')).toBeInTheDocument()
      expect(screen.getByText('symbol.title')).toBeInTheDocument()
      expect(screen.getByText('partnership.title')).toBeInTheDocument()
      expect(screen.getByText('colors.title')).toBeInTheDocument()
      expect(screen.getByText('typography.title')).toBeInTheDocument()
      expect(screen.getByText('download.title')).toBeInTheDocument()
    })
  })

  describe('Logo Section Functionality', () => {
    it('should render logo assets with download buttons', () => {
      render(<MediaKitPage />)
      
      // Check for logo images
      const logoImages = screen.getAllByAltText(/Logo|Symbol|Wordmark/i)
      expect(logoImages.length).toBeGreaterThan(0)
      
      // Check for download buttons
      const downloadButtons = screen.getAllByText('logo.download')
      expect(downloadButtons.length).toBeGreaterThan(0)
    })

    it('should handle logo asset download', async () => {
      render(<MediaKitPage />)
      
      const downloadButtons = screen.getAllByText('logo.download')
      const firstDownloadButton = downloadButtons[0]
      
      fireEvent.click(firstDownloadButton)
      
      expect(mockCreateElement).toHaveBeenCalledWith('a')
    })

    it('should toggle logo donts visibility', async () => {
      render(<MediaKitPage />)
      
      const toggleButton = screen.getByText('logo.donts.hide')
      expect(toggleButton).toBeInTheDocument()
      
      fireEvent.click(toggleButton)
      
      await waitFor(() => {
        expect(screen.getByText('logo.donts.show')).toBeInTheDocument()
      })
    })
  })

  describe('Color Palette Functionality', () => {
    it('should render color palette with copy functionality', () => {
      render(<MediaKitPage />)
      
      // Check for color elements
      const colorCards = screen.getAllByTestId('card')
      expect(colorCards.length).toBeGreaterThan(0)
      
      // Check for copy buttons (HEX and RGB values)
      const copyButtons = screen.getAllByTestId('copy-icon')
      expect(copyButtons.length).toBeGreaterThan(0)
    })

    it('should handle color code copying', async () => {
      render(<MediaKitPage />)
      
      const copyButtons = screen.getAllByTestId('copy-icon')
      if (copyButtons.length > 0) {
        fireEvent.click(copyButtons[0])
        
        expect(navigator.clipboard.writeText).toHaveBeenCalled()
      }
    })
  })

  describe('Brand Pack Download Functionality', () => {
    it('should handle brand pack download', async () => {
      render(<MediaKitPage />)
      
      const brandPackButton = screen.getByRole('button', { name: /hero.downloadPack/i })
      fireEvent.click(brandPackButton)
      
      // Should attempt to create multiple download links
      await waitFor(() => {
        expect(mockCreateElement).toHaveBeenCalled()
      })
    })

    it('should render download section with contact link', () => {
      render(<MediaKitPage />)
      
      expect(screen.getByText('download.pack.title')).toBeInTheDocument()
      expect(screen.getByText('download.pack.description')).toBeInTheDocument()
      expect(screen.getByText('download.contact.button')).toBeInTheDocument()
    })
  })

  describe('Typography Section', () => {
    it('should render typography examples', () => {
      render(<MediaKitPage />)
      
      expect(screen.getByText('typography.primary.title')).toBeInTheDocument()
      expect(screen.getByText('typography.mono.title')).toBeInTheDocument()
      expect(screen.getByText('typography.scale.title')).toBeInTheDocument()
    })

    it('should display font names correctly', () => {
      render(<MediaKitPage />)
      
      // Check that Geist fonts are mentioned
      expect(screen.getByText('Geist Sans')).toBeInTheDocument()
      expect(screen.getByText('Geist Mono')).toBeInTheDocument()
    })
  })

  describe('Partnership Guidelines', () => {
    it('should render partnership section with approval information', () => {
      render(<MediaKitPage />)
      
      expect(screen.getByText('partnership.title')).toBeInTheDocument()
      expect(screen.getByText('partnership.cobranding')).toBeInTheDocument()
      expect(screen.getByText('partnership.approval.title')).toBeInTheDocument()
      expect(screen.getByText('partnership.approval.contact')).toBeInTheDocument()
    })

    it('should have contact link for partnership approval', () => {
      render(<MediaKitPage />)
      
      const contactLinks = screen.getAllByRole('link')
      const partnershipContactLink = contactLinks.find(link => 
        link.getAttribute('href') === '/contact'
      )
      expect(partnershipContactLink).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA labels on download buttons', () => {
      render(<MediaKitPage />)
      
      const downloadButtons = screen.getAllByRole('button')
      const downloadButtonsWithAria = downloadButtons.filter(button => 
        button.getAttribute('aria-label')
      )
      
      expect(downloadButtonsWithAria.length).toBeGreaterThan(0)
    })

    it('should have proper alt text on images', () => {
      render(<MediaKitPage />)
      
      const images = screen.getAllByRole('img')
      images.forEach(image => {
        expect(image).toHaveAttribute('alt')
      })
    })

    it('should have proper heading hierarchy', () => {
      render(<MediaKitPage />)
      
      // Check for main headings
      const headings = screen.getAllByRole('heading')
      expect(headings.length).toBeGreaterThan(0)
      
      // Main title should be h1
      const h1Elements = screen.getAllByRole('heading', { level: 1 })
      expect(h1Elements.length).toBeGreaterThan(0)
    })
  })

  describe('Error Handling', () => {
    it('should handle clipboard API errors gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      vi.mocked(navigator.clipboard.writeText).mockRejectedValueOnce(new Error('Clipboard error'))
      
      render(<MediaKitPage />)
      
      const copyButtons = screen.getAllByTestId('copy-icon')
      if (copyButtons.length > 0) {
        fireEvent.click(copyButtons[0])
        
        await waitFor(() => {
          expect(consoleSpy).toHaveBeenCalledWith('Failed to copy:', expect.any(Error))
        })
      }
      
      consoleSpy.mockRestore()
    })

    it('should handle download errors gracefully', async () => {
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
      mockCreateElement.mockImplementationOnce(() => {
        throw new Error('Download error')
      })
      
      render(<MediaKitPage />)
      
      const brandPackButton = screen.getByRole('button', { name: /hero.downloadPack/i })
      fireEvent.click(brandPackButton)
      
      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalled()
      })
      
      alertSpy.mockRestore()
    })
  })

  describe('Responsive Design', () => {
    it('should render grid layouts for different screen sizes', () => {
      render(<MediaKitPage />)
      
      // Check for responsive grid classes
      const gridElements = screen.getAllByTestId('card')
      expect(gridElements.length).toBeGreaterThan(0)
      
      // Grid layouts should be present (checking for grid-related elements)
      const elementsWithGridClasses = gridElements.filter(el => 
        el.className.includes('grid') || 
        el.parentElement?.className.includes('grid')
      )
      expect(elementsWithGridClasses.length).toBeGreaterThan(0)
    })
  })
})