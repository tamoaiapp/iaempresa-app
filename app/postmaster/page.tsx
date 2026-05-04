import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PostMaster — Poste no Instagram e TikTok no piloto automático",
  description:
    "Aplicativo Windows que posta Reels no Instagram e TikTok automaticamente, usando IA local gratuita. Sem mensalidade, sem API paga. Roda no seu PC 24h.",
  openGraph: {
    title: "PostMaster — Postagem automática com IA para Instagram e TikTok",
    description: "Poste Reels automaticamente no Instagram e TikTok, com legenda gerada por IA local. Sem mensalidade.",
    images: [{ url: "/postmaster-og.png", width: 1200, height: 630 }],
  },
};

const features = [
  {
    icon: "▶",
    title: "Busca vídeos no YouTube",
    desc: "Configure canais do YouTube e o PostMaster baixa, corta e converte automaticamente para o formato 9:16 de Reel.",
  },
  {
    icon: "🤖",
    title: "Legenda gerada por IA local",
    desc: "Usa o Ollama rodando no seu próprio PC. Sem pagar API, sem limite de uso, sem dados saindo da sua máquina.",
  },
  {
    icon: "📸",
    title: "Posta no Instagram e TikTok",
    desc: "Publica o Reel com a legenda e hashtags automaticamente. Suporta múltiplas contas nas duas plataformas.",
  },
  {
    icon: "⏱",
    title: "Agendamento flexível",
    desc: "Defina um intervalo fixo (ex: a cada 2h) ou uma janela de horário (ex: só das 08h às 22h).",
  },
  {
    icon: "🔍",
    title: "Filtros avançados de conteúdo",
    desc: "Filtre por duração mínima e máxima, palavras-chave obrigatórias ou bloqueadas, e pule vídeos já postados.",
  },
  {
    icon: "📂",
    title: "Seus próprios vídeos também",
    desc: "Além do YouTube, você pode apontar uma pasta local com seus vídeos e o PostMaster posta um por um automaticamente.",
  },
];

const steps = [
  { n: "1", title: "Baixe e instale", desc: "Instale o PostMaster no seu PC com Windows. Funciona em qualquer máquina." },
  { n: "2", title: "Adicione sua conta", desc: "Conecte sua conta do Instagram e/ou TikTok. Uma janela de login abre — você entra normalmente." },
  { n: "3", title: "Configure a automação", desc: "Escolha de onde pegar o conteúdo, os filtros, o tipo de legenda e o horário de postagem." },
  { n: "4", title: "Clique em Iniciar", desc: "O PostMaster roda em segundo plano e posta automaticamente no intervalo configurado." },
];

const faqs = [
  {
    q: "Precisa de internet 24h rodando?",
    a: "Sim, para baixar os vídeos do YouTube e fazer upload no Instagram/TikTok. Mas o PC não precisa ser potente — qualquer notebook serve.",
  },
  {
    q: "A IA de legenda é paga?",
    a: "Não. Usa o Ollama, que é 100% gratuito e roda localmente no seu PC. Não tem limite de uso e não envia dados para nenhum servidor externo.",
  },
  {
    q: "Funciona no Mac ou Linux?",
    a: "Por enquanto apenas Windows. Versão Mac está planejada.",
  },
  {
    q: "Posso usar em várias contas ao mesmo tempo?",
    a: "Sim. Você pode criar uma automação para cada conta e todas rodam em paralelo.",
  },
  {
    q: "Os vídeos que ele posta são meus?",
    a: "O PostMaster republica vídeos de canais públicos do YouTube. Você é responsável por garantir que tem permissão para usar o conteúdo. Recomendamos usar canais que permitem republicação ou criar suas próprias automações com conteúdo original.",
  },
  {
    q: "E se minha conta for banida?",
    a: "O PostMaster posta de forma similar a um usuário humano, mas sempre há risco ao automatizar redes sociais. Recomendamos começar com intervalos maiores (2h+) e monitorar os primeiros dias.",
  },
];

