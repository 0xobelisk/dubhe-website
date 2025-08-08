import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: [
    'en',        // English
    'id',        // Indonesian
    'vi',        // Vietnamese
    'ko',        // Korean
    'zh-TW',     // Chinese Traditional
    'ja',        // Japanese
    'fr',        // French
    'ru',        // Russian
    'hi',        // Hindi (India)
    'ha',        // Hausa (Nigeria)
    'ur',        // Urdu (Pakistan)
    'uk',        // Ukrainian
    'tr',        // Turkish
    'th',        // Thai (Thailand)
    'pt',        // Portuguese
    'bn'         // Bengali (Bangladesh)
  ],
  defaultLocale: 'en'
});