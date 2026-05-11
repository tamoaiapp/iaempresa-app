import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { ensureTokenForPayment, fetchMpPayment, isApprovedZapbot } from "@/lib/zapbot-tokens";

export const dynamic = "force-dynamic";

/**
 * Verify the MercadoPago webhook signature.
 *
 * MP sends `x-signature: ts=<unix>,v1=<hex_hmac>` and `x-request-id: <uuid>`.
 * The HMAC-SHA256 input is the canonical string:
 *   id:<dataId>;request-id:<x-request-id>;ts:<ts>;
 * signed with the secret stored at MP_WEBHOOK_SECRET_ZAPBOT.
 *
 * If the secret env is missing we let the request through (graceful degrade —
 * the actual payment is still re-fetched from MP API before we trust it).
 */
function verifyMpSignature(req: NextRequest, dataId: string | number): boolean {
  const secret = process.env.MP_WEBHOOK_SECRET_ZAPBOT;
  if (!secret) {
    console.warn("[MP webhook ZapBot] MP_WEBHOOK_SECRET_ZAPBOT ausente — pulando verificação");
    return true;
  }

  const xSignature = req.headers.get("x-signature");
  const xRequestId = req.headers.get("x-request-id");
  if (!xSignature || !xRequestId) {
    console.warn("[MP webhook ZapBot] headers de assinatura ausentes");
    return false;
  }

  const parts = Object.fromEntries(
    xSignature.split(",").map((kv) => {
      const [k, v] = kv.split("=");
      return [k?.trim(), v?.trim()];
    }),
  );
  const ts = parts.ts;
  const v1 = parts.v1;
  if (!ts || !v1) return false;

  const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;
  const expected = crypto.createHmac("sha256", secret).update(manifest).digest("hex");

  try {
    return crypto.timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(v1, "hex"));
  } catch {
    return false;
  }
}

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
      if (!verifyMpSignature(req, id)) {
        console.error("[MP webhook ZapBot] assinatura inválida — descartando", { id });
        return NextResponse.json({ received: true });
      }

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

  // Always return 200 — MP retries on 4xx/5xx, but we don't want retries for
  // bad signatures or non-payment events.
  return NextResponse.json({ received: true });
}
