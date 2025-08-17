/* eslint-disable no-control-regex, no-useless-escape, @typescript-eslint/no-explicit-any */
// Simple security utilities without external dependencies

/**
 * Sanitize HTML content to prevent XSS attacks (basic implementation)
 */
export function sanitizeHtml(dirty: string): string {
  if (typeof dirty !== 'string') return ''
  
  // Basic HTML sanitization - strip all HTML tags except safe ones
  return dirty
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/<link\b[^>]*>/gi, '')
    .replace(/<meta\b[^>]*>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim()
    .substring(0, 10000) // Limit length
}

/**
 * Sanitize plain text input
 */
export function sanitizeText(input: string): string {
  if (typeof input !== 'string') return ''
  
  return input
    .trim()
    .replace(/[\x00-\x1f\x7f-\x9f]/g, '') // Remove control characters
    .replace(/[<>\"']/g, '') // Remove potentially dangerous characters
    .substring(0, 1000) // Limit length
}

/**
 * Validate and sanitize email address
 */
export function sanitizeEmail(email: string): { valid: boolean; sanitized: string } {
  if (typeof email !== 'string') {
    return { valid: false, sanitized: '' }
  }

  const sanitized = email.toLowerCase().trim()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  // Basic email validation
  const valid = emailRegex.test(sanitized) && 
                sanitized.length <= 254 && 
                !sanitized.includes('..') &&
                !sanitized.startsWith('.') &&
                !sanitized.endsWith('.')

  return { valid, sanitized }
}

/**
 * Validate contact form data
 */
export interface ContactFormData {
  name: string
  email: string
  subject: string // Changed from 'type' to 'subject' to match API
  message: string
}

export interface SanitizedContactData extends ContactFormData {
  timestamp: string
  ipAddress?: string
  userAgent?: string
}

export function validateAndSanitizeContactForm(
  data: any, 
  metadata?: { ip?: string; userAgent?: string }
): { valid: boolean; data?: SanitizedContactData; errors?: string[] } {
  const errors: string[] = []

  // Validate required fields
  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['Invalid form data'] }
  }

  const { name, email, subject, message } = data

  // Validate name
  if (!name || typeof name !== 'string') {
    errors.push('Name is required')
  } else if (name.length < 1 || name.length > 100) {
    errors.push('Name must be between 1 and 100 characters')
  }

  // Validate email
  if (!email || typeof email !== 'string') {
    errors.push('Email is required')
  } else {
    const emailValidation = sanitizeEmail(email)
    if (!emailValidation.valid) {
      errors.push('Please provide a valid email address')
    }
  }

  // Validate subject
  if (!subject || typeof subject !== 'string') {
    errors.push('Subject is required')
  } else if (subject.length < 1 || subject.length > 200) {
    errors.push('Subject must be between 1 and 200 characters')
  }

  // Validate message
  if (!message || typeof message !== 'string') {
    errors.push('Message is required')
  } else if (message.length < 1 || message.length > 2000) {
    errors.push('Message must be between 1 and 2000 characters')
  }

  // Check for spam indicators
  const spamPatterns = [
    /viagra|cialis|loan|casino|poker/i,
    /click here|visit now|act now/i,
    /\$\$\$|€€€|£££/,
    /[A-Z]{10,}/, // Excessive caps
    /(http|https):\/\/[^\s]{3,}/g // Multiple URLs
  ]

  const fullText = `${name} ${email} ${message}`.toLowerCase()
  const spamScore = spamPatterns.reduce((score, pattern) => {
    const matches = fullText.match(pattern)
    return score + (matches ? matches.length : 0)
  }, 0)

  if (spamScore > 2) {
    errors.push('Message appears to be spam')
  }

  if (errors.length > 0) {
    return { valid: false, errors }
  }

  // Sanitize data
  const sanitizedData: SanitizedContactData = {
    name: sanitizeText(name),
    email: sanitizeEmail(email).sanitized,
    subject: sanitizeText(subject),
    message: sanitizeHtml(message),
    timestamp: new Date().toISOString(),
    ipAddress: metadata?.ip ? sanitizeText(metadata.ip) : undefined,
    userAgent: metadata?.userAgent ? sanitizeText(metadata.userAgent) : undefined
  }

  return { valid: true, data: sanitizedData }
}

