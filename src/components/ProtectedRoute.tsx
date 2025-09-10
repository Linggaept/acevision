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

  // Define protected routes - same as in middleware
  const protectedRoutes = ["/movies", "/about", "/contact", "/movie"];
  const authRoutes = ["/signin", "/signup"];
  
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  
  // Check if user is authenticated via NextAuth (Google, GitHub, etc.)
  const hasNextAuthSession = !!session;
  
  // Check if user is authenticated via custom token (manual login)  
  const hasCustomToken = isAuthenticated && isTokenValid;
  
  // User is authenticated if they have EITHER NextAuth session OR valid custom token
  const isUserAuthenticated = hasNextAuthSession || hasCustomToken;

  // Debug logging
  // console.log('ProtectedRoute Debug:', {
  //   pathname,
  //   hasNextAuthSession,
  //   hasCustomToken,
  //   isUserAuthenticated,
  //   sessionStatus: status,
  //   tokenLoading,
  //   session: !!session
  // });

  useEffect(() => {
    // Don't redirect if still loading
    if (tokenLoading || status === "loading" || isRedirecting) {
      return;
    }

    // Handle auth routes (signin, signup)
    if (isAuthRoute && isUserAuthenticated) {
      console.log('Redirecting from auth route to home');
      setIsRedirecting(true);
      router.push("/");
      return;
    }

    // Handle protected routes
    if (isProtectedRoute && !isUserAuthenticated) {
      console.log('Redirecting from protected route to signin');
      setIsRedirecting(true);
      router.push(redirectTo);
      return;
    }

  }, [
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
    setIsRedirecting(false);
  }, [pathname]);

  // Show loading state while loading or redirecting
  if (tokenLoading || status === "loading" || isRedirecting) {
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