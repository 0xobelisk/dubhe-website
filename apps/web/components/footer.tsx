import Link from "next/link"
import Image from "next/image"
import { ArrowRight, GitBranch, Github, Twitter, Youtube } from "lucide-react"

const navigation = {
  product: [
    // { name: "Features", href: "/features" },
    // { name: "Pricing", href: "/pricing" },
    { name: "Download", href: "https://dubhe-docs.obelisk.build/dubhe/sui/quick-start" },
    { name: "Release Notes", href: "https://github.com/0xobelisk/dubhe/releases" },
  ],
  resources: [
    { name: "Documentation", href: "https://dubhe-docs.obelisk.build/" },
    { name: "Tutorials", href: "https://dubhe-docs.obelisk.build/dubhe/sui/tutorials/" },
    { name: "CLI Reference", href: "https://dubhe-docs.obelisk.build/dubhe/sui/cli/" },
    { name: "Client", href: "https://dubhe-docs.obelisk.build/dubhe/sui/client/" },
  ],
  community: [
    // { name: "Forum", href: "/forums" },
    { name: "Discord", href: "https://discord.gg/DygsBZecYA" },
    { name: "GitHub", href: "https://github.com/0xobelisk/dubhe" },
    { name: "Youtube", href: "https://www.youtube.com/@DubheEngine" },
  ],
  company: [
    { name: "About Us", href: "https://obelisk.build" },
    { name: "Blog", href: "https://obelisk.build/blog" },
    // { name: "Careers", href: "/careers" },
    { name: "Contact Us", href: "https://obelisk.build/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "https://obelisk.build/privacy-policy" },
    { name: "Terms of Service", href: "https://obelisk.build/terms-of-use" },
    { name: "License Agreement", href: "https://github.com/0xobelisk/dubhe?tab=License-1-ov-file#readme" },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 relative" aria-labelledby="footer-heading">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />
      
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-[1200px] px-6 pb-12 pt-16 sm:pt-20 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-6">
            <Link href="/" className="group flex items-center">
              <Image 
                src="/logo/light.png" 
                alt="Dubhe Engine" 
                width={160} 
                height={48} 
                className="h-10 w-auto transition-opacity duration-200 hover:opacity-80"
              />
            </Link>
            <p className="text-sm leading-6 text-gray-400">
              Create exceptional dapp experiences with the most advanced Move development platform.
            </p>
            <div className="flex space-x-5">
              <a href="https://x.com/DubheEngine" className="text-gray-500 hover:text-blue-400 transition-colors duration-300">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://github.com/0xobelisk/dubhe" className="text-gray-500 hover:text-blue-400 transition-colors duration-300">
                <span className="sr-only">GitHub</span>
                <Github className="h-5 w-5" />
              </a>
              <a href="https://www.youtube.com/@DubheEngine" className="text-gray-500 hover:text-blue-400 transition-colors duration-300">
                <span className="sr-only">YouTube</span>
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white">Product</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {navigation.product.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                        <span className="h-px w-4 bg-gray-700 mr-2 transition-all duration-300 group-hover:w-6 group-hover:bg-blue-500" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-white">Resources</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {navigation.resources.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm leading-6 text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                      >
                        <span className="h-px w-4 bg-gray-700 mr-2 transition-all duration-300 group-hover:w-6 group-hover:bg-blue-500" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white">Community</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {navigation.community.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                        <span className="h-px w-4 bg-gray-700 mr-2 transition-all duration-300 group-hover:w-6 group-hover:bg-blue-500" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-white">Company</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                        <span className="h-px w-4 bg-gray-700 mr-2 transition-all duration-300 group-hover:w-6 group-hover:bg-blue-500" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to action */}
        {/* <div className="mt-16 border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-white">Subscribe to our newsletter</h3>
            <p className="mt-2 text-sm text-gray-400">Get the latest updates and news directly to your inbox.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="relative rounded-md shadow-sm overflow-hidden">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="px-4 py-2 bg-gray-900 border-0 focus:ring-0 focus:outline-none text-white text-sm w-64 rounded-l-md" 
                />
                <button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-4 py-2 text-sm font-medium transition-all duration-200 rounded-r-md flex items-center">
                  Subscribe
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div> */}
        
        {/* Legal section */}
        <div className="mt-8 border-t border-gray-800 pt-8 sm:mt-12 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs leading-5 text-gray-500">
            &copy; {new Date().getFullYear()} Dubhe Technology Group Limited. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            {navigation.legal.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xs leading-5 text-gray-500 hover:text-blue-400 transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
} 