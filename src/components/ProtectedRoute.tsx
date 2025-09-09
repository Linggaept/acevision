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
  
  // Check if user is authenticated
  const isUserAuthenticated = session || (isAuthenticated && isTokenValid);

  useEffect(() => {
    // Don't redirect if still loading
    if (tokenLoading || status === "loading" || isRedirecting) {
      return;
    }

    // Handle auth routes (signin, signup)
    if (isAuthRoute && isUserAuthenticated) {
      setIsRedirecting(true);
      router.push("/");
      return;
    }

    // Handle protected routes
    if (isProtectedRoute && !isUserAuthenticated) {
      setIsRedirecting(true);
      router.push(redirectTo);
      return;
    }

  }, [
    status,
    tokenLoading,
    isUserAuthenticated,
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