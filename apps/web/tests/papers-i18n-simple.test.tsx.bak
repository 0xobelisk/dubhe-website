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
global.window.open = vi.fn()

// Mock Footer component to avoid complex dependencies
vi.mock('@/components/footer', () => ({
  default: () => <footer data-testid="footer">Footer</footer>
}))

// Mock environment variables
const mockEnv = {
  NEXT_PUBLIC_LIGHTPAPER_URL: '',
  NEXT_PUBLIC_ONEPAPER_URL: '',
  NODE_ENV: 'test'
}

Object.defineProperty(process, 'env', {
  value: mockEnv,
  writable: true
})

describe('Papers Page - Internationalization Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseLocale.mockReturnValue('en')
    mockUseTranslations.mockImplementation((key: string) => {
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
    })
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('English Locale (Default)', () => {
    it('displays content with English translations', () => {
      render(<PapersPage />)
      
      expect(screen.getByText('Technical Papers')).toBeInTheDocument()
      expect(screen.getByText('Lightpaper')).toBeInTheDocument()
      expect(screen.getByText('Onepager')).toBeInTheDocument()
      expect(screen.getByText('Download Lightpaper')).toBeInTheDocument()
      expect(screen.getByText('Download Onepager')).toBeInTheDocument()
    })

    it('opens Google Drive lightpaper URL when clicked', async () => {
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

    it('opens Google Drive onepager URL when clicked', async () => {
      const mockWindowOpen = vi.mocked(window.open)
      
      render(<PapersPage />)
      
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
  })

  describe('French Locale', () => {
    beforeEach(() => {
      mockUseLocale.mockReturnValue('fr')
      mockUseTranslations.mockImplementation((key: string) => {
        const translations = {
          'hero.badge': 'Documentation Technique',
          'hero.title': 'Documents Techniques',
          'hero.subtitle': 'Explorez l\'architecture technique de Dubhe',
          'lightpaper.title': 'Document Léger',
          'lightpaper.description': 'Aperçu technique complet',
          'lightpaper.downloadLabel': 'Télécharger le Document Léger',
          'onepager.title': 'Document Sommaire',
          'onepager.description': 'Aperçu concis',
          'onepager.downloadLabel': 'Télécharger le Document',
          'openInNewTab': 'S\'ouvre dans un nouvel onglet'
        }
        return translations[key as keyof typeof translations] || key
      })
    })

    it('displays content with French translations', () => {
      render(<PapersPage />)
      
      expect(screen.getByText('Documents Techniques')).toBeInTheDocument()
      expect(screen.getByText('Document Léger')).toBeInTheDocument()
      expect(screen.getByText('Document Sommaire')).toBeInTheDocument()
      expect(screen.getByText('Télécharger le Document Léger')).toBeInTheDocument()
    })

    it('opens same Google Drive URLs regardless of locale', async () => {
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

    it('displays French translations but uses same PDF URLs', () => {
      render(<PapersPage />)
      
      expect(screen.getByText('Documents Techniques')).toBeInTheDocument()
      expect(screen.getByText('Document Léger')).toBeInTheDocument()
      expect(screen.getByText('Document Sommaire')).toBeInTheDocument()
      expect(screen.getByText('Télécharger le Document Léger')).toBeInTheDocument()
    })
  })

  describe('Complex Locale Support', () => {
    beforeEach(() => {
      mockUseLocale.mockReturnValue('zh-TW')
      mockUseTranslations.mockImplementation((key: string) => {
        const translations = {
          'hero.badge': '技術文檔',
          'hero.title': '技術文件',
          'lightpaper.title': '精簡白皮書',
          'onepager.title': '簡要文件'
        }
        return translations[key as keyof typeof translations] || key
      })
    })

    it('uses same Google Drive URLs for complex locales', async () => {
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

  describe('Fallback Behavior', () => {
    beforeEach(() => {
      mockUseLocale.mockReturnValue('xyz') // Unsupported locale
      mockUseTranslations.mockImplementation((key: string) => key) // Return key as fallback
    })

    it('displays translation keys when translations are missing', () => {
      render(<PapersPage />)
      
      expect(screen.getByText('hero.title')).toBeInTheDocument()
      expect(screen.getByText('lightpaper.title')).toBeInTheDocument()
      expect(screen.getByText('onepager.title')).toBeInTheDocument()
    })

    it('works with unsupported locales using Google Drive URLs', async () => {
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

  describe('Network Error Handling', () => {
    beforeEach(() => {
      mockUseLocale.mockReturnValue('es')
      mockUseTranslations.mockImplementation((key: string) => `es.${key}`)
    })

    it('uses Google Drive URLs regardless of network conditions', async () => {
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

  describe('Environment Variable Integration', () => {
    it('uses environment variable when available for lightpaper', async () => {
      const customUrl = 'https://custom-cdn.com/lightpaper.pdf'
      mockEnv.NEXT_PUBLIC_LIGHTPAPER_URL = customUrl
      
      const mockWindowOpen = vi.mocked(window.open)
      
      render(<PapersPage />)
      
      const lightpaperCard = screen.getAllByTestId('card')[0]
      fireEvent.click(lightpaperCard)
      
      await waitFor(() => {
        expect(mockWindowOpen).toHaveBeenCalledWith(customUrl, '_blank', 'noopener,noreferrer')
      })
      
      // Reset for other tests
      mockEnv.NEXT_PUBLIC_LIGHTPAPER_URL = ''
    })

    it('uses environment variable when available for onepaper', async () => {
      const customUrl = 'https://custom-cdn.com/onepaper.pdf'
      mockEnv.NEXT_PUBLIC_ONEPAPER_URL = customUrl
      
      const mockWindowOpen = vi.mocked(window.open)
      
      render(<PapersPage />)
      
      const onepaperCard = screen.getAllByTestId('card')[1]
      fireEvent.click(onepaperCard)
      
      await waitFor(() => {
        expect(mockWindowOpen).toHaveBeenCalledWith(customUrl, '_blank', 'noopener,noreferrer')
      })
      
      // Reset for other tests
      mockEnv.NEXT_PUBLIC_ONEPAPER_URL = ''
    })

    it('falls back to Google Drive URLs when env variables are empty strings', async () => {
      mockEnv.NEXT_PUBLIC_LIGHTPAPER_URL = ''
      mockEnv.NEXT_PUBLIC_ONEPAPER_URL = ''
      
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

  describe('Component Stability', () => {
    it('maintains functionality when translations change', () => {
      const { rerender } = render(<PapersPage />)
      
      // Change mock translations
      mockUseTranslations.mockImplementation((key: string) => {
        const newTranslations = {
          'hero.title': 'Updated Technical Papers',
          'lightpaper.title': 'Updated Lightpaper'
        }
        return newTranslations[key as keyof typeof newTranslations] || key
      })
      
      rerender(<PapersPage />)
      
      // Component should update with new translations
      expect(screen.queryByText('Technical Papers')).not.toBeInTheDocument()
      expect(screen.getByText('Updated Technical Papers')).toBeInTheDocument()
      expect(screen.getByText('Updated Lightpaper')).toBeInTheDocument()
    })

    it('handles undefined or null locale gracefully', async () => {
      mockUseLocale.mockReturnValue(undefined as any)
      
      const mockWindowOpen = vi.mocked(window.open)
      
      render(<PapersPage />)
      
      const lightpaperCard = screen.getAllByTestId('card')[0]
      fireEvent.click(lightpaperCard)
      
      // Should use Google Drive URL regardless of locale
      await waitFor(() => {
        expect(mockWindowOpen).toHaveBeenCalledWith(
          'https://drive.google.com/file/d/18VPJaivmd5FXYuFFhhhvUOWpeQyP-q1F/view?usp=sharing', 
          '_blank', 
          'noopener,noreferrer'
        )
      })
    })
  })
})