import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "6rem 1.25rem", textAlign: "center" }}>
      <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🤖</div>
      <h1 style={{ fontSize: "2rem", fontWeight: 900, margin: "0 0 1rem", color: "var(--text)" }}>
        Página não encontrada
      </h1>
      <p style={{ color: "var(--muted)", marginBottom: "2rem" }}>
        Essa página não existe ou foi movida.
      </p>
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
        <Link
          href="/"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", padding: "0.75rem 1.5rem", borderRadius: 10, textDecoration: "none", fontWeight: 700 }}
        >
          Ir para Home
        </Link>
        <Link
          href="/guias"
          style={{ background: "rgba(255,255,255,0.07)", color: "var(--text)", padding: "0.75rem 1.5rem", borderRadius: 10, textDecoration: "none", fontWeight: 700, border: "1px solid rgba(255,255,255,0.1)" }}
        >
          Ver Guias
        </Link>
      </div>
    </div>
  );
}
