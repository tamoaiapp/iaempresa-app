"use client";
import Image from "next/image";
import { useState } from "react";

const features = [
  {
    icon: "YT",
    title: "Busca vídeos no YouTube",
    desc: "Configure canais do YouTube e o PostMaster baixa, corta e converte automaticamente para o formato 9:16 de Reel.",
  },
  {
    icon: "AI",
    title: "Legenda gerada por IA local",
    desc: "Usa o Ollama rodando no seu próprio PC. Sem pagar API, sem limite de uso, sem dados saindo da sua máquina.",
  },
  {
    icon: "IG",
    title: "Posta no Instagram e TikTok",
    desc: "Publica o Reel com a legenda e hashtags automaticamente. Suporta múltiplas contas nas duas plataformas.",
  },
  {
    icon: "24h",
    title: "Agendamento flexível",
    desc: "Defina um intervalo fixo (ex: a cada 2h) ou uma janela de horário (ex: só das 08h às 22h).",
  },
  {
    icon: "#",
    title: "Filtros avançados de conteúdo",
    desc: "Filtre por duração mínima e máxima, palavras-chave obrigatórias ou bloqueadas, e pule vídeos já postados.",
  },
  {
    icon: "/",
    title: "Seus próprios vídeos também",
    desc: "Além do YouTube, você pode apontar uma pasta local com seus vídeos e o PostMaster posta um por um automaticamente.",
  },
];

const steps = [
  { n: "1", title: "Baixe e instale", desc: "Instale o PostMaster no seu PC com Windows. Funciona em qualquer máquina." },
  { n: "2", title: "Adicione sua conta", desc: "Conecte sua conta do Instagram e/ou TikTok. Uma janela de login abre — você entra normalmente." },
  { n: "3", title: "Configure a automação", desc: "Escolha de onde pegar o conteúdo, os filtros, o tipo de legenda e o horário de postagem." },
  { n: "4", title: "Clique em Iniciar", desc: "O PostMaster roda em segundo plano e posta automaticamente no intervalo configurado." },
];

const faqs = [
  {
    q: "Precisa de internet 24h rodando?",
    a: "Sim, para baixar os vídeos do YouTube e fazer upload no Instagram/TikTok. Mas o PC não precisa ser potente — qualquer notebook serve.",
  },
  {
    q: "A IA de legenda é paga?",
    a: "Não. Usa o Ollama, que é 100% gratuito e roda localmente no seu PC. Não tem limite de uso e não envia dados para nenhum servidor externo.",
  },
  {
    q: "Funciona no Mac ou Linux?",
    a: "Por enquanto apenas Windows. Versão Mac está planejada.",
  },
  {
    q: "Posso usar em várias contas ao mesmo tempo?",
    a: "Sim. Você pode criar uma automação para cada conta e todas rodam em paralelo.",
  },
  {
    q: "Os vídeos que ele posta são meus?",
    a: "O PostMaster republica vídeos de canais públicos do YouTube. Você é responsável por garantir que tem permissão para usar o conteúdo. Recomendamos usar canais que permitem republicação ou criar suas próprias automações com conteúdo original.",
  },
  {
    q: "E se minha conta for banida?",
    a: "O PostMaster posta de forma similar a um usuário humano, mas sempre há risco ao automatizar redes sociais. Recomendamos começar com intervalos maiores (2h+) e monitorar os primeiros dias.",
  },
];

