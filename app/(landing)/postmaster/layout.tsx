import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PostMaster — Posta no Instagram e TikTok sozinho 24h",
  description:
    "Configure em 10 minutos. PostMaster baixa vídeos do YouTube, converte pra 9:16, gera legenda com IA local e posta sozinho no Instagram e TikTok. Sem mensalidade. Sem limite. R$ 197 pagamento único.",
  openGraph: {
    title: "PostMaster — Seu perfil postando sozinho 24h",
    description: "Configure em 10 minutos. Posta até 6 vídeos por dia, com legenda e hashtag por IA local, sem mensalidade nem limite — você não toca em nada. R$ 197 pagamento único.",
    type: "website",
    locale: "pt_BR",
    url: "/postmaster",
    images: [{ url: "/postmaster-app.png", width: 1100, height: 580, alt: "PostMaster — dashboard do app" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PostMaster — Posta sozinho 24h",
    description: "Configure em 10 minutos. R$ 197 pagamento único. Sem mensalidade.",
    images: ["/postmaster-app.png"],
  },
  alternates: { canonical: "/postmaster" },
};

export default function PostmasterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
