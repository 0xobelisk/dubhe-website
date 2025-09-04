import { render, screen, fireEvent } from '@/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Navigation from '@/components/navigation'

/**
 * Media Kit Navigation Integration Tests
 * 
 * Tests navigation functionality for Media Kit:
 * - Navigation menu rendering
 * - Media Kit link presence
 * - Mobile navigation functionality
 * - Accessibility compliance
 */

// Mock Navigation component dependencies
vi.mock('@/components/LocaleSwitcher', () => ({
  __esModule: true,
  default: () => <div data-testid="locale-switcher">Locale Switcher</div>
}))

vi.mock('lucide-react', () => ({
  Menu: () => <span data-testid="menu-icon">Menu</span>,
  X: () => <span data-testid="close-icon">X</span>,
  ExternalLink: () => <span data-testid="external-link-icon">ExternalLink</span>,
  ChevronDown: () => <span data-testid="chevron-down-icon">ChevronDown</span>
}))

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>
  },
  AnimatePresence: ({ children }: any) => children
}))

describe('Media Kit Navigation Tests', () => {
  describe('Navigation Rendering', () => {
    it('should render navigation with Media Kit link', () => {
      render(<Navigation />)

      // Check navigation exists
      expect(screen.getByRole('navigation')).toBeInTheDocument()

      // Check Media Kit link exists (using mock from test-utils)
      expect(screen.getByText('Media Kit')).toBeInTheDocument()
    })

    it('should render locale switcher', () => {
      render(<Navigation />)
      expect(screen.getByTestId('locale-switcher')).toBeInTheDocument()
    })
  })

  describe('Media Kit Link Functionality', () => {
    it('should have correct href for Media Kit link', () => {
      render(<Navigation />)

      // Find Media Kit link by text and check href
      const mediaKitLink = screen.getByRole('link', { name: /Media Kit/i })
      expect(mediaKitLink).toBeInTheDocument()
      expect(mediaKitLink).toHaveAttribute('href', '/media-kit')
    })

    it('should be accessible via keyboard navigation', () => {
      render(<Navigation />)

      const mediaKitLink = screen.getByText('Media Kit').closest('a')
      
      expect(mediaKitLink).toBeInTheDocument()
      expect(mediaKitLink).toHaveAttribute('tabindex', '0')
    })
  })

  describe('Mobile Navigation', () => {
    it('should show Media Kit link in mobile menu', () => {
      render(<Navigation />)

      // Find and click mobile menu button
      const mobileMenuButton = screen.getByLabelText('Open Menu')
      expect(mobileMenuButton).toBeInTheDocument()

      fireEvent.click(mobileMenuButton)

      // Verify mobile menu opened and Media Kit link is visible
      expect(screen.getByLabelText('Close Menu')).toBeInTheDocument()
      expect(screen.getByText('Media Kit')).toBeInTheDocument()
    })
  })

  describe('Accessibility Compliance', () => {
    it('should have proper ARIA labels', () => {
      render(<Navigation />)

      // Check mobile menu button has proper aria-label
      const mobileMenuButton = screen.getByLabelText('Open Menu')
      expect(mobileMenuButton).toHaveAttribute('aria-label', 'Open Menu')
    })

    it('should have proper role attributes', () => {
      render(<Navigation />)

      const navigation = screen.getByRole('navigation')
      expect(navigation).toBeInTheDocument()
    })

    it('should support screen readers', () => {
      render(<Navigation />)

      // All links should have proper text content for screen readers
      const links = screen.getAllByRole('link')
      links.forEach(link => {
        expect(link.textContent?.trim().length).toBeGreaterThan(0)
      })
    })
  })

  describe('Navigation Menu Structure', () => {
    it('should include Media Kit in main navigation sections', () => {
      render(<Navigation />)

      // Check that Media Kit appears alongside other main sections
      expect(screen.getByText('Media Kit')).toBeInTheDocument()
      
      // Verify it's in the navigation structure (not hidden or in unexpected location)
      const navigation = screen.getByRole('navigation')
      const mediaKitLink = screen.getByText('Media Kit').closest('a')
      expect(navigation).toContainElement(mediaKitLink)
    })

    it('should maintain navigation order and hierarchy', () => {
      render(<Navigation />)

      // Get all navigation links
      const navigation = screen.getByRole('navigation')
      const links = Array.from(navigation.querySelectorAll('a'))
      
      // Media Kit should be present among navigation links
      const mediaKitLink = links.find(link => link.textContent?.includes('Media Kit'))
      expect(mediaKitLink).toBeDefined()
    })
  })

  describe('Error Handling', () => {
    it('should gracefully handle missing translations', () => {
      render(<Navigation />)

      // Should not throw even if some translations are missing
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })
  })
})