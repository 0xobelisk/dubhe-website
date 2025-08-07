"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const companies = [
  {
    name: "Dubhe",
    logo: "/mediakit/dubhe/png/a.png",
    className: "h-8 sm:h-12 w-auto object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
  },
  {
    name: "Merak",
    logo: "/mediakit/merak/png/a.png",
    className: "h-8 sm:h-12 w-auto object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
  },
  {
    name: "Numeron",
    logo: "/mediakit/numeron/logo.png",
    className: "h-6 sm:h-10 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
  },
  {
    name: "Phad",
    logo: "/mediakit/phad/phad.png",
    className: "h-6 sm:h-10 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
  },
  {
    name: "Obelisk Labs",
    logo: "/mediakit/obelisklabs/obelisk 第一版/PNG/白色字.png",
    className: "h-6 sm:h-10 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
  },
  {
    name: "Sui",
    logo: "/mediakit/sui/Sui Logo White/Sui_Logo_White.png",
    className: "h-6 sm:h-10 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
  },
  {
    name: "SuiFans",
    logo: "/mediakit/suifans/suifans.png",
    className: "h-6 sm:h-10 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
  },
  {
    name: "SuiRobots",
    logo: "/mediakit/suirobots/logo.png",
    className: "h-6 sm:h-10 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
  }
]

export default function CompaniesSection() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
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
            className={`flex ${isMobile ? 'animate-scroll-mobile' : 'animate-scroll'}`}
          >
            {/* First set of logos */}
            <div className="flex items-center justify-center space-x-8 lg:space-x-12 min-w-full">
              {companies.map((company, index) => (
                <div key={`first-${index}`} className="flex items-center justify-center w-24 h-16 sm:w-28 flex-shrink-0">
                  <Image 
                    src={company.logo} 
                    alt={company.name} 
                    width={112}
                    height={64}
                    className={company.className}
                  />
                </div>
              ))}
            </div>
            
            {/* Duplicate set for seamless loop */}
            <div className="flex items-center justify-center space-x-8 lg:space-x-12 min-w-full">
              {companies.map((company, index) => (
                <div key={`second-${index}`} className="flex items-center justify-center w-24 h-16 sm:w-28 flex-shrink-0">
                  <Image 
                    src={company.logo} 
                    alt={company.name} 
                    width={112}
                    height={64}
                    className={company.className}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-900 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-900 to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </div>
  )
}