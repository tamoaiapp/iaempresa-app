import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Webhook do MercadoPago para o produto PostMaster.
// Recebe notificação quando o pagamento muda de status (ex: pending → approved no PIX).
// Por enquanto só loga — o frontend já faz polling para liberar o download.
// Se no futuro quiser enviar email com o link de download, é aqui que entra.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const id = body?.data?.id || req.nextUrl.searchParams.get("id");
    const topic = body?.type || req.nextUrl.searchParams.get("topic");

    if (topic === "payment" && id) {
      const token = process.env.MP_ACCESS_TOKEN_POSTMASTER;
      if (token) {
        const res = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const payment = await res.json();
          console.log("[MP webhook PostMaster]", {
            id: payment.id,
            status: payment.status,
            amount: payment.transaction_amount,
            email: payment.payer?.email,
            method: payment.payment_method_id,
          });
        }
      }
    }
  } catch (e) {
    console.error("[MP webhook PostMaster] erro:", e);
  }

  // Sempre 200 — o MP só desiste se receber 4xx/5xx repetidamente
  return NextResponse.json({ received: true });
}
