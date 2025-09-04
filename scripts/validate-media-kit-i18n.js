#!/usr/bin/env node

/**
 * Media Kit Internationalization Validation Script
 * 
 * Automated validation of Media Kit translations:
 * - Translation completeness check
 * - JSON structure validation
 * - Technical term consistency
 * - Unicode character validation
 * - Business quality assessment
 */

const { readFileSync, existsSync } = require('fs')
const { join } = require('path')

const MESSAGES_DIR = join(process.cwd(), 'apps/web/messages')

// Locales that should have mediaKit translations
const REQUIRED_LOCALES = [
  'en', // existing reference
  'id', 'bn', 'ha', 'hi', 'ja' // newly implemented
]

// Expected mediaKit translation keys (57 total)
const REQUIRED_KEYS = [
  'hero.badge', 'hero.title1', 'hero.title2', 'hero.subtitle', 'hero.downloadPack',
  'logo.title', 'logo.subtitle', 'logo.availableFormats', 'logo.download',
  'logo.dos.title', 'logo.dos.item1', 'logo.dos.item2', 'logo.dos.item3', 'logo.dos.item4',
  'logo.donts.title', 'logo.donts.hide', 'logo.donts.show', 'logo.donts.item1', 'logo.donts.item2', 'logo.donts.item3', 'logo.donts.item4',
  'clearspace.title', 'clearspace.subtitle', 'clearspace.minimum', 'clearspace.description', 'clearspace.specifications', 'clearspace.spec1', 'clearspace.spec2', 'clearspace.spec3',
  'symbol.title', 'symbol.subtitle', 'symbol.meaning.title', 'symbol.meaning.description', 'symbol.usage.standalone', 'symbol.usage.standaloneDesc', 'symbol.usage.app', 'symbol.usage.appDesc',
  'partnership.title', 'partnership.subtitle', 'partnership.cobranding', 'partnership.partnerLogo', 'partnership.spacing.title', 'partnership.spacing.rule1', 'partnership.spacing.rule2', 'partnership.spacing.rule3', 'partnership.approval.title', 'partnership.approval.description', 'partnership.approval.contact',
  'colors.title', 'colors.subtitle', 'colors.base.title', 'colors.primary.title',
  'typography.title', 'typography.subtitle', 'typography.primary.title', 'typography.primary.description', 'typography.mono.title', 'typography.mono.description', 'typography.scale.title',
  'download.title', 'download.subtitle', 'download.pack.title', 'download.pack.description', 'download.pack.button', 'download.contact.description', 'download.contact.button'
]

// Technical terms that should remain in English
const TECHNICAL_TERMS = ['SVG', 'PNG', 'RGB', 'HEX', 'Dubhe', 'Move', 'Geist Sans', 'Geist Mono']

// Unicode ranges for different scripts
const UNICODE_RANGES = {
  bengali: /[\u0980-\u09FF]/,
  hindi: /[\u0900-\u097F]/,
  japanese: /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/,
  arabic: /[\u0600-\u06FF]/ // For Urdu if needed
}

class ValidationResult {
  constructor() {
    this.errors = []
    this.warnings = []
    this.successes = []
  }

  addError(message) {
    this.errors.push(`❌ ${message}`)
  }

  addWarning(message) {
    this.warnings.push(`⚠️  ${message}`)
  }

  addSuccess(message) {
    this.successes.push(`✅ ${message}`)
  }

  hasErrors() {
    return this.errors.length > 0
  }

  print() {
    console.log('\n🔍 Media Kit Internationalization Validation Results\n')
    
    if (this.successes.length > 0) {
      console.log('Successes:')
      this.successes.forEach(success => console.log(`  ${success}`))
      console.log()
    }

    if (this.warnings.length > 0) {
      console.log('Warnings:')
      this.warnings.forEach(warning => console.log(`  ${warning}`))
      console.log()
    }

    if (this.errors.length > 0) {
      console.log('Errors:')
      this.errors.forEach(error => console.log(`  ${error}`))
      console.log()
      console.log('❌ Validation FAILED')
      return false
    }

    console.log('✅ Validation PASSED')
    return true
  }
}

function loadLocaleMessages(locale) {
  const filePath = join(MESSAGES_DIR, `${locale}.json`)
  
  if (!existsSync(filePath)) {
    throw new Error(`Messages file not found: ${filePath}`)
  }

  try {
    const content = readFileSync(filePath, 'utf-8')
    return JSON.parse(content)
  } catch (error) {
    throw new Error(`Invalid JSON in ${locale}.json: ${error.message}`)
  }
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => {
    return current && typeof current === 'object' ? current[key] : undefined
  }, obj)
}

function validateJsonStructure(result) {
  console.log('📋 Validating JSON structure...')
  
  for (const locale of REQUIRED_LOCALES) {
    try {
      const messages = loadLocaleMessages(locale)
      result.addSuccess(`JSON structure valid for ${locale}`)
    } catch (error) {
      result.addError(`JSON structure invalid for ${locale}: ${error.message}`)
    }
  }
}

