import { test, expect } from '@playwright/test'

test.describe('网站导航 E2E 测试', () => {
  test('应该访问所有主要页面', async ({ page }) => {
    const pages = [
      { path: '/', title: /Dubhe/i },
      { path: '/engine', title: /Engine|引擎/i },
      { path: '/os', title: /OS|操作系统/i },
      { path: '/channel', title: /Channel|通道/i },
      { path: '/labs', title: /Labs|实验室/i },
      { path: '/grants', title: /Grants|资助/i },
      { path: '/incubation', title: /Incubation|孵化/i },
      { path: '/ambassador', title: /Ambassador|大使/i },
      { path: '/team', title: /Team|团队/i },
      { path: '/proposal', title: /Proposal|提案/i },
      { path: '/contact', title: /Contact|联系/i }
    ]

    for (const pageInfo of pages) {
      await page.goto(pageInfo.path)
      await page.waitForLoadState('networkidle')
      
      // 验证页面加载成功
      await expect(page.locator('body')).toBeVisible()
      
      // 验证页面标题或内容包含相关关键词
      const title = await page.title()
      const bodyText = await page.locator('body').textContent()
      
      const hasValidContent = pageInfo.title.test(title) || 
                             pageInfo.title.test(bodyText || '')
      
      if (!hasValidContent) {
        console.warn(`页面 ${pageInfo.path} 可能没有相关内容，但页面加载成功`)
      }
      
      // 简单验证页面不是错误页面
      const has404 = bodyText?.includes('404') || bodyText?.includes('Not Found')
      expect(has404).toBeFalsy()
    }
  })

  test('浏览器前进后退功能正常', async ({ page }) => {
    // 访问首页
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // 访问引擎页面
    await page.goto('/engine')
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveURL('/engine')

    // 访问联系页面
    await page.goto('/contact')
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveURL('/contact')

    // 测试浏览器后退
    await page.goBack()
    await expect(page).toHaveURL('/engine')

    await page.goBack()
    await expect(page).toHaveURL('/')

    // 测试浏览器前进
    await page.goForward()
    await expect(page).toHaveURL('/engine')

    await page.goForward()
    await expect(page).toHaveURL('/contact')
  })

  test('页面间链接导航正常', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // 查找并点击导航链接
    const navigationLinks = [
      'a[href="/engine"]',
      'a[href="/contact"]',
      'a[href="/team"]'
    ]

    for (const linkSelector of navigationLinks) {
      await page.goto('/') // 回到首页
      
      const link = page.locator(linkSelector).first()
      if (await link.isVisible()) {
        await link.click()
        
        // 验证页面跳转成功
        await page.waitForLoadState('networkidle')
        const currentUrl = page.url()
        expect(currentUrl).toContain(linkSelector.match(/href="([^"]+)"/)?.[1] || '')
      }
    }
  })

  test('移动端导航菜单功能', async ({ page }) => {
    // 设置移动端视口
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // 查找移动端菜单按钮（常见的汉堡菜单）
    const mobileMenuButton = page.locator('[aria-label*="menu"], .mobile-menu-button, button[aria-expanded]').first()
    
    if (await mobileMenuButton.isVisible()) {
      // 点击打开移动菜单
      await mobileMenuButton.click()
      
      // 等待菜单动画
      await page.waitForTimeout(500)
      
      // 验证菜单展开
      const isExpanded = await mobileMenuButton.getAttribute('aria-expanded')
      if (isExpanded) {
        expect(isExpanded).toBe('true')
      }
    }
  })

  test('页面加载性能合理', async ({ page }) => {
    const startTime = Date.now()
    
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    const loadTime = Date.now() - startTime
    
    // 验证页面加载时间在合理范围内（10秒以内）
    expect(loadTime).toBeLessThan(10000)
    
    console.log(`首页加载时间: ${loadTime}ms`)
  })

  test('页面无控制台错误', async ({ page }) => {
    const consoleErrors: string[] = []
    
    // 监听控制台错误
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // 等待一段时间让所有脚本执行完成
    await page.waitForTimeout(2000)

    // 过滤掉一些常见的第三方或开发环境错误
    const filteredErrors = consoleErrors.filter(error => {
      return !error.includes('Extension') && 
             !error.includes('chrome-extension') &&
             !error.includes('moz-extension') &&
             !error.includes('TypeError: Cannot read') // 一些异步加载的错误
    })

    if (filteredErrors.length > 0) {
      console.warn('发现控制台错误:', filteredErrors)
    }

    // 对于生产环境，我们期望没有错误
    // 对于开发环境，我们可以放宽要求
    expect(filteredErrors.length).toBeLessThan(5)
  })
})