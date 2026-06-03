import { NextRequest } from "next/server";
import { getAnthropic, HAIKU_MODEL } from "@/lib/agent/anthropic";
import { buildSystemPrompt } from "@/lib/agent/system-prompt";

export const runtime = "nodejs";
export const maxDuration = 30;

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: Message[];
  produto?: "postmaster" | "tamowork" | "geral";
}

const SUPORTE_WHATSAPP_FALLBACK = "Tô aprendendo a responder por aqui ainda. Manda mensagem direto pra mim no WhatsApp +55 11 96724-5795 que te respondo agora.";

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
  // Trunca historico em 20 turnos pra controlar custo (suporte = conversa curta)
  const trimmed = messages.slice(-20);

  const client = getAnthropic();
  if (!client) {
    // Graceful: sem chave, devolve fallback amigavel
    return Response.json({
      role: "assistant",
      content: SUPORTE_WHATSAPP_FALLBACK,
      fallback: true,
    });
  }

  const system = buildSystemPrompt({ produto: body.produto ?? "postmaster" });

  try {
    const resp = await client.messages.create({
      model: HAIKU_MODEL,
      max_tokens: 400,
      system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
      messages: trimmed.map((m) => ({ role: m.role, content: m.content })),
    });
    const textBlock = resp.content.find((b) => b.type === "text");
    const text = textBlock && textBlock.type === "text" ? textBlock.text : "";
    return Response.json({
      role: "assistant",
      content: text.trim() || SUPORTE_WHATSAPP_FALLBACK,
      usage: resp.usage,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "unknown";
    console.error("[agent/chat]", msg);
    return Response.json({
      role: "assistant",
      content: SUPORTE_WHATSAPP_FALLBACK,
      error: true,
    });
  }
}
