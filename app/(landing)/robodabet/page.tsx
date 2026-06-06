"use client";
import { useState } from "react";

const WHATSAPP = "5511967245795";

async function handleCheckout(setLoading: (v: boolean) => void) {
  setLoading(true);
  try {
    const res = await fetch("/api/checkout/robodabet", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else alert("Erro ao iniciar pagamento. Tente novamente.");
  } catch {
    alert("Erro ao conectar. Tente novamente.");
  } finally {
    setLoading(false);
  }
}

export default function RoboDaBetLanding() {
  const [loading, setLoading] = useState(false);

  return (
    <div style={{
      minHeight: "100vh",
      background: `
        radial-gradient(circle at 20% 10%, rgba(0,255,136,0.10), transparent 50%),
        radial-gradient(circle at 80% 90%, rgba(255,215,0,0.06), transparent 50%),
        #000`,
      color: "#e8f5ee",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>
      {/* HERO */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px 60px", textAlign: "center" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(0,255,136,0.10)", border: "1px solid rgba(0,255,136,0.3)",
          padding: "6px 14px", borderRadius: 20, fontSize: 12,
          color: "#00ff88", fontWeight: 700, letterSpacing: 1, marginBottom: 24,
        }}>
          🏆 ESTREIA NA COPA DO MUNDO 2026
        </div>

        <h1 style={{
          fontSize: "clamp(36px, 6vw, 64px)",
          fontWeight: 900,
          lineHeight: 1.05,
          letterSpacing: -2,
          margin: "0 0 18px",
          background: "linear-gradient(90deg, #fff, #00f0d0 60%, #00ff88)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          O robô que aposta<br />em escanteios sozinho.
        </h1>

        <p style={{
          fontSize: 18, lineHeight: 1.6, color: "#9ec5b1",
          maxWidth: 680, margin: "0 auto 36px",
        }}>
          Modelo estatístico baseado em <strong style={{ color: "#fff" }}>87 mil jogos históricos</strong> +
          medição de CLV em tempo real. Você liga, ele acha as oportunidades no KTO e aposta.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <button
            onClick={() => handleCheckout(setLoading)}
            disabled={loading}
            style={{
              background: "linear-gradient(135deg, #00ff88, #00b86b)",
              color: "#001a0d",
              fontWeight: 800,
              fontSize: 16,
              padding: "16px 32px",
              border: "none",
              borderRadius: 12,
              cursor: loading ? "wait" : "pointer",
              boxShadow: "0 0 24px rgba(0,255,136,0.4)",
              letterSpacing: 0.5,
            }}
          >
            {loading ? "Abrindo checkout..." : "🚀 Comprar — R$ 197 único"}
          </button>
          <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Oi! Quero saber mais do Robô da Bet")}`}
            target="_blank" rel="noopener"
            style={{
              background: "rgba(255,255,255,0.05)",
              color: "#e8f5ee",
              fontWeight: 700,
              fontSize: 15,
              padding: "16px 28px",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 12,
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            💬 Tirar dúvida no WhatsApp
          </a>
        </div>

        <p style={{ marginTop: 18, fontSize: 12, color: "#5e7d6f", textTransform: "uppercase", letterSpacing: 1 }}>
          Pagamento único · Auto-update grátis · Suporte direto via TamoIA
        </p>
      </section>

      {/* FEATURES */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {[
            { icon: "📊", title: "Modelo Poisson calibrado", desc: "Distribuição matemática correta pra cantos. Validado em 87k jogos da Premier League, Bundesliga, Serie A e mais." },
            { icon: "🎚", title: "Slider de risco", desc: "Conservador, Equilibrado ou Agressivo. Controla EV mínimo, Kelly e stake máximo. Você no comando." },
            { icon: "🛑", title: "Stop-loss diário", desc: "Bot para sozinho se perder mais de 10% do bankroll no dia. Sem tilt automatizado." },
            { icon: "📈", title: "CLV em tempo real", desc: "Mede o valor real de cada aposta (odd no momento vs 5min antes do jogo). Sabe se está ganhando edge." },
            { icon: "🤖", title: "Modo Simulação", desc: "Roda sem dinheiro real primeiro. Vê o bot funcionar por 1-2 semanas antes de ativar apostas reais." },
            { icon: "💬", title: "TamoIA Suporte", desc: "Chat dentro do app com IA que vê seus logs, settings e histórico. Resolve direto, sem fila." },
          ].map(f => (
            <div key={f.title} style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(0,255,136,0.15)",
              borderRadius: 14,
              padding: 22,
            }}>
              <div style={{ fontSize: 30, marginBottom: 10 }}>{f.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: "#9ec5b1", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DISCLAIMER */}
      <section style={{ maxWidth: 700, margin: "60px auto", padding: "0 24px" }}>
        <div style={{
          background: "rgba(255,215,0,0.06)",
          border: "1px solid rgba(255,215,0,0.25)",
          borderRadius: 12,
          padding: 22,
          fontSize: 13,
          lineHeight: 1.7,
          color: "#d4c374",
        }}>
          <strong style={{ color: "#ffd700" }}>⚠️ Aviso obrigatório:</strong> Apostas envolvem risco real
          de perda. Robô da Bet é ferramenta experimental — modelo estatístico NÃO garante lucro.
          Use apenas dinheiro que pode perder. Não use como fonte de renda. Maiores de 18 anos.
          Jogo responsável: <a href="https://jogoresponsavel.gov.br" style={{ color: "#ffd700" }}>jogoresponsavel.gov.br</a>.
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ maxWidth: 700, margin: "0 auto 100px", padding: "0 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 16 }}>
          Copa começa <span style={{ color: "#00ff88" }}>11 de junho</span>.
        </h2>
        <p style={{ color: "#9ec5b1", marginBottom: 28, fontSize: 16 }}>
          104 jogos, 38 dias. Bot pronto pra rodar do primeiro apito.
        </p>
        <button
          onClick={() => handleCheckout(setLoading)}
          disabled={loading}
          style={{
            background: "linear-gradient(135deg, #ffd700, #d4a800)",
            color: "#1a0d00",
            fontWeight: 800,
            fontSize: 17,
            padding: "18px 36px",
            border: "none",
            borderRadius: 12,
            cursor: loading ? "wait" : "pointer",
            boxShadow: "0 0 24px rgba(255,215,0,0.4)",
          }}
        >
          {loading ? "Abrindo..." : "🏆 Comprar e baixar — R$ 197"}
        </button>
      </section>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "30px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "#5e7d6f" }}>
          © {new Date().getFullYear()} iaempresa.app · <a href="/termos" style={{ color: "#5e7d6f" }}>Termos</a> ·{" "}
          <a href="/privacidade" style={{ color: "#5e7d6f" }}>Privacidade</a>
        </p>
      </footer>
    </div>
  );
}
