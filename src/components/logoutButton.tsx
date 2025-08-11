"use client";

import { Button } from "@/components/ui/button";
import { useToken } from "@/hooks/useToken";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LogoutButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function LogoutButton({ 
  variant = "outline", 
  size = "default",
  className 
}: LogoutButtonProps) {
  const { clearToken } = useToken();
  const [isLogging, setIsLogging] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLogging(true);
    
    try {
      // Optional: Call logout API
      // await logoutService();
      
      // Clear tokens from cookies
      clearToken();
      
      // Redirect to signin page
      router.push('/signin');
    } catch (error) {
      console.error('Logout error:', error);
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