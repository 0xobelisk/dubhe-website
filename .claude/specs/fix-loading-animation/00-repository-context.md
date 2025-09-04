# Repository Context Analysis: Dubhe Website

## Project Overview

**Project Type**: Modern web application - blockchain platform marketing/documentation website
**Purpose**: Official website for Dubhe blockchain infrastructure platform, showcasing ecosystem, developer tools, and community resources

## Technology Stack

### Frontend Framework
- **Next.js 15** with App Router architecture
- **React 19** with strict TypeScript 5.7
- **Client-side rendering** for interactive components
- **Internationalization** via next-intl (17 locales supported)

### Styling & UI
- **Tailwind CSS 4.0.8** for utility-first styling
- **shadcn/ui** component library (@workspace/ui package)
- **Radix UI** primitives for accessible components
- **Framer Motion 12.6.2** for animations and page transitions
- **Lucide React** for icons

### Build System & Development
- **Monorepo structure** using Turbo + pnpm
- **Package manager**: pnpm 10.4.1
- **Build tools**: Turbopack, Webpack optimizations
- **Code quality**: ESLint, Prettier, TypeScript strict mode

### Testing & Quality Assurance
- **Unit testing**: Vitest with React Testing Library
- **E2E testing**: Playwright
- **Performance**: Lighthouse CI integration
- **Accessibility**: axe-core integration

### Performance & Security
- **Sentry** error tracking and monitoring
- **Image optimization** with next/image
- **Bundle optimization** and code splitting
- **Security**: Zero vulnerabilities policy

## Project Structure

```
dubhe-website/
├── apps/web/                    # Main Next.js application
│   ├── app/[locale]/           # Internationalized routing
│   │   ├── page.tsx            # Homepage with loading animation
│   │   ├── loading.tsx         # Global loading component
│   │   └── [pages]/            # Other localized pages
│   ├── components/             # React components
│   │   ├── cosmic-loader.tsx   # Main loading animation component
│   │   ├── NewHomePage.tsx     # Homepage wrapper
│   │   └── home/               # Homepage-specific components
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility functions
│   └── messages/               # i18n translation files (17 locales)
├── packages/ui/                # Shared UI component library
├── packages/typescript-config/ # Shared TypeScript config
└── packages/eslint-config/     # Shared ESLint config
```

## Code Organization Patterns

### Component Architecture
- **Modular design**: Components organized by feature/page
- **Lazy loading**: Heavy components loaded on demand
- **Suspense boundaries**: Graceful loading states
- **Error boundaries**: Comprehensive error handling

### State Management
- **React hooks**: useState, useEffect, useCallback for local state
- **Context providers**: Theme, internationalization
- **No external state management** (Redux/Zustand) - keeping it simple

### Styling Conventions
- **Utility-first**: Tailwind CSS classes
- **Component variants**: class-variance-authority for component styling
- **CSS Modules**: For component-specific styles (styles.css)
- **Responsive design**: Mobile-first approach

## Loading Animation Analysis

### Current Implementation

**Primary Loading Component**: `CosmicLoader` (`/apps/web/components/cosmic-loader.tsx`)
- **Purpose**: Space-themed loading animation with Big Dipper constellation
- **Features**: 
  - Animated starfield background
  - HUD-style interface elements
  - Progressive constellation discovery (searching → found → complete)
  - Progress bar with realistic timing
  - Responsive design with mobile optimizations

**Homepage Loading Flow** (`/apps/web/app/[locale]/page.tsx`):
1. Component renders with `isLoading = true`
2. `CosmicLoader` displays with 4-second animation
3. Fallback timer (6 seconds) ensures animation doesn't hang
4. Smooth fade transition to `NewHomePage`

**Global Loading Component** (`/apps/web/app/[locale]/loading.tsx`):
- Simple wrapper around `CosmicLoader`
- Used for route-level loading states

### Animation Characteristics
- **Duration**: 4 seconds primary, 6 seconds fallback
- **Phases**: 
  - Searching (0-70%): Scanner animation, searching for constellation
  - Found (70-90%): Big Dipper pattern revealed
  - Complete (90-100%): Target lock on Dubhe star
