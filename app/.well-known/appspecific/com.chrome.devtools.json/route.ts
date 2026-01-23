import { NextResponse } from 'next/server'

// Chrome may probe this path in dev. Responding avoids accidental routing into `/{locale}`.
export function GET() {
  return NextResponse.json({}, { status: 200 })
}

