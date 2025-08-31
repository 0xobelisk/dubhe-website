# Repository Context Analysis - Dubhe Website

## Project Overview

### Project Type & Purpose
- **Type**: Modern web application for blockchain infrastructure platform
- **Purpose**: Official website showcasing the Dubhe blockchain ecosystem
- **Architecture**: Next.js 15 with React 19 monorepo structure
- **Primary Goal**: Comprehensive presentation of Dubhe's infrastructure solutions, developer tools, and community resources

## Technology Stack

### Frontend Framework
- **Next.js 15** with React 19 RC
- **TypeScript 5.7** (strict mode enabled)
- **App Router** architecture (Next.js 13+ app directory)

### Styling & UI
- **Tailwind CSS 4.0.8** for styling
- **shadcn/ui** component system
- **Framer Motion 12.6.2** for animations
- **Lucide React** for icons
- **class-variance-authority** for component variants

### Internationalization
- **next-intl 4.3.4** for i18n support
- **17+ supported locales** including English, Indonesian, Vietnamese, Korean, Traditional Chinese, Japanese, French, Russian, Hindi, Hausa, Urdu, Ukrainian, Turkish, Thai, Portuguese, Bengali
- **Translation files** in `/apps/web/messages/` directory

### Development Tools
- **pnpm 10.4.1** as package manager
- **Turbo** for monorepo management
- **ESLint & Prettier** for code quality
- **TypeScript** strict mode configuration

### Testing Framework
- **Vitest** for unit testing
- **Playwright** for E2E testing
- **@testing-library/react** for component testing
- **Lighthouse CI** for performance testing
- **Accessibility testing** with axe-core

### Additional Libraries
- **Resend** for email integration
- **Sentry** for error monitoring and performance tracking
- **Zod** for schema validation
- **next-themes** for theme management
- **react-countup** for animations
- **web-vitals** for performance monitoring

## Project Structure

### Monorepo Organization
```
dubhe-website/
├── apps/
│   └── web/                    # Main Next.js application
│       ├── app/                # Next.js app directory
│       │   ├── [locale]/       # Internationalized routes
│       │   └── api/            # API routes
│       ├── components/         # React components
│       ├── public/             # Static assets
│       ├── messages/           # i18n translation files
│       └── tests/              # Test files
├── packages/
│   ├── ui/                     # Shared UI components (shadcn/ui)
│   ├── typescript-config/      # Shared TypeScript configuration
│   └── eslint-config/          # Shared ESLint configuration
└── turbo.json                  # Turbo monorepo configuration
```

### Page Structure
- **Internationalized routing** with `[locale]` dynamic segments
- **17+ supported pages** including Home, Engine, OS, Channel, Labs, Grants, Incubation, Ambassador, Team, Proposal, Contact, Papers
- **Error handling** with custom error pages and global error boundaries
- **SEO optimization** with metadata generation and sitemap

### Component Architecture
- **Modular component structure** in `/components/`
- **Reusable UI components** in shared packages
- **Page-specific components** organized by feature
- **Custom hooks** in `/hooks/` directory
- **Utility functions** in `/lib/` directory

## Code Patterns & Conventions

### Coding Standards
- **TypeScript strict mode** enabled
- **Functional components** with hooks
- **Component composition** over inheritance
- **Custom hooks** for complex logic
- **Error boundaries** for error handling

### File Naming Conventions
- **kebab-case** for files and directories
- **PascalCase** for React components
- **camelCase** for variables and functions
- **UPPERCASE** for constants

