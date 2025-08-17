"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Award, Code, Shield, Trophy, Star } from "lucide-react"
import Section from "../ui/Section"
import Card from "../ui/Card"
import GradientText from "../ui/GradientText"

/**
 * 团队成员数据 (基于Deck第34页)
 */
const teamMembers = [
  {
    name: "Henry",
    role: "Council Member & Technical Leadership",
    avatar: "👨‍💻",
    expertise: "Cryptographic Research and Implementation",
    background: "Ensuring Security and Innovation in Protocol Development",
    color: "from-blue-500 to-cyan-500"
  },
  {
    name: "Bob", 
    role: "Lead Protocol Engineer",
    avatar: "👨‍🔬",
    expertise: "Core Protocol Design and Architecture",
    background: "Coordinates Technical Development Across the Ecosystem", 
    color: "from-purple-500 to-pink-500"
  },
  {
    name: "Frank",
    role: "Senior Protocol Engineer", 
    avatar: "👨‍💼",
    expertise: "Protocol Implementation and Performance Optimization",
    background: "Technical Integration with Ecosystem Partners",
    color: "from-green-500 to-emerald-500"
  },
  {
    name: "Jason C",
    role: "Executive Chairman",
    avatar: "👨‍💼",
    expertise: "Foundation Operations and Strategic Management",
    background: "Manages day-to-day operations and organizational processes",
    color: "from-orange-500 to-yellow-500"
  }
]

/**
 * 团队成就数据 (基于Deck第35页)
 */
const teamAchievements = [
  {
    event: "Polkadot 1st Hackathon",
    award: "Most Popular Developer Award", 
    year: "2021",
    icon: "🏆",
    significance: "Early recognition in blockchain development"
  },
  {
    event: "Ethereum Hackathon",
    award: "Most Business Value Award",
    year: "2021", 
    icon: "💰",
    significance: "Proven ability to create commercial value"
  },
  {
    event: "Sui Builder House",
    award: "3rd Place NFT-GameFi Track",
    year: "2023",
    icon: "🥉", 
    significance: "Strong performance in Move ecosystem"
  },
  {
    event: "Aptos Move Offline Hackathon", 
    award: "Honorary Special Award",
    year: "2024",
    icon: "⭐",
    significance: "Continued excellence across Move platforms"
  },
  {
    event: "Multiple Web3 Competitions",
    award: "Consistent Top Performance",
    year: "2021-2024",
    icon: "🚀",
    significance: "Track record of execution and innovation"
  }
]

/**
 * 执行能力指标
 */
const executionMetrics = [
  {
    metric: "Development Experience",
    value: "5+ Years",
    description: "Deep Web3 development across multiple ecosystems",
    icon: <Code className="w-6 h-6" />
  },
  {
    metric: "Hackathon Wins", 
    value: "10+",
    description: "Consistent performance in competitive environments",
    icon: <Trophy className="w-6 h-6" />
  },
  {
    metric: "Ecosystem Recognition",
    value: "Industry-Wide",
    description: "Acknowledged by major blockchain foundations",
    icon: <Award className="w-6 h-6" />
  },
  {
    metric: "Technical Leadership",
    value: "Proven",
    description: "Successfully architected and deployed complex protocols",
    icon: <Shield className="w-6 h-6" />
  }
]

/**
 * TeamExecution组件 - 团队实力和执行能力展示
 */
export default function TeamExecution() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <Section
      title="World-Class Team with Proven Execution"
      subtitle="By builders, for builders — with a track record of delivering complex blockchain infrastructure"
      label="TEAM & EXECUTION"  
      maxWidth="xl"
      paddingY="xl"
      showBackground={true}
      backgroundVariant="gradient"
    >
      <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* 团队成员展示 */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="glass" padding="lg" className="h-full">
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${member.color} rounded-2xl flex items-center justify-center text-2xl flex-shrink-0`}>
                      {member.avatar}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {member.name}
                      </h3>
                      <p className="text-blue-400 font-semibold text-sm mb-3">
                        {member.role}
                      </p>
                      <p className="text-gray-300 text-sm mb-3">
                        <strong>Expertise:</strong> {member.expertise}
                      </p>
                      <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                        <p className="text-xs text-gray-400">
                          {member.background}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 执行能力指标 */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <GradientText
              preset="green-blue"
              size="2xl"
              weight="bold"
              className="mb-4"
            >
              Execution Excellence
            </GradientText>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Proven ability to deliver complex blockchain infrastructure at scale
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {executionMetrics.map((metric, index) => (
              <motion.div
                key={metric.metric}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="glass" padding="lg" className="text-center h-full">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-xl text-blue-400 mb-4">
                    {metric.icon}
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">
                    {metric.value}
                  </div>
                  <div className="text-sm font-semibold text-gray-300 mb-3">
                    {metric.metric}
                  </div>
                  <div className="text-xs text-gray-400">
                    {metric.description}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 获奖记录 */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <GradientText
              preset="pink-purple"
              size="2xl"
              weight="bold"
              className="mb-4"
            >
              Award-Winning Track Record
            </GradientText>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Consistent recognition across multiple blockchain ecosystems and competitions
            </p>
          </div>

          <Card variant="glass" padding="lg" className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamAchievements.map((achievement, index) => (
                <motion.div
                  key={`${achievement.event}-${achievement.year}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-800/30 rounded-xl p-4 border border-gray-700 hover:border-blue-500/50 transition-colors duration-300"
                >
                  <div className="text-center">
                    <div className="text-3xl mb-3">{achievement.icon}</div>
                    <h4 className="text-lg font-bold text-white mb-2">
                      {achievement.event}
                    </h4>
                    <p className="text-blue-400 font-semibold text-sm mb-2">
                      {achievement.award}
                    </p>
                    <p className="text-gray-500 text-xs mb-3">
                      {achievement.year}
                    </p>
                    <div className="bg-gray-900/50 rounded-lg p-2">
                      <p className="text-xs text-gray-400">
                        {achievement.significance}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* 底部总结 */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card variant="glass" padding="lg" className="max-w-5xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Star className="w-8 h-8 text-yellow-400" />
              <GradientText
                preset="orange-yellow"
                size="2xl" 
                weight="bold"
              >
                The Right Team at the Right Time
              </GradientText>
              <Star className="w-8 h-8 text-yellow-400" />
            </div>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Our team combines <strong className="text-white">deep technical expertise</strong> with 
              <strong className="text-white"> proven execution ability</strong>. We&apos;ve consistently delivered 
              award-winning solutions across multiple blockchain ecosystems, positioning us perfectly to 
              build the infrastructure that will power the next wave of Move adoption.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">5+</div>
                <div className="text-sm text-gray-400">Years Web3 Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">10+</div>
                <div className="text-sm text-gray-400">Competition Awards</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">100%</div>
                <div className="text-sm text-gray-400">Execution Success Rate</div>
              </div>
            </div>
          </Card>
        </motion.div>

      </div>
    </Section>
  )
}