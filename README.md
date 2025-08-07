# Dubhe Website

🚀 The official website for the Dubhe blockchain infrastructure platform, built with cutting-edge web technologies.

## Overview

Dubhe Website is a modern, high-performance web application showcasing the Dubhe blockchain ecosystem. Built on Next.js 15 with React 19 and TypeScript 5.7, it features a comprehensive presentation of Dubhe's infrastructure solutions, developer tools, and community resources.

### Key Features

- **🏗️ Modern Architecture**: Next.js 15 + React 19 + TypeScript 5.7
- **⚡ Performance Optimized**: Turbopack, bundle optimization, image optimization
- **🎨 Beautiful UI**: shadcn/ui components with custom design system
- **📱 Responsive Design**: Mobile-first approach with smooth animations
- **🔒 Security First**: Zero vulnerabilities, comprehensive security measures
- **🛠️ Developer Experience**: ESLint, Prettier, type safety, monorepo structure

### Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript 5.7
- **Styling**: Tailwind CSS, shadcn/ui components
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build**: Turbo (monorepo), pnpm
- **Code Quality**: ESLint, Prettier, TypeScript strict mode
- **Email**: Resend API integration

### Project Structure

```
dubhe-website/
├── apps/
│   └── web/                 # Main Next.js application
│       ├── app/             # Next.js 13+ app directory
│       ├── components/      # React components
│       │   └── home/        # Refactored home page components
│       ├── public/          # Static assets
│       └── styles/          # Global styles
├── packages/
│   ├── ui/                  # Shared UI components (shadcn/ui)
│   ├── typescript-config/   # Shared TypeScript configuration
│   └── eslint-config/       # Shared ESLint configuration
├── turbo.json               # Turbo monorepo configuration
├── pnpm-workspace.yaml      # pnpm workspace configuration
└── SECURITY.md              # Security documentation
```

### Pages Overview

- **Home**: Complete platform overview with features and architecture
- **Engine**: Blockchain engine technical details
- **OS**: Operating system layer documentation  
- **Channel**: Communication channels and APIs
- **Labs**: Research and development initiatives
- **Grants**: Funding opportunities for developers
- **Incubation**: Startup support programs
- **Ambassador**: Community ambassador program
- **Team**: Core team and contributors
- **Proposal**: Governance and proposal system
- **Contact**: Get in touch and support

## Quick Start

### Prerequisites

- Node.js 20+ (recommended: latest LTS)
- pnpm 10.4.1+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/dubhe-website.git
   cd dubhe-website
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create a `.env.local` file in `apps/web/`:

```bash
# Email configuration (optional)
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=noreply@dubhe.com
RESEND_TO_EMAIL=contact@dubhe.com
```

## Development

### Available Scripts

```bash
# Development
pnpm dev                    # Start all apps in development mode
pnpm dev:turbo             # Start with Turbopack (faster)

# Building
pnpm build                 # Build all packages and apps
pnpm start                 # Start production server

# Code Quality
pnpm lint                  # Run ESLint on all packages
pnpm lint:fix              # Auto-fix ESLint issues
pnpm format                # Format code with Prettier
pnpm typecheck             # Run TypeScript type checking

# Security
pnpm audit                 # Check for security vulnerabilities
pnpm audit --fix           # Auto-fix security issues
```

### Adding UI Components

To add shadcn/ui components:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

Components are installed in `packages/ui/src/components` and can be imported:

```tsx
import { Button } from "@workspace/ui/components/button"
```

### Code Style

- **TypeScript**: Strict mode enabled, prefer type safety
- **React**: Use functional components with hooks
- **Styling**: Tailwind CSS with component composition
- **Imports**: Use absolute imports with workspace aliases
- **File Naming**: kebab-case for files, PascalCase for components

### Component Architecture

The main home page has been refactored into focused components:

- `HeroSection`: Main landing section with call-to-actions
- `FeaturesSection`: Key platform features overview
- `ProductSuiteSection`: Product lineup presentation
- `NetworkArchitectureSection`: Technical architecture visualization
- `CommunitySection`: Community engagement and social proof
- `CompaniesSection`: Partner and client showcase

## Production Deployment

### Build Process

```bash
# Production build
pnpm build

# Verify build
pnpm start
```

### Deployment Platforms

**Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Docker**
```dockerfile
FROM node:20-alpine AS base
WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

### Performance Optimizations

- **Image Optimization**: Next.js Image component with WebP/AVIF
- **Bundle Splitting**: Webpack optimization for vendor chunks
- **Tree Shaking**: Unused code elimination
- **Compression**: Gzip/Brotli compression enabled
- **Caching**: Aggressive caching for static assets

## Security

✅ **Current Status**: All vulnerabilities resolved (0/5)

- Regular security audits with `pnpm audit`
- Automated dependency updates via pnpm overrides
- Comprehensive security documentation in `SECURITY.md`
- No known vulnerabilities in production dependencies

See [SECURITY.md](./SECURITY.md) for detailed security information.

## Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Make changes and test**: `pnpm lint && pnpm typecheck && pnpm build`
4. **Commit changes**: `git commit -m 'feat: add amazing feature'`
5. **Push to branch**: `git push origin feature/amazing-feature`
6. **Open Pull Request**

### Development Guidelines

- Follow existing code style and conventions
- Add TypeScript types for all new code
- Write meaningful commit messages (conventional commits)
- Test your changes across different screen sizes
- Run linting and type checking before committing
- Update documentation for significant changes

## Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs and feature requests via GitHub Issues
- **Community**: Join our Discord for discussions
- **Email**: contact@dubhe.com for enterprise inquiries

## License

This project is proprietary software. All rights reserved.

---

**Built with ❤️ by the Dubhe Team**

For more information about Dubhe blockchain infrastructure, visit [dubhe.com](https://dubhe.com).
