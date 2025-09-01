import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    
    if (type === 'brand-pack') {
      // For now, return a message about the brand pack
      return NextResponse.json({ 
        message: 'Brand pack download will be available soon. Please download individual assets for now.',
        assets: [
          { name: 'Primary Logo Light', path: '/logo/light.png' },
          { name: 'Primary Logo White', path: '/logo/white.png' },
          { name: 'Symbol Mark A', path: '/mediakit/dubhe/png/a.png' },
          { name: 'Symbol Mark B', path: '/mediakit/dubhe/png/b.png' },
          { name: 'Symbol Mark C', path: '/mediakit/dubhe/png/c.png' },
          { name: 'Symbol Mark D', path: '/mediakit/dubhe/png/d.png' },
        ]
      })
    }
    
    if (type === 'asset') {
      const assetPath = searchParams.get('path')
      const filename = searchParams.get('filename')
      
      if (!assetPath || !filename) {
        return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
      }
      
      return await downloadAsset(assetPath, filename)
    }
    
    return NextResponse.json({ error: 'Invalid download type' }, { status: 400 })
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json({ error: 'Download failed' }, { status: 500 })
  }
}

async function downloadAsset(assetPath: string, filename: string): Promise<NextResponse> {
  try {
    const publicDir = path.join(process.cwd(), 'public')
    const filePath = path.join(publicDir, assetPath)
    
    // Security check - ensure the file is within public directory
    const resolvedPath = path.resolve(filePath)
    const resolvedPublicDir = path.resolve(publicDir)
    
    if (!resolvedPath.startsWith(resolvedPublicDir)) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }
    
    const fileBuffer = await fs.readFile(filePath)
    const extension = path.extname(assetPath).toLowerCase()
    
    let contentType = 'application/octet-stream'
    if (extension === '.png') contentType = 'image/png'
    else if (extension === '.svg') contentType = 'image/svg+xml'
    else if (extension === '.jpg' || extension === '.jpeg') contentType = 'image/jpeg'
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    })
  } catch (error) {
    console.error('Asset download error:', error)
    throw error
  }
}