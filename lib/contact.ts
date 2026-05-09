import nodemailer from 'nodemailer'

export type ContactPayload = {
  name: string
  email: string
  phone?: string
  service: string
  message: string
}

type ContactMeta = {
  ip?: string | null
  userAgent?: string | null
}

export function validateContactPayload(payload: unknown): ContactPayload {
  const body = payload as Record<string, unknown>

  const name = normalizeString(body?.name)
  const email = normalizeString(body?.email)
  const phone = normalizeString(body?.phone)
  const service = normalizeString(body?.service)
  const message = normalizeString(body?.message)

  if (!name || !email || !service || !message) {
    throw new Error('Missing required fields: name, email, service, message')
  }

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!isEmailValid) {
    throw new Error('Please provide a valid email address')
  }

  return { name, email, phone, service, message }
}

export async function sendContactEmail(data: ContactPayload, meta?: ContactMeta): Promise<void> {
  const transporter = getTransporter()
  const from = getFrom()
  const adminEmail = process.env.CONTACT_ADMIN_EMAIL

  if (!adminEmail) {
    throw new Error('CONTACT_ADMIN_EMAIL must be set in the environment')
  }

  const subject = `[Contact] ${data.name} - ${data.service}`
  const text = buildText(data, meta)
  const html = buildHtml(data, meta)

  await transporter.sendMail({
    from,
    to: adminEmail,
    replyTo: data.email,
    subject,
    text,
    html,
  })
}

function getTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com'
  const port = parseInt(process.env.SMTP_PORT || '587', 10)
  const user = process.env.EMAIL
  const pass = process.env.PASSWORD

  if (!user || !pass) {
    throw new Error('EMAIL and PASSWORD must be set in the environment')
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

  if (!email) {
    throw new Error('FROM_EMAIL or EMAIL must be set in the environment')
  }

  return `"${name}" <${email}>`
}

function buildText(data: ContactPayload, meta?: ContactMeta): string {
  return [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || '-'}`,
    `Service: ${data.service}`,
    `IP: ${meta?.ip || '-'}`,
    `User Agent: ${meta?.userAgent || '-'}`,
    '',
    'Message:',
    data.message,
  ].join('\n')
}

function buildHtml(data: ContactPayload, meta?: ContactMeta): string {
  return `
    <div style="font-family: system-ui, sans-serif; max-width: 560px;">
      <h2 style="color: #111;">New Contact Form Submission</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 6px 0; color: #666;">Name</td><td style="padding: 6px 0;">${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding: 6px 0; color: #666;">Email</td><td style="padding: 6px 0;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
        <tr><td style="padding: 6px 0; color: #666;">Phone</td><td style="padding: 6px 0;">${escapeHtml(data.phone || '-')}</td></tr>
        <tr><td style="padding: 6px 0; color: #666;">Service</td><td style="padding: 6px 0;">${escapeHtml(data.service)}</td></tr>
        <tr><td style="padding: 6px 0; color: #666;">IP</td><td style="padding: 6px 0;">${escapeHtml(meta?.ip || '-')}</td></tr>
        <tr><td style="padding: 6px 0; color: #666;">User Agent</td><td style="padding: 6px 0;">${escapeHtml(meta?.userAgent || '-')}</td></tr>
      </table>
      <p style="margin-top: 16px; color: #666;">Message:</p>
      <p style="white-space: pre-wrap; background: #f5f5f5; padding: 12px; border-radius: 8px;">${escapeHtml(data.message)}</p>
    </div>
  `
}

function normalizeString(value: unknown): string {
  if (typeof value !== 'string') {
    return ''
  }
  return value.trim()
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
