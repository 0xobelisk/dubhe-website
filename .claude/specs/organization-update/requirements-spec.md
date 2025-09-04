# Organization Update Feature - Technical Specification

## Problem Statement

- **Business Issue**: The current website displays only 2 organizations in the investor/team sections, but the business needs to showcase 4 distinct organizations to properly represent the ecosystem
- **Current State**: CompaniesSection.tsx shows limited organization logos without detailed information, and team-execution.tsx focuses on individual team members rather than organizational structure
- **Expected Outcome**: Display 4 organizations with detailed information including descriptions, key contributions, and organizational focus areas in a visually appealing, responsive layout

## Solution Overview

- **Approach**: Create a new OrganizationSection component that replaces or enhances the current CompaniesSection to display 4 organizations with comprehensive information in a card-based layout
- **Core Changes**: New component creation, data structure definition, translation key additions, responsive grid implementation
- **Success Criteria**: 4 organizations displayed with descriptions, contributions, responsive design across all screen sizes, full i18n support for 16 languages

## Technical Implementation

### Database Changes
- **Tables to Modify**: N/A (Static content, no database changes required)
- **New Tables**: N/A
- **Migration Scripts**: N/A

### Code Changes

#### Files to Create
- **File**: `/apps/web/components/home/OrganizationsSection.tsx`
  - **Purpose**: New component to display 4 organizations with detailed information
  - **Type**: React component with TypeScript, motion animations, responsive grid

#### Files to Modify
- **File**: `/apps/web/components/home/HomePage.tsx`
  - **Modification**: Replace or enhance CompaniesSection with OrganizationsSection
  - **Import**: Add OrganizationsSection import

- **File**: `/apps/web/messages/en.json`
  - **Modification**: Add comprehensive organization data structure under "organizations" key
  - **Content**: Names, descriptions, contributions, focus areas for all 4 organizations

- **Translation Files**: All 15 additional language files need organization translations:
  - `/apps/web/messages/zh-TW.json`
  - `/apps/web/messages/bn.json`
  - `/apps/web/messages/ha.json`
  - `/apps/web/messages/hi.json`
  - `/apps/web/messages/id.json`
  - `/apps/web/messages/ja.json`
  - `/apps/web/messages/ko.json`
  - `/apps/web/messages/pt.json`
  - `/apps/web/messages/ru.json`
  - `/apps/web/messages/th.json`
  - `/apps/web/messages/tr.json`
  - `/apps/web/messages/uk.json`
  - `/apps/web/messages/ur.json`
  - `/apps/web/messages/vi.json`
  - `/apps/web/messages/fr.json`

#### Data Structure Definition

```typescript
interface Organization {
  id: string;
  name: string;
  tagline: string;
  description: string;
  focus: string;
  logo: string;
  contributions: string[];
  website?: string;
  status: 'active' | 'development' | 'research';
  color: {
    from: string;
    to: string;
  };
}

const organizations: Organization[] = [
  {
    id: 'dubheos',
    name: 'DubheOS',
    tagline: 'Global Decentralized Community',
    description: 'Contributing ecosystem toolchain and infrastructure for the Move blockchain ecosystem',
    focus: 'Community & Ecosystem Development',
    logo: '/mediakit/dubheos/logo.png',
    contributions: [
      'Community governance framework',
      'Ecosystem toolchain development',
      'Developer resource coordination',
      'Cross-chain protocol standards'
    ],
    status: 'active',
    color: {
      from: 'blue-500',
      to: 'cyan-500'
    }
  },
  {
    id: 'obelisk',
    name: 'Obelisk Labs',
    tagline: 'Core Protocol Development',
    description: 'Leading development of Engine, Channel, and OS protocols for the Dubhe ecosystem',
    focus: 'Protocol Engineering',
    logo: '/mediakit/obelisklabs/svg/light.svg',
    contributions: [
      'Dubhe Engine development',
      'Channel protocol implementation',
      'OS protocol architecture',
      'Core infrastructure systems'
    ],
    status: 'active',
    color: {
      from: 'purple-500',
      to: 'pink-500'
    }
  },
  {
    id: 'cyferio',
    name: 'Cyferio Labs',
    tagline: 'Cryptography & Rollups',
    description: 'Specialized in cryptographic research and rollup technology components for enhanced security',
    focus: 'Cryptography & Privacy',
    logo: '/mediakit/cyferio/logo.png',
    contributions: [
      'Zero-knowledge proof systems',
      'Rollup technology components',
      'Cryptographic protocol design',
      'Privacy-preserving solutions'
    ],
    status: 'active',
    color: {
      from: 'green-500',
      to: 'emerald-500'
    }
  },
  {
    id: 'numeron',
    name: 'Numeron OS',
    tagline: 'Gaming & Integration',
    description: 'Building gaming applications and providing technical integration solutions for entertainment',
    focus: 'Gaming Applications',
    logo: '/mediakit/numeron/logo.png',
    contributions: [
      'Game engine integration',
      'Entertainment platform development',
      'User experience optimization',
      'Technical integration services'
    ],
    status: 'development',
    color: {
      from: 'orange-500',
      to: 'yellow-500'
    }
  }
];
```

