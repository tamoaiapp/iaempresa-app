import { getAllGuias, getGuiaBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import CTABanner from "@/components/CTABanner";
import GuideCard from "@/components/GuideCard";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

const categoriaLabels: Record<string, string> = {
  instagram: "Instagram",
  whatsapp: "WhatsApp",
  "fotos-produto": "Fotos de Produto",
  atendimento: "Atendimento",
  marketing: "Marketing",
  gestao: "Gestão",
  vendas: "Vendas",
};

const categoriaColors: Record<string, string> = {
  instagram: "#e1306c",
  whatsapp: "#25d366",
  "fotos-produto": "#f59e0b",
  atendimento: "#3b82f6",
  marketing: "#8b5cf6",
  gestao: "#06b6d4",
  vendas: "#16c784",
};

export async function generateStaticParams() {
  const guias = getAllGuias();
  return guias.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guia = getGuiaBySlug(slug);
  if (!guia) return {};
  return {
    title: guia.title,
    description: guia.description,
  };
}

export default async function GuiaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guia = getGuiaBySlug(slug);
  if (!guia) notFound();

  const todos = getAllGuias();
  const relacionados = todos.filter((g) => g.slug !== slug && g.categoria === guia.categoria).slice(0, 3);
  const color = categoriaColors[guia.categoria] || "#8b5cf6";
  const catLabel = categoriaLabels[guia.categoria] || guia.categoria;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1.25rem 5rem" }}>
      {/* Breadcrumb */}
      <nav style={{ fontSize: "0.85rem", color: "var(--dim)", marginBottom: "2rem", display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
        <Link href="/" style={{ color: "var(--dim)", textDecoration: "none" }}>Início</Link>
        <span>/</span>
        <Link href="/guias" style={{ color: "var(--dim)", textDecoration: "none" }}>Guias</Link>
        <span>/</span>
        <span style={{ color: "var(--muted)" }}>{guia.title}</span>
      </nav>

      {/* Header */}
      <header style={{ marginBottom: "2.5rem" }}>
        <span style={{
          display: "inline-block",
          background: color + "22",
          color: color,
          border: `1px solid ${color}44`,
          borderRadius: 20,
          padding: "0.25rem 0.75rem",
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          marginBottom: "1rem",
        }}>
          {catLabel}
        </span>

        <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 900, lineHeight: 1.2, marginBottom: "1rem", color: "var(--text)" }}>
          {guia.title}
        </h1>

        <p style={{ fontSize: "1.1rem", color: "var(--muted)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
          {guia.description}
        </p>

        {/* Meta boxes */}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <div style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 10, padding: "0.5rem 0.9rem", fontSize: "0.85rem", color: "#a78bfa", display: "flex", gap: "0.4rem", alignItems: "center" }}>
            <span>⏱</span> <strong>Tempo:</strong> {guia.tempo}
          </div>
          {guia.custo && (
            <div style={{ background: "rgba(22,199,132,0.08)", border: "1px solid rgba(22,199,132,0.2)", borderRadius: 10, padding: "0.5rem 0.9rem", fontSize: "0.85rem", color: "#16c784", display: "flex", gap: "0.4rem", alignItems: "center" }}>
              <span>💰</span> <strong>Custo:</strong> {guia.custo}
            </div>
          )}
          <div style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 10, padding: "0.5rem 0.9rem", fontSize: "0.85rem", color: guia.dificuldade === "iniciante" ? "#16c784" : "#f59e0b", display: "flex", gap: "0.4rem", alignItems: "center" }}>
            <span>●</span> {guia.dificuldade}
          </div>
        </div>
      </header>

      {/* Content */}
      <article className="prose">
        <MDXRemote source={guia.content} />
      </article>

      {/* CTA Banner */}
      {guia.cta && (
        <div style={{ marginTop: "2.5rem" }}>
          <CTABanner produto={guia.cta} />
        </div>
      )}

      {/* Relacionados */}
      {relacionados.length > 0 && (
        <section style={{ marginTop: "3rem", borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "2.5rem" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "1.25rem" }}>Guias relacionados</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
            {relacionados.map((g) => (
              <GuideCard key={g.slug} {...g} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
