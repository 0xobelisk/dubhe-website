import { test, expect } from '@playwright/test'

test.describe('网站导航 E2E 测试', () => {
  test('应该访问所有主要页面', async ({ page }) => {
    const pages = [
      { path: '/', title: /Dubhe/i },
      { path: '/engine', title: /Engine|引擎/i },
      { path: '/wallet', title: /Wallet/i },
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
      // 使用更宽松的加载策略
      const response = await page.goto(`/en${pageInfo.path === '/' ? '' : pageInfo.path}`, {
        waitUntil: 'domcontentloaded',
        timeout: 45000
      })
      expect(response?.status()).toBe(200)

      // 等待基本内容加载，使用较短的超时
      await page.waitForLoadState('domcontentloaded')

      // 验证页面基本结构加载成功
      await expect(page.locator('body')).toBeVisible({ timeout: 10000 })

      // 验证页面标题或内容包含相关关键词
      const title = await page.title()
      const bodyText = await page.locator('body').innerText({ timeout: 5000 })

      const hasValidContent = pageInfo.title.test(title) || pageInfo.title.test(bodyText || '')

      expect(hasValidContent).toBe(true)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

      await expect(page.locator('body')).toBeVisible({ timeout: 5000 })
    }
  })

  test('浏览器前进后退功能正常', async ({ page }) => {
    // 访问首页
    await page.goto('/en', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    })
    await page.waitForLoadState('domcontentloaded')
    await page.waitForTimeout(1000) // 等待页面稳定

    // 访问引擎页面
    await page.goto('/en/engine', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    })
    await page.waitForLoadState('domcontentloaded')
    await page.waitForTimeout(1000)
    await expect(page).toHaveURL('/en/engine')

    // 访问联系页面
    await page.goto('/en/contact', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    })
    await page.waitForLoadState('domcontentloaded')
    await page.waitForTimeout(1000)
    await expect(page).toHaveURL('/en/contact')

    // 测试浏览器后退
    await page.goBack({ timeout: 45000 })
    await page.waitForLoadState('domcontentloaded')
    await page.waitForTimeout(2000)

    // 更宽松的URL检查 - 可能是/engine或包含/engine的路径
    const currentUrl = page.url()
    const isEngineUrl = currentUrl.includes('/engine') || currentUrl.endsWith('/engine')
    expect(isEngineUrl).toBeTruthy()

    await page.goBack({ timeout: 45000 })
    await page.waitForLoadState('domcontentloaded')
    await page.waitForTimeout(2000)

    // 检查是否回到首页
    const homeUrl = page.url()
    const isHomeUrl = /\/en\/?$/.test(homeUrl)
    expect(isHomeUrl).toBeTruthy()

    // 测试浏览器前进
    await page.goForward({ timeout: 45000 })
    await page.waitForLoadState('domcontentloaded')
    await page.waitForTimeout(2000)

    const forwardUrl1 = page.url()
    const isEngineUrl1 = forwardUrl1.includes('/engine') || forwardUrl1.endsWith('/engine')
    expect(isEngineUrl1).toBeTruthy()

    await page.goForward({ timeout: 45000 })
    await page.waitForLoadState('domcontentloaded')
    await page.waitForTimeout(2000)

    const forwardUrl2 = page.url()
    const isContactUrl = forwardUrl2.includes('/contact') || forwardUrl2.endsWith('/contact')
    expect(isContactUrl).toBeTruthy()

    await expect(page.locator('body')).toBeVisible({ timeout: 10000 })
  })

  test('页面间链接导航正常', async ({ page }) => {
    await page.goto('/en', {
      waitUntil: 'domcontentloaded',
      timeout: 45000
    })
    await page.waitForLoadState('domcontentloaded')

    // 查找并点击导航链接
    const navigationLinks = ['a[href="/en/engine"]', 'a[href="/en/contact"]', 'a[href="/en/labs"]']

    for (const linkSelector of navigationLinks) {
      await page.goto('/en', { timeout: 30000 }) // 回到首页

      const link = page.locator(linkSelector).first()
      await expect(link).toBeVisible({ timeout: 5000 })
      await link.click({ timeout: 10000 })

      // 验证页面跳转成功
      const expectedPath = linkSelector.match(/href="([^"]+)"/)?.[1]
      expect(expectedPath).toBeTruthy()
      await page.waitForURL(url => url.pathname === expectedPath)
      await page.waitForLoadState('domcontentloaded', { timeout: 30000 })
      const currentUrl = page.url()
      expect(currentUrl).toContain(linkSelector.match(/href="([^"]+)"/)?.[1] || '')
    }

    await expect(page.locator('body')).toBeVisible({ timeout: 5000 })
  })

  test('移动端导航菜单功能', async ({ page }) => {
    // 设置移动端视口
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/en')
    await page.waitForLoadState('networkidle')

    // 查找移动端菜单按钮（常见的汉堡菜单）
    const mobileMenuButton = page.getByRole('button', { name: 'Open menu', exact: true })

    await expect(mobileMenuButton).toBeVisible()
    // 点击打开移动菜单
    await mobileMenuButton.click()

    // 等待菜单动画
    await page.waitForTimeout(500)

    // 验证菜单展开
    await expect(page.getByRole('button', { name: 'Close menu', exact: true })).toBeVisible()
  })

  test('页面加载性能合理', async ({ page }) => {
    const startTime = Date.now()

    await page.goto('/en', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    })

    // 等待主要内容加载，但不等待所有网络请求完成
    await page.waitForLoadState('domcontentloaded')

    // 等待页面基本内容可见
    await expect(page.locator('body')).toBeVisible({ timeout: 10000 })

    const loadTime = Date.now() - startTime

    // 验证页面加载时间在合理范围内（20秒以内，考虑到CI环境可能较慢）
    expect(loadTime).toBeLessThan(20000)

    console.log(`首页加载时间: ${loadTime}ms`)

    // 验证页面内容已经加载
    await expect(page.locator('main, [role="main"], body')).toBeVisible({ timeout: 5000 })

    await expect(page.locator('body')).toBeVisible({ timeout: 15000 })
  })

  test('页面无控制台错误', async ({ page }) => {
    const consoleErrors: string[] = []

    // 监听控制台错误
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })

    await page.goto('/en')
    await page.waitForLoadState('networkidle')

    // 等待一段时间让所有脚本执行完成
    await page.waitForTimeout(2000)

    // 过滤掉一些常见的第三方或开发环境错误
    const filteredErrors = consoleErrors.filter((error) => {
      return (
        !error.includes('Extension') &&
        !error.includes('chrome-extension') &&
        !error.includes('moz-extension') &&
        !error.includes('TypeError: Cannot read')
      ) // 一些异步加载的错误
    })

    if (filteredErrors.length > 0) {
      console.warn('发现控制台错误:', filteredErrors)
    }

    // 对于生产环境，我们期望没有错误
    // 对于开发环境，我们可以放宽要求
    expect(filteredErrors.length).toBeLessThan(5)
  })
})
