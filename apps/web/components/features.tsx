import { 
  Layers, 
  Code, 
  Box, 
  Cpu, 
  Shield, 
  Users, 
  Bolt, 
  Workflow 
} from "lucide-react"

const features = [
  {
    name: "渲染技术",
    description:
      "先进的渲染技术，支持实时光线追踪、动态光照和高级材质系统，呈现真实视觉效果。",
    icon: Layers,
  },
  {
    name: "可视化脚本",
    description:
      "无需编码，使用直观的可视化脚本系统创建复杂游戏逻辑，为设计师和艺术家提供便利。",
    icon: Workflow,
  },
  {
    name: "高级物理引擎",
    description:
      "真实物理模拟，精确碰撞检测，刚体动力学和柔体变形，创造逼真的物理交互。",
    icon: Box,
  },
  {
    name: "高性能",
    description:
      "针对现代硬件优化，支持多线程和高效内存管理，确保游戏运行流畅无阻。",
    icon: Bolt,
  },
  {
    name: "跨平台支持",
    description:
      "单一代码库即可部署至PC、主机、移动设备和VR平台，轻松实现多端发布。",
    icon: Cpu,
  },
  {
    name: "开发工具",
    description:
      "全套开发工具，包括可视化调试、性能分析和资源管理系统，简化开发流程。",
    icon: Code,
  },
  {
    name: "社区与资源库",
    description:
      "访问丰富的资源库，包含由活跃开发者社区创建的资产、插件和扩展。",
    icon: Users,
  },
  {
    name: "安全与可靠",
    description:
      "以安全为设计核心，提供稳定的发布版本、定期更新和知识产权强大保护。",
    icon: Shield,
  },
]

export default function Features() {
  return (
    <div className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-900/50">
      <div className="mx-auto max-w-[1072px] px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-[#0071e3]">全方位功能</h2>
          <p className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl text-foreground">
            为雄心勃勃的创作者提供强大工具
          </p>
          <p className="mt-6 text-xl leading-8 text-foreground/80">
            Dubhe Engine 提供了将游戏创意变为现实所需的一切工具，具有直观的工作流程，适用于从独立开发者到专业工作室的各类团队。
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-4 md:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name} className="relative overflow-hidden rounded-3xl p-8 bg-background shadow-sm border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-md group">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0071e3]/10 mb-6 group-hover:bg-[#0071e3]/20 transition-colors duration-300">
                  <feature.icon className="h-5 w-5 text-[#0071e3]" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold leading-7 text-foreground mb-2">{feature.name}</h3>
                <p className="text-base leading-7 text-foreground/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 