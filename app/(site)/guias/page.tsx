import { getAllGuias } from "@/lib/mdx";
import GuideCard from "@/components/GuideCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guias de IA para Pequenos Negócios",
  description: "Todos os guias práticos de Inteligência Artificial para MEIs, lojistas e pequenos negócios brasileiros.",
};

const categorias = [
  { label: "Todos", slug: "" },
  { label: "Instagram", slug: "instagram" },
  { label: "WhatsApp", slug: "whatsapp" },
  { label: "Fotos de Produto", slug: "fotos-produto" },
  { label: "Atendimento", slug: "atendimento" },
  { label: "Marketing", slug: "marketing" },
  { label: "Gestão", slug: "gestao" },
  { label: "Vendas", slug: "vendas" },
];

export default function GuiasPage({ searchParams }: { searchParams: Promise<{ categoria?: string }> }) {
  const guias = getAllGuias();

  return (
    <>
      <div style={{ background: "linear-gradient(180deg, #0c0d14 0%, var(--bg) 100%)", padding: "3.5rem 1.25rem 2rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, marginBottom: "0.75rem" }}>
          Guias práticos de IA
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "1.05rem", maxWidth: 520, margin: "0 auto" }}>
          Aprenda a usar Inteligência Artificial no seu negócio com guias passo a passo em português.
        </p>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1.25rem" }}>
        {/* Filtros */}
        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          {categorias.map((c) => (
            <a key={c.slug} href={c.slug ? `/guias?categoria=${c.slug}` : "/guias"} style={{
              padding: "0.4rem 0.9rem",
              borderRadius: 20,
              fontSize: "0.85rem",
              fontWeight: 600,
              textDecoration: "none",
              background: "var(--card)",
              color: "var(--muted)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}>
              {c.label}
            </a>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
          {guias.map((g) => (
            <GuideCard key={g.slug} {...g} />
          ))}
        </div>

        {guias.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem", color: "var(--muted)" }}>
            Nenhum guia encontrado.
          </div>
        )}
      </div>
    </>
  );
}
