import crypto from "crypto";
import { supabaseAdmin } from "./supabase";

export type PostmasterTokenRow = {
  token: string;
  mp_payment_id: string;
  payer_email: string | null;
  created_at: string;
  first_access_at: string | null;
  last_access_at: string | null;
  access_count: number;
  access_ips: string[];
};

export const POSTMASTER_PRICE = 197;

/**
 * Garante um token único para um pagamento aprovado.
 * Idempotente: se já existir token para esse mp_payment_id, retorna o existente.
 */
export async function ensureTokenForPayment(
  paymentId: string | number,
  payerEmail?: string | null,
): Promise<{ token: string; created: boolean }> {
  const sb = supabaseAdmin();
  const idStr = String(paymentId);

  // Já existe?
  const { data: existing, error: selErr } = await sb
    .from("postmaster_tokens")
    .select("token")
    .eq("mp_payment_id", idStr)
    .maybeSingle();

  if (selErr) throw new Error(`select postmaster_tokens: ${selErr.message}`);
  if (existing?.token) return { token: existing.token, created: false };

  // Gera novo token (16 chars hex)
  const token = crypto.randomBytes(8).toString("hex");

  const { error: insErr } = await sb.from("postmaster_tokens").insert({
    token,
    mp_payment_id: idStr,
    payer_email: payerEmail ?? null,
  });

  // Race condition: outro request pode ter criado entre o select e o insert.
  if (insErr) {
    // Tenta de novo ler — se existir agora, devolve
    const { data: again } = await sb
      .from("postmaster_tokens")
      .select("token")
      .eq("mp_payment_id", idStr)
      .maybeSingle();
    if (again?.token) return { token: again.token, created: false };
    throw new Error(`insert postmaster_tokens: ${insErr.message}`);
  }

  return { token, created: true };
}

/**
 * Busca um pagamento no MercadoPago e valida se está aprovado e bate com R$197.
 */
export async function fetchMpPayment(paymentId: string | number) {
  const accessToken = process.env.MP_ACCESS_TOKEN_POSTMASTER;
  if (!accessToken) throw new Error("MP_ACCESS_TOKEN_POSTMASTER ausente");

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

export function isApprovedPostmaster(p: { status: string; amount: number } | null): boolean {
  return !!p && p.status === "approved" && Number(p.amount) === POSTMASTER_PRICE;
}
