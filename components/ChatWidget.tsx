"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Widget de chat com a TamoIA. Aparece como botao flutuante (canto inferior
 * direito) e abre painel chat ao clicar. Conversa stateless via /api/agent/chat
 * (historico vive no client state, nao em sessao).
 *
 * Substitui o WhatsAppFloat — agora TamoIA tenta resolver primeiro, e quem nao
 * quiser papo com IA tem botao "Falar com humano" que abre WhatsApp.
 */

const WHATSAPP = "5511967245795";
const WHATSAPP_MSG = "Oi! Vim do site iaempresa.app e queria falar com uma pessoa.";

type Msg = { role: "user" | "assistant"; content: string };

const SUGESTOES_INICIAIS = [
  "Como o PostMaster funciona?",
  "É seguro? Não me banem?",
  "Quanto custa? Tem mensalidade?",
  "Funciona no Mac?",
];

const PRIMEIRA_MSG: Msg = {
  role: "assistant",
  content: "Oi! Sou a **TamoIA** 👋 Posso te ajudar com qualquer dúvida sobre o PostMaster — como funciona, preço, garantia, como instalar. O que você quer saber?",
};

export default function ChatWidget({ produto = "postmaster" }: { produto?: "postmaster" | "tamowork" | "geral" }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([PRIMEIRA_MSG]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // Anti-flash: so renderiza apos 600ms (mesmo padrao do WhatsAppFloat)
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 600);
    return () => clearTimeout(t);
  }, []);

  // Scroll pro fim quando msgs muda
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  // Foco no input quando abre
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const newMsgs: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/agent/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: newMsgs, produto }),
      });
      const data = (await res.json()) as { role: "assistant"; content: string };
      setMessages((m) => [...m, { role: "assistant", content: data.content }]);
    } catch {
      setMessages((m) => [...m, {
        role: "assistant",
        content: "Travou aqui do meu lado. Manda mensagem no WhatsApp +55 11 96724-5795 que te respondo direto.",
      }]);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  if (!ready) return null;

  return (
    <>
      {/* Botao flutuante */}
      {!open && (
        <button
          aria-label="Abrir chat com TamoIA"
          onClick={() => setOpen(true)}
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "#fff",
            border: "none",
            borderRadius: 999,
            padding: "12px 20px 12px 14px",
            boxShadow: "0 8px 32px rgba(139,92,246,0.45), 0 0 0 4px rgba(139,92,246,0.12)",
            fontWeight: 700,
            fontSize: "0.92rem",
            fontFamily: "'Outfit', sans-serif",
            cursor: "pointer",
          }}
        >
          <span style={{
            width: 28, height: 28, borderRadius: "50%",
            background: "rgba(255,255,255,0.18)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, fontWeight: 900, position: "relative",
          }}>
            T
            <span style={{
              position: "absolute", top: -2, right: -2,
              width: 9, height: 9, background: "#16c784", borderRadius: "50%",
              border: "2px solid #6366f1",
            }} />
          </span>
          <span>Falar com a TamoIA</span>
        </button>
      )}

      {/* Painel chat */}
      {open && (
        <div
          role="dialog"
          aria-label="Chat com TamoIA"
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 999,
            width: "min(380px, calc(100vw - 32px))",
            height: "min(560px, calc(100vh - 80px))",
            background: "#0c1018",
            border: "1px solid rgba(99,102,241,0.3)",
            borderRadius: 18,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 24px 72px rgba(0,0,0,0.55), 0 0 0 1px rgba(99,102,241,0.12)",
            fontFamily: "'Outfit', sans-serif",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "14px 16px",
            background: "linear-gradient(135deg, rgba(99,102,241,0.18), rgba(139,92,246,0.08))",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 900, fontSize: "1.05rem",
              position: "relative", flexShrink: 0,
            }}>
              T
              <span style={{
                position: "absolute", bottom: -1, right: -1,
                width: 11, height: 11, background: "#16c784", borderRadius: "50%",
                border: "2px solid #0c1018",
              }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: "#eef2f9", fontWeight: 800, fontSize: "0.95rem" }}>TamoIA</div>
              <div style={{ color: "#16c784", fontSize: "0.72rem", fontWeight: 600 }}>● online · resposta rápida</div>
            </div>
            <button
              aria-label="Fechar chat"
              onClick={() => setOpen(false)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: "#8394b0", fontSize: 22, lineHeight: 1, padding: 4,
              }}
            >
              ×
            </button>
          </div>

          {/* Mensagens */}
          <div ref={scrollRef} style={{
            flex: 1, overflowY: "auto",
            padding: "16px",
            display: "flex", flexDirection: "column", gap: 10,
          }}>
            {messages.map((m, i) => (
              <Bubble key={i} role={m.role} content={m.content} />
            ))}
            {loading && <TypingBubble />}
            {messages.length === 1 && !loading && (
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
                {SUGESTOES_INICIAIS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    style={{
                      background: "rgba(99,102,241,0.08)",
                      border: "1px solid rgba(99,102,241,0.25)",
                      borderRadius: 12,
                      padding: "8px 12px",
                      fontSize: "0.84rem",
                      color: "#c8d6f0",
                      textAlign: "left",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      transition: "background 0.15s, border-color 0.15s",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div style={{
            padding: "12px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            background: "rgba(7,8,11,0.6)",
          }}>
            <div style={{
              display: "flex", gap: 8,
              background: "#161b27", borderRadius: 14,
              padding: "8px 10px 8px 14px",
              border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Pergunta o que quiser..."
                rows={1}
                disabled={loading}
                style={{
                  flex: 1, background: "transparent", border: "none",
                  color: "#eef2f9", fontSize: "0.92rem", resize: "none",
                  fontFamily: "inherit", outline: "none",
                  maxHeight: 100,
                }}
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim() || loading}
                style={{
                  background: input.trim() && !loading
                    ? "linear-gradient(135deg,#6366f1,#8b5cf6)"
                    : "rgba(255,255,255,0.06)",
                  color: "#fff", border: "none", borderRadius: 10,
                  padding: "6px 10px", cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                  fontWeight: 800, fontSize: "0.82rem",
                  alignSelf: "flex-end",
                  transition: "background 0.15s",
                }}
                aria-label="Enviar mensagem"
              >
                ↑
              </button>
            </div>
            {/* WhatsApp humano fica disponivel mas DISCRETO — a TamoIA eh o suporte. */}
            <div style={{
              marginTop: 10, fontSize: "0.7rem", color: "#4e5c72", textAlign: "center",
            }}>
              Pra falar com pessoa, digita <strong style={{ color: "#8394b0" }}>"quero falar com humano"</strong>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/** Renderiza markdown bem simples (negrito + quebras + links). */
function renderInline(text: string) {
  // Sanitiza minimamente — TamoIA so manda texto, sem HTML.
  const parts: (string | { bold: string })[] = [];
  const re = /\*\*([^*]+)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push({ bold: m[1] });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.map((p, i) =>
    typeof p === "string"
      ? <span key={i}>{p}</span>
      : <strong key={i} style={{ fontWeight: 800, color: "#eef2f9" }}>{p.bold}</strong>
  );
}

function Bubble({ role, content }: { role: "user" | "assistant"; content: string }) {
  const isUser = role === "user";
  return (
    <div style={{
      display: "flex", justifyContent: isUser ? "flex-end" : "flex-start",
      maxWidth: "100%",
    }}>
      <div style={{
        background: isUser
          ? "linear-gradient(135deg,#6366f1,#8b5cf6)"
          : "#161b27",
        color: isUser ? "#fff" : "#c8d6f0",
        borderRadius: isUser ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
        padding: "9px 12px",
        fontSize: "0.9rem",
        lineHeight: 1.5,
        maxWidth: "85%",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        border: isUser ? "none" : "1px solid rgba(255,255,255,0.05)",
      }}>
        {content.split("\n").map((line, i) => (
          <div key={i}>{renderInline(line)}</div>
        ))}
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div style={{ display: "flex", justifyContent: "flex-start" }}>
      <div style={{
        background: "#161b27", border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: "14px 14px 14px 4px",
        padding: "10px 14px",
        display: "flex", gap: 4, alignItems: "center",
      }}>
        <style>{`
          @keyframes pm-typing {
            0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
            30% { transform: translateY(-3px); opacity: 1; }
          }
          .pm-dot { animation: pm-typing 1.2s ease-in-out infinite; }
          .pm-dot:nth-child(2) { animation-delay: 0.18s; }
          .pm-dot:nth-child(3) { animation-delay: 0.36s; }
        `}</style>
        <span className="pm-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#8394b0", display: "inline-block" }} />
        <span className="pm-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#8394b0", display: "inline-block" }} />
        <span className="pm-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#8394b0", display: "inline-block" }} />
      </div>
    </div>
  );
}
