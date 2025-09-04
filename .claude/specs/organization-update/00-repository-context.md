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
- **Turbo** for monorepo management with `turbo.json` configuration
- **pnpm 10.4+** as package manager with workspace configuration
- **Webpack optimizations** with bundle splitting
- **Turbopack** support for development (`pnpm dev:turbo`)

### Internationalization
- **next-intl 4.3** for i18n with route-based localization
- **16 supported locales**: en, id, vi, ko, zh-TW, ja, fr, ru, hi, ha, ur, uk, tr, th, pt, bn
- **Route-based localization**: `[locale]` dynamic segments
- **Message files**: `apps/web/messages/{locale}.json` (comprehensive translations)

### Quality Assurance & Testing
- **Vitest 3.2** for unit testing (70% coverage threshold)
- **Playwright 1.54** for E2E testing with multiple browser configs
- **ESLint** with custom workspace config (`@workspace/eslint-config`)
- **TypeScript strict mode** with workspace configurations
- **Lighthouse CI** for performance monitoring
- **Accessibility testing** with @axe-core/playwright

### Monitoring & Observability
- **Sentry 10.3** integration for error tracking
- **Web Vitals** monitoring with custom implementation
- **Performance optimizations** (image optimization, compression, caching)

### Email Integration
- **Resend** API for transactional emails with environment configuration

## Project Structure

```
dubhe-website/
├── apps/
│   └── web/                          # Main Next.js application
│       ├── app/[locale]/            # Internationalized pages
│       │   ├── page.tsx             # Home page redirect
│       │   ├── contact/             # Contact form with validation
│       │   ├── papers/              # Research papers showcase
│       │   ├── grants/              # Grant programs
│       │   ├── labs/                # R&D initiatives
│       │   ├── ambassador/          # Ambassador program
│       │   ├── media-kit/           # Brand assets and media kit
│       │   ├── privacy/             # Privacy policy
│       │   ├── terms/               # Terms of service
│       │   └── [other-pages]/       # Additional pages
│       ├── components/              # React components organized by feature
│       │   ├── home/               # Home page sections (modularized)
│       │   │   ├── CompaniesSection.tsx    # Partner/organization showcase
│       │   │   ├── CommunitySection.tsx    # Community engagement
│       │   │   ├── FeaturesSection.tsx     # Key features
│       │   │   ├── HeroSection.tsx         # Main hero
│       │   │   └── [other-sections]/       # Additional home sections
│       │   ├── investor/           # Investor-focused components
│       │   │   └── team-execution.tsx      # Team showcase component
│       │   ├── ui/                 # Shared UI components
│       │   ├── footer.tsx          # Site footer with navigation
│       │   ├── navigation.tsx      # Main navigation bar
│       │   └── [other-components]/ # Feature-specific components
│       ├── hooks/                  # Custom React hooks
│       ├── lib/                    # Utility functions
│       ├── messages/               # i18n translation files (extensive)
│       ├── i18n/                   # Internationalization configuration
│       ├── public/                 # Static assets including mediakit
│       │   └── mediakit/          # Brand assets for organizations
│       └── tests/                  # E2E test files
├── packages/
│   ├── ui/                         # Shared UI components (shadcn/ui)
│   │   ├── src/components/        # Reusable components
│   │   ├── src/lib/               # Utility functions
│   │   └── src/styles/            # Global CSS
│   ├── typescript-config/         # Shared TypeScript configurations
│   └── eslint-config/             # Shared ESLint configurations
├── e2e/                           # End-to-end test suites
├── .github/workflows/             # CI/CD pipelines
└── [config files]                # Root-level configuration
```

## Code Organization Patterns

### Component Architecture
- **Functional Components** with React hooks pattern
- **Client Components** marked with "use client" directive for interactivity
- **Lazy Loading** for heavy components with dynamic imports
- **Suspense Boundaries** with loading fallbacks
- **Component Composition** over inheritance
- **Section-based organization** for page components

### File Naming Conventions
- **kebab-case** for files and directories
- **PascalCase** for React components
- **Absolute imports** using workspace aliases (`@/`, `@workspace/`)

### State Management
- **React hooks** for local state (useState, useEffect)
- **Context providers** for shared state
- **Custom hooks** for business logic encapsulation

### Styling Approach
- **Tailwind utility classes** with consistent design system
- **Component-based styling** with Tailwind composition
- **Responsive design** with mobile-first approach
- **Dark theme** as primary design pattern
- **Gradient effects** and glassmorphism for modern UI

## Current Organization/Team Display Implementation

### Existing Team Component (`/apps/web/components/investor/team-execution.tsx`)
**Current Status**: Comprehensive team showcase component with:
- **Team Members**: Henry, Bob, Frank, Jason C with defined roles and expertise
- **Achievement Timeline**: Awards from 2021-2024 across multiple ecosystems
- **Execution Metrics**: Development experience, hackathon wins, recognition
- **Visual Design**: Card-based layout with gradients and animations

