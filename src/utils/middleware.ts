// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Ambil token dari cookies
  const accessToken = request.cookies.get('access_token')?.value;
  const tokenExpires = request.cookies.get('token_expires')?.value;
  
  // Daftar protected routes
  const protectedRoutes = ['/movie', '/'];
  const authRoutes = ['/signin', '/signup'];
  
  const { pathname } = request.nextUrl;
  
  // Check if current path is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // Check if current path is auth route
  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Function to check if token is expired
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
  if (isProtectedRoute) {
    if (!isTokenValid()) {
      // Token tidak valid, redirect ke signin
      const signInUrl = new URL('/signin', request.url);
      signInUrl.searchParams.set('callbackUrl', request.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  if (isAuthRoute) {
    if (isTokenValid()) {
      // User sudah login, redirect ke dashboard
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public/).*)',
  ],
};