async function handleCheckout(setLoading: (v: boolean) => void) {
  setLoading(true);
  try {
    const res = await fetch("/api/checkout/postmaster", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else alert("Erro ao iniciar pagamento. Tente novamente.");
  } catch {
    alert("Erro ao conectar. Tente novamente.");
  } finally {
    setLoading(false);
  }
}

export default function PostmasterPage() {
  const [loading, setLoading] = useState(false);
  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", fontFamily: "'Outfit', sans-serif", minHeight: "100vh" }}>

      {/* ── Nav minima ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(7,8,11,0.92)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "0 1.5rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 58,
      }}>
        <a href="/" style={{ textDecoration: "none", fontWeight: 800, fontSize: "1.05rem", color: "#eef2f9", letterSpacing: "-0.01em" }}>
          iaempresa<span style={{ color: "#8b5cf6" }}>.app</span>
        </a>
        <button onClick={() => handleCheckout(setLoading)} disabled={loading} style={{
          background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
          color: "#fff", padding: "0.45rem 1.25rem",
          borderRadius: 10, fontWeight: 700, fontSize: "0.875rem",
          border: "none", cursor: loading ? "wait" : "pointer",
        }}>
          {loading ? "Aguarde..." : "Comprar — R$ 97"}
        </button>
      </nav>

      {/* ── Hero 2 colunas ── */}
      <section style={{
        background: "linear-gradient(180deg, #0a0b14 0%, var(--bg) 100%)",
        padding: "5rem 1.5rem 4rem",
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3rem",
          alignItems: "center",
        }}>
          {/* Texto */}
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)",
              color: "#a78bfa", borderRadius: 20, padding: "0.35rem 1rem",
              fontSize: "0.85rem", fontWeight: 600, marginBottom: "1.75rem",
            }}>
              App Windows · sem mensalidade · IA gratuita e sem limites
            </div>

            <h1 style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 900, lineHeight: 1.1, marginBottom: "1.25rem",
            }}>
              Posta todo dia no{" "}
              <span style={{ background: "linear-gradient(135deg,#f58529,#dd2a7b,#8134af)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Instagram
              </span>{" "}
              e{" "}
              <span style={{ color: "#69c9d0" }}>TikTok</span>
              <br />sem gastar nada com IA
            </h1>

            <p style={{ fontSize: "1.05rem", color: "#8394b0", marginBottom: "2rem", lineHeight: 1.7 }}>
              Busca videos no YouTube, converte para Reel, gera a legenda com IA embarcada e posta automaticamente nos seus perfis — sem limite de posts, sem custo de API, sem mensalidade.
            </p>

            <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", marginBottom: "2rem" }}>
              <button onClick={() => handleCheckout(setLoading)} disabled={loading} style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                color: "#fff", padding: "0.875rem 1.75rem", borderRadius: 14,
                fontWeight: 700, fontSize: "1rem",
                boxShadow: "0 4px 24px rgba(99,102,241,0.4)",
                border: "none", cursor: loading ? "wait" : "pointer", opacity: loading ? 0.7 : 1,
              }}>
                {loading ? "Aguarde..." : "Comprar agora — R$ 97"}
              </button>
              <a href="#como-funciona" style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                color: "#eef2f9", padding: "0.875rem 1.75rem", borderRadius: 14,
                fontWeight: 600, fontSize: "1rem", textDecoration: "none",
              }}>
                Como funciona
              </a>
            </div>

            <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
              {["Sem mensalidade", "IA gratuita e sem limites", "Posts ilimitados", "Instagram + TikTok"].map(t => (
                <span key={t} style={{ color: "#8394b0", fontSize: "0.85rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <span style={{ color: "#16c784", fontWeight: 900 }}>+</span> {t}
                </span>
              ))}
            </div>
          </div>

          {/* Screenshot */}
          <div style={{ position: "relative" }}>
            <div style={{
              position: "absolute", inset: -1,
              background: "linear-gradient(135deg,rgba(99,102,241,0.4),rgba(168,85,247,0.2))",
              borderRadius: 18, filter: "blur(20px)", opacity: 0.6,
            }} />
            <div style={{
              position: "relative",
              border: "1px solid rgba(99,102,241,0.25)",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
            }}>
              <Image
                src="/postmaster-app.png"
                alt="PostMaster — interface do aplicativo"
                width={775}
                height={415}
                style={{ display: "block", width: "100%", height: "auto" }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ padding: "4rem 1.5rem", background: "var(--bg2)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 800, marginBottom: "0.75rem" }}>
            Tudo que voce precisa para crescer no automatico
          </h2>
          <p style={{ textAlign: "center", color: "#8394b0", marginBottom: "3rem", fontSize: "1.05rem" }}>
            Configure uma vez, ele posta para sempre.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
            {features.map((f) => (
              <div key={f.title} style={{
                background: "var(--card)", border: "1px solid var(--line)",
                borderRadius: 18, padding: "1.5rem",
              }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 44, height: 44, borderRadius: 10,
                  background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)",
                  fontWeight: 900, fontSize: "0.8rem", color: "#a78bfa",
                  marginBottom: "0.875rem", letterSpacing: "0.02em",
                }}>{f.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.5rem" }}>{f.title}</h3>
                <p style={{ color: "#8394b0", fontSize: "0.9rem", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Como funciona ── */}
      <section id="como-funciona" style={{ padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 800, marginBottom: "0.75rem" }}>
            Como funciona
          </h2>
          <p style={{ textAlign: "center", color: "#8394b0", marginBottom: "3.5rem" }}>
            Do zero ao primeiro Reel postado em menos de 10 minutos.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", position: "relative" }}>
            <div style={{ position: "absolute", left: 27, top: 48, bottom: 48, width: 2, background: "rgba(99,102,241,0.2)" }} />
            {steps.map((s) => (
              <div key={s.n} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: "linear-gradient(135deg,#6366f1,#a855f7)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 900, fontSize: "1.1rem", flexShrink: 0, color: "#fff",
                  boxShadow: "0 0 0 4px rgba(99,102,241,0.15)",
                  position: "relative", zIndex: 1,
                }}>
                  {s.n}
                </div>
                <div style={{ paddingTop: "0.85rem" }}>
                  <h3 style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.35rem" }}>{s.title}</h3>
                  <p style={{ color: "#8394b0", fontSize: "0.9rem", lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Requisitos ── */}
      <section style={{ padding: "3rem 1.5rem 4rem", background: "var(--bg2)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "2rem" }}>Requisitos do sistema</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", textAlign: "left" }}>
            {[
              ["Sistema", "Windows 10 ou 11"],
              ["RAM", "4 GB minimo (8 GB recomendado para IA)"],
              ["Conexao", "Internet (para baixar e postar)"],
              ["Ollama", "Gratuito — instalar separadamente"],
              ["yt-dlp", "Gratuito — instalar separadamente"],
              ["Espaco", "~500 MB para o app + downloads temporarios"],
            ].map(([label, text]) => (
              <div key={label} style={{
                background: "var(--card)", border: "1px solid var(--line)",
                borderRadius: 12, padding: "0.875rem 1rem",
                display: "flex", flexDirection: "column", gap: "0.2rem",
              }}>
                <span style={{ color: "#8394b0", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>
                <span style={{ fontSize: "0.9rem" }}>{text}</span>
              </div>
            ))}
          </div>
          <p style={{ color: "#8394b0", fontSize: "0.85rem", marginTop: "1.5rem", lineHeight: 1.6 }}>
            O guia de instalacao do Ollama e yt-dlp esta incluido na compra. Sao ferramentas gratuitas e faceis de instalar.
          </p>
        </div>
      </section>

      {/* ── Preco ── */}
      <section id="comprar" style={{ padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 800, marginBottom: "0.75rem" }}>
            Pagamento unico, seu para sempre
          </h2>
          <p style={{ color: "#8394b0", marginBottom: "2.5rem" }}>
            Sem mensalidade. Sem limite de uso. Uma vez so.
          </p>

          <div style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(168,85,247,0.08))",
            border: "1px solid rgba(99,102,241,0.3)",
            borderRadius: 22, padding: "2.5rem 2rem",
          }}>
            <div style={{ fontSize: "0.85rem", color: "#8394b0", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
              PostMaster
            </div>
            <div style={{ fontSize: "clamp(3rem,8vw,4.5rem)", fontWeight: 900, lineHeight: 1, marginBottom: "0.25rem" }}>
              R$ 97
            </div>
            <div style={{ color: "#8394b0", fontSize: "0.9rem", marginBottom: "2rem" }}>pagamento unico · sem mensalidade</div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", textAlign: "left", marginBottom: "2rem" }}>
              {[
                "App PostMaster para Windows",
                "Atualizacoes gratis por 1 ano",
                "Suporte por e-mail",
                "Guia de instalacao passo a passo",
                "Filtros avancados de conteudo",
                "Multiplas contas Instagram e TikTok",
                "IA local — sem custo de API",
              ].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.95rem" }}>
                  <span style={{ color: "#16c784", fontWeight: 700 }}>+</span> {item}
                </div>
              ))}
            </div>

            <button onClick={() => handleCheckout(setLoading)} disabled={loading} style={{
              display: "block", width: "100%",
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              color: "#fff", padding: "1rem",
              borderRadius: 14, fontWeight: 700, fontSize: "1.05rem",
              textAlign: "center", border: "none",
              boxShadow: "0 4px 24px rgba(99,102,241,0.4)",
              cursor: loading ? "wait" : "pointer", opacity: loading ? 0.7 : 1,
              marginBottom: "1rem",
            }}>
              {loading ? "Redirecionando para pagamento..." : "Comprar PostMaster — R$ 97"}
            </button>

            <p style={{ color: "#4e5c72", fontSize: "0.8rem" }}>
              Apos o pagamento voce recebe o link de download e as instrucoes de instalacao por e-mail em ate 10 minutos.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "3rem 1.5rem 5rem", background: "var(--bg2)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "1.8rem", fontWeight: 800, marginBottom: "2.5rem" }}>
            Duvidas frequentes
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {faqs.map((f) => (
              <div key={f.q} style={{
                background: "var(--card)", border: "1px solid var(--line)",
                borderRadius: 14, padding: "1.25rem 1.5rem",
              }}>
                <div style={{ fontWeight: 700, marginBottom: "0.5rem", fontSize: "0.975rem" }}>{f.q}</div>
                <div style={{ color: "#8394b0", fontSize: "0.9rem", lineHeight: 1.6 }}>{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section style={{ padding: "5rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.5rem)", fontWeight: 800, marginBottom: "1rem" }}>
            Pronto para postar no automatico?
          </h2>
          <p style={{ color: "#8394b0", marginBottom: "2rem", fontSize: "1.05rem" }}>
            Configure uma vez. O PostMaster cuida do resto.
          </p>
          <button onClick={() => handleCheckout(setLoading)} disabled={loading} style={{
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            color: "#fff", padding: "1rem 2.5rem",
            borderRadius: 14, fontWeight: 700, fontSize: "1.05rem",
            border: "none", cursor: loading ? "wait" : "pointer",
            boxShadow: "0 4px 24px rgba(99,102,241,0.4)",
            opacity: loading ? 0.7 : 1,
          }}>
            {loading ? "Aguarde..." : "Comprar PostMaster — R$ 97"}
          </button>
          <p style={{ color: "#4e5c72", fontSize: "0.8rem", marginTop: "1rem" }}>
            Duvidas? Fale com a gente:{" "}
            <a href="mailto:contato@iaempresa.app" style={{ color: "#8394b0" }}>contato@iaempresa.app</a>
          </p>
        </div>
      </section>

    </div>
  );
}
