"use client";
interface ProductCardProps {
  nome: string;
  descricao: string;
  href: string;
  cor?: string;
  emoji?: string;
  externo?: boolean;
}

export default function ProductCard({ nome, descricao, href, cor = "#6366f1", emoji = "🚀", externo = true }: ProductCardProps) {
  return (
    <a
      href={href}
      target={externo ? "_blank" : undefined}
      rel={externo ? "noopener noreferrer" : undefined}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        background: "var(--card)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "var(--radius-lg)",
        padding: "1.5rem",
        textDecoration: "none",
        transition: "border-color 0.2s, transform 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = cor + "55";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontSize: "2rem" }}>{emoji}</span>
        <span style={{
          fontSize: "0.7rem",
          fontWeight: 700,
          color: cor,
          background: cor + "22",
          border: `1px solid ${cor}44`,
          padding: "0.2rem 0.6rem",
          borderRadius: 20,
          letterSpacing: "0.5px",
        }}>
          FEITO PARA O BRASIL
        </span>
      </div>
      <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--text)" }}>{nome}</div>
      <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.6 }}>{descricao}</p>
      <span style={{ fontSize: "0.875rem", color: cor, fontWeight: 600, marginTop: "auto" }}>
        Conhecer →
      </span>
    </a>
  );
}
