"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@workspace/ui/components/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "星际漫游",
    description: "一款宏大的太空探索游戏，拥有程序生成的星球和沉浸式叙事体验。",
    category: "角色扮演",
    image: "https://images.unsplash.com/photo-1518365050014-70fe7232897f?q=80&w=2574&auto=format&fit=crop",
    studio: "星辰工作室",
  },
  {
    id: 2,
    title: "神秘领域",
    description: "一款拥有惊艳视觉效果和精细战斗机制的奇幻冒险游戏。",
    category: "动作冒险",
    image: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=2370&auto=format&fit=crop",
    studio: "奥术游戏",
  },
  {
    id: 3,
    title: "都市传说",
    description: "以现代城市为背景的叙事驱动恐怖游戏，包含深度心理元素。",
    category: "恐怖",
    image: "https://images.unsplash.com/photo-1605806616949-1e87ac5db50f?q=80&w=2574&auto=format&fit=crop",
    studio: "暗影互动",
  },
  {
    id: 4,
    title: "极速漂移",
    description: "一款高能竞速游戏，拥有真实物理引擎和可定制车辆。",
    category: "竞速",
    image: "https://images.unsplash.com/photo-1543872084-c7bd3822856f?q=80&w=2574&auto=format&fit=crop",
    studio: "极速游戏",
  },
]

export default function Showcase() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextProject = () => {
    setActiveIndex((current) => (current + 1) % projects.length)
  }

  const prevProject = () => {
    setActiveIndex((current) => (current - 1 + projects.length) % projects.length)
  }

  const activeProject = projects[activeIndex]

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-[1072px] px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-base font-semibold leading-7 text-[#0071e3]">游戏展示</h2>
          <p className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl text-foreground">
            Dubhe Engine 驱动的精彩游戏
          </p>
          <p className="mt-6 text-xl leading-8 text-foreground/80">
            从独立佳作到顶级大作，探索世界各地创作者使用Dubhe Engine开发的精彩游戏。
          </p>
        </div>
        
        <div className="mx-auto mt-16 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="relative lg:flex-grow overflow-hidden rounded-3xl shadow-lg border border-gray-200 dark:border-gray-800">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={activeProject.image}
                  alt={activeProject.title}
                  fill
                  className="object-cover transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex flex-col">
                    <span className="inline-flex items-center rounded-full bg-[#0071e3]/10 px-3 py-1 text-xs font-medium text-[#0071e3] w-fit mb-3">
                      {activeProject.category}
                    </span>
                    <h3 className="text-2xl font-semibold text-foreground sm:text-3xl">{activeProject.title}</h3>
                    <p className="mt-2 text-base text-foreground/80">{activeProject.description}</p>
                    <p className="mt-4 text-sm font-medium">开发: {activeProject.studio}</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute right-6 bottom-6 flex space-x-3">
                <Button variant="outline" size="icon" onClick={prevProject} className="rounded-full bg-background/80 backdrop-blur-sm border-gray-200/30 dark:border-gray-800/30 hover:bg-background/90">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={nextProject} className="rounded-full bg-background/80 backdrop-blur-sm border-gray-200/30 dark:border-gray-800/30 hover:bg-background/90">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="lg:w-1/3">
              <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-background p-6 shadow-sm h-full">
                <h3 className="text-base font-medium leading-7 mb-6">精选项目</h3>
                <div className="flex flex-col gap-y-4">
                  {projects.map((project, index) => (
                    <button
                      key={project.id}
                      onClick={() => setActiveIndex(index)}
                      className={`flex items-start gap-x-4 rounded-xl p-3 text-left transition-colors ${
                        index === activeIndex 
                          ? "bg-[#0071e3]/10 text-[#0071e3]" 
                          : "hover:bg-gray-50 dark:hover:bg-gray-900"
                      }`}
                    >
                      <div className="h-14 w-14 flex-none overflow-hidden rounded-lg">
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={80}
                          height={80}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-medium leading-6">
                          {project.title}
                        </p>
                        <p className="mt-1 truncate text-xs text-foreground/70">
                          {project.studio} • {project.category}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 