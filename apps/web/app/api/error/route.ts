import { NextRequest, NextResponse } from 'next/server'
import * as Sentry from '@sentry/nextjs'

// Handle API errors and return appropriate error pages
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code') || '500'
  const message = searchParams.get('message') || 'An error occurred'
  
  const statusCode = parseInt(code, 10)
  
  // Return JSON error response for API calls
  if (request.headers.get('accept')?.includes('application/json')) {
    return NextResponse.json(
      {
        error: true,
        statusCode,
        message,
        timestamp: new Date().toISOString()
      },
      { status: statusCode }
    )
  }
  
  // For HTML requests, redirect to appropriate error page
  const errorPages: Record<number, string> = {
    401: '/error/unauthorized',
    403: '/error/forbidden', 
    404: '/error/not-found',
    429: '/error/rate-limited',
    500: '/error/server-error',
    502: '/error/bad-gateway',
    503: '/error/service-unavailable'
  }
  
  const redirectUrl = errorPages[statusCode] || '/error/server-error'
  
  return NextResponse.redirect(new URL(redirectUrl, request.url), 302)
}

// Handle error reporting from client-side
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      error, 
      stack, 
      url, 
      userAgent, 
      timestamp, 
      userId,
      sessionId 
    } = body
    
    // Log error locally
    console.error('Client-side error reported:', {
      error,
      stack,
      url,
      userAgent,
      timestamp,
      userId,
      sessionId
    })
    
    // Send to Sentry
    Sentry.captureException(new Error(error), {
      user: { id: userId },
      tags: { 
        sessionId,
        source: 'client_side_report',
      },
      extra: { 
        stack, 
        url, 
        userAgent, 
        timestamp 
      },
      level: 'error',
    })
    
    return NextResponse.json({ success: true, message: 'Error logged' })
    
  } catch (err) {
    console.error('Failed to log client error:', err)
    return NextResponse.json(
      { error: 'Failed to log error' },
      { status: 500 }
    )
  }
}

// Error monitoring endpoint for health checks
export async function HEAD() {
  return new NextResponse(null, { 
    status: 200,
    headers: {
      'X-Error-Handler': 'active',
      'X-Service-Status': 'healthy'
    }
  })
}