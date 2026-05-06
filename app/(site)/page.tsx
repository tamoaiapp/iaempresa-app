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

const stats = [
  { num: "40", label: "ferramentas" },
  { num: "8", label: "categorias" },
  { num: "100%", label: "em português" },
];

const comoFunciona = [
  {
    num: "01",
    titulo: "Escolha sua ferramenta",
    desc: "40 ferramentas prontas para automatizar vendas, atendimento, marketing e gestão do seu negócio.",
  },
  {
    num: "02",
    titulo: "Assine e acesse agora",
    desc: "Com uma assinatura você acessa todas as 40 ferramentas online, sem instalar nada.",
  },
  {
    num: "03",
    titulo: "Seu negócio no piloto automático",
    desc: "Atendimento, cobranças, agendamentos e fidelização rodando sozinhos enquanto você foca no que importa.",
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
            <span>A plataforma do novo empreendedor</span>
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
              O novo jeito de<br />começar um negócio.
            </span>
          </h1>

          <p style={{
            fontSize: "1.15rem",
            color: "var(--muted)",
            lineHeight: 1.75,
            maxWidth: 560,
            margin: "0 auto 2.5rem",
          }}>
            40 ferramentas de IA para automatizar vendas, atendimento e gestão.
            <strong style={{ color: "var(--text)" }}> Monte seu negócio hoje</strong> e deixe a IA trabalhar por você.
          </p>

          <div style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/registro" style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff",
              padding: "0.9rem 2.2rem",
              borderRadius: 12,
              fontWeight: 700,
              fontSize: "1rem",
              textDecoration: "none",
              boxShadow: "0 0 32px rgba(99,102,241,0.35)",
            }}>
              Começar agora →
            </Link>
            <Link href="/guias" style={{
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
            {stats.map((s) => (
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

      {/* CTA — assinatura */}
      <section style={{ maxWidth: 700, margin: "0 auto", padding: "1rem 1.25rem 5rem" }}>
        <div style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.14), rgba(168,85,247,0.08))",
          border: "1px solid rgba(99,102,241,0.3)",
          borderRadius: 24,
          padding: "2.5rem 2rem",
          textAlign: "center",
          position: "relative",
        }}>
          <div style={{
            position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "#fff", fontSize: "0.72rem", fontWeight: 800,
            padding: "4px 16px", borderRadius: 999, letterSpacing: "0.08em", whiteSpace: "nowrap",
          }}>TUDO INCLUSO</div>

          <div style={{ fontSize: "2.8rem", fontWeight: 900, color: "#a78bfa", marginBottom: 4 }}>R$97</div>
          <div style={{ color: "var(--muted)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>/mês · cancele quando quiser</div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem", textAlign: "left", maxWidth: 420, margin: "0 auto 2rem" }}>
            {[
              "Acesso a todas as 40 ferramentas online",
              "Chatbot, agenda, CRM, cobranças, fidelidade e mais",
              "Sem instalar nada — funciona no navegador",
              "Atualizações automáticas incluídas",
              "Suporte em português",
            ].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "0.9rem" }}>
                <span style={{ color: "#16c784", flexShrink: 0, marginTop: 2 }}>✓</span>
                <span style={{ color: "var(--muted)" }}>{item}</span>
              </div>
            ))}
          </div>

          <Link href="/registro" style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "#fff",
            padding: "0.9rem 2.5rem",
            borderRadius: 12,
            fontWeight: 700,
            fontSize: "1rem",
            textDecoration: "none",
            boxShadow: "0 0 32px rgba(99,102,241,0.35)",
          }}>
            Criar conta e assinar →
          </Link>

          <div style={{ color: "var(--dim)", fontSize: "0.78rem", marginTop: "1rem" }}>
            Pagamento seguro via Stripe · Sem fidelidade
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
