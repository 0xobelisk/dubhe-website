# Repository Context Report: Dubhe Website

**Generated:** January 2025  
**Purpose:** Comprehensive analysis for requirements-driven development  
**Focus:** Navigation components and dropdown implementations for Papers feature

## 1. Project Overview

### Project Type
- **Web Application**: Modern Next.js 15 + React 19 website
- **Purpose**: Official website for Dubhe blockchain infrastructure platform
- **Architecture**: Monorepo structure with Turbo build system
- **Target**: Developer-focused platform showcasing Move blockchain ecosystem

### Core Characteristics
- **High-performance**: Built for speed and optimization
- **Multi-language**: Internationalized with 20+ locales
- **Component-driven**: shadcn/ui design system
- **Mobile-first**: Responsive design with accessibility focus

## 2. Technology Stack

### Frontend Framework
- **Next.js**: 15.4.5 with App Router
- **React**: 19.0.0 with Server Components
- **TypeScript**: 5.7.3 with strict mode enabled
- **Styling**: Tailwind CSS 4.0.8 with component composition

### UI & Components
- **Component Library**: shadcn/ui ("new-york" style)
- **Icon System**: Lucide React (0.475.0)
- **Animations**: Framer Motion 12.6.2
- **Base Color**: Neutral theme with CSS variables

### Build & Development
- **Package Manager**: pnpm 10.4.1
- **Monorepo**: Turbo 2.4.2 for task orchestration
- **Bundler**: Next.js with Turbopack optimization
- **Node Version**: 20+ required

### Internationalization
- **Framework**: next-intl 4.3.4
- **Locales**: 20 languages (en, id, vi, ko, zh-TW, ja, fr, ru, hi, ha, ur, uk, tr, th, pt, bn)
- **Default**: English (en)
- **Structure**: JSON-based message files

### Testing & Quality
- **Unit Testing**: Vitest 3.2.4
- **E2E Testing**: Playwright 1.54.2
- **Performance**: Lighthouse CI
- **Linting**: ESLint with custom workspace configs
- **Code Formatting**: Prettier 3.5.1

### Monitoring & Security
- **Error Tracking**: Sentry integration
- **Performance**: Web Vitals monitoring
- **Security**: Zero vulnerabilities maintained
- **Type Safety**: Full TypeScript coverage

## 3. Project Structure

### Monorepo Organization
```
dubhe-website/
├── apps/
│   └── web/                 # Main Next.js application
├── packages/
│   ├── ui/                  # Shared UI components (shadcn/ui)
│   ├── typescript-config/   # Shared TypeScript configs
│   └── eslint-config/       # Shared ESLint configs
├── turbo.json              # Turbo monorepo configuration
└── pnpm-workspace.yaml     # pnpm workspace setup
```

### Application Structure
```
apps/web/
├── app/
│   ├── [locale]/           # Internationalized routing
│   │   ├── ambassador/     # Ambassador program
│   │   ├── channel/        # Dubhe Channel product
│   │   ├── contact/        # Contact page
│   │   ├── engine/         # Dubhe Engine product
│   │   ├── events/         # Events calendar
│   │   ├── foundation/     # Foundation information
│   │   ├── grants/         # Grant programs
│   │   ├── incubation/     # Incubation program
│   │   ├── labs/           # Development labs
│   │   ├── moderators/     # Moderator program
│   │   ├── os/             # Dubhe OS product
│   │   ├── privacy/        # Privacy policy
│   │   ├── proposal/       # Governance proposals
│   │   ├── team/           # Team page
│   │   ├── terms/          # Terms of service
│   │   └── token/          # Token information
│   ├── api/                # API routes
│   └── globals.css         # Global styles
├── components/             # React components
├── messages/               # i18n translations
├── public/                 # Static assets
└── package.json           # App dependencies
```

## 4. Navigation Architecture Analysis

### Current Navigation Component (`/components/navigation.tsx`)

#### Key Features
- **Responsive Design**: Desktop hover dropdowns, mobile slide-out menu
- **Internationalization**: Full i18n support with useTranslations
- **Animation**: Framer Motion for smooth transitions
- **Accessibility**: Keyboard navigation, ARIA labels, focus management

#### Navigation Structure
```typescript
type NavItem = {
  name: string;
  href: string;
  dropdown: DropdownItem[];
}

type DropdownItem = {
  name: string;
  href: string;
  external?: boolean;
}
```

#### Current Menu Items
1. **Learn** (`#learn`)
   - Documentation (external: docs.obelisk.build)

2. **Build** (`#build`)
   - Engine (/engine)
   - Channel (/channel)
   - OS (/os)

3. **Ecosystem** (`#ecosystem`)
   - Foundation (/foundation)
   - Labs (/labs)
   - Grants (/grants)
   - Incubation (/incubation)
   - Proposal (/proposal)

4. **Media** (`#media`)
   - X, Discord, Telegram, GitHub, YouTube, Medium (all external)

5. **Community** (`#community`)
   - Ambassador (/ambassador)
   - Moderators (/moderators)
   - Events (/events)

### Navigation Implementation Details

#### Desktop Navigation
- **Hover-based dropdowns** with 150ms enter delay, 300ms exit delay
- **Hover bridge** - invisible area between button and dropdown
- **External link indicators** with ExternalLink icons
- **Backdrop blur** styling for modern glass effect

#### Mobile Navigation
- **Slide-out menu** with height animation
- **Scroll prevention** when menu is open
- **ESC key support** for accessibility
- **Grouped structure** with section headers

