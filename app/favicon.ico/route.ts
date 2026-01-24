import { NextRequest, NextResponse } from 'next/server'

// Redirect /favicon.ico to /favicon.png so both work; avoids /favicon.ico being interpreted as /{locale}.
export function GET(request: NextRequest) {
  return NextResponse.redirect(new URL('/favicon.png', request.url), 302)
}

