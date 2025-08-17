'use client'

import { useState } from 'react'
import * as Sentry from '@sentry/nextjs'
import { Button } from '@workspace/ui/components/button'

export default function TestSentryPage() {
  const [testResults, setTestResults] = useState<string[]>([])

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const testSentryIntegration = () => {
    try {
      // Test 1: Basic error capture
      addResult('Testing basic error capture...')
      Sentry.captureException(new Error('Test error from Dubhe website'))
      addResult('✅ Basic error sent to Sentry')

      // Test 2: Custom message
      addResult('Testing custom message...')
      Sentry.captureMessage('Test message from Dubhe website', 'info')
      addResult('✅ Custom message sent to Sentry')

      // Test 3: User context
      addResult('Testing user context...')
      Sentry.setUser({ id: 'test-user', email: 'test@dubhe.io' })
      Sentry.captureMessage('Message with user context', 'info')
      addResult('✅ User context set and message sent')

      // Test 4: Custom tags
      addResult('Testing custom tags...')
      Sentry.withScope((scope) => {
        scope.setTag('test_type', 'integration_test')
        scope.setTag('component', 'sentry_test_page')
        scope.setLevel('warning')
        Sentry.captureMessage('Message with custom tags')
      })
      addResult('✅ Custom tags and scope sent to Sentry')

      // Test 5: Breadcrumbs
      addResult('Testing breadcrumbs...')
      Sentry.addBreadcrumb({
        message: 'User clicked test button',
        category: 'ui',
        level: 'info',
      })
      Sentry.captureMessage('Message with breadcrumbs')
      addResult('✅ Breadcrumbs added and message sent')

      addResult('🎉 All Sentry tests completed successfully!')

    } catch (error) {
      addResult(`❌ Error during testing: ${error}`)
    }
  }

  const testErrorBoundary = () => {
    // This will trigger the error boundary
    throw new Error('Test error boundary integration')
  }

  const testApiError = async () => {
    try {
      addResult('Testing API error reporting...')
      const response = await fetch('/api/error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: 'Test API error',
          stack: 'Test stack trace',
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
          userId: 'test-user',
          sessionId: 'test-session'
        })
      })
      
      if (response.ok) {
        addResult('✅ API error reporting successful')
      } else {
        addResult('❌ API error reporting failed')
      }
    } catch (error) {
      addResult(`❌ API test error: ${error}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Sentry Integration Test
          </h1>
          <p className="text-gray-300 text-lg">
            Test the Sentry error monitoring and reporting system
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Test Controls */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Test Controls</h2>
            
            <Button 
              onClick={testSentryIntegration}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            >
              Test Sentry Integration
            </Button>

            <Button 
              onClick={testApiError}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              Test API Error Reporting
            </Button>

            <Button 
              onClick={testErrorBoundary}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
            >
              Test Error Boundary
            </Button>

            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <h3 className="text-lg font-medium mb-2">Sentry Configuration</h3>
              <p className="text-sm text-gray-400 mb-2">
                DSN: {process.env.NEXT_PUBLIC_SENTRY_DSN ? '✅ Configured' : '❌ Not configured'}
              </p>
              <p className="text-sm text-gray-400">
                Environment: {process.env.NODE_ENV}
              </p>
            </div>
          </div>

          {/* Test Results */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Test Results</h2>
            <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4 h-96 overflow-y-auto">
              {testResults.length === 0 ? (
                <p className="text-gray-400 text-center">No tests run yet. Click a test button to start.</p>
              ) : (
                <ul className="space-y-2">
                  {testResults.map((result, index) => (
                    <li key={index} className="text-sm font-mono text-gray-300">
                      {result}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <Button 
              onClick={() => setTestResults([])}
              variant="outline"
              className="w-full mt-4 border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Clear Results
            </Button>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 p-6 bg-slate-800/50 rounded-lg border border-slate-700">
          <h3 className="text-lg font-semibold mb-3">How to Verify</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <p>1. Click the test buttons above to send test data to Sentry</p>
            <p>2. Go to your Sentry dashboard: <a href="https://sentry.io" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">sentry.io</a></p>
            <p>3. Check the &quot;Issues&quot; section for the test errors and messages</p>
            <p>4. Verify that user context, tags, and breadcrumbs are properly attached</p>
            <p>5. Test the error boundary by clicking the red button (this will crash the component)</p>
          </div>
        </div>
      </div>
    </div>
  )
}