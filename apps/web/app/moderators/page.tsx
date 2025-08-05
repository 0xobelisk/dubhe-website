"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { 
  Shield, 
  Users, 
  MessageCircle, 
  ArrowRight,
  CheckCircle,
  Star,
  Sparkles,
  ExternalLink
} from "lucide-react"

export default function ModeratorsPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const responsibilities = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Community Moderation",
      description: "Maintain healthy discussions, enforce community guidelines, and ensure a welcoming environment for all members"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Security & Safety",
      description: "Identify and prevent spam, scams, and malicious activities to protect community members"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Member Support",
      description: "Help newcomers get started, answer questions, and guide users to appropriate resources"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Content Curation",
      description: "Highlight quality content, organize information, and maintain the quality of community discussions"
    }
  ]

  const requirements = [
    "Active community member for at least 6 months",
    "Deep understanding of Dubhe ecosystem and Move technology",
    "Excellent communication and conflict resolution skills",
    "Available for moderation duties across different time zones",
    "Previous moderation experience preferred",
    "Commitment to fair and impartial decision making"
  ]

  const tools = [
    {
      platform: "Discord",
      features: ["Message management", "User timeout/ban", "Channel oversight", "Bot integration"],
      color: "from-indigo-500 to-purple-500"
    },
    {
      platform: "Telegram", 
      features: ["Group moderation", "Spam filtering", "User verification", "Automated responses"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      platform: "Forum",
      features: ["Thread management", "Content moderation", "User ranking", "Report handling"],
      color: "from-green-500 to-emerald-500"
    }
  ]

  const moderators = [
    {
      name: "Emmaprof",
      timezone: "UTC+1",
      speciality: "Community Moderator Lead",
      platforms: ["Discord", "Telegram"],
      languages: ["English"],
      image: "/mod/Emmaprof.png"
    },
    {
      name: "Purple_Rain_",
      timezone: "UTC+3",
      speciality: "Community Moderator",
      platforms: ["Discord", "Telegram"],
      languages: ["English"],
      image: "/mod/Purple_Rain_.png"
    },
    {
      name: "EREN",
      timezone: "UTC+5:30",
      speciality: "Community Moderator",
      platforms: ["Discord", "Telegram"],
      languages: ["English"],
      image: "/mod/EREN.png"
    },
    {
      name: "Jenny",
      timezone: "UTC+5:30",
      speciality: "Community Moderator",
      platforms: ["Discord", "Telegram"],
      languages: ["English"],
      image: "/mod/Jenny.png"
    }
  ]

  const guidelines = [
    {
      category: "Communication",
      rules: [
        "Treat all community members with respect and courtesy",
        "Use clear, professional language in all interactions", 
        "De-escalate conflicts and promote constructive dialogue",
        "Be patient with newcomers and provide helpful guidance"
      ]
    },
    {
      category: "Enforcement",
      rules: [
        "Apply community rules consistently and fairly",
        "Document all moderation actions with clear reasoning",
        "Escalate complex issues to senior moderators or admins",
        "Review and appeal processes should be transparent"
      ]
    },
    {
      category: "Privacy & Security",
      rules: [
        "Protect user privacy and personal information",
        "Never share moderation tools or credentials",
        "Report security vulnerabilities immediately",
        "Maintain confidentiality of internal discussions"
      ]
    }
  ]

  return (
    <>
      
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-blue-900 overflow-hidden pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-emerald-500/30 to-blue-500/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-br from-blue-600/30 to-emerald-600/40 rounded-full blur-3xl"></div>
          
          {/* Floating shield elements */}
          <div className="absolute inset-0 overflow-hidden">
            {isClient && Array.from({ length: 15 }).map((_, i) => {
              // Use deterministic values based on index to avoid hydration mismatch
              const topPositions = [12, 26, 40, 54, 68, 82, 96, 18, 32, 46, 60, 74, 88, 6, 20];
              const leftPositions = [8, 22, 36, 50, 64, 78, 92, 14, 28, 42, 56, 70, 84, 98, 16];
              const durations = [3, 4, 5, 3.5, 4.5, 3.2, 4.2, 5.2, 3.8, 4.8, 3.3, 4.3, 5.3, 3.7, 4.7];
              const delays = [0, 0.4, 0.8, 1.2, 1.6, 0.2, 0.6, 1.0, 1.4, 1.8, 0.3, 0.7, 1.1, 1.5, 1.9];
              
              return (
                <div
                  key={`shield-${i}`}
                  className="absolute text-emerald-300/20 text-lg"
                  style={{
                    top: `${topPositions[i] || 50}%`,
                    left: `${leftPositions[i] || 50}%`,
                    animation: `float ${durations[i] || 3}s ease-in-out infinite ${delays[i] || 0}s`
                  }}
                >
                  🛡️
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
                className="inline-block bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-emerald-500/20"
              >
                <Shield className="w-4 h-4 inline mr-2" />
                Moderator Program
              </motion.div>

              {/* Main Headline */}
              <div className="space-y-6 max-w-5xl mx-auto">
                <motion.h1 
                  className="text-5xl lg:text-7xl font-bold text-white leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Community
                  <br />
                  <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                    Moderators
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Help maintain a safe, welcoming, and productive environment for our global community. 
                  Join our team of dedicated moderators who ensure quality discussions and support all members.
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
                  <div className="text-3xl font-bold text-emerald-400 mb-2">24/7</div>
                  <div className="text-gray-300">Coverage</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">15+</div>
                  <div className="text-gray-300">Active Moderators</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">50K+</div>
                  <div className="text-gray-300">Members Protected</div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-8 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-400 hover:to-blue-400 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                  Apply to Moderate
                  <ArrowRight className="w-5 h-5 inline ml-2" />
                </button>
                
                <button className="border-2 border-emerald-400/50 hover:border-emerald-300 bg-emerald-900/20 backdrop-blur-sm text-emerald-100 hover:text-white hover:bg-emerald-800/30 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200">
                  Guidelines
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsibilities Section */}
      <div className="py-24 px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-700 px-6 py-2 rounded-full text-sm font-medium mb-6 border border-emerald-200"
            >
              Key Responsibilities
            </motion.div>
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              What Moderators Do
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {responsibilities.map((responsibility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 hover:border-emerald-500/50 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white mb-6">
                  {responsibility.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{responsibility.title}</h3>
                <p className="text-gray-300 leading-relaxed">{responsibility.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Current Moderators Section */}
      <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-emerald-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Meet Our Moderators
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Our dedicated team ensures 24/7 coverage across all time zones and platforms
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {moderators.map((moderator, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-400/50 transition-all duration-300"
              >
                <div className="text-center mb-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border-2 border-emerald-400/50">
                    <Image
                      src={moderator.image}
                      alt={moderator.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-white">{moderator.name}</h3>
                  <p className="text-emerald-400 text-sm">{moderator.speciality}</p>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-400">Timezone:</span>
                    <div className="text-white">{moderator.timezone}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Platforms:</span>
                    <div className="flex gap-1 mt-1">
                      {moderator.platforms.map((platform, i) => (
                        <span key={i} className="bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded text-xs">
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-400">Languages:</span>
                    <div className="text-white">{moderator.languages.join(", ")}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Tools & Guidelines Section */}
      <div className="py-24 px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Moderation Tools */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold text-white mb-8">Moderation Tools</h3>
              <div className="space-y-6">
                {tools.map((tool, index) => (
                  <div key={index} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 bg-gradient-to-r ${tool.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                        {tool.platform[0]}
                      </div>
                      <h4 className="text-lg font-semibold text-white">{tool.platform}</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {tool.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Requirements & Guidelines */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-3xl font-bold text-white mb-8">Requirements</h3>
              <div className="space-y-4 mb-12">
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{requirement}</span>
                  </div>
                ))}
              </div>

              <h4 className="text-xl font-bold text-white mb-6">Moderation Guidelines</h4>
              <div className="space-y-6">
                {guidelines.map((guideline, index) => (
                  <div key={index}>
                    <h5 className="text-lg font-semibold text-emerald-400 mb-3">{guideline.category}</h5>
                    <div className="space-y-2">
                      {guideline.rules.map((rule, ruleIndex) => (
                        <div key={ruleIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0 mt-2" />
                          <span className="text-gray-300 text-sm">{rule}</span>
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
      <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-emerald-900 to-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Help Our Community?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Join our moderation team and help create a safe, welcoming environment for all
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-400 hover:to-blue-400 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
              Apply Now
              <Sparkles className="w-5 h-5 inline ml-2" />
            </button>
            <button className="text-gray-300 hover:text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 flex items-center gap-2">
              View Guidelines
              <ExternalLink className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>

    </>
  )
}