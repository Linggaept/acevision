"use client";

import { usePathname } from "next/navigation";
import { Navbar5 } from "@/components/navbar";
import { Footer2 } from "@/components/footer";
import MainContainer from "@/components/MainContainer";
import { ProtectedRoute } from "./ProtectedRoute";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({
  children,
}: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Route yang tidak memerlukan navbar dan footer
  const authRoutes = ["/signin", "/signup", "/login"];
  const isAuthRoute = authRoutes.includes(pathname);

  if (isAuthRoute) {
    return <MainContainer>{children}</MainContainer>;
  }

  return (
    <ProtectedRoute>
      <MainContainer>
        <Navbar5 />
        {children}
        <Footer2 />
      </MainContainer>
    </ProtectedRoute>
  );
}
