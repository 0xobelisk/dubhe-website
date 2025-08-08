'use client';

import {useLocale, useTranslations} from 'next-intl';
import {usePathname, useRouter} from 'next/navigation';
import {routing} from '../i18n/routing';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onSelectChange(nextLocale: string) {
    const newPathname = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.replace(newPathname);
  }

  return (
    <label className="border-2 rounded">
      <p className="sr-only">{t('label')}</p>
      <select
        className="inline-flex appearance-none bg-transparent py-3 pl-2 pr-6"
        defaultValue={locale}
        onChange={(e) => onSelectChange(e.target.value)}
      >
        {routing.locales.map((cur) => {
          const getLanguageName = (locale: string) => {
            const names: { [key: string]: string } = {
              'en': 'English',
              'id': 'Bahasa Indonesia',
              'vi': 'Tiếng Việt',
              'ko': '한국어',
              'zh-TW': '繁體中文',
              'ja': '日本語',
              'fr': 'Français',
              'ru': 'Русский',
              'hi': 'हिन्दी',
              'ha': 'Hausa',
              'ur': 'اردو',
              'uk': 'Українська',
              'tr': 'Türkçe',
              'th': 'ภาษาไทย',
              'pt': 'Português',
              'bn': 'বাংলা'
            }
            return names[locale] || locale
          }
          
          return (
            <option key={cur} value={cur}>
              {getLanguageName(cur)}
            </option>
          )
        })}
      </select>
    </label>
  );
}