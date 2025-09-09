"use client";

import { useSession } from "next-auth/react";
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
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(redirectTo);
    } else if (status === 'authenticated' && 
              (window.location.pathname === "/signin" || 
               window.location.pathname === "/signup")) {
      router.push("/");
    }
  }, [status, router, redirectTo]);

  if (status === 'loading') {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}