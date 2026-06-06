"use client";
import { useState, useEffect } from "react";

/**
 * /postmaster-demo — página de demo PRIVADA.
 *
 * Tiago compartilha esse link individualmente com pessoas que chegam no privado
 * dele (WhatsApp/DM/etc). Sem trial countdown — é só "baixa e usa, te ensino se
 * precisar". Não indexa no Google (noindex no metadata).
 *
 * Diferente de /postmaster/teste-24h:
 * - Sem framing de "24h" (cliente individual, sem deadline)
 * - WhatsApp direto pro suporte no centro da página
 * - Acolhe com nome do convite ("você foi indicado por...")
 */

const DOWNLOAD_URL = "https://github.com/tamoaiapp/postmaster/releases/latest/download/PostMaster-Setup.exe";
const VIDEO_LIBERAR = "https://ddpyvdtgxemyxltgtxsh.supabase.co/storage/v1/object/public/videos/como-liberar-postmaster.mp4";
const WHATSAPP_SUPPORT = "5511967245795";

function whatsappLink(text: string) {
  return `https://wa.me/${WHATSAPP_SUPPORT}?text=${encodeURIComponent(text)}`;
}

const BTN = {
  background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
  color: "#fff", borderRadius: 14, fontWeight: 800,
  border: "none", cursor: "pointer",
  boxShadow: "0 4px 32px rgba(99,102,241,0.45)",
};

export default function PostmasterDemoClient() {
  const [downloaded, setDownloaded] = useState(false);
  function onClick() { setDownloaded(true); }

  // Marca acesso ao demo (anti-perda — pra pessoa não esquecer que baixou)
  useEffect(() => {
    if (typeof window !== "undefined" && downloaded) {
      localStorage.setItem("pm_demo_clicked_at", new Date().toISOString());
    }
  }, [downloaded]);

  return (
    <div style={{
      background: "var(--bg)", color: "var(--text)",
      fontFamily: "'Outfit', sans-serif", minHeight: "100vh",
      padding: "3rem 1.25rem 5rem",
    }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>

        {/* Badge convite */}
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "linear-gradient(135deg,rgba(168,85,247,0.15),rgba(99,102,241,0.1))",
            border: "1px solid rgba(168,85,247,0.35)",
            color: "#c084fc", borderRadius: 20, padding: "0.4rem 1.1rem",
            fontSize: "0.85rem", fontWeight: 700,
          }}>
            ✨ Acesso por convite — exclusivo
          </div>
        </div>

        {/* Hero */}
        <h1 style={{
          textAlign: "center",
          fontSize: "clamp(2rem,4.5vw,3rem)",
          fontWeight: 900, lineHeight: 1.12, marginBottom: "1.25rem",
          letterSpacing: "-0.02em",
        }}>
          Você foi convidado pra testar o{" "}
          <span style={{
            background: "linear-gradient(135deg,#6366f1,#a855f7)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>PostMaster</span>
        </h1>

        <p style={{
          textAlign: "center", fontSize: "1.05rem", color: "#8394b0",
          lineHeight: 1.7, maxWidth: 540, margin: "0 auto 2rem",
        }}>
          Acesso liberado sem tempo, sem cartão e sem cadastro. Baixa, instala
          e me chama se precisar de ajuda — eu te respondo no WhatsApp.
        </p>

        {/* CTA download */}
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <a href={DOWNLOAD_URL} onClick={onClick} style={{
            ...BTN, display: "inline-flex", alignItems: "center", gap: "0.6rem",
            padding: "1.15rem 2.5rem", fontSize: "1.1rem", textDecoration: "none",
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Baixar PostMaster
          </a>
          <div style={{
            fontSize: "0.82rem", color: "#4e5c72", marginTop: "0.8rem",
            display: "flex", justifyContent: "center", gap: "0.85rem", flexWrap: "wrap",
          }}>
            <span>Windows 10/11</span>
            <span>·</span>
            <span>~534 MB</span>
            <span>·</span>
            <span>Instala em 2 minutos</span>
          </div>
        </div>

        {/* Botão WhatsApp direto, sempre visível */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <a href={whatsappLink("Oi! Recebi o link do demo do PostMaster e tô com uma dúvida.")} target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: "0.55rem",
            background: "linear-gradient(135deg,#16c784,#10b981)",
            color: "#fff", padding: "0.85rem 1.75rem", borderRadius: 14,
            fontWeight: 800, fontSize: "0.97rem", textDecoration: "none",
            boxShadow: "0 4px 24px rgba(22,199,132,0.4)",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            Tirar dúvida no WhatsApp
          </a>
        </div>

        {/* Pos-clique: video como liberar SmartScreen */}
        {downloaded && (
          <div style={{
            background: "linear-gradient(135deg, rgba(245,158,11,0.12), rgba(245,158,11,0.05))",
            border: "1.5px solid rgba(245,158,11,0.4)",
            borderRadius: 16, padding: "1.25rem 1.5rem",
            marginBottom: "2rem", textAlign: "center",
          }}>
            <div style={{ fontSize: "1.4rem", marginBottom: "0.4rem" }}>📺</div>
            <div style={{ fontWeight: 800, fontSize: "1.02rem", color: "#f59e0b", marginBottom: "0.4rem" }}>
              Antes de instalar — assista 30 segundos
            </div>
            <p style={{ fontSize: "0.88rem", color: "#eef2f9", lineHeight: 1.55, marginBottom: "1rem" }}>
              Windows mostra um aviso de &ldquo;PC protegido&rdquo;. Te mostro como liberar.
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <video controls playsInline preload="metadata" style={{
                width: "100%", maxWidth: 320, aspectRatio: "9 / 16",
                borderRadius: 14, background: "#000",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}>
                <source src={VIDEO_LIBERAR} type="video/mp4" />
              </video>
            </div>
          </div>
        )}

        {/* Instruções rápidas */}
        <div style={{
          background: "var(--card)", border: "1px solid var(--line)",
          borderRadius: 16, padding: "1.5rem", marginBottom: "1.5rem",
        }}>
          <div style={{
            fontSize: "0.78rem", fontWeight: 800, color: "#8394b0",
            textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "1rem",
          }}>Próximos passos</div>
          {[
            ["1", "Baixe o instalador acima"],
            ["2", "Se o Windows reclamar, assista o vídeo (Mais informações → Executar)"],
            ["3", "Abra o app, conecte sua conta IG/TikTok"],
            ["4", "Cole o link de um canal do YouTube e clica em Iniciar"],
            ["5", "Me chama no WhatsApp se travar em algum passo"],
          ].map(([n, t]) => (
            <div key={n} style={{ display: "flex", gap: "0.85rem", alignItems: "center", padding: "0.5rem 0", borderTop: n === "1" ? "none" : "1px solid rgba(255,255,255,0.04)" }}>
              <div style={{
                width: 26, height: 26, borderRadius: "50%",
                background: "linear-gradient(135deg,#6366f1,#a855f7)",
                color: "#fff", fontSize: "0.78rem", fontWeight: 800,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>{n}</div>
              <div style={{ fontSize: "0.9rem", color: "#c8d6f0" }}>{t}</div>
            </div>
          ))}
        </div>

        {/* Rodapé minimalista */}
        <div style={{ textAlign: "center", fontSize: "0.78rem", color: "#4e5c72" }}>
          PostMaster · iaempresa.app · Acesso por convite
        </div>

      </div>
    </div>
  );
}
