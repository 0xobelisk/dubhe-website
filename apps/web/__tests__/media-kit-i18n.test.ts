import { describe, it, expect, beforeEach } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

/**
 * Media Kit Internationalization Unit Tests
 * 
 * Validates the Media Kit i18n implementation:
 * - JSON structure validation
 * - Translation key coverage
 * - Critical error resolution (Indonesian MISSING_MESSAGE)
 * - Technical term consistency
 */

// List of locales that should have mediaKit translations
const LOCALES_WITH_MEDIAKIT = [
  'en', // existing reference
  'id', 'bn', 'ha', 'hi', 'ja' // newly implemented
]

// All expected mediaKit translation keys (57 total)
const REQUIRED_MEDIAKIT_KEYS = [
  // Hero section (4 keys)
  'hero.badge',
  'hero.title1', 
  'hero.title2',
  'hero.subtitle',
  'hero.downloadPack',

  // Logo section (14 keys)
  'logo.title',
  'logo.subtitle', 
  'logo.availableFormats',
  'logo.download',
  'logo.dos.title',
  'logo.dos.item1',
  'logo.dos.item2', 
  'logo.dos.item3',
  'logo.dos.item4',
  'logo.donts.title',
  'logo.donts.hide',
  'logo.donts.show',
  'logo.donts.item1',
  'logo.donts.item2',
  'logo.donts.item3',
  'logo.donts.item4',

  // Clearspace section (6 keys)
  'clearspace.title',
  'clearspace.subtitle',
  'clearspace.minimum',
  'clearspace.description',
  'clearspace.specifications',
  'clearspace.spec1',
  'clearspace.spec2',
  'clearspace.spec3',

  // Symbol section (7 keys)
  'symbol.title',
  'symbol.subtitle',
  'symbol.meaning.title',
  'symbol.meaning.description', 
  'symbol.usage.standalone',
  'symbol.usage.standaloneDesc',
  'symbol.usage.app',
  'symbol.usage.appDesc',

  // Partnership section (8 keys)
  'partnership.title',
  'partnership.subtitle',
  'partnership.cobranding',
  'partnership.partnerLogo',
  'partnership.spacing.title',
  'partnership.spacing.rule1',
  'partnership.spacing.rule2', 
  'partnership.spacing.rule3',
  'partnership.approval.title',
  'partnership.approval.description',
  'partnership.approval.contact',

  // Colors section (3 keys)
  'colors.title',
  'colors.subtitle', 
  'colors.base.title',
  'colors.primary.title',

  // Typography section (6 keys)
  'typography.title',
  'typography.subtitle',
  'typography.primary.title',
  'typography.primary.description',
  'typography.mono.title',
  'typography.mono.description',
  'typography.scale.title',

  // Download section (6 keys)
  'download.title',
  'download.subtitle',
  'download.pack.title',
  'download.pack.description',
  'download.pack.button',
  'download.contact.description',
  'download.contact.button'
]

// Technical terms that should remain in English
const TECHNICAL_TERMS = ['SVG', 'PNG', 'RGB', 'HEX', 'Dubhe', 'Move', 'Geist Sans', 'Geist Mono']

