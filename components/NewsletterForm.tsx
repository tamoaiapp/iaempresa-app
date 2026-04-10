"use client";
import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  };

  if (sent) {
    return (
      <div style={{ textAlign: "center", padding: "1.5rem", color: "var(--green)", fontWeight: 600, fontSize: "1rem" }}>
        ✅ Cadastrado! Você receberá dicas toda semana.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
      <input
        type="email"
        placeholder="seu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 10,
          padding: "0.7rem 1.1rem",
          color: "var(--text)",
          fontSize: "0.95rem",
          outline: "none",
          width: 280,
          fontFamily: "'Outfit', sans-serif",
        }}
      />
      <button type="submit" style={{
        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
        color: "#fff",
        fontWeight: 700,
        fontSize: "0.95rem",
        padding: "0.7rem 1.5rem",
        borderRadius: 10,
        border: "none",
        cursor: "pointer",
        fontFamily: "'Outfit', sans-serif",
      }}>
        Quero receber →
      </button>
    </form>
  );
}
