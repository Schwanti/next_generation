import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <main id="main-content">
        {children}
      </main>
      <Footer />
    </>
  );
}
