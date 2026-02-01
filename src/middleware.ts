// src/middleware.ts
import { NextResponse } from 'next/server';
import { auth } from "@/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // 1. Define your protected routes
  const isDashboard = nextUrl.pathname.startsWith("/dashboard");
  const isOnboarding = nextUrl.pathname.startsWith("/onboarding");
  const isEdit = nextUrl.pathname.startsWith("/edit");
  const isReservationPage = nextUrl.pathname.endsWith("/reservations");

  // 2. If it's a protected route and not logged in, redirect to login
  if ((isDashboard || isOnboarding || isEdit || isReservationPage) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/onboarding/:path*',
    '/edit/:path*',
    '/:path*/reservations', // Use :path* to catch any depth before reservations
  ],
};