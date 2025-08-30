"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { 
  Users, 
  Globe, 
  Award,
  ArrowRight,
  CheckCircle,
  Star,
  Sparkles,
  ExternalLink
} from "lucide-react"
import Link from "next/link"
import { useTranslations } from 'next-intl'

export default function AmbassadorPage() {
  const t = useTranslations('ambassador')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const benefits = [
    {
      icon: <Award className="w-6 h-6" />,
      title: t('benefits.exclusiveAccess.title'),
      description: t('benefits.exclusiveAccess.description')
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t('benefits.directCommunication.title'),
      description: t('benefits.directCommunication.description')
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: t('benefits.recognition.title'),
      description: t('benefits.recognition.description')
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: t('benefits.globalNetwork.title'),
      description: t('benefits.globalNetwork.description')
    }
  ]

  const requirements = Array.isArray(t.raw('requirements')) ? t.raw('requirements') as string[] : []

  const responsibilities = [
    {
      category: t('responsibilities.communityEngagement.title'),
      tasks: Array.isArray(t.raw('responsibilities.communityEngagement.tasks')) ? t.raw('responsibilities.communityEngagement.tasks') as string[] : []
    },
    {
      category: t('responsibilities.ecosystemGrowth.title'),
      tasks: Array.isArray(t.raw('responsibilities.ecosystemGrowth.tasks')) ? t.raw('responsibilities.ecosystemGrowth.tasks') as string[] : []
    },
    {
      category: t('responsibilities.contentCreation.title'),
      tasks: Array.isArray(t.raw('responsibilities.contentCreation.tasks')) ? t.raw('responsibilities.contentCreation.tasks') as string[] : []
    }
  ]

  const ambassadors = [
    {
      name: "Cryptømaster",
      region: "cryptomaster7018",
      country: "🇳🇬 Nigeria",
      expertise: "Community Building",
      projects: 1,
      image: "/amb/Cryptomaster.png"
    },
    {
      name: "SHAHID",
      region: "shahid114",
      country: "South Asia",
      expertise: "Community Building",
      projects: 1,
      image: "/amb/SHAHID.png" // 没有对应图片，保持文字头像
    },
    // {
    //   name: "Ahmed Hassan",
    //   region: "EMEA",
    //   country: "🇦🇪 UAE",
    //   expertise: "Enterprise Solutions",
    //   projects: 18,
    //   image: "AH"
    // },
    // {
    //   name: "Lisa Johnson",
    //   region: "North America",
    //   country: "🇺🇸 United States",
    //   expertise: "GameFi & NFTs",
    //   projects: 31,
    //   image: "LJ"
    // },
    // {
    //   name: "Yuki Tanaka",
    //   region: "Asia Pacific",
    //   country: "🇯🇵 Japan",
    //   expertise: "Technical Writing",
    //   projects: 27,
    //   image: "YT"
    // },
    // {
    //   name: "Pierre Dubois",
    //   region: "Europe",
    //   country: "🇫🇷 France",
    //   expertise: "Developer Relations",
    //   projects: 19,
    //   image: "PD"
    // }
  ]

  return (
    <>
      
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-rose-900 to-purple-900 overflow-hidden pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-rose-500/30 to-purple-500/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-br from-purple-600/30 to-blue-600/40 rounded-full blur-3xl"></div>
          
          {/* Floating elements */}
          <div className="absolute inset-0 overflow-hidden">
            {isClient && Array.from({ length: 20 }).map((_, i) => {
              // Use deterministic values based on index to avoid hydration mismatch
              const topPositions = [8, 18, 28, 38, 48, 58, 68, 78, 88, 98, 13, 23, 33, 43, 53, 63, 73, 83, 93, 3];
              const leftPositions = [5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 10, 20, 30, 40, 50, 60, 70, 80, 90, 12];
              const durations = [3, 4, 5, 3.5, 4.5, 3.2, 4.2, 5.2, 3.8, 4.8, 3.3, 4.3, 5.3, 3.7, 4.7, 3.1, 4.1, 5.1, 3.6, 4.6];
              const delays = [0, 0.5, 1, 1.5, 2, 0.2, 0.7, 1.2, 1.7, 0.3, 0.8, 1.3, 1.8, 0.1, 0.6, 1.1, 1.6, 0.4, 0.9, 1.4];
              
              return (
                <div
                  key={`float-${i}`}
                  className="absolute text-rose-300/20 text-lg"
                  style={{
                    top: `${topPositions[i] || 50}%`,
                    left: `${leftPositions[i] || 50}%`,
                    animation: `float ${durations[i] || 3}s ease-in-out infinite ${delays[i] || 0}s`
                  }}
                >
                  ⭐
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
                className="inline-block bg-rose-500/10 text-rose-400 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-rose-500/20"
              >
                <Users className="w-4 h-4 inline mr-2" />
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
                  {t('hero.title1')}
                  <br />
                  <span className="bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent">
                    {t('hero.title2')}
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-rose-100 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {t('hero.subtitle')}
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
                  <div className="text-3xl font-bold text-rose-400 mb-2">8+</div>
                  <div className="text-gray-300">{t('hero.stats.activeAmbassadors')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">8+</div>
                  <div className="text-gray-300">{t('hero.stats.countries')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">100K+</div>
                  <div className="text-gray-300">{t('hero.stats.communityReach')}</div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-8 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSeDcEdrHgI-ATQWQ7_h1XdGXPaJYL5VWsnmUnMfHc3XRiaXvA/viewform" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-400 hover:to-purple-400 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center">
                  {t('hero.cta1')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
                
                <a href="#responsibilities" className="border-2 border-rose-400/50 hover:border-rose-300 bg-rose-900/20 backdrop-blur-sm text-rose-100 hover:text-white hover:bg-rose-800/30 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center">
                  {t('hero.cta2')}
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-gradient-to-r from-rose-100 to-purple-100 text-rose-700 px-6 py-2 rounded-full text-sm font-medium mb-6 border border-rose-200"
            >
              {t('benefitsSection.badge')}
            </motion.div>
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t('benefitsSection.title')}
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 hover:border-rose-500/50 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-rose-500 to-purple-500 text-white mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{benefit.title}</h3>
                <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Current Ambassadors Section */}
      <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-rose-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {t('ambassadorsSection.title')}
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t('ambassadorsSection.description')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ambassadors.map((ambassador, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-rose-500/20 hover:border-rose-400/50 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-rose-400/50">
                    {ambassador.image.startsWith('/') ? (
                      <Image
                        src={ambassador.image}
                        alt={ambassador.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                        priority={index < 3}
                        loading={index < 3 ? "eager" : "lazy"}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-rose-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                        {ambassador.image}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{ambassador.name}</h3>
                    <p className="text-rose-400 text-sm">{ambassador.region}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{t('ambassadorsSection.location')}</span>
                    <span className="text-white text-sm">{ambassador.country}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{t('ambassadorsSection.expertise')}</span>
                    <span className="text-white text-sm">{ambassador.expertise}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{t('ambassadorsSection.projectsLed')}</span>
                    <span className="text-rose-400 font-semibold text-sm">{ambassador.projects}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Requirements & Responsibilities Section */}
      <div id="responsibilities" className="py-24 px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold text-white mb-8">{t('requirementsSection.title')}</h3>
              <div className="space-y-4">
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{requirement}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Responsibilities */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-3xl font-bold text-white mb-8">{t('responsibilitiesSection.title')}</h3>
              <div className="space-y-6">
                {responsibilities.map((category, index) => (
                  <div key={index}>
                    <h4 className="text-lg font-semibold text-rose-400 mb-3">{category.category}</h4>
                    <div className="space-y-2">
                      {category.tasks.map((task, taskIndex) => (
                        <div key={taskIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-rose-400 rounded-full flex-shrink-0 mt-2" />
                          <span className="text-gray-300 text-sm">{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-rose-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('cta.title')}
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('cta.description')}
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSeDcEdrHgI-ATQWQ7_h1XdGXPaJYL5VWsnmUnMfHc3XRiaXvA/viewform" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-400 hover:to-purple-400 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center">
              {t('cta.apply')}
              <Sparkles className="w-5 h-5 ml-2" />
            </a>
            <Link href="/contact" className="text-gray-300 hover:text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 flex items-center gap-2">
              {t('cta.contact')}
              <ExternalLink className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>

    </>
  )
}