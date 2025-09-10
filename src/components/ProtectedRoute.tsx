// components/ProtectedRoute.tsx
"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToken } from "@/hooks/useToken";
import LoadingSpinner from "./loading-spinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  fallback = <LoadingSpinner />,
  redirectTo = "/signin",
}: ProtectedRouteProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isTokenValid, isLoading: tokenLoading } = useToken();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  // Define protected routes - same as in middleware
  const protectedRoutes = ["/movies", "/about", "/contact", "/movie"];
  const authRoutes = ["/signin", "/signup"];
  
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  
  // Check authentication status
  const hasNextAuthSession = !!session;
  const hasCustomToken = isAuthenticated && isTokenValid;
  const isUserAuthenticated = hasNextAuthSession || hasCustomToken;

  // Handle hydration
  useEffect(() => {
    setHasHydrated(true);
  }, []);

  // Debug logging (only in development)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && hasHydrated) {
      console.log('ProtectedRoute Debug:', {
        pathname,
        hasNextAuthSession,
        hasCustomToken,
        isUserAuthenticated,
        sessionStatus: status,
        tokenLoading,
        hasHydrated,
        isRedirecting,
      });
    }
  }, [
    pathname,
    hasNextAuthSession,
    hasCustomToken,
    isUserAuthenticated,
    status,
    tokenLoading,
    hasHydrated,
    isRedirecting,
  ]);

  useEffect(() => {
    // Don't do anything until hydrated
    if (!hasHydrated) return;
    
    // Don't redirect if still loading
    if (tokenLoading || status === "loading" || isRedirecting) {
      return;
    }

    // Handle auth routes (signin, signup)
    if (isAuthRoute && isUserAuthenticated) {
      console.log('ProtectedRoute: Redirecting from auth route to home');
      setIsRedirecting(true);
      router.push("/");
      return;
    }

    // Handle protected routes
    if (isProtectedRoute && !isUserAuthenticated) {
      console.log('ProtectedRoute: Redirecting from protected route to signin');
      setIsRedirecting(true);
      router.push(redirectTo);
      return;
    }

  }, [
    hasHydrated,
    status,
    tokenLoading,
    isUserAuthenticated,
    hasNextAuthSession,
    hasCustomToken,
    isAuthRoute,
    isProtectedRoute,
    pathname,
    router,
    redirectTo,
    isRedirecting
  ]);

  // Reset redirecting state when pathname changes
  useEffect(() => {
    if (hasHydrated) {
      setIsRedirecting(false);
    }
  }, [pathname, hasHydrated]);

  // Show loading state while not hydrated or while loading or redirecting
  if (!hasHydrated || tokenLoading || status === "loading" || isRedirecting) {
    return <>{fallback}</>;
  }

  // For protected routes, only render if authenticated
  if (isProtectedRoute && !isUserAuthenticated) {
    return <>{fallback}</>;
  }

  // For auth routes, only render if not authenticated
  if (isAuthRoute && isUserAuthenticated) {
    return <>{fallback}</>;
  }

  // For all other cases, render children
  return <>{children}</>;
}