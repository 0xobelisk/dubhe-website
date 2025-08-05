"use client"

import { useEffect, useState, lazy, Suspense } from "react"
import { motion } from "framer-motion"
import { 
  Code, 
  Zap, 
  Database, 
  Network, 
  ArrowRight, 
  Globe,
  Shield,
  Users,
  ExternalLink
} from "lucide-react"
import Navigation from './navigation'

// Lazy load heavy components
const NetworkStats = lazy(() => import('./network-stats'))
const Ecosystem = lazy(() => import('./ecosystem'))
const Footer = lazy(() => import('./footer'))

// Unreal Engine 风格设计系统
const customStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes subtle-pulse {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; }
  }
  
  @keyframes twinkle {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.2); }
  }
  
  @keyframes shootingStar {
    0% { 
      transform: translateX(0) translateY(0); 
      opacity: 0; 
    }
    10% { 
      opacity: 1; 
    }
    90% { 
      opacity: 1; 
    }
    100% { 
      transform: translateX(200px) translateY(-100px); 
      opacity: 0; 
    }
  }
  
  
  .glass-overlay {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .unreal-gradient {
    background: linear-gradient(135deg, 
      #0ea5e9 0%, 
      #3b82f6 50%, 
      #6366f1 100%);
  }
  
  .hero-background {
    background: linear-gradient(
      135deg,
      #0f172a 0%,
      #1e293b 25%,
      #334155 50%,
      #475569 75%,
      #64748b 100%
    );
    position: relative;
    overflow: hidden;
  }
  
  .hero-background::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(14, 165, 233, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.2) 0%, transparent 50%);
    animation: subtle-pulse 6s ease-in-out infinite;
  }
  
  .floating-elements {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  
  .floating-cube {
    position: absolute;
    width: 20px;
    height: 20px;
    background: linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(14, 165, 233, 0.3));
    border: 1px solid rgba(255, 255, 255, 0.1);
    animation: float 8s ease-in-out infinite;
  }
  
  .floating-cube:nth-child(1) { top: 10%; left: 10%; animation-delay: 0s; }
  .floating-cube:nth-child(2) { top: 20%; right: 15%; animation-delay: 2s; }
  .floating-cube:nth-child(3) { bottom: 30%; left: 20%; animation-delay: 4s; }
  .floating-cube:nth-child(4) { bottom: 15%; right: 25%; animation-delay: 6s; }
  
  @keyframes slideIn {
    0% { width: 0%; opacity: 0; }
    100% { opacity: 1; }
  }
  
  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); }
  }
  
  .animate-scroll {
    animation-name: scroll;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-duration: 50s;
  }
  
  .animate-scroll-mobile {
    animation-name: scroll;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-duration: 360s;
  }
  
  .animate-scroll:hover,
  .animate-scroll-mobile:hover {
    animation-play-state: paused;
  }
