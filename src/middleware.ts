import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // 1. Protect /admin/dashboard — strictly requires role === "admin"
  if (pathname.startsWith("/admin/dashboard")) {
    if (!token) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }

    if (token.role !== "admin") {
      // User Barrier: non-admin users are redirected to /milaap/dashboard
      const participantUrl = new URL("/milaap/dashboard", req.url);
      return NextResponse.redirect(participantUrl);
    }

    return NextResponse.next();
  }

  // 2. Protect participant routes (/milaap/register & /milaap/dashboard)
  if (
    pathname.startsWith("/milaap/register") ||
    pathname.startsWith("/milaap/dashboard")
  ) {
    if (!token) {
      const signInUrl = new URL("/milaap/sign-in", req.url);
      return NextResponse.redirect(signInUrl);
    }

    // Note: If token.role === "admin", allow request to render the page-level
    // Admin Barrier UI ("Admin accounts cannot use the participant portal. Please use the Admin Login at the top right.")
    // without auto-redirecting to /admin/dashboard.
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/milaap/dashboard/:path*",
    "/milaap/register/:path*",
  ],
};

