"use client";
import { useState, useEffect } from "react";

/**
 * /postmaster/teste-24h — página de trial.
 *
 * Modelo honesto: o PostMaster não tem trava de licença no app. A pessoa baixa,
 * usa por 24h, e se gostar paga R$197 (que dá direito a 1 ano de atualizações).
 * Não fingimos lock. Marketing direto: "confiamos em você".
 *
 * Download aponta pro asset .exe do release mais recente no GitHub
 * (tamoaiapp/postmaster). Independente de tier — auto-update resolve o resto.
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

const BTN_GHOST = {
  background: "rgba(255,255,255,0.05)",
  color: "#eef2f9", borderRadius: 14, fontWeight: 700,
  border: "1px solid rgba(255,255,255,0.12)", cursor: "pointer",
};

export default function Teste24hPage() {
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  // Marca que clicou em download (vira UX pós-clique: vídeo de "como liberar" + CTA pra comprar)
  function handleDownload() {
    setDownloadStarted(true);
    setShowVideo(true);
    // (download via <a href> com download attribute — o navegador resolve)
  }

  // Salva timestamp do início do trial no localStorage (se quiser fazer reengage por e-mail depois)
  useEffect(() => {
    if (downloadStarted && typeof window !== "undefined") {
      const existing = localStorage.getItem("pm_trial_started_at");
      if (!existing) localStorage.setItem("pm_trial_started_at", new Date().toISOString());
    }
  }, [downloadStarted]);

  return (
    <div style={{
      background: "var(--bg)", color: "var(--text)",
      fontFamily: "'Outfit', sans-serif", minHeight: "100vh",
      padding: "2rem 1.25rem 5rem",
    }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>

        {/* Pill confiança */}
        <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "rgba(22,199,132,0.1)", border: "1px solid rgba(22,199,132,0.3)",
            color: "#16c784", borderRadius: 20, padding: "0.35rem 1rem",
            fontSize: "0.85rem", fontWeight: 700,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#16c784" }} />
            Tudo liberado — sem cartão, sem cadastro
          </div>
        </div>

        {/* Hero */}
        <h1 style={{
          textAlign: "center",
          fontSize: "clamp(2rem,4.5vw,3.2rem)",
          fontWeight: 900, lineHeight: 1.1, marginBottom: "1rem",
          letterSpacing: "-0.02em",
        }}>
          Teste o PostMaster por <span style={{
            background: "linear-gradient(135deg,#6366f1,#a855f7)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>24 horas</span> antes de decidir
        </h1>

        <p style={{
          textAlign: "center", fontSize: "1.05rem", color: "#8394b0",
          lineHeight: 1.65, maxWidth: 540, margin: "0 auto 2rem",
        }}>
          Baixa, instala, conecta seu Instagram ou TikTok e vê acontecer.
          Sem trava, sem demo limitada — tudo liberado igualzinho a quem pagou.
          Se gostar, depois você compra.
        </p>

        {/* CTA download */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <a
            href={DOWNLOAD_URL}
            onClick={handleDownload}
            style={{
              ...BTN, display: "inline-flex", alignItems: "center", gap: "0.6rem",
              padding: "1.15rem 2.5rem", fontSize: "1.1rem", textDecoration: "none",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Baixar agora — grátis por 24h
          </a>
          <div style={{
            fontSize: "0.82rem", color: "#4e5c72", marginTop: "0.85rem",
            display: "flex", justifyContent: "center", gap: "0.9rem", flexWrap: "wrap",
          }}>
            <span>Windows 10/11</span>
            <span>·</span>
            <span>~534 MB</span>
            <span>·</span>
            <span>Instala em 2 minutos</span>
          </div>
        </div>

        {/* Post-click: vídeo de como liberar Windows SmartScreen */}
        {showVideo && (
          <div style={{
            background: "linear-gradient(135deg, rgba(245,158,11,0.14), rgba(245,158,11,0.06))",
            border: "1.5px solid rgba(245,158,11,0.4)",
            borderRadius: 16, padding: "1.25rem 1.5rem",
            marginBottom: "2rem", textAlign: "center",
          }}>
            <div style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>📺</div>
            <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "#f59e0b", marginBottom: "0.4rem" }}>
              Assista ANTES de instalar
            </div>
            <p style={{ fontSize: "0.88rem", color: "#eef2f9", lineHeight: 1.55, marginBottom: "1rem" }}>
              Windows pode mostrar &ldquo;PC protegido&rdquo;. Em 30 segundos te mostro como liberar.
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <video
                controls
                playsInline
                preload="metadata"
                style={{
                  width: "100%", maxWidth: 320, aspectRatio: "9 / 16",
                  borderRadius: 14, background: "#000",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <source src={VIDEO_LIBERAR} type="video/mp4" />
              </video>
            </div>
          </div>
        )}

        {/* Como funciona o trial — 3 cards */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: "0.85rem", marginBottom: "2.5rem",
        }}>
          {[
            { ico: "1", title: "Baixa e instala", desc: "Download começa agora. Instalação em 2 min, sem cadastro." },
            { ico: "2", title: "Conecta sua conta", desc: "Faz login no Instagram/TikTok dentro do app. Sessão fica salva." },
            { ico: "3", title: "Usa por 24h livre", desc: "Tudo liberado igual quem pagou. Se gostar, depois você compra." },
          ].map(s => (
            <div key={s.title} style={{
              background: "var(--card)", border: "1px solid var(--line)",
              borderRadius: 16, padding: "1.1rem",
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: "linear-gradient(135deg,#6366f1,#a855f7)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 900, color: "#fff", fontSize: "0.95rem", marginBottom: "0.65rem",
              }}>{s.ico}</div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.3rem" }}>{s.title}</div>
              <div style={{ fontSize: "0.82rem", color: "#8394b0", lineHeight: 1.55 }}>{s.desc}</div>
            </div>
          ))}
        </div>

        {/* Bloco honestidade — porque trial assim funciona */}
        <div style={{
          background: "rgba(99,102,241,0.06)",
          border: "1px solid rgba(99,102,241,0.2)",
          borderRadius: 16, padding: "1.5rem", marginBottom: "2rem",
        }}>
          <div style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
            <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>🤝</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.97rem", color: "#eef2f9", marginBottom: "0.4rem" }}>
                Sem trava no app — confiamos em você
              </div>
              <p style={{ fontSize: "0.86rem", color: "#8394b0", lineHeight: 1.65, margin: 0 }}>
                Não tem código de ativação que expira nem versão &ldquo;demo&rdquo; mutilada.
                Você baixa o app inteiro, usa as 24 horas — se gostar, paga os R$197
                e fica com tudo (mais 1 ano de atualizações). Quem não paga, a gente
                não persegue. É na palavra.
              </p>
            </div>
          </div>
        </div>

        {/* CTA secundário: comprar antes mesmo */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.85rem",
          padding: "1.75rem 1.25rem", background: "var(--card)",
          border: "1px solid var(--line)", borderRadius: 16, marginBottom: "1.5rem",
        }}>
          <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#eef2f9" }}>
            Já decidido? Compra direto e economiza tempo.
          </div>
          <div style={{ fontSize: "0.82rem", color: "#8394b0", textAlign: "center", maxWidth: 480 }}>
            R$ 197 à vista. Pagamento via Pix ou cartão. 7 dias de garantia
            total — se não gostar, devolvo 100%.
          </div>
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", justifyContent: "center" }}>
            <a href="/postmaster#comprar" style={{
              ...BTN, padding: "0.85rem 1.5rem", fontSize: "0.95rem",
              textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem",
            }}>
              Comprar agora — R$ 197
            </a>
            <a href={whatsappLink("Oi! Baixei o trial de 24h. Quero tirar uma dúvida antes de decidir.")}
               target="_blank" rel="noopener noreferrer" style={{
              ...BTN_GHOST, padding: "0.85rem 1.5rem", fontSize: "0.95rem",
              textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#16c784"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.74.46 3.42 1.31 4.93L2 22l5.21-1.29C8.7 21.55 10.31 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" /></svg>
              Tirar dúvida
            </a>
          </div>
        </div>

        {/* FAQ curto */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h2 style={{
            fontSize: "0.85rem", fontWeight: 800, marginBottom: "1rem",
            textAlign: "center", color: "#8394b0", textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}>
            Perguntas rápidas
          </h2>
          {[
            ["Vou conseguir usar tudo nas 24h mesmo?", "Sim. Não tem versão demo ou trava — você baixa o app cheio. Posts ilimitados, IA grátis ilimitada, múltiplas contas. Igual quem comprou."],
            ["E depois das 24h o app para de funcionar?", "Não. Como não tem lock, ele segue rodando. A ideia é que você teste sem pressão de tempo e decida na confiança. Se gostar, compra; se não, desinstala."],
            ["Por que vocês fazem assim?", "Porque software de automação só convence rodando. Vídeo de demo não basta. A gente prefere perder alguns que não pagam e ganhar muitos que viram clientes felizes."],
          ].map(([q, a]) => (
            <details key={q} style={{
              background: "var(--card)", border: "1px solid var(--line)",
              borderRadius: 12, padding: "0.9rem 1.1rem", marginBottom: "0.5rem",
              fontSize: "0.88rem",
            }}>
              <summary style={{ fontWeight: 700, cursor: "pointer", color: "#eef2f9" }}>{q}</summary>
              <p style={{ marginTop: "0.6rem", color: "#8394b0", lineHeight: 1.65 }}>{a}</p>
            </details>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <a href="/postmaster" style={{ color: "#8394b0", fontSize: "0.85rem", textDecoration: "none" }}>
            ← Voltar pra página principal do PostMaster
          </a>
        </div>

      </div>
    </div>
  );
}
