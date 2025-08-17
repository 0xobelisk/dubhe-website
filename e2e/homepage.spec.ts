import { test, expect } from '@playwright/test'

test.describe('首页 E2E 测试', () => {
  test('应该正确加载首页', async ({ page }) => {
    // 访问首页
    await page.goto('/')

    // 等待加载屏幕完成（4秒）
    await page.waitForTimeout(5000)

    // 验证页面标题
    await expect(page).toHaveTitle(/Dubhe/i)

    // 验证页面加载完成
    await expect(page.locator('body')).toBeVisible()
  })

  test('应该展示主要内容区块', async ({ page }) => {
    await page.goto('/')

    // 等待loading完成 - 通过等待白色背景的主页面出现
    await expect(page.locator('.min-h-screen.bg-white')).toBeVisible({ timeout: 10000 })
    
    // 验证页面主要内容存在
    await expect(page.locator('.min-h-screen.bg-white')).toBeVisible() // HomePage 容器
  })

  test('导航栏链接功能正常', async ({ page }) => {
    await page.goto('/')

    // 等待加载屏幕完成
    await page.waitForTimeout(5000)

    // 测试引擎页面链接
    const engineLink = page.locator('a[href="/engine"]').first()
    if (await engineLink.isVisible()) {
      await engineLink.click()
      await page.waitForURL('/engine')
      await expect(page).toHaveURL('/engine')
      
      // 返回首页继续测试
      await page.goto('/')
      await page.waitForTimeout(5000)
    }

    // 测试联系页面链接
    const contactLink = page.locator('a[href="/contact"]').first()
    if (await contactLink.isVisible()) {
      await contactLink.click()
      await page.waitForURL('/contact')
      await expect(page).toHaveURL('/contact')
    }
  })

  test('响应式设计在移动端正常工作', async ({ page }) => {
    // 设置移动端视口
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // 等待加载屏幕完成
    await page.waitForTimeout(5000)

    // 验证页面在移动端正常显示
    await expect(page.locator('body')).toBeVisible()

    // 验证导航在移动端可见 - 使用更灵活的选择器
    await expect(page.locator('header, nav, [data-testid="nav"], [data-testid="header"]')).toBeVisible()
  })

  test('页面滚动和交互正常', async ({ page }) => {
    await page.goto('/')
    
    // 等待加载屏幕完成
    await page.waitForTimeout(5000)

    // 滚动到页面底部
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight)
    })

    // 等待一下让动画完成
    await page.waitForTimeout(1000)

    // 滚动回顶部
    await page.evaluate(() => {
      window.scrollTo(0, 0)
    })

    // 验证页面仍然正常 - 使用更灵活的选择器
    await expect(page.locator('header, nav, [data-testid="nav"], [data-testid="header"]')).toBeVisible()
  })
})