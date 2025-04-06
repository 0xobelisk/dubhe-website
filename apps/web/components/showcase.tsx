"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@workspace/ui/components/button"
import { ChevronLeft, ChevronRight, Play, Code, ExternalLink, ArrowRight } from "lucide-react"
import Link from "next/link"

// 添加自定义Numeron Logo组件
function NumeronLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center w-full h-full ${className}`}>
      <div className="bg-[#453a6e] w-full h-full flex items-center justify-center px-6 py-3 rounded-full">
        <span className="text-[#f4d76c] font-bold text-2xl tracking-wide whitespace-nowrap" style={{ fontFamily: 'Arial, sans-serif' }}>
          NUMER<span className="relative inline-flex items-center">
            <span className="text-[#f4d76c]">O</span>
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="5" stroke="#f4d76c" strokeWidth="1.5" fill="none"/>
                <circle cx="12" cy="12" r="2" fill="#f4d76c"/>
              </svg>
            </span>
          </span>N
        </span>
      </div>
    </div>
  );
}

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  studio: string;
  app_link: string;
  customLogo?: boolean; // 添加自定义logo标志
}

const projects: Project[] = [
  {
    id: 1,
    title: "Merak",
    description: "Merak is a privacy-preserving DeFi liquidity hub built on dubhe engine.",
    category: "Defi",
    image: "/logo/merak/light.png",
    studio: "Obelisk Labs",
    app_link: "https://merak.obelisk.build"
  },
  {
    id: 2,
    title: "Numeron",
    description: "A fantasy adventure game with stunning visual effects and refined combat mechanics.",
    category: "Gaming",
    image: "/logo/numeron/logo.png", // 保持此路径以防将来添加实际图片
    studio: "Numeron OS",
    app_link: "https://numeron.world",
    customLogo: true // 使用自定义logo
  },
  {
    id: 3,
    title: "Phad",
    description: "re-encrypted expansion framework",
    category: "infra",
    image: "/logo/phad/light.png", // 保持此路径以防将来添加实际图片
    studio: "Obelisk Labs",
    app_link: "https://phad.obelisk.build",
    // customLogo: true // 使用自定义logo
  },
]

export default function Showcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const nextProject = () => {
    setActiveIndex((current) => (current + 1) % projects.length)
  }

  const prevProject = () => {
    setActiveIndex((current) => (current - 1 + projects.length) % projects.length)
  }

  // Ensure we always have a valid project by using a default if index is invalid
  const safeIndex = activeIndex >= 0 && activeIndex < projects.length ? activeIndex : 0
  const activeProject: Project = projects[safeIndex]!

  return (
    <div className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-black -z-10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5 -z-10" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full filter blur-[120px] bg-blue-500 opacity-10 -z-10" />
      
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-base font-semibold leading-7 text-blue-400 mb-3">FEATURED PROJECTS</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-white">
            Amazing Dapps Powered by Dubhe Engine
          </p>
          <p className="mt-6 text-xl leading-8 text-gray-300">
            From indie gems to top-tier productions, explore the amazing games created by developers around the world using Dubhe Engine.
          </p>
        </div>
        
        <div className={`mx-auto mt-16 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Main Showcase */}
            <div className="lg:col-span-3 relative">
              <div className="mb-4 flex items-center justify-between">
                <span className="inline-flex items-center rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-400 w-fit">
                  {activeProject.category}
                </span>
                <div className="flex space-x-3">
                  <Button variant="outline" size="icon" onClick={prevProject} className="rounded-full bg-black/50 backdrop-blur-sm border-gray-700/30 hover:bg-black/70 hover:border-blue-500/50">
                    <ChevronLeft className="h-4 w-4 text-white" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={nextProject} className="rounded-full bg-black/50 backdrop-blur-sm border-gray-700/30 hover:bg-black/70 hover:border-blue-500/50">
                    <ChevronRight className="h-4 w-4 text-white" />
                  </Button>
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-xl shadow-2xl shadow-blue-900/10 border border-gray-800">
                <div className="relative aspect-[16/9] w-full transform transition-transform duration-700 hover:scale-105">
                  {activeProject.customLogo ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#09101d] p-4">
                      <div className="max-w-[180px]">
                        <NumeronLogo />
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={activeProject.image}
                      alt={activeProject.title}
                      fill
                      className="object-contain bg-gray-900 p-4 transition-all duration-700 group-hover:brightness-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      unoptimized
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                </div>
                
                {/* Project Details Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-500 group-hover:translate-y-0 translate-y-0">
                  <div className="flex flex-col">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold text-white sm:text-3xl mb-1">{activeProject.title}</h3>
                        <p className="text-sm text-gray-400 mb-4">By {activeProject.studio}</p>
                      </div>
                      
                      <div className="flex space-x-3">
                        {/* <Button variant="outline" size="icon" className="rounded-full bg-black/30 backdrop-blur-sm border-gray-700/30 hover:bg-black/50 hover:border-blue-500/50">
                          <Play className="h-4 w-4 text-blue-400" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full bg-black/30 backdrop-blur-sm border-gray-700/30 hover:bg-black/50 hover:border-blue-500/50">
                          <Code className="h-4 w-4 text-blue-400" />
                        </Button> */}
                      </div>
                    </div>
                    
                    <p className="mt-2 text-base text-gray-300">{activeProject.description}</p>
                    
                    <div className="mt-6 flex gap-4">
                      <Link
                        href={activeProject.app_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20 hover:border-blue-500/50 text-white flex items-center px-4 py-2 text-sm font-medium transition-colors"
                      >
                        <span>View Project</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                      <Button
                        variant="ghost"
                        className="rounded text-gray-400"
                      >
                        <span>Made with Dubhe Engine</span>
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Project Thumbnails */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 shadow-lg h-full">
                <h3 className="text-lg font-semibold text-white mb-6">Featured Projects</h3>
                <div className="flex flex-col gap-y-4">
                  {projects.map((project, index) => (
                    <button
                      key={project.id}
                      onClick={() => setActiveIndex(index)}
                      className={`flex items-start gap-x-4 rounded-lg p-3 text-left transition-all duration-300 ${
                        index === activeIndex 
                          ? "bg-blue-500/10 border border-blue-500/20" 
                          : "hover:bg-gray-800 border border-transparent"
                      }`}
                    >
                      <div className="h-16 w-24 flex-none overflow-hidden rounded-md relative bg-[#09101d]">
                        {project.customLogo ? (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="scale-75">
                              <NumeronLogo />
                            </div>
                          </div>
                        ) : (
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className={`object-contain p-1 transition-all duration-300 ${index === activeIndex ? 'brightness-110' : 'brightness-75'}`}
                            sizes="96px"
                            unoptimized
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-auto">
                        <p className={`text-sm font-medium leading-6 ${index === activeIndex ? 'text-blue-400' : 'text-white'}`}>
                          {project.title}
                        </p>
                        <p className="mt-1 truncate text-xs text-gray-400">
                          {project.studio} • {project.category}
                        </p>
                        
                        {/* Progress indicator */}
                        <div className="w-full h-1 bg-gray-800 rounded-full mt-2 overflow-hidden">
                          <div 
                            className={`h-full bg-blue-500 rounded-full transition-all duration-300 ${index === activeIndex ? 'w-full' : 'w-0'}`}
                          ></div>
                        </div>
                      </div>
                    </button>
                  ))}
                  
                  <div className="flex items-center justify-between pt-4 text-sm">
                    <span className="text-gray-400">
                      {activeIndex + 1}/{projects.length}
                    </span>
                    {/* <Button 
                      variant="link" 
                      className="text-blue-400 hover:text-blue-300 p-0"
                    >
                      <span>View all projects</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 