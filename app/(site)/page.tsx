import Link from "next/link";
import { getAllGuias } from "@/lib/mdx";
import GuideCard from "@/components/GuideCard";
import NewsletterForm from "@/components/NewsletterForm";

const categorias = [
  { label: "WhatsApp com IA", slug: "whatsapp", emoji: "💬", descricao: "Atendimento e vendas automáticos" },
  { label: "Instagram com IA", slug: "instagram", emoji: "📱", descricao: "Posts, fotos e respostas automáticas" },
  { label: "Fotos de Produto", slug: "fotos-produto", emoji: "📸", descricao: "Fotos profissionais sem fotógrafo" },
  { label: "Atendimento", slug: "atendimento", emoji: "🤖", descricao: "Chatbots e respostas rápidas" },
  { label: "Marketing Digital", slug: "marketing", emoji: "🎯", descricao: "Conteúdo e anúncios com IA" },
  { label: "Vendas", slug: "vendas", emoji: "💰", descricao: "Precificação e propostas automáticas" },
];

const ferramentas = [
  { num: "40", label: "ferramentas" },
  { num: "R$0", label: "para começar" },
  { num: "100%", label: "em português" },
];

const comoFunciona = [
  {
    num: "01",
    titulo: "Escolha uma ferramenta",
    desc: "40 ferramentas para automatizar vendas, atendimento, marketing e gestão do seu negócio.",
  },
  {
    num: "02",
    titulo: "Rode grátis no seu PC",
    desc: "Baixe e instale sem pagar nada. Você tem controle total, funciona offline, sem mensalidade.",
  },
  {
    num: "03",
    titulo: "Ou acesse tudo online",
    desc: "Prefere sem instalação? Assine e use todas as 40 ferramentas direto no navegador por uma mensalidade.",
  },
];

