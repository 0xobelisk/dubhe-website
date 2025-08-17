/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { NextRequest } from 'next/server'

// Mock modules before importing
vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: vi.fn().mockResolvedValue({
        data: { id: 'mock-email-id' },
        error: null
      })
    }
  }))
}))

// Mock the security module before importing the route
vi.mock('@/lib/security', () => ({
  validateAndSanitizeContactForm: vi.fn(),
  checkForMaliciousPatterns: vi.fn()
}))

// Import after mocking
import { POST } from './route'

// Mock environment variables
const originalEnv = process.env

describe('/api/contact', () => {
  let mockValidateAndSanitize: any
  let mockCheckMalicious: any

  beforeEach(async () => {
    vi.clearAllMocks()
    process.env = {
      ...originalEnv,
      RESEND_API_KEY: 'test-api-key',
      RESEND_FROM_EMAIL: 'test@example.com',
      RESEND_TO_EMAIL: 'team@dubhe.network'
    }
    
    // Import and setup mocks
    const securityModule = await import('@/lib/security')
    mockValidateAndSanitize = vi.mocked(securityModule.validateAndSanitizeContactForm)
    mockCheckMalicious = vi.mocked(securityModule.checkForMaliciousPatterns)
    
    // Reset mock implementations
    mockValidateAndSanitize.mockReturnValue({
      valid: true,
      data: {
        name: '张三',
        email: 'zhangsan@example.com',
        subject: '技术咨询',
        message: '我想了解更多关于 Dubhe 平台的技术细节。'
      },
      errors: []
    })
    mockCheckMalicious.mockReturnValue(false)
  })

  afterEach(() => {
    process.env = originalEnv
  })

  const createMockRequest = (body: any) => {
    return new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  it('应该成功处理有效的联系表单', async () => {
    const validFormData = {
      name: '张三',
      email: 'zhangsan@example.com',
      subject: '技术咨询',
      message: '我想了解更多关于 Dubhe 平台的技术细节。'
    }

    const request = createMockRequest(validFormData)
    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.message).toBe('Email sent successfully')
    expect(mockValidateAndSanitize).toHaveBeenCalledWith(validFormData, expect.any(Object))
    expect(mockCheckMalicious).toHaveBeenCalled()
  })

  it('应该拒绝无效的邮件地址', async () => {
    mockValidateAndSanitize.mockReturnValue({
      valid: false,
      data: null,
      errors: ['Invalid email address']
    })

    const invalidFormData = {
      name: '张三',
      email: 'invalid-email',
      subject: '测试',
      message: '测试消息'
    }

    const request = createMockRequest(invalidFormData)
    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Invalid input data')
    expect(data.details).toBeDefined()
  })

  it('应该拒绝空的姓名字段', async () => {
    mockValidateAndSanitize.mockReturnValue({
      valid: false,
      data: null,
      errors: ['Name is required']
    })

    const invalidFormData = {
      name: '',
      email: 'test@example.com',
      subject: '测试',
      message: '测试消息'
    }

    const request = createMockRequest(invalidFormData)
    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Invalid input data')
  })

  it('应该处理缺失的 API 密钥', async () => {
    process.env.RESEND_API_KEY = undefined

    const validFormData = {
      name: '张三',
      email: 'test@example.com',
      subject: '测试',
      message: '测试消息'
    }

    const request = createMockRequest(validFormData)
    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('Email service not configured. Please contact support.')
  })

  it('应该验证消息长度限制', async () => {
    mockValidateAndSanitize.mockReturnValue({
      valid: false,
      data: null,
      errors: ['Message too long']
    })

    const longMessage = 'a'.repeat(2001)
    const invalidFormData = {
      name: '张三',
      email: 'test@example.com',
      subject: '测试',
      message: longMessage
    }

    const request = createMockRequest(invalidFormData)
    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Invalid input data')
  })
})