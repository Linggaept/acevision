import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Define protected and auth routes
  const protectedRoutes = ["/movies", "/about", "/contact", "/movie"];
  const authRoutes = ["/signin", "/signup"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    pathname.startsWith('/public')
  ) {
    return NextResponse.next();
  }

  try {
    // Get the NextAuth session token
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    const accessToken = request.cookies.get("access_token")?.value;
    const tokenExpires = request.cookies.get("token_expires")?.value;

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

    // Check if user is authenticated (either NextAuth or custom token)
    const isAuthenticated = token || isTokenValid();

    // Redirect logic for auth routes
    if (isAuthRoute) {
      if (isAuthenticated) {
        // User is signed in and trying to access auth routes
        return NextResponse.redirect(new URL("/", request.url));
      }
      // Allow access to auth routes if not signed in
      return NextResponse.next();
    }

    // Redirect logic for protected routes
    if (isProtectedRoute) {
      if (!isAuthenticated) {
        // No token, redirect to signin
        return NextResponse.redirect(new URL("/signin", request.url));
      }
      // Has token, allow access to protected route
      return NextResponse.next();
    }

    // For all other routes (including home "/"), allow access
    return NextResponse.next();
    
  } catch (error) {
    console.error("Middleware error:", error);
    // If there's an error checking auth, allow access to non-protected routes
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};