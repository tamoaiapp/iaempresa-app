import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

export async function POST() {
  const token = process.env.MP_ACCESS_TOKEN_POSTMASTER;
  if (!token) {
    console.error("MP_ACCESS_TOKEN_POSTMASTER não está definido");
    return NextResponse.json({ error: "Configuração de pagamento ausente" }, { status: 500 });
  }

  const client = new MercadoPagoConfig({ accessToken: token });

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
        notification_url: "https://iaempresa.app/api/webhooks/mercadopago/postmaster",
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
