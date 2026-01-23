import { NextResponse } from 'next/server'

// Prevent `/favicon.ico` from being interpreted as `/{locale}` when no static favicon exists.
// This avoids expensive rendering/hydration and stops dev-server 500s from noisy browser requests.
export function GET() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Cache-Control': 'public, max-age=86400',
    },
  })
}

