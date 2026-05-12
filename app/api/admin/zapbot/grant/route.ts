import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

/**
 * POST /api/admin/zapbot/grant
 * Header: Authorization: Bearer <ZAPBOT_GRANT_KEY>
 * Body: { email?: string }  (opcional, só pra rastreio)
 *
 * Gera um token de cortesia e devolve a URL pronta pra enviar.
 * Marca como gratuito usando `mp_payment_id = FREE-<8hex>` (prefixo distingue
 * de pagamentos reais do MercadoPago, que são numéricos).
 */
export async function POST(req: NextRequest) {
  const grantKey = process.env.ZAPBOT_GRANT_KEY;
  if (!grantKey) {
    return NextResponse.json(
      { error: "ZAPBOT_GRANT_KEY não configurada" },
      { status: 500 },
    );
  }

  const auth = req.headers.get("authorization") || "";
  const provided = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (
    !provided ||
    provided.length !== grantKey.length ||
    !crypto.timingSafeEqual(Buffer.from(provided), Buffer.from(grantKey))
  ) {
    return NextResponse.json({ error: "não autorizado" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as { email?: string };
  const email = typeof body.email === "string" ? body.email.trim().slice(0, 200) : null;

  const token = crypto.randomBytes(8).toString("hex");
  const freeId = `FREE-${crypto.randomBytes(4).toString("hex")}`;

  const sb = supabaseAdmin();
  const { error } = await sb.from("zapbot_tokens").insert({
    token,
    mp_payment_id: freeId,
    payer_email: email,
  });

  if (error) {
    console.error("[zapbot grant] insert err:", error.message);
    return NextResponse.json({ error: "erro ao gerar token" }, { status: 500 });
  }

  const url = `https://iaempresa.app/pagamentobotzap?token=${token}`;
  return NextResponse.json({ token, url, mp_payment_id: freeId, email });
}
