'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { routing } from '../i18n/routing';

interface LanguageInfo {
  code: string;
  name: string;
  nativeName: string;
  translatedPercentage: number;
  wordCount: number;
}

const LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', translatedPercentage: 100, wordCount: 2850 },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', translatedPercentage: 100, wordCount: 2850 },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', translatedPercentage: 100, wordCount: 2850 },
  { code: 'ko', name: 'Korean', nativeName: '한국어', translatedPercentage: 100, wordCount: 2850 },
  { code: 'zh-TW', name: 'Chinese Traditional', nativeName: '繁體中文', translatedPercentage: 100, wordCount: 2850 },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', translatedPercentage: 100, wordCount: 2850 },
  { code: 'fr', name: 'French', nativeName: 'Français', translatedPercentage: 100, wordCount: 2850 },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', translatedPercentage: 100, wordCount: 2850 },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', translatedPercentage: 100, wordCount: 2850 },
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa', translatedPercentage: 100, wordCount: 2850 },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', translatedPercentage: 100, wordCount: 2850 },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', translatedPercentage: 100, wordCount: 2850 },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', translatedPercentage: 100, wordCount: 2850 },
  { code: 'th', name: 'Thai', nativeName: 'ภาษาไทย', translatedPercentage: 100, wordCount: 2850 },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', translatedPercentage: 100, wordCount: 2850 },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', translatedPercentage: 100, wordCount: 2850 },
];

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = LANGUAGES.find(lang => lang.code === locale) || LANGUAGES[0];

  const filteredLanguages = LANGUAGES.filter(lang => 
    lang.name.toLowerCase().includes(filter.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function onLanguageChange(languageCode: string) {
    const newPathname = pathname.replace(`/${locale}`, `/${languageCode}`);
    router.replace(newPathname);
    setIsOpen(false);
    setFilter('');
  }

  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    if (percentage >= 20) return 'bg-orange-500';
    return 'bg-red-400';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Current Language Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-300 bg-slate-800/50 border border-slate-700 rounded-lg hover:bg-slate-700/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="mr-2">🌐</span>
        <span className="mr-2">Languages</span>
        <span className="font-semibold text-purple-400">{locale.toUpperCase()}</span>
        <svg
          className={`ml-2 h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-96 bg-slate-800/95 backdrop-blur-md rounded-lg shadow-xl border border-slate-700 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-slate-700">
            <h3 className="text-sm font-medium text-slate-400 mb-2">
              Filter list ({filteredLanguages.length} languages)
            </h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Type to filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-md text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <span className="absolute right-3 top-2 text-slate-500 text-sm">\\</span>
            </div>
          </div>

          {/* Language List */}
          <div className="max-h-64 overflow-y-auto">
            {filteredLanguages.map((language) => (
              <button
                key={language.code}
                onClick={() => onLanguageChange(language.code)}
                className={`w-full px-4 py-3 text-left hover:bg-slate-700/50 border-b border-slate-700/50 last:border-b-0 transition-colors duration-200 ${
                  language.code === locale ? 'bg-purple-900/30' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h4 className="font-medium text-purple-400 text-sm">
                        {language.nativeName}
                      </h4>
                      {language.code === locale && (
                        <svg className="ml-2 h-4 w-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 uppercase font-medium mt-1">
                      {language.name}
                    </p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-slate-400">
                        {language.translatedPercentage}% translated • {language.wordCount.toLocaleString()} words
                      </span>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="ml-4">
                    <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getProgressBarColor(language.translatedPercentage)} transition-all duration-300`}
                        style={{ width: `${language.translatedPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

        </div>
      )}
    </div>
  );
}