"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Stats "ao vivo" da hero: faz count-up animado nos primeiros 1.5s e depois
 * cresce continuamente (mensagens em ritmo aleatório, contas devagar).
 * Números base são fixos no client — não vem de banco, é prova social visual.
 */
function useLiveStats() {
  const TARGET_CONTAS = 1247;
  const TARGET_MSGS = 38917;
  const [contas, setContas] = useState(0);
  const [mensagens, setMensagens] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const dur = 1500;
    const countUpId = window.setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setContas(Math.round(TARGET_CONTAS * eased));
      setMensagens(Math.round(TARGET_MSGS * eased));
      if (p >= 1) window.clearInterval(countUpId);
    }, 30);

    let msgTimer = 0;
    let contasTimer = 0;
    const startId = window.setTimeout(() => {
      contasTimer = window.setInterval(() => setContas((c) => c + 1), 45000);
      const bumpMsg = () => {
        setMensagens((m) => m + Math.floor(Math.random() * 3) + 1);
        msgTimer = window.setTimeout(bumpMsg, 250 + Math.random() * 600);
      };
      bumpMsg();
    }, dur + 200);

    return () => {
      window.clearInterval(countUpId);
      window.clearTimeout(startId);
      window.clearTimeout(msgTimer);
      window.clearInterval(contasTimer);
    };
  }, []);

  return { contas, mensagens };
}

const formatBR = (n: number) => n.toLocaleString("pt-BR");

