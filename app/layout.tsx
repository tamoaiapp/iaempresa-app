import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "iaempresa.app — IA para o seu negócio. Sem complicação.",
    template: "%s | iaempresa.app",
  },
  description:
    "Guias práticos de Inteligência Artificial para pequenos negócios, MEIs e lojistas brasileiros. Aprenda a usar IA no seu negócio hoje.",
  keywords: "inteligência artificial para empresas, IA para pequenos negócios, ChatGPT para lojistas, automação com IA, IA para MEI",
  metadataBase: new URL("https://iaempresa.app"),
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    siteName: "iaempresa.app",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "iaempresa.app — IA para o seu negócio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "iaempresa.app",
    description: "Guias práticos de IA para pequenos negócios brasileiros.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
