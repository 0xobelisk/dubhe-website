/* eslint-disable turbo/no-undeclared-env-vars */
import { NextRequest } from 'next/server'

// This is required for Sentry tunneling
export async function POST(request: NextRequest) {
  const envelope = await request.text()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const host = request.headers.get('host')
  const sentryHost = 'sentry.io'
  
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) {
    return new Response('Sentry DSN not configured', { status: 500 })
  }

  // Extract DSN project ID from the envelope
  const projectIdMatch = process.env.NEXT_PUBLIC_SENTRY_DSN.match(/\/(\d+)$/)
  if (!projectIdMatch) {
    return new Response('Invalid Sentry DSN format', { status: 500 })
  }

  const projectId = projectIdMatch[1]
  const url = `https://${sentryHost}/api/${projectId}/envelope/`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-sentry-envelope',
      },
      body: envelope,
    })

    return new Response(response.body, {
      status: response.status,
      headers: response.headers,
    })
  } catch (error) {
    console.error('Failed to forward request to Sentry:', error)
    return new Response('Failed to forward request', { status: 500 })
  }
}

// Enhanced health check endpoint
interface HealthCheck {
  status: 'healthy' | 'degraded' | 'unhealthy'
  timestamp: string
  uptime: number
  version: string
  environment: string
  services: {
    sentry: 'connected' | 'disconnected' | 'unknown'
    email: 'available' | 'unavailable' | 'unknown'
  }
  performance: {
    memory_usage: number
    memory_total: number
    response_time: number
  }
  last_deployment?: string
}

async function checkServices() {
  const services: {
    sentry: 'connected' | 'disconnected' | 'unknown'
    email: 'available' | 'unavailable' | 'unknown'
  } = {
    sentry: 'unknown',
    email: 'unknown'
  }

  // Check Sentry configuration
  try {
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      services.sentry = 'connected'
    } else {
      services.sentry = 'disconnected'
    }
  } catch {
    services.sentry = 'disconnected'
  }

  // Check email service (Resend API)
  try {
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'placeholder') {
      services.email = 'available'
    } else {
      services.email = 'unavailable'
    }
  } catch {
    services.email = 'unavailable'
  }

  return services
}

function getPerformanceMetrics() {
  const memUsage = process.memoryUsage()
  return {
    memory_usage: Math.round(memUsage.heapUsed / 1024 / 1024), // MB
    memory_total: Math.round(memUsage.heapTotal / 1024 / 1024), // MB
    response_time: Date.now() // Will be calculated at response
  }
}

export async function GET() {
  const startTime = Date.now()
  
  try {
    const services = await checkServices()
    const performance = getPerformanceMetrics()
    performance.response_time = Date.now() - startTime

    // Determine overall health status
    let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy'
    
    if (services.email === 'unavailable' || services.sentry === 'disconnected') {
      status = 'degraded'
    }
    
    // Memory usage check (if over 500MB, consider degraded)
    if (performance.memory_usage > 500) {
      status = status === 'healthy' ? 'degraded' : 'unhealthy'
    }

    const healthCheck: HealthCheck = {
      status,
      timestamp: new Date().toISOString(),
      uptime: Math.round(process.uptime()),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      services,
      performance,
      last_deployment: process.env.VERCEL_GIT_COMMIT_SHA || undefined
    }

    // Return appropriate HTTP status code
    const httpStatus = status === 'healthy' ? 200 : status === 'degraded' ? 200 : 503

    return Response.json(healthCheck, {
      status: httpStatus,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json'
      }
    })

  } catch (error) {
    console.error('Health check failed:', error)
    
    const errorResponse: HealthCheck = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: Math.round(process.uptime()),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      services: {
        sentry: 'unknown',
        email: 'unknown'
      },
      performance: {
        memory_usage: 0,
        memory_total: 0,
        response_time: Date.now() - startTime
      }
    }

    return Response.json(errorResponse, {
      status: 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json'
      }
    })
  }
}

// Simple HEAD endpoint for basic health checks
export async function HEAD() {
  return new Response('OK', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-cache'
    }
  })
}