import { NextRequest, NextResponse } from "next/server";
import { ensureTokenForPayment, fetchMpPayment, isApprovedPostmaster } from "@/lib/postmaster-tokens";

export const dynamic = "force-dynamic";

// GET /api/postmaster/check-payment?id=PAYMENT_ID
// Verifica o status atual do pagamento MercadoPago server-side.
// Quando aprovado e R$197 → garante token único e retorna a downloadUrl.
// Usado pela página /postmasterpago para liberar o download quando o PIX é confirmado.
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id obrigatório" }, { status: 400 });

  const payment = await fetchMpPayment(id);
  if (!payment) return NextResponse.json({ error: "pagamento não encontrado" }, { status: 404 });

  const approved = isApprovedPostmaster(payment);

  let token: string | null = null;
  let downloadUrl: string | null = null;
  if (approved) {
    try {
      const issued = await ensureTokenForPayment(payment.id, payment.email);
      token = issued.token;
      downloadUrl = `https://iaempresa.app/postmasterpago?token=${token}`;
    } catch (e) {
      // se falhar a geração do token, ainda devolvemos approved:true sem travar o cliente
      console.error("[check-payment] ensureTokenForPayment err:", e);
    }
  }

  return NextResponse.json({
    status: payment.status,
    amount: payment.amount,
    method: payment.method,
    approved,
    productMatch: Number(payment.amount) === 197,
    token,
    downloadUrl,
  });
}
