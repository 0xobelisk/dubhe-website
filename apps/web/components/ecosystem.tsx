"use client"

import { motion } from "framer-motion"
import { ExternalLink, Code, Coins, Gamepad2, DollarSign } from "lucide-react"

export default function Ecosystem() {
  const categories = [
    {
      title: "DeFi",
      icon: DollarSign,
      description: "Decentralized finance protocols",
      projects: [
        { name: "DubheSwap", description: "Automated Market Maker", tvl: "$45M" },
        { name: "LendingHub", description: "Lending & Borrowing", tvl: "$32M" },
        { name: "YieldFarm", description: "Yield Farming Protocol", tvl: "$28M" },
      ]
    },
    {
      title: "Gaming",
      icon: Gamepad2,
      description: "On-chain games and metaverse",
      projects: [
        { name: "Numeron", description: "Fantasy RPG Adventure", players: "12K+" },
        { name: "CryptoKnights", description: "Strategy Battle Game", players: "8K+" },
        { name: "MetaVerse World", description: "Virtual World Platform", players: "15K+" },
      ]
    },
    {
      title: "Infrastructure",
      icon: Code,
      description: "Developer tools and infrastructure",
      projects: [
        { name: "Dubhe SDK", description: "Development Kit", downloads: "50K+" },
        { name: "Move IDE", description: "Integrated Development Environment", downloads: "35K+" },
        { name: "Oracle Network", description: "Price Feed Oracles", feeds: "200+" },
      ]
    },
    {
      title: "NFTs",
      icon: Coins,
      description: "Digital collectibles and assets",
      projects: [
        { name: "ArtSpace", description: "NFT Marketplace", volume: "$2.3M" },
        { name: "CreatorDAO", description: "Creator Economy Platform", creators: "3K+" },
        { name: "DigitalAssets", description: "Utility NFT Platform", assets: "25K+" },
      ]
    }
  ]

  return (
    <div id="ecosystem" className="py-24 px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-6 py-2 rounded-full text-sm font-medium mb-6 border border-purple-200">
            Ecosystem
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 max-w-4xl mx-auto leading-tight">
            Thriving Ecosystem of
            <br />
            Innovative Applications
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the diverse range of applications, protocols, and tools built on Dubhe, 
            from DeFi and gaming to infrastructure and NFTs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl text-white">
                  <category.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{category.title}</h3>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                {category.projects.map((project, projectIndex) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (categoryIndex * 0.1) + (projectIndex * 0.05) }}
                    className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl hover:bg-gray-100/50 transition-colors duration-200 group cursor-pointer"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-slate-900">{project.name}</h4>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                      </div>
                      <p className="text-gray-600 text-sm">{project.description}</p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-sm font-semibold text-purple-600">
                        {'tvl' in project ? project.tvl :
                         'players' in project ? project.players :
                         'downloads' in project ? project.downloads :
                         'volume' in project ? project.volume :
                         'creators' in project ? project.creators :
                         'assets' in project ? project.assets :
                         'feeds' in project ? project.feeds : ''}
                      </div>
                      <div className="text-xs text-gray-500">
                        {'tvl' in project ? 'TVL' : 
                         'players' in project ? 'Players' :
                         'downloads' in project ? 'Downloads' :
                         'volume' in project ? 'Volume' :
                         'creators' in project ? 'Creators' :
                         'assets' in project ? 'Assets' :
                         'feeds' in project ? 'Feeds' : ''}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <motion.button
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
          </motion.button>
        </div>
      </div>
    </div>
  )
}