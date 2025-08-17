"use client"

import { motion } from "framer-motion"
import { ExternalLink, Code, Coins, Gamepad2, DollarSign } from "lucide-react"
import { useTranslations } from 'next-intl'

type Project = {
  name: string;
  description: string;
  tvl?: string;
  players?: string;
  downloads?: string;
  volume?: string;
  url?: string;
}

export default function Ecosystem() {
  const t = useTranslations('home.ecosystem')
  
  const categories = [
    {
      title: t('categories.defi.title'),
      icon: DollarSign,
      description: t('categories.defi.description'),
      projects: [
        { 
          name: t('projects.merak.name'), 
          description: t('projects.merak.description'), 
          tvl: t('projects.merak.tvl'), 
          url: "https://merak-testnet.obelisk.build/" 
        },
      ] as Project[]
    },
    {
      title: t('categories.gaming.title'),
      icon: Gamepad2,
      description: t('categories.gaming.description'),
      projects: [
        { 
          name: t('projects.numeron.name'), 
          description: t('projects.numeron.description'), 
          players: t('projects.numeron.players'), 
          url: "https://testnet.numeron.world/" 
        },
      ] as Project[]
    },
    {
      title: t('categories.infrastructure.title'),
      icon: Code,
      description: t('categories.infrastructure.description'),
      projects: [
        { 
          name: t('projects.cyferio.name'), 
          description: t('projects.cyferio.description'), 
          downloads: t('projects.cyferio.downloads'), 
          url: "https://cyferio.com/" 
        },
      ] as Project[]
    },
    {
      title: t('categories.nfts.title'),
      icon: Coins,
      description: t('categories.nfts.description'),
      projects: [
        { 
          name: t('projects.objectsdao.name'), 
          description: t('projects.objectsdao.description'), 
          volume: t('projects.objectsdao.volume'), 
          url: "https://objects-monorepo.vercel.app/" 
        },
      ] as Project[]
    }
  ]

  return (
    <div id="ecosystem" className="py-24 px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-6 py-2 rounded-full text-sm font-medium mb-6 border border-purple-200">
            {t('badge')}
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 max-w-4xl mx-auto leading-tight">
            {t('title.line1')}
            <br />
            {t('title.line2')}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-center mb-6">
                <div className="inline-flex p-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl text-white mb-4">
                  <category.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{category.title}</h3>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </div>

              {category.projects.map((project) => (
                <motion.a
                  key={project.name}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
                  className="block p-4 bg-gray-50/50 rounded-xl hover:bg-gray-100/50 transition-colors duration-200 group cursor-pointer text-center"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h4 className="font-semibold text-slate-900">{project.name}</h4>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                  <div className="inline-flex flex-col items-center">
                    <div className="text-lg font-bold text-purple-600">
                      {project.tvl || project.players || project.downloads || project.volume || ''}
                    </div>
                    <div className="text-xs text-gray-500">
                      {project.tvl ? t('metrics.tvl') : 
                       project.players ? t('metrics.players') :
                       project.downloads ? t('metrics.downloads') :
                       project.volume ? t('metrics.volume') : ''}
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          {/* <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-200 inline-flex items-center gap-2 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore All Projects
            <ExternalLink className="w-5 h-5" />
          </motion.button> */}
        </div>
      </div>
    </div>
  )
}