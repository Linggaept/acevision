// middleware.ts
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
    const isProduction = process.env.NODE_ENV === "production";
    
    // Get the NextAuth session token with correct cookie name
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
      cookieName: isProduction 
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token",
    });

    // Check custom tokens
    const accessToken = request.cookies.get("access_token")?.value;
    const tokenExpires = request.cookies.get("token_expires")?.value;

    const isTokenExpired = (expiresAt: string): boolean => {
      const expiryTime = parseInt(expiresAt);
      const currentTime = Math.floor(Date.now() / 1000);
      return currentTime >= expiryTime;
    };

    // Function to check if custom token is valid
    const isCustomTokenValid = (): boolean => {
      if (!accessToken) return false;
      if (!tokenExpires) return true; // If no expiry set, assume valid
      return !isTokenExpired(tokenExpires);
    };

    // Check authentication status
    const hasNextAuthSession = !!token;
    const hasCustomToken = isCustomTokenValid();
    const isAuthenticated = hasNextAuthSession || hasCustomToken;

    // Debug logging (only in development)
    if (!isProduction) {
      console.log('Middleware Debug:', {
        pathname,
        hasNextAuthSession,
        hasCustomToken,
        isAuthenticated,
        tokenExists: !!token,
        accessTokenExists: !!accessToken,
        cookieName: isProduction ? "__Secure-next-auth.session-token" : "next-auth.session-token",
        environment: process.env.NODE_ENV,
      });
    }

    // Redirect logic for auth routes
    if (isAuthRoute) {
      if (isAuthenticated) {
        console.log('Middleware: Redirecting authenticated user from auth route');
        return NextResponse.redirect(new URL("/", request.url));
      }
      return NextResponse.next();
    }

    // Redirect logic for protected routes
    if (isProtectedRoute) {
      if (!isAuthenticated) {
        console.log('Middleware: Redirecting unauthenticated user from protected route');
        return NextResponse.redirect(new URL("/signin", request.url));
      }
      return NextResponse.next();
    }

    // For all other routes, allow access
    return NextResponse.next();
    
  } catch (error) {
    console.error("Middleware error:", error);
    
    // Graceful degradation
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