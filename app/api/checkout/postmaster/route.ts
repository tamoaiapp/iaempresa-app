import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN_POSTMASTER!,
});

export async function POST() {
  try {
    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: [
          {
            id: "postmaster-v1",
            title: "PostMaster — App de postagem automática",
            description: "Aplicativo Windows para postar Reels no Instagram e TikTok automaticamente com IA local.",
            quantity: 1,
            currency_id: "BRL",
            unit_price: 197,
          },
        ],
        back_urls: {
          success: "https://iaempresa.app/postmasterpago?status=aprovado",
          failure: "https://iaempresa.app/postmaster?status=falhou",
          pending: "https://iaempresa.app/postmasterpago?status=pendente",
        },
        auto_return: "approved",
        statement_descriptor: "IAEMPRESA POSTMASTER",
        payment_methods: {
          excluded_payment_types: [],
          installments: 1,
        },
      },
    });

    return NextResponse.json({ url: result.init_point });
  } catch (err: unknown) {
    console.error("MP checkout error:", err);
    return NextResponse.json({ error: "Erro ao criar pagamento" }, { status: 500 });
  }
}