export default function Home() {
  const guias = getAllGuias();
  const destaques = guias.filter((g) => g.destaque).slice(0, 6);
  const exibidos = destaques.length >= 3 ? destaques : guias.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section style={{
        background: "linear-gradient(180deg, #080910 0%, var(--bg) 100%)",
        padding: "5rem 1.25rem 4.5rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Glow */}
        <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)", width: 700, height: 350, background: "radial-gradient(ellipse, rgba(99,102,241,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", maxWidth: 780, margin: "0 auto" }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(99,102,241,0.12)",
            border: "1px solid rgba(99,102,241,0.3)",
            color: "#a78bfa",
            borderRadius: 20,
            padding: "0.35rem 1.1rem",
            fontSize: "0.82rem",
            fontWeight: 600,
            marginBottom: "1.75rem",
            letterSpacing: "0.4px",
          }}>
            <span>🚀</span>
            <span>40 ferramentas para o novo empreendedor</span>
          </div>

          <h1 style={{
            fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
            fontWeight: 900,
            lineHeight: 1.08,
            marginBottom: "1.5rem",
            letterSpacing: "-1px",
          }}>
            <span style={{
              background: "linear-gradient(135deg, #eef2f9 30%, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              O novo jeito de<br />empreender chegou.
            </span>
          </h1>

          <p style={{
            fontSize: "1.15rem",
            color: "var(--muted)",
            lineHeight: 1.75,
            maxWidth: 560,
            margin: "0 auto 2.5rem",
          }}>
            40 ferramentas de IA para automatizar seu negócio e ganhar mais dinheiro.
            <strong style={{ color: "var(--text)" }}> Começa grátis hoje</strong> — baixa no PC
            ou usa online.
          </p>

          <div style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/guias" style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff",
              padding: "0.9rem 2.2rem",
              borderRadius: 12,
              fontWeight: 700,
              fontSize: "1rem",
              textDecoration: "none",
              boxShadow: "0 0 32px rgba(99,102,241,0.35)",
            }}>
              Começar grátis →
            </Link>
            <Link href="/ferramentas" style={{
              background: "rgba(255,255,255,0.05)",
              color: "var(--text)",
              padding: "0.9rem 2.2rem",
              borderRadius: 12,
              fontWeight: 600,
              fontSize: "1rem",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.1)",
            }}>
              Ver ferramentas
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "3rem", justifyContent: "center", marginTop: "3.5rem", flexWrap: "wrap" }}>
            {ferramentas.map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{
                  fontSize: "2rem", fontWeight: 900,
                  background: "linear-gradient(135deg, #6366f1, #a855f7)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>{s.num}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--dim)", marginTop: "0.2rem", letterSpacing: "0.3px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "5rem 1.25rem 3rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.9rem", fontWeight: 900, marginBottom: "0.5rem" }}>Simples assim</h2>
          <p style={{ color: "var(--muted)", fontSize: "1rem" }}>Sem complicação. Sem precisar ser técnico.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
          {comoFunciona.map((item) => (
            <div key={item.num} style={{
              background: "var(--card)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 20,
              padding: "2rem 1.75rem",
            }}>
              <div style={{
                fontSize: "0.72rem", fontWeight: 800, letterSpacing: "2px",
                color: "#6366f1", marginBottom: "1rem",
              }}>{item.num}</div>
              <div style={{ fontWeight: 800, fontSize: "1.05rem", marginBottom: "0.6rem" }}>{item.titulo}</div>
              <div style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.65 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA gratuito vs pago */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "1rem 1.25rem 5rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.25rem",
        }}>
          {/* Grátis */}
          <div style={{
            background: "var(--card)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 20,
            padding: "2rem 1.75rem",
          }}>
            <div style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>💻</div>
            <div style={{ fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>Grátis no PC</div>
            <div style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              Baixe qualquer ferramenta e rode no seu computador. Sem mensalidade, sem limite de uso, você tem controle total.
            </div>
            <Link href="/guias" style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "var(--text)",
              padding: "0.7rem 1.5rem",
              borderRadius: 10,
              fontWeight: 600,
              fontSize: "0.9rem",
              textDecoration: "none",
            }}>
              Explorar ferramentas →
            </Link>
          </div>

          {/* Online */}
          <div style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(168,85,247,0.08))",
            border: "1px solid rgba(99,102,241,0.3)",
            borderRadius: 20,
            padding: "2rem 1.75rem",
            position: "relative",
          }}>
            <div style={{
              position: "absolute", top: -12, right: 20,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff", fontSize: "0.7rem", fontWeight: 800,
              padding: "3px 12px", borderRadius: 999, letterSpacing: "0.08em",
            }}>RECOMENDADO</div>
            <div style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>☁️</div>
            <div style={{ fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>Online — tudo incluso</div>
            <div style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              Acesse todas as 40 ferramentas direto no navegador. Sem instalar nada. Atualizações automáticas e suporte incluído.
            </div>
            <Link href="/ferramentas" style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff",
              padding: "0.7rem 1.5rem",
              borderRadius: 10,
              fontWeight: 700,
              fontSize: "0.9rem",
              textDecoration: "none",
            }}>
              Ver planos →
            </Link>
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.25rem 5rem" }}>
        <h2 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "0.5rem" }}>Por onde você quer começar?</h2>
        <p style={{ color: "var(--muted)", marginBottom: "2rem" }}>Escolha a área que mais vai impactar seu negócio agora.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))", gap: "1rem" }}>
          {categorias.map((c) => (
            <Link key={c.slug} href={`/guias?categoria=${c.slug}`} style={{
              background: "var(--card)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 18,
              padding: "1.25rem",
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}>
              <span style={{ fontSize: "1.75rem" }}>{c.emoji}</span>
              <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text)" }}>{c.label}</span>
              <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>{c.descricao}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Guias em destaque */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.25rem 5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <div>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "0.25rem" }}>Ferramentas em destaque</h2>
            <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>Comece por aqui — as mais usadas por quem já está lucrando com IA.</p>
          </div>
          <Link href="/guias" style={{ color: "#a78bfa", fontSize: "0.9rem", fontWeight: 600, textDecoration: "none" }}>Ver todas →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
          {exibidos.map((g) => (
            <GuideCard key={g.slug} {...g} />
          ))}
        </div>
      </section>

      {/* Newsletter — 40 dias */}
      <section style={{ maxWidth: 1100, margin: "0 auto 0", padding: "0 1.25rem 5rem" }}>
        <div style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.08))",
          border: "1px solid rgba(99,102,241,0.2)",
          borderRadius: 24,
          padding: "3.5rem 2rem",
          textAlign: "center",
        }}>
          <div style={{
            display: "inline-block",
            background: "rgba(99,102,241,0.15)",
            border: "1px solid rgba(99,102,241,0.3)",
            color: "#a78bfa",
            borderRadius: 20,
            padding: "0.3rem 1rem",
            fontSize: "0.8rem",
            fontWeight: 700,
            marginBottom: "1.25rem",
            letterSpacing: "0.5px",
          }}>
            📅 40 DIAS · 40 FERRAMENTAS
          </div>
          <h2 style={{ fontSize: "1.7rem", fontWeight: 900, marginBottom: "0.6rem" }}>
            1 ferramenta nova por dia, durante 40 dias
          </h2>
          <p style={{ color: "var(--muted)", marginBottom: "2rem", maxWidth: 500, margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Entre na lista e receba uma ferramenta de IA por dia para aplicar no seu negócio. Grátis, sem enrolação.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
