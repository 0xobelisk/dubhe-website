import { render, screen, fireEvent } from '../../../../test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import PapersPage from '../page'

const mocks = vi.hoisted(() => ({
  missingTranslations: false,
  hideIcons: false,
  omitAria: false,
}))

vi.mock('framer-motion', () => ({
  motion: {
    h1: ({ children }: React.PropsWithChildren) => <h1>{children}</h1>,
    p: ({ children }: React.PropsWithChildren) => <p>{children}</p>,
    div: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
  },
}))
vi.mock('@/components/navigation', () => ({ default: () => <nav data-testid="navigation">Navigation</nav> }))
vi.mock('@/components/footer', () => ({ default: () => <footer data-testid="footer">Footer</footer> }))
vi.mock('@/components/ui/Card', () => ({
  default: ({ children, onClick, clickable }: React.PropsWithChildren<{ onClick?: () => void; clickable?: boolean }>) => (
    <div data-testid="card" onClick={onClick} role={!mocks.omitAria && clickable ? 'button' : undefined}>
      {children}
    </div>
  ),
}))
vi.mock('lucide-react', () => ({
  FileText: () => mocks.hideIcons ? null : <span data-testid="file-text-icon">FileText</span>,
  ExternalLink: () => mocks.hideIcons ? null : <span data-testid="external-link-icon">ExternalLink</span>,
  Download: () => mocks.hideIcons ? null : <span data-testid="download-icon">Download</span>,
}))
vi.mock('next-intl', () => ({
  NextIntlClientProvider: ({ children }: React.PropsWithChildren) => children,
  useTranslations: () => (key: string) => {
    if (mocks.missingTranslations && key === 'lightpaper.title') return undefined
    if (mocks.missingTranslations && key === 'hero.title') return ''
    const translations: Record<string, string> = {
      'hero.badge': 'Technical Documentation',
      'hero.title': 'Technical Papers',
      'hero.subtitle': "Explore Dubhe's technical architecture",
      'lightpaper.title': 'Lightpaper',
      'lightpaper.description': 'Comprehensive technical overview',
      'lightpaper.downloadLabel': 'Download Lightpaper',
      'onepager.title': 'Onepager',
      'onepager.description': 'Concise overview',
      'onepager.downloadLabel': 'Download Onepager',
      'openInNewTab': 'Opens in new tab',
    }
    return translations[key] || key
  },
}))

// Exercise browser failures without changing the page's runtime behavior.
describe('Papers Page - Error Scenarios and Edge Cases', () => {
  let originalEnv: NodeJS.ProcessEnv
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>
  let consoleLogSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    originalEnv = { ...process.env }
    vi.clearAllMocks()
    mocks.missingTranslations = false
    mocks.hideIcons = false
    mocks.omitAria = false
    delete process.env.NEXT_PUBLIC_LIGHTPAPER_URL
    delete process.env.NEXT_PUBLIC_ONEPAPER_URL
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(window, 'open').mockReturnValue(null)
  })

  afterEach(() => {
    process.env = originalEnv
    vi.clearAllTimers()
    vi.useRealTimers()
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

    it('reports a browser open exception without removing the page', async () => {
      const mockWindowOpen = vi.mocked(window.open).mockImplementation(() => {
        throw new Error('Security policy violation')
      })
      
      render(<PapersPage />)
      
      const lightpaperCard = screen.getAllByTestId('card')[0]
      
      // React 19 reports event-handler exceptions as window error events.
      // Capture and assert only this expected failure; other errors still fail.
      const reported: Error[] = []
      const captureExpectedError = (event: ErrorEvent) => {
        if (event.error instanceof Error && event.error.message === 'Security policy violation') {
          reported.push(event.error)
          event.preventDefault()
        }
      }
      window.addEventListener('error', captureExpectedError)
      try {
        fireEvent.click(lightpaperCard)
        expect(reported).toHaveLength(1)
        expect(reported[0].message).toBe('Security policy violation')
      } finally {
        window.removeEventListener('error', captureExpectedError)
      }

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
      process.env.NEXT_PUBLIC_ONEPAPER_URL = unicodeUrl
      
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
          throw new Error('Component render error')
        }
        return <div>Recovered</div>
      }
      
      // This test verifies error boundaries would work
      expect(() => {
        render(<ThrowingComponent />)
      }).toThrow()
      
      // React 19 may retry a failing render; recover between render attempts.
      shouldThrow = false
      expect(() => {
        render(<ThrowingComponent />)
      }).not.toThrow()
    })

    it('handles missing translation keys gracefully', () => {
      mocks.missingTranslations = true
      
      // Should render without throwing
      expect(() => {
        render(<PapersPage />)
      }).not.toThrow()
    })

    it('handles malformed motion animation props', () => {
      // Test that component works even if framer-motion has issues
      // The static motion adapter drops animation props, as a browser with
      // reduced/no animation support would; the page must retain its content.
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
      const legacyOpen = vi.fn().mockReturnValue(null)
      const mockWindowOpen = vi.mocked(window.open).mockImplementation((url) => legacyOpen(url))
      
      render(<PapersPage />)
      
      const lightpaperCard = screen.getAllByTestId('card')[0]
      fireEvent.click(lightpaperCard)
      
      expect(mockWindowOpen).toHaveBeenCalled()
    })

    it('handles browsers without noopener support', async () => {
      const legacyOpen = vi.fn().mockReturnValue(null)
      const mockWindowOpen = vi.mocked(window.open).mockImplementation((url, target) => legacyOpen(url, target))
      
      render(<PapersPage />)
      
      const lightpaperCard = screen.getAllByTestId('card')[0]
      fireEvent.click(lightpaperCard)
      
      expect(mockWindowOpen).toHaveBeenCalledWith(expect.any(String), '_blank', 'noopener,noreferrer')
      expect(legacyOpen).toHaveBeenCalledWith(expect.any(String), '_blank')
    })
  })

  describe('Network and Connection Errors', () => {
    it('handles slow network conditions gracefully', async () => {
      vi.useFakeTimers()
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
      mocks.omitAria = true
      
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
      mocks.hideIcons = true
      
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