export default function PostmasterPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section style={{
        background: "linear-gradient(180deg, #0a0b14 0%, var(--bg) 100%)",
        padding: "5rem 1.25rem 4rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700, height: 400,
          background: "radial-gradient(ellipse, rgba(99,102,241,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", maxWidth: 800, margin: "0 auto" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)",
            color: "#a78bfa", borderRadius: 20, padding: "0.35rem 1rem",
            fontSize: "0.85rem", fontWeight: 600, marginBottom: "1.75rem",
          }}>
            🖥️ Aplicativo para Windows · IA local gratuita
          </div>

          <h1 style={{
            fontSize: "clamp(2.4rem, 6vw, 4rem)",
            fontWeight: 900, lineHeight: 1.1, marginBottom: "1.25rem",
          }}>
            Poste Reels no{" "}
            <span style={{ background: "linear-gradient(135deg,#f58529,#dd2a7b,#8134af)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Instagram
            </span>{" "}
            e{" "}
            <span style={{ background: "linear-gradient(135deg,#69c9d0,#010101)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              TikTok
            </span>
            <br />no piloto automático
          </h1>

          <p style={{ fontSize: "1.15rem", color: "#8394b0", maxWidth: 560, margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
            O PostMaster busca vídeos no YouTube, converte para Reel, gera a legenda com IA local e posta automaticamente — enquanto você faz outra coisa.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2rem" }}>
            <a href="#comprar" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              color: "#fff", padding: "0.9rem 2rem", borderRadius: 14,
              fontWeight: 700, fontSize: "1.05rem",
              boxShadow: "0 4px 24px rgba(99,102,241,0.4)",
              textDecoration: "none",
            }}>
              ⬇ Comprar agora
            </a>
            <a href="#como-funciona" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
              color: "#eef2f9", padding: "0.9rem 2rem", borderRadius: 14,
              fontWeight: 600, fontSize: "1.05rem", textDecoration: "none",
            }}>
              Como funciona →
            </a>
          </div>

          {/* Social proof badges */}
          <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
            {["✅ Sem mensalidade", "✅ IA 100% local e gratuita", "✅ Múltiplas contas", "✅ Instagram + TikTok"].map(t => (
              <span key={t} style={{ color: "#8394b0", fontSize: "0.875rem", fontWeight: 500 }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Demo visual ── */}
      <section style={{ padding: "0 1.25rem 4rem", textAlign: "center" }}>
        <div style={{
          maxWidth: 820, margin: "0 auto",
          background: "linear-gradient(135deg,rgba(99,102,241,0.1),rgba(168,85,247,0.08))",
          border: "1px solid rgba(99,102,241,0.2)",
          borderRadius: 20, padding: "2rem",
          fontFamily: "monospace", fontSize: "0.85rem",
          textAlign: "left", color: "#8394b0",
        }}>
          <div style={{ marginBottom: "0.75rem", display: "flex", gap: "6px" }}>
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#f85149", display: "inline-block" }} />
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#d29922", display: "inline-block" }} />
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#3fb950", display: "inline-block" }} />
          </div>
          {[
            ["#7c3aed", "📺 Canal: https://youtube.com/@sebrae/videos"],
            ["#8394b0", "   12 candidatos (60s–300s, inclui: dicas,negócio)"],
            ["#8394b0", "🎬 Como abrir um CNPJ em 2024 (143s)"],
            ["#8394b0", "⬇️ Baixando (máx 2 min)..."],
            ["#8394b0", "🎨 Convertendo para 9:16..."],
            ["#8394b0", "✅ Reel: 18.4MB"],
            ["#a78bfa", "🤖 Gerando legenda com IA..."],
            ["#8394b0", '   "💡 Abrir CNPJ ficou mais fácil! Veja o passo a passo..."'],
            ["#8394b0", "📤 Postando no Instagram..."],
            ["#3fb950", "✅ Reel postado! ⏰ Próximo em ~2h"],
          ].map(([color, text], i) => (
            <div key={i} style={{ color, marginBottom: "0.35rem" }}>{text as string}</div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ padding: "4rem 1.25rem", background: "var(--bg2)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.8rem,4vw,2.5rem)", fontWeight: 800, marginBottom: "0.75rem" }}>
            Tudo que você precisa para crescer no automático
          </h2>
          <p style={{ textAlign: "center", color: "#8394b0", marginBottom: "3rem", fontSize: "1.05rem" }}>
            Configure uma vez, ele posta para sempre.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: "1.25rem" }}>
            {features.map((f) => (
              <div key={f.title} style={{
                background: "var(--card)", border: "1px solid var(--line)",
                borderRadius: "var(--radius-lg)", padding: "1.5rem",
              }}>
                <div style={{ fontSize: "1.75rem", marginBottom: "0.75rem" }}>{f.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.5rem" }}>{f.title}</h3>
                <p style={{ color: "#8394b0", fontSize: "0.9rem", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Como funciona ── */}
      <section id="como-funciona" style={{ padding: "5rem 1.25rem" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 800, marginBottom: "0.75rem" }}>
            Como funciona
          </h2>
          <p style={{ textAlign: "center", color: "#8394b0", marginBottom: "3.5rem" }}>
            Do zero ao primeiro Reel postado em menos de 10 minutos.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", position: "relative" }}>
            <div style={{ position: "absolute", left: 27, top: 48, bottom: 48, width: 2, background: "rgba(99,102,241,0.2)" }} />
            {steps.map((s) => (
              <div key={s.n} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: "linear-gradient(135deg,#6366f1,#a855f7)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 900, fontSize: "1.1rem", flexShrink: 0, color: "#fff",
                  boxShadow: "0 0 0 4px rgba(99,102,241,0.15)",
                  position: "relative", zIndex: 1,
                }}>
                  {s.n}
                </div>
                <div style={{ paddingTop: "0.85rem" }}>
                  <h3 style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.35rem" }}>{s.title}</h3>
                  <p style={{ color: "#8394b0", fontSize: "0.9rem", lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Requisitos ── */}
      <section style={{ padding: "3rem 1.25rem 4rem", background: "var(--bg2)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "2rem" }}>Requisitos do sistema</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", textAlign: "left" }}>
            {[
              ["🖥️ Sistema", "Windows 10 ou 11"],
              ["💾 RAM", "4 GB mínimo (8 GB recomendado para IA)"],
              ["🌐 Conexão", "Internet (para baixar e postar)"],
              ["🤖 Ollama", "Gratuito — instalar separadamente"],
              ["📥 yt-dlp", "Gratuito — instalar separadamente"],
              ["💿 Espaço", "~500 MB para o app + downloads temporários"],
            ].map(([icon, text]) => (
              <div key={icon as string} style={{
                background: "var(--card)", border: "1px solid var(--line)",
                borderRadius: 12, padding: "0.875rem 1rem",
                display: "flex", flexDirection: "column", gap: "0.2rem",
              }}>
                <span style={{ color: "#8394b0", fontSize: "0.8rem", fontWeight: 600 }}>{icon as string}</span>
                <span style={{ fontSize: "0.9rem" }}>{text as string}</span>
              </div>
            ))}
          </div>
          <p style={{ color: "#8394b0", fontSize: "0.85rem", marginTop: "1.5rem", lineHeight: 1.6 }}>
            O guia de instalação do Ollama e yt-dlp está incluído na compra. São ferramentas gratuitas e fáceis de instalar.
          </p>
        </div>
      </section>

      {/* ── Preço ── */}
      <section id="comprar" style={{ padding: "5rem 1.25rem" }}>
        <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 800, marginBottom: "0.75rem" }}>
            Pagamento único, seu para sempre
          </h2>
          <p style={{ color: "#8394b0", marginBottom: "2.5rem" }}>
            Sem mensalidade. Sem limite de uso. Uma vez só.
          </p>

          <div style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(168,85,247,0.08))",
            border: "1px solid rgba(99,102,241,0.3)",
            borderRadius: 22, padding: "2.5rem 2rem",
          }}>
            <div style={{ fontSize: "0.9rem", color: "#8394b0", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
              PostMaster
            </div>
            <div style={{ fontSize: "clamp(3rem,8vw,4.5rem)", fontWeight: 900, lineHeight: 1, marginBottom: "0.25rem" }}>
              R$ 97
            </div>
            <div style={{ color: "#8394b0", fontSize: "0.9rem", marginBottom: "2rem" }}>pagamento único · sem mensalidade</div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", textAlign: "left", marginBottom: "2rem" }}>
              {[
                "App PostMaster para Windows",
                "Atualizações grátis por 1 ano",
                "Suporte por e-mail",
                "Guia de instalação passo a passo",
                "Filtros avançados de conteúdo",
                "Múltiplas contas Instagram e TikTok",
                "IA local — sem custo de API",
              ].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.95rem" }}>
                  <span style={{ color: "#16c784", fontWeight: 700 }}>✓</span> {item}
                </div>
              ))}
            </div>

            <a href="mailto:contato@iaempresa.app?subject=Compra PostMaster" style={{
              display: "block",
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              color: "#fff", padding: "1rem",
              borderRadius: 14, fontWeight: 700, fontSize: "1.05rem",
              textDecoration: "none", textAlign: "center",
              boxShadow: "0 4px 24px rgba(99,102,241,0.4)",
              marginBottom: "1rem",
            }}>
              ⬇ Comprar PostMaster — R$ 97
            </a>

            <p style={{ color: "#4e5c72", fontSize: "0.8rem" }}>
              Após o pagamento você recebe o link de download e a chave de ativação por e-mail em até 10 minutos.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "3rem 1.25rem 5rem", background: "var(--bg2)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "1.8rem", fontWeight: 800, marginBottom: "2.5rem" }}>
            Dúvidas frequentes
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {faqs.map((f) => (
              <div key={f.q} style={{
                background: "var(--card)", border: "1px solid var(--line)",
                borderRadius: 14, padding: "1.25rem 1.5rem",
              }}>
                <div style={{ fontWeight: 700, marginBottom: "0.5rem", fontSize: "0.975rem" }}>{f.q}</div>
                <div style={{ color: "#8394b0", fontSize: "0.9rem", lineHeight: 1.6 }}>{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section style={{ padding: "5rem 1.25rem", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.5rem)", fontWeight: 800, marginBottom: "1rem" }}>
            Pronto para postar no automático?
          </h2>
          <p style={{ color: "#8394b0", marginBottom: "2rem", fontSize: "1.05rem" }}>
            Configure uma vez. O PostMaster cuida do resto.
          </p>
          <a href="#comprar" style={{
            display: "inline-block",
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            color: "#fff", padding: "1rem 2.5rem",
            borderRadius: 14, fontWeight: 700, fontSize: "1.05rem",
            textDecoration: "none",
            boxShadow: "0 4px 24px rgba(99,102,241,0.4)",
          }}>
            ⬇ Comprar PostMaster — R$ 97
          </a>
          <p style={{ color: "#4e5c72", fontSize: "0.8rem", marginTop: "1rem" }}>
            Dúvidas? Fale com a gente: <a href="mailto:contato@iaempresa.app" style={{ color: "#8394b0" }}>contato@iaempresa.app</a>
          </p>
        </div>
      </section>
    </>
  );
}
