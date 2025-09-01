# Repository Context Analysis - Dubhe Website

## Project Overview

**Project Type**: Enterprise Web Application - Blockchain Infrastructure Platform Website
**Purpose**: Official website for Dubhe blockchain ecosystem showcasing infrastructure solutions, developer tools, and community resources
**Architecture**: Modern TypeScript-first monorepo with internationalization support

## Technology Stack Summary

### Core Framework & Language
- **Next.js 15** with App Router (`apps/web/app/[locale]/`)
- **React 19** (latest stable)
- **TypeScript 5.7** (strict mode enabled)
- **Node.js 20+** (minimum requirement)

### Styling & UI
- **Tailwind CSS 4.0** (latest with @tailwindcss/postcss)
- **shadcn/ui** components (stored in `packages/ui/`)
- **Framer Motion 12.6** for animations
- **Lucide React** for icons
- **CSS-in-JS** with Tailwind utility classes

### Monorepo & Build System
- **Turbo** for monorepo management
- **pnpm 10.4+** as package manager
- **Webpack optimizations** with bundle splitting
- **Turbopack** support for development

### Internationalization
- **next-intl 4.3** for i18n
- **20 supported locales**: en, id, vi, ko, zh-TW, ja, fr, ru, hi, ha, ur, uk, tr, th, pt, bn
- **Route-based localization**: `[locale]` dynamic segments
- **Message files**: `apps/web/messages/{locale}.json`

### Quality Assurance & Testing
- **Vitest** for unit testing (70% coverage threshold)
- **Playwright** for E2E testing (5 browser configurations)
- **ESLint 9.20** with custom workspace config
- **TypeScript strict mode** with workspace configurations
- **Lighthouse CI** for performance monitoring
- **Accessibility testing** with @axe-core/playwright

### Monitoring & Observability
- **Sentry** integration for error tracking
- **Web Vitals** monitoring
- **Performance optimizations** (image optimization, compression)

### Email Integration
- **Resend** API for transactional emails

## Project Structure

```
dubhe-website/
├── apps/
│   └── web/                          # Main Next.js application
│       ├── app/[locale]/            # Internationalized pages
│       │   ├── page.tsx             # Home page
│       │   ├── contact/             # Contact form
│       │   ├── papers/              # Research papers
│       │   ├── grants/              # Grant programs
│       │   ├── labs/                # R&D initiatives
│       │   ├── ambassador/          # Ambassador program
│       │   ├── team/                # Team information
│       │   ├── foundation/          # Foundation details
│       │   └── [other-pages]/       # Additional pages
│       ├── components/              # React components
│       │   ├── home/               # Home page components
│       │   ├── hero/               # Hero sections
│       │   ├── investor/           # Investor components
│       │   └── [other-components]/ # Organized by feature
│       ├── hooks/                  # Custom React hooks
│       ├── lib/                    # Utility functions
│       ├── messages/               # i18n translation files
│       ├── i18n/                   # Internationalization config
│       ├── public/                 # Static assets
│       └── tests/                  # E2E test files
├── packages/
│   ├── ui/                         # Shared UI components (shadcn/ui)
│   │   ├── src/components/        # Button, Dialog, Form components
│   │   ├── src/lib/               # Utility functions
│   │   └── src/styles/            # Global CSS
│   ├── typescript-config/         # Shared TS configurations
│   └── eslint-config/             # Shared ESLint configurations
└── [config files]                 # Root-level configuration
```

## Code Organization Patterns

### Component Architecture
- **Functional Components** with React hooks
- **Client Components** marked with "use client" directive
- **Lazy Loading** for heavy components (NetworkStats, Ecosystem, Footer)
- **Suspense Boundaries** with loading fallbacks
- **Component Composition** over inheritance

### File Naming Conventions
- **kebab-case** for files and directories
- **PascalCase** for React components
- **camelCase** for functions and variables
- **Test files**: `*.test.tsx` or `*.spec.ts`

