"use client"

import { motion } from "framer-motion"
import { useTranslations } from 'next-intl'

export default function HeroContent() {
  const t = useTranslations('home')
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-8 max-w-2xl"
    >
      {/* Logo placeholder */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-8"
      >
        {/* Logo can be added here if needed */}
      </motion.div>

      {/* Main Headline */}
      <div className="space-y-6">
        <motion.h1 
          className="text-5xl lg:text-6xl font-bold text-white leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t('hero.title1')}
          <br />
          {t('hero.title2')}
          <br />
        </motion.h1>
        
        <motion.p 
          className="text-lg text-blue-100 max-w-xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {t('hero.subtitle')}
        </motion.p>
      </div>

      {/* CTA Buttons */}
      <motion.div 
        className="flex flex-col sm:flex-row gap-4 pt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <a 
          href="https://github.com/0xobelisk/dubhe" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-block text-center"
        >
          {t('hero.cta1')}
        </a>
        
        <a 
          href="https://github.com/0xobelisk/Dubhe/tree/main?tab=License-1-ov-file#readme" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="border-2 border-blue-400/50 hover:border-blue-300 bg-blue-900/20 backdrop-blur-sm text-blue-100 hover:text-white hover:bg-blue-800/30 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 inline-block text-center"
        >
          {t('hero.cta2')}
        </a>
      </motion.div>
    </motion.div>
  )
}