import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import admin from 'firebase-admin'
import { getFirebaseAdminApp, getAdminDb } from '@/lib/firebase-admin'
import { ADMIN_SESSION_COOKIE } from '@/lib/admin-server-auth'

export const runtime = 'nodejs'

const MAX_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

async function requireAdmin(request: NextRequest) {
  const cookie = request.cookies.get(ADMIN_SESSION_COOKIE)?.value
  if (!cookie) return null
  getFirebaseAdminApp()
  try {
    const decoded = await admin.auth().verifySessionCookie(cookie, true)
    const db = getAdminDb()
    const isAdmin = (await db.collection('admins').doc(decoded.uid).get()).exists
    if (!isAdmin) return null
    return { uid: decoded.uid }
  } catch {
    return null
  }
}

export async function POST(request: NextRequest) {
  const adminSession = await requireAdmin(request)
  if (!adminSession) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET
  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      {
        error:
          'Cloudinary not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in your env.',
      },
      { status: 500 }
    )
  }

  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret })

  try {
    const formData = await request.formData()
    const raw = formData.get('file')
    if (!raw || !(raw instanceof Blob) || raw.size === 0) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }
    const file = raw as File
    const mime = file.type || ''
    if (!ALLOWED.includes(mime)) {
      return NextResponse.json(
        { error: 'Only JPEG, PNG, WebP and GIF images are allowed' },
        { status: 400 }
      )
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'Image must be 5MB or smaller' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const b64 = buffer.toString('base64')
    const dataUri = `data:${mime};base64,${b64}`

    const result = await cloudinary.uploader.upload(dataUri, { folder: 'blog-covers' })
    const url = result?.secure_url
    if (!url) {
      return NextResponse.json({ error: 'Cloudinary did not return a URL' }, { status: 500 })
    }

    return NextResponse.json({ url })
  } catch (e: any) {
    console.error('Upload cover error:', e)
    return NextResponse.json(
      { error: e?.message || 'Upload failed. Check your Cloudinary credentials and dashboard.' },
      { status: 500 }
    )
  }
}
