import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import HeroSection from './HeroSection'

// Mock child components
vi.mock('../navigation', () => ({
  default: () => <nav data-testid="navigation">Navigation</nav>
}))

vi.mock('./HeroBackground', () => ({
  default: () => <div data-testid="hero-background">Background</div>
}))

vi.mock('./HeroContent', () => ({
  default: () => <div data-testid="hero-content">Content</div>
}))

vi.mock('./Constellation', () => ({
  default: () => <div data-testid="constellation">Constellation</div>
}))

describe('HeroSection', () => {
  it('应该渲染导航组件', () => {
    render(<HeroSection />)
    
    const navigation = screen.getByTestId('navigation')
    expect(navigation).toBeInTheDocument()
  })

  it('应该渲染背景组件', () => {
    render(<HeroSection />)
    
    const background = screen.getByTestId('hero-background')
    expect(background).toBeInTheDocument()
  })

  it('应该渲染内容组件', () => {
    render(<HeroSection />)
    
    const content = screen.getByTestId('hero-content')
    expect(content).toBeInTheDocument()
  })

  it('应该渲染星座组件', () => {
    render(<HeroSection />)
    
    const constellation = screen.getByTestId('constellation')
    expect(constellation).toBeInTheDocument()
  })

  it('应该有正确的背景样式类', () => {
    render(<HeroSection />)
    
    const heroSection = screen.getByTestId('hero-background').parentElement
    expect(heroSection).toHaveClass('relative', 'min-h-screen', 'bg-gradient-to-br')
  })
})