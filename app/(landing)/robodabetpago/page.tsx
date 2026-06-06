"use client";
import { useEffect, useState } from "react";

export default function RoboDaBetPagoPage() {
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setStatus(params.get("status"));
  }, []);

  const approved = status === "aprovado";
  const downloadUrl = "https://github.com/tamoaiapp/robodabet/releases/latest/download/RoboDaBet-Setup.exe";

  return (
    <div style={{
      minHeight: "100vh",
      background: `
        radial-gradient(circle at 20% 10%, rgba(0,255,136,0.10), transparent 50%),
        #000`,
      color: "#e8f5ee",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
    }}>
      <div style={{ maxWidth: 520, textAlign: "center" }}>
        {approved ? (
          <>
            <div style={{ fontSize: 56, marginBottom: 14 }}>🎉</div>
            <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 14,
              background: "linear-gradient(90deg, #fff, #00ff88)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Pagamento aprovado!
            </h1>
            <p style={{ color: "#9ec5b1", marginBottom: 28, fontSize: 16, lineHeight: 1.6 }}>
              Baixe agora o Robô da Bet pra Windows. Auto-update embutido — você sempre na última versão.
            </p>
            <a href={downloadUrl}
              style={{
                background: "linear-gradient(135deg, #00ff88, #00b86b)",
                color: "#001a0d",
                fontWeight: 800,
                fontSize: 17,
                padding: "16px 32px",
                border: "none",
                borderRadius: 12,
                textDecoration: "none",
                display: "inline-block",
                boxShadow: "0 0 24px rgba(0,255,136,0.4)",
              }}
            >
              ⬇ Baixar instalador (.exe)
            </a>
            <p style={{ marginTop: 24, fontSize: 12, color: "#5e7d6f" }}>
              Não baixa? Tenta direto:{" "}
              <a href="https://github.com/tamoaiapp/robodabet/releases" style={{ color: "#00ff88" }}>
                releases no GitHub
              </a>
            </p>
          </>
        ) : (
          <>
            <div style={{ fontSize: 48, marginBottom: 14 }}>⏳</div>
            <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 14 }}>
              Pagamento {status === "pendente" ? "pendente" : "em processamento"}
            </h1>
            <p style={{ color: "#9ec5b1" }}>
              Assim que aprovar, o link de download vai aparecer aqui.
              Você também recebe por email.
            </p>
            <p style={{ marginTop: 24 }}>
              <a href="/robodabet" style={{ color: "#00ff88" }}>← Voltar</a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
