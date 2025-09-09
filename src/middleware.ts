import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // Get the NextAuth session token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const accessToken = request.cookies.get("access_token")?.value;
  const tokenExpires = request.cookies.get("token_expires")?.value;

  const { pathname } = request.nextUrl;

  // Define protected and auth routes
  const protectedRoutes = ["/movies", "/about", "/contact", "/movie"];
  const authRoutes = ["/signin", "/signup"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  const isTokenExpired = (expiresAt: string): boolean => {
    const expiryTime = parseInt(expiresAt);
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime >= expiryTime;
  };

  // Function to check if token is valid
  const isTokenValid = (): boolean => {
    if (!accessToken) return false;
    if (!tokenExpires) return true; // If no expiry set, assume valid
    return !isTokenExpired(tokenExpires);
  };

  // Redirect logic
  if (isAuthRoute) {
    if (token || isTokenValid()) {
      // User is signed in and trying to access auth routes
      return NextResponse.redirect(new URL("/", request.url));
    }
    // Allow access to auth routes if not signed in
    return NextResponse.next();
  }

  if (isProtectedRoute) {
    if (!token || !isTokenValid()) {
      // No token, redirect to signin
      return NextResponse.redirect(new URL("/signin", request.url));
    }
    // Has token, allow access to protected route
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public/).*)"],
};
