import Link from "next/link";
import { getAllGuias } from "@/lib/mdx";
import GuideCard from "@/components/GuideCard";
import ProductCard from "@/components/ProductCard";
import NewsletterForm from "@/components/NewsletterForm";

const categorias = [
  { label: "Instagram com IA", slug: "instagram", emoji: "📱", descricao: "Posts automáticos, fotos e respostas" },
  { label: "WhatsApp com IA", slug: "whatsapp", emoji: "💬", descricao: "Atendimento e fidelização automáticos" },
  { label: "Fotos de Produto", slug: "fotos-produto", emoji: "📸", descricao: "Fotos profissionais sem fotógrafo" },
  { label: "Atendimento", slug: "atendimento", emoji: "🤖", descricao: "Chatbots e respostas rápidas com IA" },
  { label: "Marketing Digital", slug: "marketing", emoji: "🎯", descricao: "Legendas, anúncios e conteúdo com IA" },
  { label: "Vendas", slug: "vendas", emoji: "💰", descricao: "Precificação e propostas com IA" },
];

const produtos = [
  { nome: "TamoWork", descricao: "Transforma fotos amadoras de produto em imagens profissionais com IA. Sem fotógrafo, sem estúdio.", href: "https://tamowork.com", cor: "#8b5cf6", emoji: "📸" },
  { nome: "BuscaFornecedor", descricao: "Encontre fornecedores confiáveis de atacado no Brasil por categoria, região e preço.", href: "https://buscafornecedor.app", cor: "#16c784", emoji: "🏪" },
  { nome: "FidelizaAI", descricao: "Mensagens automáticas personalizadas no WhatsApp que trazem o cliente de volta sem esforço.", href: "/ferramentas", cor: "#25d366", emoji: "💬", externo: false },
  { nome: "provador.shop", descricao: "Catálogo virtual para lojas de roupa. Seu cliente experimenta a peça online antes de comprar.", href: "/ferramentas", cor: "#f59e0b", emoji: "👕", externo: false },
];

export default function Home() {
  const guias = getAllGuias();
  const destaques = guias.filter((g) => g.destaque).slice(0, 6);
  const exibidos = destaques.length >= 3 ? destaques : guias.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section style={{
        background: "linear-gradient(180deg, #0c0d14 0%, var(--bg) 100%)",
        padding: "5rem 1.25rem 4rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600, height: 300, background: "radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>
          <div style={{
            display: "inline-block",
            background: "rgba(99,102,241,0.12)",
            border: "1px solid rgba(99,102,241,0.3)",
            color: "#a78bfa",
            borderRadius: 20,
            padding: "0.35rem 1rem",
            fontSize: "0.85rem",
            fontWeight: 600,
            marginBottom: "1.5rem",
            letterSpacing: "0.5px",
          }}>
            ✨ {guias.length} guias práticos para o seu negócio
          </div>

          <h1 style={{
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: "1.5rem",
            background: "linear-gradient(135deg, #eef2f9 40%, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            IA para o seu negócio.<br />Sem complicação.
          </h1>

          <p style={{ fontSize: "1.15rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: 560, margin: "0 auto 2.5rem" }}>
            Guias passo a passo para MEIs, lojistas e pequenos negócios aprenderem a usar Inteligência Artificial — sem precisar ser técnico.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/guias" style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff",
              padding: "0.85rem 2rem",
              borderRadius: 12,
              fontWeight: 700,
              fontSize: "1rem",
              textDecoration: "none",
            }}>
              Ver todos os guias →
            </Link>
            <Link href="/ferramentas" style={{
              background: "rgba(255,255,255,0.05)",
              color: "var(--text)",
              padding: "0.85rem 2rem",
              borderRadius: 12,
              fontWeight: 600,
              fontSize: "1rem",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.1)",
            }}>
              Nossos produtos
            </Link>
          </div>

          <div style={{ display: "flex", gap: "2.5rem", justifyContent: "center", marginTop: "3rem", flexWrap: "wrap" }}>
            {[
              { num: `${guias.length}+`, label: "Guias práticos" },
              { num: "R$0", label: "Para começar" },
              { num: "100%", label: "Em português" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.75rem", fontWeight: 900, background: "linear-gradient(135deg, #6366f1, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{s.num}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--dim)", marginTop: "0.2rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 1.25rem 2rem" }}>
        <h2 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "0.5rem" }}>O que você quer aprender?</h2>
        <p style={{ color: "var(--muted)", marginBottom: "2rem" }}>Escolha uma categoria e comece pelo que faz mais sentido pro seu negócio.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1rem" }}>
          {categorias.map((c) => (
            <Link key={c.slug} href={`/guias?categoria=${c.slug}`} style={{
              background: "var(--card)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "var(--radius-lg)",
              padding: "1.25rem",
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              transition: "border-color 0.2s",
            }}>
              <span style={{ fontSize: "1.75rem" }}>{c.emoji}</span>
              <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text)" }}>{c.label}</span>
              <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>{c.descricao}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Guias em destaque */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1.25rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800 }}>Guias em destaque</h2>
          <Link href="/guias" style={{ color: "#a78bfa", fontSize: "0.9rem", fontWeight: 600, textDecoration: "none" }}>Ver todos →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
          {exibidos.map((g) => (
            <GuideCard key={g.slug} {...g} />
          ))}
        </div>
      </section>

      {/* Nossos produtos */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 1.25rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: "0.5rem" }}>Nossos produtos</h2>
          <p style={{ color: "var(--muted)" }}>Ferramentas feitas para o negócio brasileiro.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" }}>
          {produtos.map((p) => (
            <ProductCard key={p.nome} {...p} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ maxWidth: 1200, margin: "2rem auto 0", padding: "0 1.25rem 4rem" }}>
        <div style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.08))",
          border: "1px solid rgba(99,102,241,0.2)",
          borderRadius: 24,
          padding: "3rem 2rem",
          textAlign: "center",
        }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>📬</div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "0.5rem" }}>1 dica de IA por semana</h2>
          <p style={{ color: "var(--muted)", marginBottom: "2rem", maxWidth: 480, margin: "0 auto 2rem" }}>
            Toda semana uma dica prática para aplicar IA no seu negócio. Sem enrolação.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
