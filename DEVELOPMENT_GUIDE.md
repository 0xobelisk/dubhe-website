# Dubhe Website 开发指南

## 项目概览

这是一个基于Next.js 15和React 19的现代化Web应用，采用Monorepo架构，支持多语言国际化。

## 技术栈

- **框架**: Next.js 15 (App Router)
- **UI库**: React 19 + TailwindCSS
- **构建工具**: Turbo + pnpm
- **国际化**: next-intl
- **测试**: Vitest + Playwright + Testing Library
- **代码质量**: ESLint + Prettier + TypeScript
- **监控**: Sentry
- **部署**: Vercel-ready

## 项目结构

```
dubhe-website/
├── apps/web/                 # 主应用
│   ├── app/                 # App Router页面
│   ├── components/          # React组件
│   ├── hooks/              # 自定义Hooks
│   ├── lib/                # 工具函数
│   ├── messages/           # 国际化翻译
│   └── public/             # 静态资源
├── packages/               # 共享包
│   └── ui/                # UI组件库
├── e2e/                   # E2E测试
└── docs/                  # 项目文档
```

## 开发环境设置

### 前置要求
- Node.js ≥ 20
- pnpm ≥ 10.4.1

### 安装依赖
```bash
pnpm install
```

### 开发服务器
```bash
pnpm dev          # 启动开发服务器
pnpm dev:turbo    # 使用Turbopack
```

### 环境变量
```bash
cp apps/web/.env.example apps/web/.env.local
# 配置必要的环境变量
```

## 开发工作流

### 1. 代码规范
- 使用TypeScript严格模式
- 遵循ESLint规则
- 使用Prettier格式化
- 提交前运行检查

```bash
pnpm lint          # 代码检查
pnpm lint:fix      # 自动修复
pnpm typecheck     # 类型检查
pnpm format        # 格式化代码
```

### 2. 测试策略
```bash
# 单元测试
pnpm test          # 交互模式
pnpm test:unit     # 单次运行 + 覆盖率

# E2E测试  
pnpm test:e2e      # 无头模式
pnpm test:e2e:ui   # 可视化模式

# 性能测试
pnpm test:performance
```

### 3. 国际化开发
```bash
# 验证翻译文件
pnpm i18n:validate

# 检查翻译完整性
pnpm i18n:check
```

## 组件开发指南

### 1. 组件结构
```tsx
// components/MyComponent.tsx
import { useTranslations } from 'next-intl'

interface Props {
  // TypeScript接口定义
}

export function MyComponent({ }: Props) {
  const t = useTranslations('component')
  
  return (
    <div>
      <h1>{t('title')}</h1>
    </div>
  )
}
```

### 2. 测试组件
```tsx
// components/MyComponent.test.tsx
import { render, screen } from '@/test-utils'
import { MyComponent } from './MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

### 3. 样式指南
- 使用TailwindCSS utility classes
- 组件级CSS模块用于复杂样式
- 响应式设计优先
- 深色模式支持

## API开发

### 1. 路由结构
```typescript
// app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    // 业务逻辑
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
```

### 2. 数据验证
```typescript
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email()
})

// 在路由中使用
const validation = schema.safeParse(data)
if (!validation.success) {
  return NextResponse.json({ 
    error: 'Validation failed', 
    details: validation.error.errors 
  }, { status: 400 })
}
```

## 性能优化

### 1. 代码分割
- 使用动态导入
- 路由级代码分割
- 组件懒加载

### 2. 图片优化
- 使用Next.js Image组件
- 适当的尺寸和格式
- 懒加载策略

### 3. 缓存策略
- ISR (增量静态再生成)
- API响应缓存
- CDN缓存配置

## 部署指南

### 1. 构建检查
```bash
pnpm build         # 构建应用
pnpm start         # 生产模式预览
pnpm test:all      # 全面测试
```

### 2. 环境配置
- 生产环境变量
- Sentry配置
- 性能监控设置

### 3. CI/CD流程
- GitHub Actions工作流
- 自动测试运行
- 部署前检查

## 调试指南

### 1. 开发工具
- React DevTools
- Next.js DevTools
- 浏览器开发者工具

### 2. 日志记录
```typescript
// 使用结构化日志
console.log('Debug info:', { 
  component: 'MyComponent',
  data: someData 
})
```

### 3. 错误处理
- 使用ErrorBoundary
- Sentry错误追踪
- 用户友好的错误页面

## 最佳实践

### 1. 代码组织
- 单一职责原则
- 可复用组件设计
- 清晰的文件夹结构

### 2. 性能考虑
- 避免不必要的重新渲染
- 使用React.memo和useMemo
- 优化包大小

### 3. 可访问性
- 语义化HTML
- ARIA标签
- 键盘导航支持

### 4. SEO优化
- 元数据管理
- 结构化数据
- 页面速度优化

## 常见问题

### Q: 如何添加新的翻译语言？
A: 在`messages/`目录添加新的JSON文件，并更新i18n配置。

### Q: 如何自定义主题？
A: 修改`tailwind.config.js`中的主题配置。

### Q: 测试失败怎么办？
A: 检查测试日志，确保模拟配置正确，参考TESTING_IMPROVEMENTS.md。

## 贡献指南

1. Fork项目
2. 创建功能分支
3. 提交代码并写测试
4. 确保所有检查通过
5. 提交Pull Request

## 资源链接

- [Next.js文档](https://nextjs.org/docs)
- [React文档](https://react.dev/)
- [TailwindCSS文档](https://tailwindcss.com/docs)
- [项目仓库](https://github.com/0xobelisk/dubhe)