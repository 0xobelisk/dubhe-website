# Media Kit Internationalization Technical Specification

## Problem Statement

- **Business Issue**: The Dubhe website's Media Kit section is experiencing MISSING_MESSAGE errors in non-English locales, specifically in Indonesian ("mediaKit" in locale "id") and 15 other locales, causing broken user experiences for international users seeking brand resources.

- **Current State**: Only English and French locales have complete `mediaKit` translations. The remaining 16 locales are missing both the navigation entry and the complete media kit translation section, causing internationalization errors and preventing users from accessing brand resources in their preferred language.

- **Expected Outcome**: All 17 supported locales will have complete, professionally translated Media Kit sections that enable users worldwide to access Dubhe brand resources, usage guidelines, and partnership materials in their native language.

## Solution Overview

- **Approach**: Systematically add complete `mediaKit` translation sections to 16 missing locale files, following the established English structure and French translation patterns while maintaining consistency with existing internationalization standards.

- **Core Changes**: Add missing navigation entries and complete 50+ translation keys across 8 main sections (hero, logo, clearspace, symbol, partnership, colors, typography, download) to 16 locale files, ensuring technical terms remain in English while user-facing content is properly localized.

- **Success Criteria**: Elimination of MISSING_MESSAGE errors, successful Media Kit page rendering in all supported locales, and professional-quality translations suitable for media partnerships and business use.

## Technical Implementation

### Database Changes
- **No database changes required**: This is a static translation file update

### Code Changes

#### Files to Modify
- `/apps/web/messages/bn.json` (Bengali) - Add missing navigation mediaKit entry and complete mediaKit section
- `/apps/web/messages/ha.json` (Hausa) - Add missing navigation mediaKit entry and complete mediaKit section  
- `/apps/web/messages/hi.json` (Hindi) - Add missing navigation mediaKit entry and complete mediaKit section
- `/apps/web/messages/id.json` (Indonesian) - **Priority**: Add missing navigation mediaKit entry and complete mediaKit section
- `/apps/web/messages/ja.json` (Japanese) - Add missing navigation mediaKit entry and complete mediaKit section
- `/apps/web/messages/ko.json` (Korean) - Add missing navigation mediaKit entry and complete mediaKit section
- `/apps/web/messages/pt.json` (Portuguese) - Add missing navigation mediaKit entry and complete mediaKit section
- `/apps/web/messages/ru.json` (Russian) - Add missing navigation mediaKit entry and complete mediaKit section
- `/apps/web/messages/th.json` (Thai) - Add missing navigation mediaKit entry and complete mediaKit section
- `/apps/web/messages/tr.json` (Turkish) - Add missing navigation mediaKit entry and complete mediaKit section
- `/apps/web/messages/uk.json` (Ukrainian) - Add missing navigation mediaKit entry and complete mediaKit section
- `/apps/web/messages/ur.json` (Urdu) - Add missing navigation mediaKit entry and complete mediaKit section
- `/apps/web/messages/vi.json` (Vietnamese) - Add missing navigation mediaKit entry and complete mediaKit section
- `/apps/web/messages/zh-TW.json` (Traditional Chinese) - Add missing navigation mediaKit entry and complete mediaKit section

#### Translation Structure Required

Each file requires two additions:

**1. Navigation Entry** (add to navigation object):
```json
"navigation": {
  // existing entries...
  "mediaKit": "[Localized translation of 'Media Kit']"
}
```

**2. Complete mediaKit Section** (57 translation keys across 8 sections):

