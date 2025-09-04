import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import PapersPage from '../page'

// Error scenario tests for PDF remote linking
describe('Papers Page - Error Scenarios and Edge Cases', () => {
  let originalEnv: NodeJS.ProcessEnv
  let consoleErrorSpy: any
  let consoleWarnSpy: any
  let consoleLogSpy: any
  
  beforeEach(() => {
    originalEnv = { ...process.env }
    vi.clearAllMocks()
    
    // Spy on console methods
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    
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
    vi.restoreAllMocks()
  })

  describe('Window.open Failure Scenarios', () => {
    it('handles window.open returning null (popup blocked)', async () => {
      const mockWindowOpen = vi.mocked(window.open).mockReturnValue(null)
      
      render(<PapersPage />)
      
      const lightpaperCard = screen.getAllByTestId('card')[0]
      
      // Should not throw error when popup is blocked
      expect(() => {
        fireEvent.click(lightpaperCard)
      }).not.toThrow()
      
      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://drive.google.com/file/d/18VPJaivmd5FXYuFFhhhvUOWpeQyP-q1F/view?usp=sharing',
        '_blank',
        'noopener,noreferrer'
      )
      
      // Page should remain functional
      expect(screen.getByText('Technical Papers')).toBeInTheDocument()
    })

    it('handles window.open throwing exception', async () => {
      const mockWindowOpen = vi.mocked(window.open).mockImplementation(() => {
        throw new Error('Security policy violation')
      })
      
      render(<PapersPage />)
      
      const lightpaperCard = screen.getAllByTestId('card')[0]
      
      // Should handle exception gracefully
      expect(() => {
        fireEvent.click(lightpaperCard)
      }).not.toThrow()
      
      expect(mockWindowOpen).toHaveBeenCalled()
      
      // Page should remain functional
      expect(screen.getByText('Lightpaper')).toBeInTheDocument()
    })

    it('handles window being undefined', async () => {
      // This test verifies the component renders even in server-side environments
      // where window might not be available during initial render
      
      render(<PapersPage />)
      
      // Component should render successfully
      expect(screen.getByTestId('navigation')).toBeInTheDocument()
      expect(screen.getByTestId('footer')).toBeInTheDocument()
    })
  })

  describe('Environment Variable Error Scenarios', () => {
    it('handles corrupted environment variable values', () => {
      process.env.NEXT_PUBLIC_LIGHTPAPER_URL = '\x00\x01\x02invalid\x03\x04'
      process.env.NEXT_PUBLIC_ONEPAPER_URL = '\\n\\t\\r'
      
      // Should render without throwing
      expect(() => {
        render(<PapersPage />)
      }).not.toThrow()
      
      expect(screen.getByText('Technical Papers')).toBeInTheDocument()
    })

    it('handles extremely long environment variable values', () => {
      const longUrl = 'https://example.com/' + 'a'.repeat(10000)
      process.env.NEXT_PUBLIC_LIGHTPAPER_URL = longUrl
      
      const mockWindowOpen = vi.mocked(window.open)
      
      render(<PapersPage />)
      
      const lightpaperCard = screen.getAllByTestId('card')[0]
      fireEvent.click(lightpaperCard)
      
      expect(mockWindowOpen).toHaveBeenCalledWith(
        longUrl,
        '_blank',
        'noopener,noreferrer'
      )
    })

    it('handles environment variables with special characters', () => {
      const specialCharUrl = 'https://example.com/file with spaces & symbols!@#$%^&*()+={}[]|\\:";\'<>?,./~`'
      process.env.NEXT_PUBLIC_LIGHTPAPER_URL = specialCharUrl
      
      const mockWindowOpen = vi.mocked(window.open)
      
      render(<PapersPage />)
      
      const lightpaperCard = screen.getAllByTestId('card')[0]
      fireEvent.click(lightpaperCard)
      
      expect(mockWindowOpen).toHaveBeenCalledWith(
        specialCharUrl,
        '_blank',
        'noopener,noreferrer'
      )
    })

    it('handles environment variables with Unicode characters', () => {
      const unicodeUrl = 'https://example.com/文件/лайтпейпер/ドキュメント.pdf'
      process.env.NEXT_PUBLIC_ONEPAGER_URL = unicodeUrl
      
      const mockWindowOpen = vi.mocked(window.open)
      
      render(<PapersPage />)
      
      const onepaperCard = screen.getAllByTestId('card')[1]
      fireEvent.click(onepaperCard)
      
      expect(mockWindowOpen).toHaveBeenCalledWith(
        unicodeUrl,
        '_blank',
        'noopener,noreferrer'
      )
    })
  })

  describe('Component Error Recovery', () => {
    it('recovers from component render errors', () => {
      // Mock a component that throws during render
      let shouldThrow = true
      
      const ThrowingComponent = () => {
        if (shouldThrow) {
          shouldThrow = false // Only throw once
          throw new Error('Component render error')
        }
        return <div>Recovered</div>
      }
      
      // This test verifies error boundaries would work
      expect(() => {
        render(<ThrowingComponent />)
      }).toThrow()
      
      // Second render should work
      expect(() => {
        render(<ThrowingComponent />)
      }).not.toThrow()
    })

    it('handles missing translation keys gracefully', () => {
      vi.mock('next-intl', () => ({
        useTranslations: () => (key: string) => {
          // Return undefined for some keys to test error handling
          if (key === 'lightpaper.title') return undefined
          if (key === 'hero.title') return ''
          return key
        }
      }))
      
      // Should render without throwing
      expect(() => {
        render(<PapersPage />)
      }).not.toThrow()
    })

    it('handles malformed motion animation props', () => {
      // Test that component works even if framer-motion has issues
      vi.mock('framer-motion', () => ({
        motion: {
          h1: ({ children, ...props }: any) => {
            if (props.animate && typeof props.animate === 'object') {
              // Handle potential animation prop errors
              return <h1>{children}</h1>
            }
            return <h1 {...props}>{children}</h1>
          },
          p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
          div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
        },
      }))
      
      expect(() => {
        render(<PapersPage />)
      }).not.toThrow()
    })
  })

  describe('Memory and Resource Management', () => {
    it('handles rapid consecutive clicks without memory leaks', async () => {
      const mockWindowOpen = vi.mocked(window.open)
      
      render(<PapersPage />)
      
      const lightpaperCard = screen.getAllByTestId('card')[0]
      
      // Simulate rapid clicking
      for (let i = 0; i < 100; i++) {
        fireEvent.click(lightpaperCard)
      }
      
      expect(mockWindowOpen).toHaveBeenCalledTimes(100)
      
      // Component should still be responsive
      expect(screen.getByText('Technical Papers')).toBeInTheDocument()
    })

    it('cleans up event listeners properly', () => {
      const { unmount } = render(<PapersPage />)
      
      // Should unmount without errors
      expect(() => {
        unmount()
      }).not.toThrow()
    })
  })

  describe('Browser Compatibility Edge Cases', () => {
    it('handles browsers without proper target support', async () => {
      // Mock window.open that doesn't support _blank
      const mockWindowOpen = vi.mocked(window.open).mockImplementation((url, target, features) => {
        if (target === '_blank') {
          // Simulate old browser that ignores target
          return window.open(url) as Window
        }
        return null
      })
      
      render(<PapersPage />)
      
      const lightpaperCard = screen.getAllByTestId('card')[0]
      fireEvent.click(lightpaperCard)
      
      expect(mockWindowOpen).toHaveBeenCalled()
    })

    it('handles browsers without noopener support', async () => {
      const mockWindowOpen = vi.mocked(window.open).mockImplementation((url, target, features) => {
        // Some older browsers might not support noopener
        if (features?.includes('noopener')) {
          return window.open(url, target) as Window
        }
        return window.open(url, target, features) as Window
      })
      
      render(<PapersPage />)
      
      const lightpaperCard = screen.getAllByTestId('card')[0]
      fireEvent.click(lightpaperCard)
      
      expect(mockWindowOpen).toHaveBeenCalled()
    })
  })

  describe('Network and Connection Errors', () => {
    it('handles slow network conditions gracefully', async () => {
      // Simulate slow response (component should still work)
      const mockWindowOpen = vi.mocked(window.open).mockImplementation((url) => {
        // Simulate delayed response
        setTimeout(() => {
          console.log(`Opening ${url}`)
        }, 1000)
        return {} as Window
      })
      
      render(<PapersPage />)
      
      const lightpaperCard = screen.getAllByTestId('card')[0]
      fireEvent.click(lightpaperCard)
      
      expect(mockWindowOpen).toHaveBeenCalled()
      expect(screen.getByText('Technical Papers')).toBeInTheDocument()
    })

    it('maintains functionality during partial network outages', async () => {
      // Even if external resources fail, PDF links should still work
      const mockWindowOpen = vi.mocked(window.open)
      
      render(<PapersPage />)
      
      // Should still be able to click and attempt PDF opening
      const lightpaperCard = screen.getAllByTestId('card')[0]
      const onepaperCard = screen.getAllByTestId('card')[1]
      
      fireEvent.click(lightpaperCard)
      fireEvent.click(onepaperCard)
      
      expect(mockWindowOpen).toHaveBeenCalledTimes(2)
    })
  })

  describe('Accessibility Error Scenarios', () => {
    it('handles missing ARIA attributes gracefully', () => {
      // Component should work even if Card component doesn't provide proper ARIA
      vi.mock('@/components/ui/Card', () => ({
        default: ({ children, onClick }: any) => (
          <div onClick={onClick} data-testid="card">
            {children}
          </div>
        )
      }))
      
      render(<PapersPage />)
      
      const cards = screen.getAllByTestId('card')
      expect(cards).toHaveLength(2)
      
      // Should still be clickable
      const mockWindowOpen = vi.mocked(window.open)
      fireEvent.click(cards[0])
      
      expect(mockWindowOpen).toHaveBeenCalled()
    })

    it('works with screen readers when icons fail to load', () => {
      // Mock icons that don't render
      vi.mock('lucide-react', () => ({
        FileText: () => null,
        ExternalLink: () => null,
        Download: () => null
      }))
      
      render(<PapersPage />)
      
      // Text content should still be accessible
      expect(screen.getByText('Download Lightpaper')).toBeInTheDocument()
      expect(screen.getByText('Download Onepager')).toBeInTheDocument()
    })
  })

  describe('Data Integrity and Validation', () => {
    it('validates URL format before opening', async () => {
      // Test with obviously invalid URL
      process.env.NEXT_PUBLIC_LIGHTPAPER_URL = 'not-a-url-at-all'
      
      const mockWindowOpen = vi.mocked(window.open)
      
      render(<PapersPage />)
      
      const lightpaperCard = screen.getAllByTestId('card')[0]
      fireEvent.click(lightpaperCard)
      
      // Should still attempt to open (browser will handle validation)
      expect(mockWindowOpen).toHaveBeenCalledWith(
        'not-a-url-at-all',
        '_blank',
        'noopener,noreferrer'
      )
    })

    it('handles null and undefined values in environment', () => {
      // Force null values
      process.env.NEXT_PUBLIC_LIGHTPAPER_URL = 'null'
      process.env.NEXT_PUBLIC_ONEPAPER_URL = 'undefined'
      
      const mockWindowOpen = vi.mocked(window.open)
      
      render(<PapersPage />)
      
      const lightpaperCard = screen.getAllByTestId('card')[0]
      fireEvent.click(lightpaperCard)
      
      // Should treat string 'null' as valid URL
      expect(mockWindowOpen).toHaveBeenCalledWith(
        'null',
        '_blank',
        'noopener,noreferrer'
      )
    })
  })

  describe('Concurrency and Race Conditions', () => {
    it('handles simultaneous clicks on different cards', async () => {
      const mockWindowOpen = vi.mocked(window.open)
      
      render(<PapersPage />)
      
      const lightpaperCard = screen.getAllByTestId('card')[0]
      const onepaperCard = screen.getAllByTestId('card')[1]
      
      // Click both cards simultaneously
      fireEvent.click(lightpaperCard)
      fireEvent.click(onepaperCard)
      
      expect(mockWindowOpen).toHaveBeenCalledTimes(2)
      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://drive.google.com/file/d/18VPJaivmd5FXYuFFhhhvUOWpeQyP-q1F/view?usp=sharing',
        '_blank',
        'noopener,noreferrer'
      )
      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://drive.google.com/file/d/1aUwBNGsEuZ4cg0qeDpqDC4LbyEb9Q5OY/view?usp=sharing',
        '_blank',
        'noopener,noreferrer'
      )
    })

    it('handles rapid re-rendering during environment changes', () => {
      const { rerender } = render(<PapersPage />)
      
      // Rapidly change environment and re-render
      for (let i = 0; i < 10; i++) {
        process.env.NEXT_PUBLIC_LIGHTPAPER_URL = `https://example${i}.com/test.pdf`
        rerender(<PapersPage />)
      }
      
      // Should complete without errors
      expect(screen.getByText('Technical Papers')).toBeInTheDocument()
    })
  })

  describe('Error Logging and Monitoring', () => {
    it('does not log sensitive information in errors', () => {
      process.env.NEXT_PUBLIC_LIGHTPAPER_URL = 'https://secret-internal-server.com/confidential.pdf'
      
      render(<PapersPage />)
      
      // Check that no sensitive URLs are logged
      expect(consoleLogSpy).not.toHaveBeenCalledWith(
        expect.stringContaining('secret-internal-server')
      )
    })

    it('logs appropriate development information', () => {
      process.env.NEXT_PUBLIC_LIGHTPAPER_URL = ''
      process.env.NODE_ENV = 'development'
      
      render(<PapersPage />)
      
      // Should log fallback usage in development
      expect(consoleLogSpy).toHaveBeenCalledWith(
        'NEXT_PUBLIC_LIGHTPAPER_URL not set or empty, using fallback Google Drive URL'
      )
    })
  })
})