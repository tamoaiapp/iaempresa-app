"use client";

interface ToolCardProps {
  nome: string;
  descricao: string;
  href: string;
  gratis: boolean;
  funciona: boolean;
}

export default function ToolCard({ nome, descricao, href, gratis, funciona }: ToolCardProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      background: "var(--card)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "var(--radius)",
      padding: "1.25rem",
      textDecoration: "none",
      transition: "border-color 0.2s",
    }}
      onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.3)"}
      onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontWeight: 700, color: "var(--text)" }}>{nome}</span>
        <div style={{ display: "flex", gap: "0.4rem" }}>
          {gratis && (
            <span style={{ fontSize: "0.7rem", background: "rgba(22,199,132,0.12)", color: "#16c784", border: "1px solid rgba(22,199,132,0.25)", padding: "0.15rem 0.5rem", borderRadius: 10, fontWeight: 700 }}>
              GRÁTIS
            </span>
          )}
          {funciona && (
            <span style={{ fontSize: "0.7rem", background: "rgba(99,102,241,0.12)", color: "#a78bfa", border: "1px solid rgba(99,102,241,0.25)", padding: "0.15rem 0.5rem", borderRadius: 10, fontWeight: 700 }}>
              🇧🇷 BR
            </span>
          )}
        </div>
      </div>
      <p style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.5 }}>{descricao}</p>
    </a>
  );
}