`

/**
 * NewHomePage组件 - Unreal Engine风格主页设计
 */
export default function NewHomePage() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Hero Section with Background Image */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 overflow-hidden">
        {/* Background Image with Stars and Ocean Elements */}
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-r from-slate-900/20 via-purple-800/30 to-blue-900/20">
            {/* Background Video - covering entire background */}
            <video 
              className="absolute inset-0 w-full h-full object-cover opacity-15"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="https://cdn.prod.website-files.com/6425f546844727ce5fb9e5ab/65689c2b73f0ce51c2dd59c0_Var7-transcode.mp4" type="video/mp4" />
            </video>
            
            {/* Enhanced background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-700/20 to-purple-800/30"></div>
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/40 to-blue-500/50 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-br from-blue-600/40 to-purple-600/50 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-pink-500/30 to-purple-500/40 rounded-full blur-3xl"></div>
            
            {/* Starfield effect */}
            <div className="absolute inset-0">
              {Array.from({ length: 100 }).map((_, i) => (
                <div
                  key={`star-${i}`}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.8 + 0.2,
                    animation: `twinkle ${2 + Math.random() * 3}s infinite ${Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 min-h-screen flex items-center pt-20 sm:pt-24 lg:pt-0">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8 max-w-2xl"
              >
                {/* Logo */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center gap-3 mb-8"
                >
                  {/* <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div> */}
                  {/* <span className="text-blue-100 text-lg font-bold tracking-wide">DUBHE ENGINE</span> */}
                </motion.div>

                {/* Main Headline */}
                <div className="space-y-6">
                  <motion.h1 
                    className="text-5xl lg:text-6xl font-bold text-white leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    We make the Dubhe.
                    <br />
                    You make it Move.
                    <br />
                  </motion.h1>
                  
                  <motion.p 
                    className="text-lg text-blue-100 max-w-xl leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    A open-source Move application stack that provides a comprehensive toolkit for
                    building verifiable decentralized applications (DApps) and fully on-chain applications.
                  </motion.p>
                </div>

                {/* CTA Buttons */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                    Get Dubhe Stack
                  </button>
                  
                  <button className="border-2 border-blue-400/50 hover:border-blue-300 bg-blue-900/20 backdrop-blur-sm text-blue-100 hover:text-white hover:bg-blue-800/30 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200">
                    Learn about licensing
                  </button>
                </motion.div>
              </motion.div>

              {/* Right Content - Big Dipper 3D Constellation with Background Video */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative lg:ml-12"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900 to-purple-900 border border-purple-700">
                  {/* Big Dipper Constellation Area */}
                  <div className="relative aspect-video bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900">
                    {/* Star field background */}
                    <div className="absolute inset-0">
                      {/* Background stars with enhanced starfield */}
                      {Array.from({ length: 50 }).map((_, i) => (
                        <div
                          key={`bg-star-${i}`}
                          className="absolute rounded-full animate-pulse"
                          style={{
                            width: `${Math.random() * 3 + 1}px`,
                            height: `${Math.random() * 3 + 1}px`,
                            backgroundColor: i % 5 === 0 ? 'rgba(147, 51, 234, 0.8)' : 'rgba(255, 255, 255, 0.6)',
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`,
                            boxShadow: i % 7 === 0 ? '0 0 6px rgba(147, 51, 234, 0.5)' : '0 0 3px rgba(255, 255, 255, 0.3)'
                          }}
                        />
                      ))}
                      
                      {/* Shooting stars */}
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div
                          key={`shooting-star-${i}`}
                          className="absolute w-1 h-1 bg-white rounded-full"
                          style={{
                            top: `${20 + Math.random() * 60}%`,
                            left: `${10 + Math.random() * 80}%`,
                            animation: `shootingStar ${3 + Math.random() * 2}s infinite ${i * 2}s`,
                            boxShadow: '0 0 6px rgba(255, 255, 255, 0.8), 0 0 12px rgba(59, 130, 246, 0.6)'
                          }}
                        />
                      ))}
                    </div>

                    {/* Big Dipper constellation */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-80 h-48">
                        {/* Connection lines between stars */}
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 192">
                          <defs>
                            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
                              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
                            </linearGradient>
                          </defs>
                          {/* Big Dipper constellation lines - correct sequence */}
                          <g stroke="url(#lineGradient)" strokeWidth="2" fill="none" className="animate-pulse" style={{ animationDuration: '3s' }}>
                            {/* Bowl: Dubhe -> Merak -> Phecda -> Megrez -> back to Dubhe */}
                            <line x1="280" y1="60" x2="260" y2="130" />
                            <line x1="260" y1="130" x2="200" y2="150" />
                            <line x1="200" y1="150" x2="160" y2="100" />
                            <line x1="160" y1="100" x2="280" y2="60" />
                            {/* Handle: Megrez -> Alioth -> Mizar -> Alkaid */}
                            <line x1="160" y1="100" x2="130" y2="80" />
                            <line x1="130" y1="80" x2="100" y2="60" />
                            <line x1="100" y1="60" x2="60" y2="80" />
                          </g>
                        </svg>

                        {/* Big Dipper stars - exact positions from reference */}
                        {[
                          { name: 'Dubhe', x: 280, y: 60, size: 'w-6 h-6', glow: 'shadow-purple-500/50', primary: true },
                          { name: 'Merak', x: 260, y: 130, size: 'w-4 h-4', glow: 'shadow-blue-500/50' },
                          { name: 'Phecda', x: 200, y: 150, size: 'w-4 h-4', glow: 'shadow-purple-400/50' },
                          { name: 'Megrez', x: 160, y: 100, size: 'w-3 h-3', glow: 'shadow-blue-400/50' },
                          { name: 'Alioth', x: 130, y: 80, size: 'w-4 h-4', glow: 'shadow-purple-500/50' },
                          { name: 'Mizar', x: 100, y: 60, size: 'w-4 h-4', glow: 'shadow-blue-400/50' },
                          { name: 'Alkaid', x: 60, y: 80, size: 'w-4 h-4', glow: 'shadow-purple-400/50' }
                        ].map((star, index) => (
                          <motion.div
                            key={star.name}
                            className={`absolute ${star.size} rounded-full transform -translate-x-1/2 -translate-y-1/2`}
                            style={{ left: star.x, top: star.y }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ 
                              opacity: 1, 
                              scale: 1,
                              boxShadow: star.primary ? '0 0 20px 5px rgba(147, 51, 234, 0.8)' : undefined
                            }}
                            transition={{ 
                              duration: 0.8, 
                              delay: index * 0.2,
                              boxShadow: { duration: 2, repeat: Infinity, repeatType: 'reverse' }
                            }}
                          >
                            <div className={`w-full h-full rounded-full ${
                              star.primary 
                                ? 'bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg' 
                                : 'bg-gradient-to-br from-blue-400 to-purple-500'
                            } ${star.glow} shadow-lg`}>
                              {/* Extra glow for Dubhe */}
                              {star.primary && (
                                <div className="absolute inset-0 rounded-full bg-purple-400/50 animate-ping"></div>
                              )}
                            </div>
                            
                            {/* Star name label */}
                            <div className={`absolute ${star.primary ? 'top-8' : 'top-6'} left-1/2 transform -translate-x-1/2 whitespace-nowrap`}>
                              <span className={`text-xs ${star.primary ? 'text-purple-300 font-bold' : 'text-blue-200'} drop-shadow-lg`}>
                                {star.name}
                              </span>
                            </div>
                          </motion.div>
                        ))}

                        {/* Dubhe highlight effect */}
                        <motion.div
                          className="absolute w-8 h-8 rounded-full border-2 border-purple-400/60 transform -translate-x-1/2 -translate-y-1/2"
                          style={{ left: 280, top: 60 }}
                          animate={{ 
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 0.8, 0.3]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Network Statistics */}
      <Suspense fallback={
        <div className="py-24 px-6 lg:px-8 bg-slate-50">
          <div className="max-w-7xl mx-auto text-center">
            <div className="h-32 bg-gray-200 animate-pulse rounded-lg" />
          </div>
        </div>
      }>
        <NetworkStats />
      </Suspense>

      {/* Features Section - Monad Style */}
      <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-6 py-2 rounded-full text-sm font-medium mb-6 border border-purple-200">
              Features
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 max-w-4xl mx-auto leading-tight">
              The Move Stack with
              <br />
              Limitless Potential
            </h2>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Left Column */}
            <div className="flex flex-col justify-center space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="flex items-center justify-center mb-4">
                  <img 
                    src="/marketing/logos/move-white.svg" 
                    alt="Move Language Logo" 
                    className="w-32 h-32 object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="text-sm font-medium text-slate-700 mb-2">100% Move-Compatible</div>
                <div className="text-slate-600 text-sm max-w-xs mx-auto">
                  Use the existing Move ecosystem to your advantage.
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="text-8xl font-bold text-slate-900 mb-2">0</div>
                <div className="text-lg font-semibold text-slate-900 mb-2">zero gas fees</div>
                <div className="text-slate-600 text-sm max-w-xs mx-auto">
                  Allows project cover this expense, supporting flexible expansion and customisation..
                </div>
              </motion.div>
            </div>

            {/* Center Column */}
            <div className="flex flex-col items-center justify-center space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                {/* Main logo with orbiting dots */}
                <div className="relative w-32 h-32 flex items-center justify-center">
                  {/* Center diamond */}
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 transform rotate-45 rounded-lg shadow-lg"></div>
                  
                  {/* Orbiting dots */}
                  <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                    <div className="absolute top-0 left-1/2 w-3 h-3 bg-purple-400 rounded-full transform -translate-x-1/2"></div>
                    <div className="absolute top-1/4 right-0 w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="absolute bottom-1/4 right-0 w-2 h-2 bg-purple-300 rounded-full"></div>
                    <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-blue-500 rounded-full transform -translate-x-1/2"></div>
                    <div className="absolute bottom-1/4 left-0 w-2 h-2 bg-purple-400 rounded-full"></div>
                    <div className="absolute top-1/4 left-0 w-2 h-2 bg-blue-300 rounded-full"></div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center"
              >
                <div className="text-8xl font-bold text-purple-600 mb-2">~20ms</div>
                <div className="text-lg font-semibold text-slate-900">Real-time synchronization</div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col justify-center space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="text-6xl font-bold text-slate-900 mb-2">Unlimited</div>
                <div className="text-lg font-semibold text-slate-900 mb-2">Transactions per second</div>
                <div className="text-slate-600 text-sm max-w-xs mx-auto">
                Depends on the number of dubhe channels running in parallel.
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded transform rotate-45"></div>
                  </div>
                </div>
                <div className="text-lg font-semibold text-gray-900">1s Sync State finality</div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>


      {/* Product Suite Section - Based on Investor Page */}
      <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-purple-500/10 text-purple-400 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-purple-500/20">
              PRODUCT SUITE
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight">
              The Complete Move Development Stack
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Three integrated products that solve every major friction point in Move development
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-stretch">
            {/* Dubhe Engine */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 flex flex-col"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white mb-6">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Dubhe Engine</h3>
              <p className="text-purple-400 font-semibold mb-4">80% Code Auto-Generation</p>
              <p className="text-gray-300 mb-6 leading-relaxed flex-grow">
                The only development toolkit that auto-generates 80% of Move code, letting developers focus on core business logic
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Reduce dev time from months to weeks</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">90% lower infrastructure costs</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">One command deploys to all Move chains</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl p-4 border border-green-500/20 mt-auto">
                <p className="text-white font-semibold">10x Faster Development</p>
              </div>
            </motion.div>

            {/* Dubhe Channel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 flex flex-col"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Dubhe Channel</h3>
              <p className="text-purple-400 font-semibold mb-4">Web2-Level Real-Time Experience</p>
              <p className="text-gray-300 mb-6 leading-relaxed flex-grow">
                Real-time programmable P2P interaction layer that makes blockchain feel like Web2
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Instant frontend rendering</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Ultra-fast execution speed</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Supports multi-client mobile, desktop, and web</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-500/10 to-purple-500/10 rounded-xl p-4 border border-green-500/20 mt-auto">
                <p className="text-white font-semibold">{"<"}50ms Latency</p>
              </div>
            </motion.div>

            {/* Dubhe OS */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-green-500/50 transition-all duration-300 flex flex-col"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white mb-6">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Dubhe OS</h3>
              <p className="text-green-400 font-semibold mb-4">Cross-Chain Interoperability OS</p>
              <p className="text-gray-300 mb-6 leading-relaxed flex-grow">
                Blockchain operating system with native cross-chain support and developer incentive mechanisms
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Single codebase, all Move chains</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Built-in developer rewards</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Bridge to Multi-Chains ecosystems</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl p-4 border border-green-500/20 mt-auto">
                <p className="text-white font-semibold">Native Multi-Chain</p>
              </div>
            </motion.div>
          </div>

          {/* Architecture Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
                Competitive Advantage
              </h3>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                First and only comprehensive solution for Move ecosystem development
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 max-w-4xl mx-auto">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-4 px-6 text-gray-400 font-semibold">Feature</th>
                      <th className="text-center py-4 px-6 text-green-400 font-semibold">Dubhe</th>
                      <th className="text-center py-4 px-6 text-gray-400 font-semibold">Others</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-800/50">
                      <td className="py-4 px-6 text-white font-medium">Code Generation</td>
                      <td className="py-4 px-6 text-center">
                        <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                          80% automated
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="bg-gray-700/50 text-gray-400 px-3 py-1 rounded-full text-sm">
                          Manual coding
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-800/50">
                      <td className="py-4 px-6 text-white font-medium">UX Performance</td>
                      <td className="py-4 px-6 text-center">
                        <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                          {"<"}50ms
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="bg-gray-700/50 text-gray-400 px-3 py-1 rounded-full text-sm">
                          3-15 seconds
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-800/50">
                      <td className="py-4 px-6 text-white font-medium">Cross-Chain</td>
                      <td className="py-4 px-6 text-center">
                        <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                          Native support
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="bg-gray-700/50 text-gray-400 px-3 py-1 rounded-full text-sm">
                          Custom bridges
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 text-white font-medium">Developer Tools</td>
                      <td className="py-4 px-6 text-center">
                        <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                          All-in-one
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="bg-gray-700/50 text-gray-400 px-3 py-1 rounded-full text-sm">
                          Fragmented
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* How It Works Section - Dubhe Development Flow */}
      <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              How It Works
            </h2>
          </div>

          {/* Steps Container */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4 items-stretch">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              
              {/* Card */}
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 h-full flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                  Schema Definition
                </h3>
                <p className="text-gray-300 mb-8 leading-relaxed flex-grow">
                  Define your game or dApp logic using Dubhe&apos;s intuitive schema system. 
                  Describe entities, components, and systems in simple configuration files.
                </p>
                
                {/* Visual Elements */}
                <div className="space-y-3 mb-6">
                  {['Entity', 'Component', 'System', 'World', 'Event'].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded border-2 border-gray-500"
                        style={{ borderStyle: 'dashed' }}
                      />
                      <span className="text-gray-400 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Connection Line */}
              <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-gray-600" 
                   style={{ 
                     background: 'linear-gradient(90deg, transparent 0%, #4b5563 20%, #4b5563 80%, transparent 100%)',
                     transform: 'translateY(-50%)'
                   }} 
              />
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              
              {/* Card */}
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 h-full flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                  Code Generation
                </h3>
                <p className="text-gray-300 mb-8 leading-relaxed flex-grow">
                  Dubhe Engine automatically generates 80% of your Move smart contracts, 
                  client libraries, and API interfaces from your schema definitions.
                </p>
                
                {/* Visual Elements */}
                <div className="relative">
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                      Dubhe Engine
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-gradient-to-r from-purple-500 to-blue-600 rounded animate-pulse" />
                    <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
              
              {/* Connection Line */}
              <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-gray-600" 
                   style={{ 
                     background: 'linear-gradient(90deg, transparent 0%, #4b5563 20%, #4b5563 80%, transparent 100%)',
                     transform: 'translateY(-50%)'
                   }} 
              />
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              
              {/* Card */}
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 h-full flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                  Deployment & Channel
                </h3>
                <p className="text-gray-300 mb-8 leading-relaxed flex-grow">
                  Deploy to multiple Move chains with one command. Dubhe Channel provides 
                  real-time synchronization and {"<"}50ms latency for seamless user experience.
                </p>
                
                {/* Visual Elements */}
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                      You
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-purple-500" />
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-gray-500 text-xs mb-2">Blockchain</div>
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
                </div>
              </div>
              
              {/* Connection Line */}
              <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-gray-600" 
                   style={{ 
                     background: 'linear-gradient(90deg, transparent 0%, #4b5563 20%, #4b5563 80%, transparent 100%)',
                     transform: 'translateY(-50%)'
                   }} 
              />
            </motion.div>

            {/* Step 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              
              {/* Card */}
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 h-full flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                  Cross-Chain Ecosystem
                </h3>
                <p className="text-gray-300 mb-8 leading-relaxed flex-grow">
                  Your dApp becomes part of the unified Dubhe ecosystem, 
                  with native interoperability across Sui, Aptos, and other Move chains.
                </p>
                
                {/* Visual Elements */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-3 py-1 rounded text-xs font-medium">
                      You
                    </div>
                    <div className="flex-1 mx-3 h-px bg-gradient-to-r from-purple-500 to-blue-600" />
                    <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-3 py-1 rounded text-xs font-medium flex items-center gap-1">
                      <div className="w-2 h-2 bg-white rounded-full" />
                      dApp Ecosystem
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-800 rounded p-2 text-center">
                      <div className="text-xs text-gray-400">Sui</div>
                    </div>
                    <div className="bg-gray-800 rounded p-2 text-center">
                      <div className="text-xs text-gray-400">Aptos</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Ecosystem Section */}
      <Suspense fallback={
        <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
          <div className="max-w-7xl mx-auto text-center">
            <div className="h-64 bg-gray-200 animate-pulse rounded-lg" />
          </div>
        </div>
      }>
        <Ecosystem />
      </Suspense>

      {/* Network Architecture Section - Based on Main Page Design */}
      <div className="py-24 px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              NETWORK ARCHITECTURE
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto leading-tight">
              The Complete Move Development Stack
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From development tools to real-time interaction channels and decentralized infrastructure - 
              Dubhe provides everything needed to build the next generation of fully on-chain applications.
            </p>
          </div>

          {/* Top Overview Cards */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Key Metrics */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <div className="text-center">
                  <h3 className="text-lg font-bold text-amber-900 mb-4">Key Metrics</h3>
                  <div className="space-y-3">
                    {['10M+ transactions processed', '<200ms average latency', 'Web2-level user experience', 'Compatible with Sui, Aptos, Rooch, Movement, Initia'].map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-2 text-sm text-amber-800"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-amber-600 rounded-full flex-shrink-0" />
                        {feature}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Move Ecosystem */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <div className="text-center">
                  <h3 className="text-lg font-bold text-amber-900 mb-4">Move Ecosystem</h3>
                  <div className="text-sm text-amber-800">
                    <div className="text-center">
                      <div className="text-lg font-semibold mb-3">Supported Chains</div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-amber-200/50 rounded-lg p-2 text-xs">Sui</div>
                        <div className="bg-amber-200/50 rounded-lg p-2 text-xs">Aptos</div>
                        <div className="bg-amber-200/50 rounded-lg p-2 text-xs">Rooch</div>
                        <div className="bg-amber-200/50 rounded-lg p-2 text-xs">Movement</div>
                        <div className="bg-amber-200/50 rounded-lg p-2 text-xs">Initia</div>
                        <div className="bg-amber-300/50 rounded-lg p-2 text-xs font-medium">+ More</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Architecture Layers */}
          <div className="max-w-4xl mx-auto space-y-0">
            {/* Layer 1: Move Applications */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-amber-100 text-amber-900 rounded-xl p-8 shadow-lg border border-amber-300 min-h-[120px] flex flex-col justify-center">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-3">Move Applications</h3>
                  <p className="text-sm leading-relaxed mb-4">
                    Decentralized applications built with Dubhe Engine across Move ecosystem
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-xs bg-white/30 rounded-lg px-3 py-2 backdrop-blur-sm">
                      Fully On-Chain RPG Games
                    </div>
                    <div className="text-xs bg-white/30 rounded-lg px-3 py-2 backdrop-blur-sm">
                      DeFi Protocols with Real-time UX
                    </div>
                    <div className="text-xs bg-white/30 rounded-lg px-3 py-2 backdrop-blur-sm">
                      Social Applications
                    </div>
                    <div className="text-xs bg-white/30 rounded-lg px-3 py-2 backdrop-blur-sm">
                      Autonomous Worlds
                    </div>
                  </div>
                </div>
              </div>
              <motion.div
                className="flex justify-center mt-4 mb-4"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center shadow-lg">
                  <ArrowRight className="w-4 h-4 text-white transform rotate-90" />
                </div>
              </motion.div>
            </motion.div>

            {/* Layer 2: Dubhe Engine */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-purple-200 text-purple-900 rounded-xl p-8 shadow-lg border border-purple-300 min-h-[120px] flex flex-col justify-center">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-3">
                    <span className="text-gray-700">Dubhe </span>
                    <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Engine</span>
                  </h3>
                  <p className="text-sm leading-relaxed mb-4">
                    The most powerful real-time, fully on-chain DApp development toolchain with 80% code auto-generation
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-xs bg-white/30 rounded-lg px-3 py-2 backdrop-blur-sm">
                      Schema-based code generation
                    </div>
                    <div className="text-xs bg-white/30 rounded-lg px-3 py-2 backdrop-blur-sm">
                      One command to scaffold dApp
                    </div>
                    <div className="text-xs bg-white/30 rounded-lg px-3 py-2 backdrop-blur-sm">
                      Unity, Cocos, Unreal Engine integration
                    </div>
                    <div className="text-xs bg-white/30 rounded-lg px-3 py-2 backdrop-blur-sm">
                      Multi-chain deployment
                    </div>
                  </div>
                </div>
              </div>
              <motion.div
                className="flex justify-center mt-4 mb-4"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center shadow-lg">
                  <ArrowRight className="w-4 h-4 text-white transform rotate-90" />
                </div>
              </motion.div>
            </motion.div>

            {/* Layer 3: Dubhe Channel */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="bg-blue-200 text-blue-900 rounded-xl p-8 shadow-lg border border-blue-300 min-h-[120px] flex flex-col justify-center">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-3">
                    <span className="text-gray-700">Dubhe </span>
                    <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Channel</span>
                  </h3>
                  <p className="text-sm leading-relaxed mb-4">
                    Real-time programmable P2P interaction channel providing Web2-level user experience for DApps
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-xs bg-white/30 rounded-lg px-3 py-2 backdrop-blur-sm">
                      Instant front-end rendering
                    </div>
                    <div className="text-xs bg-white/30 rounded-lg px-3 py-2 backdrop-blur-sm">
                      Ultra-fast execution speed
                    </div>
                    <div className="text-xs bg-white/30 rounded-lg px-3 py-2 backdrop-blur-sm">
                      Direct mirror & override on-chain data
                    </div>
                    <div className="text-xs bg-white/30 rounded-lg px-3 py-2 backdrop-blur-sm">
                      {"<"}50ms average latency
                    </div>
                  </div>
                </div>
              </div>
              <motion.div
                className="flex justify-center mt-4 mb-4"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center shadow-lg">
                  <ArrowRight className="w-4 h-4 text-white transform rotate-90" />
                </div>
              </motion.div>
            </motion.div>

            {/* Layer 4: Dubhe OS */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative"
            >
              <div className="bg-green-200 text-green-900 rounded-xl p-8 shadow-lg border border-green-300 min-h-[120px] flex flex-col justify-center">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-3">
                    <span className="text-gray-700">Dubhe </span>
                    <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">OS</span>
                  </h3>
                  <p className="text-sm leading-relaxed mb-4">
                    Decentralized operating system with $DUBHE token incentives, bridging, and governance mechanisms
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-xs bg-white/30 rounded-lg px-3 py-2 backdrop-blur-sm">
                      Operation Fees & $DUBHE Staking
                    </div>
                    <div className="text-xs bg-white/30 rounded-lg px-3 py-2 backdrop-blur-sm">
                      Task Bounty System
                    </div>
                    <div className="text-xs bg-white/30 rounded-lg px-3 py-2 backdrop-blur-sm">
                      On-chain Launchpad
                    </div>
                    <div className="text-xs bg-white/30 rounded-lg px-3 py-2 backdrop-blur-sm">
                      Cross-chain Bridge & Governance
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Summary */}
          <motion.div
            className="mt-16 text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Dubhe provides the complete infrastructure stack for Move development - from automated code generation 
              and real-time user interaction to decentralized operations and cross-chain compatibility. This enables 
              developers to focus on 20% core logic while 80% is automatically generated and managed.
            </p>

            <button className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 text-white border-0 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-200 inline-flex items-center gap-2 shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 animate-pulse"></div>
              <Database className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Read Dubhe Thesis</span>
            </button>
          </motion.div>

          {/* Technical Features Grid */}
          <motion.div
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-purple-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">80% Code Auto-Generation</h3>
              <p className="text-gray-600">
                Schema-based development with automatic code generation for Move smart contracts
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                  <Network className="w-6 h-6 text-blue-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Real-time P2P Channel</h3>
              <p className="text-gray-600">
                Web2-level user experience with {"<"}50ms latency for on-chain applications
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-purple-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Multi-Chain Support</h3>
              <p className="text-gray-600">
                Native support for all major Move chains with seamless deployment
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Community Section */}
      <div className="py-24 px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-6 py-2 rounded-full text-sm font-medium mb-6 border border-blue-200">
              <Users className="w-4 h-4 inline mr-2" />
              Community
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 max-w-4xl mx-auto leading-tight">
              Join the global community
              <br />
              behind Dubhe
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              With a thriving community of developers worldwide, Dubhe is backed by passionate 
              supporters driving the future of Move blockchain technology. Connect, collaborate, and grow 
              with us as we shape the next generation of decentralized solutions.
            </p>
            <p className="text-xl font-semibold text-slate-900 mb-8">
              Join the Dubhe community today.
            </p>
          </div>


          {/* Community Images Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Conference Image */}
            <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-video bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-80" />
                  <p className="text-lg font-semibold">Developer Conference</p>
                  <p className="text-sm opacity-80">Building the Future Together</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>

            {/* Workshop Image */}
            <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-video bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <Code className="w-12 h-12 mx-auto mb-4 opacity-80" />
                  <p className="text-lg font-semibold">Developer Workshop</p>
                  <p className="text-sm opacity-80">Hands-on Learning Sessions</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>

            {/* Hackathon Image */}
            <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-video bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <Zap className="w-12 h-12 mx-auto mb-4 opacity-80" />
                  <p className="text-lg font-semibold">Global Hackathon</p>
                  <p className="text-sm opacity-80">Innovation & Competition</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>

            {/* Meetup Image */}
            <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-video bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <Globe className="w-12 h-12 mx-auto mb-4 opacity-80" />
                  <p className="text-lg font-semibold">Community Meetup</p>
                  <p className="text-sm opacity-80">Local & Online Events</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>

            {/* Developer Event Image */}
            <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-video bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <Network className="w-12 h-12 mx-auto mb-4 opacity-80" />
                  <p className="text-lg font-semibold">Tech Talk Series</p>
                  <p className="text-sm opacity-80">Knowledge Sharing</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>

            {/* Community Gathering Image */}
            <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-video bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <Shield className="w-12 h-12 mx-auto mb-4 opacity-80" />
                  <p className="text-lg font-semibold">Community Summit</p>
                  <p className="text-sm opacity-80">Annual Gathering</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          </motion.div>

          {/* Community Stats */}
          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-purple-600 mb-2">10K+</div>
              <div className="text-gray-600">Developers</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-2">200+</div>
              <div className="text-gray-600">Projects Built</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Community Support</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Companies Building on Dubhe - Scrolling Banner */}
      <div className="py-16 bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              The most innovative companies build on Dubhe
            </h3>
          </div>
          
          {/* Scrolling Container */}
          <div className="relative">
            <div 
              className={`flex ${isMobile ? 'animate-scroll-mobile' : 'animate-scroll'}`}>
              {/* First set of logos */}
              <div className="flex items-center justify-center space-x-8 lg:space-x-12 min-w-full">
                <div className="flex items-center justify-center w-24 h-16 sm:w-28 flex-shrink-0">
                  <img 
                    src="/mediakit/dubhe/png/a.png" 
                    alt="Dubhe" 
                    className="h-8 sm:h-12 w-auto object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="flex items-center justify-center w-24 h-16 sm:w-28 flex-shrink-0">
                  <img 
                    src="/mediakit/merak/png/a.png" 
                    alt="Merak" 
                    className="h-8 sm:h-12 w-auto object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="flex items-center justify-center w-24 h-16 sm:w-28 flex-shrink-0">
                  <img 
                    src="/mediakit/numeron/logo.png" 
                    alt="Numeron" 
                    className="h-6 sm:h-10 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="flex items-center justify-center w-24 h-16 sm:w-28 flex-shrink-0">
                  <img 
                    src="/mediakit/phad/phad.png" 
                    alt="Phad" 
                    className="h-6 sm:h-10 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="flex items-center justify-center w-24 h-16 sm:w-28 flex-shrink-0">
                  <img 
                    src="/mediakit/obelisklabs/obelisk 第一版/PNG/白色字.png" 
                    alt="Obelisk Labs" 
                    className="h-6 sm:h-10 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex items-center justify-center w-24 h-16 sm:w-28 flex-shrink-0">
                  <img 
                    src="/mediakit/sui/Sui Logo White/Sui_Logo_White.png" 
                    alt="Sui" 
                    className="h-6 sm:h-10 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex items-center justify-center w-24 h-16 sm:w-28 flex-shrink-0">
                  <img 
                    src="/mediakit/suifans/suifans.png" 
                    alt="SuiFans" 
                    className="h-6 sm:h-10 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex items-center justify-center w-24 h-16 sm:w-28 flex-shrink-0">
                  <img 
                    src="/mediakit/suirobots/logo.png" 
                    alt="SuiRobots" 
                    className="h-6 sm:h-10 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
              
              {/* Duplicate set for seamless loop */}
              <div className="flex items-center justify-center space-x-8 lg:space-x-12 min-w-full">
                <div className="flex items-center justify-center w-24 h-16 sm:w-28 flex-shrink-0">
                  <img 
                    src="/mediakit/dubhe/png/a.png" 
                    alt="Dubhe" 
                    className="h-8 sm:h-12 w-auto object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="flex items-center justify-center w-24 h-16 sm:w-28 flex-shrink-0">
                  <img 
                    src="/mediakit/merak/png/a.png" 
                    alt="Merak" 
                    className="h-8 sm:h-12 w-auto object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="flex items-center justify-center w-24 h-16 sm:w-28 flex-shrink-0">
                  <img 
                    src="/mediakit/numeron/logo.png" 
                    alt="Numeron" 
                    className="h-6 sm:h-10 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="flex items-center justify-center w-24 h-16 sm:w-28 flex-shrink-0">
                  <img 
                    src="/mediakit/phad/phad.png" 
                    alt="Phad" 
                    className="h-6 sm:h-10 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="flex items-center justify-center w-24 h-16 sm:w-28 flex-shrink-0">
                  <img 
                    src="/mediakit/obelisklabs/obelisk 第一版/PNG/白色字.png" 
                    alt="Obelisk Labs" 
                    className="h-6 sm:h-10 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex items-center justify-center w-24 h-16 sm:w-28 flex-shrink-0">
                  <img 
                    src="/mediakit/sui/Sui Logo White/Sui_Logo_White.png" 
                    alt="Sui" 
                    className="h-6 sm:h-10 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex items-center justify-center w-24 h-16 sm:w-28 flex-shrink-0">
                  <img 
                    src="/mediakit/suifans/suifans.png" 
                    alt="SuiFans" 
                    className="h-6 sm:h-10 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex items-center justify-center w-24 h-16 sm:w-28 flex-shrink-0">
                  <img 
                    src="/mediakit/suirobots/logo.png" 
                    alt="SuiRobots" 
                    className="h-6 sm:h-10 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback={
        <div className="bg-slate-900 py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="h-48 bg-slate-800 animate-pulse rounded-lg" />
          </div>
        </div>
      }>
        <Footer />
      </Suspense>

    </>
  )
}