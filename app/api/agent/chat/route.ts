import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Bridge para o Claude Code rodando na VPS Hostinger (subscription Pro/Max,
 * sem cobrança por token). Endpoint VPS: http://76.13.125.78:8901/chat
 *
 * Se o bridge cair ou demorar demais, devolve fallback "fala com humano".
 */

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: Message[];
  produto?: "postmaster" | "tamowork" | "geral";
}

const SUPORTE_WHATSAPP_FALLBACK = "Tô aprendendo a responder por aqui ainda. Manda mensagem direto pra mim no WhatsApp +55 11 96724-5795 que te respondo agora.";

const BRIDGE_URL = (process.env.CLAUDE_BRIDGE_URL ?? "http://76.13.125.78:8901/chat").trim();
const BRIDGE_TOKEN = (process.env.CLAUDE_BRIDGE_TOKEN ?? "").trim();

export async function POST(req: NextRequest) {
  let body: ChatRequest;
  try {
    body = (await req.json()) as ChatRequest;
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (messages.length === 0) {
    return Response.json({ error: "empty_messages" }, { status: 400 });
  }
  // Suporte: conversa curta. 20 turnos eh folgado.
  const trimmed = messages.slice(-20);

  if (!BRIDGE_TOKEN) {
    return Response.json({
      role: "assistant",
      content: SUPORTE_WHATSAPP_FALLBACK,
      fallback: true,
    });
  }

  // Timeout 45s — Claude Code no VPS pode demorar 5-15s em respostas tipicas
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), 45_000);

  try {
    const res = await fetch(BRIDGE_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${BRIDGE_TOKEN}`,
      },
      body: JSON.stringify({ messages: trimmed, produto: body.produto ?? "postmaster" }),
      signal: ctl.signal,
    });
    clearTimeout(t);

    if (!res.ok) {
      const txt = (await res.text()).slice(0, 200);
      console.error("[bridge]", res.status, txt);
      return Response.json({
        role: "assistant",
        content: SUPORTE_WHATSAPP_FALLBACK,
        error: true,
      });
    }
    const j = (await res.json()) as { content?: string };
    return Response.json({
      role: "assistant",
      content: (j.content ?? "").trim() || SUPORTE_WHATSAPP_FALLBACK,
    });
  } catch (e) {
    clearTimeout(t);
    const msg = e instanceof Error ? e.message : "unknown";
    console.error("[agent/chat] bridge error:", msg);
    return Response.json({
      role: "assistant",
      content: SUPORTE_WHATSAPP_FALLBACK,
      error: true,
    });
  }
}