### Import Strategy
- **Workspace aliases**: `@workspace/ui`, `@workspace/eslint-config`
- **Absolute imports** with path mapping
- **Barrel exports** in component directories (`index.ts`)

### Styling Patterns
- **Tailwind-first** approach with utility classes
- **Responsive design** with mobile-first breakpoints
- **Design system** through shadcn/ui components
- **CSS custom properties** for theme variables

## API & Integration Points

### External Services
- **Resend API** for email functionality
- **Sentry** for error tracking and performance monitoring
- **Image optimization** with Next.js Image component

### Internal APIs
- **Contact form** endpoint (likely `/api/contact`)
- **Email sending** functionality
- **Static asset** serving from `/public`

## Development Workflow

### Git Strategy
- **Main branch**: `main` (production)
- **Feature branches**: `feature/[feature-name]`
- **Current branch**: `feature/18n` (internationalization work)

### CI/CD Pipeline (.github/workflows/test.yml)
1. **Linting** with ESLint
2. **Type checking** with TypeScript
3. **Unit tests** with Vitest (70% coverage)
4. **E2E tests** with Playwright
5. **Performance tests** with Lighthouse CI
6. **Build verification**

### Quality Gates
- **No build errors** allowed
- **70% test coverage** requirement
- **Zero ESLint warnings** policy
- **Accessibility standards** compliance

## Existing Conventions to Follow

### TypeScript
- **Strict mode** enabled
- **No implicit any** allowed
- **Interface definitions** for props and data structures
- **Type-first** development approach

### React Patterns
- **Functional components** with hooks
- **Props interfaces** for all components
- **Error boundaries** for error handling
- **Suspense** for loading states

### Internationalization
- **next-intl** for all user-facing text
- **Message keys** following nested object structure
- **Locale-specific** routing with `[locale]` segments
- **Default locale**: English (`en`)

### Testing Strategy
- **Unit tests** for components and utilities
- **Integration tests** for page interactions
- **E2E tests** for critical user journeys
- **Accessibility tests** for compliance

## Constraints & Considerations

### Performance Requirements
- **Lighthouse scores** monitored in CI
- **Bundle size optimization** with code splitting
- **Image optimization** with WebP/AVIF formats
- **Lazy loading** for non-critical components

### Accessibility Requirements
- **WCAG compliance** testing with axe-core
- **Semantic HTML** structure
- **Keyboard navigation** support
- **Screen reader** compatibility

### Browser Support
- **Modern browsers** (Chrome, Firefox, Safari, Edge)
- **Mobile responsiveness** (Pixel 5, iPhone 12)
- **Progressive enhancement** approach

### Security Considerations
- **Dependency auditing** with `pnpm audit`
- **Sentry integration** for error monitoring
- **Environment variable** management
- **No security vulnerabilities** in production deps

## Integration Points for New Features

### Adding New Pages
1. Create page in `apps/web/app/[locale]/[page-name]/`
2. Add translations in `apps/web/messages/{locale}.json`
3. Add navigation links in relevant components
4. Create corresponding tests

### Adding New Components
1. Create in appropriate `apps/web/components/` subdirectory
2. Export from `index.ts` barrel file
3. Add unit tests with `.test.tsx` suffix
4. Follow existing styling patterns

### Adding UI Components
1. Use shadcn/ui CLI: `pnpm dlx shadcn@latest add [component]`
2. Components installed in `packages/ui/src/components/`
3. Import as `@workspace/ui/components/[component]`

### Adding New Locales
1. Add locale to `apps/web/i18n/routing.ts`
2. Create translation file in `apps/web/messages/`
3. Update type definitions if needed

## Recommended Development Approach

1. **Follow existing patterns** established in the codebase
2. **Mobile-first** responsive design
3. **Accessibility-first** component development  
4. **Type-safe** implementations with TypeScript
5. **Test-driven** development with good coverage
6. **Performance-conscious** with lazy loading and optimization
7. **Internationalization-ready** with next-intl integration

This repository represents a production-ready, enterprise-grade web application with modern development practices, comprehensive testing, and international support.