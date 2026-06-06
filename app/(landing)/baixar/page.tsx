/**
 * /baixar — pagina simples de download SEM token na URL.
 * Pra mandar via WhatsApp/email pra cliente que ja pagou mas nao recebeu o link.
 *
 * Diferenca da /postmasterpago:
 *   - /postmasterpago: precisa token ou payment_id; controla quem pode baixar
 *   - /baixar: publica, sempre serve o setup. Cliente nao perde acesso por
 *     fechar a aba/perder o link. Pra controle de venda usa /postmasterpago.
 */
import type { Metadata } from "next";

const DOWNLOAD_URL = "https://github.com/tamoaiapp/postmaster/releases/latest/download/PostMaster-Setup.exe";
const VIDEO_URL = "https://ddpyvdtgxemyxltgtxsh.supabase.co/storage/v1/object/public/videos/como-liberar-postmaster.mp4";

export const metadata: Metadata = {
  title: "Baixar PostMaster — iaempresa.app",
  description: "Download direto do PostMaster pra Windows 10/11. Veja o passo a passo de instalacao.",
  robots: { index: false, follow: false }, // nao indexa — link e pra cliente que ja pagou
};

export default function BaixarPage() {
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "2.5rem 1.25rem 5rem" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
        <div style={{
          display: "inline-block",
          background: "rgba(99,102,241,0.12)",
          border: "1px solid rgba(99,102,241,0.3)",
          color: "#a78bfa",
          borderRadius: 20,
          padding: "0.3rem 1rem",
          fontSize: "0.8rem",
          fontWeight: 600,
          marginBottom: "1rem",
        }}>
          ⬡ PostMaster
        </div>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          Baixe o PostMaster
        </h1>
        <p style={{ color: "#8394b0", fontSize: "0.95rem" }}>
          Assista o vídeo abaixo (1 min) e depois clique em baixar.
        </p>
      </div>

      {/* Video player — 9:16 vertical */}
      <div style={{
        background: "linear-gradient(135deg, rgba(245,158,11,0.14), rgba(245,158,11,0.06))",
        border: "1.5px solid rgba(245,158,11,0.4)",
        borderRadius: 16,
        padding: "1rem 1.25rem 1.5rem",
        marginBottom: "1.75rem",
      }}>
        <div style={{ textAlign: "center", marginBottom: "0.85rem" }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>📺</div>
          <div style={{
            fontWeight: 800,
            fontSize: "1.05rem",
            color: "#f59e0b",
            marginBottom: "0.25rem",
          }}>
            Assista antes de instalar
          </div>
          <p style={{ fontSize: "0.85rem", color: "#eef2f9", lineHeight: 1.5 }}>
            Mostro como liberar a instalação no Windows em 1 minuto.
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <video
            controls
            playsInline
            preload="metadata"
            style={{
              width: "100%",
              maxWidth: 320,
              aspectRatio: "9 / 16",
              borderRadius: 14,
              background: "#000",
              boxShadow: "0 6px 24px rgba(0,0,0,0.4)",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "block",
            }}
          >
            <source src={VIDEO_URL} type="video/mp4" />
            Seu navegador não suporta vídeo HTML5.
          </video>
        </div>
      </div>

      {/* Botao de download */}
      <div style={{
        background: "linear-gradient(135deg,rgba(99,102,241,0.12),rgba(168,85,247,0.08))",
        border: "1px solid rgba(99,102,241,0.25)",
        borderRadius: 18,
        padding: "2rem",
        textAlign: "center",
        marginBottom: "1.75rem",
      }}>
        <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>⬇</div>
        <h2 style={{
          fontSize: "1.35rem",
          fontWeight: 800,
          marginBottom: "0.4rem",
        }}>
          PostMaster.exe
        </h2>
        <p style={{
          color: "#8394b0",
          fontSize: "0.88rem",
          marginBottom: "1.5rem",
        }}>
          Windows 10/11 · ~690 MB
        </p>
        <a
          href={DOWNLOAD_URL}
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            color: "#fff",
            padding: "0.95rem 2.75rem",
            borderRadius: 14,
            fontWeight: 700,
            fontSize: "1.05rem",
            textDecoration: "none",
            boxShadow: "0 4px 24px rgba(99,102,241,0.4)",
          }}
        >
          ⬇ Baixar PostMaster
        </a>
        <p style={{
          color: "#4e5c72",
          fontSize: "0.78rem",
          marginTop: "1.25rem",
          lineHeight: 1.55,
        }}>
          O download começa em segundos. Se o Windows alertar que o arquivo é
          desconhecido, é normal — clique em <strong style={{ color: "#8394b0" }}>"Mais informações"</strong> e
          depois em <strong style={{ color: "#8394b0" }}>"Executar mesmo assim"</strong>.
        </p>
      </div>

      {/* Passos pos-download */}
      <div style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 14,
        padding: "1.5rem 1.75rem",
        marginBottom: "1.5rem",
      }}>
        <h3 style={{
          fontSize: "0.95rem",
          fontWeight: 700,
          color: "#eef2f9",
          marginBottom: "0.85rem",
        }}>
          Próximos passos
        </h3>
        <ol style={{
          color: "#c8d6f0",
          fontSize: "0.88rem",
          lineHeight: 1.7,
          paddingLeft: "1.2rem",
          margin: 0,
        }}>
          <li>Dê duplo-clique no arquivo baixado</li>
          <li>Se o Windows alertar, escolha <strong>"Mais informações" → "Executar mesmo assim"</strong></li>
          <li>Aguarde a instalação (uns 30s)</li>
          <li>Abra o PostMaster — o tour guiado vai te ensinar a usar</li>
          <li>Travou? Clique no botão <strong>"Ajuda"</strong> dentro do app</li>
        </ol>
      </div>

      {/* Suporte */}
      <div style={{
        textAlign: "center",
        color: "#4e5c72",
        fontSize: "0.85rem",
      }}>
        Precisa de ajuda? Chame no WhatsApp{" "}
        <a
          href="https://wa.me/5511967245795"
          style={{ color: "#16c784", textDecoration: "none", fontWeight: 600 }}
          target="_blank"
          rel="noopener noreferrer"
        >
          +55 11 96724-5795
        </a>
      </div>
    </div>
  );
}
