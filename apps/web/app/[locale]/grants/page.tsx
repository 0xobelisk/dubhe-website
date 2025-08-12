"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { 
  Users, 
  Rocket, 
  ArrowRight,
  CheckCircle,
  Target,
  Sparkles,
  ExternalLink,
  Gift,
  Award,
  Building,
  FileText
} from "lucide-react"
import Link from "next/link"
import Navigation from "@/components/navigation"
import {useTranslations} from 'next-intl'

type Params = {
  locale: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function GrantsPage({params}: {params: Promise<Params>}) {
  const t = useTranslations('grants')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const grantCategories = [
    {
      icon: <Rocket className="w-6 h-6" />,
      title: t('categories.infrastructure.title'),
      amount: t('categories.infrastructure.amount'),
      description: t('categories.infrastructure.description'),
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t('categories.dapp.title'),
      amount: t('categories.dapp.amount'), 
      description: t('categories.dapp.description'),
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: t('categories.research.title'),
      amount: t('categories.research.amount'),
      description: t('categories.research.description'),
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Building className="w-6 h-6" />,
      title: t('categories.community.title'),
      amount: t('categories.community.amount'),
      description: t('categories.community.description'),
      color: "from-orange-500 to-red-500"
    }
  ]

  const requirements = t.raw('process.requirements.items')

  const process = [
    {
      step: "1",
      title: t('process.steps.proposal.title'),
      description: t('process.steps.proposal.description'),
      duration: t('process.steps.proposal.duration')
    },
    {
      step: "2", 
      title: t('process.steps.review.title'),
      description: t('process.steps.review.description'),
      duration: t('process.steps.review.duration')
    },
    {
      step: "3",
      title: t('process.steps.interview.title'),
      description: t('process.steps.interview.description'),
      duration: t('process.steps.interview.duration')
    },
    {
      step: "4",
      title: t('process.steps.approval.title'),
      description: t('process.steps.approval.description'),
      duration: t('process.steps.approval.duration')
    },
    {
      step: "5",
      title: t('process.steps.delivery.title'),
      description: t('process.steps.delivery.description'),
      duration: t('process.steps.delivery.duration')
    }
  ]

  const successStories = [
    {
      project: "Merak",
      category: "DeFi Protocol",
      funding: "1,000,000 DUBHE",
      impact: "$50M TVL",
      description: "Open-source AMM with full milestone completion and production deployment",
      license: "MIT License",
      milestones: "5/5 Complete"
    },
    {
      project: "Numeron",
      category: "Gaming",
      funding: "1,000,000 DUBHE", 
      impact: "20K+ Users",
      description: "Open-source AI MMORPG with full milestone completion and production deployment",
      license: "MIT License",
      milestones: "6/6 Complete"
    },
    {
      project: "Cyferio",
      category: "Infrastructure", 
      funding: "2,000,000 DUBHE",
      impact: "5K+ Developers",
      description: "Open-source ZK-based Move language support and FHE Rollups Framework",
      license: "Apache 2.0",
      milestones: "4/4 Complete"
    },
  ]

  return (
    <>
      {/* Navigation */}
      <Navigation />
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-blue-900 overflow-hidden pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-green-500/30 to-blue-500/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-br from-blue-600/30 to-green-600/40 rounded-full blur-3xl"></div>
          
          {/* Floating grant symbols */}
          <div className="absolute inset-0 overflow-hidden">
            {isClient && Array.from({ length: 20 }).map((_, i) => {
              // Use deterministic values based on index to avoid hydration mismatch
              const topPositions = [5, 20, 35, 50, 65, 80, 95, 10, 25, 40, 55, 70, 85, 15, 30, 45, 60, 75, 90, 12];
              const leftPositions = [8, 24, 40, 56, 72, 88, 4, 20, 36, 52, 68, 84, 16, 32, 48, 64, 80, 96, 12, 28];
              const durations = [3, 4, 5, 3.5, 4.5, 3.2, 4.2, 5.2, 3.8, 4.8, 3.3, 4.3, 5.3, 3.7, 4.7, 3.1, 4.1, 5.1, 3.6, 4.6];
              const delays = [0, 0.5, 1, 1.5, 2, 0.2, 0.7, 1.2, 1.7, 0.3, 0.8, 1.3, 1.8, 0.1, 0.6, 1.1, 1.6, 0.4, 0.9, 1.4];
              
              return (
                <div
                  key={`grant-${i}`}
                  className="absolute text-green-300/20 text-xl"
                  style={{
                    top: `${topPositions[i] || 50}%`,
                    left: `${leftPositions[i] || 50}%`,
                    animation: `float ${durations[i] || 3}s ease-in-out infinite ${delays[i] || 0}s`
                  }}
                >
                  💰
                </div>
              );
            })}
          </div>
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
                className="inline-block bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-green-500/20"
              >
                <Gift className="w-4 h-4 inline mr-2" />
                {t('hero.badge')}
              </motion.div>

              {/* Main Headline */}
              <div className="space-y-6 max-w-5xl mx-auto">
                <motion.h1 
                  className="text-5xl lg:text-7xl font-bold text-white leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {t('hero.title').split(' ').slice(0, 2).join(' ')}
                  <br />
                  <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    {t('hero.title').split(' ').slice(2).join(' ')}
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {t('hero.description')}
                </motion.p>
              </div>

              {/* Stats */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">{t('hero.stats.comingSoon')}</div>
                  <div className="text-gray-300">{t('hero.stats.totalFunded')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">{t('hero.stats.comingSoon')}</div>
                  <div className="text-gray-300">{t('hero.stats.projectsFunded')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">{t('hero.stats.comingSoon')}</div>
                  <div className="text-gray-300">{t('hero.stats.successRate')}</div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-8 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link href="/contact" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center justify-center">
                  {t('hero.cta1')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                
                <Link href="https://dubhe-docs.obelisk.build/dubhe" target="_blank" rel="noopener noreferrer" className="border-2 border-green-400/50 hover:border-green-300 bg-green-900/20 backdrop-blur-sm text-green-100 hover:text-white hover:bg-green-800/30 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center">
                  {t('hero.cta2')}
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Grant Categories Section */}
      <div className="py-24 px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-gradient-to-r from-green-100 to-blue-100 text-green-700 px-6 py-2 rounded-full text-sm font-medium mb-6 border border-green-200"
            >
              {t('categories.badge')}
            </motion.div>
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t('categories.title')}
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {grantCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 hover:border-green-500/50 transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} text-white mb-6`}>
                  {category.icon}
                </div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                  <span className="text-lg font-bold text-green-400">{category.amount}</span>
                </div>
                <p className="text-gray-300 leading-relaxed">{category.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Process Section */}
      <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-green-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {t('process.title')}
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t('process.description')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-16">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {step.step}
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-green-500/50 to-blue-500/50 transform -translate-y-0.5" />
                  )}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-300 text-sm mb-2">{step.description}</p>
                <span className="text-green-400 text-xs font-medium">{step.duration}</span>
              </motion.div>
            ))}
          </div>

          {/* Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">{t('process.requirements.title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {requirements.map((requirement: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{requirement}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Success Stories Section */}
      <div className="py-24 px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {t('successStories.title')}
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t('successStories.description')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-green-500/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Award className="w-8 h-8 text-green-400" />
                  <div>
                    <h3 className="text-xl font-bold text-white">{story.project}</h3>
                    <p className="text-green-400 text-sm">{story.category}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-green-400">{story.funding}</span>
                  <span className="text-gray-300 text-sm">{story.impact}</span>
                </div>
                
                <p className="text-gray-300 text-sm mb-4">{story.description}</p>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                    {story.license}
                  </span>
                  <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded">
                    {story.milestones}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Grant Terms Section */}
      <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-green-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {t('terms.title')}
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-slate-800/50 rounded-2xl p-8 border border-green-500/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <Gift className="w-8 h-8 text-green-400" />
                <h3 className="text-xl font-bold text-white">{t('terms.nonRepayable.title')}</h3>
              </div>
              <p className="text-gray-300 text-sm">
                {t('terms.nonRepayable.description')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-slate-800/50 rounded-2xl p-8 border border-blue-500/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-8 h-8 text-blue-400" />
                <h3 className="text-xl font-bold text-white">{t('terms.openSource.title')}</h3>
              </div>
              <p className="text-gray-300 text-sm">
                {t('terms.openSource.description')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-slate-800/50 rounded-2xl p-8 border border-purple-500/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-8 h-8 text-purple-400" />
                <h3 className="text-xl font-bold text-white">{t('terms.completion.title')}</h3>
              </div>
              <p className="text-gray-300 text-sm">
                {t('terms.completion.description')}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-green-900 to-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('finalCta.title')}
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('finalCta.description')}
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/contact" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center justify-center">
              {t('finalCta.cta1')}
              <Sparkles className="w-5 h-5 ml-2" />
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 flex items-center gap-2">
              {t('finalCta.cta2')}
              <ExternalLink className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>

    </>
  )
}