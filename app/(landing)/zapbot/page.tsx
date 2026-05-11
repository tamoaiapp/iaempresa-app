"use client";
import { useEffect, useState } from "react";

const GH_OWNER = "tamoaiapp";
const GH_REPO = "zapbot";
const PRICE_BRL = 97;

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
                gap: "1rem",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <span>💳 Pix, cartão ou boleto</span>
              <span>·</span>
              <span>🔒 Pagamento único</span>
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

          {/* App mockup — CSS-only replica of ZapBot inbox */}
          <AppMockup />
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

      {/* Local vs cloud comparison */}
      <Comparison />

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
// App mockup — pure-CSS replica of the ZapBot inbox, no images required.
// Lives at the bottom of the hero to give visitors a sense of the product.
// ─────────────────────────────────────────────────────────────────────────
function AppMockup() {
  return (
    <div style={{ position: "relative", maxWidth: 980, margin: "0 auto" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(37,211,102,0.22) 0%, transparent 65%)",
          borderRadius: 20,
          pointerEvents: "none",
        }}
      />

      {/* Window chrome */}
      <div
        style={{
          background: "#161b27",
          border: "1px solid rgba(255,255,255,0.07)",
          borderBottom: "none",
          borderRadius: "16px 16px 0 0",
          padding: "0.55rem 1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <span
            key={c}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: c,
              display: "inline-block",
            }}
          />
        ))}
        <span
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.05)",
            borderRadius: 6,
            padding: "0.18rem 0.75rem",
            fontSize: "0.74rem",
            color: "#4e5c72",
            marginLeft: "0.5rem",
            textAlign: "center",
          }}
        >
          ZapBot — rodando localmente
        </span>
      </div>

      {/* 3-column app body */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "180px 240px 1fr",
          height: 380,
          border: "1px solid rgba(37,211,102,0.18)",
          borderTop: "none",
          borderRadius: "0 0 16px 16px",
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
          background: "#0b141a",
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            background: "#075E54",
            color: "#fff",
            padding: "1rem 0.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <div style={{ fontWeight: 800, fontSize: "0.95rem", marginBottom: "0.5rem" }}>
            <span style={{ color: "#25D366" }}>⏻</span> ZapBot
            <div style={{ fontSize: "0.65rem", opacity: 0.6, fontWeight: 400 }}>
              Atendente local
            </div>
          </div>
          {[
            { l: "Conversas", active: true },
            { l: "Agendamentos", active: false },
            { l: "Ajustar IA", active: false },
            { l: "Configurações", active: false },
          ].map((it) => (
            <div
              key={it.l}
              style={{
                padding: "0.4rem 0.6rem",
                borderRadius: 6,
                fontSize: "0.78rem",
                background: it.active ? "rgba(255,255,255,0.1)" : "transparent",
                color: it.active ? "#fff" : "rgba(255,255,255,0.7)",
              }}
            >
              {it.l}
            </div>
          ))}
          <div style={{ marginTop: "auto", fontSize: "0.7rem", opacity: 0.85 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#22c55e",
                  display: "inline-block",
                }}
              />
              Conectado
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#22c55e",
                  display: "inline-block",
                }}
              />
              IA pronta
            </div>
          </div>
        </div>

        {/* Conversation list */}
        <div
          style={{
            background: "#fff",
            color: "#111",
            borderRight: "1px solid #e2e8f0",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              background: "#f0f2f5",
              padding: "0.55rem 0.75rem",
              borderBottom: "1px solid #e2e8f0",
              fontWeight: 700,
              fontSize: "0.8rem",
              color: "#111b21",
            }}
          >
            Conversas
          </div>
          {[
            {
              name: "Maria — cliente",
              msg: "Vocês entregam hoje?",
              time: "agora",
              badge: 2,
              active: true,
            },
            { name: "João Silva", msg: "Beleza, obrigado!", time: "10:14", badge: 0, active: false },
            {
              name: "Ana — loja",
              msg: "Quero falar com atendente",
              time: "09:42",
              badge: 0,
              active: false,
              escalated: true,
            },
            { name: "Pedro", msg: "Como funciona o frete?", time: "ontem", badge: 0, active: false },
          ].map((c) => (
            <div
              key={c.name}
              style={{
                padding: "0.6rem 0.75rem",
                borderBottom: "1px solid #f1f5f9",
                background: c.active ? "#f1f5f9" : "transparent",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 600 }}>{c.name}</span>
                <span style={{ fontSize: "0.66rem", color: "#64748b" }}>{c.time}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 2,
                }}
              >
                <span
                  style={{
                    fontSize: "0.72rem",
                    color: "#475569",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {c.msg}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: 6 }}>
                  {c.escalated && (
                    <span style={{ color: "#ef4444", fontSize: "0.7rem" }}>⚠</span>
                  )}
                  <span style={{ color: "#25D366", fontSize: "0.7rem" }}>🤖</span>
                  {c.badge > 0 && (
                    <span
                      style={{
                        background: "#25D366",
                        color: "#fff",
                        fontSize: "0.6rem",
                        borderRadius: 999,
                        padding: "1px 6px",
                        fontWeight: 700,
                      }}
                    >
                      {c.badge}
                    </span>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Chat */}
        <div
          style={{
            background: "#efeae2",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              background: "#f0f2f5",
              padding: "0.6rem 0.85rem",
              borderBottom: "1px solid #e2e8f0",
              fontWeight: 700,
              fontSize: "0.8rem",
              color: "#111b21",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: 999,
                background: "#cbd5e1",
                color: "#475569",
                fontSize: "0.78rem",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
              }}
            >
              M
            </span>
            Maria — cliente
            <span
              style={{
                marginLeft: "auto",
                background: "rgba(37,211,102,0.12)",
                color: "#16a34a",
                fontSize: "0.66rem",
                padding: "2px 8px",
                borderRadius: 999,
                fontWeight: 700,
              }}
            >
              Bot ativo
            </span>
          </div>
          <div
            style={{
              flex: 1,
              padding: "0.8rem",
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <Bubble side="in">Vocês entregam hoje?</Bubble>
            <Bubble side="out">
              Sim! Entregamos no mesmo dia para pedidos feitos até 15h. Qual o seu CEP?
            </Bubble>
            <Bubble side="in">04543-000</Bubble>
            <Bubble side="out">
              Pra esse CEP o frete é grátis e chega ainda hoje 😊 Quer fechar o pedido?
            </Bubble>
            <div style={{ fontSize: "0.65rem", color: "#475569", textAlign: "center" }}>
              🤖 Bot respondeu em 1.8s · IA local
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Bubble({ side, children }: { side: "in" | "out"; children: React.ReactNode }) {
  const isOut = side === "out";
  return (
    <div
      style={{
        alignSelf: isOut ? "flex-end" : "flex-start",
        maxWidth: "75%",
        background: isOut ? "#d9fdd3" : "#fff",
        borderRadius: 8,
        padding: "0.4rem 0.6rem",
        fontSize: "0.74rem",
        color: "#111b21",
        boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
      }}
    >
      {isOut && (
        <div style={{ fontSize: "0.6rem", color: "#16a34a", fontWeight: 700, marginBottom: 2 }}>
          🤖 Bot
        </div>
      )}
      {children}
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
