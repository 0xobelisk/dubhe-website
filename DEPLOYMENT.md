# 部署指南 (Deployment Guide)

本文档提供 Dubhe Website 在 Vercel 平台的详细部署指南和生产环境配置。

## 🚀 Vercel 部署

### 先决条件

- Vercel 账户 ([vercel.com](https://vercel.com))
- GitHub 仓库访问权限
- Resend 账户 (邮件功能，可选)

### 方法一：通过 Vercel Dashboard 部署

1. **连接 GitHub 仓库**
   - 访问 [Vercel Dashboard](https://vercel.com/dashboard)
   - 点击 "New Project"
   - 选择您的 GitHub 仓库
   - 导入 `dubhe-website` 项目

2. **配置项目设置**
   ```
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: pnpm build
   Output Directory: .next
   Install Command: pnpm install
   Development Command: pnpm dev
   ```

3. **环境变量配置**
   在 Vercel Dashboard 的 Settings → Environment Variables 中添加：
   
   ```bash
   # 生产环境 (Production)
   NODE_ENV=production
   NEXT_CONFIG_ENV=production
   
   # 邮件服务 (可选)
   RESEND_API_KEY=re_xxxxxxxxx
   RESEND_FROM_EMAIL=contact@noreply.obelisk.build  
   RESEND_TO_EMAIL=team@dubhe.network
   ```

4. **部署**
   - 点击 "Deploy"
   - 等待构建完成 (~2-5 分钟)
   - 获取部署 URL

### 方法二：通过 Vercel CLI 部署

1. **安装 Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **配置项目**
   ```bash
   # 在项目根目录执行
   vercel
   
   # 按提示配置：
   # ? Set up and deploy? [Y/n] y
   # ? Which scope? Your Personal Account
   # ? Link to existing project? [y/N] n  
   # ? What's your project's name? dubhe-website
   # ? In which directory is your code located? ./
   ```

4. **设置环境变量**
   ```bash
   # 生产环境变量
   vercel env add NODE_ENV production
   vercel env add NEXT_CONFIG_ENV production
   
   # 邮件服务变量 (可选)
   vercel env add RESEND_API_KEY
   vercel env add RESEND_FROM_EMAIL  
   vercel env add RESEND_TO_EMAIL
   ```

5. **生产部署**
   ```bash
   # 部署到生产环境
   vercel --prod
   ```

### 方法三：自动部署 (推荐)

1. **连接 GitHub**
   - 在 Vercel Dashboard 导入项目
   - 启用 Git 集成

2. **自动部署配置**
   ```json
   // vercel.json (可选配置文件)
   {
     "buildCommand": "pnpm build",
     "devCommand": "pnpm dev",
     "installCommand": "pnpm install",
     "framework": "nextjs",
     "regions": ["hkg1", "sfo1"],
     "functions": {
       "app/api/contact/route.ts": {
         "maxDuration": 30
       }
     },
     "headers": [
       {
         "source": "/(.*)",
         "headers": [
           {
             "key": "X-Frame-Options",
             "value": "DENY"
           },
           {
             "key": "X-Content-Type-Options", 
             "value": "nosniff"
           },
           {
             "key": "Referrer-Policy",
             "value": "strict-origin-when-cross-origin"
           }
         ]
       }
     ]
   }
   ```

3. **分支部署策略**
   - `main` 分支 → 生产环境自动部署
   - `dev` 分支 → 预览环境自动部署
   - Pull Request → 自动生成预览链接

## 📧 API 文档

### Contact API Endpoint

**接口地址**: `POST /api/contact`

#### 请求参数

```typescript
interface ContactRequest {
  name: string;      // 姓名 (1-100字符)
  email: string;     // 邮箱地址 (有效格式)
  subject: string;   // 主题 (1-200字符)
  message: string;   // 消息内容 (1-2000字符)
}
```

#### 请求示例

```bash
curl -X POST https://your-domain.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "张三",
    "email": "zhangsan@example.com", 
    "subject": "关于合作咨询",
    "message": "我想了解更多关于 Dubhe 平台的技术细节..."
  }'
```

#### 响应格式

**成功响应 (200)**:
```json
{
  "success": true,
  "message": "Email sent successfully",
  "id": "email_id_from_resend"
}
```

**错误响应**:

- **400 - 参数验证错误**:
  ```json
  {
    "error": "Invalid input data",
    "details": [
      {
        "code": "too_small",
        "minimum": 1,
        "type": "string",
        "inclusive": true,
        "exact": false,
        "message": "Name is required",
        "path": ["name"]
      }
    ]
  }
  ```

- **500 - 服务器错误**:
  ```json
  {
    "error": "Email service not configured. Please contact support."
  }
  ```

#### 邮件功能

当联系表单提交成功时，系统会发送两封邮件：

1. **通知团队**: 发送给 `RESEND_TO_EMAIL` 配置的邮箱
2. **确认回复**: 发送给用户，确认收到消息

## 🔧 环境变量详解

### 必需环境变量

```bash
# Next.js 运行环境
NODE_ENV=production                    # 运行模式
NEXT_CONFIG_ENV=production            # Next.js 配置环境
```

### 邮件服务环境变量 (可选)

```bash
# Resend API 配置
RESEND_API_KEY=re_xxxxxxxxx           # Resend API 密钥
RESEND_FROM_EMAIL=contact@your-domain.com    # 发送者邮箱
RESEND_TO_EMAIL=team@your-domain.com         # 接收者邮箱
```

### 获取 Resend API Key

1. 注册 [Resend 账户](https://resend.com)
2. 验证您的域名
3. 创建 API Key
4. 配置发送者邮箱域名

## ✅ 部署前检查清单

### 代码质量检查

```bash
# 运行所有检查
pnpm lint                 # ESLint 代码检查
pnpm typecheck           # TypeScript 类型检查
pnpm build               # 构建测试
pnpm audit               # 安全漏洞扫描
```

### 功能测试

- [ ] 首页加载正常
- [ ] 所有导航链接工作
- [ ] 响应式设计在移动端正常
- [ ] 联系表单功能正常 (如果配置了邮件服务)
- [ ] 图片和静态资源加载正常
- [ ] 页面性能良好 (Lighthouse 得分 > 90)

### 生产环境验证

```bash
# 本地生产构建测试
pnpm build && pnpm start

# 验证环境变量
echo $NODE_ENV
echo $NEXT_CONFIG_ENV
```

## 🎯 性能优化

### Vercel 平台优化

1. **区域配置**: 选择离目标用户最近的区域
   ```json
   {
     "regions": ["hkg1", "nrt1", "sfo1"]
   }
   ```

2. **函数超时**: 为 API 路由配置合适的超时时间
   ```json
   {
     "functions": {
       "app/api/contact/route.ts": {
         "maxDuration": 30
       }
     }
   }
   ```

3. **缓存策略**: 利用 Vercel 的边缘缓存
   ```typescript
   // 在 API 路由中设置缓存头
   export const runtime = 'edge'
   export const revalidate = 3600  // 1小时
   ```

### 内容优化

- 图片自动 WebP/AVIF 格式转换
- 自动代码分割和懒加载
- CSS/JS 压缩和合并
- Gzip/Brotli 压缩

## 🔒 安全配置

### HTTP 安全头

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    }
  ]
}
```

### 环境变量安全

- 使用 Vercel Environment Variables 存储敏感信息
- 不要在客户端代码中暴露 API 密钥
- 定期轮换 API 密钥

## 🔍 故障排除

### 常见问题

**1. 构建失败**
```bash
Error: Cannot find module 'some-package'
```
**解决方案**: 检查 pnpm-lock.yaml，运行 `pnpm install`

**2. 邮件发送失败**
```bash
Error: RESEND_API_KEY not configured
```
**解决方案**: 检查环境变量配置，确认 Resend API Key 有效

**3. 类型错误**
```bash
Type error: Property 'x' does not exist
```
**解决方案**: 运行 `pnpm typecheck` 修复类型错误

**4. 样式加载问题**
```bash
Warning: CSS files not found
```
**解决方案**: 检查 Tailwind 配置和 CSS 导入

### 调试工具

```bash
# Vercel CLI 调试
vercel logs                    # 查看部署日志
vercel env ls                  # 列出环境变量
vercel inspect                 # 检查项目配置

# 本地调试
pnpm dev:turbo                # 使用 Turbopack 开发
pnpm build -- --debug         # 详细构建日志
```

### 监控和日志

- Vercel Analytics: 性能监控
- Vercel Speed Insights: Core Web Vitals
- 函数日志: 实时错误追踪
- 构建日志: 部署过程监控

## 📊 部署后验证

### 性能检查

```bash
# 使用 Lighthouse 测试
npx lighthouse https://your-domain.com

# 期望得分:
# Performance: > 90
# Accessibility: > 95  
# Best Practices: > 90
# SEO: > 90
```

### 功能验证

1. **页面访问测试**
   - 所有页面正常加载
   - 响应式设计工作正常
   - 动画和交互功能正常

2. **API 接口测试** 
   ```bash
   # 测试联系表单 API
   curl -X POST https://your-domain.com/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test message"}'
   ```

3. **SEO 验证**
   - Meta 标签正确设置
   - Sitemap.xml 可访问
   - Robots.txt 正确配置

---

**部署成功！** 🎉

您的 Dubhe Website 现已成功部署到 Vercel。访问您的域名查看线上效果。

如有问题，请参考故障排除部分或联系开发团队。