'use client'

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // Capture the error to Sentry
    Sentry.captureException(error)
  }, [error])

  return (
    <html>
      <body>
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          fontFamily: 'system-ui, sans-serif' 
        }}>
          <h2>Something went wrong!</h2>
          <p>We&apos;ve been notified of this error and are working to fix it.</p>
          <button
            onClick={() => reset()}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}