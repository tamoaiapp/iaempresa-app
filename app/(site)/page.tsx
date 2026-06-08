import Link from "next/link";

export default function Home() {
  return (
    <section className="lt-wrap">
      {/* Fundo animado */}
      <div className="lt-grid" />
      <div className="lt-orb a" />
      <div className="lt-orb b" />

      <div className="lt-head">
        <h1 className="lt-title">Escolha seu aplicativo</h1>
        <p className="lt-sub">Programas prontos pra baixar e rodar no seu computador.</p>
      </div>

      <div className="lt-grid-cards">
        {/* PostMaster */}
        <Link
          href="/postmaster"
          className="lt-card c1"
          style={{ ["--accent" as string]: "#8b5cf6", ["--glow" as string]: "rgba(124,58,237,0.45)" }}
        >
          <span className="lt-scan" />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <span style={{ fontSize: "2.4rem" }}>📸</span>
            <span style={{
              fontSize: "0.72rem", fontWeight: 800, color: "#a78bfa",
              background: "rgba(99,102,241,0.18)", border: "1px solid rgba(99,102,241,0.4)",
              padding: "0.25rem 0.7rem", borderRadius: 20, letterSpacing: "0.5px",
            }}>INSTAGRAM</span>
          </div>
          <div style={{ fontWeight: 900, fontSize: "1.35rem", color: "var(--text)" }}>PostMaster</div>
          <p style={{ fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.65, flexGrow: 1 }}>
            Agenda e publica seus posts no Instagram com legenda escrita por IA. Você sobe as fotos, ele cuida do resto.
          </p>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.5rem", fontWeight: 900, color: "#a78bfa" }}>R$ 197</span>
            <span style={{ fontSize: "0.82rem", color: "var(--dim)" }}>pagamento único</span>
          </div>
          <span style={{
            marginTop: "0.5rem", textAlign: "center",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "#fff", padding: "0.75rem 1.5rem", borderRadius: 11,
            fontWeight: 700, fontSize: "0.95rem",
          }}>
            Conhecer o PostMaster →
          </span>
        </Link>

        {/* Robô da Bet */}
        <Link
          href="/robodabet"
          className="lt-card c2"
          style={{ ["--accent" as string]: "#00ff88", ["--glow" as string]: "rgba(0,255,136,0.4)" }}
        >
          <span className="lt-scan" />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <span style={{ fontSize: "2.4rem" }}>🤖</span>
            <span style={{
              fontSize: "0.72rem", fontWeight: 800, color: "#00ff88",
              background: "rgba(0,255,136,0.14)", border: "1px solid rgba(0,255,136,0.4)",
              padding: "0.25rem 0.7rem", borderRadius: 20, letterSpacing: "0.5px",
            }}>APOSTAS</span>
          </div>
          <div style={{ fontWeight: 900, fontSize: "1.35rem", color: "var(--text)" }}>Robô da Bet</div>
          <p style={{ fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.65, flexGrow: 1 }}>
            Robô que analisa jogos com modelo estatístico, calcula a aposta e mede o edge real (CLV). Você define o risco e ele roda sozinho.
          </p>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.5rem", fontWeight: 900, color: "#00ff88" }}>R$ 69</span>
            <span style={{ fontSize: "0.82rem", color: "var(--dim)" }}>oferta de lançamento</span>
          </div>
          <span style={{
            marginTop: "0.5rem", textAlign: "center",
            background: "linear-gradient(135deg, #00cc6a, #00ff88)",
            color: "#04120b", padding: "0.75rem 1.5rem", borderRadius: 11,
            fontWeight: 800, fontSize: "0.95rem",
          }}>
            Conhecer o Robô da Bet →
          </span>
        </Link>
      </div>
    </section>
  );
}
