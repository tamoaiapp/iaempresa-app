/**
 * /baixar-robodabet — pagina publica de download SEM token na URL.
 * Pra mandar via WhatsApp/email pra cliente que ja pagou mas nao recebeu o link.
 *
 * Diferenca da /robodabetpago:
 *   - /robodabetpago: precisa token ou payment_id; controla quem pode baixar
 *   - /baixar-robodabet: publica, sempre serve o setup. Cliente nao perde
 *     acesso por fechar a aba/perder o link.
 */
import type { Metadata } from "next";

const DOWNLOAD_URL = "https://github.com/tamoaiapp/robodabet/releases/latest/download/RoboDaBet-Setup.exe";

export const metadata: Metadata = {
  title: "Baixar Robô da Bet — iaempresa.app",
  description: "Download direto do Robô da Bet pra Windows 10/11.",
  robots: { index: false, follow: false },
};

export default function BaixarRoboDaBetPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: `
        radial-gradient(circle at 20% 10%, rgba(0,255,136,0.10), transparent 50%),
        radial-gradient(circle at 80% 90%, rgba(255,215,0,0.05), transparent 50%),
        #050808`,
      color: "#e8f5ee",
      fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "2.5rem 1.25rem 5rem" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(0,255,136,0.12)", border: "1px solid rgba(0,255,136,0.3)",
            color: "#00ff88", borderRadius: 20, padding: "0.3rem 1rem",
            fontSize: "0.8rem", fontWeight: 700, marginBottom: "1rem", letterSpacing: "0.05em",
          }}>
            ROBÔ DA BET
          </div>
          <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "0.5rem",
            background: "linear-gradient(90deg, #fff, #00ff88)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Baixe o Robô da Bet
          </h1>
          <p style={{ color: "#9ec5b1", fontSize: "0.95rem" }}>
            Windows 10/11 · Auto-update embutido · Última versão
          </p>
        </div>

        {/* Download card */}
        <div style={{
          background: "linear-gradient(135deg, rgba(0,255,136,0.12), rgba(255,215,0,0.06))",
          border: "1px solid rgba(0,255,136,0.3)",
          borderRadius: 18, padding: "2.5rem 2rem",
          textAlign: "center", marginBottom: "1.5rem",
        }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.4rem", color: "#e8f5ee" }}>
            RoboDaBet-Setup.exe
          </h2>
          <p style={{ color: "#9ec5b1", fontSize: "0.9rem", marginBottom: "1.75rem" }}>
            Última versão · Windows 10/11
          </p>
          <a
            href={DOWNLOAD_URL}
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #00ff88, #00b86b)",
              color: "#001a0d",
              padding: "1.1rem 3rem",
              borderRadius: 14, fontWeight: 800, fontSize: "1.1rem",
              textDecoration: "none",
              boxShadow: "0 0 32px rgba(0,255,136,0.4)",
            }}
          >
            ⬇ Baixar agora
          </a>
          <p style={{ color: "#5e7d6f", fontSize: "0.8rem", marginTop: "1.5rem", lineHeight: 1.6 }}>
            O download começa em segundos. Se o Windows alertar que o arquivo é
            desconhecido, clique em <strong style={{ color: "#9ec5b1" }}>&quot;Mais informações&quot;</strong> →{" "}
            <strong style={{ color: "#9ec5b1" }}>&quot;Executar mesmo assim&quot;</strong>.
          </p>
        </div>

        {/* Próximos passos */}
        <div style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 14,
          padding: "1.5rem 1.75rem",
          marginBottom: "1.5rem",
        }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#e8f5ee", marginBottom: "0.9rem" }}>
            Como instalar
          </h3>
          <ol style={{
            color: "#c8e0d0", fontSize: "0.9rem", lineHeight: 1.75,
            paddingLeft: "1.2rem", margin: 0,
          }}>
            <li>Dê duplo-clique no arquivo baixado</li>
            <li>Se o Windows alertar, escolha <strong>&quot;Mais informações&quot; → &quot;Executar mesmo assim&quot;</strong></li>
            <li>Aguarde a instalação (uns 30 segundos)</li>
            <li>Abra o Robô da Bet — o onboarding vai te guiar passo a passo</li>
            <li>Travou? Use o botão <strong>&quot;Ajuda&quot;</strong> dentro do app (TamoIA responde direto)</li>
          </ol>
        </div>

        {/* Link alternativo */}
        <div style={{
          background: "rgba(168,85,247,0.04)",
          border: "1px solid rgba(168,85,247,0.15)",
          borderRadius: 12,
          padding: "1rem 1.25rem",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}>
          <p style={{ color: "#9ec5b1", fontSize: "0.85rem", margin: 0 }}>
            Não baixou? Pega direto no{" "}
            <a
              href="https://github.com/tamoaiapp/robodabet/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#c4a5ff", fontWeight: 600 }}
            >
              GitHub Releases
            </a>
          </p>
        </div>

        {/* Suporte */}
        <div style={{ textAlign: "center", color: "#5e7d6f", fontSize: "0.85rem" }}>
          Precisa de ajuda? Chama no WhatsApp{" "}
          <a
            href="https://wa.me/5511967245795"
            style={{ color: "#00ff88", textDecoration: "none", fontWeight: 600 }}
            target="_blank"
            rel="noopener noreferrer"
          >
            +55 11 96724-5795
          </a>
        </div>
      </div>
    </div>
  );
}
