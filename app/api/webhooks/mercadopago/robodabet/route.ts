import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Webhook do MercadoPago para Robô da Bet.
// MVP: só loga aprovação. v0.2 vai gerar token de acesso ao download
// e mandar email automático com link do .exe (copy do sistema PostMaster).
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({} as Record<string, unknown>));
    const id =
      (body as { data?: { id?: string | number } })?.data?.id ||
      req.nextUrl.searchParams.get("id");
    const topic =
      (body as { type?: string })?.type || req.nextUrl.searchParams.get("topic");

    if (topic === "payment" && id) {
      console.log("[MP webhook RoboDaBet] payment_id:", id, "topic:", topic);
      // TODO: ensureTokenForRoboDaBet(id) — pegar email, gerar token, enviar download link
    }
  } catch (e) {
    console.error("[MP webhook RoboDaBet] erro:", e);
  }

  return NextResponse.json({ received: true });
}
