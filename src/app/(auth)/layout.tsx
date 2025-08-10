import MainContainer from "@/components/MainContainer";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MainContainer>
      {children}
    </MainContainer>
  );
}