- **Visual Elements**:
  - Animated starfield (200 pre-generated stars)
  - Shooting stars with realistic trajectories  
  - HUD overlay with sci-fi aesthetic
  - Progressive constellation line drawing
  - Data streams and scanner effects

### Performance Considerations
- **Pre-generated data**: Avoids hydration mismatches
- **Mobile optimizations**: Reduced animation duration for performance
- **Respect user preferences**: `prefers-reduced-motion` support
- **Optimized animations**: Hardware acceleration, backface-visibility

## Development Workflow

### Git Strategy
- **Main branch**: `main` (current: clean working tree)
- **Commit style**: Descriptive messages with emoji usage
- **Recent activity**: Multiple "fix error update" commits

### CI/CD Pipeline
- **GitHub Actions**: `.github/workflows/test.yml`
- **Testing**: Unit, E2E, accessibility, performance tests
- **Quality gates**: ESLint, TypeScript checking, zero vulnerabilities

### Build Process
- **Development**: `pnpm dev` with Turbo
- **Production**: `pnpm build` with optimizations
- **Type checking**: Strict TypeScript enforcement

## Integration Points for New Features

### Component Integration
- Follow existing patterns in `/apps/web/components/`
- Use shadcn/ui components from `@workspace/ui`
- Implement proper TypeScript interfaces
- Add corresponding test files

### Styling Integration
- Use Tailwind utility classes
- Follow mobile-first responsive approach
- Maintain dark theme compatibility
- Use Framer Motion for animations

### Routing Integration
- Leverage Next.js App Router
- Support internationalization
- Implement proper loading states
- Add metadata and SEO optimizations

## Potential Constraints & Considerations

### Performance Constraints
- **Bundle size**: Careful with heavy dependencies
- **Animation performance**: Mobile device limitations
- **Core Web Vitals**: Maintain high Lighthouse scores
- **Loading time**: Balance animation quality vs. user experience

### Accessibility Requirements
- **Motion preferences**: Respect `prefers-reduced-motion`
- **Screen readers**: Proper ARIA labels and descriptions
- **Keyboard navigation**: Full keyboard accessibility
- **Color contrast**: WCAG compliance

### Browser Compatibility
- **Modern browsers**: ES2022+ features usage
- **React 19**: Latest React features and patterns
- **CSS**: Modern CSS features with fallbacks

### Internationalization
- **17 locales**: All text must be translatable
- **RTL support**: Consider right-to-left languages
- **Cultural considerations**: Animation themes and metaphors

## Existing Conventions to Follow

### Code Style
- **TypeScript strict mode**: Full type safety
- **ESLint rules**: Enforced code quality standards
- **Component naming**: PascalCase for components
- **File naming**: kebab-case for files, PascalCase for components

### Testing Strategy
- **Unit tests**: Vitest + React Testing Library
- **Component testing**: Test user interactions and rendering
- **E2E tests**: Playwright for full user workflows
- **Accessibility tests**: axe-core integration

### Documentation
- **README files**: Comprehensive project documentation
- **Code comments**: Meaningful inline documentation
- **Type definitions**: Self-documenting TypeScript interfaces

## Specific Loading Animation Findings

### Current Issues Identified
1. **Animation Timing**: 4-6 second loading time may feel long for users
2. **Mobile Performance**: Complex animations may strain older devices
3. **User Control**: No way to skip or speed up animation
4. **Progress Indication**: While visually appealing, progress may not match actual loading

### Strengths
1. **Brand Alignment**: Space theme matches Dubhe (star) branding perfectly
2. **Visual Quality**: High-quality, professional animation
3. **Progressive Enhancement**: Graceful fallbacks and error handling
4. **Accessibility**: Motion preference support

### Integration Opportunities
1. **Preloading**: Could integrate with actual resource loading
2. **User Preferences**: Save user choice to skip on repeat visits
3. **Performance Monitoring**: Track loading performance metrics
4. **A/B Testing**: Different animation durations or styles

---

*Generated on 2025-09-04 for comprehensive repository analysis*