"use client";
import { useEffect, useState } from "react";

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

const features = [
  {
    color: "#16c784",
    bg: "rgba(22,199,132,0.08)",
    border: "rgba(22,199,132,0.2)",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="9" fill="rgba(22,199,132,0.15)" />
        <path
          d="M16 5l3.4 7 7.6 1.1-5.5 5.3 1.3 7.5L16 22.5l-6.8 3.4 1.3-7.5L5 13.1l7.6-1.1L16 5z"
          fill="#16c784"
        />
      </svg>
    ),
    title: "100% local — sem mensalidade de IA",
    desc:
      "A IA roda na sua máquina (Ollama + Qwen). Não envia mensagens pra ChatGPT, Claude, OpenAI. Sem custo por token, sem limite de uso.",
  },
  {
    color: "#25D366",
    bg: "rgba(37,211,102,0.08)",
    border: "rgba(37,211,102,0.2)",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="9" fill="#25D366" />
        <path
          d="M22 18.5c-.3-.2-1.8-.9-2-1s-.5-.2-.7.1c-.2.3-.8 1-1 1.2s-.4.2-.7 0c-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.2 3.3 5.3 4.6 2.6 1.1 3.1.9 3.7.8.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.4z"
          fill="white"
        />
      </svg>
    ),
    title: "Conecta no WhatsApp sem Chromium",
    desc:
      "Usa o protocolo WhatsApp Web nativo (Baileys). Não abre navegador, não consome 2GB de RAM, não trava. Escaneia o QR code uma vez e pronto.",
  },
  {
    color: "#a855f7",
    bg: "rgba(168,85,247,0.08)",
    border: "rgba(168,85,247,0.2)",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="9" fill="rgba(168,85,247,0.15)" />
        <circle cx="16" cy="16" r="8" stroke="#a855f7" strokeWidth="2.2" fill="none" />
        <path d="M16 11v5l3.5 2.5" stroke="#a855f7" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
    title: "Agenda mensagens — únicas ou recorrentes",
    desc:
      "Envie lembretes, follow-ups, campanhas. Escolhe data e hora, ou repete toda segunda às 9h. Limite de 30 msgs/hora para não ser banido.",
  },
  {
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.2)",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="9" fill="rgba(245,158,11,0.15)" />
        <path
          d="M16 6L4 26h24L16 6z"
          stroke="#f59e0b"
          strokeWidth="2.2"
          fill="none"
          strokeLinejoin="round"
        />
        <path d="M16 13v6M16 22h.01" stroke="#f59e0b" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    ),
    title: "Escala pra você quando o cliente pede",
    desc:
      "Definiu \"atendente\", \"falar com humano\", ou um regex personalizado? O bot pausa, envia uma resposta padrão e te notifica. Você assume o controle.",
  },
  {
    color: "#6366f1",
    bg: "rgba(99,102,241,0.08)",
    border: "rgba(99,102,241,0.2)",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="9" fill="rgba(99,102,241,0.15)" />
        <path
          d="M8 10h16M8 16h16M8 22h10"
          stroke="#6366f1"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Treina em linguagem natural",
    desc:
      "Sem prompts engineering ou fine-tuning. Você escreve regras como \"sempre pergunte o CEP antes de dar preço\" — o bot segue cada uma na hora de responder.",
  },
  {
    color: "#0ea5e9",
    bg: "rgba(14,165,233,0.08)",
    border: "rgba(14,165,233,0.2)",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="9" fill="rgba(14,165,233,0.15)" />
        <ellipse cx="16" cy="9" rx="9" ry="3" stroke="#0ea5e9" strokeWidth="2.2" fill="none" />
        <path
          d="M7 9v14c0 1.7 4 3 9 3s9-1.3 9-3V9"
          stroke="#0ea5e9"
          strokeWidth="2.2"
          fill="none"
        />
        <path d="M7 16c0 1.7 4 3 9 3s9-1.3 9-3" stroke="#0ea5e9" strokeWidth="2.2" fill="none" />
      </svg>
    ),
    title: "Suas conversas ficam no seu PC",
    desc:
      "Banco SQLite local com histórico de tudo. Nada sobe pra nuvem. Você exporta, faz backup, deleta — sempre seu dado.",
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

      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(180deg,#0a0b14 0%,var(--bg) 100%)",
          padding: "4.5rem 1.5rem 3rem",
        }}
      >
        <div style={{ maxWidth: 980, margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(22,199,132,0.1)",
              border: "1px solid rgba(22,199,132,0.25)",
              color: "#16c784",
              borderRadius: 20,
              padding: "0.35rem 1rem",
              fontSize: "0.82rem",
              fontWeight: 700,
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#16c784",
                display: "inline-block",
              }}
            />
            100% offline · pagamento único · sem mensalidade
          </div>

          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              flexWrap: "wrap",
              justifyContent: "center",
              fontSize: "0.78rem",
              color: "#8394b0",
              marginBottom: "1.5rem",
            }}
          >
            <span>⏻ Bot ativo agora em <strong style={{ color: "#eef2f9" }}>+30 contas</strong></span>
            <span>·</span>
            <span>
              <strong style={{ color: "#eef2f9" }}>4.247</strong> mensagens respondidas hoje
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2.4rem,5vw,4rem)",
              fontWeight: 900,
              lineHeight: 1.07,
              marginBottom: "1.1rem",
            }}
          >
            Atendente de{" "}
            <span style={{ color: "#25D366" }}>WhatsApp</span> com{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#6366f1,#a855f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              IA local
            </span>
            <br />
            sem mensalidade e sem nuvem
          </h1>

          <p
            style={{
              fontSize: "1.1rem",
              color: "#8394b0",
              lineHeight: 1.7,
              maxWidth: 620,
              margin: "0 auto 2rem",
            }}
          >
            Instala no seu PC, escaneia o QR do WhatsApp e pronto — ele responde
            seus clientes 24h por dia usando uma IA que roda 100% offline.
            Agendamento de mensagens, escala pra você quando precisa, treina por
            regras em português.
          </p>

          {/* Primary purchase CTA */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1.5rem",
            }}
          >
            <button
              onClick={buy}
              disabled={loading}
              style={{
                ...BTN_PRIMARY,
                padding: "1.1rem 2.5rem",
                fontSize: "1.1rem",
                cursor: loading ? "wait" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Redirecionando..." : `🚀 Quero o ZapBot agora — R$ ${PRICE_BRL}`}
            </button>
            <div
              style={{
                fontSize: "0.85rem",
                color: "#8394b0",
                display: "flex",
                gap: "0.6rem",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span>
                <s style={{ color: "#4e5c72" }}>De R$ {ANCHOR_PRICE_BRL}</s>{" "}
                <strong style={{ color: "#16c784" }}>por R$ {PRICE_BRL}</strong>
              </span>
              <span>·</span>
              <span>💳 Pix, cartão ou boleto</span>
              <span>·</span>
              <span>🛡️ 7 dias de garantia</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "1.25rem",
              flexWrap: "wrap",
              justifyContent: "center",
              fontSize: "0.82rem",
              color: "#8394b0",
              fontWeight: 500,
              marginBottom: "3.5rem",
            }}
          >
            {[
              "Pagamento único",
              "Sem mensalidade nunca",
              "Sem ChatGPT/OpenAI",
              "Suas mensagens não saem do PC",
            ].map((t) => (
              <span key={t} style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <span style={{ color: "#16c784" }}>✓</span> {t}
              </span>
            ))}
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
              src="/zapbot-demo.mp4"
              poster="/zapbot-demo-poster.jpg"
              controls
              playsInline
              preload="metadata"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                background: "#0b141a",
              }}
            />
          </div>

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

      {/* Features */}
      <section style={{ padding: "4rem 1.5rem", background: "var(--bg2)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: "clamp(1.8rem,4vw,2.4rem)",
              fontWeight: 800,
              marginBottom: "0.6rem",
            }}
          >
            Por que o ZapBot é diferente
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "#8394b0",
              marginBottom: "3rem",
              fontSize: "1rem",
            }}
          >
            Atendente automatizado de verdade — sem aluguel de IA, sem servidor
            na nuvem, sem mensalidade.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
              gap: "1.1rem",
            }}
          >
            {features.map((f) => (
              <div
                key={f.title}
                style={{
                  background: f.bg,
                  border: `1px solid ${f.border}`,
                  borderRadius: 18,
                  padding: "1.5rem",
                }}
              >
                <div style={{ marginBottom: "0.9rem" }}>{f.icon}</div>
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: "1rem",
                    marginBottom: "0.4rem",
                    color: f.color,
                  }}
                >
                  {f.title}
                </h3>
                <p style={{ color: "#8394b0", fontSize: "0.88rem", lineHeight: 1.6 }}>
                  {f.desc}
                </p>
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
    n: "1",
    title: "Baixe e instale em 2 minutos",
    desc: "Baixa o instalador no botão acima, executa e o app abre. Tudo num arquivo só — não precisa configurar Python, Docker ou servidor.",
  },
  {
    n: "2",
    title: "Escaneie o QR do WhatsApp",
    desc: "Abra o WhatsApp do celular → Aparelhos conectados → Conectar aparelho. Escaneou, conectou. O modelo de IA é baixado automaticamente (~2GB, primeira vez).",
  },
  {
    n: "3",
    title: "Configure as regras e esqueça",
    desc: "Escreva em português o que o bot deve fazer (ex: \"sempre pergunte o CEP antes de dar preço\"). Ele segue. 24h por dia, sem você precisar tocar.",
  },
];

