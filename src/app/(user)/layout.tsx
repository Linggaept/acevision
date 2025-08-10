import { Navbar5 } from "@/components/navbar";
import MainContainer from "@/components/MainContainer";
import { Footer2 } from "@/components/footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MainContainer>
      <Navbar5 />
      {children}
      <Footer2 />
    </MainContainer>
  );
}