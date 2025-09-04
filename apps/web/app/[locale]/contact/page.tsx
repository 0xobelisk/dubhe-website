"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, MessageSquare, Send, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { useTranslations } from 'next-intl'

export default function ContactPage() {
  const t = useTranslations('contact')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  const getCharacterCountColor = (count: number): string => {
    if (count >= 4000) return 'text-red-500'
    if (count >= 3600) return 'text-orange-500'
    return 'text-gray-400'
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    // Prevent input beyond 4000 characters for message field
    if (name === 'message' && value.length > 4000) {
      return
    }
    
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    console.log('Submitting form with data:', formData)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      console.log('Response status:', response.status, 'Response data:', data)

      if (response.ok && data.success) {
        console.log('Form submitted successfully')
        setSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
        setNotification({ type: 'success', message: t('form.success.message') })
        // Show success message for 5 seconds then reset
        setTimeout(() => {
          setSubmitted(false)
          setNotification(null)
        }, 5000)
      } else {
        console.error('Form submission failed:', data)
        let errorMsg = ''
        if (data.details && Array.isArray(data.details)) {
          // 显示验证错误详情
          const errorMessages = data.details.map((err: { message: string }) => err.message).join(', ')
          errorMsg = `${t('form.validationError')}: ${errorMessages}`
        } else {
          errorMsg = data.error || t('form.sendError')
        }
        setError(errorMsg)
        setNotification({ type: 'error', message: errorMsg })
        setTimeout(() => setNotification(null), 5000)
      }
    } catch (err) {
      console.error('Error sending message:', err)
      const errorMsg = t('form.networkError')
      setError(errorMsg)
      setNotification({ type: 'error', message: errorMsg })
      setTimeout(() => setNotification(null), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: t('info.email.title'),
      content: "hello@obelisk.build",
      link: "mailto:hello@obelisk.build"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: t('info.business.title'), 
      content: "dubhe@obelisk.build",
      link: "mailto:dubhe@obelisk.build"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: t('info.location.title'),
      content: t('info.location.content'),
      link: null
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: t('info.responseTime.title'),
      content: t('info.responseTime.content'),
      link: null
    }
  ]

  return (
    <>
      {/* Fixed Notification */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg ${
            notification.type === 'success' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? (
              <Send className="w-5 h-5" />
            ) : (
              <span className="text-xl">⚠️</span>
            )}
            <span>{notification.message}</span>
          </div>
        </motion.div>
      )}
      
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
                <Mail className="w-4 h-4 inline mr-2" />
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form and Info Section */}
      <div className="py-24 px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
                <h2 className="text-3xl font-bold text-white mb-6">{t('form.title')}</h2>
                
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{t('form.success.title')}</h3>
                    <p className="text-gray-300">{t('form.success.message')}</p>
                    <button 
                      onClick={() => {
                        setSubmitted(false)
                        setError(null)
                      }}
                      className="mt-4 text-green-400 hover:text-green-300 transition-colors"
                    >
                      {t('form.success.sendAnother')}
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                        <p className="text-red-400 text-sm">{error}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                          {t('form.fields.name.label')} *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors"
                          placeholder={t('form.fields.name.placeholder')}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                          {t('form.fields.email.label')} *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors"
                          placeholder={t('form.fields.email.placeholder')}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                        {t('form.fields.subject.label')} *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors"
                      >
                        <option value="">{t('form.fields.subject.placeholder')}</option>
                        <option value="general">{t('form.fields.subject.options.general')}</option>
                        <option value="partnership">{t('form.fields.subject.options.partnership')}</option>
                        <option value="investment">{t('form.fields.subject.options.investment')}</option>
                        <option value="grants">{t('form.fields.subject.options.grants')}</option>
                        <option value="foundation-jobs">{t('form.fields.subject.options.foundationJobs')}</option>
                        <option value="technical">{t('form.fields.subject.options.technical')}</option>
                        <option value="media">{t('form.fields.subject.options.media')}</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        {t('form.fields.message.label')} *
                      </label>
                      <div className="relative">
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          maxLength={4000}
                          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors resize-none"
                          placeholder={t('form.fields.message.placeholder')}
                        />
                        <div className={`text-sm ${getCharacterCountColor(formData.message.length)} absolute bottom-2 right-3`}>
                          {formData.message.length}/4000
                        </div>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 disabled:from-gray-500 disabled:to-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          {t('form.sending')}
                        </>
                      ) : (
                        <>
                          {t('form.submit')}
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">{t('info.title')}</h2>
                <p className="text-gray-300 leading-relaxed mb-8">
                  {t('info.description')}
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{info.title}</h3>
                      {info.link ? (
                        <a 
                          href={info.link}
                          className="text-gray-300 hover:text-green-400 transition-colors"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-gray-300">{info.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Contact Options */}
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl p-6 border border-green-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">{t('quickLinks.title')}</h3>
                <div className="space-y-3">
                  <Link 
                    href="/grants" 
                    className="block text-gray-300 hover:text-green-400 transition-colors"
                  >
                    → {t('quickLinks.grant')}
                  </Link>
                  <Link 
                    href="/incubation" 
                    className="block text-gray-300 hover:text-green-400 transition-colors"
                  >
                    → {t('quickLinks.incubation')}
                  </Link>
                  <Link 
                    href="/ambassador" 
                    className="block text-gray-300 hover:text-green-400 transition-colors"
                  >
                    → {t('quickLinks.ambassador')}
                  </Link>
                  <a 
                    href="https://dubhe-docs.obelisk.build/dubhe" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-300 hover:text-green-400 transition-colors"
                  >
                    → {t('quickLinks.documentation')}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

    </>
  )
}