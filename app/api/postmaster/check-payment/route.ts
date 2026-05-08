import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// GET /api/postmaster/check-payment?id=PAYMENT_ID
// Verifica o status atual do pagamento MercadoPago server-side.
// Usado pela página /postmasterpago para liberar o download quando o PIX é confirmado.
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id obrigatório" }, { status: 400 });

  const token = process.env.MP_ACCESS_TOKEN_POSTMASTER;
  if (!token) return NextResponse.json({ error: "config ausente" }, { status: 500 });

  const res = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) return NextResponse.json({ error: "pagamento não encontrado" }, { status: 404 });

  const data = await res.json();
  return NextResponse.json({
    status: data.status,
    amount: data.transaction_amount,
    method: data.payment_method_id,
    approved: data.status === "approved",
    productMatch: data.transaction_amount === 197,
  });
}
