/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { motion } from "framer-motion"
import { Users, Code, Zap, Globe, Network, Shield } from "lucide-react"
import { useTranslations } from 'next-intl'

const getCommunityEvents = (t: any) => [
  {
    id: "conference",
    icon: Users,
    title: t('events.conference.title'),
    subtitle: t('events.conference.subtitle'),
    gradient: "from-purple-500 to-blue-600"
  },
  {
    id: "workshop",
    icon: Code,
    title: t('events.workshop.title'),
    subtitle: t('events.workshop.subtitle'),
    gradient: "from-green-500 to-teal-600"
  },
  {
    id: "hackathon",
    icon: Zap,
    title: t('events.hackathon.title'),
    subtitle: t('events.hackathon.subtitle'),
    gradient: "from-orange-500 to-red-600"
  },
  {
    id: "meetup",
    icon: Globe,
    title: t('events.meetup.title'),
    subtitle: t('events.meetup.subtitle'),
    gradient: "from-indigo-500 to-purple-600"
  },
  {
    id: "techtalk",
    icon: Network,
    title: t('events.techtalk.title'),
    subtitle: t('events.techtalk.subtitle'),
    gradient: "from-pink-500 to-rose-600"
  },
  {
    id: "summit",
    icon: Shield,
    title: t('events.summit.title'),
    subtitle: t('events.summit.subtitle'),
    gradient: "from-cyan-500 to-blue-600"
  }
]

const getCommunityStats = (t: any) => [
  {
    value: t('stats.members.value'),
    label: t('stats.members.label'),
    description: t('stats.members.description')
  },
  {
    value: t('stats.events.value'),
    label: t('stats.events.label'),
    description: t('stats.events.description')
  },
  {
    value: t('stats.countries.value'),
    label: t('stats.countries.label'),
    description: t('stats.countries.description')
  }
]

export default function CommunitySection() {
  const t = useTranslations('home.community')
  const communityEvents = getCommunityEvents(t)
  const communityStats = getCommunityStats(t)
  
  return (
    <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-6 py-2 rounded-full text-sm font-medium mb-6 border border-blue-200">
            <Users className="w-4 h-4 inline mr-2" />
            {t('title')}
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 max-w-4xl mx-auto leading-tight">
            {t('mainTitle')}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            {t('description')}
          </p>
          <p className="text-xl font-semibold text-slate-900 mb-8">
            {t('cta')}
          </p>
        </div>

        {/* Community Images Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {communityEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`aspect-video bg-gradient-to-br ${event.gradient} flex items-center justify-center`}>
                <div className="text-center text-white">
                  <event.icon className="w-12 h-12 mx-auto mb-4 opacity-80" />
                  <p className="text-lg font-semibold">{event.title}</p>
                  <p className="text-sm opacity-80">{event.subtitle}</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {communityStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-purple-600 mb-2">
                {stat.value}
              </div>
              <div className="text-xl font-semibold text-slate-900 mb-2">
                {stat.label}
              </div>
              <p className="text-gray-600 text-sm">
                {stat.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}