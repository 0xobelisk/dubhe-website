"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { DollarSign, Calendar, TrendingUp, Users, Mail, Phone, Download, ArrowRight } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import Section from "../ui/Section"
import Card from "../ui/Card"
import GradientText from "../ui/GradientText"

/**
 * 融资信息数据 (基于Deck第32页)
 */
const investmentDetails = {
  round: {
    type: "Strategic Seed Round",
    amount: "$3M",
    structure: "10% Equity + 6% Token Allocation",
    use: "Development / Operations / Ecosystem Expansion"
  },
  
  highlights: [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Proven Traction",
      value: "$500K+ Revenue",
      description: "Commercial validation with paying customers"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Technical Moat", 
      value: "First-Mover",
      description: "Only comprehensive Move development stack"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Market Timing",
      value: "Inflection Point",
      description: "Move ecosystem ready for mass adoption"
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Strong Team",
      value: "5+ Years",
      description: "Proven Web3 execution track record"
    }
  ]
}

/**
 * 路线图里程碑数据 (基于Deck第33页)
 */
const roadmapMilestones = [
  {
    period: "2024 Q4",
    title: "Foundation & Launch",
    milestones: [
      "Public Security Audit → Mainnet",
      "Major Partnership Announcements", 
      "Community Growth Programs"
    ],
    status: "In Progress"
  },
  {
    period: "2025 Q1", 
    title: "Product Evolution",
    milestones: [
      "Dubhe Engine 1.1 Release",
      "Advanced Developer Tools",
      "Community-Driven Projects"
    ],
    status: "Planned"
  },
  {
    period: "2025 Q2",
    title: "Ecosystem Expansion", 
    milestones: [
      "Hackathon Grant Program Launch",
      "Major dApp Partnerships",
      "Cross-Chain Integration"
    ],
    status: "Planned"
  },
  {
    period: "2025 Q3",
    title: "Network Growth",
    milestones: [
      "Token Launch & Governance",
      "Revenue Scaling Programs", 
      "International Expansion"
    ],
    status: "Planned"
  }
]

/**
 * 投资相关链接
 */
const investmentLinks = {
  deck: "https://docsend.com/view/iqua3sqswib2jbnv",
  scheduleMeeting: "https://calendly.com/dubheengine/30min"
}

/**
 * 联系信息
 */
const contactInfo = {
  primary: "dubhe@obelisk.build",
  telegram: "@dubheengine", 
  website: "https://dubhe-docs.obelisk.build"
}

/**
 * InvestmentOpportunity组件 - 投资机会详情展示
 */
export default function InvestmentOpportunity() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <Section
      title="Investment Opportunity"
      subtitle="Join us in building the foundational infrastructure for the Move ecosystem"
      label="FUNDING ROUND"
      maxWidth="xl" 
      paddingY="xl"
      showBackground={true}
      backgroundVariant="gradient"
      className="relative"
    >
      <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* 融资详情 */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card variant="glass" padding="lg" className="max-w-4xl mx-auto mb-12">
            <div className="text-center mb-8">
              <GradientText
                preset="green-blue"
                size="3xl"
                weight="bold"
                className="mb-4"
              >
                {investmentDetails.round.amount} {investmentDetails.round.type}
              </GradientText>
              <p className="text-xl text-gray-300 mb-6">
                {investmentDetails.round.structure}
              </p>
              <div className="bg-blue-500/10 rounded-xl p-6 border border-blue-500/20">
                <h4 className="text-lg font-semibold text-blue-400 mb-3">Use of Funds</h4>
                <p className="text-gray-300">
                  {investmentDetails.round.use}
                </p>
              </div>
            </div>
          </Card>

          {/* 投资亮点 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {investmentDetails.highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="glass" padding="lg" className="text-center h-full">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-xl text-green-400 mb-4">
                    {highlight.icon}
                  </div>
                  <div className="text-xl font-bold text-white mb-2">
                    {highlight.value}
                  </div>
                  <div className="text-sm font-semibold text-gray-300 mb-3">
                    {highlight.title}
                  </div>
                  <div className="text-xs text-gray-400">
                    {highlight.description}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 执行路线图 */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <GradientText
              preset="blue-purple"
              size="2xl"
              weight="bold"
              className="mb-4"
            >
              Clear Execution Roadmap
            </GradientText>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Detailed milestone planning with measurable outcomes and timeline accountability
            </p>
          </div>

          <div className="space-y-6">
            {roadmapMilestones.map((milestone, index) => (
              <motion.div
                key={milestone.period}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="glass" padding="lg">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        milestone.status === "In Progress" 
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      }`}>
                        {milestone.period}
                      </div>
                      <div className="text-xs text-gray-500 mt-2 text-center">
                        {milestone.status}
                      </div>
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-white mb-3">
                        {milestone.title}
                      </h3>
                      <div className="space-y-2">
                        {milestone.milestones.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 联系与行动 */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card variant="glass" padding="lg" className="max-w-5xl mx-auto">
            <GradientText
              preset="orange-yellow"
              size="3xl"
              weight="bold"
              className="mb-6"
            >
              Let&apos;s Build the Future Together
            </GradientText>
            
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
              This is a <strong className="text-white">once-in-a-cycle opportunity</strong> to invest in the 
              foundational infrastructure that will power the next wave of blockchain adoption. 
              The Move ecosystem is at an inflection point, and Dubhe is positioned to capture 
              the majority of this growth.
            </p>

            {/* CTA按钮组 */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <a
                href={investmentLinks.deck}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white border-0 px-10 py-4 text-xl font-bold rounded-full shadow-2xl shadow-green-500/25 w-full"
                >
                  <Download className="w-6 h-6 mr-3" />
                  Check Investment Deck
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </a>
              
              <a
                href={investmentLinks.scheduleMeeting}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-gray-600 hover:border-blue-500 bg-gray-900/50 hover:bg-gray-800 text-gray-300 hover:text-white px-10 py-4 text-xl font-bold rounded-full transition-all duration-300 w-full"
                >
                  <Calendar className="w-6 h-6 mr-3" />
                  Schedule Meeting
                </Button>
              </a>
            </div>

            {/* 联系信息 */}
            <div className="border-t border-gray-700 pt-8">
              <h4 className="text-lg font-semibold text-white mb-6">Get in Touch</h4>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-gray-300">
                <a 
                  href={`mailto:${contactInfo.primary}`}
                  className="flex items-center gap-2 hover:text-blue-400 transition-colors duration-200"
                >
                  <Mail className="w-5 h-5" />
                  {contactInfo.primary}
                </a>
                <a 
                  href={`https://t.me/${contactInfo.telegram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-blue-400 transition-colors duration-200"
                >
                  <Phone className="w-5 h-5" />
                  {contactInfo.telegram}
                </a>
                <a 
                  href={contactInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-blue-400 transition-colors duration-200"
                >
                  <TrendingUp className="w-5 h-5" />
                  Documentation
                </a>
              </div>
            </div>

            {/* 投资者声明 */}
            <div className="mt-8 pt-6 border-t border-gray-800">
              <p className="text-xs text-gray-500 max-w-3xl mx-auto">
                This investment opportunity is being offered to qualified investors only. 
                All financial projections are estimates based on current market conditions and historical data. 
                Past performance does not guarantee future results. Please consult with your financial advisor.
              </p>
            </div>
          </Card>
        </motion.div>

      </div>
    </Section>
  )
}