import { NextResponse } from 'next/server'

export async function GET() {
  // Only allow in development or with a secret key
  const debugKey = process.env.DEBUG_KEY || 'debug-dubhe-2024'
  const isAuthorized = process.env.NODE_ENV === 'development' || 
                       (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('key') === debugKey)
  
  return NextResponse.json({
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL_ENV: process.env.VERCEL_ENV,
    },
    resend: {
      hasApiKey: !!process.env.RESEND_API_KEY,
      apiKeyValid: process.env.RESEND_API_KEY?.startsWith('re_'),
      apiKeyPrefix: process.env.RESEND_API_KEY?.substring(0, 7) + '...',
      fromEmail: process.env.RESEND_FROM_EMAIL,
      toEmail: process.env.RESEND_TO_EMAIL,
    },
    timestamp: new Date().toISOString()
  })
}