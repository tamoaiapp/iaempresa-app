import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso — iaempresa.app",
  description: "Termos de uso do iaempresa.app.",
};

export default function TermosPage() {
  const ano = new Date().getFullYear();
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "4rem 1.25rem 6rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "0.5rem" }}>Termos de Uso</h1>
      <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginBottom: "2.5rem" }}>Última atualização: abril de {ano}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <p style={{ color: "#c8d4e8", lineHeight: 1.8 }}>Ao acessar o <strong style={{ color: "var(--text)" }}>iaempresa.app</strong>, você concorda com estes termos.</p>

        {[
          { titulo: "1. Conteúdo educacional", conteudo: "Os guias publicados têm caráter educacional e informativo. As ferramentas e técnicas descritas estão sujeitas a atualizações pelos seus fabricantes. Sempre consulte a documentação oficial das ferramentas antes de usar em produção." },
          { titulo: "2. Ferramentas de terceiros", conteudo: "Os guias mencionam ferramentas de terceiros (ChatGPT, Canva, WhatsApp, etc.). Não somos afiliados nem responsáveis por essas ferramentas. Seu uso está sujeito aos termos de cada plataforma." },
          { titulo: "3. Nossos produtos", conteudo: "Links para TamoWork, BuscaFornecedor, FidelizaAI e outros produtos nossos são identificados como tais. São produtos reais disponíveis para uso." },
          { titulo: "4. Propriedade intelectual", conteudo: "O conteúdo editorial do iaempresa.app é de nossa propriedade. É proibida a reprodução sem autorização. Links para nossos guias são bem-vindos." },
          { titulo: "5. Publicidade", conteudo: "O portal pode exibir anúncios por meio do Google AdSense. O conteúdo editorial é independente dos anunciantes." },
          { titulo: "6. Isenção de responsabilidade", conteudo: "Não nos responsabilizamos por resultados obtidos ao aplicar os guias publicados. Cada negócio é único e os resultados podem variar." },
          { titulo: "7. Modificações e foro", conteudo: "Podemos modificar estes termos a qualquer momento. Estes termos são regidos pela legislação brasileira, elegendo o foro de São Paulo, SP." },
        ].map((s) => (
          <section key={s.titulo}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "0.5rem", color: "var(--text)" }}>{s.titulo}</h2>
            <p style={{ color: "#c8d4e8", lineHeight: 1.8, margin: 0 }}>{s.conteudo}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
