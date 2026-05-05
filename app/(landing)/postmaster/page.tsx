"use client";
import Image from "next/image";
import { useState } from "react";

const features = [
  {
    platform: "youtube",
    color: "#ff0000",
    bg: "rgba(255,0,0,0.08)",
    border: "rgba(255,0,0,0.2)",
    logo: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="7" fill="#FF0000"/>
        <path d="M21.5 9.5s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.4 6.4 14 6.4 14 6.4s-2.4 0-4.7.2c-.4.1-1.2.1-2 .9-.6.6-.8 2-.8 2S6.3 11.1 6.3 12.6v1.4c0 1.5.2 3 .2 3s.2 1.4.8 2c.8.8 1.8.7 2.3.8C11 20 14 20 14 20s2.4 0 4.7-.2c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.5.2-3v-1.4c0-1.5-.2-3-.2-3zm-8.8 6v-5.2l5.4 2.6-5.4 2.6z" fill="white"/>
      </svg>
    ),
    title: "Busca vídeos no YouTube automaticamente",
    desc: "Cole o link do canal — o PostMaster encontra, baixa e converte para vertical 9:16 sem você tocar em nada. Roda 24h.",
  },
  {
    platform: "instagram",
    color: "#e1306c",
    bg: "rgba(225,48,108,0.08)",
    border: "rgba(225,48,108,0.2)",
    logo: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="7" fill="url(#ig)"/>
        <defs>
          <linearGradient id="ig" x1="0" y1="28" x2="28" y2="0">
            <stop stopColor="#f9a825"/><stop offset="0.4" stopColor="#e1306c"/><stop offset="1" stopColor="#833ab4"/>
          </linearGradient>
        </defs>
        <rect x="7" y="7" width="14" height="14" rx="4" stroke="white" strokeWidth="1.8" fill="none"/>
        <circle cx="14" cy="14" r="3.5" stroke="white" strokeWidth="1.8" fill="none"/>
        <circle cx="18.2" cy="9.8" r="1" fill="white"/>
      </svg>
    ),
    title: "Posta Reels no Instagram sozinho",
    desc: "Conecta sua conta uma vez. O app abre, faz o upload, coloca a legenda e publica — tudo headless, sem abrir tela.",
  },
  {
    platform: "tiktok",
    color: "#00f2ea",
    bg: "rgba(0,242,234,0.06)",
    border: "rgba(0,242,234,0.2)",
    logo: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="7" fill="#010101"/>
        <path d="M19.5 7h-2.8v9.4a2.4 2.4 0 0 1-2.4 2.3 2.4 2.4 0 0 1-2.4-2.3 2.4 2.4 0 0 1 2.4-2.3c.2 0 .5 0 .7.1V11a5.2 5.2 0 0 0-.7 0 5.2 5.2 0 0 0-5.2 5.2 5.2 5.2 0 0 0 5.2 5.2 5.2 5.2 0 0 0 5.2-5.2V11.3a7 7 0 0 0 4 1.2V9.7a4.2 4.2 0 0 1-4-2.7z" fill="white"/>
      </svg>
    ),
    title: "Posta no TikTok em múltiplas contas",
    desc: "Várias contas TikTok em paralelo, cada uma com seu canal e ritmo. Ele faz o upload e publica com legenda gerada por IA.",
  },
  {
    platform: "ia",
    color: "#a855f7",
    bg: "rgba(168,85,247,0.08)",
    border: "rgba(168,85,247,0.2)",
    logo: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="7" fill="url(#ia)"/>
        <defs><linearGradient id="ia" x1="0" y1="0" x2="28" y2="28"><stop stopColor="#6366f1"/><stop offset="1" stopColor="#a855f7"/></linearGradient></defs>
        <text x="6" y="20" fontSize="14" fontWeight="800" fill="white" fontFamily="monospace">IA</text>
      </svg>
    ),
    title: "Legenda com IA embutida — sem pagar API",
    desc: "IA local gera legenda com hashtags para cada vídeo. Sem ChatGPT, sem mensalidade, sem limite. Funciona offline.",
  },
  {
    platform: "schedule",
    color: "#16c784",
    bg: "rgba(22,199,132,0.08)",
    border: "rgba(22,199,132,0.2)",
    logo: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="7" fill="rgba(22,199,132,0.15)"/>
        <circle cx="14" cy="14" r="7" stroke="#16c784" strokeWidth="2" fill="none"/>
        <path d="M14 9v5l3 3" stroke="#16c784" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Posta no horário certo, todo dia",
    desc: "Defina uma janela (ex: 08h–22h) ou intervalo fixo. Ele posta na hora certa todos os dias — você não precisa fazer nada.",
  },
  {
    platform: "filter",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.2)",
    logo: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="7" fill="rgba(245,158,11,0.15)"/>
        <path d="M7 9h14M10 14h8M13 19h2" stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Filtra e nunca repete o mesmo vídeo",
    desc: "Duração mínima/máxima, palavras bloqueadas, pula vídeos já postados. Só sai conteúdo que você aprovaria.",
  },
];

