"use client";
import Image from "next/image";
import { useState } from "react";

const WHATSAPP_SUPPORT = "5511967245795";

const features = [
  {
    color: "#00ff88",
    bg: "rgba(0,255,136,0.06)",
    border: "rgba(0,255,136,0.22)",
    icon: "📊",
    title: "Modelo estatístico em 87 mil jogos",
    desc: "Distribuição matemática calibrada com EPL, Bundesliga, Serie A, Ligue 1, La Liga e Copa do Mundo. Não é palpite — é matemática validada em volume.",
  },
  {
    color: "#ffd700",
    bg: "rgba(255,215,0,0.06)",
    border: "rgba(255,215,0,0.22)",
    icon: "🎚️",
    title: "Slider de risco — você no comando",
    desc: "Conservador (prob ≥70%, stake R$1), Equilibrado (EV ≥5%, Kelly 1/4) ou Agressivo (azarões com odd 3+). Ajusta no app, sem código.",
  },
  {
    color: "#69c9d0",
    bg: "rgba(105,201,208,0.06)",
    border: "rgba(105,201,208,0.22)",
    icon: "🛑",
    title: "Stop-loss e limite diário",
    desc: "Define quantas apostas por dia e quanto stake máximo. Bot para sozinho se atingir. Sem tilt automatizado, sem perda descontrolada.",
  },
  {
    color: "#a855f7",
    bg: "rgba(168,85,247,0.08)",
    border: "rgba(168,85,247,0.22)",
    icon: "📈",
    title: "CLV em tempo real (Closing Line Value)",
    desc: "Compara a odd que você pegou com a odd 5min antes do jogo. CLV+ = edge real comprovado. Se a métrica é negativa por semanas, o app avisa.",
  },
  {
    color: "#16c784",
    bg: "rgba(22,199,132,0.07)",
    border: "rgba(22,199,132,0.22)",
    icon: "🤖",
    title: "Modo simulação antes de apostar real",
    desc: "Roda 1-2 semanas sem dinheiro. Você vê o bot escolhendo, calculando EV e medindo CLV — sem risco. Só ativa real quando estiver convencido.",
  },
  {
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.22)",
    icon: "💬",
    title: "TamoIA — suporte dentro do app",
    desc: "Chat com IA que vê seus logs, configuração e histórico. Resolve dúvida na hora, sem fila, sem ticket. Funciona dentro do próprio Robô.",
  },
];

const painPoints = [
  {
    title: "2 horas por dia analisando jogos",
    desc: "Olhar tabela, ver últimos confrontos, calcular probabilidades, comparar com odd. Todo santo dia. Quando vê, perdeu o horário bom.",
  },
  {
    title: "Aposta no emocional, perde por tilt",
    desc: "Perdeu duas, dobra a próxima pra recuperar. Ganhou três, sobe stake porque acha que tá quente. No fim do mês, banca zera.",
  },
  {
    title: "Não sabe se tem edge real",
    desc: "Acerta 60% e acha que tá ganhando. Mas se a odd média era 1.50, você precisa de 67% pra empatar. Sem CLV, é fé — não estratégia.",
  },
  {
    title: "Tip de telegram a R$300/mês",
    desc: "Grupo de palpite cobra mensalidade. Em 1 ano, R$3.600. E ninguém mostra histórico real, só print de green. Você paga pra adivinhar.",
  },
];

const comparison = [
  ["Tempo por aposta", "30min–1h (análise + cadastro)", "0 minuto — automático"],
  ["Apostas por mês", "5 a 20 (quando sobra tempo)", "Ilimitado — você define o limite"],
  ["Mensalidade do grupo de tips", "R$ 150–R$ 400/mês", "R$ 0 — sem grupo, sem tip"],
  ["Critério da entrada", "Sentimento, palpite, sorte", "Modelo Poisson + EV ≥ 5%"],
  ["Mede edge real (CLV)?", "Não — você só vê green/red", "Sim — CLV calculado em cada aposta"],
  ["Funciona enquanto você dorme", "Não", "Sim — 24h, ciclo automático"],
];

const steps = [
  { n: "1", title: "Instala em 2 minutos", desc: "Baixa o .exe, instala no Windows e abre. Sem configuração técnica, sem terminal. Funciona em qualquer notebook." },
  { n: "2", title: "Conecta sua casa de aposta", desc: "Entra na sua casa pelo navegador embutido — uma vez só. Sessão fica salva, bot usa pra apostar. Você não compartilha senha com ninguém." },
  { n: "3", title: "Escolhe seu perfil de risco", desc: "Arrasta o slider — Conservador, Equilibrado ou Agressivo. Define stake máximo (R$1, R$2, R$5) e quantas apostas por dia." },
  { n: "4", title: "Clica em Iniciar e esquece", desc: "O Robô da Bet roda em segundo plano. Procura jogos, calcula EV, aposta sozinho. Você fecha a janela — ele continua." },
];

