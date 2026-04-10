interface CTABannerProps {
  produto: "tamowork" | "buscafornecedor" | "fidelizaai";
}

const banners = {
  tamowork: {
    emoji: "📸",
    titulo: "Fotos de produto profissionais com IA",
    texto: "Transforme fotos amadoras de produto em imagens profissionais em segundos. Sem fotógrafo, sem estúdio.",
    cta: "Experimentar grátis",
    href: "https://tamowork.com",
    cor: "#8b5cf6",
  },
  buscafornecedor: {
    emoji: "🏪",
    titulo: "Encontre fornecedores de atacado no Brasil",
    texto: "Descubra fornecedores confiáveis por categoria, região e faixa de preço. Direto na fábrica.",
    cta: "Buscar fornecedores",
    href: "https://buscafornecedor.app",
    cor: "#16c784",
  },
  fidelizaai: {
    emoji: "💬",
    titulo: "Fidelize clientes pelo WhatsApp com IA",
    texto: "Mensagens automáticas personalizadas que trazem o cliente de volta. Sem esforço manual.",
    cta: "Conhecer FidelizaAI",
    href: "https://iaempresa.app/ferramentas",
    cor: "#25d366",
  },
};

export default function CTABanner({ produto }: CTABannerProps) {
  const b = banners[produto];
  return (
    <div style={{
      background: `linear-gradient(135deg, ${b.cor}18, ${b.cor}08)`,
      border: `1px solid ${b.cor}33`,
      borderRadius: "var(--radius-lg)",
      padding: "1.5rem 2rem",
      display: "flex",
      gap: "1.25rem",
      alignItems: "center",
      flexWrap: "wrap",
      margin: "2rem 0",
    }}>
      <span style={{ fontSize: "2.5rem", flexShrink: 0 }}>{b.emoji}</span>
      <div style={{ flex: 1, minWidth: 200 }}>
        <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "var(--text)", marginBottom: "0.3rem" }}>{b.titulo}</div>
        <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.5 }}>{b.texto}</p>
      </div>
      <a href={b.href} target="_blank" rel="noopener noreferrer" style={{
        background: b.cor,
        color: "#fff",
        fontWeight: 700,
        fontSize: "0.9rem",
        padding: "0.6rem 1.25rem",
        borderRadius: 10,
        textDecoration: "none",
        flexShrink: 0,
        whiteSpace: "nowrap",
      }}>
        {b.cta}
      </a>
    </div>
  );
}
