"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
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
  const pathname = usePathname();

  useEffect(() => {
    if (status === 'unauthenticated' && pathname === '/') {
      router.push(redirectTo);
    } else if (status === 'authenticated' && 
              (pathname === "/signin" || pathname === "/signup")) {
      router.push("/");
    }
  }, [status, router, redirectTo, pathname]);

  // Show loading state while checking authentication
  if (status === 'loading' || 
      (status === 'unauthenticated' && pathname === '/')) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}