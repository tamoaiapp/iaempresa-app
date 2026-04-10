import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato — iaempresa.app",
  description: "Entre em contato com a equipe do iaempresa.app.",
};

export default function ContatoPage() {
  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "4rem 1.25rem 6rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "0.5rem" }}>Contato</h1>
      <p style={{ color: "var(--muted)", marginBottom: "3rem", lineHeight: 1.7 }}>
        Dúvidas sobre os guias, sugestões de conteúdo, parcerias ou questões de privacidade?
      </p>

      <div style={{ display: "grid", gap: "1rem", marginBottom: "3rem" }}>
        {[
          { emoji: "💡", titulo: "Sugerir um guia", desc: "Tem uma tarefa que queria fazer com IA mas não achou guia? Nos conta — pode virar o próximo artigo." },
          { emoji: "🤝", titulo: "Parceria e divulgação", desc: "Tem uma ferramenta de IA para o mercado BR e quer aparecer nos nossos guias?" },
          { emoji: "🔒", titulo: "Privacidade e LGPD", desc: "Solicitações relacionadas a dados pessoais conforme a Lei 13.709/2018." },
          { emoji: "🐛", titulo: "Erro no guia", desc: "Encontrou uma instrução desatualizada ou incorreta? Nos avise para corrigirmos." },
        ].map((item) => (
          <div key={item.titulo} style={{ background: "var(--card)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "1.25rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
            <span style={{ fontSize: "1.5rem" }}>{item.emoji}</span>
            <div>
              <div style={{ fontWeight: 700, color: "var(--text)", marginBottom: "0.25rem" }}>{item.titulo}</div>
              <div style={{ color: "var(--muted)", fontSize: "0.9rem" }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: 14, padding: "2rem", color: "#fff", textAlign: "center" }}>
        <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>💬</div>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 800, margin: "0 0 0.5rem" }}>Fale pelo WhatsApp</h2>
        <p style={{ opacity: 0.9, margin: "0 0 1.5rem", fontSize: "0.95rem" }}>
          A forma mais rápida de falar com a gente.
        </p>
        <a
          href="https://wa.me/5511999999999?text=Olá!%20Vim%20pelo%20iaempresa.app"
          target="_blank"
          rel="noopener noreferrer"
          style={{ background: "#25d366", color: "#fff", padding: "0.75rem 1.75rem", borderRadius: 10, textDecoration: "none", fontWeight: 800, display: "inline-block" }}
        >
          Abrir WhatsApp →
        </a>
      </div>
    </div>
  );
}