#### Styling Patterns
- **Dark theme**: slate-900/95 with backdrop-blur-md
- **Hover states**: text-gray-300 to text-white transitions
- **Glass morphism**: backdrop-blur effects throughout
- **Consistent spacing**: 8-space grid system

## 5. Internationalization Patterns

### Message Structure
Navigation translations are stored in `messages/[locale].json` under the `navigation` key:

```json
{
  "navigation": {
    "learn": "Learn",
    "build": "Build",
    "ecosystem": "Ecosystem",
    "media": "Media",
    "community": "Community",
    "documentation": "Documentation",
    "engine": "Engine",
    // ... other navigation items
  }
}
```

### Translation Requirements
- **20 languages** must be supported for any new navigation item
- **Consistent naming**: Use clear, concise labels
- **External indicators**: Maintained across all languages

## 6. Existing Page Patterns

### Page Structure Analysis
Most pages follow this structure:
1. **Layout file**: Metadata and SEO configuration
2. **Page component**: Main content with internationalization
3. **Styling**: Tailwind with custom CSS when needed

### Example Page Components
- **Hero sections**: Badge, title, subtitle, stats, CTAs
- **Feature sections**: Grid layouts with icons and descriptions
- **Animation patterns**: Framer Motion for progressive disclosure
- **Responsive design**: Mobile-first approach

### Content Patterns
- **Technical focus**: Developer-oriented content
- **Visual hierarchy**: Clear section breaks with badges
- **Interactive elements**: Hover states, smooth transitions
- **Call-to-actions**: Prominent placement throughout

## 7. Component Architecture

### UI Component Library
The project uses a well-structured component library:

```
packages/ui/src/components/
├── button.tsx
├── dialog.tsx
├── form-field.tsx
├── input.tsx
├── loading.tsx
├── select.tsx
├── sonner.tsx
├── textarea.tsx
└── index.ts
```

### Custom Components
Application-specific components in `/components/`:
- **Navigation**: Main nav with dropdowns
- **LanguageSelector**: Locale switching
- **Footer**: Site footer with links
- **Home sections**: Modular home page components

### Design System
- **shadcn/ui**: "new-york" style variant
- **Consistent theming**: CSS variables for colors
- **Component composition**: Reusable building blocks
- **Accessibility**: Built-in a11y considerations

## 8. Development Workflow

### Code Quality Standards
- **TypeScript strict mode**: Full type safety required
- **ESLint configuration**: Custom workspace rules
- **Prettier formatting**: Consistent code style
- **Component testing**: Vitest for unit tests

### Build Process
- **Turbo orchestration**: Parallel task execution
- **Next.js optimization**: Bundle splitting, image optimization
- **Performance focus**: Lighthouse CI integration
- **Production ready**: Zero-vulnerability requirement

### Git Workflow
- **Current branch**: feature/18n (internationalization work)
- **Main branch**: main (for PRs)
- **Recent commits**: Focus on i18n improvements

## 9. Integration Points for Papers Feature

### Recommended Placement
Based on the existing navigation structure, a "Papers" item would fit best in the **Learn** dropdown, alongside Documentation.

### Implementation Approach
1. **Route creation**: `/papers` page following existing patterns
2. **Navigation update**: Add to Learn dropdown items
3. **Internationalization**: Add translations for all 20 locales
4. **Content structure**: Academic paper listing with categories

### Technical Considerations
- **External vs Internal**: Decide if papers are hosted internally or externally
- **Search functionality**: Consider filtering and search capabilities
- **Academic formatting**: Proper citation and download links
- **Mobile optimization**: Ensure good mobile experience for paper browsing

## 10. Constraints and Considerations

### Performance Requirements
- **Sub-50ms navigation**: Maintain fast interaction times
- **Bundle optimization**: Keep bundle sizes minimal
- **Image optimization**: Proper formats and sizing

### Accessibility Standards
- **ARIA compliance**: Screen reader support
- **Keyboard navigation**: Full keyboard accessibility
- **Color contrast**: Meet WCAG standards
- **Focus management**: Clear focus indicators

### Internationalization Constraints
- **20-language support**: All new features must support all locales
- **RTL considerations**: Layout adaptation for right-to-left languages
- **Cultural sensitivity**: Appropriate terminology across cultures

### Technical Limitations
- **Next.js patterns**: Follow App Router conventions
- **TypeScript coverage**: 100% type safety required
- **Monorepo structure**: Respect workspace boundaries
- **Component reuse**: Leverage existing UI components

## 11. Success Metrics

### Performance Targets
- **Lighthouse Score**: 90+ across all categories
- **Core Web Vitals**: Green ratings maintained
- **Bundle Size**: No significant increase
- **Load Times**: <2s first contentful paint

### User Experience Goals
- **Intuitive Navigation**: Clear information architecture
- **Accessibility**: WCAG 2.1 AA compliance
- **Mobile Experience**: Seamless mobile navigation
- **International Usability**: Consistent experience across all locales

## Conclusion

The Dubhe website is a well-architected, modern React application with strong foundations in performance, accessibility, and internationalization. The existing navigation system is sophisticated and extensible, making it straightforward to add a Papers feature while maintaining consistency with established patterns.

The monorepo structure, comprehensive testing setup, and strong type safety provide a robust foundation for implementing new features. The multi-language support and component-driven architecture ensure that any additions will integrate seamlessly with the existing system.

Key success factors for implementing the Papers feature will be maintaining the established navigation patterns, ensuring full internationalization support, and adhering to the project's high standards for performance and accessibility.