import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre o iaempresa.app",
  description: "Conheça o iaempresa.app — guias práticos de IA para pequenos negócios, MEIs e lojistas brasileiros.",
};

export default function SobrePage() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "4rem 1.25rem 6rem" }}>
      <h1 style={{ fontSize: "2.2rem", fontWeight: 900, marginBottom: "0.75rem" }}>Sobre o iaempresa.app</h1>
      <p style={{ fontSize: "1.15rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "3rem" }}>
        Guias práticos de Inteligência Artificial para quem tem negócio no Brasil.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <section>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.75rem", color: "var(--text)" }}>O que é o iaempresa.app?</h2>
          <p style={{ color: "#c8d4e8", lineHeight: 1.8 }}>
            O iaempresa.app é um portal de guias práticos para donos de pequenos negócios, MEIs e lojistas aprenderem a usar Inteligência Artificial no dia a dia — sem precisar ser técnico e sem gastar muito.
          </p>
          <p style={{ color: "#c8d4e8", lineHeight: 1.8, marginTop: "0.75rem" }}>
            Cada guia foi pensado para ser direto: você lê, aplica, e já vê o resultado. Sem teoria, sem enrolação.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.75rem", color: "var(--text)" }}>Por que criamos isso?</h2>
          <p style={{ color: "#c8d4e8", lineHeight: 1.8 }}>
            A IA avançou muito rápido, mas a maioria dos conteúdos em português é técnico demais ou genérico demais. O dono de padaria, o lojista do bairro, o prestador de serviço — eles precisam de respostas concretas para perguntas concretas.
          </p>
          <p style={{ color: "#c8d4e8", lineHeight: 1.8, marginTop: "0.75rem" }}>
            "Como eu uso IA pra tirar fotos do meu produto?" "Como respondo clientes pelo WhatsApp com IA?" Esse é o tipo de guia que fazemos.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.75rem", color: "var(--text)" }}>Nossos produtos</h2>
          <p style={{ color: "#c8d4e8", lineHeight: 1.8, marginBottom: "1rem" }}>
            Além dos guias, desenvolvemos ferramentas próprias para o mercado brasileiro:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { nome: "TamoWork", descricao: "Fotos profissionais de produto com IA", href: "https://tamowork.com" },
              { nome: "BuscaFornecedor", descricao: "Encontre fornecedores de atacado no Brasil", href: "https://buscafornecedor.app" },
            ].map((p) => (
              <a key={p.nome} href={p.href} target="_blank" rel="noopener noreferrer" style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "var(--card)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "var(--radius)",
                padding: "1rem 1.25rem",
                textDecoration: "none",
              }}>
                <div>
                  <div style={{ fontWeight: 700, color: "var(--text)", marginBottom: "0.2rem" }}>{p.nome}</div>
                  <div style={{ fontSize: "0.875rem", color: "var(--muted)" }}>{p.descricao}</div>
                </div>
                <span style={{ color: "#a78bfa", fontSize: "0.875rem" }}>→</span>
              </a>
            ))}
          </div>
        </section>
      </div>

      <div style={{ marginTop: "3rem", textAlign: "center" }}>
        <Link href="/guias" style={{
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          color: "#fff",
          padding: "0.85rem 2rem",
          borderRadius: 12,
          fontWeight: 700,
          textDecoration: "none",
          display: "inline-block",
        }}>
          Ver os guias →
        </Link>
      </div>
    </div>
  );
}
