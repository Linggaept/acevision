"use client";

import { Footer2 } from "@/components/footer";
import MainContainer from "@/components/MainContainer";
import { Navbar5 } from "@/components/navbar";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useToken } from "@/hooks/useToken";
import ChatPublicDialog from "./chat/chatPublicDialog";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({
  children,
}: ConditionalLayoutProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { isAuthenticated, isTokenValid } = useToken();

  // Route yang tidak memerlukan navbar dan footer
  const authRoutes = ["/signin", "/signup", "/login"];
  const isAuthRoute = authRoutes.includes(pathname);

  // Check if user is authenticated
  const isUserAuthenticated = session || (isAuthenticated && isTokenValid);

  if (isAuthRoute) {
    return <MainContainer>{children}</MainContainer>;
  }

  return (
    <MainContainer>
      <Navbar5 />
      {children}
      {/* Only show chat dialog if user is authenticated */}
      {isUserAuthenticated && (
        <div className="fixed bottom-10 right-10 z-50 shadow-sm shadow-primary rounded-sm">
          <ChatPublicDialog />
        </div>
      )}
      <Footer2 />
    </MainContainer>
  );
}