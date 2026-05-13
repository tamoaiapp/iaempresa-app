"use client";
import Link from "next/link";

const DOWNLOAD_URL =
  "https://github.com/tamoaiapp/zapbot/releases/latest/download/ZapBot-0.1.0-Setup.exe";
const DOWNLOAD_ZIP_URL =
  "https://github.com/tamoaiapp/zapbot/releases/latest/download/ZapBot-0.1.0-portable-win-x64.zip";

export default function ChatBotFreePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(37,211,102,0.12), transparent 60%), var(--bg)",
        padding: "3rem 1.25rem 5rem",
        fontFamily: "Outfit, sans-serif",
        color: "var(--text)",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(37,211,102,0.12)",
              border: "1px solid rgba(37,211,102,0.3)",
              color: "#25D366",
              borderRadius: 999,
              padding: "0.4rem 1.1rem",
              fontSize: "0.8rem",
              fontWeight: 700,
              marginBottom: "1.25rem",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#25D366",
                display: "inline-block",
              }}
            />
            Acesso liberado
          </div>

          <h1
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 900,
              marginBottom: "0.6rem",
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
            }}
          >
            Seu ZapBot está{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#16c784,#25D366)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              pronto pra baixar
            </span>
          </h1>
          <p style={{ color: "#8394b0", fontSize: "0.95rem", lineHeight: 1.6 }}>
            Acesso de cortesia. Sem pagamento, sem cadastro. Só baixar e usar.
          </p>
        </div>

        {/* SmartScreen warning */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(245,158,11,0.14), rgba(245,158,11,0.06))",
            border: "1.5px solid rgba(245,158,11,0.4)",
            borderRadius: 16,
            padding: "1.25rem 1.5rem",
            marginBottom: "1.25rem",
          }}
        >
          <div
            style={{
              fontWeight: 800,
              fontSize: "1.05rem",
              color: "#f59e0b",
              marginBottom: "0.5rem",
            }}
          >
            Atenção: o Windows pode mostrar um aviso azul
          </div>
          <p style={{ fontSize: "0.88rem", color: "#eef2f9", lineHeight: 1.6 }}>
            Como o app ainda não tem certificado da Microsoft (eles cobram caro), o SmartScreen mostra um aviso. Pra liberar:
          </p>
          <ol
            style={{
              fontSize: "0.88rem",
              color: "#c8d6f0",
              lineHeight: 1.7,
              paddingLeft: "1.25rem",
              marginTop: "0.5rem",
            }}
          >
            <li>Clique no botão de download abaixo</li>
            <li>
              Se aparecer o aviso azul: clique em <b>&quot;Mais informações&quot;</b>
            </li>
            <li>
              Depois clique em <b>&quot;Executar assim mesmo&quot;</b>
            </li>
          </ol>
        </div>

        {/* Download card */}
        <div
          style={{
            background:
              "linear-gradient(135deg,rgba(37,211,102,0.12),rgba(18,140,126,0.08))",
            border: "1px solid rgba(37,211,102,0.25)",
            borderRadius: 18,
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "1.4rem",
              fontWeight: 800,
              marginBottom: "0.5rem",
            }}
          >
            ZapBot — Download
          </h2>
          <p
            style={{
              color: "#8394b0",
              fontSize: "0.9rem",
              marginBottom: "1.5rem",
            }}
          >
            Versão 0.1.0 · Windows 10/11 · 88 MB
          </p>
          <a
            href={DOWNLOAD_URL}
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg,#25D366,#128C7E)",
              color: "#fff",
              padding: "1.05rem 2.75rem",
              borderRadius: 14,
              fontWeight: 800,
              fontSize: "1.05rem",
              textDecoration: "none",
              boxShadow: "0 6px 28px rgba(37,211,102,0.4)",
            }}
          >
            Baixar ZapBot-Setup.exe
          </a>
          <p style={{ marginTop: "1rem" }}>
            <a
              href={DOWNLOAD_ZIP_URL}
              style={{
                color: "#8394b0",
                fontSize: "0.85rem",
                textDecoration: "underline",
              }}
            >
              ou baixar como .zip portátil (120 MB, sem instalar)
            </a>
          </p>
          <p style={{ color: "#4e5c72", fontSize: "0.78rem", marginTop: "1.25rem" }}>
            Dúvidas?{" "}
            <a href="mailto:contato@iaempresa.app" style={{ color: "#8394b0" }}>
              contato@iaempresa.app
            </a>
          </p>
        </div>

        {/* Next steps */}
        <div
          style={{
            marginTop: "1.5rem",
            background: "var(--card)",
            border: "1px solid var(--line)",
            borderRadius: 14,
            padding: "1.25rem 1.5rem",
          }}
        >
          <h3
            style={{
              fontSize: "0.95rem",
              fontWeight: 700,
              marginBottom: "0.5rem",
            }}
          >
            Próximos passos
          </h3>
          <ol
            style={{
              fontSize: "0.88rem",
              color: "#c8d6f0",
              lineHeight: 1.7,
              paddingLeft: "1.25rem",
            }}
          >
            <li>Execute o ZapBot-Setup.exe (siga o aviso azul se aparecer)</li>
            <li>Aguarde o ambiente preparar (~10s)</li>
            <li>A IA local começa a baixar automaticamente (~1.2 GB, primeira vez)</li>
            <li>Escaneie o QR Code do WhatsApp no seu celular</li>
            <li>Pronto — o bot responde 24h por dia</li>
          </ol>
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link
            href="/"
            style={{
              color: "#8394b0",
              fontSize: "0.875rem",
              textDecoration: "none",
            }}
          >
            ← Voltar pro site
          </Link>
        </div>
      </div>
    </div>
  );
}
