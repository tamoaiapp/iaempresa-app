import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade — iaempresa.app",
  description: "Política de privacidade do iaempresa.app.",
};

export default function PrivacidadePage() {
  const ano = new Date().getFullYear();
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "4rem 1.25rem 6rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "0.5rem" }}>Política de Privacidade</h1>
      <p style={{ color: "var(--muted)", fontSize: "0.875rem", marginBottom: "2.5rem" }}>Última atualização: abril de {ano}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <p style={{ color: "#c8d4e8", lineHeight: 1.8 }}>O <strong style={{ color: "var(--text)" }}>iaempresa.app</strong> respeita a sua privacidade. Esta política descreve como coletamos e usamos informações ao acessar nosso portal.</p>

        {[
          { titulo: "1. Informações que coletamos", conteudo: "Coletamos automaticamente dados de navegação: endereço IP, tipo de navegador, páginas visitadas e tempo de acesso. Se você assinar nossa newsletter, coletamos seu e-mail mediante consentimento." },
          { titulo: "2. Como usamos suas informações", conteudo: "Usamos os dados para: analisar o desempenho do portal, melhorar os guias publicados, enviar a newsletter para assinantes, e exibir anúncios por meio do Google AdSense." },
          { titulo: "3. Google AdSense e cookies", conteudo: "Este site utiliza o Google AdSense para exibição de anúncios. O Google pode usar cookies para personalizar anúncios com base no seu histórico de navegação. Você pode desativar em Configurações de anúncios do Google." },
          { titulo: "4. Seus direitos (LGPD)", conteudo: "Pela Lei Geral de Proteção de Dados (Lei 13.709/2018), você pode acessar, corrigir ou excluir seus dados a qualquer momento. Entre em contato pela nossa página de contato." },
          { titulo: "5. Links externos", conteudo: "Nossos guias podem linkar para ferramentas externas (ChatGPT, Canva, etc.). Não somos responsáveis pelas políticas de privacidade de terceiros." },
          { titulo: "6. Alterações", conteudo: "Esta política pode ser atualizada periodicamente. Recomendamos revisá-la regularmente." },
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
