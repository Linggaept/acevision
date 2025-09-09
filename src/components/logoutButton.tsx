"use client";

import { Button } from "@/components/ui/button";
import { useToken } from "@/hooks/useToken";
import { signOut, useSession } from "next-auth/react"; // Changed import
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LogoutButtonProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function LogoutButton({
  variant = "outline",
  size = "default",
  className,
}: LogoutButtonProps) {
  const { clearToken } = useToken();
  const [isLogging, setIsLogging] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogout = async () => {
    setIsLogging(true);

    try {
      // Clear tokens from cookies
      clearToken();

      // Sign out from next-auth using the client-side signOut
      if (session) {
        await signOut({
          redirect: false,
          callbackUrl: "/signin",
        });
      }

      // Redirect to signin page
      router.push("/signin");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLogging(false);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={isLogging}
      variant={variant}
      size={size}
      className={className}
    >
      {isLogging ? "Logging out..." : "Logout"}
    </Button>
  );
}
