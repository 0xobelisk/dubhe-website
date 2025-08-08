"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { 
  Users, 
  ExternalLink,
  Briefcase
} from "lucide-react"
import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import {useTranslations} from 'next-intl'

type Params = {
  locale: string
}

export default function TeamPage({params}: {params: Promise<Params>}) {
  const t = useTranslations('team')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const teamMembers = [
    {
      name: "Jason",
      role: "Foundation Lead",
      location: "San Francisco, CA",
      bio: "Visionary leader with 15+ years in blockchain technology. Previously led engineering teams at major tech companies before founding Dubhe to revolutionize Move development.",
      expertise: ["Blockchain Architecture", "Team Leadership", "Product Strategy"],
      avatar: "/team/alex-chen.jpg",
      social: {
        linkedin: "https://linkedin.com/in/alexchen",
        twitter: "https://twitter.com/alexchen",
        github: "https://github.com/alexchen"
      }
    },
    {
      name: "Joan",
      role: "CTO & Co-founder",
      location: "New York, NY", 
      bio: "Former Move core developer with deep expertise in smart contract architecture. Leads our technical vision and oversees all engineering initiatives.",
      expertise: ["Move Language", "Smart Contracts", "System Architecture"],
      avatar: "/team/sarah-johnson.jpg",
      social: {
        linkedin: "https://linkedin.com/in/sarahjohnson",
        github: "https://github.com/sarahjohnson",
        twitter: "https://twitter.com/sarahjohnson"
      }
    },
    {
      name: "David",
      role: "Head of Engineering",
      location: "Seoul, South Korea",
      bio: "Full-stack engineer passionate about developer tools and ecosystem growth. Leads our engine development team and drives technical innovation.",
      expertise: ["Full-stack Development", "Developer Tools", "Open Source"],
      avatar: "/team/david-kim.jpg", 
      social: {
        github: "https://github.com/davidkim",
        linkedin: "https://linkedin.com/in/davidkim"
      }
    },
    {
      name: "Bonnie",
      role: "Head of Community",
      location: "Barcelona, Spain",
      bio: "Community builder with extensive experience growing developer ecosystems. Manages our global community initiatives and ambassador program.",
      expertise: ["Community Building", "Developer Relations", "Event Management"],
      avatar: "/team/maria-rodriguez.jpg",
      social: {
        twitter: "https://twitter.com/mariarodriguez",
        linkedin: "https://linkedin.com/in/mariarodriguez"
      }
    },
    {
      name: "Liam McKenzie",
      role: "Head of Partnerships",
      location: "London, UK",
      bio: "Business development expert focused on strategic partnerships and ecosystem growth. Previously led partnerships at major blockchain companies.",
      expertise: ["Strategic Partnerships", "Business Development", "Ecosystem Growth"],
      avatar: "/team/robert-thompson.jpg",
      social: {
        linkedin: "https://linkedin.com/in/robertthompson",
        twitter: "https://twitter.com/robertthompson"
      }
    },
    {
      name: "Emily Smith",
      role: "Research Director",
      location: "Beijing, China",
      bio: "PhD in Computer Science specializing in distributed systems. Leads our research initiatives and explores cutting-edge blockchain technologies.",
      expertise: ["Distributed Systems", "Research", "Academic Partnerships"],
      avatar: "/team/lisa-wang.jpg",
      social: {
        linkedin: "https://linkedin.com/in/lisawang",
        github: "https://github.com/lisawang"
      }
    }
  ]

  const departments = [
    {
      name: t('join.departments.engineering.title'),
      description: t('join.departments.engineering.description'),
      openRoles: 5,
      color: "from-blue-500 to-purple-500"
    },
    {
      name: t('join.departments.research.title'), 
      description: t('join.departments.research.description'),
      openRoles: 2,
      color: "from-purple-500 to-pink-500"
    },
    {
      name: t('join.departments.community.title'),
      description: t('join.departments.community.description'),
      openRoles: 3,
      color: "from-pink-500 to-rose-500"
    },
    {
      name: t('join.departments.partnerships.title'),
      description: t('join.departments.partnerships.description'), 
      openRoles: 2,
      color: "from-rose-500 to-orange-500"
    }
  ]

  return (
    <>
      {/* Navigation */}
      <Navigation />
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 overflow-hidden pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-purple-500/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-br from-purple-600/30 to-pink-600/40 rounded-full blur-3xl"></div>
          
          {/* Floating elements */}
          <div className="absolute inset-0 overflow-hidden">
            {isClient && Array.from({ length: 15 }).map((_, i) => {
              const topPositions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 15, 25, 35, 45, 55, 65];
              const leftPositions = [8, 18, 28, 38, 48, 58, 68, 78, 88, 12, 22, 32, 42, 52, 62];
              const durations = [4, 5, 6, 4.5, 5.5, 4.2, 5.2, 6.2, 4.8, 5.8, 4.3, 5.3, 6.3, 4.7, 5.7];
              const delays = [0, 0.5, 1, 1.5, 2, 0.3, 0.8, 1.3, 1.8, 0.2, 0.7, 1.2, 1.7, 0.4, 0.9];
              
              return (
                <div
                  key={`float-${i}`}
                  className="absolute text-blue-300/20 text-lg"
                  style={{
                    top: `${topPositions[i]}%`,
                    left: `${leftPositions[i]}%`,
                    animation: `float ${durations[i]}s ease-in-out infinite ${delays[i]}s`
                  }}
                >
                  👥
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
                className="inline-block bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-blue-500/20"
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
                  {t('hero.title').split(' ').slice(0, 2).join(' ')}
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {t('hero.title').split(' ').slice(2).join(' ')}
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
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
                  <div className="text-3xl font-bold text-blue-400 mb-2">20+</div>
                  <div className="text-gray-300">{t('hero.stats.members')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">10+</div>
                  <div className="text-gray-300">{t('hero.stats.countries')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-400 mb-2">5+</div>
                  <div className="text-gray-300">{t('hero.stats.timezones')}</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members Section */}
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
              {t('leadership.title')}
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t('leadership.description')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="text-center mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-blue-400/50">
                    <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-blue-400 font-medium mb-2">{member.role}</p>
                  {/* <div className="flex items-center justify-center text-gray-400 text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {member.location}
                  </div> */}
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {member.bio}
                </p>

                <div className="mb-4">
                  <h4 className="text-white font-medium mb-2 text-sm">{t('leadership.expertise')}</h4>
                  <div className="flex flex-wrap gap-1">
                    {member.expertise.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* <div className="flex justify-center gap-3">
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-slate-700 hover:bg-blue-600 flex items-center justify-center transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-white" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-slate-700 hover:bg-blue-400 flex items-center justify-center transition-colors"
                    >
                      <Twitter className="w-4 h-4 text-white" />
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-slate-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
                    >
                      <Github className="w-4 h-4 text-white" />
                    </a>
                  )}
                </div> */}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Departments & Open Roles */}
      <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-blue-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {t('join.title')}
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t('join.description')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {departments.map((dept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${dept.color} text-white mb-4`}>
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{dept.name}</h3>
                <p className="text-gray-300 mb-4">{dept.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">{t('join.openPositions')}</span>
                  <span className="text-blue-400 font-semibold">{dept.openRoles}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link 
              href="/contact" 
              className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {t('join.cta')}
              <ExternalLink className="w-5 h-5 ml-2" />
            </Link>
            <p className="text-gray-400 text-sm mt-3">
              {t('join.ctaDescription')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  )
}