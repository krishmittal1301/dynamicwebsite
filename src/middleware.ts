// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const session = request.cookies.get("admin_session");

    // 1. Check for standard admin prefixes
    const protectedPrefixes = ['/dashboard', '/onboarding', '/edit'];
    const isProtectedPrefix = protectedPrefixes.some(path => pathname.startsWith(path));

    // 2. Check for the dynamic dynamic [slug]/reservations
    const isReservationPage = pathname.endsWith('/reservations');

    // 3. FIX: Use OR (||) instead of AND (&&)
    // We want to redirect if (Any Protected Path) AND (No Session)
    if ((isProtectedPrefix || isReservationPage) && !session) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/onboarding/:path*',
    '/edit/:path*',
    '/:path*/reservations', // Use :path* to catch any depth before reservations
  ],
};