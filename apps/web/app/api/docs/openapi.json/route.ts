import { NextResponse } from 'next/server'
import { getOpenApiSpec } from '@/lib/api-docs'

export async function GET() {
  const spec = getOpenApiSpec()
  
  return NextResponse.json(spec, {
    headers: {
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      'Access-Control-Allow-Origin': '*', // Allow CORS for API docs
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}