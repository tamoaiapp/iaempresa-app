import { NextRequest, NextResponse } from "next/server";
import { ensureTokenForPayment, fetchMpPayment, isApprovedPostmaster } from "@/lib/postmaster-tokens";

export const dynamic = "force-dynamic";

// Webhook do MercadoPago para o produto PostMaster.
// Quando o pagamento de R$197 fica approved, gera (ou recupera) um token único
// e salva em postmaster_tokens. Idempotente — pode ser chamado várias vezes pra mesmo payment_id.
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
      console.log("[MP webhook PostMaster]", {
        id: payment?.id,
        status: payment?.status,
        amount: payment?.amount,
        email: payment?.email,
        method: payment?.method,
      });

      if (isApprovedPostmaster(payment)) {
        const { token, created } = await ensureTokenForPayment(payment!.id, payment!.email);
        console.log("[MP webhook PostMaster] token", { id: payment!.id, token, created });
      }
    }
  } catch (e) {
    console.error("[MP webhook PostMaster] erro:", e);
  }

  // Sempre 200 — o MP só desiste se receber 4xx/5xx repetidamente
  return NextResponse.json({ received: true });
}
