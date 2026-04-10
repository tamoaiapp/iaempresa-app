"use client";
import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";

const categorias = [
  { label: "Instagram", slug: "instagram" },
  { label: "WhatsApp", slug: "whatsapp" },
  { label: "Fotos de Produto", slug: "fotos-produto" },
  { label: "Atendimento", slug: "atendimento" },
  { label: "Marketing", slug: "marketing" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header style={{ background: "rgba(7,8,11,0.95)", borderBottom: "1px solid rgba(255,255,255,0.07)", position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(12px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.25rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <Link href="/">
            <Logo size="sm" />
          </Link>

          <nav className="ie-desktop-nav" style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <Link href="/guias" style={{ color: "#8394b0", textDecoration: "none", fontWeight: 500, fontSize: "0.9rem" }}>
              Guias
            </Link>
            {categorias.slice(0, 3).map((c) => (
              <Link key={c.slug} href={`/guias?categoria=${c.slug}`} style={{ color: "#8394b0", textDecoration: "none", fontWeight: 500, fontSize: "0.9rem" }}>
                {c.label}
              </Link>
            ))}
            <Link href="/ferramentas" style={{ color: "#8394b0", textDecoration: "none", fontWeight: 500, fontSize: "0.9rem" }}>
              Ferramentas
            </Link>
            <Link href="/guias" style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff",
              padding: "0.4rem 1rem",
              borderRadius: 10,
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "0.875rem",
            }}>
              Ver guias →
            </Link>
          </nav>

          <button onClick={() => setOpen(!open)} className="ie-mobile-btn" style={{ display: "none", background: "none", border: "none", cursor: "pointer", fontSize: "1.5rem", color: "#eef2f9" }} aria-label="Menu">
            {open ? "✕" : "☰"}
          </button>
        </div>

        {open && (
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "1rem 0", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <Link href="/guias" style={{ color: "#eef2f9", textDecoration: "none", fontWeight: 500, padding: "0.25rem 0" }} onClick={() => setOpen(false)}>Todos os Guias</Link>
            {categorias.map((c) => (
              <Link key={c.slug} href={`/guias?categoria=${c.slug}`} style={{ color: "#8394b0", textDecoration: "none", padding: "0.25rem 0" }} onClick={() => setOpen(false)}>
                {c.label}
              </Link>
            ))}
            <Link href="/ferramentas" style={{ color: "#8394b0", textDecoration: "none", padding: "0.25rem 0" }} onClick={() => setOpen(false)}>Ferramentas</Link>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ie-desktop-nav { display: none !important; }
          .ie-mobile-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