### Function Signatures

```typescript
// Main component
function OrganizationsSection(): JSX.Element

// Animation variants for motion
const containerVariants: Variants
const cardVariants: Variants

// Utility functions
const getStatusColor(status: Organization['status']): string
const getStatusLabel(status: Organization['status']): string
```

### API Changes
- **Endpoints**: N/A (Static content component)
- **Request/Response**: N/A
- **Validation Rules**: N/A

### Configuration Changes
- **Settings**: N/A
- **Environment Variables**: N/A
- **Feature Flags**: N/A

## Implementation Sequence

### Phase 1: Component Structure & Data
1. **Create OrganizationsSection.tsx** - Implement basic component structure with TypeScript interfaces
2. **Define organization data** - Create static data array with all 4 organizations
3. **Add basic styling** - Implement responsive grid layout with Tailwind CSS
4. **Test component rendering** - Ensure all organization cards display correctly

### Phase 2: Internationalization & Content
1. **Add English translations** - Update `/apps/web/messages/en.json` with organization content
2. **Create translation structure** - Define consistent key structure for all languages
3. **Add placeholder translations** - Add English content to all 15 other language files
4. **Implement useTranslations hook** - Connect component to next-intl translation system

### Phase 3: Visual Enhancement & Animation
1. **Add Framer Motion animations** - Implement stagger animations for card entrance
2. **Enhance visual design** - Add gradient backgrounds, status indicators, contribution lists
3. **Optimize responsive layout** - Ensure proper display on mobile, tablet, and desktop
4. **Add hover effects** - Interactive states for better user experience

### Phase 4: Integration & Testing
1. **Integrate with HomePage** - Replace or enhance existing CompaniesSection
2. **Test across devices** - Verify responsive behavior and performance
3. **Validate translations** - Ensure all language variants display correctly
4. **Performance optimization** - Optimize images and animations

## Translation Key Structure

```json
{
  "organizations": {
    "section": {
      "badge": "Our Organizations",
      "title": "Building the Future Together",
      "subtitle": "Four specialized organizations working in harmony to advance the Move ecosystem"
    },
    "dubheos": {
      "name": "DubheOS",
      "tagline": "Global Decentralized Community",
      "description": "Contributing ecosystem toolchain and infrastructure for the Move blockchain ecosystem",
      "focus": "Community & Ecosystem Development",
      "contributions": [
        "Community governance framework",
        "Ecosystem toolchain development", 
        "Developer resource coordination",
        "Cross-chain protocol standards"
      ]
    },
    "obelisk": {
      "name": "Obelisk Labs",
      "tagline": "Core Protocol Development",
      "description": "Leading development of Engine, Channel, and OS protocols for the Dubhe ecosystem",
      "focus": "Protocol Engineering",
      "contributions": [
        "Dubhe Engine development",
        "Channel protocol implementation",
        "OS protocol architecture", 
        "Core infrastructure systems"
      ]
    },
    "cyferio": {
      "name": "Cyferio Labs",
      "tagline": "Cryptography & Rollups",
      "description": "Specialized in cryptographic research and rollup technology components for enhanced security",
      "focus": "Cryptography & Privacy",
      "contributions": [
        "Zero-knowledge proof systems",
        "Rollup technology components",
        "Cryptographic protocol design",
        "Privacy-preserving solutions"
      ]
    },
    "numeron": {
      "name": "Numeron OS", 
      "tagline": "Gaming & Integration",
      "description": "Building gaming applications and providing technical integration solutions for entertainment",
      "focus": "Gaming Applications",
      "contributions": [
        "Game engine integration",
        "Entertainment platform development",
        "User experience optimization",
        "Technical integration services"
      ]
    },
    "status": {
      "active": "Active",
      "development": "In Development", 
      "research": "Research Phase"
    },
    "labels": {
      "focus": "Focus Area",
      "contributions": "Key Contributions",
      "status": "Status",
      "website": "Visit Website"
    }
  }
}
```

## Responsive Layout Specifications

### Desktop (1024px+)
- **Layout**: 2x2 grid with equal height cards
- **Card dimensions**: Auto height, max-width constrained
- **Spacing**: 2rem gap between cards
- **Typography**: Full text, large headings

