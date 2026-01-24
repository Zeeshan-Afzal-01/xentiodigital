declare module 'nodemailer' {
  export interface TransportOptions {
    host?: string
    port?: number
    secure?: boolean
    auth?: { user: string; pass: string }
    [key: string]: unknown
  }

  export interface SendMailOptions {
    from?: string
    to?: string | string[]
    replyTo?: string
    subject?: string
    text?: string
    html?: string
    [key: string]: unknown
  }

  export interface Transporter {
    sendMail(options: SendMailOptions): Promise<{ messageId: string }>
  }

  export function createTransport(options?: TransportOptions): Transporter
}