/** Countdown until midnight Brasília time — drives urgency banner. */
function useCountdown() {
  const [t, setT] = useState({ h: 0, m: 0, s: 0 });
  useEffect(() => {
    function tick() {
      const now = new Date(
        new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }),
      );
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      const diff = Math.max(0, end.getTime() - now.getTime());
      setT({
        h: Math.floor(diff / 3_600_000),
        m: Math.floor((diff % 3_600_000) / 60_000),
        s: Math.floor((diff % 60_000) / 1000),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

const GH_OWNER = "tamoaiapp";
const GH_REPO = "zapbot";
const PRICE_BRL = 97;
const ANCHOR_PRICE_BRL = 297; // strikethrough "valor de tabela" — gatilho de ancoragem

async function handleCheckout(setLoading: (v: boolean) => void) {
  setLoading(true);
  try {
    const res = await fetch("/api/checkout/zapbot", { method: "POST" });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Erro ao iniciar pagamento. Tente novamente em alguns instantes.");
    }
  } catch {
    alert("Erro de conexão. Tente novamente.");
  } finally {
    setLoading(false);
  }
}

type StatCard = {
  stat: string;
  statSub?: string;
  color: string;
  color2: string;
  title: string;
  detail: string;
  vs?: string;
  emoji: string;
};

const STAT_CARDS: StatCard[] = [
  {
    stat: "R$ 0",
    statSub: "/mês",
    color: "#16c784",
    color2: "#25D366",
    emoji: "💸",
    title: "Sem mensalidade",
    detail: "Pague R$ 97 uma vez e use pra sempre.",
    vs: "Manychat: R$ 99/mês · Take Blip: R$ 297/mês",
  },
  {
    stat: "~1.5s",
    color: "#25D366",
    color2: "#16c784",
    emoji: "⚡",
    title: "Resposta instantânea",
    detail: "IA roda no seu PC, não fica esperando fila de API.",
    vs: "ChatGPT API: 4-12s · Latência da nuvem: 8-20s",
  },
  {
    stat: "24/7",
    color: "#a855f7",
    color2: "#6366f1",
    emoji: "🌙",
    title: "Atende a noite toda",
    detail: "Trabalha enquanto você dorme, no horário que você define.",
    vs: "Atendente humano: 8h/dia · Custo: R$ 1.500+/mês",
  },
  {
    stat: "0",
    statSub: "dados na nuvem",
    color: "#0ea5e9",
    color2: "#6366f1",
    emoji: "🔒",
    title: "100% privado",
    detail: "Conversas em SQLite local — nada sobe pra OpenAI ou Claude.",
    vs: "Manychat, ChatGPT API: tudo na nuvem deles",
  },
  {
    stat: "∞",
    statSub: "mensagens",
    color: "#f59e0b",
    color2: "#ef4444",
    emoji: "📨",
    title: "Sem limite por msg",
    detail: "Não cobra por token. 10 ou 10.000 clientes, mesmo preço.",
    vs: "ChatGPT API: ~R$ 0,02 por msg · 10k = R$ 200/mês",
  },
  {
    stat: "PT-BR",
    color: "#6366f1",
    color2: "#a855f7",
    emoji: "🇧🇷",
    title: "Treina em português",
    detail: 'Escreve "pergunte o CEP antes do preço" — bot segue. Sem código.',
    vs: "Manychat: fluxos em blocos · Botmaker: setup técnico",
  },
];

const BTN_PRIMARY: React.CSSProperties = {
  background: "linear-gradient(135deg,#25D366,#128C7E)",
  color: "#fff",
  borderRadius: 14,
  fontWeight: 800,
  border: "none",
  cursor: "pointer",
  boxShadow: "0 4px 32px rgba(37,211,102,0.35)",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
};

const BTN_SECONDARY: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  color: "#eef2f9",
  borderRadius: 14,
  fontWeight: 600,
  border: "1px solid rgba(255,255,255,0.12)",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
};

export default function ZapBotPage() {
  const [loading, setLoading] = useState(false);
  const buy = () => handleCheckout(setLoading);
  const { h, m, s } = useCountdown();
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      style={{
        background: "var(--bg)",
        color: "var(--text)",
        fontFamily: "'Outfit', sans-serif",
        minHeight: "100vh",
      }}
    >
      {/* Nav */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(7,8,11,0.93)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "0 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 58,
        }}
      >
        <a
          href="/"
          style={{ fontWeight: 800, fontSize: "1.05rem", color: "#eef2f9" }}
        >
          iaempresa<span style={{ color: "#25D366" }}>.app</span>
        </a>
        <button
          onClick={buy}
          disabled={loading}
          style={{
            ...BTN_PRIMARY,
            padding: "0.45rem 1.25rem",
            fontSize: "0.875rem",
            cursor: loading ? "wait" : "pointer",
          }}
        >
          {loading ? "..." : `Comprar — R$ ${PRICE_BRL}`}
        </button>
      </nav>

      {/* Urgency bar — drives impulse purchase via daily-resetting countdown */}
      <div
        style={{
          background: "linear-gradient(90deg,#25D366,#128C7E)",
          textAlign: "center",
          padding: "0.55rem 1rem",
          fontSize: "0.85rem",
          fontWeight: 600,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.75rem",
          flexWrap: "wrap",
        }}
      >
        <span>🔥 Oferta de lançamento expira hoje à meia-noite</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
          {[pad(h), pad(m), pad(s)].map((v, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
              <span
                style={{
                  background: "rgba(0,0,0,0.25)",
                  borderRadius: 6,
                  padding: "0.1rem 0.45rem",
                  fontVariantNumeric: "tabular-nums",
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  letterSpacing: "0.05em",
                }}
              >
                {v}
              </span>
              {i < 2 && <span style={{ opacity: 0.7, fontWeight: 900 }}>:</span>}
            </span>
          ))}
        </span>
        <span style={{ opacity: 0.85 }}>
          — depois <s>R$ {ANCHOR_PRICE_BRL}</s>
        </span>
      </div>

      <style>{`
        @keyframes pulseDot { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.3);opacity:0.6} }
        @keyframes blinkCursor { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        @keyframes typingDot { 0%,60%,100%{transform:translateY(0);opacity:0.3} 30%{transform:translateY(-3px);opacity:1} }
        @keyframes bubbleIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes statBump { 0%{color:#16c784;transform:scale(1.08)} 100%{color:#eef2f9;transform:scale(1)} }
        @keyframes glowPulse { 0%,100%{opacity:0.45} 50%{opacity:0.75} }
        .hero-grid { display:grid; grid-template-columns:1fr; gap:2rem; align-items:center; }
        .hero-text { text-align:center; }
        .hero-cta-row { justify-content:center; }
        .hero-bullets { justify-content:center; }
        @media (min-width: 920px) {
          .hero-grid { grid-template-columns: 1.05fr 1fr; gap:3rem; }
          .hero-text { text-align:left; }
          .hero-cta-row { justify-content:flex-start; }
          .hero-bullets { justify-content:flex-start; }
        }
      `}</style>

      {/* Hero — 2-col em desktop (texto esquerda + chat direita), 1-col em mobile */}
      <section
        style={{
          position: "relative",
          background:
            "radial-gradient(ellipse at 70% 20%, rgba(37,211,102,0.10), transparent 50%), linear-gradient(180deg,#0a0b14 0%,var(--bg) 100%)",
          padding: "2.5rem 1.25rem 3rem",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "-10%",
            right: "-10%",
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,211,102,0.18), transparent 70%)",
            filter: "blur(40px)",
            animation: "glowPulse 4s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />

        <div className="hero-grid" style={{ maxWidth: 1180, margin: "0 auto", position: "relative" }}>
          {/* ESQUERDA: texto + CTA */}
          <div className="hero-text">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(22,199,132,0.1)",
                border: "1px solid rgba(22,199,132,0.25)",
                color: "#16c784",
                borderRadius: 20,
                padding: "0.3rem 0.85rem",
                fontSize: "0.78rem",
                fontWeight: 700,
                marginBottom: "1.1rem",
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#16c784",
                  display: "inline-block",
                  animation: "pulseDot 1.6s ease-in-out infinite",
                }}
              />
              100% offline · pagamento único
            </div>

            <h1
              style={{
                fontSize: "clamp(1.95rem, 3.4vw, 2.85rem)",
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: "0.85rem",
                letterSpacing: "-0.01em",
              }}
            >
              <span style={{ color: "#25D366" }}>Seu computador</span>{" "}
              atendendo no WhatsApp 24/7,
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg,#16c784,#6366f1)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                sem mensalidade
              </span>
              .
            </h1>

            <p
              style={{
                fontSize: "1rem",
                color: "#8394b0",
                lineHeight: 1.6,
                maxWidth: 540,
                margin: "0 auto 1.5rem",
                marginInline: undefined,
              }}
            >
              Instala no Windows, escaneia o QR e o bot responde seus clientes
              em ~1.5s usando uma IA que roda no seu PC. Sem ChatGPT, sem
              servidor, sem mensalidade.
            </p>

            <LiveStatsBanner />

            {/* Primary purchase CTA */}
            <div
              className="hero-cta-row"
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "0.85rem",
                marginBottom: "1rem",
              }}
            >
              <button
                onClick={buy}
                disabled={loading}
                style={{
                  ...BTN_PRIMARY,
                  padding: "1rem 1.85rem",
                  fontSize: "1.02rem",
                  cursor: loading ? "wait" : "pointer",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "Redirecionando..." : `🚀 Quero o ZapBot — R$ ${PRICE_BRL}`}
              </button>
              <div style={{ fontSize: "0.85rem", color: "#8394b0", lineHeight: 1.4 }}>
                <s style={{ color: "#4e5c72" }}>De R$ {ANCHOR_PRICE_BRL}</s>{" "}
                <strong style={{ color: "#16c784" }}>por R$ {PRICE_BRL}</strong>
                <div style={{ fontSize: "0.74rem", color: "#4e5c72", marginTop: 2 }}>
                  💳 Pix, cartão ou boleto · 🛡️ 7 dias de garantia
                </div>
              </div>
            </div>

            <div
              className="hero-bullets"
              style={{
                display: "flex",
                gap: "0.85rem",
                flexWrap: "wrap",
                fontSize: "0.78rem",
                color: "#8394b0",
                fontWeight: 500,
              }}
            >
              {[
                "Pagamento único",
                "Sem ChatGPT/OpenAI",
                "Suas conversas no seu PC",
              ].map((t) => (
                <span key={t} style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <span style={{ color: "#16c784" }}>✓</span> {t}
                </span>
              ))}
            </div>
          </div>

          {/* DIREITA: chat ao vivo */}
          <div style={{ position: "relative" }}>
            <LiveChatDemo />
          </div>
        </div>
      </section>

      {/* Vídeo explicativo — fora da hero */}
      <section style={{ padding: "4rem 1.5rem", background: "var(--bg)" }}>
        <div style={{ position: "relative", maxWidth: 980, margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.25)",
              color: "#a78bfa",
              borderRadius: 20,
              padding: "0.3rem 1rem",
              fontSize: "0.8rem",
              fontWeight: 700,
              marginBottom: "1.25rem",
            }}
          >
            🎬 Vídeo explicativo · 7 min
          </div>

          <VideoWithPlayCover />


          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            <button
              onClick={buy}
              disabled={loading}
              style={{
                ...BTN_PRIMARY,
                padding: "1.15rem 2.75rem",
                fontSize: "1.15rem",
                cursor: loading ? "wait" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Redirecionando..." : `🚀 Quero o ZapBot agora — R$ ${PRICE_BRL}`}
            </button>
            <div style={{ fontSize: "0.82rem", color: "#8394b0" }}>
              pagamento único · Pix, cartão ou boleto · 7 dias de garantia
            </div>
          </div>
        </div>
      </section>

      {/* Features — stat cards animados, 3 colunas fixas em desktop */}
      <style>{`
        @keyframes cardIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmerStat {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .stat-grid { display:grid; grid-template-columns:1fr; gap:1rem; }
        @media (min-width: 640px) { .stat-grid { grid-template-columns: 1fr 1fr; gap:1.1rem; } }
        @media (min-width: 980px) { .stat-grid { grid-template-columns: repeat(3, 1fr); gap:1.25rem; } }
        .stat-card {
          position: relative;
          border-radius: 18px;
          padding: 1.6rem 1.5rem 1.4rem;
          overflow: hidden;
          background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.15) 100%);
          border: 1.5px solid rgba(255,255,255,0.08);
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          opacity: 0;
          animation: cardIn 0.5s ease-out forwards;
          will-change: transform;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.35);
        }
        .stat-number {
          background-size: 200% 100%;
          animation: shimmerStat 6s linear infinite;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
      `}</style>

      <section style={{ padding: "3.5rem 1.25rem", background: "var(--bg2)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: "clamp(1.7rem, 3.2vw, 2.4rem)",
              fontWeight: 900,
              marginBottom: "0.5rem",
              letterSpacing: "-0.01em",
            }}
          >
            Tudo que outros chatbots cobram caro.{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#16c784,#25D366)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Aqui é grátis.
            </span>
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "#8394b0",
              marginBottom: "2.5rem",
              fontSize: "0.95rem",
            }}
          >
            Sem mensalidade · sem limite de mensagens · sem nuvem · sem letra miúda.
          </p>

          <div className="stat-grid">
            {STAT_CARDS.map((c, i) => (
              <div
                key={c.title}
                className="stat-card"
                style={{
                  borderColor: `${c.color}33`,
                  animationDelay: `${i * 70}ms`,
                  background: `
                    radial-gradient(circle at 100% 0%, ${c.color}22 0%, transparent 55%),
                    linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.2) 100%)
                  `,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${c.color}80`;
                  e.currentTarget.style.boxShadow = `0 12px 40px ${c.color}25`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${c.color}33`;
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.35)";
                }}
              >
                {/* Emoji topo */}
                <div
                  style={{
                    fontSize: "1.5rem",
                    marginBottom: "0.6rem",
                    filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))",
                  }}
                >
                  {c.emoji}
                </div>

                {/* STAT GIGANTE */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 6,
                    marginBottom: "0.7rem",
                  }}
                >
                  <span
                    className="stat-number"
                    style={{
                      fontSize: "clamp(2.6rem, 4.5vw, 3.4rem)",
                      fontWeight: 900,
                      lineHeight: 1,
                      letterSpacing: "-0.04em",
                      backgroundImage: `linear-gradient(110deg, ${c.color} 30%, ${c.color2} 50%, ${c.color} 70%)`,
                    }}
                  >
                    {c.stat}
                  </span>
                  {c.statSub && (
                    <span
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: 700,
                        color: c.color,
                        opacity: 0.85,
                      }}
                    >
                      {c.statSub}
                    </span>
                  )}
                </div>

                <div
                  style={{
                    fontWeight: 800,
                    fontSize: "1.05rem",
                    color: "#eef2f9",
                    marginBottom: "0.4rem",
                  }}
                >
                  {c.title}
                </div>
                <div
                  style={{
                    color: "#8394b0",
                    fontSize: "0.85rem",
                    lineHeight: 1.5,
                    marginBottom: c.vs ? "0.85rem" : 0,
                  }}
                >
                  {c.detail}
                </div>

                {c.vs && (
                  <div
                    style={{
                      borderTop: "1px dashed rgba(255,255,255,0.08)",
                      paddingTop: "0.7rem",
                      fontSize: "0.72rem",
                      color: "#6b7a94",
                      lineHeight: 1.45,
                    }}
                  >
                    <span style={{ color: "#ef4444", fontWeight: 700, marginRight: 4 }}>
                      vs
                    </span>
                    {c.vs}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works — 3 steps */}
      <HowItWorks />

      {/* Savings vs monthly tools */}
      <Savings />

      {/* Local vs cloud comparison */}
      <Comparison />

      {/* Bonuses + Risk reversal */}
      <BonusesAndGuarantee buy={buy} loading={loading} />

      {/* Final CTA */}
      <section
        style={{
          padding: "5rem 1.5rem",
          textAlign: "center",
          background: "var(--bg)",
        }}
      >
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>📲</div>
          <h2
            style={{
              fontSize: "clamp(1.8rem,4vw,2.5rem)",
              fontWeight: 900,
              marginBottom: "0.75rem",
            }}
          >
            Pronto pra atender no automático?
          </h2>
          <p
            style={{
              color: "#8394b0",
              marginBottom: "2rem",
              fontSize: "1rem",
              lineHeight: 1.7,
            }}
          >
            Instala em 5 minutos. Funciona offline. Suas conversas e configurações
            ficam só na sua máquina.
          </p>

          <button
            onClick={buy}
            disabled={loading}
            style={{
              ...BTN_PRIMARY,
              padding: "1.1rem 2.5rem",
              fontSize: "1.1rem",
              cursor: loading ? "wait" : "pointer",
              opacity: loading ? 0.7 : 1,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            {loading ? "Aguarde..." : `🚀 Comprar agora — R$ ${PRICE_BRL}`}
          </button>
          <div
            style={{
              marginTop: "1rem",
              fontSize: "0.82rem",
              color: "#8394b0",
            }}
          >
            pagamento único · 7 dias de garantia · Pix, cartão ou boleto
          </div>

          <p style={{ color: "#4e5c72", fontSize: "0.78rem", marginTop: "2rem" }}>
            Código aberto em{" "}
            <a
              href={`https://github.com/${GH_OWNER}/${GH_REPO}`}
              style={{ color: "#8394b0", textDecoration: "underline" }}
            >
              github.com/{GH_OWNER}/{GH_REPO}
            </a>
            <br />
            Dúvidas?{" "}
            <a
              href="mailto:contato@iaempresa.app"
              style={{ color: "#8394b0", textDecoration: "underline" }}
            >
              contato@iaempresa.app
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// How it works — 3 steps
// ─────────────────────────────────────────────────────────────────────────
const STEPS = [
  {
    n: 1,
    time: "2 min",
    emoji: "📥",
    color: "#25D366",
    color2: "#16c784",
    title: "Baixe e instale",
    desc: "Click no botão acima, executa o instalador e o app abre. Sem Python, Docker ou servidor.",
  },
  {
    n: 2,
    time: "1 min",
    emoji: "📱",
    color: "#a855f7",
    color2: "#6366f1",
    title: "Escaneie o QR",
    desc: "WhatsApp do celular → Aparelhos conectados → escanear. Pronto, conectado.",
  },
  {
    n: 3,
    time: "5 min",
    emoji: "⚙️",
    color: "#f59e0b",
    color2: "#ef4444",
    title: "Configure as regras",
    desc: "Escreva em português \"sempre pergunte o CEP antes do preço\" — bot segue. 24h por dia.",
  },
];

function HowItWorks() {
  return (
    <>
      <style>{`
        .steps-grid { display:grid; grid-template-columns:1fr; gap:1.1rem; position:relative; }
        @media (min-width: 880px) {
          .steps-grid { grid-template-columns: repeat(3, 1fr); gap:1.5rem; }
        }
        .step-card {
          position: relative;
          border-radius: 18px;
          padding: 1.5rem 1.4rem 1.4rem;
          overflow: hidden;
          background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.2) 100%);
          border: 1.5px solid rgba(255,255,255,0.08);
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          opacity: 0;
          animation: cardIn 0.5s ease-out forwards;
        }
        .step-card:hover { transform: translateY(-4px); }
        .step-arrow {
          display: none;
          position: absolute;
          right: -1.1rem;
          top: 2.1rem;
          color: #25D366;
          font-size: 1.4rem;
          z-index: 2;
          opacity: 0.5;
        }
        @media (min-width: 880px) {
          .step-arrow { display: block; }
        }
      `}</style>

      <section id="como-funciona" style={{ padding: "4rem 1.25rem", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "0.75rem" }}>
            <span
              style={{
                display: "inline-block",
                background: "rgba(37,211,102,0.1)",
                border: "1px solid rgba(37,211,102,0.25)",
                color: "#25D366",
                borderRadius: 20,
                padding: "0.3rem 1rem",
                fontSize: "0.78rem",
                fontWeight: 700,
              }}
            >
              ⚡ Setup em 8 minutos
            </span>
          </div>
          <h2
            style={{
              textAlign: "center",
              fontSize: "clamp(1.7rem, 3.2vw, 2.4rem)",
              fontWeight: 900,
              marginBottom: "0.5rem",
              letterSpacing: "-0.01em",
            }}
          >
            Do download ao primeiro{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#25D366,#16c784)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              atendimento automático
            </span>
          </h2>
          <p style={{ textAlign: "center", color: "#8394b0", marginBottom: "2.5rem", fontSize: "0.95rem" }}>
            Funciona como qualquer app. Você não precisa saber programar.
          </p>

          <div className="steps-grid">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className="step-card"
                style={{
                  borderColor: `${s.color}33`,
                  animationDelay: `${i * 90}ms`,
                  background: `
                    radial-gradient(circle at 0% 0%, ${s.color}1a 0%, transparent 55%),
                    linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.2) 100%)
                  `,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${s.color}80`;
                  e.currentTarget.style.boxShadow = `0 12px 40px ${s.color}25`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${s.color}33`;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Seta entre cards (só desktop, last não tem) */}
                {i < STEPS.length - 1 && (
                  <span className="step-arrow" aria-hidden>
                    →
                  </span>
                )}

                {/* Header: número + tempo badge */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: `linear-gradient(135deg, ${s.color}, ${s.color2})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 900,
                      fontSize: "1.4rem",
                      color: "#fff",
                      boxShadow: `0 8px 24px ${s.color}55`,
                    }}
                  >
                    {s.n}
                  </div>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: s.color,
                      background: `${s.color}1a`,
                      border: `1px solid ${s.color}40`,
                      borderRadius: 999,
                      padding: "0.25rem 0.7rem",
                    }}
                  >
                    ⏱ {s.time}
                  </span>
                </div>

                <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>{s.emoji}</div>

                <div
                  style={{
                    fontWeight: 800,
                    fontSize: "1.1rem",
                    color: "#eef2f9",
                    marginBottom: "0.4rem",
                  }}
                >
                  {s.title}
                </div>
                <div
                  style={{
                    color: "#8394b0",
                    fontSize: "0.87rem",
                    lineHeight: 1.5,
                  }}
                >
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Savings — price comparison vs monthly tools.
// Big "economia" number is the visual hook.
// ─────────────────────────────────────────────────────────────────────────
const MONTHLY_TOOLS: { name: string; monthly: number; note: string }[] = [
  { name: "Manychat / Chatfuel", monthly: 99, note: "plano Pro" },
  { name: "ChatGPT Plus + Z-API", monthly: 159, note: "API + WhatsApp" },
  { name: "Take Blip / Botmaker", monthly: 297, note: "plano inicial" },
  { name: "WhatsApp Business API", monthly: 449, note: "via provedor" },
];

const MONTHS_COMPARE = 12;

function formatBRL(n: number): string {
  return n.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function Savings() {
  const cheapestMonthly = MONTHLY_TOOLS[0].monthly;
  const yearlyAvg = Math.round(
    MONTHLY_TOOLS.reduce((s, t) => s + t.monthly * MONTHS_COMPARE, 0) / MONTHLY_TOOLS.length,
  );
  const savings = yearlyAvg - 97;
  const paybackDays = Math.ceil((97 / cheapestMonthly) * 30);
  const maxYearly5 = Math.max(...MONTHLY_TOOLS.map((t) => t.monthly * 60));

  return (
    <>
      <style>{`
        .price-row {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 0.75rem;
          align-items: center;
          padding: 0.95rem 1.1rem;
          border-top: 1px solid rgba(255,255,255,0.06);
          font-size: 0.9rem;
          transition: background 0.2s;
        }
        .price-row:hover { background: rgba(255,255,255,0.02); }
        @media (min-width: 720px) {
          .price-row { grid-template-columns: 1.8fr 0.9fr 1fr 1fr; gap:0; }
        }
        .price-bar-wrap {
          height: 6px;
          background: rgba(255,255,255,0.04);
          border-radius: 999px;
          overflow: hidden;
          margin-top: 4px;
        }
        .price-bar {
          height: 100%;
          background: linear-gradient(90deg, #fb923c, #ef4444);
          border-radius: 999px;
          transition: width 0.6s ease;
        }
        .pay-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        @media (min-width: 760px) {
          .pay-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>

      <section style={{ padding: "4rem 1.25rem", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "2.25rem" }}>
            <div
              style={{
                display: "inline-block",
                background: "rgba(22,199,132,0.1)",
                border: "1px solid rgba(22,199,132,0.25)",
                color: "#16c784",
                borderRadius: 20,
                padding: "0.3rem 1rem",
                fontSize: "0.78rem",
                fontWeight: 700,
                marginBottom: "0.85rem",
              }}
            >
              💰 1 pagamento. Use pra sempre.
            </div>
            <h2
              style={{
                fontSize: "clamp(1.7rem, 3.2vw, 2.4rem)",
                fontWeight: 900,
                marginBottom: "0.6rem",
                letterSpacing: "-0.01em",
              }}
            >
              Em 12 meses você economiza{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#16c784,#25D366)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                R$ {formatBRL(savings)}
              </span>
            </h2>
            <p style={{ color: "#8394b0", fontSize: "0.95rem" }}>
              A maioria cobra todo mês, pra sempre. ZapBot é{" "}
              <strong style={{ color: "#eef2f9" }}>R$ 97 uma vez</strong> e acabou.
            </p>
          </div>

          {/* Tabela visual com barras de preço */}
          <div
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.025) 0%, rgba(0,0,0,0.15) 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 18,
              overflow: "hidden",
            }}
          >
            {/* Header desktop */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.8fr 0.9fr 1fr 1fr",
                background: "rgba(255,255,255,0.03)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                fontWeight: 700,
                fontSize: "0.78rem",
                color: "#6b7a94",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              <div style={{ padding: "0.85rem 1.1rem" }}>Ferramenta</div>
              <div style={{ padding: "0.85rem 1.1rem", textAlign: "center" }}>Por mês</div>
              <div style={{ padding: "0.85rem 1.1rem", textAlign: "center" }}>12 meses</div>
              <div style={{ padding: "0.85rem 1.1rem", textAlign: "center" }}>5 anos</div>
            </div>

            {MONTHLY_TOOLS.map((tool) => {
              const y1 = tool.monthly * 12;
              const y5 = tool.monthly * 60;
              const barPct = (y5 / maxYearly5) * 100;
              return (
                <div key={tool.name} className="price-row">
                  <div>
                    <div style={{ fontWeight: 700, color: "#c8d4e8", fontSize: "0.95rem" }}>
                      {tool.name}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#4e5c72", marginTop: 2 }}>
                      {tool.note}
                    </div>
                    <div className="price-bar-wrap">
                      <div className="price-bar" style={{ width: `${barPct}%` }} />
                    </div>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      color: "#a3b3cc",
                      fontWeight: 600,
                      fontSize: "0.92rem",
                    }}
                  >
                    R$ {formatBRL(tool.monthly)}
                    <span style={{ fontSize: "0.7rem", opacity: 0.7 }}>/mês</span>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      color: "#fb923c",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                    }}
                  >
                    R$ {formatBRL(y1)}
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      color: "#ef4444",
                      fontWeight: 800,
                      fontSize: "1rem",
                    }}
                  >
                    R$ {formatBRL(y5)}
                  </div>
                </div>
              );
            })}

            {/* ZapBot row destacada */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.8fr 0.9fr 1fr 1fr",
                background:
                  "linear-gradient(90deg, rgba(37,211,102,0.18) 0%, rgba(22,199,132,0.10) 100%)",
                borderTop: "2px solid rgba(37,211,102,0.5)",
                alignItems: "center",
                fontSize: "0.95rem",
                position: "relative",
              }}
            >
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  background:
                    "radial-gradient(circle at 0% 50%, rgba(37,211,102,0.15), transparent 70%)",
                }}
              />
              <div style={{ padding: "1.15rem 1.1rem", position: "relative" }}>
                <div
                  style={{
                    fontWeight: 900,
                    color: "#25D366",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.45rem",
                    fontSize: "1.05rem",
                  }}
                >
                  ⏻ ZapBot
                  <span
                    style={{
                      background: "linear-gradient(135deg,#16c784,#25D366)",
                      color: "#0a0b14",
                      fontSize: "0.62rem",
                      padding: "3px 8px",
                      borderRadius: 999,
                      fontWeight: 900,
                      letterSpacing: "0.04em",
                    }}
                  >
                    VITALÍCIO
                  </span>
                </div>
                <div style={{ fontSize: "0.74rem", color: "#a7f3d0", marginTop: 3 }}>
                  1 pagamento · sem reajuste · sem letra miúda
                </div>
              </div>
              <div
                style={{
                  padding: "1.15rem 1.1rem",
                  textAlign: "center",
                  color: "#16c784",
                  fontWeight: 800,
                  position: "relative",
                }}
              >
                R$ 97
                <div style={{ fontSize: "0.65rem", color: "#a7f3d0", opacity: 0.8 }}>única vez</div>
              </div>
              <div
                style={{
                  padding: "1.15rem 1.1rem",
                  textAlign: "center",
                  color: "#16c784",
                  fontWeight: 900,
                  fontSize: "1.1rem",
                  position: "relative",
                }}
              >
                R$ 97
              </div>
              <div
                style={{
                  padding: "1.15rem 1.1rem",
                  textAlign: "center",
                  color: "#16c784",
                  fontWeight: 900,
                  fontSize: "1.1rem",
                  position: "relative",
                }}
              >
                R$ 97
              </div>
            </div>
          </div>

          {/* Payback cards — mesmo estilo dos stat cards */}
          <div className="pay-grid">
            {[
              {
                emoji: "⚡",
                color: "#16c784",
                color2: "#25D366",
                label: "Você se paga em",
                stat: `~${paybackDays}`,
                statSub: "dias",
                detail: "vs. ferramenta mais barata da lista",
              },
              {
                emoji: "💰",
                color: "#a78bfa",
                color2: "#6366f1",
                label: "Economia média em 1 ano",
                stat: `R$ ${formatBRL(savings)}`,
                detail: "média das ferramentas comparadas acima",
              },
              {
                emoji: "🔥",
                color: "#f59e0b",
                color2: "#ef4444",
                label: "Em 5 anos pagaria",
                stat: `R$ ${formatBRL(yearlyAvg * 5)}+`,
                detail: "continuando em ferramenta na nuvem",
              },
            ].map((c, i) => (
              <div
                key={c.label}
                className="stat-card"
                style={{
                  borderColor: `${c.color}33`,
                  animationDelay: `${i * 80}ms`,
                  background: `
                    radial-gradient(circle at 100% 0%, ${c.color}22 0%, transparent 55%),
                    linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.2) 100%)
                  `,
                  textAlign: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${c.color}80`;
                  e.currentTarget.style.boxShadow = `0 12px 40px ${c.color}25`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${c.color}33`;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ fontSize: "1.4rem", marginBottom: "0.4rem" }}>{c.emoji}</div>
                <div
                  style={{
                    fontSize: "0.78rem",
                    color: "#8394b0",
                    fontWeight: 600,
                    marginBottom: "0.5rem",
                  }}
                >
                  {c.label}
                </div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "baseline",
                    gap: 4,
                    marginBottom: "0.5rem",
                  }}
                >
                  <span
                    className="stat-number"
                    style={{
                      fontSize: "clamp(2rem, 3.6vw, 2.6rem)",
                      fontWeight: 900,
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                      backgroundImage: `linear-gradient(110deg, ${c.color} 30%, ${c.color2} 50%, ${c.color} 70%)`,
                    }}
                  >
                    {c.stat}
                  </span>
                  {c.statSub && (
                    <span
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: 700,
                        color: c.color,
                        opacity: 0.8,
                      }}
                    >
                      {c.statSub}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: "0.78rem", color: "#6b7a94", lineHeight: 1.4 }}>
                  {c.detail}
                </div>
              </div>
            ))}
          </div>

          <p
            style={{
              marginTop: "1.25rem",
              fontSize: "0.74rem",
              color: "#4e5c72",
              textAlign: "center",
            }}
          >
            *Valores médios dos planos iniciais em maio/2026. Algumas ferramentas têm fee de setup ou cobram por mensagem além da mensalidade.
          </p>
        </div>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Bonuses + Risk reversal — strong impulse-buy section right before the CTA.
