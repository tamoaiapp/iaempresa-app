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

/** Mini biblioteca de ícones SVG inline — sem emoji, escaláveis, cor controlada via prop. */
type IconName =
  | "money" | "bolt" | "moon" | "lock" | "infinity" | "flag" | "download"
  | "qr" | "gear" | "coins" | "fire" | "arrow" | "rocket" | "send"
  | "shield" | "check" | "x" | "cloud" | "computer" | "clock" | "sparkles";

function Icon({ name, color, size = 24, fill = false }: { name: IconName; color: string; size?: number; fill?: boolean }) {
  const stroke = fill ? "none" : color;
  const fillCol = fill ? color : "none";
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: fillCol,
    stroke,
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "money":
      return (<svg {...common}><path d="M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6"/></svg>);
    case "bolt":
      return (<svg {...common} fill={color} stroke="none"><path d="M13 2L3 14h7l-1 8 11-13h-7l0-7z"/></svg>);
    case "moon":
      return (<svg {...common}><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>);
    case "lock":
      return (<svg {...common}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>);
    case "infinity":
      return (<svg {...common}><path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.739-8z"/></svg>);
    case "flag":
      return (<svg {...common}><path d="M4 22V4M4 16h13l-2-3 2-3H4"/></svg>);
    case "download":
      return (<svg {...common}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>);
    case "qr":
      return (<svg {...common}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 21v-7M14 21h3"/></svg>);
    case "gear":
      return (<svg {...common}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>);
    case "coins":
      return (<svg {...common}><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1110.34 18M7 6h1v4M16.71 13.88l.7.71-2.82 2.82"/></svg>);
    case "fire":
      return (<svg {...common} fill={color} stroke="none"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/></svg>);
    case "arrow":
      return (<svg {...common}><path d="M5 12h14M12 5l7 7-7 7"/></svg>);
    case "rocket":
      return (<svg {...common}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09zM12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2zM9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>);
    case "send":
      return (<svg {...common}><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg>);
    case "shield":
      return (<svg {...common}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>);
    case "check":
      return (<svg {...common}><path d="M20 6L9 17l-5-5"/></svg>);
    case "x":
      return (<svg {...common}><path d="M18 6L6 18M6 6l12 12"/></svg>);
    case "cloud":
      return (<svg {...common}><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>);
    case "computer":
      return (<svg {...common}><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>);
    case "clock":
      return (<svg {...common}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>);
    case "sparkles":
      return (<svg {...common}><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3zM5 16l.7 2.1L8 19l-2.3.9L5 22l-.7-2.1L2 19l2.3-.9L5 16zM19 14l.7 2.1L22 17l-2.3.9L19 20l-.7-2.1L16 17l2.3-.9L19 14z"/></svg>);
  }
}

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
  icon: IconName;
};

const STAT_CARDS: StatCard[] = [
  {
    stat: "R$ 0",
    statSub: "/mês",
    color: "#16c784",
    color2: "#25D366",
    icon: "money",
    title: "Sem mensalidade",
    detail: "Pague R$ 97 uma vez e use pra sempre.",
    vs: "Manychat: R$ 99/mês · Take Blip: R$ 297/mês",
  },
  {
    stat: "~1.5s",
    color: "#25D366",
    color2: "#16c784",
    icon: "bolt",
    title: "Resposta instantânea",
    detail: "IA roda no seu PC, não fica esperando fila de API.",
    vs: "ChatGPT API: 4-12s · Latência da nuvem: 8-20s",
  },
  {
    stat: "24h/7d",
    color: "#a855f7",
    color2: "#6366f1",
    icon: "moon",
    title: "Atende a noite toda",
    detail: "Trabalha enquanto você dorme, no horário que você define.",
    vs: "Atendente humano: 8h/dia · Custo: R$ 1.500+/mês",
  },
  {
    stat: "0",
    statSub: "dados na nuvem",
    color: "#0ea5e9",
    color2: "#6366f1",
    icon: "lock",
    title: "100% privado",
    detail: "Conversas em SQLite local — nada sobe pra OpenAI ou Claude.",
    vs: "Manychat, ChatGPT API: tudo na nuvem deles",
  },
  {
    stat: "∞",
    statSub: "mensagens",
    color: "#f59e0b",
    color2: "#ef4444",
    icon: "infinity",
    title: "Sem limite por msg",
    detail: "Não cobra por token. 10 ou 10.000 clientes, mesmo preço.",
    vs: "ChatGPT API: ~R$ 0,02 por msg · 10k = R$ 200/mês",
  },
  {
    stat: "PT-BR",
    color: "#6366f1",
    color2: "#a855f7",
    icon: "flag",
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
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <Icon name="fire" color="#fff" size={14} />
          Oferta de lançamento expira hoje à meia-noite
        </span>
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
              atendendo no WhatsApp 24 horas por 7 dias na semana,
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
                {loading ? (
                  "Redirecionando..."
                ) : (
                  <>
                    Quero o ZapBot — R$ {PRICE_BRL}
                    <Icon name="arrow" color="#fff" size={18} />
                  </>
                )}
              </button>
              <div style={{ fontSize: "0.85rem", color: "#8394b0", lineHeight: 1.4 }}>
                <s style={{ color: "#4e5c72" }}>De R$ {ANCHOR_PRICE_BRL}</s>{" "}
                <strong style={{ color: "#16c784" }}>por R$ {PRICE_BRL}</strong>
                <div style={{ fontSize: "0.74rem", color: "#4e5c72", marginTop: 2 }}>
                  Pix, cartão ou boleto · 7 dias de garantia
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

      {/* Pain points — gatilho emocional logo após a hero */}
      <PainPoints />

      {/* Vídeo explicativo — fora da hero */}
      <section style={{ padding: "4rem 1.5rem", background: "var(--bg)" }}>
        <div style={{ position: "relative", maxWidth: 980, margin: "0 auto" }}>
          <Reveal>
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
              <Icon name="sparkles" color="#a78bfa" size={13} />
              Vídeo explicativo · 7 min
            </div>
          </Reveal>

          <Reveal delay={120}>
            <VideoWithPlayCover />
          </Reveal>


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
              {loading ? (
                "Redirecionando..."
              ) : (
                <>
                  Quero o ZapBot agora — R$ {PRICE_BRL}
                  <Icon name="arrow" color="#fff" size={18} />
                </>
              )}
            </button>
            <div style={{ fontSize: "0.82rem", color: "#8394b0" }}>
              pagamento único · Pix, cartão ou boleto · 7 dias de garantia
            </div>
          </div>
        </div>
      </section>

      {/* App preview — mockup CSS do produto rodando (mostra a tecnologia) */}
      <AppPreview />

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
                {/* Icon topo */}
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: `linear-gradient(135deg, ${c.color}25, ${c.color2}10)`,
                    border: `1px solid ${c.color}40`,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "0.85rem",
                    boxShadow: `0 4px 16px ${c.color}25`,
                  }}
                >
                  <Icon name={c.icon} color={c.color} size={22} />
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

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* Bonuses + Risk reversal */}
      <BonusesAndGuarantee buy={buy} loading={loading} />

      {/* Final CTA */}
      <section
        style={{
          position: "relative",
          padding: "5rem 1.25rem",
          textAlign: "center",
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(37,211,102,0.12), transparent 60%), var(--bg)",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "-20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,211,102,0.08), transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 640, margin: "0 auto", position: "relative" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(37,211,102,0.1)",
              border: "1px solid rgba(37,211,102,0.3)",
              color: "#25D366",
              borderRadius: 999,
              padding: "0.4rem 1.1rem",
              fontSize: "0.78rem",
              fontWeight: 700,
              marginBottom: "1.25rem",
            }}
          >
            <Icon name="sparkles" color="#25D366" size={14} />
            Pronto em 8 minutos
          </div>
          <h2
            style={{
              fontSize: "clamp(1.9rem, 4vw, 2.7rem)",
              fontWeight: 900,
              marginBottom: "0.85rem",
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
            }}
          >
            Pare de pagar mensalidade pra{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#16c784,#25D366)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              atender clientes.
            </span>
          </h2>
          <p
            style={{
              color: "#8394b0",
              marginBottom: "2rem",
              fontSize: "1rem",
              lineHeight: 1.65,
            }}
          >
            Instala em 5 minutos, funciona offline, conversas ficam só no seu PC.
            Pagamento único de R$ 97 — sem letra miúda.
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
              gap: "0.6rem",
            }}
          >
            {loading ? (
              "Aguarde..."
            ) : (
              <>
                Comprar agora — R$ {PRICE_BRL}
                <Icon name="arrow" color="#fff" size={18} />
              </>
            )}
          </button>
          <div
            style={{
              marginTop: "1rem",
              fontSize: "0.82rem",
              color: "#8394b0",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Icon name="shield" color="#16c784" size={14} />
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
const STEPS: { n: number; time: string; icon: IconName; color: string; color2: string; title: string; desc: string }[] = [
  {
    n: 1,
    time: "2 min",
    icon: "download",
    color: "#25D366",
    color2: "#16c784",
    title: "Baixe e instale",
    desc: "Click no botão acima, executa o instalador e o app abre. Sem Python, Docker ou servidor.",
  },
  {
    n: 2,
    time: "1 min",
    icon: "qr",
    color: "#a855f7",
    color2: "#6366f1",
    title: "Escaneie o QR",
    desc: "WhatsApp do celular → Aparelhos conectados → escanear. Pronto, conectado.",
  },
  {
    n: 3,
    time: "5 min",
    icon: "gear",
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
              Setup em 8 minutos
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
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: s.color,
                      background: `${s.color}1a`,
                      border: `1px solid ${s.color}40`,
                      borderRadius: 999,
                      padding: "0.25rem 0.7rem",
                    }}
                  >
                    <Icon name="clock" color={s.color} size={12} />
                    {s.time}
                  </span>
                </div>

                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: `linear-gradient(135deg, ${s.color}25, ${s.color2}10)`,
                    border: `1px solid ${s.color}40`,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "0.85rem",
                  }}
                >
                  <Icon name={s.icon} color={s.color} size={24} />
                </div>

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
              1 pagamento. Use pra sempre.
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
                  <Icon name="computer" color="#25D366" size={18} /> ZapBot
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
                icon: "bolt" as IconName,
                color: "#16c784",
                color2: "#25D366",
                label: "Você se paga em",
                stat: `~${paybackDays}`,
                statSub: "dias",
                detail: "vs. ferramenta mais barata da lista",
              },
              {
                icon: "coins" as IconName,
                color: "#a78bfa",
                color2: "#6366f1",
                label: "Economia média em 1 ano",
                stat: `R$ ${formatBRL(savings)}`,
                detail: "média das ferramentas comparadas acima",
              },
              {
                icon: "fire" as IconName,
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
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: `linear-gradient(135deg, ${c.color}25, ${c.color2}10)`,
                    border: `1px solid ${c.color}40`,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 0.65rem",
                  }}
                >
                  <Icon name={c.icon} color={c.color} size={22} />
                </div>
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
const BONUSES: { icon: IconName; color: string; title: string; value: string }[] = [
  {
    icon: "computer",
    color: "#25D366",
    title: "ZapBot — app completo Windows",
    value: "R$ 297",
  },
  {
    icon: "sparkles",
    color: "#a855f7",
    title: "IA local incluída (Qwen 2.5) — sem custo extra de API",
    value: "R$ 1.188/ano grátis",
  },
  {
    icon: "clock",
    color: "#0ea5e9",
    title: "Agendamento de mensagens ilimitado",
    value: "R$ 480/ano grátis",
  },
  {
    icon: "download",
    color: "#16c784",
    title: "Atualizações grátis por 1 ano",
    value: "R$ 240",
  },
  {
    icon: "send",
    color: "#f59e0b",
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
              <span
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  background: `${b.color}20`,
                  border: `1px solid ${b.color}40`,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon name={b.icon} color={b.color} size={18} />
              </span>
              <span style={{ flex: 1, color: "#c8d4e8", fontSize: "0.92rem", display: "inline-flex", alignItems: "center", gap: 6 }}>
                <Icon name="check" color="#16c784" size={14} />
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
            {loading ? (
              "Redirecionando..."
            ) : (
              <>
                Garantir meu ZapBot agora
                <Icon name="arrow" color="#fff" size={18} />
              </>
            )}
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
            <span
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "rgba(22,199,132,0.15)",
                border: "1px solid rgba(22,199,132,0.35)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon name="shield" color="#16c784" size={20} />
            </span>
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
    <>
      <style>{`
        .vs-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
          position: relative;
        }
        @media (min-width: 880px) {
          .vs-grid { grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        }
        .vs-row {
          display: grid;
          grid-template-columns: 24px 1fr;
          gap: 0.7rem;
          align-items: flex-start;
          padding: 0.7rem 0;
          border-top: 1px dashed rgba(255,255,255,0.06);
          font-size: 0.92rem;
        }
        .vs-row:first-child { border-top: none; padding-top: 0; }
      `}</style>

      <section style={{ padding: "4rem 1.25rem", background: "var(--bg2)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.25rem" }}>
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
                marginBottom: "0.85rem",
              }}
            >
              Local vs Nuvem
            </span>
            <h2
              style={{
                fontSize: "clamp(1.7rem, 3.2vw, 2.4rem)",
                fontWeight: 900,
                marginBottom: "0.5rem",
                letterSpacing: "-0.01em",
              }}
            >
              Por que rodar{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#16c784,#25D366)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                no seu PC
              </span>
              {" "}em vez da nuvem?
            </h2>
            <p style={{ textAlign: "center", color: "#8394b0", fontSize: "0.95rem" }}>
              A maioria dos chatbots cobra mensalidade e guarda suas conversas. O ZapBot não.
            </p>
          </div>

          <div className="vs-grid">
            {/* ZAPBOT card (winner) */}
            <div
              className="stat-card"
              style={{
                borderColor: "rgba(37,211,102,0.5)",
                background: `
                  radial-gradient(circle at 0% 0%, rgba(37,211,102,0.18) 0%, transparent 55%),
                  linear-gradient(180deg, rgba(37,211,102,0.08) 0%, rgba(0,0,0,0.2) 100%)
                `,
                animationDelay: "0ms",
                padding: "1.75rem 1.6rem",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(37,211,102,0.8)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(37,211,102,0.25)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(37,211,102,0.5)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "linear-gradient(135deg,#25D366,#16c784)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 8px 24px rgba(37,211,102,0.35)",
                  }}
                >
                  <Icon name="computer" color="#fff" size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: 900, color: "#25D366", fontSize: "1.15rem", display: "flex", alignItems: "center", gap: 8 }}>
                    ZapBot
                    <span style={{ background: "linear-gradient(135deg,#16c784,#25D366)", color: "#0a0b14", fontSize: "0.6rem", padding: "3px 8px", borderRadius: 999, fontWeight: 900, letterSpacing: "0.04em" }}>
                      RECOMENDADO
                    </span>
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#a7f3d0" }}>roda no seu PC</div>
                </div>
              </div>
              <div>
                {COMPARISON_ROWS.map((row) => (
                  <div key={row.label} className="vs-row">
                    <div style={{ marginTop: 2, display: "inline-flex" }}>
                      <Icon name="check" color="#16c784" size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: "#eef2f9", fontSize: "0.88rem" }}>{row.label}</div>
                      <div style={{ color: "#a7f3d0", fontSize: "0.82rem", marginTop: 2 }}>{row.zapbot}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CLOUD card (loser) */}
            <div
              className="stat-card"
              style={{
                borderColor: "rgba(239,68,68,0.25)",
                background: `
                  radial-gradient(circle at 100% 0%, rgba(239,68,68,0.10) 0%, transparent 55%),
                  linear-gradient(180deg, rgba(255,255,255,0.025) 0%, rgba(0,0,0,0.2) 100%)
                `,
                animationDelay: "100ms",
                padding: "1.75rem 1.6rem",
                opacity: 0.92,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(239,68,68,0.5)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(239,68,68,0.15)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(239,68,68,0.25)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "linear-gradient(135deg, rgba(239,68,68,0.2), rgba(251,146,60,0.1))",
                    border: "1px solid rgba(239,68,68,0.3)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon name="cloud" color="#ef4444" size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, color: "#fca5a5", fontSize: "1.15rem" }}>
                    Bots na nuvem
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#6b7a94" }}>Manychat, ChatGPT, Take Blip…</div>
                </div>
              </div>
              <div>
                {COMPARISON_ROWS.map((row) => (
                  <div key={row.label} className="vs-row">
                    <div style={{ marginTop: 2, display: "inline-flex" }}>
                      <Icon name="x" color="#ef4444" size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: "#c8d4e8", fontSize: "0.88rem", opacity: 0.85 }}>{row.label}</div>
                      <div style={{ color: "#8394b0", fontSize: "0.82rem", marginTop: 2 }}>{row.cloud}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p style={{ marginTop: "1.5rem", fontSize: "0.74rem", color: "#4e5c72", textAlign: "center" }}>
            *Comparação baseada em planos médios de bots na nuvem (Manychat, ChatGPT Plus + API). Valores podem variar.
          </p>
        </div>
      </section>
    </>
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
    bot: "Sim! Aceitamos cartão em até 12x sem juros. Quer que eu te mande o link de pagamento?",
  },
  {
    customer: "Tem desconto à vista?",
    bot: "Tem! Pra fechar agora libero 10% no Pix. Posso te enviar o link com desconto?",
  },
  {
    customer: "Quero falar com um atendente",
    bot: "Claro! Já chamei a equipe pra você. Em alguns minutos alguém te responde por aqui.",
  },
  {
    customer: "Estou só pesquisando ainda",
    bot: "Tranquilo. Posso te mandar uns depoimentos rápidos de quem já comprou?",
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
          BOT ATIVO
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
                  Bot
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
        Demo rodando em loop — IA local respondendo em ~1.5s
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Reveal — fade + slide-up quando entra no viewport (scroll animation)
// ─────────────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, as: Tag = "div" }: { children: React.ReactNode; delay?: number; as?: "div" | "section" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement & HTMLElement>}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// PainPoints — mensagens não respondidas = vendas perdidas (emocional)
// ─────────────────────────────────────────────────────────────────────────
type PainMessage = {
  customer: string;
  initial: string;
  color: string;
  msg: string;
  time: string;
  loss: string;
};

const PAIN_MESSAGES: PainMessage[] = [
  {
    customer: "Cliente · Maria",
    initial: "M",
    color: "#f59e0b",
    msg: "Bom dia, vocês entregam hoje? Preciso até as 17h",
    time: "visto há 3h",
    loss: "Venda de R$ 240 perdida",
  },
  {
    customer: "Cliente · João",
    initial: "J",
    color: "#a855f7",
    msg: "Quanto fica esse modelo no Pix?",
    time: "visto há 8h",
    loss: "Venda de R$ 580 perdida",
  },
  {
    customer: "Cliente · Renata",
    initial: "R",
    color: "#ef4444",
    msg: "Tô com o cartão na mão, ainda dá pra hoje?",
    time: "visto ontem",
    loss: "Venda de R$ 1.290 perdida",
  },
  {
    customer: "Cliente · Pedro",
    initial: "P",
    color: "#fb923c",
    msg: "Posso parcelar em 6x sem juros?",
    time: "visto há 14h",
    loss: "Venda de R$ 890 perdida",
  },
];

function PainPoints() {
  return (
    <>
      <style>{`
        .pain-grid { display:grid; grid-template-columns:1fr; gap:1rem; }
        @media (min-width: 640px) { .pain-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 980px) { .pain-grid { grid-template-columns: repeat(4, 1fr); gap:0.9rem; } }
      `}</style>

      <section style={{ padding: "4.5rem 1.25rem 4rem", background: "var(--bg2)", position: "relative", overflow: "hidden" }}>
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "20%",
            left: "-15%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(239,68,68,0.07), transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.25)",
                  color: "#fca5a5",
                  borderRadius: 20,
                  padding: "0.3rem 1rem",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  marginBottom: "1rem",
                }}
              >
                <Icon name="x" color="#ef4444" size={12} />
                A dor real do pequeno negócio
              </span>
              <h2
                style={{
                  fontSize: "clamp(1.7rem, 3.4vw, 2.5rem)",
                  fontWeight: 900,
                  marginBottom: "0.6rem",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.1,
                }}
              >
                Toda mensagem não respondida{" "}
                <span style={{ background: "linear-gradient(135deg,#ef4444,#fb923c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  é dinheiro indo embora
                </span>
              </h2>
              <p style={{ color: "#8394b0", fontSize: "0.98rem", maxWidth: 620, margin: "0 auto", lineHeight: 1.55 }}>
                Você fecha o app pra dormir, almoçar ou cuidar de outra coisa — e o cliente que tava prestes a comprar simplesmente desiste.
              </p>
            </div>
          </Reveal>

          <div className="pain-grid">
            {PAIN_MESSAGES.map((p, i) => (
              <Reveal key={p.customer} delay={i * 90}>
                <div
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.025) 0%, rgba(0,0,0,0.2) 100%)",
                    border: "1px solid rgba(239,68,68,0.18)",
                    borderRadius: 14,
                    padding: "1rem 1.1rem 1.1rem",
                    transition: "transform 0.25s ease, border-color 0.25s ease",
                  }}
                >
                  {/* Header chat */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.7rem" }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${p.color}, ${p.color}aa)`,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800,
                        color: "#fff",
                        fontSize: "0.88rem",
                        flexShrink: 0,
                      }}
                    >
                      {p.initial}
                    </div>
                    <div style={{ flex: 1, fontSize: "0.78rem", color: "#8394b0", fontWeight: 600 }}>
                      {p.customer}
                    </div>
                  </div>

                  {/* Mensagem em bolha WhatsApp */}
                  <div
                    style={{
                      background: "#202c33",
                      color: "#e9edef",
                      borderRadius: "10px 10px 10px 2px",
                      padding: "0.6rem 0.75rem",
                      fontSize: "0.86rem",
                      lineHeight: 1.4,
                      marginBottom: "0.6rem",
                      boxShadow: "0 1px 0 rgba(0,0,0,0.25)",
                    }}
                  >
                    {p.msg}
                  </div>

                  {/* Footer "visto há" + perda */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 8,
                      fontSize: "0.74rem",
                    }}
                  >
                    <span style={{ color: "#6b7a94", display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <Icon name="clock" color="#6b7a94" size={11} />
                      {p.time}
                    </span>
                    <span
                      style={{
                        color: "#fca5a5",
                        fontWeight: 700,
                        background: "rgba(239,68,68,0.1)",
                        border: "1px solid rgba(239,68,68,0.25)",
                        padding: "2px 8px",
                        borderRadius: 999,
                      }}
                    >
                      {p.loss}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400}>
            <div
              style={{
                marginTop: "2rem",
                textAlign: "center",
                fontSize: "1.05rem",
                color: "#eef2f9",
                fontWeight: 700,
                padding: "1.15rem 1.5rem",
                background: "linear-gradient(135deg, rgba(239,68,68,0.08), rgba(251,146,60,0.04))",
                border: "1px solid rgba(239,68,68,0.2)",
                borderRadius: 14,
                maxWidth: 640,
                margin: "2rem auto 0",
              }}
            >
              <span style={{ color: "#fca5a5" }}>R$ 3.000+ por mês</span> escorrendo pelos dedos por falta de atendimento fora de hora.{" "}
              <span style={{ color: "#25D366" }}>Resolvemos isso por R$ 97.</span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// AppPreview — mockup CSS rico do app rodando (mostra a tecnologia)
// ─────────────────────────────────────────────────────────────────────────
function AppPreview() {
  return (
    <>
      <style>{`
        .app-mockup-grid {
          display: grid;
          grid-template-columns: 60px 200px 1fr 240px;
          height: 460px;
          background: #0b141a;
        }
        @media (max-width: 880px) {
          .app-mockup-grid { grid-template-columns: 50px 1fr; height: 380px; }
          .app-mockup-conv, .app-mockup-rules { display: none !important; }
        }
      `}</style>

      <section style={{ padding: "4.5rem 1.25rem", background: "var(--bg)", position: "relative", overflow: "hidden" }}>
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "10%",
            right: "-15%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,211,102,0.12), transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "rgba(37,211,102,0.1)",
                  border: "1px solid rgba(37,211,102,0.25)",
                  color: "#25D366",
                  borderRadius: 20,
                  padding: "0.3rem 1rem",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  marginBottom: "1rem",
                }}
              >
                <Icon name="computer" color="#25D366" size={12} />
                Por dentro do app
              </span>
              <h2
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                  fontWeight: 900,
                  marginBottom: "0.6rem",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.1,
                }}
              >
                Tudo em{" "}
                <span style={{ background: "linear-gradient(135deg,#16c784,#25D366)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  uma tela só
                </span>
                . Sem código.
              </h2>
              <p style={{ color: "#8394b0", fontSize: "0.98rem", maxWidth: 620, margin: "0 auto", lineHeight: 1.55 }}>
                Conversas à esquerda, IA respondendo no centro, suas regras de atendimento à direita.
                Você vê tudo o que o bot fez em tempo real.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div
              style={{
                position: "relative",
                borderRadius: 14,
                overflow: "hidden",
                border: "1px solid rgba(37,211,102,0.25)",
                boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset",
                background: "#0b141a",
              }}
            >
              {/* Window chrome */}
              <div
                style={{
                  background: "#161b27",
                  padding: "0.6rem 0.9rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                  <span key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c, display: "inline-block" }} />
                ))}
                <span
                  style={{
                    flex: 1,
                    background: "rgba(255,255,255,0.04)",
                    borderRadius: 6,
                    padding: "0.22rem 0.85rem",
                    fontSize: "0.76rem",
                    color: "#6b7a94",
                    marginLeft: "0.5rem",
                    textAlign: "center",
                    fontFamily: "ui-monospace, monospace",
                  }}
                >
                  ZapBot · localhost — atendendo 1.247 contas
                </span>
                <span style={{ fontSize: "0.7rem", color: "#16c784", display: "inline-flex", alignItems: "center", gap: 4, fontWeight: 700 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#16c784", display: "inline-block", animation: "pulseDot 1.6s ease-in-out infinite" }} />
                  conectado
                </span>
              </div>

              {/* Grid principal: nav | conversas | chat | regras */}
              <div className="app-mockup-grid">
                {/* Nav icons */}
                <div style={{ background: "#075E54", padding: "1rem 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.2rem" }}>
                  {[
                    { i: "send", on: true },
                    { i: "clock", on: false },
                    { i: "gear", on: false },
                    { i: "shield", on: false },
                  ].map((it, idx) => (
                    <div
                      key={idx}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 9,
                        background: it.on ? "rgba(255,255,255,0.15)" : "transparent",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon name={it.i as IconName} color={it.on ? "#fff" : "rgba(255,255,255,0.6)"} size={20} />
                    </div>
                  ))}
                </div>

                {/* Lista de conversas */}
                <div className="app-mockup-conv" style={{ background: "#fff", color: "#111", overflow: "hidden" }}>
                  <div style={{ background: "#f0f2f5", padding: "0.65rem 0.85rem", borderBottom: "1px solid #e2e8f0", fontWeight: 700, fontSize: "0.82rem", color: "#111b21" }}>
                    Conversas
                  </div>
                  {[
                    { name: "Maria Costa", msg: "Vocês entregam ainda hoje?", time: "agora", badge: 1, active: true, bot: true },
                    { name: "João Silva", msg: "Beleza, obrigado pela ajuda!", time: "10:14", badge: 0, active: false, bot: true },
                    { name: "Ana Souza", msg: "Quero falar com atendente", time: "09:42", badge: 0, active: false, bot: false, esc: true },
                    { name: "Pedro Lima", msg: "Como é o frete pro RJ?", time: "ontem", badge: 0, active: false, bot: true },
                    { name: "Carla R.", msg: "Tem desconto à vista?", time: "ontem", badge: 0, active: false, bot: true },
                  ].map((c) => (
                    <div
                      key={c.name}
                      style={{
                        padding: "0.65rem 0.85rem",
                        borderBottom: "1px solid #f1f5f9",
                        background: c.active ? "#f1f5f9" : "transparent",
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "0.78rem", fontWeight: 600 }}>{c.name}</span>
                        <span style={{ fontSize: "0.66rem", color: "#64748b" }}>{c.time}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 2 }}>
                        <span style={{ fontSize: "0.72rem", color: "#475569", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 130 }}>{c.msg}</span>
                        <span style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: 6 }}>
                          {c.esc && <span style={{ color: "#ef4444", fontSize: "0.66rem", fontWeight: 700 }}>ESC</span>}
                          {c.bot && <span style={{ color: "#16a34a", fontSize: "0.6rem", fontWeight: 700, background: "rgba(22,199,132,0.15)", padding: "1px 5px", borderRadius: 4 }}>BOT</span>}
                          {c.badge > 0 && (
                            <span style={{ background: "#25D366", color: "#fff", fontSize: "0.6rem", borderRadius: 999, padding: "1px 6px", fontWeight: 800 }}>{c.badge}</span>
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat principal */}
                <div style={{ background: "#0b141a", display: "flex", flexDirection: "column" }}>
                  <div style={{ background: "#1f2c34", padding: "0.65rem 0.9rem", borderBottom: "1px solid rgba(255,255,255,0.05)", fontWeight: 700, fontSize: "0.84rem", color: "#e9edef", display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#f59e0b,#fb923c)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "0.85rem" }}>M</div>
                    <div style={{ flex: 1 }}>
                      <div>Maria Costa</div>
                      <div style={{ fontSize: "0.7rem", opacity: 0.75, color: "#8696a0", fontWeight: 500 }}>online · bot ativo</div>
                    </div>
                    <span style={{ background: "rgba(37,211,102,0.18)", color: "#a7f3d0", fontSize: "0.65rem", padding: "3px 8px", borderRadius: 999, fontWeight: 700 }}>BOT RESPONDENDO</span>
                  </div>
                  <div style={{ flex: 1, padding: "0.85rem 1rem", display: "flex", flexDirection: "column", gap: 7, background: "linear-gradient(180deg, #0b141a 0%, #07111a 100%)" }}>
                    <ChatBubble side="in" text="Oi! Vocês entregam ainda hoje?" />
                    <ChatBubble side="out" bot text="Olá Maria! Pra entrega hoje precisamos do pedido confirmado até 15h. Qual o CEP da entrega?" />
                    <ChatBubble side="in" text="04543-000" />
                    <ChatBubble side="out" bot text="Pra esse CEP o frete é grátis e chega ainda hoje. Quer que eu te mande o link de pagamento?" meta="• respondido em 1.4s · IA local" />
                  </div>
                </div>

                {/* Regras */}
                <div className="app-mockup-rules" style={{ background: "#0a1219", borderLeft: "1px solid rgba(255,255,255,0.05)", padding: "0.85rem", overflow: "hidden" }}>
                  <div style={{ fontSize: "0.7rem", color: "#6b7a94", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.7rem" }}>
                    Regras ativas
                  </div>
                  {[
                    "Sempre pergunte o CEP antes de dar o preço final.",
                    "Se cliente pedir desconto, ofereça 10% no Pix.",
                    'Se cliente disser "atendente" ou "humano", pause o bot.',
                    "Não fale de produtos da concorrência.",
                    "Sempre confirme o pedido antes de gerar o link.",
                  ].map((r, i) => (
                    <div
                      key={i}
                      style={{
                        background: "rgba(37,211,102,0.06)",
                        border: "1px solid rgba(37,211,102,0.18)",
                        borderRadius: 8,
                        padding: "0.5rem 0.65rem",
                        marginBottom: "0.45rem",
                        fontSize: "0.74rem",
                        color: "#c8d4e8",
                        lineHeight: 1.4,
                        display: "flex",
                        gap: 6,
                        alignItems: "flex-start",
                      }}
                    >
                      <span style={{ flexShrink: 0, marginTop: 1 }}>
                        <Icon name="check" color="#16c784" size={12} />
                      </span>
                      <span>{r}</span>
                    </div>
                  ))}
                  <button
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px dashed rgba(255,255,255,0.15)",
                      borderRadius: 8,
                      padding: "0.5rem",
                      color: "#8394b0",
                      fontSize: "0.74rem",
                      cursor: "pointer",
                      marginTop: 4,
                    }}
                  >
                    + Adicionar regra
                  </button>
                </div>
              </div>

              {/* Footer status bar */}
              <div
                style={{
                  background: "#0a1219",
                  padding: "0.45rem 0.9rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "0.7rem",
                  color: "#6b7a94",
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                  fontFamily: "ui-monospace, monospace",
                }}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16c784", display: "inline-block" }} />
                  Qwen 2.5 · 7B · 4.2GB carregado
                </span>
                <span>respondidas hoje: 38.917 · tempo médio: 1.4s</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ChatBubble({ side, text, bot = false, meta }: { side: "in" | "out"; text: string; bot?: boolean; meta?: string }) {
  const isOut = side === "out";
  return (
    <div style={{ alignSelf: isOut ? "flex-end" : "flex-start", maxWidth: "78%" }}>
      <div
        style={{
          background: isOut ? "#005c4b" : "#202c33",
          color: "#e9edef",
          borderRadius: isOut ? "10px 10px 2px 10px" : "10px 10px 10px 2px",
          padding: "0.5rem 0.7rem",
          fontSize: "0.84rem",
          lineHeight: 1.4,
          boxShadow: "0 1px 0 rgba(0,0,0,0.25)",
        }}
      >
        {bot && (
          <div style={{ fontSize: "0.62rem", color: "#a7f3d0", fontWeight: 700, marginBottom: 2 }}>
            BOT
          </div>
        )}
        {text}
      </div>
      {meta && (
        <div style={{ fontSize: "0.62rem", color: "#6b7a94", marginTop: 3, textAlign: isOut ? "right" : "left", paddingInline: 4 }}>
          {meta}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Testimonials — social proof com cards de depoimentos
// ─────────────────────────────────────────────────────────────────────────
type Testimonial = {
  initial: string;
  color: string;
  color2: string;
  name: string;
  business: string;
  quote: string;
  highlight?: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    initial: "M",
    color: "#25D366",
    color2: "#16c784",
    name: "Marcos Andrade",
    business: "Loja de roupas femininas · São Paulo",
    quote: "Antes eu perdia umas 3 vendas por noite porque ninguém respondia depois das 18h. Agora o ZapBot responde sozinho e fechamos pedido até 23h.",
    highlight: "+R$ 4.200/mês em vendas noturnas",
  },
  {
    initial: "F",
    color: "#a855f7",
    color2: "#6366f1",
    name: "Fernanda Costa",
    business: "Distribuidora de produtos naturais",
    quote: "Pagava R$ 800/mês num chatbot que vivia caindo. Trocamos pelo ZapBot e em 2 dias eu já tinha pago o investimento de volta.",
    highlight: "Economia de R$ 9.600/ano",
  },
  {
    initial: "R",
    color: "#f59e0b",
    color2: "#ef4444",
    name: "Renato Silva",
    business: "Mecânica de motos · Belo Horizonte",
    quote: "Configurei em 10 minutos sem saber programar. Hoje 80% dos clientes que me chamam no WhatsApp são atendidos sem eu precisar tocar no celular.",
    highlight: "80% dos atendimentos automáticos",
  },
];

function Testimonials() {
  return (
    <>
      <style>{`
        .test-grid { display:grid; grid-template-columns:1fr; gap:1.1rem; }
        @media (min-width: 720px) { .test-grid { grid-template-columns:1fr 1fr; gap:1.25rem; } }
        @media (min-width: 1040px) { .test-grid { grid-template-columns:repeat(3, 1fr); } }
      `}</style>

      <section style={{ padding: "4rem 1.25rem", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.25rem" }}>
            <span
              style={{
                display: "inline-block",
                background: "rgba(168,85,247,0.1)",
                border: "1px solid rgba(168,85,247,0.25)",
                color: "#a78bfa",
                borderRadius: 20,
                padding: "0.3rem 1rem",
                fontSize: "0.78rem",
                fontWeight: 700,
                marginBottom: "0.85rem",
              }}
            >
              Quem já usa
            </span>
            <h2
              style={{
                fontSize: "clamp(1.7rem, 3.2vw, 2.4rem)",
                fontWeight: 900,
                marginBottom: "0.5rem",
                letterSpacing: "-0.01em",
              }}
            >
              Pequenos negócios que{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#16c784,#25D366)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                pararam de perder cliente
              </span>
            </h2>
            <p style={{ textAlign: "center", color: "#8394b0", fontSize: "0.95rem" }}>
              Quem instalou ontem está vendendo no automático hoje.
            </p>
          </div>

          <div className="test-grid">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.name}
                className="stat-card"
                style={{
                  borderColor: `${t.color}33`,
                  animationDelay: `${i * 90}ms`,
                  background: `
                    radial-gradient(circle at 100% 0%, ${t.color}1a 0%, transparent 55%),
                    linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.2) 100%)
                  `,
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  padding: "1.6rem 1.5rem 1.4rem",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${t.color}80`;
                  e.currentTarget.style.boxShadow = `0 12px 40px ${t.color}25`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${t.color}33`;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Stars */}
                <div style={{ display: "flex", gap: 3 }}>
                  {[0, 1, 2, 3, 4].map((s) => (
                    <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p
                  style={{
                    color: "#c8d4e8",
                    fontSize: "0.92rem",
                    lineHeight: 1.55,
                    fontStyle: "italic",
                    margin: 0,
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Highlight metric */}
                {t.highlight && (
                  <div
                    style={{
                      background: `${t.color}15`,
                      border: `1px solid ${t.color}30`,
                      borderRadius: 10,
                      padding: "0.6rem 0.85rem",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      color: t.color,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      width: "fit-content",
                    }}
                  >
                    <Icon name="sparkles" color={t.color} size={14} />
                    {t.highlight}
                  </div>
                )}

                {/* Avatar + nome */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    paddingTop: "0.85rem",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    marginTop: "auto",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${t.color}, ${t.color2})`,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 900,
                      fontSize: "1.1rem",
                      color: "#fff",
                      flexShrink: 0,
                    }}
                  >
                    {t.initial}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#eef2f9", fontSize: "0.92rem" }}>{t.name}</div>
                    <div style={{ color: "#6b7a94", fontSize: "0.76rem" }}>{t.business}</div>
                  </div>
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
// FAQ — accordion para reduzir objeções comuns antes da compra
// ─────────────────────────────────────────────────────────────────────────
const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "Vou ser banido do WhatsApp?",
    a: "Não. O ZapBot usa o protocolo WhatsApp Web nativo (Baileys) — o mesmo que o WhatsApp oficial usa quando você abre o web.whatsapp.com. Limitamos automaticamente em 30 mensagens por hora pra ficar dentro do uso considerado humano. Quem usa há mais de 1 ano nunca foi banido.",
  },
  {
    q: "Funciona realmente offline?",
    a: "A IA roda 100% no seu PC (Ollama + modelo Qwen 2.5). A única coisa que precisa de internet é o próprio WhatsApp Web pra enviar/receber mensagens — igual quando você usa no navegador. Suas conversas, regras e dados ficam só na sua máquina.",
  },
  {
    q: "Preciso saber programar?",
    a: 'Não. Você escreve as regras em português, como se estivesse explicando pra um funcionário. Exemplo: "sempre pergunte o CEP antes de dar o preço" ou "se o cliente pedir desconto, ofereça 10% no Pix". O bot segue cada regra na hora de responder.',
  },
  {
    q: "Posso usar com mais de um número?",
    a: "Sim. Cada licença vale pra um número, mas você pode rodar várias instâncias do app no mesmo PC — uma pra cada número. Se quiser muitos números, fala com a gente que fazemos preço especial.",
  },
  {
    q: "Como recebo as atualizações?",
    a: "O ZapBot tem auto-update integrado. Quando saímos uma nova versão (correções, melhorias, novos features), o app baixa e instala sozinho na próxima vez que você abre. Atualizações são gratuitas por 1 ano.",
  },
  {
    q: "E se eu não gostar?",
    a: "Você tem 7 dias de garantia total. Se não gostou por qualquer motivo (não entendeu, achou complicado, mudou de ideia), manda um e-mail e devolvemos 100% do valor. Sem perguntas, sem burocracia.",
  },
];

function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section style={{ padding: "4rem 1.25rem", background: "var(--bg2)" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2.25rem" }}>
          <span
            style={{
              display: "inline-block",
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.25)",
              color: "#a78bfa",
              borderRadius: 20,
              padding: "0.3rem 1rem",
              fontSize: "0.78rem",
              fontWeight: 700,
              marginBottom: "0.85rem",
            }}
          >
            Perguntas frequentes
          </span>
          <h2
            style={{
              fontSize: "clamp(1.7rem, 3.2vw, 2.4rem)",
              fontWeight: 900,
              marginBottom: "0.5rem",
              letterSpacing: "-0.01em",
            }}
          >
            As 6 dúvidas que{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#16c784,#25D366)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              todo mundo tem
            </span>
          </h2>
          <p style={{ color: "#8394b0", fontSize: "0.95rem" }}>
            Respondidas direto, sem enrolação.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={item.q}
                style={{
                  background: isOpen
                    ? "linear-gradient(180deg, rgba(37,211,102,0.06) 0%, rgba(0,0,0,0.15) 100%)"
                    : "linear-gradient(180deg, rgba(255,255,255,0.025) 0%, rgba(0,0,0,0.15) 100%)",
                  border: isOpen
                    ? "1px solid rgba(37,211,102,0.4)"
                    : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 14,
                  overflow: "hidden",
                  transition: "border-color 0.2s, background 0.2s",
                }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    padding: "1.05rem 1.25rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                    cursor: "pointer",
                    textAlign: "left",
                    color: "#eef2f9",
                    fontSize: "0.97rem",
                    fontWeight: 700,
                    fontFamily: "inherit",
                  }}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <span
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: isOpen ? "rgba(37,211,102,0.2)" : "rgba(255,255,255,0.05)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "transform 0.25s, background 0.2s",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      color: isOpen ? "#25D366" : "#8394b0",
                      fontSize: "1.2rem",
                      fontWeight: 300,
                      lineHeight: 1,
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  style={{
                    maxHeight: isOpen ? "500px" : "0px",
                    overflow: "hidden",
                    transition: "max-height 0.35s ease",
                  }}
                >
                  <div
                    style={{
                      padding: "0 1.25rem 1.15rem",
                      color: "#a3b3cc",
                      fontSize: "0.9rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p
          style={{
            marginTop: "1.5rem",
            fontSize: "0.83rem",
            color: "#8394b0",
            textAlign: "center",
          }}
        >
          Outra dúvida?{" "}
          <a
            href="mailto:contato@iaempresa.app"
            style={{ color: "#25D366", textDecoration: "underline" }}
          >
            contato@iaempresa.app
          </a>
        </p>
      </div>
    </section>
  );
}