function validateNavigationEntries(result) {
  console.log('🧭 Validating navigation entries...')
  
  for (const locale of REQUIRED_LOCALES) {
    try {
      const messages = loadLocaleMessages(locale)
      
      if (!messages.navigation || !messages.navigation.mediaKit) {
        result.addError(`Missing navigation.mediaKit entry for ${locale}`)
      } else if (typeof messages.navigation.mediaKit !== 'string' || messages.navigation.mediaKit.trim().length === 0) {
        result.addError(`Invalid navigation.mediaKit entry for ${locale}: must be non-empty string`)
      } else {
        result.addSuccess(`Navigation entry present for ${locale}: "${messages.navigation.mediaKit}"`)
      }
    } catch (error) {
      result.addError(`Could not validate navigation for ${locale}: ${error.message}`)
    }
  }
}

function validateMediaKitSections(result) {
  console.log('📱 Validating mediaKit sections...')
  
  for (const locale of REQUIRED_LOCALES) {
    try {
      const messages = loadLocaleMessages(locale)
      
      if (!messages.mediaKit) {
        result.addError(`Missing mediaKit section for ${locale}`)
        continue
      }

      const missingKeys = []
      for (const key of REQUIRED_KEYS) {
        const value = getNestedValue(messages.mediaKit, key)
        if (value === undefined || value === null) {
          missingKeys.push(key)
        } else if (typeof value === 'string' && value.trim().length === 0) {
          result.addWarning(`Empty translation for ${locale}.mediaKit.${key}`)
        }
      }

      if (missingKeys.length > 0) {
        result.addError(`Missing mediaKit keys for ${locale}: ${missingKeys.join(', ')}`)
      } else {
        result.addSuccess(`All ${REQUIRED_KEYS.length} mediaKit keys present for ${locale}`)
      }
    } catch (error) {
      result.addError(`Could not validate mediaKit section for ${locale}: ${error.message}`)
    }
  }
}

function validateTechnicalTerms(result) {
  console.log('🔧 Validating technical terms...')
  
  const criticalTerms = ['Dubhe', 'Geist Sans', 'Geist Mono']
  
  for (const locale of REQUIRED_LOCALES) {
    try {
      const messages = loadLocaleMessages(locale)
      
      if (!messages.mediaKit) continue

      // Check Dubhe brand name in hero
      const heroTitle1 = getNestedValue(messages.mediaKit, 'hero.title1')
      if (heroTitle1 !== 'Dubhe') {
        result.addError(`Brand name should be 'Dubhe' in ${locale}.mediaKit.hero.title1, found: "${heroTitle1}"`)
      } else {
        result.addSuccess(`Brand name correctly preserved for ${locale}`)
      }

      // Check font names in typography section
      const primaryDesc = getNestedValue(messages.mediaKit, 'typography.primary.description')
      const monoDesc = getNestedValue(messages.mediaKit, 'typography.mono.description')
      
      if (primaryDesc && !primaryDesc.includes('Geist Sans')) {
        result.addWarning(`'Geist Sans' not found in ${locale} typography.primary.description`)
      }
      
      if (monoDesc && !monoDesc.includes('Geist Mono')) {
        result.addWarning(`'Geist Mono' not found in ${locale} typography.mono.description`)
      }
      
    } catch (error) {
      result.addError(`Could not validate technical terms for ${locale}: ${error.message}`)
    }
  }
}

function validateUnicodeSupport(result) {
  console.log('🌍 Validating Unicode support...')
  
  const unicodeTests = {
    'bn': { range: UNICODE_RANGES.bengali, name: 'Bengali' },
    'hi': { range: UNICODE_RANGES.hindi, name: 'Hindi' },
    'ja': { range: UNICODE_RANGES.japanese, name: 'Japanese' }
  }

  for (const [locale, { range, name }] of Object.entries(unicodeTests)) {
    if (!REQUIRED_LOCALES.includes(locale)) continue
    
    try {
      const messages = loadLocaleMessages(locale)
      
      if (!messages.mediaKit) continue

      let hasUnicodeContent = false
      
      // Check a few key fields for Unicode characters
      const testKeys = ['hero.subtitle', 'logo.title', 'colors.title']
      
      for (const key of testKeys) {
        const value = getNestedValue(messages.mediaKit, key)
        if (typeof value === 'string' && range.test(value)) {
          hasUnicodeContent = true
          break
        }
      }
      
      if (hasUnicodeContent) {
        result.addSuccess(`${name} Unicode characters detected for ${locale}`)
      } else {
        result.addWarning(`No ${name} Unicode characters detected in ${locale} - verify translation quality`)
      }
      
    } catch (error) {
      result.addError(`Could not validate Unicode support for ${locale}: ${error.message}`)
    }
  }
}

function validateFooterLinks(result) {
  console.log('🦶 Validating footer links...')
  
  for (const locale of REQUIRED_LOCALES) {
    try {
      const messages = loadLocaleMessages(locale)
      
      if (!messages.footer || !messages.footer.links || !messages.footer.links.mediaKit) {
        result.addError(`Missing footer.links.mediaKit entry for ${locale}`)
      } else if (typeof messages.footer.links.mediaKit !== 'string' || messages.footer.links.mediaKit.trim().length === 0) {
        result.addError(`Invalid footer.links.mediaKit entry for ${locale}: must be non-empty string`)
      } else {
        result.addSuccess(`Footer link present for ${locale}: "${messages.footer.links.mediaKit}"`)
      }
    } catch (error) {
      result.addError(`Could not validate footer links for ${locale}: ${error.message}`)
    }
  }
}