function HowItWorks() {
  return (
    <section id="como-funciona" style={{ padding: "5rem 1.5rem", background: "var(--bg)" }}>
      <div style={{ maxWidth: 740, margin: "0 auto" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "clamp(1.8rem,4vw,2.4rem)",
            fontWeight: 800,
            marginBottom: "0.6rem",
          }}
        >
          Do download ao primeiro atendimento em 10 minutos
        </h2>
        <p style={{ textAlign: "center", color: "#8394b0", marginBottom: "3.5rem" }}>
          Sem instalar Ollama, Python, Docker ou nada técnico. Funciona como qualquer app.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: 27,
              top: 48,
              bottom: 48,
              width: 2,
              background: "rgba(37,211,102,0.2)",
            }}
          />
          {STEPS.map((s) => (
            <div key={s.n} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#25D366,#128C7E)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: "1.1rem",
                  flexShrink: 0,
                  color: "#fff",
                  boxShadow: "0 0 0 4px rgba(37,211,102,0.15)",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {s.n}
              </div>
              <div style={{ paddingTop: "0.85rem" }}>
                <h3 style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.35rem" }}>
                  {s.title}
                </h3>
                <p style={{ color: "#8394b0", fontSize: "0.9rem", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
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

  return (
    <section style={{ padding: "5rem 1.5rem", background: "var(--bg)" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div
            style={{
              display: "inline-block",
              background: "rgba(22,199,132,0.1)",
              border: "1px solid rgba(22,199,132,0.25)",
              color: "#16c784",
              borderRadius: 20,
              padding: "0.3rem 1rem",
              fontSize: "0.8rem",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            💰 Pague uma vez. Use pra sempre.
          </div>
          <h2
            style={{
              fontSize: "clamp(1.8rem,4vw,2.4rem)",
              fontWeight: 800,
              marginBottom: "0.6rem",
            }}
          >
            Em 12 meses você economiza{" "}
            <span style={{ color: "#16c784" }}>R$ {formatBRL(savings)}</span>
          </h2>
          <p style={{ color: "#8394b0", fontSize: "1rem" }}>
            A maioria dos chatbots cobra todo mês — pra sempre. O ZapBot é{" "}
            <strong style={{ color: "#eef2f9" }}>1 pagamento</strong> de{" "}
            <strong style={{ color: "#16c784" }}>R$ 97</strong> e acabou.
          </p>
        </div>

        {/* Table — desktop */}
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--line)",
            borderRadius: 18,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.8fr 1fr 1.1fr 1.1fr",
              background: "rgba(255,255,255,0.03)",
              borderBottom: "1px solid var(--line)",
              fontWeight: 700,
              fontSize: "0.85rem",
              color: "#8394b0",
            }}
          >
            <div style={{ padding: "1rem 1.25rem" }}>Ferramenta</div>
            <div style={{ padding: "1rem 1.25rem", textAlign: "center" }}>Por mês</div>
            <div style={{ padding: "1rem 1.25rem", textAlign: "center" }}>Em 12 meses</div>
            <div style={{ padding: "1rem 1.25rem", textAlign: "center" }}>Em 24 meses</div>
          </div>

          {/* Monthly rows */}
          {MONTHLY_TOOLS.map((tool, i) => {
            const y1 = tool.monthly * 12;
            const y2 = tool.monthly * 24;
            return (
              <div
                key={tool.name}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.8fr 1fr 1.1fr 1.1fr",
                  borderTop: i === 0 ? "none" : "1px solid var(--line)",
                  fontSize: "0.92rem",
                  alignItems: "center",
                }}
              >
                <div style={{ padding: "0.95rem 1.25rem", color: "#c8d4e8" }}>
                  <div style={{ fontWeight: 600 }}>{tool.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "#4e5c72", marginTop: 2 }}>
                    {tool.note}
                  </div>
                </div>
                <div style={{ padding: "0.95rem 1.25rem", textAlign: "center", color: "#8394b0" }}>
                  R$ {formatBRL(tool.monthly)}<span style={{ fontSize: "0.75rem" }}>/mês</span>
                </div>
                <div
                  style={{
                    padding: "0.95rem 1.25rem",
                    textAlign: "center",
                    color: "#fb923c",
                    fontWeight: 600,
                  }}
                >
                  R$ {formatBRL(y1)}
                </div>
                <div
                  style={{
                    padding: "0.95rem 1.25rem",
                    textAlign: "center",
                    color: "#ef4444",
                    fontWeight: 700,
                  }}
                >
                  R$ {formatBRL(y2)}
                </div>
              </div>
            );
          })}

          {/* ZapBot highlight row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.8fr 1fr 1.1fr 1.1fr",
              borderTop: "2px solid rgba(37,211,102,0.4)",
              background:
                "linear-gradient(90deg, rgba(37,211,102,0.10), rgba(22,199,132,0.06))",
              alignItems: "center",
              fontSize: "0.95rem",
            }}
          >
            <div style={{ padding: "1.1rem 1.25rem" }}>
              <div
                style={{
                  fontWeight: 800,
                  color: "#25D366",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                ⏻ ZapBot
                <span
                  style={{
                    background: "rgba(22,199,132,0.18)",
                    color: "#16c784",
                    fontSize: "0.65rem",
                    padding: "2px 8px",
                    borderRadius: 999,
                    fontWeight: 700,
                  }}
                >
                  VITALÍCIO
                </span>
              </div>
              <div style={{ fontSize: "0.78rem", color: "#a7f3d0", marginTop: 2 }}>
                1 pagamento · sem mensalidade · sem reajuste
              </div>
            </div>
            <div
              style={{
                padding: "1.1rem 1.25rem",
                textAlign: "center",
                color: "#16c784",
                fontWeight: 700,
              }}
            >
              R$ 97<span style={{ fontSize: "0.75rem", color: "#a7f3d0" }}> única vez</span>
            </div>
            <div
              style={{
                padding: "1.1rem 1.25rem",
                textAlign: "center",
                color: "#16c784",
                fontWeight: 800,
                fontSize: "1.05rem",
              }}
            >
              R$ 97
            </div>
            <div
              style={{
                padding: "1.1rem 1.25rem",
                textAlign: "center",
                color: "#16c784",
                fontWeight: 800,
                fontSize: "1.05rem",
              }}
            >
              R$ 97
            </div>
          </div>
        </div>

        {/* Payback */}
        <div
          style={{
            marginTop: "1.75rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "1rem",
          }}
        >
          <div
            style={{
              background: "rgba(22,199,132,0.08)",
              border: "1px solid rgba(22,199,132,0.2)",
              borderRadius: 14,
              padding: "1.25rem",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "0.78rem", color: "#a7f3d0", marginBottom: 4 }}>
              Você se paga em
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#16c784" }}>
              ~{paybackDays} dias
            </div>
            <div style={{ fontSize: "0.72rem", color: "#8394b0", marginTop: 4 }}>
              vs. tool mais barata da lista
            </div>
          </div>

          <div
            style={{
              background: "rgba(99,102,241,0.08)",
              border: "1px solid rgba(99,102,241,0.2)",
              borderRadius: 14,
              padding: "1.25rem",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "0.78rem", color: "#c4b5fd", marginBottom: 4 }}>
              Economia média em 1 ano
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#a78bfa" }}>
              R$ {formatBRL(savings)}
            </div>
            <div style={{ fontSize: "0.72rem", color: "#8394b0", marginTop: 4 }}>
              média das ferramentas acima
            </div>
          </div>

          <div
            style={{
              background: "rgba(245,158,11,0.08)",
              border: "1px solid rgba(245,158,11,0.2)",
              borderRadius: 14,
              padding: "1.25rem",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "0.78rem", color: "#fde68a", marginBottom: 4 }}>
              Em 5 anos pagaria
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#f59e0b" }}>
              R$ {formatBRL(yearlyAvg * 5)}+
            </div>
            <div style={{ fontSize: "0.72rem", color: "#8394b0", marginTop: 4 }}>
              continuando na nuvem
            </div>
          </div>
        </div>

        <p
          style={{
            marginTop: "1.25rem",
            fontSize: "0.75rem",
            color: "#4e5c72",
            textAlign: "center",
          }}
        >
          *Valores médios dos planos iniciais em maio/2026. Algumas ferramentas têm fee de setup ou cobram por mensagem além da mensalidade.
        </p>
      </div>
    </section>
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
