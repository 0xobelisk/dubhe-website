import { NextResponse } from 'next/server'

export async function GET() {
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