function validateIndonesianErrorFix(result) {
  console.log('🇮🇩 Validating Indonesian error fix...')
  
  try {
    const messages = loadLocaleMessages('id')
    
    // Check navigation entry
    if (messages.navigation?.mediaKit !== 'Kit Media') {
      result.addError(`Indonesian navigation.mediaKit should be 'Kit Media', found: "${messages.navigation?.mediaKit}"`)
    } else {
      result.addSuccess('Indonesian navigation entry correctly set')
    }
    
    // Check that mediaKit section exists and has content
    if (!messages.mediaKit) {
      result.addError('Indonesian mediaKit section missing')
    } else if (!messages.mediaKit.hero || !messages.mediaKit.hero.title1) {
      result.addError('Indonesian mediaKit.hero section incomplete')
    } else {
      result.addSuccess('Indonesian mediaKit section properly implemented')
    }
    
    // Spot check a few Indonesian translations
    const sampleTranslations = {
      'hero.badge': 'Sumber Daya Merek',
      'hero.title2': 'Kit Media',
      'logo.download': 'Unduh'
    }
    
    for (const [key, expected] of Object.entries(sampleTranslations)) {
      const value = getNestedValue(messages.mediaKit, key)
      if (value === expected) {
        result.addSuccess(`Indonesian translation verified: ${key}`)
      } else {
        result.addWarning(`Indonesian translation for ${key} may need review: expected "${expected}", found "${value}"`)
      }
    }
    
  } catch (error) {
    result.addError(`Could not validate Indonesian error fix: ${error.message}`)
  }
}

function validateStructuralConsistency(result) {
  console.log('📐 Validating structural consistency...')
  
  try {
    const referenceMessages = loadLocaleMessages('en')
    const referenceStructure = extractStructure(referenceMessages.mediaKit)
    
    for (const locale of REQUIRED_LOCALES) {
      if (locale === 'en') continue
      
      const messages = loadLocaleMessages(locale)
      if (!messages.mediaKit) continue
      
      const localeStructure = extractStructure(messages.mediaKit)
      
      const structureDiff = compareStructures(referenceStructure, localeStructure)
      
      if (structureDiff.length === 0) {
        result.addSuccess(`Structure consistent for ${locale}`)
      } else {
        result.addError(`Structure inconsistent for ${locale}: ${structureDiff.join(', ')}`)
      }
    }
    
  } catch (error) {
    result.addError(`Could not validate structural consistency: ${error.message}`)
  }
}

function extractStructure(obj, prefix = '') {
  const keys = []
  
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    
    if (typeof value === 'object' && value !== null) {
      keys.push(...extractStructure(value, fullKey))
    } else {
      keys.push(fullKey)
    }
  }
  
  return keys.sort()
}

function compareStructures(reference, target) {
  const missing = reference.filter(key => !target.includes(key))
  const extra = target.filter(key => !reference.includes(key))
  
  const differences = []
  if (missing.length > 0) {
    differences.push(`missing: ${missing.join(', ')}`)
  }
  if (extra.length > 0) {
    differences.push(`extra: ${extra.join(', ')}`)
  }
  
  return differences
}

// Main validation function
async function validateMediaKitI18n() {
  const result = new ValidationResult()
  
  console.log('🚀 Starting Media Kit Internationalization Validation')
  console.log(`📍 Messages directory: ${MESSAGES_DIR}`)
  console.log(`🌐 Testing locales: ${REQUIRED_LOCALES.join(', ')}`)
  console.log(`🔑 Expecting ${REQUIRED_KEYS.length} mediaKit keys per locale\n`)
  
  try {
    validateJsonStructure(result)
    validateNavigationEntries(result)
    validateMediaKitSections(result)
    validateTechnicalTerms(result)
    validateUnicodeSupport(result)
    validateFooterLinks(result)
    validateIndonesianErrorFix(result)
    validateStructuralConsistency(result)
    
    const success = result.print()
    
    // Print summary statistics
    console.log('\n📊 Summary:')
    console.log(`   Locales tested: ${REQUIRED_LOCALES.length}`)
    console.log(`   Keys per locale: ${REQUIRED_KEYS.length}`)
    console.log(`   Total translations: ${REQUIRED_LOCALES.length * REQUIRED_KEYS.length}`)
    console.log(`   Success rate: ${result.successes.length}/${result.successes.length + result.errors.length + result.warnings.length}`)
    
    process.exit(success ? 0 : 1)
    
  } catch (error) {
    console.error('\n💥 Validation failed with error:', error.message)
    process.exit(1)
  }
}

// Run validation if called directly
if (require.main === module) {
  validateMediaKitI18n()
}

module.exports = {
  validateMediaKitI18n,
  REQUIRED_LOCALES,
  REQUIRED_KEYS,
  TECHNICAL_TERMS
}