/**
 * Validate and sanitize error report data
 */
export interface ErrorReportData {
  error: string
  stack?: string
  url?: string
  userAgent?: string
  timestamp: string
  userId?: string
  sessionId?: string
}

export function validateAndSanitizeErrorReport(data: any): { valid: boolean; data?: ErrorReportData; errors?: string[] } {
  const errors: string[] = []

  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['Invalid error report data'] }
  }

  const { error, stack, url, userAgent, timestamp, userId, sessionId } = data

  // Validate required fields
  if (!error || typeof error !== 'string') {
    errors.push('Error message is required')
  } else if (error.length > 2000) {
    errors.push('Error message too long')
  }

  if (!timestamp || typeof timestamp !== 'string') {
    errors.push('Timestamp is required')
  } else {
    const date = new Date(timestamp)
    if (isNaN(date.getTime())) {
      errors.push('Invalid timestamp format')
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors }
  }

  // Sanitize data
  const sanitizedData: ErrorReportData = {
    error: sanitizeText(error),
    stack: stack ? sanitizeText(stack.substring(0, 5000)) : undefined, // Limit stack trace
    url: url ? sanitizeText(url.substring(0, 500)) : undefined,
    userAgent: userAgent ? sanitizeText(userAgent.substring(0, 500)) : undefined,
    timestamp: sanitizeText(timestamp),
    userId: userId ? sanitizeText(userId.substring(0, 100)) : undefined,
    sessionId: sessionId ? sanitizeText(sessionId.substring(0, 100)) : undefined
  }

  return { valid: true, data: sanitizedData }
}

/**
 * Check for potentially malicious patterns
 */
export function checkForMaliciousPatterns(input: string): boolean {
  const maliciousPatterns = [
    // SQL injection patterns
    /(\b(ALTER|CREATE|DELETE|DROP|EXEC(UTE)?|INSERT|MERGE|SELECT|UNION|UPDATE)\b)|(\b(AND|OR)\s+\d+\s*=\s*\d+)/i,
    
    // XSS patterns
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/i,
    /on\w+\s*=/i,
    
    // Command injection patterns
    /[;&|`$(){}]/,
    
    // Path traversal
    /\.\.[\/\\]/,
    
    // NoSQL injection
    /\$where|\$ne|\$in|\$nin|\$or|\$and/i
  ]

  return maliciousPatterns.some(pattern => pattern.test(input))
}

/**
 * Rate limiting key generation
 */
export function generateRateLimitKey(type: string, identifier: string): string {
  return `rate_limit:${type}:${sanitizeText(identifier)}`
}

/**
 * Validate request origin
 */
export function validateOrigin(origin: string | null, allowedOrigins: string[]): boolean {
  if (!origin) return false
  
  return allowedOrigins.some(allowed => {
    if (allowed === '*') return true
    if (allowed.startsWith('*.')) {
      const domain = allowed.substring(2)
      return origin.endsWith(domain)
    }
    return origin === allowed
  })
}

/**
 * Generate content security policy
 */
export function generateCSP(nonce?: string): string {
  const csp = [
    "default-src 'self'",
    `script-src 'self' ${nonce ? `'nonce-${nonce}'` : "'unsafe-eval' 'unsafe-inline'"} *.sentry.io *.vercel-insights.com`,
    "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
    "img-src 'self' data: blob: *.vercel.app *.obelisk.build",
    "font-src 'self' fonts.gstatic.com",
    "connect-src 'self' *.sentry.io *.vercel-insights.com vitals.vercel-insights.com",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "media-src 'self'"
  ]

  return csp.join('; ')
}

/**
 * Hash sensitive data
 */
export async function hashSensitiveData(data: string, salt?: string): Promise<string> {
  const encoder = new TextEncoder()
  const dataBuffer = encoder.encode(data + (salt || ''))
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}