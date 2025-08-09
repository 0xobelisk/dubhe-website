import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

// Rate limiting storage (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

// Security headers configuration
const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff', 
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Content-Security-Policy': `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' *.sentry.io *.vercel-insights.com;
    style-src 'self' 'unsafe-inline' fonts.googleapis.com;
    img-src 'self' data: blob: *.vercel.app *.obelisk.build;
    font-src 'self' fonts.gstatic.com;
    connect-src 'self' *.sentry.io *.vercel-insights.com vitals.vercel-insights.com;
    frame-ancestors 'none';
    form-action 'self';
    base-uri 'self';
  `.replace(/\s+/g, ' ').trim()
}

// Create the i18n middleware
const intlMiddleware = createMiddleware(routing)

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 100 // requests per window

function getRateLimitKey(request: NextRequest): string {
  // Use IP address or fallback identifiers
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : 
    request.headers.get('x-real-ip') ||
    'unknown'
  
  return `rate_limit:${ip}`
}

function checkRateLimit(key: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const windowStart = now - RATE_LIMIT_WINDOW
  
  // Clean up expired entries
  for (const [k, data] of rateLimitMap.entries()) {
    if (data.resetTime < now) {
      rateLimitMap.delete(k)
    }
  }
  
  const current = rateLimitMap.get(key)
  
  if (!current || current.resetTime < now) {
    // New window or expired window
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    })
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 }
  }
  
  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0 }
  }
  
  current.count++
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - current.count }
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Apply security headers to all responses
  const response = intlMiddleware(request) || NextResponse.next()
  
  // Set security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  // Rate limiting for API routes and form submissions
  const isApiRoute = pathname.startsWith('/api/')
  const isFormSubmission = request.method === 'POST' && pathname.includes('contact')
  
  if (isApiRoute || isFormSubmission) {
    const rateLimitKey = getRateLimitKey(request)
    const { allowed, remaining } = checkRateLimit(rateLimitKey)
    
    // Add rate limit headers
    response.headers.set('X-RateLimit-Limit', RATE_LIMIT_MAX_REQUESTS.toString())
    response.headers.set('X-RateLimit-Remaining', remaining.toString())
    response.headers.set('X-RateLimit-Reset', 
      new Date(Date.now() + RATE_LIMIT_WINDOW).toISOString()
    )
    
    if (!allowed) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil(RATE_LIMIT_WINDOW / 1000)
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': Math.ceil(RATE_LIMIT_WINDOW / 1000).toString(),
            ...Object.fromEntries(
              Object.entries(securityHeaders).map(([k, v]) => [k, v])
            )
          }
        }
      )
    }
  }

  // Additional security for sensitive paths
  if (pathname.includes('/admin') || pathname.includes('/api/internal')) {
    // Add extra security for admin paths (if any exist)
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet')
  }

  // CORS handling for API routes
  if (isApiRoute) {
    const origin = request.headers.get('origin')
    const allowedOrigins = [
      'https://dubhe.obelisk.build',
      'https://www.dubhe.obelisk.build',
      process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '',
      process.env.NODE_ENV === 'development' ? 'http://localhost:3002' : '',
    ].filter(Boolean)

    if (origin && allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin)
      response.headers.set('Access-Control-Allow-Credentials', 'true')
    }

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
      response.headers.set('Access-Control-Max-Age', '86400') // 24 hours
      return new NextResponse(null, { status: 200, headers: response.headers })
    }
  }

  // Prevent access to sensitive files
  const sensitivePatterns = [
    /\.(env|log|bak|backup|sql|dump)$/,
    /^\.well-known\/security/,
    /package(-lock)?\.json$/,
    /tsconfig\.json$/,
    /next\.config\./
  ]

  if (sensitivePatterns.some(pattern => pattern.test(pathname))) {
    return new NextResponse('Not Found', { status: 404 })
  }

  // Add performance hints
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  
  // Add cache control for static assets
  if (pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }

  return response
}

export const config = {
  // Match all paths except static assets and API routes that should bypass i18n
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ]
}