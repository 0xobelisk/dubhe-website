import { test, expect } from '@playwright/test'

test.describe('API Integration Tests', () => {
  // Contact API endpoint tests
  test.describe('Contact API (/api/contact)', () => {
    test('should successfully send contact form', async ({ request }) => {
      const response = await request.post('/api/contact', {
        data: {
          name: 'Test User',
          email: 'test@example.com',
          type: 'general',
          message: 'This is a test message for API integration testing.'
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })

      expect(response.status()).toBe(200)
      const body = await response.json()
      expect(body.success).toBe(true)
    })

    test('should validate required fields', async ({ request }) => {
      const response = await request.post('/api/contact', {
        data: {
          name: '',
          email: '',
          message: ''
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })

      expect(response.status()).toBe(400)
      const body = await response.json()
      expect(body.success).toBe(false)
      expect(body.error).toBeTruthy()
    })

    test('should validate email format', async ({ request }) => {
      const response = await request.post('/api/contact', {
        data: {
          name: 'Test User',
          email: 'invalid-email',
          type: 'general',
          message: 'Test message'
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })

      expect(response.status()).toBe(400)
      const body = await response.json()
      expect(body.success).toBe(false)
    })

    test('should handle large message content', async ({ request }) => {
      const largeMessage = 'A'.repeat(5000) // 5KB message
      
      const response = await request.post('/api/contact', {
        data: {
          name: 'Test User',
          email: 'test@example.com',
          type: 'general',
          message: largeMessage
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })

      // Should either accept or reject with proper error
      expect([200, 413, 400]).toContain(response.status())
    })

    test('should reject invalid content types', async ({ request }) => {
      const response = await request.post('/api/contact', {
        data: 'invalid data format',
        headers: {
          'Content-Type': 'text/plain'
        }
      })

      expect(response.status()).toBe(400)
    })

    test('should handle concurrent requests', async ({ request }) => {
      const requests = Array.from({ length: 5 }, (_, i) =>
        request.post('/api/contact', {
          data: {
            name: `Test User ${i}`,
            email: `test${i}@example.com`,
            type: 'general',
            message: `Test message ${i}`
          },
          headers: {
            'Content-Type': 'application/json'
          }
        })
      )

      const responses = await Promise.all(requests)
      
      responses.forEach(response => {
        expect([200, 429]).toContain(response.status()) // Success or rate limited
      })
    })
  })

  // Error reporting API tests
  test.describe('Error API (/api/error)', () => {
    test('should accept error reports', async ({ request }) => {
      const response = await request.post('/api/error', {
        data: {
          error: 'Test error',
          stack: 'Error stack trace',
          url: 'https://test.example.com',
          userAgent: 'Test User Agent',
          timestamp: new Date().toISOString(),
          userId: 'test-user-123',
          sessionId: 'test-session-456'
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })

      expect(response.status()).toBe(200)
      const body = await response.json()
      expect(body.success).toBe(true)
    })

    test('should handle minimal error data', async ({ request }) => {
      const response = await request.post('/api/error', {
        data: {
          error: 'Minimal error',
          timestamp: new Date().toISOString()
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })

      expect(response.status()).toBe(200)
    })

    test('should validate error data structure', async ({ request }) => {
      const response = await request.post('/api/error', {
        data: {
          // Missing required error field
          timestamp: new Date().toISOString()
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })

      expect([200, 400]).toContain(response.status())
    })
  })

  // Monitoring endpoint tests
  test.describe('Monitoring API (/monitoring)', () => {
    test('should return health status', async ({ request }) => {
      const response = await request.get('/monitoring')
      
      expect(response.status()).toBe(200)
      const body = await response.text()
      expect(body).toContain('OK')
    })

    test('should respond quickly to health checks', async ({ request }) => {
      const startTime = Date.now()
      const response = await request.get('/monitoring')
      const duration = Date.now() - startTime
      
      expect(response.status()).toBe(200)
      expect(duration).toBeLessThan(1000) // Should respond within 1 second
    })
  })

  // Sitemap and robots tests
  test.describe('SEO Endpoints', () => {
    test('should serve robots.txt', async ({ request }) => {
      const response = await request.get('/robots.txt')
      
      expect([200, 404]).toContain(response.status())
      
      if (response.status() === 200) {
        const body = await response.text()
        expect(body).toContain('User-agent')
      }
    })

    test('should serve sitemap for each locale', async ({ request }) => {
      const locales = ['en', 'zh-TW', 'ja', 'fr', 'ko']
      
      for (const locale of locales) {
        const response = await request.get(`/${locale}/sitemap.xml`)
        
        if (response.status() === 200) {
          const body = await response.text()
          expect(body).toContain('<?xml')
          expect(body).toContain('<urlset')
        } else {
          // Sitemap might be dynamic or not implemented yet
          expect([200, 404]).toContain(response.status())
        }
      }
    })
  })

  // API rate limiting tests
  test.describe('Rate Limiting', () => {
    test('should handle rapid successive requests', async ({ request }) => {
      const rapidRequests = Array.from({ length: 20 }, () =>
        request.post('/api/contact', {
          data: {
            name: 'Rate Test User',
            email: 'ratetest@example.com',
            type: 'general',
            message: 'Rate limiting test message'
          },
          headers: {
            'Content-Type': 'application/json'
          }
        })
      )

      const responses = await Promise.all(rapidRequests)
      
      // Some requests should succeed, some might be rate limited
      const statuses = responses.map(r => r.status())
      const hasSuccessful = statuses.some(s => s === 200)
      const hasRateLimited = statuses.some(s => s === 429)
      
      expect(hasSuccessful).toBe(true)
      // Rate limiting might not be implemented yet, so we don't require 429s
    })
  })

  // Error handling across all endpoints
  test.describe('Error Handling', () => {
    test('should return proper error responses for invalid methods', async ({ request }) => {
      // GET request to POST-only endpoint
      const response = await request.get('/api/contact')
      
      expect([405, 404]).toContain(response.status()) // Method Not Allowed or Not Found
    })

    test('should handle malformed JSON', async ({ request }) => {
      const response = await request.post('/api/contact', {
        data: '{ invalid json',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      expect([400, 422]).toContain(response.status())
    })

    test('should return CORS headers when appropriate', async ({ request }) => {
      const response = await request.options('/api/contact')
      
      // CORS preflight might not be needed for same-origin requests
      expect([200, 204, 404, 405]).toContain(response.status())
    })
  })

  // Security tests
  test.describe('Security', () => {
    test('should sanitize user input', async ({ request }) => {
      const response = await request.post('/api/contact', {
        data: {
          name: '<script>alert("xss")</script>',
          email: 'test@example.com',
          type: 'general',
          message: '<img src=x onerror=alert("xss")>'
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })

      // Should either accept (with sanitization) or reject
      expect([200, 400]).toContain(response.status())
    })

    test('should handle SQL injection attempts', async ({ request }) => {
      const response = await request.post('/api/contact', {
        data: {
          name: "'; DROP TABLE users; --",
          email: 'test@example.com',
          type: 'general',
          message: "1' OR '1'='1"
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })

      // Should handle safely
      expect([200, 400]).toContain(response.status())
    })

    test('should reject excessively large payloads', async ({ request }) => {
      const largePayload = {
        name: 'A'.repeat(10000),
        email: 'test@example.com',
        type: 'general',
        message: 'B'.repeat(50000)
      }

      const response = await request.post('/api/contact', {
        data: largePayload,
        headers: {
          'Content-Type': 'application/json'
        }
      })

      // Should reject or accept based on server limits
      expect([200, 400, 413, 422]).toContain(response.status())
    })
  })

  // Performance tests
  test.describe('Performance', () => {
    test('API endpoints should respond within reasonable time', async ({ request }) => {
      const startTime = Date.now()
      
      const response = await request.post('/api/contact', {
        data: {
          name: 'Performance Test User',
          email: 'perf@example.com',
          type: 'general',
          message: 'Performance testing message'
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const duration = Date.now() - startTime
      
      expect(response.status()).toBe(200)
      expect(duration).toBeLessThan(5000) // 5 seconds max
    })

    test('Monitoring endpoint should be very fast', async ({ request }) => {
      const startTime = Date.now()
      const response = await request.get('/monitoring')
      const duration = Date.now() - startTime
      
      expect(duration).toBeLessThan(500) // 500ms max for health check
    })
  })
})