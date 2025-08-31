import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import PapersPage from '../page'

// Integration tests for PDF remote linking functionality
describe('Papers Page - PDF Remote Linking Integration', () => {
  let originalEnv: NodeJS.ProcessEnv
  
  beforeEach(() => {
    originalEnv = { ...process.env }
    vi.clearAllMocks()
    
    // Mock framer-motion
    vi.mock('framer-motion', () => ({
      motion: {
        h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
        p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
      },
    }))

    // Mock components
    vi.mock('@/components/navigation', () => ({
      default: () => <nav data-testid="navigation">Navigation</nav>
    }))

    vi.mock('@/components/footer', () => ({
      default: () => <footer data-testid="footer">Footer</footer>
    }))

    vi.mock('@/components/ui/Card', () => ({
      default: ({ children, onClick, clickable, ...props }: any) => (
        <div 
          data-testid="card" 
          onClick={onClick} 
          role={clickable ? "button" : undefined}
          tabIndex={clickable ? 0 : undefined}
          {...props}
        >
          {children}
        </div>
      )
    }))

    // Mock icons
    vi.mock('lucide-react', () => ({
      FileText: () => <span data-testid="file-text-icon">FileText</span>,
      ExternalLink: () => <span data-testid="external-link-icon">ExternalLink</span>,
      Download: () => <span data-testid="download-icon">Download</span>
    }))

    // Mock next-intl
    vi.mock('next-intl', () => ({
      useTranslations: () => (key: string) => {
        const translations = {
          'hero.badge': 'Technical Documentation',
          'hero.title': 'Technical Papers',
          'hero.subtitle': 'Explore Dubhe\'s technical architecture',
          'lightpaper.title': 'Lightpaper',
          'lightpaper.description': 'Comprehensive technical overview',
          'lightpaper.downloadLabel': 'Download Lightpaper',
          'onepager.title': 'Onepager', 
          'onepager.description': 'Concise overview',
          'onepager.downloadLabel': 'Download Onepager',
          'openInNewTab': 'Opens in new tab'
        }
        return translations[key as keyof typeof translations] || key
      }
    }))

    // Mock window.open
    global.window.open = vi.fn()
  })

  afterEach(() => {
    process.env = originalEnv
    vi.resetAllMocks()
  })

  describe('Environment Variable Integration', () => {
    it('uses custom environment URLs when configured', async () => {
      const customLightpaperUrl = 'https://cdn.example.com/custom-lightpaper.pdf'
      const customOnepaperUrl = 'https://cdn.example.com/custom-onepaper.pdf'
      
      process.env.NEXT_PUBLIC_LIGHTPAPER_URL = customLightpaperUrl
      process.env.NEXT_PUBLIC_ONEPAPER_URL = customOnepaperUrl
      process.env.NODE_ENV = 'production'

      const mockWindowOpen = vi.mocked(window.open)
      
      render(<PapersPage />)
      
      // Test lightpaper
      const lightpaperCard = screen.getAllByTestId('card')[0]
      fireEvent.click(lightpaperCard)
      
      await waitFor(() => {
        expect(mockWindowOpen).toHaveBeenCalledWith(
          customLightpaperUrl, 
          '_blank', 
          'noopener,noreferrer'
        )
      })

      mockWindowOpen.mockClear()

      // Test onepaper
      const onepaperCard = screen.getAllByTestId('card')[1]
      fireEvent.click(onepaperCard)
      
      await waitFor(() => {
        expect(mockWindowOpen).toHaveBeenCalledWith(
          customOnepaperUrl, 
          '_blank', 
          'noopener,noreferrer'
        )
      })
    })

    it('falls back to Google Drive URLs when environment variables are empty', async () => {
      process.env.NEXT_PUBLIC_LIGHTPAPER_URL = ''
      process.env.NEXT_PUBLIC_ONEPAPER_URL = ''
      process.env.NODE_ENV = 'test'

      const mockWindowOpen = vi.mocked(window.open)
      
      render(<PapersPage />)
      
      // Test lightpaper fallback
      const lightpaperCard = screen.getAllByTestId('card')[0]
      fireEvent.click(lightpaperCard)
      
      await waitFor(() => {
        expect(mockWindowOpen).toHaveBeenCalledWith(
          'https://drive.google.com/file/d/18VPJaivmd5FXYuFFhhhvUOWpeQyP-q1F/view?usp=sharing', 
          '_blank', 
          'noopener,noreferrer'
        )
      })

      mockWindowOpen.mockClear()

      // Test onepaper fallback
      const onepaperCard = screen.getAllByTestId('card')[1]
      fireEvent.click(onepaperCard)
      
      await waitFor(() => {
        expect(mockWindowOpen).toHaveBeenCalledWith(
          'https://drive.google.com/file/d/1aUwBNGsEuZ4cg0qeDpqDC4LbyEb9Q5OY/view?usp=sharing', 
          '_blank', 
          'noopener,noreferrer'
        )
      })
    })

    it('falls back when environment variables are undefined', async () => {
      delete process.env.NEXT_PUBLIC_LIGHTPAPER_URL
      delete process.env.NEXT_PUBLIC_ONEPAPER_URL
      process.env.NODE_ENV = 'test'

      const mockWindowOpen = vi.mocked(window.open)
      
      render(<PapersPage />)
      
      const lightpaperCard = screen.getAllByTestId('card')[0]
      fireEvent.click(lightpaperCard)
      
      await waitFor(() => {
        expect(mockWindowOpen).toHaveBeenCalledWith(
          'https://drive.google.com/file/d/18VPJaivmd5FXYuFFhhhvUOWpeQyP-q1F/view?usp=sharing', 
          '_blank', 
          'noopener,noreferrer'
        )
      })
    })

    it('handles whitespace-only environment variables', async () => {
      process.env.NEXT_PUBLIC_LIGHTPAPER_URL = '   \t\n   '
      process.env.NEXT_PUBLIC_ONEPAPER_URL = '     '
      process.env.NODE_ENV = 'test'

      const mockWindowOpen = vi.mocked(window.open)
      
      render(<PapersPage />)
      
      const lightpaperCard = screen.getAllByTestId('card')[0]
      fireEvent.click(lightpaperCard)
      
      await waitFor(() => {
        expect(mockWindowOpen).toHaveBeenCalledWith(
          'https://drive.google.com/file/d/18VPJaivmd5FXYuFFhhhvUOWpeQyP-q1F/view?usp=sharing', 
          '_blank', 
          'noopener,noreferrer'
        )
      })
    })
  })

  describe('Google Drive URL Functionality', () => {
    beforeEach(() => {
      process.env.NEXT_PUBLIC_LIGHTPAPER_URL = ''
      process.env.NEXT_PUBLIC_ONEPAPER_URL = ''
      process.env.NODE_ENV = 'test'
    })

    it('opens Google Drive URLs with correct security attributes', async () => {
      const mockWindowOpen = vi.mocked(window.open)
      
      render(<PapersPage />)
      
      const lightpaperCard = screen.getAllByTestId('card')[0]
      fireEvent.click(lightpaperCard)
      
      await waitFor(() => {
        expect(mockWindowOpen).toHaveBeenCalledWith(
          'https://drive.google.com/file/d/18VPJaivmd5FXYuFFhhhvUOWpeQyP-q1F/view?usp=sharing', 
          '_blank', 
          'noopener,noreferrer'
        )
      })
    })

    it('uses correct Google Drive file IDs', async () => {
      const mockWindowOpen = vi.mocked(window.open)
      
      render(<PapersPage />)
      
      // Test lightpaper file ID
      const lightpaperCard = screen.getAllByTestId('card')[0]
      fireEvent.click(lightpaperCard)
      
      await waitFor(() => {
        const callArgs = mockWindowOpen.mock.calls[0]
        expect(callArgs[0]).toContain('18VPJaivmd5FXYuFFhhhvUOWpeQyP-q1F')
      })

      mockWindowOpen.mockClear()

      // Test onepaper file ID
      const onepaperCard = screen.getAllByTestId('card')[1]
      fireEvent.click(onepaperCard)
      
      await waitFor(() => {
        const callArgs = mockWindowOpen.mock.calls[0]
        expect(callArgs[0]).toContain('1aUwBNGsEuZ4cg0qeDpqDC4LbyEb9Q5OY')
      })
    })

    it('includes proper Google Drive URL parameters', async () => {
      const mockWindowOpen = vi.mocked(window.open)
      
      render(<PapersPage />)
      
      const lightpaperCard = screen.getAllByTestId('card')[0]
      fireEvent.click(lightpaperCard)
      
      await waitFor(() => {
        const callArgs = mockWindowOpen.mock.calls[0]
        const url = callArgs[0] as string
        
        expect(url).toContain('drive.google.com/file/d/')
        expect(url).toContain('/view')
        expect(url).toContain('usp=sharing')
      })
    })
  })

  describe('Error Handling and Resilience', () => {
    it('handles window.open failure gracefully', async () => {
      const mockWindowOpen = vi.mocked(window.open).mockImplementation(() => {
        throw new Error('Pop-up blocked')
      })
      
      render(<PapersPage />)
      
      // Should not crash when window.open fails
      const lightpaperCard = screen.getAllByTestId('card')[0]
      
      expect(() => {
        fireEvent.click(lightpaperCard)
      }).not.toThrow()
      
      expect(mockWindowOpen).toHaveBeenCalled()
    })

    it('maintains page functionality after PDF download attempts', async () => {
      const mockWindowOpen = vi.mocked(window.open)
      
      render(<PapersPage />)
      
      // Multiple clicks should not break the page
      const lightpaperCard = screen.getAllByTestId('card')[0]
      const onepaperCard = screen.getAllByTestId('card')[1]
      
      fireEvent.click(lightpaperCard)
      fireEvent.click(onepaperCard)
      fireEvent.click(lightpaperCard)
      
      // Page content should still be visible
      expect(screen.getByText('Technical Papers')).toBeInTheDocument()
      expect(screen.getByText('Lightpaper')).toBeInTheDocument()
      expect(screen.getByText('Onepager')).toBeInTheDocument()
      
      expect(mockWindowOpen).toHaveBeenCalledTimes(3)
    })

    it('handles malformed environment URLs gracefully', async () => {
      process.env.NEXT_PUBLIC_LIGHTPAPER_URL = 'not-a-valid-url'
      process.env.NEXT_PUBLIC_ONEPAPER_URL = 'javascript:alert("xss")'
      
      const mockWindowOpen = vi.mocked(window.open)
      
      render(<PapersPage />)
      
      // Should still attempt to open the URLs (browser handles validation)
      const lightpaperCard = screen.getAllByTestId('card')[0]
      fireEvent.click(lightpaperCard)
      
      await waitFor(() => {
        expect(mockWindowOpen).toHaveBeenCalledWith(
          'not-a-valid-url', 
          '_blank', 
          'noopener,noreferrer'
        )
      })
    })
  })

  describe('Component Integration', () => {
    it('integrates properly with Card component', async () => {
      const mockWindowOpen = vi.mocked(window.open)
      
      render(<PapersPage />)
      
      // Cards should be clickable
      const cards = screen.getAllByTestId('card')
      expect(cards).toHaveLength(2)
      
      // Each card should have proper role and tabIndex
      cards.forEach(card => {
        expect(card).toHaveAttribute('role', 'button')
        expect(card).toHaveAttribute('tabIndex', '0')
      })
      
      // Clicking should trigger downloads
      fireEvent.click(cards[0])
      fireEvent.click(cards[1])
      
      await waitFor(() => {
        expect(mockWindowOpen).toHaveBeenCalledTimes(2)
      })
    })

    it('displays proper content in each card', () => {
      render(<PapersPage />)
      
      expect(screen.getByText('Lightpaper')).toBeInTheDocument()
      expect(screen.getByText('Onepager')).toBeInTheDocument()
      expect(screen.getByText('Download Lightpaper')).toBeInTheDocument()
      expect(screen.getByText('Download Onepager')).toBeInTheDocument()
      expect(screen.getByText('Comprehensive technical overview')).toBeInTheDocument()
      expect(screen.getByText('Concise overview')).toBeInTheDocument()
    })

    it('renders icons correctly', () => {
      render(<PapersPage />)
      
      // Should have file icons, external link icons, and download icons
      expect(screen.getAllByTestId('file-text-icon')).toHaveLength(2)
      expect(screen.getAllByTestId('external-link-icon')).toHaveLength(2)
      expect(screen.getAllByTestId('download-icon')).toHaveLength(2)
    })
  })

  describe('Performance Integration', () => {
    it('renders quickly with environment variables set', async () => {
      process.env.NEXT_PUBLIC_LIGHTPAPER_URL = 'https://example.com/lightpaper.pdf'
      process.env.NEXT_PUBLIC_ONEPAPER_URL = 'https://example.com/onepaper.pdf'
      
      const startTime = performance.now()
      render(<PapersPage />)
      const endTime = performance.now()
      
      expect(endTime - startTime).toBeLessThan(100) // Should render in less than 100ms
      expect(screen.getByText('Technical Papers')).toBeInTheDocument()
    })

    it('renders quickly with fallback URLs', async () => {
      process.env.NEXT_PUBLIC_LIGHTPAPER_URL = ''
      process.env.NEXT_PUBLIC_ONEPAPER_URL = ''
      process.env.NODE_ENV = 'test' // Avoid console logging overhead
      
      const startTime = performance.now()
      render(<PapersPage />)
      const endTime = performance.now()
      
      expect(endTime - startTime).toBeLessThan(100) // Should render in less than 100ms
      expect(screen.getByText('Technical Papers')).toBeInTheDocument()
    })

    it('handles rapid successive clicks efficiently', async () => {
      const mockWindowOpen = vi.mocked(window.open)
      
      render(<PapersPage />)
      
      const lightpaperCard = screen.getAllByTestId('card')[0]
      
      // Rapid clicks
      const startTime = performance.now()
      for (let i = 0; i < 10; i++) {
        fireEvent.click(lightpaperCard)
      }
      const endTime = performance.now()
      
      expect(endTime - startTime).toBeLessThan(50) // Should handle rapidly
      expect(mockWindowOpen).toHaveBeenCalledTimes(10)
    })
  })

  describe('Accessibility Integration', () => {
    it('maintains proper ARIA attributes', () => {
      render(<PapersPage />)
      
      const cards = screen.getAllByTestId('card')
      cards.forEach(card => {
        expect(card).toHaveAttribute('role', 'button')
        expect(card).toHaveAttribute('tabIndex', '0')
      })
    })

    it('supports keyboard navigation', async () => {
      const mockWindowOpen = vi.mocked(window.open)
      
      render(<PapersPage />)
      
      const lightpaperCard = screen.getAllByTestId('card')[0]
      
      // Focus and activate with keyboard
      lightpaperCard.focus()
      fireEvent.keyDown(lightpaperCard, { key: 'Enter', code: 'Enter' })
      
      await waitFor(() => {
        expect(mockWindowOpen).toHaveBeenCalled()
      })
    })

    it('maintains semantic structure', () => {
      render(<PapersPage />)
      
      // Should have proper heading hierarchy
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
      
      // Navigation should be accessible
      expect(screen.getByTestId('navigation')).toBeInTheDocument()
      expect(screen.getByTestId('footer')).toBeInTheDocument()
    })
  })
})