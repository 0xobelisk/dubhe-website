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

export default function AmbassadorPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const benefits = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Exclusive Access",
      description: "Get early access to new features, products, and announcements before the public release"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Direct Communication",
      description: "Regular communication with the Dubhe team and influence on product roadmap decisions"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Recognition & Rewards",
      description: "Special recognition in community, exclusive merchandise, and token rewards for contributions"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Network",
      description: "Connect with like-minded individuals and build relationships within the global Dubhe community"
    }
  ]

  const requirements = [
    "Active member in Dubhe community for at least 3 months",
    "Strong understanding of Move blockchain technology",
    "Experience in community building or content creation",
    "Commitment to promote Dubhe ecosystem positively",
    "Available for at least 10 hours per week",
    "Proficient in English and at least one other language"
  ]

  const responsibilities = [
    {
      category: "Community Engagement",
      tasks: [
        "Moderate community discussions and maintain positive environment",
        "Answer technical questions and help newcomers",
        "Organize local meetups and online events",
        "Create engaging content (tutorials, articles, videos)"
      ]
    },
    {
      category: "Ecosystem Growth",
      tasks: [
        "Identify and onboard new developers to Dubhe",
        "Collaborate with other ambassadors on global initiatives",
        "Provide feedback on products and documentation",
        "Represent Dubhe at blockchain conferences and events"
      ]
    },
    {
      category: "Content Creation",
      tasks: [
        "Write technical tutorials and guides",
        "Create video content explaining Dubhe features",
        "Translate documentation to local languages",
        "Share ecosystem updates on social media"
      ]
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
      country: "🇧🇩 Bangladesh",
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
                Ambassador Program
              </motion.div>

              {/* Main Headline */}
              <div className="space-y-6 max-w-5xl mx-auto">
                <motion.h1 
                  className="text-5xl lg:text-7xl font-bold text-white leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Become a
                  <br />
                  <span className="bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent">
                    Dubhe Ambassador
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-rose-100 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Join our global community of passionate advocates and help shape the future of Move blockchain development. 
                  Lead local communities, create content, and grow the ecosystem worldwide.
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
                  <div className="text-3xl font-bold text-rose-400 mb-2">50+</div>
                  <div className="text-gray-300">Active Ambassadors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">25+</div>
                  <div className="text-gray-300">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">100K+</div>
                  <div className="text-gray-300">Community Reach</div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-8 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <button className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-400 hover:to-purple-400 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                  Apply Now
                  <ArrowRight className="w-5 h-5 inline ml-2" />
                </button>
                
                <button className="border-2 border-rose-400/50 hover:border-rose-300 bg-rose-900/20 backdrop-blur-sm text-rose-100 hover:text-white hover:bg-rose-800/30 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200">
                  Learn More
                </button>
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
              Program Benefits
            </motion.div>
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Why Join Our Ambassador Program?
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
              Meet Our Global Ambassadors
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Our ambassadors are leading the charge in their regions, building communities and driving adoption
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
                    <span className="text-gray-400 text-sm">Location</span>
                    <span className="text-white text-sm">{ambassador.country}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Expertise</span>
                    <span className="text-white text-sm">{ambassador.expertise}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Projects Led</span>
                    <span className="text-rose-400 font-semibold text-sm">{ambassador.projects}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Requirements & Responsibilities Section */}
      <div className="py-24 px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold text-white mb-8">Requirements</h3>
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
              <h3 className="text-3xl font-bold text-white mb-8">Responsibilities</h3>
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
            Ready to Lead Your Community?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Join our ambassador program and become a leader in the Move ecosystem
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-400 hover:to-purple-400 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
              Apply Now
              <Sparkles className="w-5 h-5 inline ml-2" />
            </button>
            <button className="text-gray-300 hover:text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 flex items-center gap-2">
              Contact Us
              <ExternalLink className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>

    </>
  )
}