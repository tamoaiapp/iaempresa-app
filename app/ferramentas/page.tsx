import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import ToolCard from "@/components/ToolCard";

export const metadata: Metadata = {
  title: "Ferramentas de IA para Pequenos Negócios",
  description: "Nossos produtos e as melhores ferramentas de IA para MEIs, lojistas e pequenos negócios brasileiros.",
};

const nossosProducts = [
  { nome: "TamoWork", descricao: "Transforma fotos amadoras de produto em imagens profissionais com IA. Ideal para lojas, e-commerce e redes sociais. Sem fotógrafo, sem estúdio.", href: "https://tamowork.com", cor: "#8b5cf6", emoji: "📸" },
  { nome: "BuscaFornecedor", descricao: "Encontre fornecedores confiáveis de atacado no Brasil por categoria, região e preço. Direto da fábrica.", href: "https://buscafornecedor.app", cor: "#16c784", emoji: "🏪" },
  { nome: "FidelizaAI", descricao: "Fidelização de clientes via WhatsApp com IA. Mensagens automáticas personalizadas que trazem o cliente de volta.", href: "#", cor: "#25d366", emoji: "💬", externo: false },
  { nome: "provador.shop", descricao: "Catálogo virtual para lojas de roupa. Seu cliente experimenta a peça online antes de comprar, aumentando a conversão.", href: "#", cor: "#f59e0b", emoji: "👕", externo: false },
];

const ferramentasExternas = [
  {
    categoria: "Criação de Conteúdo",
    items: [
      { nome: "ChatGPT", descricao: "O mais completo para texto, legendas e atendimento. Tem plano grátis funcional.", href: "https://chat.openai.com", gratis: true, funciona: true },
      { nome: "Canva IA", descricao: "Criação de artes com IA diretamente no Canva. Ideal para posts e banners.", href: "https://canva.com", gratis: true, funciona: true },
      { nome: "Copy.ai", descricao: "Especialista em copy de vendas, descrições e anúncios. Tem plano grátis.", href: "https://copy.ai", gratis: true, funciona: true },
    ],
  },
  {
    categoria: "Fotos e Imagens",
    items: [
      { nome: "Remove.bg", descricao: "Remove o fundo de fotos automaticamente. Essencial para e-commerce.", href: "https://remove.bg", gratis: true, funciona: true },
      { nome: "Clipdrop", descricao: "Edição de fotos com IA, fundo de produto, iluminação. Plano grátis disponível.", href: "https://clipdrop.co", gratis: true, funciona: true },
      { nome: "Midjourney", descricao: "Geração de imagens de alta qualidade. Requer assinatura, mas vale.", href: "https://midjourney.com", gratis: false, funciona: true },
    ],
  },
  {
    categoria: "Atendimento e Automação",
    items: [
      { nome: "ManyChat", descricao: "Automação de Instagram e WhatsApp. Tem plano grátis com funcionalidades básicas.", href: "https://manychat.com", gratis: true, funciona: true },
      { nome: "Typebot", descricao: "Chatbot open-source para WhatsApp e site. Gratuito para hospedar você mesmo.", href: "https://typebot.io", gratis: true, funciona: true },
      { nome: "Z-API", descricao: "API para WhatsApp Business no Brasil. Necessário para automações avançadas.", href: "https://z-api.io", gratis: false, funciona: true },
    ],
  },
];

export default function FerramentasPage() {
  return (
    <>
      <div style={{ background: "linear-gradient(180deg, #0c0d14 0%, var(--bg) 100%)", padding: "3.5rem 1.25rem 2rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, marginBottom: "0.75rem" }}>
          Ferramentas para o seu negócio
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "1.05rem", maxWidth: 560, margin: "0 auto" }}>
          Nossos produtos e as melhores ferramentas de IA para você começar hoje — com foco no mercado brasileiro.
        </p>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "3rem 1.25rem 5rem" }}>
        {/* Nossos produtos */}
        <section style={{ marginBottom: "4rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.75rem" }}>
            <div style={{ width: 4, height: 28, background: "linear-gradient(135deg, #6366f1, #a855f7)", borderRadius: 2 }} />
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800 }}>Nossos produtos</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {nossosProducts.map((p) => (
              <ProductCard key={p.nome} {...p} />
            ))}
          </div>
        </section>

        {/* Ferramentas recomendadas */}
        <section>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <div style={{ width: 4, height: 28, background: "linear-gradient(135deg, #6366f1, #a855f7)", borderRadius: 2 }} />
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800 }}>Ferramentas recomendadas</h2>
          </div>
          <p style={{ color: "var(--muted)", marginBottom: "2.5rem", marginLeft: "1rem" }}>
            Curadoria de ferramentas externas para usar no seu negócio — com nota sobre plano grátis e funcionamento no Brasil.
          </p>

          {ferramentasExternas.map((sec) => (
            <div key={sec.categoria} style={{ marginBottom: "3rem" }}>
              <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--muted)", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                {sec.categoria}
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
                {sec.items.map((tool) => (
                  <ToolCard key={tool.nome} {...tool} />
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
