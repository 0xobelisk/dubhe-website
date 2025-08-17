"use client"

import { motion } from "framer-motion"
import { useTranslations } from 'next-intl'
import { FileText, Scale, Shield, AlertTriangle, CheckCircle, Globe } from "lucide-react"

export default function TermsPage() {
  const t = useTranslations('terms')
  const sections = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: t('sections.acceptance.title'),
      content: [
        t('sections.acceptance.items.0'),
        t('sections.acceptance.items.1'),
        t('sections.acceptance.items.2'),
        t('sections.acceptance.items.3')
      ]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t('sections.usage.title'),
      content: [
        t('sections.usage.items.0'),
        t('sections.usage.items.1'),
        t('sections.usage.items.2'),
        t('sections.usage.items.3')
      ]
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: t('sections.intellectual.title'),
      content: [
        t('sections.intellectual.items.0'),
        t('sections.intellectual.items.1'),
        t('sections.intellectual.items.2'),
        t('sections.intellectual.items.3')
      ]
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: t('sections.disclaimers.title'),
      content: [
        t('sections.disclaimers.items.0'),
        t('sections.disclaimers.items.1'),
        t('sections.disclaimers.items.2'),
        t('sections.disclaimers.items.3')
      ]
    }
  ]

  return (
    <>
      
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 overflow-hidden pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/30 to-indigo-500/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-br from-indigo-600/30 to-purple-600/40 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div className="text-center">
              
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-block bg-purple-500/10 text-purple-400 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-purple-500/20"
              >
                <FileText className="w-4 h-4 inline mr-2" />
                {t('badge')}
              </motion.div>

              {/* Main Headline */}
              <div className="space-y-6 max-w-4xl mx-auto">
                <motion.h1 
                  className="text-5xl lg:text-6xl font-bold text-white leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {t('hero.title')}
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                    {t('hero.titleHighlight')}
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {t('hero.subtitle')}
                </motion.p>
                
                <motion.p 
                  className="text-sm text-gray-400"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {t('hero.lastUpdated')}
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terms Content Section */}
      <div className="py-24 px-6 lg:px-8 bg-slate-900">
        <div className="max-w-4xl mx-auto">
          
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-4">Agreement Overview</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Welcome to Dubhe! These Terms of Service (&quot;Terms&quot;) form a legally binding agreement between you and 
                Dubhe Foundation (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) regarding your use of our blockchain platform, development tools, 
                and related services.
              </p>
              <p className="text-gray-300 leading-relaxed">
                By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms 
                and our Privacy Policy. If you are using our services on behalf of an organization, you represent that you 
                have the authority to bind that organization to these Terms.
              </p>
            </div>
          </motion.div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center text-white">
                    {section.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{section.title}</h3>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3 text-gray-300">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Blockchain-Specific Terms */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-2xl p-8 border border-purple-500/20">
              <div className="flex items-center gap-3 mb-6">
                <Scale className="w-8 h-8 text-purple-400" />
                <h3 className="text-2xl font-bold text-white">Blockchain-Specific Terms</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">{t('blockchain.participation.title')}</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• {t('blockchain.participation.items.0')}</li>
                    <li>• {t('blockchain.participation.items.1')}</li>
                    <li>• {t('blockchain.participation.items.2')}</li>
                    <li>• {t('blockchain.participation.items.3')}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">{t('blockchain.risks.title')}</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• {t('blockchain.risks.items.0')}</li>
                    <li>• {t('blockchain.risks.items.1')}</li>
                    <li>• {t('blockchain.risks.items.2')}</li>
                    <li>• {t('blockchain.risks.items.3')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Governance and Compliance */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-6">{t('governance.title')}</h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  {t('governance.law')}
                </p>
                <p>
                  {t('governance.disputes')}
                </p>
                <p>
                  {t('governance.modifications')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 text-center">
              <Globe className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">{t('contact.title')}</h3>
              <p className="text-gray-300 mb-6">
                {t('contact.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:legal@dubhe.network"
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                >
                  legal@dubhe.network
                </a>
                <a 
                  href="mailto:support@dubhe.network"
                  className="border border-purple-400/50 hover:border-purple-300 text-purple-100 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                >
                  support@dubhe.network
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </>
  )
}