### Companies Section (`/apps/web/components/home/CompaniesSection.tsx`)  
**Current Status**: Partner/organization showcase with:
- **Current Organizations**: Dubhe, Merak, Phad, Obelisk Labs, Sui
- **Scrolling Animation**: Infinite horizontal scroll with logo display
- **Responsive Design**: Mobile and desktop optimized
- **Brand Assets**: Located in `/public/mediakit/` directory

### Footer Navigation (`/apps/web/components/footer.tsx`)
**Current Status**: Comprehensive site navigation with:
- **Community Section**: Ambassador, moderators, events, contact links
- **Legal Links**: Privacy, terms, contact prominently displayed
- **Social Media**: Complete social presence (X, Discord, Telegram, GitHub, YouTube, Medium)
- **Internationalization**: Full i18n support via next-intl

## Development Workflow

### Git Workflow
- **Main branch**: `main` (production)
- **Feature branches**: `feature/` prefix pattern
- **Current branch**: `feature/18n` (internationalization work)
- **Clean status**: No pending changes

### CI/CD Pipeline (`.github/workflows/test.yml`)
**Comprehensive Pipeline**:
1. **Testing**: Unit tests (Vitest) with coverage reporting
2. **E2E Testing**: Playwright across multiple browsers
3. **Performance**: Lighthouse CI for performance monitoring  
4. **Linting**: ESLint and TypeScript checking
5. **Build Verification**: Production build validation

### Development Commands
```bash
# Development
pnpm dev                    # Start all apps in development
pnpm dev:turbo             # Start with Turbopack (faster)

# Building
pnpm build                 # Build all packages and apps
pnpm start                 # Start production server

# Code Quality
pnpm lint                  # Run ESLint on all packages
pnpm lint:fix              # Auto-fix ESLint issues
pnpm format                # Format code with Prettier

# Testing
pnpm test:unit             # Unit tests with coverage
pnpm test:e2e              # End-to-end tests
pnpm test:performance      # Lighthouse performance tests
```

## Integration Points for New Features

### Component Integration
- **Home Page**: Modular section components in `/components/home/`
- **Shared Components**: Available in `/packages/ui/` for reuse
- **Navigation**: Integrated via `/components/navigation.tsx` and footer
- **Internationalization**: Translation keys in `/messages/{locale}.json`

### Page Integration  
- **Route Structure**: `/app/[locale]/[page-name]/page.tsx`
- **Layout Integration**: Automatic layout inheritance
- **SEO Integration**: Built-in Next.js metadata support

### Asset Management
- **Static Assets**: `/public/` directory with organized subdirectories  
- **Media Kit**: Brand assets in `/public/mediakit/` 
- **Image Optimization**: Next.js Image component with WebP/AVIF support

## Development Constraints & Considerations

### Performance Requirements
- **Lighthouse CI**: Automated performance monitoring
- **Bundle Optimization**: Code splitting and tree shaking
- **Image Optimization**: WebP/AVIF with Next.js Image component
- **Caching Strategy**: Aggressive static asset caching

### Accessibility Requirements  
- **ARIA Support**: Semantic HTML with proper labeling
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader**: Compatible with assistive technologies
- **Color Contrast**: WCAG compliant color schemes

### Internationalization Constraints
- **Translation Workflow**: Managed through Weblate integration
- **Key Consistency**: Structured translation keys across all locales
- **Cultural Adaptation**: Region-specific formatting and content

### Security Considerations
- **Zero Vulnerabilities**: Current security audit status clean (0/5)
- **Dependency Management**: Automated security updates via pnpm overrides
- **Input Validation**: Zod schema validation for forms
- **CSP Headers**: Content Security Policy implementation

## Existing Conventions to Follow

### Code Quality Standards
- **TypeScript Strict Mode**: Full type safety enforcement
- **ESLint Configuration**: Custom workspace rules
- **Test Coverage**: Minimum 70% threshold  
- **Component Testing**: Jest/Vitest with React Testing Library

### Design System Conventions
- **Color Palette**: Dark theme with purple/blue/green gradients
- **Typography**: Consistent font sizing and weight hierarchy
- **Spacing**: Tailwind spacing scale adherence
- **Component Patterns**: Card-based layouts with glassmorphism effects

### Documentation Standards
- **Component Documentation**: Inline JSDoc comments
- **API Documentation**: OpenAPI specifications for endpoints
- **README Updates**: Comprehensive feature documentation
- **Security Documentation**: Maintained in `SECURITY.md`

This analysis provides the comprehensive context needed to understand where and how organization/contributor information is currently displayed, and the established patterns for extending the platform with new features.