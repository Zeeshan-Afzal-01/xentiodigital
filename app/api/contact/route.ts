import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail, validateContactPayload } from '@/lib/contact'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const payload = validateContactPayload(body)

    await sendContactEmail(payload, {
      ip: request.headers.get('x-forwarded-for') || request.ip || null,
      userAgent: request.headers.get('user-agent'),
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    const err = e instanceof Error ? e : new Error('Unknown error')
    console.error('Contact API (Nodemailer):', err.message)
    return NextResponse.json(
      { ok: false, error: err.message || 'Failed to send email' },
      { status: err.message.startsWith('Missing required') || err.message.startsWith('Please provide') ? 400 : 500 }
    )
  }
}
