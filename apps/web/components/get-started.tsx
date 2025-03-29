import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import { Download, ExternalLink, FileText, Play } from "lucide-react"

export default function GetStarted() {
  return (
    <div className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-900/50">
      <div className="mx-auto max-w-[1072px] px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl text-foreground">
            准备打造您的下一个杰作？
          </h2>
          <p className="mt-6 text-xl leading-8 text-foreground/80">
            加入已在使用Dubhe Engine实现创意愿景的数千开发者和工作室的行列。
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4">
            <Button 
              size="lg" 
              className="gap-2 w-full sm:w-auto rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white px-8 py-6 text-base transition-colors duration-300"
            >
              <Download className="h-4 w-4 mr-2" />
              立即下载
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="gap-2 w-full sm:w-auto rounded-full border-gray-200 dark:border-gray-800 hover:bg-background/80 px-8 py-6 text-base transition-colors duration-300"
            >
              <Play className="h-4 w-4 mr-2" />
              在线体验
            </Button>
          </div>
        </div>
        
        <div className="mx-auto mt-16 max-w-5xl rounded-3xl ring-1 ring-gray-200 dark:ring-gray-700 sm:mt-20 lg:mx-0 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="p-8 sm:p-10 lg:col-span-7">
              <h3 className="text-2xl font-semibold tracking-tight text-foreground">开始使用 Dubhe Engine</h3>
              <p className="mt-6 text-base leading-7 text-foreground/80">
                Dubhe Engine提供灵活的授权选项，无论您是独立开发者、教育机构还是企业工作室，都能找到适合自己的方案。
              </p>
              <div className="mt-10 flex items-center gap-x-4">
                <h4 className="flex-none text-sm font-medium leading-6 text-[#0071e3]">包含内容</h4>
                <div className="h-px flex-auto bg-gray-200 dark:bg-gray-700"></div>
              </div>
              <ul role="list" className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 sm:grid-cols-2">
                {[
                  "完整引擎源代码",
                  "可视化脚本系统",
                  "高级物理模拟",
                  "跨平台部署",
                  "资源市场访问权限",
                  "定期更新与支持",
                  "开发者社区访问",
                  "详尽的文档"
                ].map((feature) => (
                  <li key={feature} className="flex gap-x-3 items-center">
                    <svg className="h-4 w-4 flex-none text-[#0071e3]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5 bg-gray-50 dark:bg-gray-800/50">
              <div className="h-full py-10 px-8 sm:px-10 flex flex-col justify-center lg:py-16">
                <div className="mx-auto max-w-xs">
                  <p className="text-base font-medium text-foreground">从免费版开始</p>
                  <p className="mt-6 flex items-baseline justify-center gap-x-2">
                    <span className="text-5xl font-semibold tracking-tight text-foreground">¥0</span>
                    <span className="text-sm font-medium text-foreground/70">独立开发者专享</span>
                  </p>
                  <Button 
                    className="mt-10 w-full rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white transition-colors duration-300"
                  >
                    下载免费版
                  </Button>
                  <p className="mt-6 text-xs leading-5 text-foreground/70 text-center">
                    个人和教育用途免费使用 <br />
                    收入上限10万元
                  </p>
                  <div className="mt-6 flex justify-center">
                    <Link href="/pricing" className="text-sm font-medium text-[#0071e3] flex items-center gap-1 hover:underline">
                      <FileText className="h-4 w-4" />
                      查看所有价格方案
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-24 text-center">
          <h3 className="text-base font-semibold leading-7 text-[#0071e3]">加入我们的社区</h3>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">与全球开发者共同交流</p>
          <p className="mt-6 text-xl text-foreground/80">
            获取帮助、分享您的作品，并与世界各地的开发者合作。
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {[
              { name: "Discord", href: "#" },
              { name: "论坛", href: "#" },
              { name: "GitHub", href: "#" },
              { name: "哔哩哔哩", href: "#" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="rounded-full px-5 py-2.5 text-sm font-medium border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300 flex items-center gap-2"
              >
                {item.name}
                <ExternalLink className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 