const faqs = [
  {
    q: "Apostar com bot é legal? Vou tomar ban?",
    a: "O Robô da Bet usa seu navegador real, com sua sessão logada — o mesmo comportamento de quem aposta à mão. Não usa API privada, não tem velocidade desumana, faz intervalos naturais entre apostas. Usar modelo estatístico pra decidir uma aposta nunca foi proibido — profissional faz isso há décadas. Recomendamos stake baixo nas primeiras semanas + não apostar em chunks gigantes — o app já faz isso por padrão.",
  },
  {
    q: "Vou ganhar dinheiro garantido?",
    a: "Não. Apostas envolvem risco real e o modelo estatístico NÃO garante lucro. O que o Robô da Bet faz é: aplicar regras matemáticas (EV positivo, Kelly fracionário, stop-loss) e medir CLV pra ver se você tem edge real. Se a métrica der negativa, ele te avisa. O ganho de verdade vem de disciplina + sorte de variância — não de promessa.",
  },
  {
    q: "Posso testar antes de pagar?",
    a: "Sim — o app tem modo simulação embutido. Você instala, roda 1-2 semanas sem dinheiro real e vê tudo funcionando: que jogos ele pega, que odd, que EV, que CLV. Só ativa modo real quando estiver convencido. Além disso, oferecemos 7 dias de garantia: não gostou, devolvemos 100%.",
  },
  {
    q: "Como o robô escolhe a aposta?",
    a: "Pra cada jogo disponível, ele puxa as estatísticas históricas da liga (calibradas em 87k jogos) e calcula a probabilidade real do resultado acontecer via distribuição estatística. Compara com a odd da casa. Se a probabilidade real × odd > 1.05 (ou seja, o jogo tem +5% de valor além da odd), entra. Senão, passa pro próximo. É o mesmo método que profissional usa há décadas — só que automatizado e rodando 24h. O bot só entra onde a matemática diz que tem vantagem.",
  },
  {
    q: "Funciona pra qualquer tipo de aposta?",
    a: "O robô analisa todos os mercados disponíveis (resultado final, gols, totais, ambas marcam, escanteios e mais) e seleciona aquele com a maior probabilidade matemática de ganhar — não palpite, não 'feeling'. Conforme o modelo evolui, novos submercados entram via update. Quem comprou agora recebe todas as expansões grátis por 1 ano. Você escolhe quais mercados quer ativar.",
  },
  {
    q: "Preciso deixar o PC ligado?",
    a: "Sim — o PC precisa estar ligado e com internet pra o bot rodar o ciclo (1× por dia ou frequência que você escolher). Mas não precisa ser potente — qualquer notebook serve. Muitos clientes deixam um notebook velho ligado 24h só rodando o app.",
  },
  {
    q: "Funciona no Mac ou celular?",
    a: "Por enquanto só Windows 10 e 11. Versão Mac no roadmap, sem data confirmada. Celular não — apostas precisam do navegador desktop logado pra funcionar com a casa. Se você só tem Mac, considera instalar em qualquer PC velho.",
  },
  {
    q: "Quanto preciso ter de banca pra começar?",
    a: "Mínimo recomendado: R$ 100. Bot calcula stake via Kelly fracionário (0.125x no Conservador, 0.25x no Equilibrado), então com banca pequena ele aposta R$0,50 a R$2 por jogo. Stake nunca passa de 2% da banca. Conforme a banca cresce, o stake cresce junto — proporcional.",
  },
  {
    q: "Como recebo o app depois de comprar?",
    a: "Após o pagamento aprovado (Pix em ~30 segundos, cartão em ~5 minutos), você recebe um e-mail com o link de download direto e instruções. O instalador é Windows EXE — baixa, executa e instala em 2 minutos.",
  },
  {
    q: "E as atualizações?",
    a: "Auto-update automático via electron-updater. Sempre na versão mais nova sem precisar baixar de novo. Por 1 ano após a compra, todas as atualizações de funcionalidade (novos mercados, novos modelos, melhorias de UI) entram automaticamente.",
  },
  {
    q: "E se eu não souber nada de aposta?",
    a: "Melhor ainda. O Robô da Bet foi feito justamente pra você não precisar saber. Ele escolhe os jogos, calcula EV, aposta e acompanha. Você só configura seu nível de risco e quanto quer arriscar por dia. O resto é com a máquina.",
  },
  {
    q: "E se não funcionar pra mim?",
    a: "7 dias de garantia total. Se não gostar por qualquer motivo, manda um e-mail e devolvemos 100% do valor. Sem burocracia, sem perguntar por quê. Você corre risco zero pra testar.",
  },
];

const BTN_GOLD = {
  background: "linear-gradient(135deg,#ffd700,#d4a800)",
  color: "#1a0d00", borderRadius: 14, fontWeight: 800,
  border: "none", cursor: "pointer",
  boxShadow: "0 4px 32px rgba(255,215,0,0.35)",
};

const BTN_GREEN = {
  background: "linear-gradient(135deg,#00ff88,#00b86b)",
  color: "#001a0d", borderRadius: 14, fontWeight: 800,
  border: "none", cursor: "pointer",
  boxShadow: "0 4px 32px rgba(0,255,136,0.4)",
};

const BTN_GHOST = {
  background: "rgba(255,255,255,0.05)",
  color: "#e8f5ee", borderRadius: 14, fontWeight: 700,
  border: "1px solid rgba(255,255,255,0.15)", cursor: "pointer",
};

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

function whatsappLink() {
  const text = encodeURIComponent("Oi! Quero saber mais do Robô da Bet antes de comprar.");
  return `https://wa.me/${WHATSAPP_SUPPORT}?text=${text}`;
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid",
      borderColor: open ? "rgba(0,255,136,0.4)" : "rgba(255,255,255,0.08)",
      borderRadius: 14, overflow: "hidden", transition: "border-color 0.2s",
    }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%", textAlign: "left", background: "none", border: "none",
          padding: "1.1rem 1.5rem", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem",
          color: "#e8f5ee", fontSize: "0.975rem", fontWeight: 700, fontFamily: "inherit",
        }}>
        <span>{q}</span>
        <span style={{
          flexShrink: 0, width: 24, height: 24, borderRadius: "50%",
          background: open ? "rgba(0,255,136,0.18)" : "rgba(255,255,255,0.05)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "transform 0.25s, background 0.2s",
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          color: open ? "#00ff88" : "#9ec5b1", fontSize: "1.1rem", lineHeight: 1,
        }}>+</span>
      </button>
      <div style={{ maxHeight: open ? 600 : 0, overflow: "hidden", transition: "max-height 0.3s ease" }}>
        <div style={{ padding: "0 1.5rem 1.25rem", color: "#9ec5b1", fontSize: "0.92rem", lineHeight: 1.65 }}>{a}</div>
      </div>
    </div>
  );
}

