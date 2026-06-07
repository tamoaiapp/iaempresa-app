import { NextRequest, NextResponse } from "next/server";
import {
  ensureTokenForRoboDaBet,
  fetchMpPaymentRoboDaBet,
  isApprovedRoboDaBet,
} from "@/lib/robodabet-tokens";

export const dynamic = "force-dynamic";

// Webhook MercadoPago — Robô da Bet
// Quando pagamento aprovado (R$69), gera/recupera token único.
// Idempotente — pode ser chamado várias vezes pro mesmo payment_id.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({} as Record<string, unknown>));
    const id =
      (body as { data?: { id?: string | number } })?.data?.id ||
      req.nextUrl.searchParams.get("id");
    const topic =
      (body as { type?: string })?.type || req.nextUrl.searchParams.get("topic");

    if (topic === "payment" && id) {
      const payment = await fetchMpPaymentRoboDaBet(id);
      console.log("[MP webhook RoboDaBet]", {
        id: payment?.id,
        status: payment?.status,
        amount: payment?.amount,
        email: payment?.email,
        method: payment?.method,
      });

      if (isApprovedRoboDaBet(payment)) {
        const { token, created } = await ensureTokenForRoboDaBet(payment!.id, payment!.email);
        console.log("[MP webhook RoboDaBet] token", { id: payment!.id, token, created });
      }
    }
  } catch (e) {
    console.error("[MP webhook RoboDaBet] erro:", e);
  }

  return NextResponse.json({ received: true });
}
