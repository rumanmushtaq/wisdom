import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_PATHS = [
  '/dashboard',
  '/deposit',
  '/withdraw',
  '/profile',
  '/tasks',
]

export function middleware(request: NextRequest) {
  const access_token = request.cookies.get('access_token')?.value
  const { pathname } = request.nextUrl

  if (!access_token && PROTECTED_PATHS.includes(pathname)) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

/**
 * Must be static – Next.js limitation
 */
export const config = {
  matcher: [
    '/dashboard',
    '/deposit',
    '/withdraw',
    '/profile',
    '/tasks',
  ],
}
