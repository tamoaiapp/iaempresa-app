import { NextRequest, NextResponse } from "next/server";
import {
  ensureTokenForRoboDaBet,
  fetchMpPaymentRoboDaBet,
  isApprovedRoboDaBet,
  ROBODABET_PRICE,
} from "@/lib/robodabet-tokens";

export const dynamic = "force-dynamic";

// GET /api/robodabet/check-payment?id=PAYMENT_ID
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id obrigatório" }, { status: 400 });

  const payment = await fetchMpPaymentRoboDaBet(id);
  if (!payment) return NextResponse.json({ error: "pagamento não encontrado" }, { status: 404 });

  const approved = isApprovedRoboDaBet(payment);

  let token: string | null = null;
  let downloadUrl: string | null = null;
  if (approved) {
    try {
      const issued = await ensureTokenForRoboDaBet(payment.id, payment.email);
      token = issued.token;
      downloadUrl = `https://iaempresa.app/robodabetpago?token=${token}`;
    } catch (e) {
      console.error("[robodabet check-payment] ensureToken err:", e);
    }
  }

  return NextResponse.json({
    status: payment.status,
    amount: payment.amount,
    method: payment.method,
    approved,
    productMatch: Number(payment.amount) === ROBODABET_PRICE,
    token,
    downloadUrl,
  });
}