const steps = [
  { n: "1", title: "Instala em 2 minutos", desc: "Baixa, instala no Windows e abre. Sem configuração técnica. Funciona em qualquer PC ou notebook." },
  { n: "2", title: "Conecta sua conta", desc: "Entra no Instagram ou TikTok normalmente pela janela de login. Sessão fica salva — não precisa entrar de novo." },
  { n: "3", title: "Configura o conteúdo", desc: "Cola o link do canal do YouTube, define o horário e clica em salvar. Pronto — configurou." },
  { n: "4", title: "Clica em Iniciar e esquece", desc: "O PostMaster roda em segundo plano e posta sozinho. Você pode fechar a janela — ele continua." },
];

const faqs = [
  {
    q: "Precisa deixar o PC ligado?",
    a: "Sim, o PC precisa estar ligado e com internet para baixar e postar. Mas não precisa ser potente — qualquer notebook serve.",
  },
  {
    q: "A IA de legenda é paga?",
    a: "Não. A IA vem embutida no app — sem Ollama, sem ChatGPT, sem custo extra. Gera legendas ilimitadas sem mensalidade.",
  },
  {
    q: "Funciona no Mac ou Linux?",
    a: "Por enquanto apenas Windows 10 e 11. Versão Mac está no roadmap.",
  },
  {
    q: "Posso usar em várias contas ao mesmo tempo?",
    a: "Sim. Crie uma automação para cada conta e todas rodam em paralelo, cada uma no seu próprio ritmo.",
  },
  {
    q: "E se não funcionar para mim?",
    a: "7 dias de garantia total. Se não gostar por qualquer motivo, manda um e-mail e devolvo 100% do valor. Sem burocracia.",
  },
  {
    q: "E se minha conta for banida?",
    a: "O PostMaster posta como um humano — com intervalos naturais. Recomendamos começar com 2h+ de intervalo e monitorar os primeiros dias.",
  },
];