describe('Media Kit Internationalization Unit Tests', () => {
  describe('JSON Structure Validation', () => {
    LOCALES_WITH_MEDIAKIT.forEach(locale => {
      it(`should have valid JSON structure for ${locale} locale`, () => {
        const messagesPath = join(process.cwd(), 'apps/web/messages', `${locale}.json`)
        expect(existsSync(messagesPath), `Messages file should exist for locale ${locale}`).toBe(true)
        
        expect(() => {
          const content = readFileSync(messagesPath, 'utf-8')
          JSON.parse(content)
        }, `JSON should be valid for locale ${locale}`).not.toThrow()
      })
    })
  })

  describe('Navigation mediaKit Entry', () => {
    LOCALES_WITH_MEDIAKIT.forEach(locale => {
      it(`should have navigation.mediaKit entry for ${locale} locale`, () => {
        const messagesPath = join(process.cwd(), 'apps/web/messages', `${locale}.json`)
        const content = JSON.parse(readFileSync(messagesPath, 'utf-8'))
        
        expect(content.navigation).toBeDefined()
        expect(content.navigation.mediaKit).toBeDefined()
        expect(typeof content.navigation.mediaKit).toBe('string')
        expect(content.navigation.mediaKit.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Complete mediaKit Translation Coverage', () => {
    LOCALES_WITH_MEDIAKIT.forEach(locale => {
      it(`should have complete mediaKit section for ${locale} locale`, () => {
        const messagesPath = join(process.cwd(), 'apps/web/messages', `${locale}.json`)
        const content = JSON.parse(readFileSync(messagesPath, 'utf-8'))
        
        expect(content.mediaKit).toBeDefined()
        expect(typeof content.mediaKit).toBe('object')
      })

      it(`should have all ${REQUIRED_MEDIAKIT_KEYS.length} required mediaKit keys for ${locale} locale`, () => {
        const messagesPath = join(process.cwd(), 'apps/web/messages', `${locale}.json`)
        const content = JSON.parse(readFileSync(messagesPath, 'utf-8'))
        
        const missingKeys: string[] = []
        
        REQUIRED_MEDIAKIT_KEYS.forEach(key => {
          const keys = key.split('.')
          let current = content.mediaKit
          
          for (const k of keys) {
            if (!current || typeof current !== 'object' || !(k in current)) {
              missingKeys.push(key)
              break
            }
            current = current[k]
          }
        })
        
        if (missingKeys.length > 0) {
          console.error(`Missing keys in ${locale}:`, missingKeys)
        }
        
        expect(missingKeys).toEqual([])
      })
    })
  })

  describe('Indonesian MISSING_MESSAGE Error Resolution', () => {
    it('should resolve Indonesian mediaKit MISSING_MESSAGE error', () => {
      const idMessagesPath = join(process.cwd(), 'apps/web/messages', 'id.json')
      expect(existsSync(idMessagesPath)).toBe(true)
      
      const content = JSON.parse(readFileSync(idMessagesPath, 'utf-8'))
      
      // Verify navigation entry exists
      expect(content.navigation.mediaKit).toBeDefined()
      expect(content.navigation.mediaKit).toBe('Kit Media')
      
      // Verify complete mediaKit section exists
      expect(content.mediaKit).toBeDefined()
      expect(content.mediaKit.hero).toBeDefined()
      expect(content.mediaKit.hero.title1).toBe('Dubhe')
    })
  })

  describe('Technical Terms Consistency', () => {
    LOCALES_WITH_MEDIAKIT.forEach(locale => {
      it(`should maintain technical terms in English for ${locale} locale`, () => {
        const messagesPath = join(process.cwd(), 'apps/web/messages', `${locale}.json`)
        const content = JSON.parse(readFileSync(messagesPath, 'utf-8'))
        
        // Check that Dubhe brand name is preserved
        expect(content.mediaKit.hero.title1).toBe('Dubhe')
        
        // Check that technical font names are preserved in typography section
        if (content.mediaKit.typography?.primary?.description) {
          expect(content.mediaKit.typography.primary.description).toMatch(/Geist Sans/)
        }
        
        if (content.mediaKit.typography?.mono?.description) {
          expect(content.mediaKit.typography.mono.description).toMatch(/Geist Mono/)
        }
      })
    })
  })

  describe('Professional Translation Quality', () => {
    LOCALES_WITH_MEDIAKIT.forEach(locale => {
      it(`should have non-empty translation values for ${locale} locale`, () => {
        const messagesPath = join(process.cwd(), 'apps/web/messages', `${locale}.json`)
        const content = JSON.parse(readFileSync(messagesPath, 'utf-8'))
        
        const checkNonEmpty = (obj: any, path = '') => {
          for (const [key, value] of Object.entries(obj)) {
            const currentPath = path ? `${path}.${key}` : key
            
            if (typeof value === 'string') {
              expect(value.trim().length, 
                `Translation at ${currentPath} should not be empty for locale ${locale}`
              ).toBeGreaterThan(0)
            } else if (typeof value === 'object' && value !== null) {
              checkNonEmpty(value, currentPath)
            }
          }
        }
        
        checkNonEmpty(content.mediaKit)
      })
    })
  })

  describe('Footer mediaKit Link', () => {
    LOCALES_WITH_MEDIAKIT.forEach(locale => {
      it(`should have footer mediaKit entry for ${locale} locale`, () => {
        const messagesPath = join(process.cwd(), 'apps/web/messages', `${locale}.json`)
        const content = JSON.parse(readFileSync(messagesPath, 'utf-8'))
        
        expect(content.footer).toBeDefined()
        expect(content.footer.links).toBeDefined()
        expect(content.footer.links.mediaKit).toBeDefined()
        expect(typeof content.footer.links.mediaKit).toBe('string')
        expect(content.footer.links.mediaKit.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Translation Structure Consistency', () => {
    it('should have consistent structure across all locales', () => {
      const structures: { [locale: string]: string[] } = {}
      
      LOCALES_WITH_MEDIAKIT.forEach(locale => {
        const messagesPath = join(process.cwd(), 'apps/web/messages', `${locale}.json`)
        const content = JSON.parse(readFileSync(messagesPath, 'utf-8'))
        
        const extractKeys = (obj: any, prefix = ''): string[] => {
          const keys: string[] = []
          for (const [key, value] of Object.entries(obj)) {
            const fullKey = prefix ? `${prefix}.${key}` : key
            if (typeof value === 'object' && value !== null) {
              keys.push(...extractKeys(value, fullKey))
            } else {
              keys.push(fullKey)
            }
          }
          return keys.sort()
        }
        
        structures[locale] = extractKeys(content.mediaKit)
      })
      
      // Compare all structures against English as reference
      const referenceStructure = structures['en']
      LOCALES_WITH_MEDIAKIT.forEach(locale => {
        if (locale !== 'en') {
          expect(structures[locale]).toEqual(referenceStructure)
        }
      })
    })
  })
})