// ─────────────────────────────────────────────────────────────────────────
const BONUSES: { icon: string; title: string; value: string }[] = [
  {
    icon: "🤖",
    title: "ZapBot — app completo Windows",
    value: "R$ 297",
  },
  {
    icon: "🧠",
    title: "IA local incluída (Qwen 2.5) — sem custo extra de API",
    value: "R$ 1.188/ano grátis",
  },
  {
    icon: "📅",
    title: "Agendamento de mensagens ilimitado",
    value: "R$ 480/ano grátis",
  },
  {
    icon: "🆕",
    title: "Atualizações grátis por 1 ano",
    value: "R$ 240",
  },
  {
    icon: "📩",
    title: "Suporte por e-mail",
    value: "R$ 197",
  },
];

function BonusesAndGuarantee({ buy, loading }: { buy: () => void; loading: boolean }) {
  const totalValue = 297 + 1188 + 480 + 240 + 197;
  return (
    <section style={{ padding: "5rem 1.5rem", background: "var(--bg)" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h2
            style={{
              fontSize: "clamp(1.6rem,3.5vw,2.2rem)",
              fontWeight: 800,
              marginBottom: "0.5rem",
            }}
          >
            Tudo isso por R$ 97
          </h2>
          <p style={{ color: "#8394b0", fontSize: "0.95rem" }}>
            Quanto custaria se você fosse pagar cada coisa separada:
          </p>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg,rgba(37,211,102,0.10),rgba(99,102,241,0.04))",
            border: "1px solid rgba(37,211,102,0.25)",
            borderRadius: 18,
            padding: "1.75rem 1.75rem 1.5rem",
          }}
        >
          {BONUSES.map((b) => (
            <div
              key={b.title}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "0.75rem 0",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>{b.icon}</span>
              <span style={{ flex: 1, color: "#c8d4e8", fontSize: "0.92rem" }}>
                <span style={{ color: "#16c784", fontWeight: 800, marginRight: 6 }}>✓</span>
                {b.title}
              </span>
              <span style={{ color: "#4e5c72", fontSize: "0.85rem", fontVariantNumeric: "tabular-nums" }}>
                <s>{b.value}</s>
              </span>
            </div>
          ))}

          {/* Total */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem 0 0.25rem",
              fontSize: "0.95rem",
            }}
          >
            <span style={{ color: "#8394b0" }}>Valor real do pacote</span>
            <span style={{ color: "#8394b0" }}>
              <s>R$ {totalValue.toLocaleString("pt-BR")}</s>
            </span>
          </div>

          {/* Final price */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.5rem 0 1.25rem",
              borderTop: "1px dashed rgba(37,211,102,0.3)",
              marginTop: "0.5rem",
              paddingTop: "1rem",
            }}
          >
            <span style={{ fontWeight: 800, color: "#eef2f9", fontSize: "1.05rem" }}>
              Hoje você paga
            </span>
            <span
              style={{
                fontWeight: 900,
                color: "#16c784",
                fontSize: "1.8rem",
                lineHeight: 1,
              }}
            >
              R$ 97
            </span>
          </div>

          <button
            onClick={buy}
            disabled={loading}
            style={{
              ...BTN_PRIMARY,
              width: "100%",
              padding: "1.05rem",
              fontSize: "1.05rem",
              cursor: loading ? "wait" : "pointer",
              opacity: loading ? 0.7 : 1,
              justifyContent: "center",
            }}
          >
            {loading ? "Redirecionando..." : "🚀 Garantir meu ZapBot agora"}
          </button>

          {/* Guarantee */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              background: "rgba(22,199,132,0.08)",
              border: "1px solid rgba(22,199,132,0.2)",
              borderRadius: 12,
              padding: "0.9rem 1.1rem",
              marginTop: "1.25rem",
            }}
          >
            <span style={{ fontSize: "1.75rem", flexShrink: 0 }}>🛡️</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.92rem", color: "#16c784" }}>
                7 dias de garantia total
              </div>
              <div style={{ fontSize: "0.8rem", color: "#8394b0", marginTop: 2 }}>
                Não gostou por qualquer motivo? Mandamos seu dinheiro de volta. Sem pergunta, sem burocracia.
              </div>
            </div>
          </div>

          <p
            style={{
              marginTop: "0.85rem",
              fontSize: "0.72rem",
              color: "#4e5c72",
              textAlign: "center",
            }}
          >
            Após o pagamento o download libera automaticamente nessa página.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Comparison: ZapBot (local) vs Cloud bots (ChatGPT/Manychat/etc)