const BTN = {
  background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
  color: "#fff", borderRadius: 14, fontWeight: 800,
  border: "none", cursor: "pointer",
  boxShadow: "0 4px 32px rgba(99,102,241,0.45)",
}

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
  const buy = () => handleCheckout(setLoading);

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", fontFamily: "'Outfit', sans-serif", minHeight: "100vh" }}>

      {/* ── Nav ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(7,8,11,0.93)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "0 1.5rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 58,
      }}>
        <a href="/" style={{ textDecoration: "none", fontWeight: 800, fontSize: "1.05rem", color: "#eef2f9" }}>
          iaempresa<span style={{ color: "#8b5cf6" }}>.app</span>
        </a>
        <button onClick={buy} disabled={loading} style={{
          ...BTN, padding: "0.45rem 1.25rem", fontSize: "0.875rem",
          cursor: loading ? "wait" : "pointer",
        }}>
          {loading ? "..." : "Quero agora — R$ 197"}
        </button>
      </nav>

      {/* ── Faixa de urgência ── */}
      <div style={{
        background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
        textAlign: "center", padding: "0.6rem 1rem",
        fontSize: "0.875rem", fontWeight: 600, color: "#fff",
        letterSpacing: "0.01em",
      }}>
        🔥 Preço de lançamento: <strong>R$ 197</strong> — sobe para R$ 597 em breve
      </div>

      {/* ── Hero ── */}
      <section style={{ background: "linear-gradient(180deg,#0a0b14 0%,var(--bg) 100%)", padding: "4.5rem 1.5rem 4rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "rgba(22,199,132,0.1)", border: "1px solid rgba(22,199,132,0.25)",
              color: "#16c784", borderRadius: 20, padding: "0.35rem 1rem",
              fontSize: "0.82rem", fontWeight: 700,
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#16c784", display: "inline-block" }} />
              Bot ativo agora em +6 contas · 963 posts feitos hoje
            </div>
          </div>

          <h1 style={{
            textAlign: "center",
            fontSize: "clamp(2.4rem,5vw,4.2rem)",
            fontWeight: 900, lineHeight: 1.07, marginBottom: "1.1rem",
          }}>
            Seu perfil postando sozinho no{" "}
            <span style={{ background: "linear-gradient(135deg,#f58529,#dd2a7b,#8134af)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Instagram
            </span>{" "}
            e{" "}
            <span style={{ color: "#69c9d0" }}>TikTok</span>
            <br />enquanto você faz outra coisa
          </h1>

          <p style={{ textAlign: "center", fontSize: "1.1rem", color: "#8394b0", lineHeight: 1.7, maxWidth: 600, margin: "0 auto 2rem" }}>
            Configura uma vez, ele posta para sempre. YouTube → Reel → legenda com IA → publicado. Tudo automático, sem mensalidade.
          </p>

          {/* CTA principal */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", marginBottom: "1.75rem" }}>
            <button onClick={buy} disabled={loading} style={{
              ...BTN,
              padding: "1.05rem 2.5rem", fontSize: "1.1rem",
              cursor: loading ? "wait" : "pointer", opacity: loading ? 0.7 : 1,
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
            }}>
              {loading ? "Redirecionando..." : "🚀 Quero automatizar meu perfil agora"}
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", fontSize: "0.82rem", color: "#4e5c72" }}>
              <span><s style={{ color: "#4e5c72" }}>R$ 597</s> <strong style={{ color: "#16c784" }}>R$ 197</strong> — pagamento único</span>
              <span>·</span>
              <span>🔒 7 dias de garantia</span>
              <span>·</span>
              <a href="#como-funciona" style={{ color: "#8394b0", textDecoration: "none" }}>Ver como funciona ↓</a>
            </div>
          </div>

          {/* Trust badges */}
          <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "3.5rem" }}>
            {["Sem mensalidade", "IA grátis ilimitada", "Posts ilimitados", "Instagram + TikTok", "Múltiplas contas"].map(t => (
              <span key={t} style={{ color: "#8394b0", fontSize: "0.82rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <span style={{ color: "#16c784" }}>✓</span> {t}
              </span>
            ))}
          </div>

          {/* Screenshot */}
          <div style={{ position: "relative" }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at 50% 0%,rgba(99,102,241,0.3) 0%,transparent 65%)",
              borderRadius: 20, pointerEvents: "none",
            }} />
            <div style={{
              background: "#161b27", border: "1px solid rgba(255,255,255,0.07)",
              borderBottom: "none", borderRadius: "16px 16px 0 0",
              padding: "0.55rem 1rem", display: "flex", alignItems: "center", gap: "0.5rem",
            }}>
              {["#ff5f57","#febc2e","#28c840"].map(c => (
                <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, display: "inline-block" }} />
              ))}
              <span style={{ flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: 6, padding: "0.18rem 0.75rem", fontSize: "0.74rem", color: "#4e5c72", marginLeft: "0.5rem" }}>
                PostMaster — rodando agora
              </span>
            </div>
            <div style={{ border: "1px solid rgba(99,102,241,0.18)", borderTop: "none", borderRadius: "0 0 16px 16px", overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }}>
              <Image src="/postmaster-app.png" alt="PostMaster — dashboard" width={1100} height={580} style={{ display: "block", width: "100%", height: "auto" }} priority />
            </div>
            <div style={{
              position: "absolute", bottom: 20, right: 20,
              background: "rgba(10,12,18,0.95)", backdropFilter: "blur(12px)",
              border: "1px solid rgba(22,199,132,0.3)", borderRadius: 14,
              padding: "0.75rem 1.25rem", display: "flex", gap: "1.5rem",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}>
              {[["6","contas ativas"],["963","posts hoje"],["R$ 0","custo de IA"]].map(([n,l]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#16c784", lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: "0.68rem", color: "#8394b0", marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ padding: "4rem 1.5rem", background: "var(--bg2)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 800, marginBottom: "0.6rem" }}>
            Tudo que você precisa para crescer no automático
          </h2>
          <p style={{ textAlign: "center", color: "#8394b0", marginBottom: "3rem", fontSize: "1rem" }}>
            Configure uma vez — ele trabalha para você enquanto você dorme.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.1rem" }}>
            {features.map((f) => (
              <div key={f.title} style={{
                background: f.bg,
                border: `1px solid ${f.border}`,
                borderRadius: 18, padding: "1.5rem",
              }}>
                <div style={{ marginBottom: "0.9rem" }}>{f.logo}</div>
                <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.4rem", color: f.color }}>{f.title}</h3>
                <p style={{ color: "#8394b0", fontSize: "0.88rem", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Como funciona ── */}
      <section id="como-funciona" style={{ padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 740, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 800, marginBottom: "0.6rem" }}>
            Do zero ao primeiro Reel postado em 10 minutos
          </h2>
          <p style={{ textAlign: "center", color: "#8394b0", marginBottom: "3.5rem" }}>Simples assim.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", position: "relative" }}>
            <div style={{ position: "absolute", left: 27, top: 48, bottom: 48, width: 2, background: "rgba(99,102,241,0.2)" }} />
            {steps.map((s) => (
              <div key={s.n} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: "linear-gradient(135deg,#6366f1,#a855f7)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 900, fontSize: "1.1rem", flexShrink: 0, color: "#fff",
                  boxShadow: "0 0 0 4px rgba(99,102,241,0.15)", position: "relative", zIndex: 1,
                }}>{s.n}</div>
                <div style={{ paddingTop: "0.85rem" }}>
                  <h3 style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.35rem" }}>{s.title}</h3>
                  <p style={{ color: "#8394b0", fontSize: "0.9rem", lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <button onClick={buy} disabled={loading} style={{
              ...BTN, padding: "0.95rem 2.25rem", fontSize: "1rem",
              cursor: loading ? "wait" : "pointer", opacity: loading ? 0.7 : 1,
            }}>
              {loading ? "Aguarde..." : "Começar agora por R$ 197"}
            </button>
          </div>
        </div>
      </section>

      {/* ── Preço ── */}
      <section id="comprar" style={{ padding: "5rem 1.5rem", background: "var(--bg2)" }}>
        <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            display: "inline-block", background: "rgba(99,102,241,0.15)",
            border: "1px solid rgba(99,102,241,0.3)", color: "#a78bfa",
            borderRadius: 20, padding: "0.3rem 1rem", fontSize: "0.82rem",
            fontWeight: 700, marginBottom: "1.25rem",
          }}>
            🔥 Oferta de lançamento — tempo limitado
          </div>
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 800, marginBottom: "0.5rem" }}>
            Pagamento único, seu para sempre
          </h2>
          <p style={{ color: "#8394b0", marginBottom: "2rem" }}>Sem mensalidade. Sem limite. Paga uma vez e usa para sempre.</p>

          <div style={{
            background: "linear-gradient(135deg,rgba(99,102,241,0.1),rgba(168,85,247,0.06))",
            border: "1px solid rgba(99,102,241,0.3)", borderRadius: 22, padding: "2.5rem 2rem",
          }}>
            {/* Preço com ancoragem */}
            <div style={{ marginBottom: "0.3rem" }}>
              <span style={{ fontSize: "1rem", color: "#4e5c72", textDecoration: "line-through", marginRight: "0.5rem" }}>R$ 597</span>
              <span style={{ fontSize: "0.82rem", background: "rgba(22,199,132,0.15)", color: "#16c784", borderRadius: 6, padding: "0.15rem 0.5rem", fontWeight: 700 }}>-50%</span>
            </div>
            <div style={{ fontSize: "clamp(3rem,8vw,4.5rem)", fontWeight: 900, lineHeight: 1, color: "#eef2f9" }}>
              R$ 197
            </div>
            <div style={{ color: "#8394b0", fontSize: "0.85rem", marginBottom: "2rem" }}>pagamento único · sem mensalidade · para sempre</div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", textAlign: "left", marginBottom: "2rem" }}>
              {[
                "✓  App PostMaster para Windows",
                "✓  IA de legenda embutida — sem custo extra",
                "✓  Posts ilimitados no Instagram e TikTok",
                "✓  Múltiplas contas em paralelo",
                "✓  Atualizações grátis por 1 ano",
                "✓  Guia de instalação passo a passo",
                "✓  Suporte por e-mail",
              ].map(item => (
                <div key={item} style={{ fontSize: "0.93rem", color: "#c8d6f0" }}>{item}</div>
              ))}
            </div>

            <button onClick={buy} disabled={loading} style={{
              ...BTN, display: "block", width: "100%",
              padding: "1.1rem", fontSize: "1.05rem",
              cursor: loading ? "wait" : "pointer", opacity: loading ? 0.7 : 1,
              marginBottom: "1rem",
            }}>
              {loading ? "Redirecionando..." : "🚀 Quero automatizar meu perfil — R$ 197"}
            </button>

            {/* Garantia */}
            <div style={{
              display: "flex", alignItems: "center", gap: "0.6rem",
              background: "rgba(22,199,132,0.08)", border: "1px solid rgba(22,199,132,0.2)",
              borderRadius: 10, padding: "0.75rem 1rem", marginBottom: "1rem", textAlign: "left",
            }}>
              <span style={{ fontSize: "1.5rem" }}>🛡️</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#16c784" }}>7 dias de garantia total</div>
                <div style={{ fontSize: "0.8rem", color: "#8394b0" }}>Não gostou? Devolvo 100% do valor. Sem perguntas.</div>
              </div>
            </div>

            <p style={{ color: "#4e5c72", fontSize: "0.78rem" }}>
              Após o pagamento você recebe o link de download por e-mail em até 10 minutos.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "1.8rem", fontWeight: 800, marginBottom: "2.5rem" }}>
            Dúvidas frequentes
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {faqs.map((f) => (
              <div key={f.q} style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: 14, padding: "1.25rem 1.5rem" }}>
                <div style={{ fontWeight: 700, marginBottom: "0.4rem", fontSize: "0.975rem" }}>{f.q}</div>
                <div style={{ color: "#8394b0", fontSize: "0.88rem", lineHeight: 1.65 }}>{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--bg2)", textAlign: "center" }}>
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>⏰</div>
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.5rem)", fontWeight: 900, marginBottom: "0.75rem" }}>
            Ainda postando na mão?
          </h2>
          <p style={{ color: "#8394b0", marginBottom: "0.5rem", fontSize: "1rem", lineHeight: 1.7 }}>
            Cada dia sem automatizar é um dia que seus concorrentes estão postando enquanto você não está.
          </p>
          <p style={{ color: "#8394b0", marginBottom: "2rem", fontSize: "1rem" }}>
            Configure o PostMaster hoje. Em 10 minutos seu perfil já está no piloto automático.
          </p>
          <button onClick={buy} disabled={loading} style={{
            ...BTN, padding: "1.1rem 2.5rem", fontSize: "1.1rem",
            cursor: loading ? "wait" : "pointer", opacity: loading ? 0.7 : 1,
            display: "inline-block",
          }}>
            {loading ? "Aguarde..." : "🚀 Quero automatizar agora — R$ 197"}
          </button>
          <div style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#4e5c72" }}>
            <s>R$ 597</s> → <strong style={{ color: "#eef2f9" }}>R$ 197</strong> · 🛡️ 7 dias de garantia · pagamento único
          </div>
          <p style={{ color: "#4e5c72", fontSize: "0.78rem", marginTop: "0.75rem" }}>
            Dúvidas?{" "}
            <a href="mailto:contato@iaempresa.app" style={{ color: "#8394b0" }}>contato@iaempresa.app</a>
          </p>
        </div>
      </section>

    </div>
  );
}
