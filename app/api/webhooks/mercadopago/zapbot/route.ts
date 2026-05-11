import { NextRequest, NextResponse } from "next/server";
import { ensureTokenForPayment, fetchMpPayment, isApprovedZapbot } from "@/lib/zapbot-tokens";

export const dynamic = "force-dynamic";

/**
 * MercadoPago webhook for the ZapBot product.
 * When a R$97 payment is approved, generates (or recovers) a unique token
 * and saves it in zapbot_tokens. Idempotent — safe to call multiple times
 * for the same payment_id.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({} as Record<string, unknown>));
    const id =
      (body as { data?: { id?: string | number } })?.data?.id ||
      req.nextUrl.searchParams.get("id");
    const topic =
      (body as { type?: string })?.type || req.nextUrl.searchParams.get("topic");

    if (topic === "payment" && id) {
      const payment = await fetchMpPayment(id);
      console.log("[MP webhook ZapBot]", {
        id: payment?.id,
        status: payment?.status,
        amount: payment?.amount,
        email: payment?.email,
        method: payment?.method,
      });

      if (isApprovedZapbot(payment)) {
        const { token, created } = await ensureTokenForPayment(payment!.id, payment!.email);
        console.log("[MP webhook ZapBot] token", { id: payment!.id, token, created });
      }
    }
  } catch (e) {
    console.error("[MP webhook ZapBot] erro:", e);
  }

  // Always return 200 — MP retries on 4xx/5xx
  return NextResponse.json({ received: true });
}
