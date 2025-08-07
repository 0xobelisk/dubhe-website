import { test, expect } from '@playwright/test'

test.describe('联系表单 E2E 测试', () => {
  test.beforeEach(async ({ page }) => {
    // 访问联系页面
    await page.goto('/contact')
    
    // 等待页面完全加载，包含表单
    await expect(page.locator('form')).toBeVisible({ timeout: 15000 })
  })

  test('应该正确显示联系表单', async ({ page }) => {
    // 验证表单元素存在
    await expect(page.locator('form')).toBeVisible()
    await expect(page.locator('input[name="name"]')).toBeVisible()
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('select[name="subject"]')).toBeVisible()
    await expect(page.locator('textarea[name="message"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })

  test('应该验证必需字段', async ({ page }) => {
    // 点击提交按钮而不填写任何内容
    await page.locator('button[type="submit"]').click()

    // 验证浏览器原生验证或自定义验证消息
    const nameInput = page.locator('input[name="name"]')
    const emailInput = page.locator('input[name="email"]')
    
    // 检查 HTML5 验证
    expect(await nameInput.getAttribute('required')).not.toBeNull()
    expect(await emailInput.getAttribute('required')).not.toBeNull()
  })

  test('应该验证邮件格式', async ({ page }) => {
    // 填写无效邮件地址
    await page.locator('input[name="name"]').fill('测试用户')
    await page.locator('input[name="email"]').fill('invalid-email')
    await page.locator('select[name="subject"]').selectOption('general')
    await page.locator('textarea[name="message"]').fill('测试消息')

    // 提交表单
    await page.locator('button[type="submit"]').click()

    // 验证邮件格式验证
    const emailInput = page.locator('input[name="email"]')
    expect(await emailInput.getAttribute('type')).toBe('email')
  })

  test('应该成功提交有效表单', async ({ page }) => {
    // Mock API 响应
    await page.route('/api/contact', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: 'Email sent successfully'
        })
      })
    })

    // 填写有效表单数据
    await page.locator('input[name="name"]').fill('张三')
    await page.locator('input[name="email"]').fill('zhangsan@example.com')
    await page.locator('select[name="subject"]').selectOption('technical')
    await page.locator('textarea[name="message"]').fill('我想了解更多关于 Dubhe 的技术细节。')

    // 提交表单
    await page.locator('button[type="submit"]').click()

    // 验证成功消息（如果有的话）
    // 这里可以根据实际的成功提示元素进行调整
    await page.waitForTimeout(2000) // 等待提交完成
  })

  test('应该处理表单提交错误', async ({ page }) => {
    // Mock API 错误响应
    await page.route('/api/contact', async route => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'Invalid input data',
          details: [{ message: 'Email is invalid' }]
        })
      })
    })

    // 填写表单数据
    await page.locator('input[name="name"]').fill('测试用户')
    await page.locator('input[name="email"]').fill('test@example.com')
    await page.locator('select[name="subject"]').selectOption('general')
    await page.locator('textarea[name="message"]').fill('测试消息')

    // 提交表单
    await page.locator('button[type="submit"]').click()

    // 等待错误处理
    await page.waitForTimeout(2000)
  })

  test('表单字段应该接受有效输入', async ({ page }) => {
    const nameInput = page.locator('input[name="name"]')
    const emailInput = page.locator('input[name="email"]')
    const subjectSelect = page.locator('select[name="subject"]')
    const messageTextarea = page.locator('textarea[name="message"]')

    // 测试有效输入
    await nameInput.fill('John Doe')
    await emailInput.fill('john@example.com')
    await subjectSelect.selectOption('partnership')
    await messageTextarea.fill('I would like to discuss partnership opportunities.')

    // 验证输入值
    expect(await nameInput.inputValue()).toBe('John Doe')
    expect(await emailInput.inputValue()).toBe('john@example.com')
    expect(await subjectSelect.inputValue()).toBe('partnership')
    expect(await messageTextarea.inputValue()).toBe('I would like to discuss partnership opportunities.')
  })
})