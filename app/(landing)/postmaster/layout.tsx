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

// Schema.org Product JSON-LD pro Google reconhecer como produto vendido
// (vai aparecer com preço, disponibilidade e título destacado em SERP).
const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PostMaster",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Social Media Automation",
  operatingSystem: "Windows 10, Windows 11",
  description:
    "Software desktop que automatiza postagens em Instagram e TikTok. Baixa vídeos do YouTube/IG/TikTok, converte pra 9:16, gera legenda com IA local e posta sozinho. Sem mensalidade.",
  image: "https://iaempresa.app/postmaster-app.png",
  url: "https://iaempresa.app/postmaster",
  brand: { "@type": "Brand", name: "iaempresa.app" },
  offers: {
    "@type": "Offer",
    url: "https://iaempresa.app/postmaster",
    priceCurrency: "BRL",
    price: "197.00",
    priceValidUntil: "2026-12-31",
    availability: "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
  },
  featureList: [
    "Baixa vídeos do YouTube, Instagram e TikTok",
    "Posta Reels no Instagram sozinho",
    "Posta no TikTok em múltiplas contas",
    "Legenda com IA embutida — sem pagar API",
    "Posta no horário certo, todo dia",
    "Filtra e nunca repete o mesmo vídeo",
  ],
};

export default function PostmasterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      {children}
    </>
  );
}
