import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const ADMIN_EMAIL = process.env.CONTACT_ADMIN_EMAIL || 'zna152191@gmail.com'

function getTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com'
  const port = parseInt(process.env.SMTP_PORT || '587', 10)
  const user = process.env.EMAIL
  const pass = process.env.PASSWORD

  if (!user || !pass) {
    throw new Error('EMAIL and PASSWORD must be set in .env.local for contact form emails')
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })
}

function getFrom() {
  const name = process.env.FROM_NAME || 'Xentio Digital'
  const email = process.env.FROM_EMAIL || process.env.EMAIL
  return `"${name}" <${email}>`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service, message } = body as Record<string, string>

    if (!name?.trim() || !email?.trim() || !service?.trim() || !message?.trim()) {
      return NextResponse.json(
        { ok: false, error: 'Missing required fields: name, email, service, message' },
        { status: 400 }
      )
    }

    const transporter = getTransporter()
    const from = getFrom()

    const subject = `[Contact] ${name} – ${service}`
    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || '—'}`,
      `Service: ${service}`,
      '',
      'Message:',
      message,
    ].join('\n')

    const html = `
      <div style="font-family: system-ui, sans-serif; max-width: 560px;">
        <h2 style="color: #111;">New Contact Form</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 6px 0; color: #666;">Name</td><td style="padding: 6px 0;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding: 6px 0; color: #666;">Email</td><td style="padding: 6px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding: 6px 0; color: #666;">Phone</td><td style="padding: 6px 0;">${escapeHtml(phone || '—')}</td></tr>
          <tr><td style="padding: 6px 0; color: #666;">Service</td><td style="padding: 6px 0;">${escapeHtml(service)}</td></tr>
        </table>
        <p style="margin-top: 16px; color: #666;">Message:</p>
        <p style="white-space: pre-wrap; background: #f5f5f5; padding: 12px; border-radius: 8px;">${escapeHtml(message)}</p>
      </div>
    `

    await transporter.sendMail({
      from,
      to: ADMIN_EMAIL,
      replyTo: email,
      subject,
      text,
      html,
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    const err = e instanceof Error ? e : new Error('Unknown error')
    console.error('Contact API (Nodemailer):', err.message)
    return NextResponse.json(
      { ok: false, error: err.message || 'Failed to send email' },
      { status: 500 }
    )
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