// ─────────────────────────────────────────────────────────────────────────
const COMPARISON_ROWS: { label: string; zapbot: string; cloud: string }[] = [
  { label: "Custo mensal", zapbot: "R$ 0 — sem mensalidade", cloud: "R$ 200 a R$ 800/mês" },
  { label: "Limite de mensagens", zapbot: "Ilimitado", cloud: "Por mensagem / token" },
  { label: "Onde sua conversa fica", zapbot: "No seu PC, criptografada", cloud: "Em servidor da empresa" },
  { label: "Precisa de internet sempre?", zapbot: "Só pro WhatsApp funcionar", cloud: "Tudo depende da nuvem" },
  { label: "Setup técnico", zapbot: "Instala e usa", cloud: "Configurar API, webhook, conta" },
  { label: "Treinar bot pra seu negócio", zapbot: "Escreve regras em português", cloud: "Fluxos com blocos / programação" },
  { label: "Banimento se a empresa fechar", zapbot: "Continua funcionando", cloud: "Você perde tudo" },
];

function Comparison() {
  return (
    <section style={{ padding: "5rem 1.5rem", background: "var(--bg2)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "clamp(1.8rem,4vw,2.4rem)",
            fontWeight: 800,
            marginBottom: "0.6rem",
          }}
        >
          Por que rodar local em vez de na nuvem?
        </h2>
        <p style={{ textAlign: "center", color: "#8394b0", marginBottom: "3rem" }}>
          A maioria dos chatbots cobra mensalidade e guarda suas conversas. O ZapBot não.
        </p>

        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--line)",
            borderRadius: 18,
            overflow: "hidden",
          }}
        >
          {/* Header row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr 1fr",
              gap: 0,
              background: "rgba(255,255,255,0.03)",
              borderBottom: "1px solid var(--line)",
              fontWeight: 700,
              fontSize: "0.88rem",
            }}
          >
            <div style={{ padding: "1rem 1.25rem", color: "#8394b0" }}> </div>
            <div
              style={{
                padding: "1rem 1.25rem",
                color: "#25D366",
                textAlign: "center",
                borderLeft: "1px solid var(--line)",
                borderRight: "1px solid var(--line)",
              }}
            >
              ⏻ ZapBot (local)
            </div>
            <div style={{ padding: "1rem 1.25rem", color: "#8394b0", textAlign: "center" }}>
              ☁ Bots na nuvem
            </div>
          </div>

          {COMPARISON_ROWS.map((row, i) => (
            <div
              key={row.label}
              style={{
                display: "grid",
                gridTemplateColumns: "1.4fr 1fr 1fr",
                gap: 0,
                borderTop: i === 0 ? "none" : "1px solid var(--line)",
                fontSize: "0.88rem",
              }}
            >
              <div style={{ padding: "0.95rem 1.25rem", color: "#c8d4e8", fontWeight: 500 }}>
                {row.label}
              </div>
              <div
                style={{
                  padding: "0.95rem 1.25rem",
                  background: "rgba(37,211,102,0.05)",
                  color: "#a7f3d0",
                  textAlign: "center",
                  borderLeft: "1px solid var(--line)",
                  borderRight: "1px solid var(--line)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                <span style={{ color: "#16c784", fontWeight: 700 }}>✓</span> {row.zapbot}
              </div>
              <div
                style={{
                  padding: "0.95rem 1.25rem",
                  color: "#8394b0",
                  textAlign: "center",
                }}
              >
                {row.cloud}
              </div>
            </div>
          ))}
        </div>

        <p style={{ marginTop: "1.25rem", fontSize: "0.78rem", color: "#4e5c72", textAlign: "center" }}>
          *Tabela comparativa baseada em planos médios de bots na nuvem (Manychat, ChatGPT Plus + API). Valores podem variar.
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// VideoWithPlayCover — overlay com botão play customizado sobre o <video>
// ─────────────────────────────────────────────────────────────────────────
function VideoWithPlayCover() {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        aspectRatio: "16 / 9",
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid rgba(37,211,102,0.18)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
        background: "#0b141a",
      }}
    >
      <video
        ref={ref}
        src="/zapbot-demo.mp4"
        poster="/zapbot-demo-poster.jpg"
        controls
        playsInline
        preload="metadata"
        onPlay={() => setStarted(true)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          background: "#0b141a",
        }}
      />
      {!started && (
        <button
          onClick={() => {
            setStarted(true);
            void ref.current?.play();
          }}
          aria-label="Reproduzir vídeo"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.5) 100%)",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <span
            style={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#25D366,#128C7E)",
              boxShadow:
                "0 14px 44px rgba(37,211,102,0.55), 0 0 0 10px rgba(37,211,102,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.2s ease",
            }}
          >
            <span
              style={{
                width: 0,
                height: 0,
                borderTop: "17px solid transparent",
                borderBottom: "17px solid transparent",
                borderLeft: "26px solid white",
                marginLeft: 6,
              }}
            />
          </span>
          <span
            style={{
              position: "absolute",
              bottom: "1.5rem",
              left: 0,
              right: 0,
              textAlign: "center",
              color: "#eef2f9",
              fontWeight: 700,
              fontSize: "0.95rem",
              textShadow: "0 2px 8px rgba(0,0,0,0.7)",
              pointerEvents: "none",
            }}
          >
            ▶ Assistir agora · 7 min
          </span>
        </button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// LiveStatsBanner — números crescentes ao vivo (prova social na hero)
// ─────────────────────────────────────────────────────────────────────────
function LiveStatsBanner() {
  const { contas, mensagens } = useLiveStats();
  return (
    <div
      className="hero-cta-row"
      style={{
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
        alignItems: "center",
        fontSize: "0.85rem",
        color: "#8394b0",
        marginBottom: "1.25rem",
      }}
    >
      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#16c784",
            boxShadow: "0 0 8px #16c784",
            animation: "pulseDot 1.6s ease-in-out infinite",
          }}
        />
        Bot ativo agora em{" "}
        <strong
          key={`c-${contas}`}
          style={{
            color: "#eef2f9",
            fontVariantNumeric: "tabular-nums",
            animation: "statBump 0.6s ease-out",
            display: "inline-block",
            minWidth: "2.5em",
          }}
        >
          {formatBR(contas)}
        </strong>{" "}
        contas
      </span>
      <span style={{ opacity: 0.4 }}>·</span>
      <span>
        <strong
          key={`m-${mensagens}`}
          style={{
            color: "#eef2f9",
            fontVariantNumeric: "tabular-nums",
            animation: "statBump 0.4s ease-out",
            display: "inline-block",
          }}
        >
          {formatBR(mensagens)}
        </strong>{" "}
        mensagens respondidas hoje
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// LiveChatDemo — simula a IA conversando em loop (prova de funcionamento)
// ─────────────────────────────────────────────────────────────────────────
type Scenario = { customer: string; bot: string };
const SCENARIOS: Scenario[] = [
  {
    customer: "Vocês entregam hoje?",
    bot: "Sim! Pra entrega no mesmo dia precisamos do pedido até 15h. Qual seu CEP?",
  },
  {
    customer: "Quanto custa?",
    bot: "Depende do tamanho. O básico sai R$ 47, o premium R$ 97. Qual te interessa?",
  },
  {
    customer: "Posso parcelar no cartão?",
    bot: "Sim! Aceitamos cartão em até 12x sem juros 💳 Quer que eu te mande o link de pagamento?",
  },
  {
    customer: "Tem desconto à vista?",
    bot: "Tem! Pra fechar agora libero 10% no Pix. Posso te enviar o link com desconto?",
  },
  {
    customer: "Quero falar com um atendente",
    bot: "Claro! Já chamei a equipe pra você 👤 Em alguns minutos alguém te responde por aqui.",
  },
  {
    customer: "Estou só pesquisando ainda",
    bot: "Tranquilo 😊 Posso te mandar uns depoimentos rápidos de quem já comprou?",
  },
];

type ChatMsg = {
  id: number;
  side: "in" | "out";
  text: string;
  typing?: boolean;
};

function LiveChatDemo() {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [scenarioIdx, setScenarioIdx] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = window.setTimeout(resolve, ms);
        timers.push(id);
      });

    async function runScenario(idx: number) {
      if (cancelled) return;
      const s = SCENARIOS[idx];
      const baseId = Date.now();

      // Reset depois de 3 cenários (mantém última visível antes do reset)
      if (idx % 3 === 0 && idx !== 0) {
        setMessages([]);
        await wait(400);
      }

      // 1) cliente envia
      setMessages((m) => [...m, { id: baseId, side: "in", text: s.customer }]);
      await wait(900);
      if (cancelled) return;

      // 2) bot mostra "digitando..."
      setMessages((m) => [
        ...m,
        { id: baseId + 1, side: "out", text: "", typing: true },
      ]);
      await wait(1400);
      if (cancelled) return;

      // 3) bot digita resposta caractere por caractere
      const full = s.bot;
      for (let i = 1; i <= full.length; i++) {
        if (cancelled) return;
        setMessages((m) => {
          const copy = [...m];
          const last = copy[copy.length - 1];
          if (last && last.id === baseId + 1) {
            copy[copy.length - 1] = {
              ...last,
              text: full.slice(0, i),
              typing: i < full.length,
            };
          }
          return copy;
        });
        await wait(22 + Math.random() * 18);
      }

      await wait(2800);
      if (cancelled) return;
      setScenarioIdx((i) => (i + 1) % SCENARIOS.length);
    }

    runScenario(scenarioIdx);

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [scenarioIdx]);

  return (
    <div
      style={{
        maxWidth: 440,
        margin: "0 auto",
        background: "#0b141a",
        border: "1px solid rgba(37,211,102,0.2)",
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset",
        textAlign: "left",
      }}
    >
      {/* Header WhatsApp */}
      <div
        style={{
          background: "#075E54",
          color: "#fff",
          padding: "0.75rem 1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.7rem",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "#cbd5e1",
            color: "#475569",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: "0.95rem",
          }}
        >
          C
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: "0.92rem" }}>Cliente</div>
          <div style={{ fontSize: "0.7rem", opacity: 0.8, display: "flex", alignItems: "center", gap: 4 }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#22c55e",
                display: "inline-block",
              }}
            />
            online · respondendo com ZapBot
          </div>
        </div>
        <span
          style={{
            background: "rgba(37,211,102,0.18)",
            color: "#a7f3d0",
            fontSize: "0.65rem",
            padding: "3px 8px",
            borderRadius: 999,
            fontWeight: 700,
          }}
        >
          🤖 BOT ATIVO
        </span>
      </div>

      {/* Chat body */}
      <div
        style={{
          background:
            "linear-gradient(180deg, #0e1a23, #0b141a), #0b141a",
          padding: "1rem 0.85rem",
          minHeight: 280,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          fontSize: "0.88rem",
        }}
      >
        {messages.map((m) => {
          const isOut = m.side === "out";
          return (
            <div
              key={m.id}
              style={{
                alignSelf: isOut ? "flex-end" : "flex-start",
                maxWidth: "82%",
                background: isOut ? "#005c4b" : "#202c33",
                color: "#e9edef",
                borderRadius: isOut ? "10px 10px 2px 10px" : "10px 10px 10px 2px",
                padding: "0.55rem 0.75rem",
                lineHeight: 1.45,
                boxShadow: "0 1px 0 rgba(0,0,0,0.25)",
                animation: "bubbleIn 0.25s ease-out",
                wordBreak: "break-word",
              }}
            >
              {isOut && (
                <div
                  style={{
                    fontSize: "0.65rem",
                    color: "#a7f3d0",
                    fontWeight: 700,
                    marginBottom: 2,
                  }}
                >
                  🤖 Bot
                </div>
              )}
              {m.typing && !m.text ? (
                <span
                  style={{
                    display: "inline-flex",
                    gap: 4,
                    alignItems: "center",
                    padding: "0.15rem 0.25rem",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#a7f3d0",
                        display: "inline-block",
                        animation: `typingDot 1.1s infinite`,
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </span>
              ) : (
                <>
                  {m.text}
                  {m.typing && (
                    <span
                      style={{
                        display: "inline-block",
                        width: 2,
                        height: "1em",
                        background: "#a7f3d0",
                        marginLeft: 2,
                        verticalAlign: "text-bottom",
                        animation: "blinkCursor 0.9s step-start infinite",
                      }}
                    />
                  )}
                </>
              )}
            </div>
          );
        })}
        {messages.length === 0 && (
          <div style={{ color: "#4e5c72", textAlign: "center", padding: "2rem 0", fontSize: "0.8rem" }}>
            Carregando demo...
          </div>
        )}
      </div>

      {/* Footer "fake input" */}
      <div
        style={{
          background: "#0a131a",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "0.6rem 0.85rem",
          fontSize: "0.72rem",
          color: "#4e5c72",
          textAlign: "center",
        }}
      >
        ⚡ Demo rodando em loop — IA local respondendo em ~1.5s
      </div>
    </div>
  );
}