```json
"mediaKit": {
  "hero": {
    "badge": "[Brand Resources]",
    "title1": "Dubhe",
    "title2": "[Media Kit]", 
    "subtitle": "[Download our brand assets, guidelines, and resources for partnerships, media coverage, and community content.]",
    "downloadPack": "[Download Brand Pack]"
  },
  "logo": {
    "title": "[Logo & Brand Assets]",
    "subtitle": "[Our logo represents the innovation and reliability of the Dubhe blockchain platform. Use these assets to maintain brand consistency.]",
    "availableFormats": "[Available formats]",
    "download": "[Download]",
    "dos": {
      "title": "[Logo Usage Guidelines]",
      "item1": "[Use original logo files without modification]",
      "item2": "[Maintain minimum clear space around logo]", 
      "item3": "[Use on high contrast backgrounds]",
      "item4": "[Ensure proper scaling and proportions]"
    },
    "donts": {
      "title": "[Logo Usage Restrictions]",
      "hide": "[Hide restrictions]",
      "show": "[Show restrictions]",
      "item1": "[Don't stretch, distort, or modify the logo]",
      "item2": "[Don't use low resolution or pixelated versions]",
      "item3": "[Don't place on busy or low contrast backgrounds]", 
      "item4": "[Don't recreate the logo with different fonts]"
    }
  },
  "clearspace": {
    "title": "[Clear Space Guidelines]",
    "subtitle": "[Maintain proper spacing around the Dubhe logo to ensure visual impact and brand recognition.]",
    "minimum": "[Minimum Clear Space]",
    "description": "[The Dubhe logo should always be surrounded by clear space to maintain its visual integrity and impact. This clear space is based on the height of the letter 'D' in the logo.]",
    "specifications": "[Technical Specifications]",
    "spec1": "[Minimum clear space: 1x logo height on all sides]",
    "spec2": "[For digital use: minimum 32px height recommended]",
    "spec3": "[For print use: minimum 0.5 inch height recommended]"
  },
  "symbol": {
    "title": "[Symbol & Mark]",
    "subtitle": "[The Dubhe symbol can be used independently when the full logo is not suitable or space is limited.]",
    "meaning": {
      "title": "[Symbol Meaning]",
      "description": "[The Dubhe symbol represents the constellation that guides navigation, symbolizing our role in guiding developers through the blockchain ecosystem with reliable and innovative tools.]"
    },
    "usage": {
      "standalone": "[Standalone Usage]",
      "standaloneDesc": "[Use when space is limited or brand recognition is established]",
      "app": "[App Icons]",
      "appDesc": "[Perfect for mobile apps, favicons, and small format applications]"
    }
  },
  "partnership": {
    "title": "[Partnership Guidelines]",
    "subtitle": "[Guidelines for co-branding and partnership materials to ensure consistent brand presentation.]",
    "cobranding": "[Co-branding Example]",
    "partnerLogo": "[Partner Logo]",
    "spacing": {
      "title": "[Logo Spacing Rules]",
      "rule1": "[Maintain equal visual weight between logos]",
      "rule2": "[Use separator line or adequate white space]",
      "rule3": "[Align logos on the same baseline]"
    },
    "approval": {
      "title": "[Partnership Approval]",
      "description": "[All partnership and co-branding materials require approval from the Dubhe team before publication.]",
      "contact": "[Contact for Approval]"
    }
  },
  "colors": {
    "title": "[Color Palette]",
    "subtitle": "[Our color system creates a cohesive and accessible brand experience across all touchpoints.]",
    "base": {
      "title": "[Base Colors]"
    },
    "primary": {
      "title": "[Primary Brand Colors]"
    }
  },
  "typography": {
    "title": "[Typography]",
    "subtitle": "[Our typography system ensures consistent and readable communication across all brand materials.]",
    "primary": {
      "title": "[Primary Typeface]",
      "description": "[Geist Sans is our primary typeface for all brand communications]"
    },
    "mono": {
      "title": "[Monospace Typeface]", 
      "description": "[Geist Mono is used for code, technical documentation, and developer content]"
    },
    "scale": {
      "title": "[Typography Scale]"
    }
  },
  "download": {
    "title": "[Download Resources]",
    "subtitle": "[Access all brand assets, guidelines, and resources in one convenient package.]",
    "pack": {
      "title": "[Complete Brand Pack]",
      "description": "[Includes logos, color palettes, typography guidelines, and usage examples in multiple formats.]",
      "button": "[Download Brand Pack]"
    },
    "contact": {
      "description": "[Need custom assets or have questions?]",
      "button": "[Contact Our Team]"
    }
  }
}
```

#### Language-Specific Translation Guidelines

**Technical Terms to Keep in English:**
- SVG, PNG, RGB, HEX (file formats and color codes)
- Dubhe, Move (brand names)
- Geist Sans, Geist Mono (font names)

