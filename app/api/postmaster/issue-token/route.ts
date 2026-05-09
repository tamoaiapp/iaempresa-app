import { NextRequest, NextResponse } from "next/server";
import { ensureTokenForPayment, fetchMpPayment, isApprovedPostmaster } from "@/lib/postmaster-tokens";

export const dynamic = "force-dynamic";

// POST /api/postmaster/issue-token  { payment_id }
// Gera (ou retorna existente) um token único para um pagamento aprovado de R$197.
// Usado pra catch-up de pagamentos antigos e pra polling do frontend.
export async function POST(req: NextRequest) {
  let payment_id: string | number | undefined;
  try {
    const body = await req.json();
    payment_id = body?.payment_id;
  } catch {
    return NextResponse.json({ error: "json inválido" }, { status: 400 });
  }

  if (!payment_id) {
    return NextResponse.json({ error: "payment_id obrigatório" }, { status: 400 });
  }

  try {
    const payment = await fetchMpPayment(payment_id);
    if (!payment) {
      return NextResponse.json({ error: "pagamento não encontrado" }, { status: 404 });
    }
    if (!isApprovedPostmaster(payment)) {
      return NextResponse.json(
        {
          error: "pagamento não aprovado ou valor diferente de R$197",
          status: payment.status,
          amount: payment.amount,
        },
        { status: 400 },
      );
    }

    const { token, created } = await ensureTokenForPayment(payment.id, payment.email);
    return NextResponse.json({
      token,
      created,
      payment_id: String(payment.id),
      payer_email: payment.email,
      url: `https://iaempresa.app/postmasterpago?token=${token}`,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "erro desconhecido";
    console.error("[issue-token] erro:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
