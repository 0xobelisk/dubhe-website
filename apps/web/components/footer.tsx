import { ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')
  return (
    <footer role="contentinfo" className="py-16 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Link href="/" className="hover:opacity-80 transition-opacity duration-200">
                <Image 
                  src="/logo/light.png" 
                  alt="Dubhe"
                  width={120}
                  height={32}
                  className="h-8 w-auto object-contain cursor-pointer"
                />
              </Link>
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* Learn */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('sections.learn')}</h4>
            <div className="space-y-2">
              <a href="https://dubhe-docs.obelisk.build/dubhe" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2">
                {t('links.documentation')}
                <ExternalLink className="w-3 h-3" />
              </a>
              <Link href="/papers" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200">
                {t('links.papers')}
              </Link>
            </div>
          </div>

          {/* Build */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('sections.build')}</h4>
            <div className="space-y-2">
              <Link href="/engine" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200">{t('links.engine')}</Link>
              <Link href="/channel" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200">{t('links.channel')}</Link>
              <Link href="/os" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200">{t('links.os')}</Link>
            </div>
          </div>

          {/* Ecosystem */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('sections.ecosystem')}</h4>
            <div className="space-y-2">
              <Link href="/foundation" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200">{t('links.foundation')}</Link>
              <Link href="/labs" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200">{t('links.labs')}</Link>
              <Link href="/grants" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200">{t('links.grants')}</Link>
              <Link href="/incubation" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200">{t('links.incubation')}</Link>
              <Link href="/proposal" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200">{t('links.proposal')}</Link>
            </div>
          </div>

          {/* Media */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('sections.media')}</h4>
            <div className="space-y-2">
              <a href="https://x.com/DubheEngine" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2">
                X
                <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://discord.gg/J76zPyGWau" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2">
                Discord
                <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://t.me/dubheengine" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2">
                Telegram
                <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://github.com/0xobelisk/dubhe" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2">
                GitHub
                <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://www.youtube.com/@DubheEngine" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2">
                YouTube
                <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://medium.com/@dubheengine" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2">
                Medium
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('sections.community')}</h4>
            <div className="space-y-2">
              <Link href="/ambassador" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200">{t('links.ambassador')}</Link>
              <Link href="/moderators" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200">{t('links.moderators')}</Link>
              <Link href="/events" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200">{t('links.events')}</Link>
              <Link href="/contact" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200">{t('links.contact')}</Link>
              <Link href="/media-kit" className="block text-gray-400 hover:text-white text-sm transition-colors duration-200">{t('links.mediaKit')}</Link>
            </div>
          </div>
        </div>

        {/* Legal & Copyright Section - This should be clearly visible */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link 
                href="/privacy" 
                className="text-gray-300 hover:text-purple-400 font-medium transition-colors duration-200 hover:underline"
              >
                {t('links.privacy')}
              </Link>
              <span className="text-gray-600">|</span>
              <Link 
                href="/terms" 
                className="text-gray-300 hover:text-purple-400 font-medium transition-colors duration-200 hover:underline"
              >
                {t('links.terms')}
              </Link>
              <span className="text-gray-600">|</span>
              <Link 
                href="/contact" 
                className="text-gray-300 hover:text-green-400 font-medium transition-colors duration-200 hover:underline"
              >
                {t('links.contact')}
              </Link>
            </div>
            <p className="text-gray-500 text-xs text-center">
              {t('copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}