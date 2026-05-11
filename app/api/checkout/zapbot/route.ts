import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { ZAPBOT_PRICE } from "@/lib/zapbot-tokens";

export async function POST() {
  const token = process.env.MP_ACCESS_TOKEN_ZAPBOT;
  if (!token) {
    console.error("MP_ACCESS_TOKEN_ZAPBOT não está definido");
    return NextResponse.json({ error: "Configuração de pagamento ausente" }, { status: 500 });
  }

  const client = new MercadoPagoConfig({ accessToken: token });

  try {
    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: [
          {
            id: "zapbot-v1",
            title: "ZapBot — Atendente WhatsApp com IA local",
            description:
              "Aplicativo Windows para atendimento automatizado no WhatsApp usando IA local (Ollama + Qwen). Sem mensalidade, sem nuvem.",
            quantity: 1,
            currency_id: "BRL",
            unit_price: ZAPBOT_PRICE,
          },
        ],
        back_urls: {
          success: "https://iaempresa.app/pagamentobotzap?status=aprovado",
          failure: "https://iaempresa.app/zapbot?status=falhou",
          pending: "https://iaempresa.app/pagamentobotzap?status=pendente",
        },
        auto_return: "approved",
        notification_url: "https://iaempresa.app/api/webhooks/mercadopago/zapbot",
        statement_descriptor: "IAEMPRESA ZAPBOT",
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
