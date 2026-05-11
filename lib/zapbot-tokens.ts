import crypto from "crypto";
import { supabaseAdmin } from "./supabase";

export type ZapbotTokenRow = {
  token: string;
  mp_payment_id: string;
  payer_email: string | null;
  created_at: string;
  first_access_at: string | null;
  last_access_at: string | null;
  access_count: number;
  access_ips: string[];
};

export const ZAPBOT_PRICE = 97;

/**
 * Garante um token único para um pagamento aprovado do ZapBot.
 * Idempotente: se já existir token para esse mp_payment_id, retorna o existente.
 */
export async function ensureTokenForPayment(
  paymentId: string | number,
  payerEmail?: string | null,
): Promise<{ token: string; created: boolean }> {
  const sb = supabaseAdmin();
  const idStr = String(paymentId);

  const { data: existing, error: selErr } = await sb
    .from("zapbot_tokens")
    .select("token")
    .eq("mp_payment_id", idStr)
    .maybeSingle();

  if (selErr) throw new Error(`select zapbot_tokens: ${selErr.message}`);
  if (existing?.token) return { token: existing.token, created: false };

  // 16 chars hex — short enough for URLs, long enough to prevent guessing
  const token = crypto.randomBytes(8).toString("hex");

  const { error: insErr } = await sb.from("zapbot_tokens").insert({
    token,
    mp_payment_id: idStr,
    payer_email: payerEmail ?? null,
  });

  if (insErr) {
    // race condition: another request may have inserted between our select and insert
    const { data: again } = await sb
      .from("zapbot_tokens")
      .select("token")
      .eq("mp_payment_id", idStr)
      .maybeSingle();
    if (again?.token) return { token: again.token, created: false };
    throw new Error(`insert zapbot_tokens: ${insErr.message}`);
  }

  return { token, created: true };
}

/**
 * Fetches a payment from MercadoPago using the ZapBot app's access token.
 */
export async function fetchMpPayment(paymentId: string | number) {
  const accessToken = process.env.MP_ACCESS_TOKEN_ZAPBOT;
  if (!accessToken) throw new Error("MP_ACCESS_TOKEN_ZAPBOT ausente");

  const res = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  if (!res.ok) return null;
  const data = await res.json();
  return {
    id: data.id,
    status: data.status as string,
    amount: data.transaction_amount as number,
    method: data.payment_method_id as string,
    email: (data.payer?.email ?? null) as string | null,
    raw: data,
  };
}

export function isApprovedZapbot(p: { status: string; amount: number } | null): boolean {
  return !!p && p.status === "approved" && Number(p.amount) === ZAPBOT_PRICE;
}