### Tablet (768px - 1023px)
- **Layout**: 2x2 grid, slightly reduced spacing
- **Card dimensions**: Responsive height, full width within container
- **Spacing**: 1.5rem gap between cards
- **Typography**: Medium text, responsive headings

### Mobile (< 768px)
- **Layout**: Single column, stacked vertically
- **Card dimensions**: Full width, optimized height
- **Spacing**: 1rem gap between cards
- **Typography**: Compact text, smaller headings
- **Contributions**: Show first 2 items with "view more" option

### CSS Classes Structure

```css
/* Container */
.organizations-grid {
  @apply grid gap-6 md:gap-8 lg:gap-8;
  @apply grid-cols-1 md:grid-cols-2 lg:grid-cols-2;
  @apply max-w-6xl mx-auto;
}

/* Organization Card */
.organization-card {
  @apply bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6 lg:p-8;
  @apply hover:border-blue-500/50 transition-all duration-300;
  @apply backdrop-blur-sm hover:bg-gray-900/70;
}

/* Card Content */
.card-header {
  @apply flex items-start justify-between mb-4;
}

.card-logo {
  @apply w-12 h-12 lg:w-16 lg:h-16 rounded-xl p-2;
  @apply bg-gradient-to-r flex items-center justify-center;
}

.card-status {
  @apply px-2 py-1 rounded-full text-xs font-medium;
  @apply bg-green-500/10 text-green-400 border border-green-500/20;
}
```

## Code Snippets

### Main Component Structure

```tsx
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import Image from "next/image"
import Section from "../ui/Section"
import Card from "../ui/Card"
import GradientText from "../ui/GradientText"

interface Organization {
  id: string;
  name: string;
  tagline: string;
  description: string;
  focus: string;
  logo: string;
  contributions: string[];
  status: 'active' | 'development' | 'research';
  color: {
    from: string;
    to: string;
  };
}

export default function OrganizationsSection() {
  const t = useTranslations('organizations');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const organizations: Organization[] = [
    {
      id: 'dubheos',
      name: t('dubheos.name'),
      tagline: t('dubheos.tagline'),
      description: t('dubheos.description'),
      focus: t('dubheos.focus'),
      logo: '/mediakit/dubheos/logo.png',
      contributions: [
        t('dubheos.contributions.0'),
        t('dubheos.contributions.1'),
        t('dubheos.contributions.2'),
        t('dubheos.contributions.3')
      ],
      status: 'active',
      color: { from: 'blue-500', to: 'cyan-500' }
    },
    // ... other organizations
  ];

  return (
    <Section
      title={t('section.title')}
      subtitle={t('section.subtitle')}
      label={t('section.badge')}
      maxWidth="xl"
      paddingY="xl"
      showBackground={true}
      backgroundVariant="gradient"
    >
      <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-8 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {organizations.map((org, index) => (
            <OrganizationCard key={org.id} organization={org} index={index} />
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
```

## Validation Plan

### Unit Tests
- **Component Rendering**: Test OrganizationsSection renders with correct number of cards
- **Translation Integration**: Verify useTranslations hook works correctly
- **Responsive Behavior**: Test grid layout at different screen sizes
- **Animation States**: Validate motion animations trigger correctly

### Integration Tests
- **HomePage Integration**: Ensure OrganizationsSection integrates properly with HomePage
- **Language Switching**: Test component updates when language changes
- **Image Loading**: Verify organization logos load correctly
- **Performance**: Test component load time and animation performance

### Business Logic Verification
- **Organization Count**: Verify exactly 4 organizations are displayed
- **Content Accuracy**: Ensure each organization shows correct information
- **Status Indicators**: Validate status badges display appropriate colors/text
- **Contribution Lists**: Confirm all contributions display properly
- **Responsive Design**: Test on mobile, tablet, and desktop viewports

## Key Implementation Notes

1. **Existing Infrastructure**: Leverage existing Section, Card, and GradientText components for consistency
2. **Performance**: Use next/image for optimized logo loading and lazy loading
3. **Accessibility**: Ensure proper ARIA labels and keyboard navigation support
4. **SEO**: Use semantic HTML structure for better search engine indexing
5. **Browser Support**: Target modern browsers with CSS Grid and Flexbox fallbacks
6. **Asset Management**: Ensure all organization logos exist in specified paths
7. **Translation Management**: Coordinate with translation team for non-English content
8. **Testing Strategy**: Implement comprehensive testing at component and integration levels

This specification provides a complete blueprint for implementing the 4-organization display feature with proper internationalization, responsive design, and seamless integration with the existing codebase architecture.