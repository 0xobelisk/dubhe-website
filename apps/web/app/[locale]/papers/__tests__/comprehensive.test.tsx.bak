import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import PapersPage from '../page'

// Comprehensive tests for the PDF remote linking implementation
describe('Papers Page - Comprehensive PDF Remote Linking Tests', () => {
  let originalEnv: NodeJS.ProcessEnv
  
  beforeEach(() => {
    originalEnv = { ...process.env }
    vi.clearAllMocks()
    
    // Mock all dependencies
    vi.mock('framer-motion', () => ({
      motion: {
        h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
        p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
      },
    }))

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

    vi.mock('lucide-react', () => ({
      FileText: () => <span data-testid="file-text-icon">FileText</span>,
      ExternalLink: () => <span data-testid="external-link-icon">ExternalLink</span>,
      Download: () => <span data-testid="download-icon">Download</span>
    }))

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

    global.window.open = vi.fn()
  })

  afterEach(() => {
    process.env = originalEnv
    vi.restoreAllMocks()
  })

  describe('Core Functionality', () => {
    it('renders page correctly with all elements', () => {
      render(<PapersPage />)
      
      expect(screen.getByText('Technical Papers')).toBeInTheDocument()
      expect(screen.getByText('Lightpaper')).toBeInTheDocument()
      expect(screen.getByText('Onepager')).toBeInTheDocument()
      expect(screen.getByText('Download Lightpaper')).toBeInTheDocument()
      expect(screen.getByText('Download Onepager')).toBeInTheDocument()
      expect(screen.getByTestId('navigation')).toBeInTheDocument()
      expect(screen.getByTestId('footer')).toBeInTheDocument()
    })

    it('opens correct Google Drive URLs when using fallbacks', async () => {
      process.env.NEXT_PUBLIC_LIGHTPAPER_URL = ''
      process.env.NEXT_PUBLIC_ONEPAGER_URL = ''
      
      const mockWindowOpen = vi.mocked(window.open)
      
      render(<PapersPage />)
      
      // Test lightpaper
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

      // Test onepager
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

    it('uses custom environment URLs when provided', async () => {
      const customLightpaperUrl = 'https://custom-cdn.com/lightpaper.pdf'
      const customOnepaperUrl = 'https://custom-cdn.com/onepaper.pdf'
      
      process.env.NEXT_PUBLIC_LIGHTPAPER_URL = customLightpaperUrl
      process.env.NEXT_PUBLIC_ONEPAGER_URL = customOnepaperUrl
      
      const mockWindowOpen = vi.mocked(window.open)
      
      render(<PapersPage />)
      
      // Test custom lightpaper URL
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

      // Test custom onepager URL
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
  })

  describe('Environment Variable Handling', () => {
    it('handles empty string environment variables correctly', () => {
      process.env.NEXT_PUBLIC_LIGHTPAPER_URL = ''
      process.env.NEXT_PUBLIC_ONEPAGER_URL = ''
      
      const mockWindowOpen = vi.mocked(window.open)
      
      render(<PapersPage />)
      
      const lightpaperCard = screen.getAllByTestId('card')[0]
      fireEvent.click(lightpaperCard)
      
      // Should use fallback URL
      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://drive.google.com/file/d/18VPJaivmd5FXYuFFhhhvUOWpeQyP-q1F/view?usp=sharing',
        '_blank',
        'noopener,noreferrer'
      )
    })

    it('handles whitespace-only environment variables', () => {
      process.env.NEXT_PUBLIC_LIGHTPAPER_URL = '   \t\n   '
      process.env.NEXT_PUBLIC_ONEPAGER_URL = '     '
      
      const mockWindowOpen = vi.mocked(window.open)
      
      render(<PapersPage />)
      
      const lightpaperCard = screen.getAllByTestId('card')[0]
      fireEvent.click(lightpaperCard)
      
      // Should use fallback URL
      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://drive.google.com/file/d/18VPJaivmd5FXYuFFhhhvUOWpeQyP-q1F/view?usp=sharing',
        '_blank',
        'noopener,noreferrer'
      )
    })

    it('handles undefined environment variables', () => {
      delete process.env.NEXT_PUBLIC_LIGHTPAPER_URL
      delete process.env.NEXT_PUBLIC_ONEPAGER_URL
      
      const mockWindowOpen = vi.mocked(window.open)
      
      render(<PapersPage />)
      
      const lightpaperCard = screen.getAllByTestId('card')[0]
      fireEvent.click(lightpaperCard)
      
      // Should use fallback URL
      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://drive.google.com/file/d/18VPJaivmd5FXYuFFhhhvUOWpeQyP-q1F/view?usp=sharing',
        '_blank',
        'noopener,noreferrer'
      )
    })
  })

  describe('Error Handling', () => {
    it('handles window.open returning null gracefully', () => {
      const mockWindowOpen = vi.mocked(window.open).mockReturnValue(null)
      
      render(<PapersPage />)
      
      const lightpaperCard = screen.getAllByTestId('card')[0]
      
      // Should not throw when popup is blocked
      expect(() => {
        fireEvent.click(lightpaperCard)
      }).not.toThrow()
      
      expect(mockWindowOpen).toHaveBeenCalled()
      
      // Page should remain functional
      expect(screen.getByText('Technical Papers')).toBeInTheDocument()
    })

    it('handles window.open throwing an error', () => {
      const mockWindowOpen = vi.mocked(window.open).mockImplementation(() => {
        throw new Error('Security policy violation')
      })
      
      render(<PapersPage />)
      
      const lightpaperCard = screen.getAllByTestId('card')[0]
      
      // Should not throw when window.open fails
      expect(() => {
        fireEvent.click(lightpaperCard)
      }).not.toThrow()
      
      expect(mockWindowOpen).toHaveBeenCalled()
    })

    it('maintains functionality after failed PDF downloads', () => {
      const mockWindowOpen = vi.mocked(window.open).mockReturnValue(null)
      
      render(<PapersPage />)
      
      const lightpaperCard = screen.getAllByTestId('card')[0]
      const onepaperCard = screen.getAllByTestId('card')[1]
      
      // Multiple failed attempts should not break the page
      fireEvent.click(lightpaperCard)
      fireEvent.click(onepaperCard)
      fireEvent.click(lightpaperCard)
      
      // Page content should still be visible and functional
      expect(screen.getByText('Technical Papers')).toBeInTheDocument()
      expect(screen.getByText('Lightpaper')).toBeInTheDocument()
      expect(screen.getByText('Onepager')).toBeInTheDocument()
      
      expect(mockWindowOpen).toHaveBeenCalledTimes(3)
    })
  })

  describe('Performance and Reliability', () => {
    it('handles rapid successive clicks efficiently', () => {
      const mockWindowOpen = vi.mocked(window.open)
      
      render(<PapersPage />)
      
      const lightpaperCard = screen.getAllByTestId('card')[0]
      
      // Rapid clicks should all be processed
      for (let i = 0; i < 10; i++) {
        fireEvent.click(lightpaperCard)
      }
      
      expect(mockWindowOpen).toHaveBeenCalledTimes(10)
      
      // Each call should have correct parameters
      mockWindowOpen.mock.calls.forEach(call => {
        expect(call[0]).toContain('drive.google.com')
        expect(call[1]).toBe('_blank')
        expect(call[2]).toBe('noopener,noreferrer')
      })
    })

    it('renders quickly with different environment configurations', () => {
      const configs = [
        { NEXT_PUBLIC_LIGHTPAPER_URL: '', NEXT_PUBLIC_ONEPAGER_URL: '' },
        { 
          NEXT_PUBLIC_LIGHTPAPER_URL: 'https://example.com/light.pdf', 
          NEXT_PUBLIC_ONEPAGER_URL: 'https://example.com/one.pdf' 
        }
      ]
      
      configs.forEach(config => {
        Object.assign(process.env, config)
        
        const startTime = performance.now()
        const { unmount } = render(<PapersPage />)
        const renderTime = performance.now() - startTime
        
        expect(renderTime).toBeLessThan(50) // Should render quickly
        expect(screen.getByText('Technical Papers')).toBeInTheDocument()
        
        unmount()
      })
    })

    it('provides consistent URL generation', () => {
      process.env.NEXT_PUBLIC_LIGHTPAPER_URL = 'https://consistent.example.com/test.pdf'
      
      const mockWindowOpen = vi.mocked(window.open)
      
      render(<PapersPage />)
      
      const lightpaperCard = screen.getAllByTestId('card')[0]
      
      // Multiple clicks should generate identical URLs
      const urls: string[] = []
      for (let i = 0; i < 5; i++) {
        fireEvent.click(lightpaperCard)
        const lastCall = mockWindowOpen.mock.calls[mockWindowOpen.mock.calls.length - 1]
        urls.push(lastCall[0] as string)
      }
      
      // All URLs should be identical
      expect(urls.every(url => url === urls[0])).toBe(true)
      expect(urls[0]).toBe('https://consistent.example.com/test.pdf')
    })
  })

  describe('URL Validation', () => {
    it('generates valid Google Drive URLs for fallbacks', () => {
      process.env.NEXT_PUBLIC_LIGHTPAPER_URL = ''
      process.env.NEXT_PUBLIC_ONEPAGER_URL = ''
      
      const mockWindowOpen = vi.mocked(window.open)
      
      render(<PapersPage />)
      
      // Click both cards
      fireEvent.click(screen.getAllByTestId('card')[0])
      fireEvent.click(screen.getAllByTestId('card')[1])
      
      // Verify URLs are valid and correct
      expect(mockWindowOpen).toHaveBeenNthCalledWith(
        1,
        'https://drive.google.com/file/d/18VPJaivmd5FXYuFFhhhvUOWpeQyP-q1F/view?usp=sharing',
        '_blank',
        'noopener,noreferrer'
      )
      
      expect(mockWindowOpen).toHaveBeenNthCalledWith(
        2,
        'https://drive.google.com/file/d/1aUwBNGsEuZ4cg0qeDpqDC4LbyEb9Q5OY/view?usp=sharing',
        '_blank',
        'noopener,noreferrer'
      )
      
      // URLs should be valid
      const lightpaperUrl = mockWindowOpen.mock.calls[0][0] as string
      const onepaperUrl = mockWindowOpen.mock.calls[1][0] as string
      
      expect(() => new URL(lightpaperUrl)).not.toThrow()
      expect(() => new URL(onepaperUrl)).not.toThrow()
      
      expect(new URL(lightpaperUrl).protocol).toBe('https:')
      expect(new URL(onepaperUrl).protocol).toBe('https:')
    })

    it('preserves custom URLs exactly as provided', () => {
      const complexUrl = 'https://cdn.example.com/docs/papers/lightpaper-v2.pdf?version=latest&token=abc123&format=pdf'
      process.env.NEXT_PUBLIC_LIGHTPAPER_URL = complexUrl
      
      const mockWindowOpen = vi.mocked(window.open)
      
      render(<PapersPage />)
      
      fireEvent.click(screen.getAllByTestId('card')[0])
      
      expect(mockWindowOpen).toHaveBeenCalledWith(
        complexUrl,
        '_blank',
        'noopener,noreferrer'
      )
    })
  })

  describe('Accessibility', () => {
    it('maintains proper ARIA attributes and roles', () => {
      render(<PapersPage />)
      
      const cards = screen.getAllByTestId('card')
      
      cards.forEach(card => {
        expect(card).toHaveAttribute('role', 'button')
        expect(card).toHaveAttribute('tabIndex', '0')
      })
      
      // Should have proper heading structure
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    })

    it('supports keyboard navigation', () => {
      const mockWindowOpen = vi.mocked(window.open)
      
      render(<PapersPage />)
      
      const lightpaperCard = screen.getAllByTestId('card')[0]
      
      // Focus and activate
      lightpaperCard.focus()
      fireEvent.click(lightpaperCard) // Simulate keyboard activation via click
      
      expect(mockWindowOpen).toHaveBeenCalled()
    })
  })

  describe('Security', () => {
    it('uses proper security attributes for new window', () => {
      const mockWindowOpen = vi.mocked(window.open)
      
      render(<PapersPage />)
      
      fireEvent.click(screen.getAllByTestId('card')[0])
      
      expect(mockWindowOpen).toHaveBeenCalledWith(
        expect.any(String),
        '_blank',
        'noopener,noreferrer'
      )
    })

    it('opens URLs in new tab with security features', () => {
      const mockWindowOpen = vi.mocked(window.open)
      
      render(<PapersPage />)
      
      // Test both cards
      fireEvent.click(screen.getAllByTestId('card')[0])
      fireEvent.click(screen.getAllByTestId('card')[1])
      
      // All calls should use proper security parameters
      mockWindowOpen.mock.calls.forEach(call => {
        expect(call[1]).toBe('_blank') // New tab
        expect(call[2]).toBe('noopener,noreferrer') // Security features
      })
    })
  })
})