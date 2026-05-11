"use client";
import { useEffect, useState } from "react";

// GitHub releases — atualize a versão aqui quando subir nova
const GH_OWNER = "tamoaiapp";
const GH_REPO = "zapbot";
const LATEST = (asset: string) =>
  `https://github.com/${GH_OWNER}/${GH_REPO}/releases/latest/download/${asset}`;

const DOWNLOADS = {
  win: {
    url: LATEST("ZapBot-0.1.0-portable-win-x64.zip"),
    label: "Baixar para Windows",
    sub: "Windows 10/11 · 64-bit · 120MB portátil",
    available: true,
  },
  mac: {
    url: "#",
    label: "macOS — em breve",
    sub: "macOS 12+ · Intel/Apple Silicon",
    available: false,
  },
  linux: {
    url: "#",
    label: "Linux — em breve",
    sub: "AppImage · x86_64",
    available: false,
  },
};

type OS = "win" | "mac" | "linux";

function detectOS(): OS {
  if (typeof navigator === "undefined") return "win";
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("mac")) return "mac";
  if (ua.includes("linux") || ua.includes("x11")) return "linux";
  return "win";
}

const DISABLED_STYLE: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  color: "#4e5c72",
  cursor: "not-allowed",
  border: "1px dashed rgba(255,255,255,0.08)",
};

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
  const [detectedOs, setDetectedOs] = useState<OS>("win");

  useEffect(() => {
    setDetectedOs(detectOS());
  }, []);

  // Primary CTA uses detected OS only if available; otherwise falls back to Windows.
  const primaryOs: OS = DOWNLOADS[detectedOs].available ? detectedOs : "win";
  const primary = DOWNLOADS[primaryOs];
  const os = primaryOs;

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
        <a
          href={primary.url}
          style={{
            ...BTN_PRIMARY,
            padding: "0.45rem 1.25rem",
            fontSize: "0.875rem",
          }}
        >
          ⬇ Baixar
        </a>
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
            100% offline · roda na sua máquina · grátis
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

          {/* Download buttons */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <a
              href={primary.url}
              style={{
                ...BTN_PRIMARY,
                padding: "1.1rem 2.5rem",
                fontSize: "1.1rem",
              }}
            >
              ⬇ {primary.label}
              <span
                style={{
                  fontWeight: 500,
                  opacity: 0.85,
                  fontSize: "0.85rem",
                  marginLeft: 4,
                }}
              >
                ({primary.sub})
              </span>
            </a>

            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {(Object.keys(DOWNLOADS) as OS[])
                .filter((k) => k !== os)
                .map((k) => {
                  const d = DOWNLOADS[k];
                  const style = {
                    ...(d.available ? BTN_SECONDARY : DISABLED_STYLE),
                    padding: "0.55rem 1.1rem",
                    fontSize: "0.85rem",
                    borderRadius: 14,
                    fontWeight: 600,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  };
                  if (!d.available) {
                    return (
                      <span key={k} style={style}>
                        {d.label}
                      </span>
                    );
                  }
                  return (
                    <a key={k} href={d.url} style={style}>
                      {d.label}
                    </a>
                  );
                })}
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
            }}
          >
            {[
              "Grátis e open source",
              "Sem servidor",
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

          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {(Object.keys(DOWNLOADS) as OS[]).map((k) => {
              const d = DOWNLOADS[k];
              const style = {
                ...(d.available ? (k === os ? BTN_PRIMARY : BTN_SECONDARY) : DISABLED_STYLE),
                padding: "0.95rem 1.75rem",
                fontSize: "0.95rem",
                borderRadius: 14,
                fontWeight: d.available ? 800 : 600,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              };
              const text = `${d.available ? "⬇ " : ""}${d.label.replace("Baixar para ", "")}`;
              return d.available ? (
                <a key={k} href={d.url} style={style}>
                  {text}
                </a>
              ) : (
                <span key={k} style={style}>
                  {text}
                </span>
              );
            })}
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
