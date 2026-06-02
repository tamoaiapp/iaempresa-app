import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main style={{ flexGrow: 1 }}>{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
