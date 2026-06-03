import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teste o PostMaster 24h grátis — sem cartão",
  description:
    "Baixa, instala e usa o PostMaster por 24 horas com tudo liberado. Sem cartão, sem cadastro, sem trava. Se gostar depois você compra (R$ 197).",
  openGraph: {
    title: "Teste o PostMaster 24h grátis (sem cartão)",
    description: "Tudo liberado igual a quem pagou. Baixa, conecta seu Instagram ou TikTok, usa as 24h e decide depois.",
    type: "website",
    locale: "pt_BR",
    url: "/postmaster/teste-24h",
    images: [{ url: "/postmaster-app.png", width: 1100, height: 580, alt: "PostMaster — dashboard" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Teste o PostMaster 24h grátis",
    description: "Sem cartão, sem cadastro, sem trava. R$ 197 só se gostar.",
    images: ["/postmaster-app.png"],
  },
  alternates: { canonical: "/postmaster/teste-24h" },
};

import ChatWidget from "@/components/ChatWidget";

export default function Teste24hLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ChatWidget produto="postmaster" />
    </>
  );
}
