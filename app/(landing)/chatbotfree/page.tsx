"use client";
import { useEffect, useState } from "react";

type GrantResponse = {
  token?: string;
  url?: string;
  mp_payment_id?: string;
  email?: string | null;
  error?: string;
};

export default function ChatBotFreePage() {
  const [key, setKey] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GrantResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("zapbot-grant-key");
    if (saved) setKey(saved);
  }, []);

  async function generate() {
    setLoading(true);
    setError(null);
    setResult(null);
    setCopied(false);
    try {
      const res = await fetch("/api/admin/zapbot/grant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({ email: email || undefined }),
      });
      const data = (await res.json()) as GrantResponse;
      if (!res.ok) {
        setError(data.error || `Erro ${res.status}`);
      } else {
        setResult(data);
        localStorage.setItem("zapbot-grant-key", key);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro de conexão");
    } finally {
      setLoading(false);
    }
  }

  async function copyLink() {
    if (!result?.url) return;
    await navigator.clipboard.writeText(result.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const shareText = result?.url
    ? `Liberei pra vc um acesso gratuito do ZapBot 👇\n\n${result.url}\n\nÉ um app pra Windows que roda no seu PC e atende clientes no WhatsApp com IA local. Qualquer dúvida me chama.`
    : "";
  const whatsappUrl = result?.url
    ? `https://wa.me/?text=${encodeURIComponent(shareText)}`
    : "#";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        padding: "3rem 1.25rem 5rem",
        fontFamily: "Outfit, sans-serif",
        color: "var(--text)",
      }}
    >
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <div
          style={{
            display: "inline-block",
            background: "rgba(168,85,247,0.12)",
            border: "1px solid rgba(168,85,247,0.3)",
            color: "#a78bfa",
            borderRadius: 20,
            padding: "0.3rem 1rem",
            fontSize: "0.8rem",
            fontWeight: 700,
            marginBottom: "1rem",
          }}
        >
          🎁 Acesso gratuito · admin
        </div>

        <h1 style={{ fontSize: "1.75rem", fontWeight: 900, marginBottom: "0.4rem" }}>
          Liberar ZapBot de graça
        </h1>
        <p style={{ color: "#8394b0", fontSize: "0.95rem", marginBottom: "2rem" }}>
          Gera um link único de cortesia. A pessoa abre, valida e baixa o app — sem pagar.
        </p>

        <div
          style={{
            background: "var(--card)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16,
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <span style={{ fontSize: "0.82rem", color: "#8394b0", fontWeight: 600 }}>
              Chave admin
            </span>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="ZAPBOT_GRANT_KEY"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10,
                padding: "0.7rem 0.9rem",
                color: "var(--text)",
                fontSize: "0.92rem",
                fontFamily: "monospace",
              }}
            />
            <span style={{ fontSize: "0.72rem", color: "#4e5c72" }}>
              Salva no navegador. Configure em <code>.env.local</code> na Vercel.
            </span>
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <span style={{ fontSize: "0.82rem", color: "#8394b0", fontWeight: 600 }}>
              Email do destinatário (opcional, só pra rastreio)
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="amigo@exemplo.com"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10,
                padding: "0.7rem 0.9rem",
                color: "var(--text)",
                fontSize: "0.92rem",
              }}
            />
          </label>

          <button
            onClick={generate}
            disabled={loading || !key.trim()}
            style={{
              background: loading || !key.trim()
                ? "rgba(168,85,247,0.3)"
                : "linear-gradient(135deg,#a855f7,#6366f1)",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "0.9rem 1.5rem",
              fontSize: "1rem",
              fontWeight: 700,
              cursor: loading || !key.trim() ? "not-allowed" : "pointer",
              boxShadow: "0 4px 24px rgba(168,85,247,0.3)",
            }}
          >
            {loading ? "Gerando..." : "🎁 Gerar link de cortesia"}
          </button>

          {error && (
            <div
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: 10,
                padding: "0.7rem 0.9rem",
                color: "#fca5a5",
                fontSize: "0.85rem",
              }}
            >
              ⚠️ {error}
            </div>
          )}

          {result?.url && (
            <div
              style={{
                background: "rgba(22,199,132,0.08)",
                border: "1px solid rgba(22,199,132,0.3)",
                borderRadius: 12,
                padding: "1rem 1.1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
              }}
            >
              <div style={{ fontSize: "0.85rem", color: "#16c784", fontWeight: 700 }}>
                ✅ Link gerado
              </div>
              <div
                style={{
                  background: "rgba(0,0,0,0.35)",
                  borderRadius: 8,
                  padding: "0.6rem 0.8rem",
                  fontFamily: "monospace",
                  fontSize: "0.78rem",
                  color: "#eef2f9",
                  wordBreak: "break-all",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {result.url}
              </div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <button
                  onClick={copyLink}
                  style={{
                    background: "rgba(22,199,132,0.15)",
                    border: "1px solid rgba(22,199,132,0.3)",
                    color: "#16c784",
                    borderRadius: 8,
                    padding: "0.5rem 0.95rem",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {copied ? "✓ Copiado!" : "📋 Copiar link"}
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "rgba(37,211,102,0.15)",
                    border: "1px solid rgba(37,211,102,0.3)",
                    color: "#25D366",
                    borderRadius: 8,
                    padding: "0.5rem 0.95rem",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  💬 Enviar no WhatsApp
                </a>
              </div>
              <div style={{ fontSize: "0.72rem", color: "#4e5c72", marginTop: "0.25rem" }}>
                ID interno: <code>{result.mp_payment_id}</code>
                {result.email ? ` · ${result.email}` : ""}
              </div>
            </div>
          )}
        </div>

        <p style={{ marginTop: "2rem", fontSize: "0.78rem", color: "#4e5c72", textAlign: "center" }}>
          Telemetria de acessos fica em <code>zapbot_tokens</code> no Supabase.
        </p>
      </div>
    </div>
  );
}
