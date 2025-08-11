"use client";

import { useToken } from "@/hooks/useToken";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingSpinner from "./loading-spinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({ 
  children, 
  fallback = <LoadingSpinner />,
  redirectTo = "/signin" 
}: ProtectedRouteProps) {
  const { isAuthenticated, isTokenValid, isLoading } = useToken();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isTokenValid)) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isTokenValid, isLoading, router, redirectTo]);

  if (isLoading) {
    return <>{fallback}</>;
  }

  if (!isAuthenticated || !isTokenValid) {
    return null; // Will redirect
  }

  return <>{children}</>;
}