**Professional Business Tone Requirements:**
- Use formal, professional language appropriate for media partnerships
- Maintain consistency with existing translations in each locale
- Focus on clarity and actionable guidance for brand asset usage

### API Changes
- **No API changes required**: Static translation files only

### Configuration Changes
- **No configuration changes required**: Standard next-intl internationalization pattern

## Implementation Sequence

### Phase 1: Priority Fix (Indonesian)
**Target:** Resolve immediate MISSING_MESSAGE error
- Add missing navigation entry: `"mediaKit": "Kit Media"` to `/apps/web/messages/id.json`
- Add complete mediaKit section with professional Indonesian translations
- Verify error resolution and page rendering

### Phase 2: Asian Locales  
**Target:** Complete CJK and Southeast Asian translations
- `/apps/web/messages/ja.json` - Japanese translations using polite keigo forms for business context
- `/apps/web/messages/ko.json` - Korean translations using formal business language
- `/apps/web/messages/zh-TW.json` - Traditional Chinese with Taiwan-appropriate terminology
- `/apps/web/messages/th.json` - Thai translations with appropriate formal register
- `/apps/web/messages/vi.json` - Vietnamese translations with business-appropriate formality

### Phase 3: South Asian & Middle Eastern Locales
**Target:** Complete Indic and Arabic script translations  
- `/apps/web/messages/hi.json` - Hindi translations with formal business Hindi
- `/apps/web/messages/bn.json` - Bengali translations appropriate for business context
- `/apps/web/messages/ur.json` - Urdu translations using formal business register

### Phase 4: European & African Locales
**Target:** Complete remaining European and African translations
- `/apps/web/messages/ru.json` - Russian translations with formal business tone
- `/apps/web/messages/uk.json` - Ukrainian translations distinguishing from Russian where appropriate
- `/apps/web/messages/tr.json` - Turkish translations with appropriate business formality
- `/apps/web/messages/pt.json` - Portuguese translations (Brazilian Portuguese preferred)
- `/apps/web/messages/ha.json` - Hausa translations with appropriate cultural context

Each phase should be independently deployable and testable.

## Validation Plan

### Unit Tests
- **Navigation Translation Tests**: Verify all locales have mediaKit navigation entry
- **Translation Key Coverage Tests**: Ensure all 57 mediaKit keys exist in each locale
- **JSON Syntax Tests**: Validate JSON structure integrity for all modified files

### Integration Tests  
- **Page Rendering Tests**: Verify Media Kit page loads without MISSING_MESSAGE errors in all locales
- **Locale Switching Tests**: Test navigation between locales maintains Media Kit access
- **Content Display Tests**: Verify proper rendering of all sections in each language

### Business Logic Verification
- **Professional Quality Assessment**: Review translations for business partnership suitability
- **Brand Consistency Check**: Ensure translations maintain Dubhe brand voice and messaging
- **Cultural Appropriateness Review**: Validate translations are culturally appropriate for each locale
- **Partnership Use Case Testing**: Verify translations support actual media partnership scenarios

### Error Resolution Validation
- **MISSING_MESSAGE Error Elimination**: Confirm no remaining mediaKit translation errors
- **Console Error Monitoring**: Verify clean console output for all locale/mediaKit combinations
- **Production Environment Testing**: Validate fixes work across development, staging, and production

## Key Constraints

### MUST Requirements
- **Complete 57-Key Structure**: Every locale must implement the full mediaKit structure matching English/French patterns
- **Professional Quality**: All translations must be suitable for business partnerships and media use
- **Technical Term Consistency**: Keep Dubhe, Move, SVG, PNG, RGB, HEX, and font names in English across all locales
- **JSON Structure Integrity**: Maintain exact same nested structure as English reference implementation

### MUST NOT Requirements  
- **No Structural Changes**: Don't modify the established mediaKit section structure from English
- **No Technical Term Translation**: Don't translate file formats, color codes, or brand names
- **No Casual Language**: Don't use informal or casual language - maintain professional business tone
- **No Incomplete Implementations**: Don't add partial mediaKit sections - implement complete structure or none

This comprehensive specification addresses the immediate MISSING_MESSAGE error while establishing complete Media Kit internationalization across all supported locales, enabling professional brand resource access for Dubhe's global community.