### Import Strategy
- **Absolute imports** with workspace aliases
- **@/** aliases for app-relative imports
- **@workspace/** for monorepo packages
- **Consistent import ordering** enforced by ESLint

### Performance Optimizations
- **Image optimization** with Next.js Image component (WebP/AVIF support)
- **Bundle optimization** with webpack configuration
- **Tree shaking** for unused code elimination
- **Code splitting** with dynamic imports
- **Compression** (Gzip/Brotli) enabled

## Development Workflow

### Git Strategy
- **Feature branching** workflow
- **Conventional commits** encouraged
- **Pre-commit hooks** for code quality
- **Automated testing** on CI/CD

### CI/CD Pipeline (.github/workflows/test.yml)
1. **Linting** with ESLint
2. **Type checking** with TypeScript
3. **Unit tests** with Vitest and coverage reporting
4. **E2E tests** with Playwright
5. **Performance tests** with Lighthouse CI
6. **Build verification** for production readiness

### Testing Strategy
- **Unit testing**: Component and utility function testing
- **Integration testing**: API and data flow testing
- **E2E testing**: User journey and interaction testing
- **Performance testing**: Lighthouse metrics and Web Vitals
- **Accessibility testing**: axe-core compliance

### Build Configuration
- **Turbopack** for development (experimental)
- **Webpack optimization** for production builds
- **Sentry integration** for error monitoring
- **Environment variable** management
- **Static asset** optimization

## PDF File References & Asset Handling

### Current Implementation
The repository has evidence of PDF handling for technical documentation:

1. **PDF File References Found**:
   - References to `Lightpaper.pdf` and `Onepaper.pdf` in git status (deleted files)
   - Current implementation uses `/en/assets/Lightpaper.pdf` and `/en/assets/Onepaper.pdf`
   - Git LFS configuration for PDF files (*.pdf filter=lfs diff=lfs merge=lfs -text)

2. **Papers Page Structure**:
   - Located at `/apps/web/app/[locale]/papers/page.tsx`
   - Displays two main documents: Lightpaper and Onepager
   - Uses direct URL references to assets directory
   - Implements download functionality via `window.open()`

3. **Asset Organization**:
   - **Static assets** in `/apps/web/public/`
   - **PDF papers** referenced in `/public/en/assets/` (currently missing actual files)
   - **Test PDF files** in `/public/papers/` directory (small placeholder files)
   - **README documentation** explaining PDF handling in `/public/assets/README.md`

4. **Internationalization Support**:
   - Translation keys for paper titles and descriptions
   - Support for localized PDF versions (pattern: `{type}-{locale}.pdf`)
   - Fallback mechanism to English versions when locale-specific PDFs unavailable

### PDF Handling Patterns
- **Direct file serving** from public directory
- **No CDN integration** currently implemented
- **Local file fallback** system for missing translations
- **Git LFS** configured for large PDF files
- **Test infrastructure** for PDF availability and download functionality

## Integration Points for New Features

### Asset Management
- **Public directory** for static file serving
- **Next.js Image** component for optimized images
- **Git LFS** for large file handling
- **Environment variables** for external service configuration

### API Integration
- **Next.js API routes** in `/app/api/`
- **Resend integration** for email functionality
- **Sentry monitoring** for error tracking
- **Type-safe API calls** with Zod validation

### Component Extension
- **shadcn/ui** component system for consistent UI
- **Tailwind CSS** for styling flexibility
- **Framer Motion** for animation capabilities
- **Custom hooks** for reusable logic

### Internationalization
- **next-intl** for translation management
- **Message files** for each supported locale
- **Dynamic locale routing** with Next.js
- **Translation validation** scripts available

## Constraints & Considerations

### Technical Constraints
1. **Large File Handling**: PDF files (400MB+) require external hosting or CDN
2. **Git LFS Dependency**: Current setup requires Git LFS for PDF management
3. **Build Performance**: Large assets can impact build times
4. **Vercel Limits**: File size limitations on deployment platform

### Performance Considerations
1. **Bundle Size**: Minimize impact of large assets on initial load
2. **CDN Requirement**: Large files should be served via CDN
3. **Caching Strategy**: Implement appropriate cache headers for static assets
4. **Progressive Loading**: Consider lazy loading for non-critical assets

### Security Considerations
1. **File Access Control**: No authentication currently implemented for PDFs
2. **CORS Configuration**: May need adjustment for external asset serving
3. **Content Security Policy**: Should include external asset domains
4. **Rate Limiting**: Consider for download endpoints if implementing API

### Scalability Factors
1. **Multi-language Support**: 17+ locales require robust file organization
2. **Version Management**: PDF updates need coordinated deployment strategy
3. **Fallback Systems**: Graceful degradation when assets unavailable
4. **Monitoring**: Error tracking for failed asset requests

## Recommendations for Remote PDF Implementation

### Infrastructure
1. **CDN Integration**: Implement CloudFront, Cloudflare, or similar for PDF serving
2. **Environment Configuration**: Add environment variables for asset URLs
3. **Health Checks**: Implement PDF availability monitoring
4. **Fallback Strategy**: Graceful handling of unavailable assets

### Code Organization
1. **Utility Functions**: Create asset URL generation helpers
2. **Type Safety**: Define interfaces for asset metadata
3. **Error Handling**: Robust error boundaries for asset loading failures
4. **Testing**: Comprehensive test coverage for remote asset functionality

### Deployment Strategy
1. **Staged Rollout**: Test with subset of PDFs before full migration
2. **Cache Warming**: Pre-populate CDN caches for critical assets
3. **Monitoring**: Track download success rates and performance metrics
4. **Rollback Plan**: Quick reversion to local assets if needed

This repository is well-structured for implementing remote PDF handling with its existing internationalization support, component architecture, and testing infrastructure.