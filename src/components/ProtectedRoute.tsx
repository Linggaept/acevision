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
    if (!isLoading) {
      // Redirect unauthenticated users to signin
      if (!isAuthenticated || !isTokenValid) {
        router.push(redirectTo);
      } 
      // Redirect authenticated users away from signin/signup pages
      else if (isAuthenticated && isTokenValid && 
               (window.location.pathname === "/signin" || 
                window.location.pathname === "/signup")) {
        router.push("/"); // atau halaman utama setelah login
      }
    }
  }, [isAuthenticated, isTokenValid, isLoading, router, redirectTo]);

  if (isLoading) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}