export default function RoboDaBetLanding() {
  const [loading, setLoading] = useState(false);
  const buy = () => handleCheckout(setLoading);

  return (
    <div style={{
      background: `
        radial-gradient(circle at 20% 10%, rgba(0,255,136,0.08), transparent 50%),
        radial-gradient(circle at 80% 90%, rgba(255,215,0,0.05), transparent 50%),
        #050808`,
      color: "#e8f5ee",
      fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      minHeight: "100vh",
    }}>

      {/* ── Nav ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(5,8,8,0.93)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "0 1.5rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 58,
      }}>
        <a href="/" style={{ textDecoration: "none", fontWeight: 800, fontSize: "1.05rem", color: "#e8f5ee" }}>
          iaempresa<span style={{ color: "#00ff88" }}>.app</span>
        </a>
        <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" style={{
            ...BTN_GHOST, padding: "0.45rem 1rem", fontSize: "0.82rem",
            textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#00ff88"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.74.46 3.42 1.31 4.93L2 22l5.21-1.29C8.7 21.55 10.31 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" /></svg>
            Tirar dúvida
          </a>
          <button onClick={buy} disabled={loading} style={{
            ...BTN_GREEN, padding: "0.45rem 1.25rem", fontSize: "0.875rem",
            cursor: loading ? "wait" : "pointer",
          }}>
            {loading ? "..." : "Quero agora — R$ 69"}
          </button>
        </div>
      </nav>

      {/* ── Faixa de urgência ── */}
      <div style={{
        background: "linear-gradient(90deg,#00ff88,#00b86b)",
        textAlign: "center", padding: "0.55rem 1rem",
        fontSize: "0.85rem", fontWeight: 700, color: "#001a0d",
        display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap",
      }}>
        <span>🏆 Oferta de lançamento — <strong>R$ 69</strong> à vista (depois sobe pra R$ 197)</span>
      </div>

      {/* ── Hero ── */}
      <section style={{ padding: "4.5rem 1.5rem 4rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "1.5rem", position: "relative" }}>
            <div style={{
              position: "absolute", left: "50%", top: "50%",
              transform: "translate(-50%,-50%)",
              width: 220, height: 220, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0,255,136,0.35) 0%, transparent 65%)",
              pointerEvents: "none", filter: "blur(8px)",
            }} />
            <Image src="/robodabet-logo.png" alt="Robô da Bet" width={170} height={170}
              priority
              style={{
                display: "inline-block", position: "relative",
                borderRadius: "50%",
                boxShadow: "0 0 60px rgba(0,255,136,0.4), 0 0 0 2px rgba(0,255,136,0.25)",
                background: "#000",
              }} />
          </div>

          <div style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: "clamp(1.4rem, 3vw, 2rem)",
            fontWeight: 900,
            letterSpacing: "0.18em",
            color: "#00ff88",
            textShadow: "0 0 20px rgba(0,255,136,0.6), 0 0 40px rgba(0,255,136,0.3)",
          }}>
            ROBÔ DA BET
          </div>

          <h1 style={{
            textAlign: "center",
            fontSize: "clamp(2.4rem,5vw,4.2rem)",
            fontWeight: 900, lineHeight: 1.05, letterSpacing: -1, marginBottom: "1.1rem",
          }}>
            O robô que aposta e{" "}
            <span style={{ background: "linear-gradient(90deg,#fff,#00f0d0 60%,#00ff88)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              cuida da sua banca
            </span>
            <br />24 horas por dia
          </h1>

          <p style={{ textAlign: "center", fontSize: "1.1rem", color: "#9ec5b1", lineHeight: 1.7, maxWidth: 680, margin: "0 auto 2rem" }}>
            Modelo estatístico calibrado em <strong style={{ color: "#fff" }}>87 mil jogos</strong>, slider de risco, stop-loss automático e CLV em tempo real.
            Você configura em 5 minutos. Ele aposta, mede o edge e cuida da banca enquanto você vive sua vida.
          </p>

          {/* CTA principal */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", marginBottom: "1.75rem" }}>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <button onClick={buy} disabled={loading} style={{
                ...BTN_GREEN, padding: "1.05rem 2rem", fontSize: "1.05rem",
                cursor: loading ? "wait" : "pointer", opacity: loading ? 0.7 : 1,
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
              }}>
                {loading ? "Redirecionando..." : "🚀 Comprar agora — R$ 69"}
              </button>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" style={{
                ...BTN_GHOST, padding: "1.05rem 2rem", fontSize: "1.05rem",
                textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem",
              }}>
                💬 Tirar dúvida primeiro
              </a>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", fontSize: "0.82rem", color: "#5e7d6f", flexWrap: "wrap", justifyContent: "center" }}>
              <span>🛡️ 7 dias de garantia</span>
              <span>·</span>
              <span>Auto-update grátis 1 ano</span>
              <span>·</span>
              <a href="#como-funciona" style={{ color: "#9ec5b1", textDecoration: "none" }}>Ver como funciona ↓</a>
            </div>
          </div>

          {/* Trust badges */}
          <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "3.5rem" }}>
            {["Pagamento único", "Sem mensalidade", "Modo simulação", "Stop-loss embutido", "Suporte TamoIA"].map(t => (
              <span key={t} style={{ color: "#9ec5b1", fontSize: "0.82rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <span style={{ color: "#00ff88" }}>✓</span> {t}
              </span>
            ))}
          </div>

          {/* App mockup com live activity */}
          <div style={{ position: "relative", maxWidth: 900, margin: "0 auto" }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at 50% 0%,rgba(0,255,136,0.25) 0%,transparent 65%)",
              borderRadius: 20, pointerEvents: "none",
            }} />
            <div style={{
              background: "#0a1410", border: "1px solid rgba(255,255,255,0.07)",
              borderBottom: "none", borderRadius: "16px 16px 0 0",
              padding: "0.55rem 1rem", display: "flex", alignItems: "center", gap: "0.5rem",
            }}>
              {["#ff5f57", "#febc2e", "#28c840"].map(c => (
                <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, display: "inline-block" }} />
              ))}
              <span style={{ flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: 6, padding: "0.18rem 0.75rem", fontSize: "0.74rem", color: "#5e7d6f", marginLeft: "0.5rem" }}>
                Robô da Bet — dashboard
              </span>
            </div>
            <div style={{
              background: "linear-gradient(180deg,#0e1a14,#070d0a)",
              border: "1px solid rgba(0,255,136,0.18)", borderTop: "none",
              borderRadius: "0 0 16px 16px", boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
              position: "relative", padding: "2rem 1.5rem", minHeight: 380,
            }}>
              {/* Hero card mockup */}
              <div style={{
                background: "linear-gradient(135deg,rgba(0,255,136,0.12),rgba(255,215,0,0.06))",
                border: "1px solid rgba(0,255,136,0.3)", borderRadius: 14,
                padding: "1.4rem 1.5rem", marginBottom: "1rem",
              }}>
                <div style={{ fontSize: "0.72rem", color: "#9ec5b1", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.4rem" }}>
                  Se tudo der certo hoje
                </div>
                <div style={{ fontSize: "2.3rem", fontWeight: 900, color: "#00ff88", lineHeight: 1, fontFamily: "'JetBrains Mono', monospace" }}>
                  + R$ 193,71
                </div>
                <div style={{ fontSize: "0.78rem", color: "#5e7d6f", marginTop: "0.35rem" }}>
                  8 apostas abertas · R$ 14,50 em jogo
                </div>
              </div>

              {/* 3 stat cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0.65rem", marginBottom: "1rem" }}>
                {[
                  { label: "EM JOGO", val: "R$ 14,50", color: "#ffd700" },
                  { label: "HOJE", val: "8 picks", color: "#00ff88" },
                  { label: "🔥 STREAK", val: "3 W", color: "#00f0d0" },
                ].map(s => (
                  <div key={s.label} style={{
                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 10, padding: "0.7rem 0.85rem",
                  }}>
                    <div style={{ fontSize: "0.62rem", color: "#5e7d6f", fontWeight: 700, letterSpacing: "0.08em" }}>{s.label}</div>
                    <div style={{ fontSize: "1.05rem", fontWeight: 800, color: s.color, marginTop: "0.2rem" }}>{s.val}</div>
                  </div>
                ))}
              </div>

              {/* Bet rows mockup */}
              {[
                { match: "Chacarita × Temperley", pick: "OVER 9.5", odd: "2.38", win: "+R$ 2,76", state: "open" },
                { match: "Kosovo × Andorra", pick: "OVER 7.5", odd: "1.55", win: "+R$ 1,10", state: "open" },
              ].map((b, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: "0.75rem",
                  background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,255,136,0.15)",
                  borderRadius: 10, padding: "0.65rem 0.85rem", marginBottom: "0.5rem",
                }}>
                  <span style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: "rgba(0,255,136,0.15)", border: "1px solid rgba(0,255,136,0.35)",
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    color: "#00ff88", fontSize: "0.85rem", flexShrink: 0,
                  }}>⌛</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "0.85rem", color: "#e8f5ee", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{b.match}</div>
                    <div style={{ fontSize: "0.72rem", color: "#9ec5b1" }}>{b.pick} @ {b.odd}</div>
                  </div>
                  <div style={{ color: "#ffd700", fontWeight: 700, fontSize: "0.85rem", flexShrink: 0 }}>{b.win}</div>
                </div>
              ))}

              {/* Live activity */}
              <style>{`
                @keyframes rb-pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.55; transform:scale(.85); } }
                @keyframes rb-fade { 0%,15% { opacity:0; } 25%,90% { opacity:1; } 100% { opacity:.4; } }
                .rb-dot { animation: rb-pulse 1.4s ease-in-out infinite; }
                .rb-log { animation: rb-fade 7s ease-out infinite; opacity:0; }
                .rb-log:nth-child(1) { animation-delay: 0s; }
                .rb-log:nth-child(2) { animation-delay: 1.6s; }
                .rb-log:nth-child(3) { animation-delay: 3.2s; }
                .rb-log:nth-child(4) { animation-delay: 4.8s; }
                @media (prefers-reduced-motion: reduce) {
                  .rb-dot, .rb-log { animation: none !important; opacity: 1 !important; }
                }
                @media (max-width: 720px) { .rb-live { display: none !important; } }
              `}</style>
              <div className="rb-live" style={{
                position: "absolute", bottom: 16, right: 16, width: 260,
                background: "rgba(5,10,7,0.96)", backdropFilter: "blur(12px)",
                border: "1px solid rgba(0,255,136,0.3)", borderRadius: 12,
                padding: "0.85rem 1rem", boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.6rem", paddingBottom: "0.55rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <span className="rb-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: "#00ff88", boxShadow: "0 0 8px rgba(0,255,136,0.7)" }} />
                  <span style={{ fontSize: "0.7rem", color: "#00ff88", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Bot ativo</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.42rem", fontSize: "0.7rem", lineHeight: 1.45 }}>
                  <div className="rb-log" style={{ color: "#9ec5b1" }}><span style={{ color: "#5e7d6f" }}>10:32 </span><span style={{ color: "#00f0d0" }}>🔎</span> Escaneando 156 jogos hoje</div>
                  <div className="rb-log" style={{ color: "#9ec5b1" }}><span style={{ color: "#5e7d6f" }}>10:32 </span><span style={{ color: "#ffd700" }}>🧠</span> IA analisando 1.842 mercados</div>
                  <div className="rb-log" style={{ color: "#9ec5b1" }}><span style={{ color: "#5e7d6f" }}>10:33 </span><span style={{ color: "#a78bfa" }}>⚡</span> 18 com probabilidade alta</div>
                  <div className="rb-log" style={{ color: "#e8f5ee", fontWeight: 600 }}><span style={{ color: "#5e7d6f" }}>10:34 </span><span style={{ color: "#00ff88" }}>✓</span> Aposta R$2 confirmada</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── IA analisa todos os mercados ── */}
      <section style={{ padding: "5rem 1.5rem", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, rgba(0,255,136,0.06) 0%, transparent 60%)",
          pointerEvents: "none",
        }} />

        <style>{`
          @keyframes rb-count-pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.65; }
          }
          @keyframes rb-scan-line {
            0% { transform: translateY(-100%); opacity: 0; }
            10%, 90% { opacity: 0.6; }
            100% { transform: translateY(100%); opacity: 0; }
          }
          @keyframes rb-tick {
            0% { transform: translateY(20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          .rb-stat-num { animation: rb-count-pulse 2.4s ease-in-out infinite; }
          .rb-stat-num.delay-1 { animation-delay: 0.3s; }
          .rb-stat-num.delay-2 { animation-delay: 0.6s; }
          .rb-stat-num.delay-3 { animation-delay: 0.9s; }
          .rb-scan { animation: rb-scan-line 3s ease-in-out infinite; }
          .rb-tick-item { animation: rb-tick 0.5s ease-out forwards; }
          @media (prefers-reduced-motion: reduce) {
            .rb-stat-num, .rb-scan, .rb-tick-item { animation: none !important; opacity: 1 !important; }
          }
        `}</style>

        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(168,85,247,0.10)", border: "1px solid rgba(168,85,247,0.3)",
            padding: "6px 14px", borderRadius: 20, fontSize: 12,
            color: "#c4a5ff", fontWeight: 700, letterSpacing: 1, marginBottom: 18,
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c4a5ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
            </svg>
            INTELIGÊNCIA ARTIFICIAL ATIVA
          </div>

          <h2 style={{
            fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800,
            marginBottom: "0.8rem", lineHeight: 1.15,
          }}>
            A IA analisa <span style={{
              background: "linear-gradient(90deg,#c4a5ff,#00ff88)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>todos os mercados e submercados</span><br />
            antes de cada aposta
          </h2>
          <p style={{ color: "#9ec5b1", fontSize: "1.05rem", maxWidth: 720, marginBottom: "3rem", lineHeight: 1.7 }}>
            Resultado final, totais, ambas marcam, escanteios, cartões, handicaps, primeiro tempo… A IA escaneia
            cada submercado, calcula a probabilidade real e compara com a odd. Só entra na aposta onde a
            matemática diz que você tem vantagem — o resto, ela ignora.
          </p>

          {/* ── Contadores ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            gap: "1rem", marginBottom: "2.5rem",
          }}>
            {[
              { num: "1.842", label: "Mercados analisados hoje", color: "#00ff88", delay: "" },
              { num: "47", label: "Casas de aposta varridas", color: "#00f0d0", delay: "delay-1" },
              { num: "12", label: "Submercados por jogo", color: "#ffd700", delay: "delay-2" },
              { num: "0,3s", label: "Tempo por análise", color: "#c4a5ff", delay: "delay-3" },
            ].map((s) => (
              <div key={s.label} style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(0,255,136,0.18)",
                borderRadius: 16, padding: "1.25rem 1.1rem",
                position: "relative", overflow: "hidden",
              }}>
                <div className="rb-scan" style={{
                  position: "absolute", left: 0, right: 0, height: 1,
                  background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`,
                  pointerEvents: "none",
                }} />
                <div className={`rb-stat-num ${s.delay}`} style={{
                  fontSize: "2.1rem", fontWeight: 900, color: s.color, lineHeight: 1,
                  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                  marginBottom: "0.45rem",
                }}>{s.num}</div>
                <div style={{ fontSize: "0.78rem", color: "#9ec5b1", lineHeight: 1.4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* ── Como a IA decide (3 colunas) ── */}
          <div style={{
            background: "linear-gradient(135deg,rgba(0,255,136,0.04),rgba(168,85,247,0.04))",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 20, padding: "2rem 1.75rem",
          }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
              gap: "1.5rem",
            }}>
              {[
                {
                  step: "01",
                  title: "Escaneia tudo",
                  desc: "Cada jogo do dia, todos os mercados disponíveis na casa: resultado, gols, totais, escanteios, cartões, handicap, primeiro tempo, intervalo, ambas marcam.",
                  color: "#00ff88",
                },
                {
                  step: "02",
                  title: "Calcula probabilidade real",
                  desc: "Aplica o modelo estatístico (87k jogos históricos) sobre cada submercado. Calcula a probabilidade real do desfecho acontecer, independente da odd da casa.",
                  color: "#ffd700",
                },
                {
                  step: "03",
                  title: "Só aposta com vantagem",
                  desc: "Compara probabilidade real × odd. Se há +5% de vantagem matemática, entra. Se não, passa o jogo. Não tem palpite — é decisão fria.",
                  color: "#c4a5ff",
                },
              ].map((s, i) => (
                <div key={s.step} className="rb-tick-item" style={{
                  animationDelay: `${i * 0.15}s`, opacity: 0,
                }}>
                  <div style={{
                    fontSize: "0.75rem", fontWeight: 800, color: s.color,
                    letterSpacing: "0.1em", marginBottom: "0.5rem",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>{s.step}</div>
                  <h3 style={{
                    fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.4rem",
                    color: "#e8f5ee",
                  }}>{s.title}</h3>
                  <p style={{ color: "#9ec5b1", fontSize: "0.87rem", lineHeight: 1.55 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Pain Points ── */}
      <section style={{ padding: "5rem 1.5rem", background: "rgba(255,255,255,0.015)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 800, marginBottom: "0.6rem" }}>
            Você reconhece alguma dessas?
          </h2>
          <p style={{ textAlign: "center", color: "#9ec5b1", marginBottom: "3rem", fontSize: "1rem" }}>
            Se sim, o Robô da Bet foi feito pra você.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1.1rem" }}>
            {painPoints.map((p) => (
              <div key={p.title} style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(239,68,68,0.2)", borderRadius: 18, padding: "1.5rem",
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: "50%",
                  background: "rgba(239,68,68,0.12)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "0.9rem",
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </div>
                <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.4rem", color: "#e8f5ee" }}>{p.title}</h3>
                <p style={{ color: "#9ec5b1", fontSize: "0.88rem", lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 800, marginBottom: "0.6rem" }}>
            O que vem dentro
          </h2>
          <p style={{ textAlign: "center", color: "#9ec5b1", marginBottom: "3rem", fontSize: "1rem" }}>
            Tudo que o profissional usa — só que automático e dentro de um app.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.1rem" }}>
            {features.map((f) => (
              <div key={f.title} style={{
                background: f.bg, border: `1px solid ${f.border}`,
                borderRadius: 18, padding: "1.5rem",
              }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "0.7rem" }}>{f.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.4rem", color: f.color }}>{f.title}</h3>
                <p style={{ color: "#9ec5b1", fontSize: "0.88rem", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison ── */}
      <section style={{ padding: "5rem 1.5rem", background: "rgba(255,255,255,0.015)" }}>
        <style>{`
          @media (max-width: 600px) {
            .rb-cmp-header { display: none !important; }
            .rb-cmp-row { grid-template-columns: 1fr !important; gap: 0.5rem !important; padding: 1rem !important; }
            .rb-cmp-row > .rb-cmp-metric { font-size: 0.95rem !important; margin-bottom: 0.35rem !important; padding-bottom: 0.35rem !important; border-bottom: 1px solid rgba(255,255,255,0.05); }
            .rb-cmp-row > .rb-cmp-manual,
            .rb-cmp-row > .rb-cmp-bot { text-align: left !important; padding-left: 0.5rem; position: relative; }
            .rb-cmp-row > .rb-cmp-manual::before { content: 'Apostando manual:'; color: #9ec5b1; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.06em; display: block; margin-bottom: 0.15rem; font-weight: 700; }
            .rb-cmp-row > .rb-cmp-bot::before { content: 'Robô da Bet:'; color: #00ff88; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.06em; display: block; margin-bottom: 0.15rem; font-weight: 700; }
          }
        `}</style>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 800, marginBottom: "0.6rem" }}>
            Apostando manual vs. Robô da Bet
          </h2>
          <p style={{ textAlign: "center", color: "#9ec5b1", marginBottom: "3rem", fontSize: "1rem" }}>
            A diferença é o que separa hobby de método.
          </p>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, overflow: "hidden" }}>
            <div className="rb-cmp-header" style={{
              display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr",
              background: "rgba(0,255,136,0.06)", padding: "0.85rem 1rem",
              fontSize: "0.78rem", fontWeight: 800, color: "#9ec5b1",
              textTransform: "uppercase", letterSpacing: "0.05em",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}>
              <div></div>
              <div style={{ textAlign: "center" }}>Manual</div>
              <div style={{ textAlign: "center", color: "#00ff88" }}>Robô da Bet</div>
            </div>
            {comparison.map(([metric, manual, bot], i) => (
              <div key={metric} className="rb-cmp-row" style={{
                display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr",
                padding: "1rem", alignItems: "center", gap: "0.5rem",
                borderBottom: i < comparison.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                fontSize: "0.88rem",
              }}>
                <div className="rb-cmp-metric" style={{ color: "#e8f5ee", fontWeight: 600 }}>{metric}</div>
                <div className="rb-cmp-manual" style={{ textAlign: "center", color: "#9ec5b1" }}>{manual}</div>
                <div className="rb-cmp-bot" style={{ textAlign: "center", color: "#00ff88", fontWeight: 600 }}>{bot}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Como funciona ── */}
      <section id="como-funciona" style={{ padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 740, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 800, marginBottom: "0.6rem" }}>
            Do zero ao primeiro ciclo em 5 minutos
          </h2>
          <p style={{ textAlign: "center", color: "#9ec5b1", marginBottom: "3.5rem" }}>Simples assim.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", position: "relative" }}>
            <div style={{ position: "absolute", left: 27, top: 48, bottom: 48, width: 2, background: "rgba(0,255,136,0.2)" }} />
            {steps.map((s) => (
              <div key={s.n} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: "linear-gradient(135deg,#00ff88,#00b86b)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 900, fontSize: "1.1rem", flexShrink: 0, color: "#001a0d",
                  boxShadow: "0 0 0 4px rgba(0,255,136,0.15)", position: "relative", zIndex: 1,
                }}>{s.n}</div>
                <div style={{ paddingTop: "0.85rem" }}>
                  <h3 style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.35rem" }}>{s.title}</h3>
                  <p style={{ color: "#9ec5b1", fontSize: "0.9rem", lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <button onClick={buy} disabled={loading} style={{
              ...BTN_GREEN, padding: "0.95rem 2.25rem", fontSize: "1rem",
              cursor: loading ? "wait" : "pointer", opacity: loading ? 0.7 : 1,
            }}>
              {loading ? "Aguarde..." : "Começar agora por R$ 69"}
            </button>
          </div>
        </div>
      </section>

      {/* ── Roda sozinho, você só saca ── */}
      <section style={{ padding: "5rem 1.5rem", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 30% 50%, rgba(0,255,136,0.08) 0%, transparent 55%), radial-gradient(ellipse at 70% 50%, rgba(255,215,0,0.05) 0%, transparent 55%)",
          pointerEvents: "none",
        }} />

        <style>{`
          @keyframes rb-cycle-pulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(0,255,136,0.4); }
            50% { box-shadow: 0 0 0 12px rgba(0,255,136,0); }
          }
          @keyframes rb-arrow-flow {
            0% { stroke-dashoffset: 30; }
            100% { stroke-dashoffset: 0; }
          }
          .rb-pc-pulse { animation: rb-cycle-pulse 2.2s ease-in-out infinite; }
          .rb-flow-arrow { stroke-dasharray: 5,5; animation: rb-arrow-flow 1.5s linear infinite; }
          @media (prefers-reduced-motion: reduce) {
            .rb-pc-pulse, .rb-flow-arrow { animation: none !important; }
          }
        `}</style>

        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(0,255,136,0.10)", border: "1px solid rgba(0,255,136,0.3)",
              padding: "6px 14px", borderRadius: 20, fontSize: 12,
              color: "#00ff88", fontWeight: 700, letterSpacing: 1, marginBottom: 18,
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              RODA NO SEU COMPUTADOR · IA EMBARCADA
            </div>
            <h2 style={{
              fontSize: "clamp(1.9rem,4.5vw,2.8rem)", fontWeight: 900, lineHeight: 1.1,
              marginBottom: "1rem", letterSpacing: -0.5,
            }}>
              Sua única função é<br />
              <span style={{
                background: "linear-gradient(90deg,#ffd700,#00ff88)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>sacar o dinheiro</span>
            </h2>
            <p style={{ color: "#9ec5b1", fontSize: "1.05rem", maxWidth: 660, margin: "0 auto", lineHeight: 1.7 }}>
              O robô fica no seu PC. Liga, analisa, aposta, mede o edge, ajusta o stake, para no
              limite e recomeça. Sem mensalidade, sem dependência de servidor, sem API paga.
              <strong style={{ color: "#fff" }}> Você só liga o computador.</strong>
            </p>
          </div>

          {/* ── Visual: PC central + 4 cards ao redor ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: "1rem", marginBottom: "2.5rem",
          }}>
            {[
              {
                color: "#00ff88",
                bg: "rgba(0,255,136,0.06)",
                border: "rgba(0,255,136,0.25)",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="6" x2="12" y2="12"></line>
                    <line x1="12" y1="12" x2="16" y2="14"></line>
                  </svg>
                ),
                title: "Liga sozinho 24h",
                desc: "Roda em segundo plano, sem atrapalhar o uso do PC. Notebook velho serve.",
              },
              {
                color: "#00f0d0",
                bg: "rgba(0,240,208,0.06)",
                border: "rgba(0,240,208,0.25)",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00f0d0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"></path>
                    <path d="M12 7v5l3 3"></path>
                  </svg>
                ),
                title: "Aposta sozinho",
                desc: "Escolhe jogo, calcula EV, faz a entrada na casa. Sem você tocar em nada.",
              },
              {
                color: "#ffd700",
                bg: "rgba(255,215,0,0.06)",
                border: "rgba(255,215,0,0.25)",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffd700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 6l-9.5 9.5-5-5L1 18"></path>
                    <path d="M17 6h6v6"></path>
                  </svg>
                ),
                title: "Gerencia sozinho",
                desc: "Mede CLV, ajusta o stake, respeita stop-loss e limite diário. Banca protegida.",
              },
              {
                color: "#c4a5ff",
                bg: "rgba(168,85,247,0.06)",
                border: "rgba(168,85,247,0.25)",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c4a5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                ),
                title: "Você só saca",
                desc: "No fim do mês, abre a casa de aposta e saca o que ele trabalhou pra você.",
              },
            ].map((c) => (
              <div key={c.title} style={{
                background: c.bg, border: `1px solid ${c.border}`,
                borderRadius: 16, padding: "1.4rem 1.25rem",
                position: "relative",
              }}>
                <div className="rb-pc-pulse" style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: "rgba(0,0,0,0.4)", border: `1px solid ${c.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "0.9rem",
                }}>
                  {c.icon}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.35rem", color: c.color }}>{c.title}</h3>
                <p style={{ color: "#9ec5b1", fontSize: "0.85rem", lineHeight: 1.55 }}>{c.desc}</p>
              </div>
            ))}
          </div>

          {/* ── Bullet points: o que NÃO precisa fazer ── */}
          <div style={{
            background: "linear-gradient(135deg, rgba(0,255,136,0.05), rgba(255,215,0,0.03))",
            border: "1px solid rgba(0,255,136,0.2)",
            borderRadius: 20, padding: "2rem 1.75rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: "1.5rem 2rem",
          }}>
            {[
              { icon: "x", title: "Não paga mensalidade", desc: "Pagou uma vez, é seu pra sempre. Sem boleto recorrente, sem assinatura." },
              { icon: "x", title: "Não depende de servidor", desc: "IA roda dentro do app, no seu PC. Sem ChatGPT, sem API paga, sem latência." },
              { icon: "x", title: "Não precisa entender de aposta", desc: "Ele escolhe, aposta e gerencia. Você só configura o nível de risco no início." },
              { icon: "x", title: "Não precisa olhar a tela", desc: "Roda em segundo plano. Pode fechar a janela — ele continua trabalhando." },
              { icon: "check", title: "Só precisa deixar o PC ligado", desc: "Notebook conectado à internet. Qualquer um dos últimos 8 anos serve." },
              { icon: "check", title: "Só precisa sacar no fim do mês", desc: "Você abre a casa de aposta, vê o saldo e saca. Esse é o seu trabalho." },
            ].map((b) => (
              <div key={b.title} style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                <div style={{
                  flexShrink: 0, width: 28, height: 28, borderRadius: "50%",
                  background: b.icon === "check" ? "rgba(0,255,136,0.15)" : "rgba(239,68,68,0.12)",
                  border: `1px solid ${b.icon === "check" ? "rgba(0,255,136,0.4)" : "rgba(239,68,68,0.3)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginTop: "0.15rem",
                }}>
                  {b.icon === "check" ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  )}
                </div>
                <div>
                  <div style={{
                    fontWeight: 700, fontSize: "0.95rem",
                    color: b.icon === "check" ? "#00ff88" : "#e8f5ee",
                    marginBottom: "0.2rem",
                  }}>{b.title}</div>
                  <div style={{ color: "#9ec5b1", fontSize: "0.85rem", lineHeight: 1.5 }}>{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROI ── */}
      <section style={{ padding: "5rem 1.5rem", background: "rgba(255,255,255,0.015)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 800, marginBottom: "0.75rem" }}>
            Conta a matemática
          </h2>
          <p style={{ color: "#9ec5b1", marginBottom: "2.5rem", fontSize: "1rem", lineHeight: 1.7 }}>
            Grupo de tip do Telegram cobra <strong style={{ color: "#fff" }}>R$ 200 por mês</strong>.<br />
            Em 1 ano são <strong style={{ color: "#fff" }}>R$ 2.400</strong> só pra receber palpite.<br />
            O Robô da Bet custa <strong style={{ color: "#00ff88" }}>R$ 69 uma vez</strong> e roda sozinho pra sempre.
          </p>
          <div style={{
            background: "rgba(0,255,136,0.08)",
            border: "1px solid rgba(0,255,136,0.25)",
            borderRadius: 18, padding: "1.75rem 1.5rem",
            display: "inline-block", textAlign: "left",
          }}>
            <div style={{ fontSize: "0.85rem", color: "#9ec5b1", marginBottom: "0.4rem" }}>Em quanto tempo se paga:</div>
            <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "#00ff88", lineHeight: 1 }}>10 dias</div>
            <div style={{ fontSize: "0.85rem", color: "#9ec5b1", marginTop: "0.4rem" }}>
              comparado a 1 mês de grupo de tip. Depois é lucro líquido — todo mês.
            </div>
          </div>
        </div>
      </section>

      {/* ── Preço ── */}
      <section style={{ padding: "5rem 1.5rem" }}>
        <div id="comprar" style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            display: "inline-block", background: "rgba(255,215,0,0.15)",
            border: "1px solid rgba(255,215,0,0.3)", color: "#ffd700",
            borderRadius: 20, padding: "0.3rem 1rem", fontSize: "0.82rem",
            fontWeight: 700, marginBottom: "1.25rem",
          }}>
            🏆 Oferta lançamento Copa 2026
          </div>
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 800, marginBottom: "0.5rem" }}>
            Pagamento único, seu pra sempre
          </h2>
          <p style={{ color: "#9ec5b1", marginBottom: "2rem" }}>Sem mensalidade. Sem grupo. Sem tip pago. Paga uma vez e usa.</p>

          <div style={{
            background: "linear-gradient(135deg,rgba(0,255,136,0.1),rgba(255,215,0,0.06))",
            border: "1px solid rgba(0,255,136,0.3)", borderRadius: 22, padding: "2.5rem 2rem",
          }}>
            <div style={{ marginBottom: "0.3rem" }}>
              <span style={{ fontSize: "1rem", color: "#5e7d6f", textDecoration: "line-through", marginRight: "0.5rem" }}>R$ 197</span>
              <span style={{ fontSize: "0.82rem", background: "rgba(0,255,136,0.15)", color: "#00ff88", borderRadius: 6, padding: "0.15rem 0.5rem", fontWeight: 700 }}>-65%</span>
            </div>
            <div style={{ fontSize: "clamp(3rem,8vw,4.5rem)", fontWeight: 900, lineHeight: 1, color: "#e8f5ee" }}>
              R$ 69
            </div>
            <div style={{ color: "#9ec5b1", fontSize: "0.85rem", marginBottom: "2rem" }}>pagamento único · sem mensalidade · pra sempre</div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", textAlign: "left", marginBottom: "2rem" }}>
              {[
                "App Robô da Bet pra Windows 10/11",
                "Modelo Poisson calibrado em 87k jogos",
                "Slider de risco: Conservador / Equilibrado / Agressivo",
                "Modo simulação pra testar sem dinheiro",
                "CLV em tempo real (mede edge real)",
                "Stop-loss + limite diário configurável",
                "Suporte direto via TamoIA dentro do app",
                "Auto-update grátis por 1 ano",
              ].map(item => (
                <div key={item} style={{ fontSize: "0.93rem", color: "#c8e0d0", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ color: "#00ff88" }}>✓</span>{item}
                </div>
              ))}
            </div>

            <button onClick={buy} disabled={loading} style={{
              ...BTN_GREEN, display: "block", width: "100%",
              padding: "1.1rem", fontSize: "1.05rem",
              cursor: loading ? "wait" : "pointer", opacity: loading ? 0.7 : 1,
              marginBottom: "0.75rem",
            }}>
              {loading ? "Redirecionando..." : "🚀 Quero meu robô agora"}
            </button>

            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" style={{
              ...BTN_GHOST, display: "flex", justifyContent: "center", alignItems: "center",
              gap: "0.5rem", padding: "0.85rem", fontSize: "0.93rem",
              textDecoration: "none", marginBottom: "1.25rem",
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#00ff88"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.74.46 3.42 1.31 4.93L2 22l5.21-1.29C8.7 21.55 10.31 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" /></svg>
              Tirar dúvida no WhatsApp
            </a>

            <div style={{
              display: "flex", alignItems: "center", gap: "0.6rem",
              background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)",
              borderRadius: 10, padding: "0.75rem 1rem", marginBottom: "1rem", textAlign: "left",
            }}>
              <span style={{ fontSize: "1.5rem" }}>🛡️</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#00ff88" }}>7 dias de garantia total</div>
                <div style={{ fontSize: "0.8rem", color: "#9ec5b1" }}>Não gostou? Devolvo 100% do valor. Sem perguntas.</div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.72rem", color: "#5e7d6f" }}>Pagamento via</span>
              <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                {["PIX", "VISA", "MASTER", "Mercado Pago"].map(p => (
                  <span key={p} style={{ background: "rgba(255,255,255,0.06)", color: "#9ec5b1", padding: "0.15rem 0.45rem", borderRadius: 6, fontSize: "0.7rem", fontWeight: 700 }}>{p}</span>
                ))}
              </div>
            </div>

            <p style={{ color: "#5e7d6f", fontSize: "0.78rem" }}>
              Após o pagamento você recebe o link de download por e-mail em até 10 minutos.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "4rem 1.5rem", background: "rgba(255,255,255,0.015)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "1.8rem", fontWeight: 800, marginBottom: "0.6rem" }}>
            Dúvidas frequentes
          </h2>
          <p style={{ textAlign: "center", color: "#9ec5b1", marginBottom: "2.5rem", fontSize: "0.95rem" }}>
            Tem outra dúvida? <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" style={{ color: "#00ff88" }}>Manda WhatsApp</a> que eu respondo na hora.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
            {faqs.map((f) => <FAQItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* ── Aviso obrigatório ── */}
      <section style={{ padding: "0 1.5rem", marginTop: "3rem" }}>
        <div style={{
          maxWidth: 720, margin: "0 auto",
          background: "rgba(255,215,0,0.05)",
          border: "1px solid rgba(255,215,0,0.2)",
          borderRadius: 12, padding: "1.25rem 1.5rem",
          fontSize: "0.82rem", lineHeight: 1.65, color: "#d4c374",
        }}>
          <strong style={{ color: "#ffd700" }}>⚠️ Aviso obrigatório:</strong> Apostas envolvem risco real
          de perda. Robô da Bet é ferramenta estatística — não garante lucro.
          Use apenas dinheiro que pode perder. Não use como fonte de renda. Maiores de 18 anos.
          Jogo responsável: <a href="https://jogoresponsavel.gov.br" target="_blank" rel="noopener noreferrer" style={{ color: "#ffd700" }}>jogoresponsavel.gov.br</a>.
        </div>
      </section>

      {/* ── CTA final ── */}
      <section style={{ padding: "5rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>⚽</div>
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.5rem)", fontWeight: 900, marginBottom: "0.75rem" }}>
            Copa começa <span style={{ color: "#00ff88" }}>11 de junho</span>.
          </h2>
          <p style={{ color: "#9ec5b1", marginBottom: "0.5rem", fontSize: "1rem", lineHeight: 1.7 }}>
            104 jogos, 38 dias. Cada um com dezenas de mercados pra analisar.
          </p>
          <p style={{ color: "#9ec5b1", marginBottom: "2rem", fontSize: "1rem" }}>
            O bot pronto pra rodar do primeiro apito. Você cuida da sua vida — ele cuida da banca.
          </p>
          <button onClick={buy} disabled={loading} style={{
            ...BTN_GOLD, padding: "1.1rem 2.5rem", fontSize: "1.1rem",
            cursor: loading ? "wait" : "pointer", opacity: loading ? 0.7 : 1,
            display: "inline-block",
          }}>
            {loading ? "Aguarde..." : "🏆 Quero meu robô — R$ 69"}
          </button>
          <div style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#5e7d6f" }}>
            <s>R$ 197</s> → <strong style={{ color: "#e8f5ee" }}>R$ 69</strong> · 🛡️ 7 dias de garantia · pagamento único
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        padding: "3rem 1.5rem 2rem",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "2rem", marginBottom: "2rem" }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: "1rem", color: "#e8f5ee", marginBottom: "0.5rem" }}>
                iaempresa<span style={{ color: "#00ff88" }}>.app</span>
              </div>
              <p style={{ fontSize: "0.82rem", color: "#5e7d6f", lineHeight: 1.6 }}>
                Software brasileiro de automação. Robô da Bet é ferramenta estatística — use com responsabilidade.
              </p>
            </div>
            <div>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#9ec5b1", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>Produto</div>
              <a href="#como-funciona" style={{ display: "block", color: "#9ec5b1", fontSize: "0.85rem", textDecoration: "none", marginBottom: "0.4rem" }}>Como funciona</a>
              <a href="#comprar" style={{ display: "block", color: "#9ec5b1", fontSize: "0.85rem", textDecoration: "none", marginBottom: "0.4rem" }}>Preço</a>
            </div>
            <div>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#9ec5b1", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>Suporte</div>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" style={{ display: "block", color: "#9ec5b1", fontSize: "0.85rem", textDecoration: "none", marginBottom: "0.4rem" }}>WhatsApp</a>
              <a href="mailto:contato@iaempresa.app" style={{ display: "block", color: "#9ec5b1", fontSize: "0.85rem", textDecoration: "none", marginBottom: "0.4rem" }}>contato@iaempresa.app</a>
            </div>
            <div>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#9ec5b1", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>Legal</div>
              <a href="/termos" style={{ display: "block", color: "#9ec5b1", fontSize: "0.85rem", textDecoration: "none", marginBottom: "0.4rem" }}>Termos de uso</a>
              <a href="/privacidade" style={{ display: "block", color: "#9ec5b1", fontSize: "0.85rem", textDecoration: "none", marginBottom: "0.4rem" }}>Privacidade</a>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1.5rem", textAlign: "center", fontSize: "0.75rem", color: "#5e7d6f" }}>
            © {new Date().getFullYear()} iaempresa.app — Todos os direitos reservados. Apenas maiores de 18 anos.
          </div>
        </div>
      </footer>
    </div>
  );
}
