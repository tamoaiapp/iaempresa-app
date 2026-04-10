"use client";
import Link from "next/link";

interface GuideCardProps {
  slug: string;
  title: string;
  description: string;
  categoria: string;
  tempo: string;
  dificuldade: "iniciante" | "intermediário";
  custo?: string;
}

const categoriaColors: Record<string, string> = {
  instagram: "#e1306c",
  whatsapp: "#25d366",
  "fotos-produto": "#f59e0b",
  atendimento: "#3b82f6",
  marketing: "#8b5cf6",
  gestao: "#06b6d4",
  vendas: "#16c784",
};

const categoriaLabels: Record<string, string> = {
  instagram: "Instagram",
  whatsapp: "WhatsApp",
  "fotos-produto": "Fotos de Produto",
  atendimento: "Atendimento",
  marketing: "Marketing",
  gestao: "Gestão",
  vendas: "Vendas",
};

export default function GuideCard({ slug, title, description, categoria, tempo, dificuldade, custo }: GuideCardProps) {
  const color = categoriaColors[categoria] || "#8b5cf6";
  const label = categoriaLabels[categoria] || categoria;

  return (
    <Link href={`/guias/${slug}`} style={{ textDecoration: "none" }}>
      <article style={{
        background: "var(--card)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "var(--radius-lg)",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        transition: "border-color 0.2s, transform 0.2s",
        cursor: "pointer",
        height: "100%",
      }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = color + "55";
          (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        }}
      >
        {/* Categoria badge */}
        <span style={{
          display: "inline-flex",
          alignSelf: "flex-start",
          background: color + "22",
          color: color,
          border: `1px solid ${color}44`,
          borderRadius: 20,
          padding: "0.2rem 0.7rem",
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: "0.5px",
          textTransform: "uppercase",
        }}>
          {label}
        </span>

        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", lineHeight: 1.4 }}>
          {title}
        </h3>

        <p style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.6, flexGrow: 1 }}>
          {description}
        </p>

        {/* Meta */}
        <div style={{ display: "flex", gap: "1rem", fontSize: "0.8rem", color: "var(--dim)", flexWrap: "wrap" }}>
          <span>⏱ {tempo}</span>
          {custo && <span>💰 {custo}</span>}
          <span style={{ color: dificuldade === "iniciante" ? "var(--green)" : "#f59e0b" }}>
            ● {dificuldade}
          </span>
        </div>
      </article>
    </Link>
  );
}
