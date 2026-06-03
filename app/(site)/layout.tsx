import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main style={{ flexGrow: 1 }}>{children}</main>
      <Footer />
      <ChatWidget produto="geral" />
    </>
  );
}
