# Repository Context Report

## Project Overview

**Project Name**: Dubhe Website  
**Project Type**: Modern Web Application (Corporate/Marketing Website)  
**Purpose**: Official website for the Dubhe blockchain infrastructure platform

## Technology Stack Summary

### Core Framework
- **Next.js 15** with App Router (React 19)
- **TypeScript 5.7** with strict mode
- **Turbo** (monorepo build system)
- **pnpm** package manager

### Frontend Stack
- **React 19** with functional components and hooks
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **shadcn/ui** component library
- **Lucide React** for icons
- **next-themes** for theme management

### Internationalization
- **next-intl v4.3.4** for i18n
- Supports 16 locales: en, id, vi, ko, zh-TW, ja, fr, ru, hi, ha, ur, uk, tr, th, pt, bn
- Default locale: English (en)
- Route-based localization with `[locale]` dynamic segments

### Development Tools
- **ESLint** with custom configurations
- **Prettier** for code formatting
- **Vitest** for unit testing
- **Playwright** for E2E testing
- **Lighthouse CI** for performance testing
- **Sentry** for error monitoring

## Project Structure

### Monorepo Organization
```
dubhe-website/
├── apps/
│   └── web/                 # Main Next.js application
├── packages/
│   ├── ui/                  # Shared shadcn/ui components
│   ├── typescript-config/   # Shared TypeScript configuration
│   └── eslint-config/       # Shared ESLint configuration
├── turbo.json              # Turbo configuration
└── pnpm-workspace.yaml     # pnpm workspace configuration
```

### Main Application Structure
```
apps/web/
├── app/
│   ├── [locale]/           # Internationalized routes
│   │   ├── papers/         # Papers/documentation page
│   │   ├── engine/         # Engine page
│   │   ├── channel/        # Channel page
│   │   ├── os/             # OS page
│   │   ├── labs/           # Labs page
│   │   ├── grants/         # Grants page
│   │   ├── contact/        # Contact page
│   │   └── ...            # Other localized pages
│   └── api/               # API routes
├── components/
│   ├── home/              # Home page components
│   ├── ui/                # Custom UI components
│   ├── navigation.tsx     # Main navigation
│   └── footer.tsx         # Footer component
├── messages/              # i18n translation files
├── i18n/                  # Internationalization config
└── public/                # Static assets
```

## Current Papers Page Implementation

### Location & Structure
- **Route**: `/[locale]/papers/page.tsx`
- **Component**: Client-side rendered page
- **Styling**: Tailwind CSS with custom gradient backgrounds
- **Animations**: Framer Motion for smooth transitions

### Key Features
- **Internationalized**: Full i18n support with locale-specific PDF fallback
- **Two main documents**: Whitepaper and Lightpaper
- **PDF handling**: Smart fallback to English version if localized PDF unavailable
- **Responsive design**: Grid layout (1 column mobile, 2 columns desktop)
- **Interactive cards**: Hover effects and click-to-download functionality

### Current UI Patterns
- **Glass morphism cards** with backdrop blur
- **Gradient backgrounds** (purple to blue theme)
- **Icon + content layout** with consistent spacing
- **Download indicators** with external link icons
- **Motion animations** for page entry

## Internationalization (i18n) Patterns

### Implementation
- **next-intl** with server-side rendering support
- **Route-based localization**: `/[locale]/*` pattern
- **Message files**: JSON format in `/messages/` directory
- **Fallback system**: Defaults to English for missing translations

### Translation Structure
```json
{
  "papers": {
    "hero": {
      "badge": "Technical Documentation",
      "title": "Technical Papers",
      "subtitle": "Explore Dubhe's technical architecture..."
    },
    "whitepaper": {
      "title": "Whitepaper",
      "description": "Comprehensive technical overview...",
      "downloadLabel": "Download Whitepaper"
    }
  }
}
```

## Component Architecture Patterns

### Design Principles
- **Functional components** with TypeScript interfaces
- **Composition over inheritance**
- **Custom hook usage** for state management
- **Consistent prop interfaces**

### Common Patterns
1. **Card-based layouts** with variant system
2. **Section containers** with consistent spacing
3. **Gradient backgrounds** with overlay effects
4. **Motion animations** for user interactions
5. **Icon + text combinations** for feature highlights

### Existing UI Components
- **Card.tsx**: Reusable card container with variants (glass, solid, outline)
- **Section.tsx**: Section wrapper with consistent spacing
- **GradientText.tsx**: Text with gradient effects
- **AnimatedIcon.tsx**: Icons with hover animations

## Styling Conventions

### Tailwind Usage
- **Design system**: Consistent color palette (purple/blue gradients)
- **Responsive design**: Mobile-first approach
- **Component variants**: Using class composition
- **Dark theme**: Primary theme with glass effects

### Color Palette
- **Primary**: Purple to blue gradients
- **Text**: White with gray variations for secondary text
- **Backgrounds**: Dark gradients with glass effects
- **Accents**: Blue (400-500) for interactive elements

## Code Quality & Testing

### Standards
- **TypeScript strict mode**: Full type safety
- **ESLint**: Custom configuration with consistent rules
- **Prettier**: Automated code formatting
- **Component documentation**: JSDoc comments with Chinese and English

### Testing Strategy
- **Unit tests**: Vitest with React Testing Library
- **E2E tests**: Playwright for full user journeys
- **Performance**: Lighthouse CI for web vitals
- **Coverage**: Comprehensive test coverage tracking

## Development Workflow

### CI/CD Pipeline
- **GitHub Actions**: Automated testing and deployment
- **Turbo**: Efficient build caching and parallelization
- **Quality gates**: Linting, type checking, testing, and performance checks

### Branch Strategy
- **Main branch**: Production-ready code
- **Feature branches**: Individual feature development
- **Current branch**: `feature/18n` (internationalization work)

## Integration Points for New Features

### For One-Pager Section Component
1. **Location**: Should integrate into existing page structures
2. **Styling**: Follow established Tailwind + gradient patterns
3. **i18n**: Must support all 16 locales with proper fallbacks
4. **Components**: Can leverage existing Card, Section, and UI components
5. **Animation**: Should use Framer Motion for consistency

### Recommended Approach
1. **Create reusable section component** in `/components/ui/`
2. **Follow existing card patterns** for document presentation
3. **Implement i18n support** with proper translation keys
4. **Use TypeScript interfaces** for type safety
5. **Add proper testing** (unit and E2E)

## Potential Constraints & Considerations

### Performance
- **Bundle size**: Consider code splitting for large components
- **Image optimization**: Use Next.js Image component
- **Loading states**: Implement proper loading indicators

### Accessibility
- **Keyboard navigation**: Ensure all interactive elements are accessible
- **Screen readers**: Proper ARIA labels and semantic HTML
- **Color contrast**: Maintain WCAG compliance

### Internationalization
- **RTL support**: Consider right-to-left languages if needed
- **Content length**: Account for text expansion in different languages
- **Cultural considerations**: Ensure appropriate content for all locales

### Security
- **Content security**: Validate and sanitize any dynamic content
- **PDF handling**: Secure PDF serving and validation
- **Error handling**: Graceful fallbacks for missing resources

This repository analysis provides a comprehensive foundation for implementing the one-pager section component while maintaining consistency with existing patterns, standards, and user experience expectations.