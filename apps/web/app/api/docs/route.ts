import { NextResponse } from 'next/server'
import { generateSwaggerUI } from '@/lib/api-docs'

export async function GET() {
  const html = generateSwaggerUI()
  
  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    },
  })
}