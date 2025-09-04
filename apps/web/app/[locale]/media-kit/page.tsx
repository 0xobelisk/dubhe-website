"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  Download, 
  Copy, 
  CheckCircle, 
  Palette, 
  Type, 
  Image as ImageIcon,
  Users,
  Shield,
  Sparkles,
  ExternalLink,
  Eye,
  EyeOff
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useTranslations } from 'next-intl'
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Card from "@/components/ui/Card"
import Section from "@/components/ui/Section"

type ColorData = {
  name: string
  hex: string
  rgb: string
  usage: string
}

type AssetData = {
  name: string
  formats: string[]
  path: string
  preview: string
}

export default function MediaKitPage() {
  const t = useTranslations('mediaKit')
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [showDonts, setShowDonts] = useState(true)

  useEffect(() => {
    if (copiedText) {
      const timer = setTimeout(() => setCopiedText(null), 2000)
      return () => clearTimeout(timer)
    }
  }, [copiedText])

  // Brand Colors Data
  const baseColors: ColorData[] = [
    { name: "Slate 900", hex: "#0f172a", rgb: "15, 23, 42", usage: "Primary background" },
    { name: "Slate 800", hex: "#1e293b", rgb: "30, 41, 59", usage: "Secondary background" },
    { name: "White", hex: "#ffffff", rgb: "255, 255, 255", usage: "Primary text" },
    { name: "Gray 300", hex: "#d1d5db", rgb: "209, 213, 219", usage: "Secondary text" },
    { name: "Gray 700", hex: "#374151", rgb: "55, 65, 81", usage: "Borders" }
  ]

  const primaryColors: ColorData[] = [
    { name: "Green 400", hex: "#4ade80", rgb: "74, 222, 128", usage: "Primary brand" },
    { name: "Green 500", hex: "#22c55e", rgb: "34, 197, 94", usage: "Primary hover" },
    { name: "Blue 400", hex: "#60a5fa", rgb: "96, 165, 250", usage: "Secondary brand" },
    { name: "Blue 500", hex: "#3b82f6", rgb: "59, 130, 246", usage: "Secondary hover" }
  ]

  // Logo Assets Data
  const logoAssets: AssetData[] = [
    {
      name: "Primary Logo (Light)",
      formats: ["SVG", "PNG"],
      path: "/logo/light.png",
      preview: "/logo/light.png"
    },
    {
      name: "Primary Logo (Dark)",
      formats: ["SVG", "PNG"], 
      path: "/logo/white.png",
      preview: "/logo/white.png"
    },
    {
      name: "Symbol Mark",
      formats: ["SVG", "PNG"],
      path: "/mediakit/dubhe/png/a.png",
      preview: "/mediakit/dubhe/png/a.png"
    },
    {
      name: "Wordmark",
      formats: ["SVG", "PNG"],
      path: "/mediakit/dubhe/png/b.png", 
      preview: "/mediakit/dubhe/png/b.png"
    }
  ]

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(label)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const downloadAsset = (path: string, filename: string) => {
    const link = document.createElement('a')
    link.href = path
    link.download = filename
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const downloadBrandPack = async () => {
    try {
      // For now, download individual assets
      const assets = [
        { path: '/logo/light.png', name: 'dubhe-logo-light.png' },
        { path: '/logo/white.png', name: 'dubhe-logo-white.png' },
        { path: '/mediakit/dubhe/png/a.png', name: 'dubhe-symbol-a.png' },
        { path: '/mediakit/dubhe/png/b.png', name: 'dubhe-symbol-b.png' },
        { path: '/mediakit/dubhe/png/c.png', name: 'dubhe-symbol-c.png' },
        { path: '/mediakit/dubhe/png/d.png', name: 'dubhe-symbol-d.png' }
      ]
      
      // Download each asset with a small delay to avoid overwhelming the browser
      for (let i = 0; i < assets.length; i++) {
        const asset = assets[i]
        if (asset) {
          setTimeout(() => {
            downloadAsset(asset.path, asset.name)
          }, i * 500) // 500ms delay between downloads
        }
      }
      
      // Show a notification about the downloads
      if (typeof window !== 'undefined') {
        const notification = document.createElement('div')
        notification.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg'
        notification.textContent = 'Downloading brand assets individually. Multiple files will be downloaded.'
        document.body.appendChild(notification)
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification)
          }
        }, 5000)
      }
    } catch (error) {
      console.error('Download failed:', error)
      alert('Download failed. Please try downloading individual assets.')
    }
  }

  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-blue-900 overflow-hidden pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-green-500/30 to-blue-500/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-br from-blue-600/30 to-green-600/40 rounded-full blur-3xl"></div>
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
                className="inline-block bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-green-500/20"
              >
                <Sparkles className="w-4 h-4 inline mr-2" />
                {t('hero.badge')}
              </motion.div>

              {/* Main Headline */}
              <div className="space-y-6 max-w-4xl mx-auto">
                <motion.h1 
                  className="text-5xl lg:text-6xl font-bold text-white leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {t('hero.title1')}
                  <br />
                  <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    {t('hero.title2')}
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {t('hero.subtitle')}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="pt-8"
                >
                  <button
                    onClick={downloadBrandPack}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 mx-auto"
                  >
                    <Download className="w-5 h-5" />
                    {t('hero.downloadPack')}
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logo Section */}
      <Section 
        title={t('logo.title')} 
        subtitle={t('logo.subtitle')}
        className="bg-slate-900"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {logoAssets.map((asset, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card variant="glass" className="text-center">
                <div className="bg-white/5 rounded-lg p-8 mb-4 relative h-20 flex items-center justify-center">
                  <Image
                    src={asset.preview}
                    alt={asset.name}
                    fill
                    className="object-contain"
                    priority={index < 2}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwABmX/9k="
                    onError={(e) => {
                      console.error('Image failed to load:', asset.preview)
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{asset.name}</h3>
                <p className="text-gray-400 text-sm mb-4">
                  {t('logo.availableFormats')}: {asset.formats.join(', ')}
                </p>
                <button
                  onClick={() => downloadAsset(asset.path, asset.name)}
                  className="w-full bg-gradient-to-r from-green-500/20 to-blue-500/20 hover:from-green-500/30 hover:to-blue-500/30 border border-green-500/20 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                  aria-label={`Download ${asset.name} in ${asset.formats.join(' and ')} formats`}
                >
                  <Download className="w-4 h-4" />
                  {t('logo.download')}
                </button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Logo Usage Guidelines */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card variant="glass">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-semibold text-white">{t('logo.dos.title')}</h3>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li>• {t('logo.dos.item1')}</li>
              <li>• {t('logo.dos.item2')}</li>
              <li>• {t('logo.dos.item3')}</li>
              <li>• {t('logo.dos.item4')}</li>
            </ul>
          </Card>

          <Card variant="glass">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {showDonts ? <EyeOff className="w-6 h-6 text-red-400" /> : <Eye className="w-6 h-6 text-red-400" />}
                <h3 className="text-xl font-semibold text-white">{t('logo.donts.title')}</h3>
              </div>
              <button
                onClick={() => setShowDonts(!showDonts)}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {showDonts ? t('logo.donts.hide') : t('logo.donts.show')}
              </button>
            </div>
            {showDonts && (
              <ul className="space-y-3 text-gray-300">
                <li className="line-through opacity-60">• {t('logo.donts.item1')}</li>
                <li className="line-through opacity-60">• {t('logo.donts.item2')}</li>
                <li className="line-through opacity-60">• {t('logo.donts.item3')}</li>
                <li className="line-through opacity-60">• {t('logo.donts.item4')}</li>
              </ul>
            )}
          </Card>
        </div>
      </Section>

      {/* Clear Space Guidelines */}
      <Section 
        title={t('clearspace.title')} 
        subtitle={t('clearspace.subtitle')}
        className="bg-slate-800/50"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card variant="glass">
              <div className="text-center p-8">
                <div className="relative inline-block">
                  {/* Grid overlay to show spacing */}
                  <div className="absolute inset-0 border-2 border-dashed border-green-400/30 -m-8"></div>
                  <div className="absolute inset-0 border border-dashed border-green-400/20 -m-12"></div>
                  <Image
                    src="/logo/light.png"
                    alt="Logo with clearspace"
                    width={160}
                    height={38}
                    className="object-contain"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwABmX/9k="
                  />
                </div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">{t('clearspace.minimum')}</h3>
              <p className="text-gray-300 leading-relaxed">
                {t('clearspace.description')}
              </p>
            </div>
            
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-white mb-2">{t('clearspace.specifications')}</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• {t('clearspace.spec1')}</li>
                <li>• {t('clearspace.spec2')}</li>
                <li>• {t('clearspace.spec3')}</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Symbol/Mark Section */}
      <Section 
        title={t('symbol.title')} 
        subtitle={t('symbol.subtitle')}
        className="bg-slate-900"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <Card variant="glass" className="text-center">
              <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-lg p-12 relative h-32 flex items-center justify-center">
                <Image
                  src="/mediakit/dubhe/png/a.png"
                  alt="Dubhe Symbol"
                  fill
                  className="object-contain"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwABmX/9k="
                />
              </div>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">{t('symbol.meaning.title')}</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                {t('symbol.meaning.description')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-2">{t('symbol.usage.standalone')}</h4>
                <p className="text-gray-400 text-sm">{t('symbol.usage.standaloneDesc')}</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-2">{t('symbol.usage.app')}</h4>
                <p className="text-gray-400 text-sm">{t('symbol.usage.appDesc')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Partnership Guidelines */}
      <Section 
        title={t('partnership.title')} 
        subtitle={t('partnership.subtitle')}
        className="bg-slate-800/50"
      >
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card variant="glass">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-6">{t('partnership.cobranding')}</h3>
                <div className="flex items-center justify-center gap-8 p-8 bg-white/5 rounded-lg">
                  <Image
                    src="/logo/light.png"
                    alt="Dubhe Logo"
                    width={120}
                    height={28}
                    className="object-contain"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwABmX/9k="
                  />
                  <div className="w-px h-12 bg-gray-600"></div>
                  <div className="w-120 h-36 bg-gray-700/50 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">{t('partnership.partnerLogo')}</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card variant="glass">
              <h4 className="text-lg font-semibold text-white mb-4">{t('partnership.spacing.title')}</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• {t('partnership.spacing.rule1')}</li>
                <li>• {t('partnership.spacing.rule2')}</li>
                <li>• {t('partnership.spacing.rule3')}</li>
              </ul>
            </Card>
            
            <Card variant="glass">
              <h4 className="text-lg font-semibold text-white mb-4">{t('partnership.approval.title')}</h4>
              <p className="text-gray-300 mb-4">{t('partnership.approval.description')}</p>
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
              >
                {t('partnership.approval.contact')}
                <ExternalLink className="w-4 h-4" />
              </Link>
            </Card>
          </div>
        </div>
      </Section>

      {/* Color Palette */}
      <Section 
        title={t('colors.title')} 
        subtitle={t('colors.subtitle')}
        className="bg-slate-900"
      >
        <div className="space-y-12">
          {/* Base Colors */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">{t('colors.base.title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {baseColors.map((color, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card variant="glass" className="text-center">
                    <div 
                      className="w-full h-16 rounded-lg mb-4"
                      style={{ backgroundColor: color.hex }}
                    ></div>
                    <h4 className="text-lg font-semibold text-white mb-2">{color.name}</h4>
                    <button
                      onClick={() => copyToClipboard(color.hex, `${color.name} HEX`)}
                      className="text-sm text-gray-400 hover:text-white transition-colors mb-1 flex items-center justify-center gap-1 w-full focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-800 rounded px-2 py-1"
                      aria-label={`Copy ${color.name} HEX color code ${color.hex}`}
                    >
                      {copiedText === `${color.name} HEX` ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      {color.hex}
                    </button>
                    <button
                      onClick={() => copyToClipboard(color.rgb, `${color.name} RGB`)}
                      className="text-sm text-gray-400 hover:text-white transition-colors mb-2 flex items-center justify-center gap-1 w-full focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-800 rounded px-2 py-1"
                      aria-label={`Copy ${color.name} RGB color code ${color.rgb}`}
                    >
                      {copiedText === `${color.name} RGB` ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      RGB({color.rgb})
                    </button>
                    <p className="text-xs text-gray-500">{color.usage}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Primary Colors */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">{t('colors.primary.title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {primaryColors.map((color, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card variant="glass" className="text-center">
                    <div 
                      className="w-full h-16 rounded-lg mb-4"
                      style={{ backgroundColor: color.hex }}
                    ></div>
                    <h4 className="text-lg font-semibold text-white mb-2">{color.name}</h4>
                    <button
                      onClick={() => copyToClipboard(color.hex, `${color.name} HEX`)}
                      className="text-sm text-gray-400 hover:text-white transition-colors mb-1 flex items-center justify-center gap-1 w-full focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-800 rounded px-2 py-1"
                      aria-label={`Copy ${color.name} HEX color code ${color.hex}`}
                    >
                      {copiedText === `${color.name} HEX` ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      {color.hex}
                    </button>
                    <button
                      onClick={() => copyToClipboard(color.rgb, `${color.name} RGB`)}
                      className="text-sm text-gray-400 hover:text-white transition-colors mb-2 flex items-center justify-center gap-1 w-full focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-800 rounded px-2 py-1"
                      aria-label={`Copy ${color.name} RGB color code ${color.rgb}`}
                    >
                      {copiedText === `${color.name} RGB` ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      RGB({color.rgb})
                    </button>
                    <p className="text-xs text-gray-500">{color.usage}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Typography */}
      <Section 
        title={t('typography.title')} 
        subtitle={t('typography.subtitle')}
        className="bg-slate-800/50"
      >
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card variant="glass">
              <h3 className="text-xl font-semibold text-white mb-4">{t('typography.primary.title')}</h3>
              <div className="space-y-4">
                <div className="font-sans">
                  <h4 className="text-3xl font-bold text-white mb-2">Geist Sans</h4>
                  <p className="text-gray-400">{t('typography.primary.description')}</p>
                  <div className="mt-4 space-y-2">
                    <div className="text-2xl font-light text-gray-300">Light</div>
                    <div className="text-2xl font-normal text-gray-300">Regular</div>
                    <div className="text-2xl font-medium text-gray-300">Medium</div>
                    <div className="text-2xl font-semibold text-gray-300">Semibold</div>
                    <div className="text-2xl font-bold text-gray-300">Bold</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card variant="glass">
              <h3 className="text-xl font-semibold text-white mb-4">{t('typography.mono.title')}</h3>
              <div className="space-y-4">
                <div className="font-mono">
                  <h4 className="text-3xl font-bold text-white mb-2">Geist Mono</h4>
                  <p className="text-gray-400">{t('typography.mono.description')}</p>
                  <div className="mt-4 space-y-2 text-gray-300">
                    <div className="text-lg">console.log("Hello World")</div>
                    <div className="text-lg">const dubhe = "Move Platform"</div>
                    <div className="text-lg">function buildDApp() {}</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Typography Scale */}
          <Card variant="glass">
            <h3 className="text-xl font-semibold text-white mb-6">{t('typography.scale.title')}</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="text-5xl font-bold text-white">H1 Heading</div>
                  <div className="text-4xl font-bold text-white">H2 Heading</div>
                  <div className="text-3xl font-bold text-white">H3 Heading</div>
                  <div className="text-2xl font-semibold text-white">H4 Heading</div>
                  <div className="text-xl font-semibold text-white">H5 Heading</div>
                  <div className="text-lg font-semibold text-white">H6 Heading</div>
                </div>
                <div className="space-y-4">
                  <div className="text-xl text-gray-300">Body Large</div>
                  <div className="text-base text-gray-300">Body Regular</div>
                  <div className="text-sm text-gray-400">Body Small</div>
                  <div className="text-xs text-gray-400">Caption</div>
                  <div className="text-xs font-semibold text-green-400 uppercase tracking-wider">Label</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Download Section */}
      <Section 
        title={t('download.title')} 
        subtitle={t('download.subtitle')}
        className="bg-slate-900"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Card variant="glass" className="max-w-lg mx-auto">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                <Download className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{t('download.pack.title')}</h3>
                <p className="text-gray-300 mb-6">{t('download.pack.description')}</p>
              </div>
              <button
                onClick={downloadBrandPack}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                {t('download.pack.button')}
              </button>
              
              <div className="pt-6 border-t border-gray-700">
                <p className="text-sm text-gray-400 mb-4">{t('download.contact.description')}</p>
                <Link 
                  href="/contact" 
                  className="text-green-400 hover:text-green-300 transition-colors inline-flex items-center gap-1"
                >
                  {t('download.contact.button')}
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Card>
        </motion.div>
      </Section>

      <Footer />
    </>
  )
}