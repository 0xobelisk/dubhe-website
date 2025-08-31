"use client"

import { motion } from "framer-motion"
import { FileText, ExternalLink, Download } from "lucide-react"
import { useTranslations } from 'next-intl'
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Card from "@/components/ui/Card"

interface PaperCardProps {
  title: string;
  description: string;
  pdfUrl: string;
  icon: React.ReactNode;
  downloadLabel: string;
}

function PaperCard({ title, description, pdfUrl, icon, downloadLabel }: PaperCardProps) {
  const handleDownload = () => {
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card 
      variant="glass" 
      padding="lg" 
      clickable 
      onClick={handleDownload}
      className="hover:border-blue-400/50 transition-all duration-300 group"
    >
      <div className="flex items-start gap-6">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-2xl font-bold text-white">{title}</h3>
            <ExternalLink className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <p className="text-gray-300 mb-4 leading-relaxed">{description}</p>
          <div className="flex items-center gap-2 text-blue-400 font-medium">
            <Download className="w-4 h-4" />
            <span>{downloadLabel}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function PapersPage() {
  const t = useTranslations('papers')
  
  // PDF URLs pointing to assets directory
  const getLightpaperUrl = () => {
    return `/en/assets/Lightpaper.pdf`;
  };
  
  const getOnepaperUrl = () => {
    return `/en/assets/Onepaper.pdf`;
  };


  return (
    <>
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 overflow-hidden">
        {/* Background Effects - reusing existing pattern */}
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-r from-slate-900/20 via-purple-800/30 to-blue-900/20">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-700/20 to-purple-800/30"></div>
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/40 to-blue-500/50 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-br from-blue-600/40 to-purple-600/50 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            
            {/* Page Header */}
            <div className="text-center mb-16">
              <div className="inline-block bg-gradient-to-r from-purple-100/10 to-blue-100/10 text-purple-300 px-6 py-2 rounded-full text-sm font-medium mb-6 border border-purple-400/20">
                {t('hero.badge')}
              </div>
              <motion.h1 
                className="text-5xl lg:text-6xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {t('hero.title')}
              </motion.h1>
              <motion.p 
                className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {t('hero.subtitle')}
              </motion.p>
            </div>

            {/* Papers Grid - 2 column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <PaperCard
                  title={t('lightpaper.title')}
                  description={t('lightpaper.description')}
                  pdfUrl={getLightpaperUrl()}
                  icon={<FileText className="w-8 h-8" />}
                  downloadLabel={t('lightpaper.downloadLabel')}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <PaperCard
                  title={t('onepager.title')}
                  description={t('onepager.description')}
                  pdfUrl={getOnepaperUrl()}
                  icon={<FileText className="w-8 h-8" />}
                  downloadLabel={t('onepager.downloadLabel')}
                />
              </motion.div>
            </div>

            {/* Additional Info */}
            <motion.div 
              className="text-center mt-12 text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <p className="flex items-center justify-center gap-2">
                <ExternalLink className="w-4 h-4" />
                {t('openInNewTab')}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </>
  );
}