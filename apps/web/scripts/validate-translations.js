#!/usr/bin/env node

/**
 * Translation validation script for Weblate integration
 * Ensures all language files have identical JSON structure
 */

import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MESSAGES_DIR = join(__dirname, '../messages');
const TEMPLATE_FILE = 'en.json';

function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    keys.push(fullKey);
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys.push(...getAllKeys(value, fullKey));
    }
  }
  return keys.sort();
}

function validateTranslations() {
  try {
    // Read template file (English)
    const templatePath = join(MESSAGES_DIR, TEMPLATE_FILE);
    const templateContent = JSON.parse(readFileSync(templatePath, 'utf8'));
    const templateKeys = getAllKeys(templateContent);

    console.log(`📋 Template (${TEMPLATE_FILE}) has ${templateKeys.length} keys`);

    // Get all translation files
    const files = readdirSync(MESSAGES_DIR)
      .filter(file => file.endsWith('.json'))
      .filter(file => file !== TEMPLATE_FILE);

    let hasErrors = false;
    const results = [];

    for (const file of files) {
      const filePath = join(MESSAGES_DIR, file);
      try {
        const content = JSON.parse(readFileSync(filePath, 'utf8'));
        const keys = getAllKeys(content);
        
        const missing = templateKeys.filter(key => !keys.includes(key));
        const extra = keys.filter(key => !templateKeys.includes(key));
        
        const status = missing.length === 0 && extra.length === 0 ? '✅' : '❌';
        
        results.push({
          file,
          status,
          keys: keys.length,
          missing: missing.length,
          extra: extra.length,
          missingKeys: missing,
          extraKeys: extra
        });

        if (missing.length > 0 || extra.length > 0) {
          hasErrors = true;
        }

      } catch (error) {
        console.error(`❌ Error parsing ${file}:`, error.message);
        hasErrors = true;
      }
    }

    // Display results
    console.log('\n📊 Translation Validation Results:');
    console.log('═'.repeat(60));
    
    for (const result of results) {
      console.log(`${result.status} ${result.file} - ${result.keys} keys`);
      if (result.missing.length > 0) {
        console.log(`   Missing: ${result.missing.length} keys`);
        result.missingKeys.slice(0, 5).forEach(key => console.log(`     - ${key}`));
        if (result.missing.length > 5) {
          console.log(`     ... and ${result.missing.length - 5} more`);
        }
      }
      if (result.extra.length > 0) {
        console.log(`   Extra: ${result.extra.length} keys`);
        result.extraKeys.slice(0, 5).forEach(key => console.log(`     + ${key}`));
        if (result.extra.length > 5) {
          console.log(`     ... and ${result.extra.length - 5} more`);
        }
      }
    }

    const passedFiles = results.filter(r => r.status === '✅').length;
    const totalFiles = results.length;
    
    console.log('\n📈 Summary:');
    console.log(`✅ Passed: ${passedFiles}/${totalFiles} files`);
    console.log(`📝 Template keys: ${templateKeys.length}`);
    
    if (hasErrors) {
      console.log('\n🚨 Translation validation failed!');
      process.exit(1);
    } else {
      console.log('\n🎉 All translation files are valid!');
      process.exit(0);
    }

  } catch (error) {
    console.error('❌ Validation script error:', error.message);
    process.exit(1);
  }
}

validateTranslations();