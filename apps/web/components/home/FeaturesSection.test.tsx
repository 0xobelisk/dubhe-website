import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import FeaturesSection from './FeaturesSection'

describe('FeaturesSection', () => {
  it('应该渲染功能特性章节', () => {
    const { container } = render(<FeaturesSection />)
    
    // 检查是否有特性相关的容器
    const featuresContainer = container.querySelector('[class*="py-24"]')
    expect(featuresContainer).toBeInTheDocument()
  })

  it('应该有正确的背景样式', () => {
    const { container } = render(<FeaturesSection />)
    
    const featuresSection = container.firstChild
    expect(featuresSection).toHaveClass('py-24')
  })

  it('应该包含最大宽度容器', () => {
    const { container } = render(<FeaturesSection />)
    
    const maxWidthContainer = container.querySelector('.max-w-7xl')
    expect(maxWidthContainer).toBeInTheDocument()
  })

  it('应该渲染成功', () => {
    const { container } = render(<FeaturesSection />)
    
    expect(container.firstChild).not.toBeNull()
  })

  it('应该有渐变背景样式', () => {
    const { container } = render(<FeaturesSection />)
    
    const featuresSection = container.firstChild
    expect(featuresSection).toHaveClass('bg-gradient-to-br')
  })
})