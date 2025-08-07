# 自动化测试策略 (Automated Testing Strategy)

本文档定义了 Dubhe Website 项目的全面测试策略，确保代码质量、用户体验和性能表现。

## 📋 测试概览

### 测试金字塔

```
         🔺 E2E Tests (少量)
        ────────────────────
       🔺🔺 Integration Tests (适量)  
      ────────────────────────────
     🔺🔺🔺 Unit Tests (大量)
    ──────────────────────────────
```

### 测试覆盖目标

- **单元测试**: 90%+ 代码覆盖率
- **集成测试**: 所有 API 端点和关键用户流程
- **E2E 测试**: 核心业务流程
- **性能测试**: 每个页面 < 3秒加载时间
- **可访问性**: WCAG 2.1 AA 标准

## 🔧 技术栈选择

### 推荐工具栈

```json
{
  "单元测试": "Vitest + @testing-library/react",
  "集成测试": "Vitest + MSW (Mock Service Worker)",
  "E2E测试": "Playwright",
  "性能测试": "Lighthouse CI + WebPageTest",
  "视觉测试": "Playwright + Visual Comparisons",
  "可访问性": "@axe-core/playwright"
}
```

### 替代方案
- **Jest** (单元测试) - 如果团队更熟悉
- **Cypress** (E2E测试) - 更直观的调试界面
- **Puppeteer** (性能测试) - 更轻量的解决方案

## 🧪 测试类型详解

### 1. 单元测试 (Unit Tests)

**目标**: 测试独立组件和工具函数

**测试对象**:
- React 组件渲染
- 组件状态变化
- 事件处理函数
- 工具函数逻辑
- 自定义 Hooks

**示例测试用例**:

```typescript
// components/home/HeroSection.test.tsx
import { render, screen } from '@testing-library/react'
import { HeroSection } from './HeroSection'

describe('HeroSection', () => {
  it('应该渲染主标题和副标题', () => {
    render(<HeroSection />)
    
    expect(screen.getByText(/Dubhe/i)).toBeInTheDocument()
    expect(screen.getByText(/区块链基础设施/i)).toBeInTheDocument()
  })

  it('应该包含行动号召按钮', () => {
    render(<HeroSection />)
    
    const ctaButton = screen.getByRole('button', { name: /开始使用/i })
    expect(ctaButton).toBeInTheDocument()
    expect(ctaButton).toHaveAttribute('href', '/engine')
  })
})
```

**覆盖范围**:
- ✅ HeroSection - 主页头部组件
- ✅ FeaturesSection - 功能展示组件  
- ✅ NetworkArchitectureSection - 架构展示
- ✅ ContactForm - 联系表单
- ✅ Navigation - 导航组件
- ✅ Footer - 页脚组件

### 2. 集成测试 (Integration Tests)

**目标**: 测试组件间交互和 API 集成

**测试对象**:
- API 路由响应
- 表单提交流程
- 数据获取和状态管理
- 组件组合行为

**示例测试用例**:

```typescript
// app/api/contact/route.test.ts
import { POST } from './route'
import { NextRequest } from 'next/server'

describe('/api/contact', () => {
  it('应该成功发送联系邮件', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: '张三',
        email: 'test@example.com',
        subject: '测试主题',
        message: '测试消息内容'
      })
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.message).toBe('Email sent successfully')
  })

  it('应该拒绝无效的邮件格式', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: '张三',
        email: 'invalid-email',
        subject: '测试',
        message: '消息'
      })
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Invalid input data')
  })
})
```

**覆盖范围**:
- ✅ 联系表单完整流程
- ✅ 邮件发送功能
- ✅ 错误处理机制
- ✅ 表单验证逻辑

### 3. 端到端测试 (E2E Tests)

**目标**: 测试完整用户旅程

**关键用户流程**:
1. **首页浏览流程**: 访问 → 滚动 → 查看内容
2. **联系表单流程**: 填写 → 提交 → 确认
3. **页面导航流程**: 点击链接 → 页面跳转
4. **响应式体验**: 移动端 → 桌面端切换

**示例测试用例**:

```typescript
// e2e/contact-form.spec.ts
import { test, expect } from '@playwright/test'

test('联系表单完整流程', async ({ page }) => {
  // 访问首页
  await page.goto('/')
  
  // 点击联系按钮
  await page.click('a[href="/contact"]')
  await expect(page).toHaveURL('/contact')
  
  // 填写表单
  await page.fill('[name="name"]', '张三')
  await page.fill('[name="email"]', 'test@example.com')
  await page.fill('[name="subject"]', '技术咨询')
  await page.fill('[name="message"]', '我想了解更多关于Dubhe的技术细节')
  
  // 提交表单
  await page.click('button[type="submit"]')
  
  // 验证成功提示
  await expect(page.locator('.success-message')).toBeVisible()
  await expect(page.locator('.success-message')).toContainText('发送成功')
})

test('首页核心内容展示', async ({ page }) => {
  await page.goto('/')
  
  // 验证关键元素存在
  await expect(page.locator('h1')).toContainText('Dubhe')
  await expect(page.locator('[data-testid="hero-cta"]')).toBeVisible()
  await expect(page.locator('[data-testid="features-section"]')).toBeVisible()
  await expect(page.locator('[data-testid="architecture-section"]')).toBeVisible()
})
```

