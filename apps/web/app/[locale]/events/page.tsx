"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Search, 
  ChevronDown,
  Calendar,
  Plus,
  Users,
  Building,
  Globe
} from "lucide-react"
import { useTranslations } from 'next-intl'

export default function EventsPage() {
  const t = useTranslations('events')
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("Date")

  const events = [
    {
      date: "2025-02-15",
      name: t('eventsList.engineWorkshop.name'),
      location: t('eventsList.engineWorkshop.location'),
      category: t('eventsList.engineWorkshop.category'),
      type: "Workshop",
      description: t('eventsList.engineWorkshop.description')
    },
    {
      date: "2025-02-28",
      name: t('eventsList.moveAma.name'),
      location: t('eventsList.moveAma.location'),
      category: t('eventsList.moveAma.category'),
      type: "AMA",
      description: t('eventsList.moveAma.description')
    },
    {
      date: "2025-03-10",
      name: t('eventsList.sfMeetup.name'),
      location: t('eventsList.sfMeetup.location'),
      category: t('eventsList.sfMeetup.category'),
      type: "Meetup", 
      description: t('eventsList.sfMeetup.description')
    },
    {
      date: "2025-03-25",
      name: t('eventsList.zkWorkshop.name'),
      location: t('eventsList.zkWorkshop.location'),
      category: t('eventsList.zkWorkshop.category'),
      type: "Workshop",
      description: t('eventsList.zkWorkshop.description')
    }
  ]

  const categoryMap = {
    'all': t('filters.categories.all'),
    'ama': t('filters.categories.ama'),
    'workshop': t('filters.categories.workshop'),
    'meetup': t('filters.categories.meetup')
  }
  
  const categories = Object.keys(categoryMap)

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || event.type.toLowerCase() === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <>
      
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 overflow-hidden pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/30 to-blue-500/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-br from-blue-600/30 to-purple-600/40 rounded-full blur-3xl"></div>
          
          {/* Star field */}
          <div className="absolute inset-0">
            {Array.from({ length: 50 }).map((_, i) => {
              // Use deterministic values based on index to avoid hydration mismatch
              const topPositions = Array.from({length: 50}, (_, idx) => (idx * 7.3) % 100);
              const leftPositions = Array.from({length: 50}, (_, idx) => (idx * 11.7) % 100);
              const delays = Array.from({length: 50}, (_, idx) => (idx * 0.06) % 3);
              const durations = Array.from({length: 50}, (_, idx) => 2 + (idx * 0.04) % 2);
              
              return (
                <div
                  key={`star-${i}`}
                  className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                  style={{
                    top: `${topPositions[i]}%`,
                    left: `${leftPositions[i]}%`,
                    animationDelay: `${delays[i]}s`,
                    animationDuration: `${durations[i]}s`
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col">
          <div className="flex-1 flex items-center">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
              <div className="text-center">
                
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-block bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-blue-500/20"
                >
                  {t('hero.badge')}
                </motion.div>

                {/* Main Headline */}
                <div className="space-y-6 max-w-4xl mx-auto mb-12">
                  <motion.h1 
                    className="text-5xl lg:text-6xl font-bold text-white leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {t('hero.title')}
                  </motion.h1>
                  
                  <motion.p 
                    className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    {t('hero.subtitle')}
                  </motion.p>
                </div>

                {/* Search and Filters */}
                <motion.div 
                  className="max-w-4xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder={t('filters.search.placeholder')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {/* Filter and Sort */}
                    <div className="flex gap-4">
                      <div className="relative">
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="appearance-none bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {categories.map(category => (
                            <option key={category} value={category}>{categoryMap[category as keyof typeof categoryMap]}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                      </div>

                      <div className="relative">
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="appearance-none bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Date">{t('filters.sort.date')}</option>
                          <option value="Name">{t('filters.sort.name')}</option>
                          <option value="Location">{t('filters.sort.location')}</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Events Table */}
                  <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 p-6 border-b border-slate-700/50 text-gray-400 font-medium text-sm">
                      <div className="col-span-3">{t('table.headers.date')}</div>
                      <div className="col-span-4">{t('table.headers.name')}</div>
                      <div className="col-span-3">{t('table.headers.location')}</div>
                      <div className="col-span-2 text-center">{t('table.headers.category')}</div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-slate-700/50">
                      {filteredEvents.map((event, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="grid grid-cols-12 gap-4 p-6 hover:bg-slate-700/30 transition-colors duration-200 group"
                        >
                          <div className="col-span-3 text-gray-300 font-medium">
                            {event.date}
                          </div>
                          <div className="col-span-4 text-white font-semibold group-hover:text-blue-400 transition-colors">
                            {event.name}
                          </div>
                          <div className="col-span-3 text-gray-300">
                            {event.location}
                          </div>
                          <div className="col-span-2 flex items-center justify-center">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              event.category === 'Sui Connect' ? 'bg-blue-500/20 text-blue-400' :
                              event.category === 'Industry Conference' ? 'bg-purple-500/20 text-purple-400' :
                              event.category === 'Sui Conference' ? 'bg-green-500/20 text-green-400' :
                              'bg-gray-500/20 text-gray-400'
                            }`}>
                              {event.category}
                            </span>
                            <button className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-white transition-all duration-200 absolute right-6">
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Empty State */}
                    {filteredEvents.length === 0 && (
                      <div className="p-12 text-center">
                        <Calendar className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                        <p className="text-gray-400">{t('table.noEvents')}</p>
                      </div>
                    )}
                  </div>

                  {/* Language Selector */}
                  {/* <div className="flex items-center justify-start mt-8">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Globe className="w-4 h-4" />
                      <span className="text-sm">English</span>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div> */}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community Stats Section */}
      <div className="py-24 px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">{t('community.title')}</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              {t('community.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700"
            >
              <Calendar className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-gray-400">{t('community.stats.eventsThisYear')}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700"
            >
              <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-gray-400">{t('community.stats.attendees')}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700"
            >
              <Globe className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">25+</div>
              <div className="text-gray-400">{t('community.stats.countries')}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700"
            >
              <Building className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">100+</div>
              <div className="text-gray-400">{t('community.stats.speakers')}</div>
            </motion.div>
          </div>
        </div>
      </div>

    </>
  )
}