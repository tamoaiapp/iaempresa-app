import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer style={{ background: "#050608", borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: "5rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "3rem 1.25rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", marginBottom: "2.5rem" }}>
          <div>
            <div style={{ marginBottom: "1rem" }}>
              <Logo size="sm" />
            </div>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#8394b0" }}>
              Guias práticos de IA para pequenos negócios, MEIs e lojistas brasileiros.
            </p>
          </div>

          <div>
            <div style={{ fontWeight: 700, color: "#eef2f9", marginBottom: "0.75rem", fontSize: "0.9rem" }}>Categorias</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
              {[
                { label: "Instagram com IA", slug: "instagram" },
                { label: "WhatsApp com IA", slug: "whatsapp" },
                { label: "Fotos de Produto", slug: "fotos-produto" },
                { label: "Atendimento", slug: "atendimento" },
                { label: "Marketing Digital", slug: "marketing" },
              ].map((c) => (
                <Link key={c.slug} href={`/guias?categoria=${c.slug}`} style={{ color: "#8394b0", textDecoration: "none", fontSize: "0.875rem" }}>{c.label}</Link>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, color: "#eef2f9", marginBottom: "0.75rem", fontSize: "0.9rem" }}>Nossos Produtos</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
              <a href="https://tamowork.com" target="_blank" rel="noopener noreferrer" style={{ color: "#8394b0", textDecoration: "none", fontSize: "0.875rem" }}>TamoWork — Fotos de Produto com IA</a>
              <a href="https://buscafornecedor.app" target="_blank" rel="noopener noreferrer" style={{ color: "#8394b0", textDecoration: "none", fontSize: "0.875rem" }}>BuscaFornecedor — Atacado BR</a>
              <Link href="/ferramentas" style={{ color: "#8394b0", textDecoration: "none", fontSize: "0.875rem" }}>Ver todos →</Link>
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, color: "#eef2f9", marginBottom: "0.75rem", fontSize: "0.9rem" }}>Site</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
              <Link href="/guias" style={{ color: "#8394b0", textDecoration: "none", fontSize: "0.875rem" }}>Todos os Guias</Link>
              <Link href="/sobre" style={{ color: "#8394b0", textDecoration: "none", fontSize: "0.875rem" }}>Sobre</Link>
              <Link href="/contato" style={{ color: "#8394b0", textDecoration: "none", fontSize: "0.875rem" }}>Contato</Link>
              <Link href="/privacidade" style={{ color: "#8394b0", textDecoration: "none", fontSize: "0.875rem" }}>Privacidade</Link>
              <Link href="/termos" style={{ color: "#8394b0", textDecoration: "none", fontSize: "0.875rem" }}>Termos de Uso</Link>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem", fontSize: "0.85rem", color: "#4e5c72" }}>
          <span>© {new Date().getFullYear()} iaempresa.app — Todos os direitos reservados</span>
          <span style={{ color: "#6366f1", fontSize: "0.8rem" }}>IA para o seu negócio. Sem complicação.</span>
        </div>
      </div>
    </footer>
  );
}
