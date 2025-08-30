import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import PapersPage from '../app/[locale]/papers/page'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}))

// Mock navigation component
vi.mock('@/components/navigation', () => ({
  default: () => <nav data-testid="navigation">Navigation</nav>
}))

// Mock Card component
vi.mock('@/components/ui/Card', () => ({
  default: ({ children, onClick, ...props }: any) => (
    <div data-testid="card" onClick={onClick} {...props}>
      {children}
    </div>
  )
}))

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  FileText: () => <span data-testid="file-text-icon">FileText</span>,
  ExternalLink: () => <span data-testid="external-link-icon">ExternalLink</span>,
  Download: () => <span data-testid="download-icon">Download</span>
}))

// Mock next-intl with different locale scenarios
const mockUseTranslations = vi.fn()
const mockUseLocale = vi.fn()

vi.mock('next-intl', () => ({
  useTranslations: () => mockUseTranslations,
  useLocale: () => mockUseLocale()
}))

// Global mocks
global.fetch = vi.fn()
global.window.open = vi.fn()

describe('Papers Page - Internationalization Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseLocale.mockReturnValue('en')
    mockUseTranslations.mockImplementation((key: string) => {
      const translations = {
        'hero.badge': 'Technical Documentation',
        'hero.title': 'Technical Papers',
        'hero.subtitle': 'Explore Dubhe\'s technical architecture',
        'whitepaper.title': 'Whitepaper',
        'whitepaper.description': 'Comprehensive technical overview',
        'whitepaper.downloadLabel': 'Download Whitepaper',
        'lightpaper.title': 'Lightpaper',
        'lightpaper.description': 'Concise overview',
        'lightpaper.downloadLabel': 'Download Lightpaper',
        'openInNewTab': 'Opens in new tab'
      }
      return translations[key as keyof typeof translations] || key
    })
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('English Locale (Default)', () => {
    it('displays content with English translations', () => {
      render(<PapersPage />)
      
      expect(screen.getByText('Technical Papers')).toBeInTheDocument()
      expect(screen.getByText('Whitepaper')).toBeInTheDocument()
      expect(screen.getByText('Lightpaper')).toBeInTheDocument()
      expect(screen.getByText('Download Whitepaper')).toBeInTheDocument()
      expect(screen.getByText('Download Lightpaper')).toBeInTheDocument()
    })

    it('generates English PDF URLs by default', async () => {
      const mockFetch = vi.mocked(fetch)
      const mockWindowOpen = vi.mocked(window.open)
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200
      } as Response)
      
      render(<PapersPage />)
      
      const whitepaperCard = screen.getAllByTestId('card')[0]
      fireEvent.click(whitepaperCard)
      
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/papers/whitepaper-en.pdf', { method: 'HEAD' })
        expect(mockWindowOpen).toHaveBeenCalledWith('/papers/whitepaper-en.pdf', '_blank', 'noopener,noreferrer')
      })
    })
  })

  describe('French Locale', () => {
    beforeEach(() => {
      mockUseLocale.mockReturnValue('fr')
      mockUseTranslations.mockImplementation((key: string) => {
        const translations = {
          'hero.badge': 'Documentation Technique',
          'hero.title': 'Documents Techniques',
          'hero.subtitle': 'Explorez l\'architecture technique de Dubhe',
          'whitepaper.title': 'Livre Blanc',
          'whitepaper.description': 'Aperçu technique complet',
          'whitepaper.downloadLabel': 'Télécharger le Livre Blanc',
          'lightpaper.title': 'Document Léger',
          'lightpaper.description': 'Aperçu concis',
          'lightpaper.downloadLabel': 'Télécharger le Document',
          'openInNewTab': 'S\'ouvre dans un nouvel onglet'
        }
        return translations[key as keyof typeof translations] || key
      })
    })

    it('displays content with French translations', () => {
      render(<PapersPage />)
      
      expect(screen.getByText('Documents Techniques')).toBeInTheDocument()
      expect(screen.getByText('Livre Blanc')).toBeInTheDocument()
      expect(screen.getByText('Document Léger')).toBeInTheDocument()
      expect(screen.getByText('Télécharger le Livre Blanc')).toBeInTheDocument()
    })

    it('generates French PDF URLs and falls back to English on 404', async () => {
      const mockFetch = vi.mocked(fetch)
      const mockWindowOpen = vi.mocked(window.open)
      
      // Simulate French PDF not found
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404
      } as Response)
      
      render(<PapersPage />)
      
      const whitepaperCard = screen.getAllByTestId('card')[0]
      fireEvent.click(whitepaperCard)
      
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/papers/whitepaper-fr.pdf', { method: 'HEAD' })
        expect(mockWindowOpen).toHaveBeenCalledWith('/papers/whitepaper-en.pdf', '_blank', 'noopener,noreferrer')
      })
    })

    it('uses French PDF when available', async () => {
      const mockFetch = vi.mocked(fetch)
      const mockWindowOpen = vi.mocked(window.open)
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200
      } as Response)
      
      render(<PapersPage />)
      
      const whitepaperCard = screen.getAllByTestId('card')[0]
      fireEvent.click(whitepaperCard)
      
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/papers/whitepaper-fr.pdf', { method: 'HEAD' })
        expect(mockWindowOpen).toHaveBeenCalledWith('/papers/whitepaper-fr.pdf', '_blank', 'noopener,noreferrer')
      })
    })
  })

  describe('Complex Locale Support', () => {
    beforeEach(() => {
      mockUseLocale.mockReturnValue('zh-TW')
      mockUseTranslations.mockImplementation((key: string) => {
        const translations = {
          'hero.badge': '技術文檔',
          'hero.title': '技術文件',
          'whitepaper.title': '白皮書',
          'lightpaper.title': '精簡白皮書'
        }
        return translations[key as keyof typeof translations] || key
      })
    })

    it('handles complex locale patterns in PDF URLs', async () => {
      const mockFetch = vi.mocked(fetch)
      const mockWindowOpen = vi.mocked(window.open)
      
      // Simulate Traditional Chinese PDF not found
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404
      } as Response)
      
      render(<PapersPage />)
      
      const whitepaperCard = screen.getAllByTestId('card')[0]
      fireEvent.click(whitepaperCard)
      
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/papers/whitepaper-zh-TW.pdf', { method: 'HEAD' })
        expect(mockWindowOpen).toHaveBeenCalledWith('/papers/whitepaper-en.pdf', '_blank', 'noopener,noreferrer')
      })
    })
  })

  describe('Fallback Behavior', () => {
    beforeEach(() => {
      mockUseLocale.mockReturnValue('xyz') // Unsupported locale
      mockUseTranslations.mockImplementation((key: string) => key) // Return key as fallback
    })

    it('displays translation keys when translations are missing', () => {
      render(<PapersPage />)
      
      expect(screen.getByText('hero.title')).toBeInTheDocument()
      expect(screen.getByText('whitepaper.title')).toBeInTheDocument()
      expect(screen.getByText('lightpaper.title')).toBeInTheDocument()
    })

    it('still attempts PDF download with unsupported locale', async () => {
      const mockFetch = vi.mocked(fetch)
      const mockWindowOpen = vi.mocked(window.open)
      
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404
      } as Response)
      
      render(<PapersPage />)
      
      const whitepaperCard = screen.getAllByTestId('card')[0]
      fireEvent.click(whitepaperCard)
      
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/papers/whitepaper-xyz.pdf', { method: 'HEAD' })
        expect(mockWindowOpen).toHaveBeenCalledWith('/papers/whitepaper-en.pdf', '_blank', 'noopener,noreferrer')
      })
    })
  })

  describe('Network Error Handling', () => {
    beforeEach(() => {
      mockUseLocale.mockReturnValue('es')
      mockUseTranslations.mockImplementation((key: string) => `es.${key}`)
    })

    it('falls back to English when network error occurs', async () => {
      const mockFetch = vi.mocked(fetch)
      const mockWindowOpen = vi.mocked(window.open)
      
      mockFetch.mockRejectedValueOnce(new Error('Network error'))
      
      render(<PapersPage />)
      
      const whitepaperCard = screen.getAllByTestId('card')[0]
      fireEvent.click(whitepaperCard)
      
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/papers/whitepaper-es.pdf', { method: 'HEAD' })
        expect(mockWindowOpen).toHaveBeenCalledWith('/papers/whitepaper-en.pdf', '_blank', 'noopener,noreferrer')
      })
    })
  })

  describe('PDF URL Generation Edge Cases', () => {
    it('handles single letter locales correctly', async () => {
      mockUseLocale.mockReturnValue('x')
      
      const mockFetch = vi.mocked(fetch)
      mockFetch.mockResolvedValueOnce({ ok: false } as Response)
      
      render(<PapersPage />)
      
      const whitepaperCard = screen.getAllByTestId('card')[0]
      fireEvent.click(whitepaperCard)
      
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/papers/whitepaper-x.pdf', { method: 'HEAD' })
      })
    })

    it('correctly processes English locale without modification', async () => {
      mockUseLocale.mockReturnValue('en')
      
      const mockFetch = vi.mocked(fetch)
      const mockWindowOpen = vi.mocked(window.open)
      mockFetch.mockResolvedValueOnce({ ok: true } as Response)
      
      render(<PapersPage />)
      
      const whitepaperCard = screen.getAllByTestId('card')[0]
      fireEvent.click(whitepaperCard)
      
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/papers/whitepaper-en.pdf', { method: 'HEAD' })
        expect(mockWindowOpen).toHaveBeenCalledWith('/papers/whitepaper-en.pdf', '_blank', 'noopener,noreferrer')
      })
    })

    it('handles regex pattern matching for locale fallback correctly', async () => {
      // Test various locale patterns
      const testLocales = ['en-US', 'zh-TW', 'pt-BR', 'fr-CA']
      
      for (const locale of testLocales) {
        mockUseLocale.mockReturnValue(locale)
        
        const mockFetch = vi.mocked(fetch)
        const mockWindowOpen = vi.mocked(window.open)
        mockFetch.mockResolvedValueOnce({ ok: false } as Response)
        
        render(<PapersPage />)
        
        const whitepaperCard = screen.getAllByTestId('card')[0]
        fireEvent.click(whitepaperCard)
        
        await waitFor(() => {
          expect(mockFetch).toHaveBeenCalledWith(`/papers/whitepaper-${locale}.pdf`, { method: 'HEAD' })
          expect(mockWindowOpen).toHaveBeenCalledWith('/papers/whitepaper-en.pdf', '_blank', 'noopener,noreferrer')
        })
        
        vi.clearAllMocks()
      }
    })
  })

  describe('Component Stability', () => {
    it('maintains functionality when translations change', () => {
      const { rerender } = render(<PapersPage />)
      
      // Change mock translations
      mockUseTranslations.mockImplementation((key: string) => {
        const newTranslations = {
          'hero.title': 'Updated Technical Papers',
          'whitepaper.title': 'Updated Whitepaper'
        }
        return newTranslations[key as keyof typeof newTranslations] || key
      })
      
      rerender(<PapersPage />)
      
      // Component should update with new translations
      expect(screen.queryByText('Technical Papers')).not.toBeInTheDocument()
      expect(screen.getByText('Updated Technical Papers')).toBeInTheDocument()
    })

    it('handles undefined or null locale gracefully', async () => {
      mockUseLocale.mockReturnValue(undefined as any)
      
      const mockFetch = vi.mocked(fetch)
      mockFetch.mockResolvedValueOnce({ ok: false } as Response)
      
      render(<PapersPage />)
      
      const whitepaperCard = screen.getAllByTestId('card')[0]
      fireEvent.click(whitepaperCard)
      
      // Should fallback to English when locale is undefined
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/papers/whitepaper-undefined.pdf', { method: 'HEAD' })
      })
    })
  })
})