### 4. 性能测试 (Performance Tests)

**目标**: 确保优秀的用户体验

**测试指标**:
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s  
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 3.0s

**测试配置**:

```javascript
// lighthouse.config.js
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/engine',
        'http://localhost:3000/contact'
      ],
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        'categories:performance': ['error', {minScore: 90}],
        'categories:accessibility': ['error', {minScore: 95}],
        'categories:best-practices': ['error', {minScore: 90}],
        'categories:seo': ['error', {minScore: 90}]
      }
    }
  }
}
```

**监控页面**:
- ✅ 首页 (/)
- ✅ 引擎页 (/engine) 
- ✅ 操作系统页 (/os)
- ✅ 联系页面 (/contact)
- ✅ 团队页面 (/team)

### 5. 视觉回归测试 (Visual Tests)

**目标**: 确保 UI 一致性

```typescript
// visual/homepage.spec.ts
import { test, expect } from '@playwright/test'

test('首页视觉回归测试', async ({ page }) => {
  await page.goto('/')
  
  // 等待页面完全加载
  await page.waitForLoadState('networkidle')
  
  // 截图对比
  await expect(page).toHaveScreenshot('homepage-desktop.png', {
    fullPage: true
  })
})

test('移动端视觉回归测试', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 })
  await page.goto('/')
  
  await expect(page).toHaveScreenshot('homepage-mobile.png', {
    fullPage: true
  })
})
```

### 6. 可访问性测试 (A11y Tests)

**目标**: 确保无障碍访问

```typescript
// a11y/accessibility.spec.ts
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('首页可访问性检查', async ({ page }) => {
  await page.goto('/')
  
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
  
  expect(accessibilityScanResults.violations).toEqual([])
})
```

## 📊 测试实施计划

### 阶段 1: 基础设施搭建 (第1-2周)

```bash
# 安装测试依赖
pnpm add -D vitest @testing-library/react @testing-library/jest-dom
pnpm add -D @playwright/test lighthouse-ci
pnpm add -D @axe-core/playwright msw
```

**配置文件**:
- `vitest.config.ts` - Vitest 配置
- `playwright.config.ts` - Playwright 配置  
- `lighthouse.config.js` - 性能测试配置

### 阶段 2: 单元测试 (第2-4周)

**优先级排序**:
1. **High**: 关键组件 (HeroSection, ContactForm)
2. **Medium**: 通用组件 (Navigation, Footer)
3. **Low**: 展示组件 (FeaturesSection, CompaniesSection)

### 阶段 3: 集成测试 (第4-5周)

**重点测试**:
- Contact API 完整流程
- 表单验证和错误处理
- 邮件发送功能

### 阶段 4: E2E 测试 (第5-6周)

**核心流程**:
- 用户浏览体验
- 联系表单提交
- 页面导航功能

### 阶段 5: 性能和可访问性 (第6-7周)

**监控设置**:
- Lighthouse CI 集成
- 性能预算设置
- 可访问性标准验证

## 🚀 CI/CD 集成

### GitHub Actions 工作流

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: pnpm install
        
      - name: Run unit tests
        run: pnpm test:unit
        
      - name: Run integration tests  
        run: pnpm test:integration
        
      - name: Install Playwright
        run: npx playwright install
        
      - name: Run E2E tests
        run: pnpm test:e2e
        
      - name: Run Lighthouse CI
        run: pnpm test:performance
        
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

### 测试命令

```json
{
  "scripts": {
    "test": "vitest",
    "test:unit": "vitest run --coverage",
    "test:integration": "vitest run --config vitest.integration.config.ts",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:performance": "lhci autorun",
    "test:a11y": "playwright test --grep @a11y",
    "test:visual": "playwright test --grep @visual",
    "test:all": "pnpm test:unit && pnpm test:integration && pnpm test:e2e"
  }
}
```

## 📈 测试报告和监控

### 报告工具
- **Coverage Report**: Vitest 内置覆盖率报告
- **E2E Report**: Playwright HTML 报告
- **Performance**: Lighthouse CI 报告
- **Visual Diff**: Playwright 视觉对比报告

### 持续监控
```bash
# 每次部署后运行性能检查
pnpm test:performance --upload

# 定期运行完整测试套件
pnpm test:all
```

## ✅ 成功指标

### 代码质量
- [ ] 单元测试覆盖率 > 90%
- [ ] 集成测试覆盖所有 API 端点
- [ ] E2E 测试覆盖核心用户流程

### 性能指标
- [ ] 所有页面 Lighthouse 得分 > 90
- [ ] LCP < 2.5s，FCP < 1.5s
- [ ] CLS < 0.1

### 用户体验
- [ ] 可访问性得分 > 95
- [ ] 所有设备响应正常
- [ ] 视觉一致性 100%

## 🔧 故障排除

### 常见问题

**测试运行缓慢**
```bash
# 并行运行测试
vitest --reporter=verbose --threads=4
playwright test --workers=4
```

**视觉测试失败**
```bash
# 更新基准图片
playwright test --update-snapshots
```

**性能测试不稳定**
```bash
# 增加测试运行次数
lhci autorun --numberOfRuns=5
```

---

这个测试策略确保了 Dubhe Website 在功能、性能、可访问性和用户体验等各个方面都达到企业级标准。通过分阶段实施，可以逐步建立完善的测试体系。