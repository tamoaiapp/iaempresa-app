import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const { userId, email, revendedorSlug } = await req.json();

  if (!userId || !email) {
    return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
  }

  const origin = req.headers.get('origin') || 'https://iaempresa.app';

  const existing = await stripe.customers.list({ email, limit: 1 });
  let customerId = existing.data[0]?.id;
  if (!customerId) {
    const c = await stripe.customers.create({ email, metadata: { supabase_user_id: userId } });
    customerId = c.id;
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
    success_url: `${origin}/dashboard?assinatura=ok`,
    cancel_url: `${origin}/planos`,
    metadata: { user_id: userId, revendedor_slug: revendedorSlug ?? '' },
    subscription_data: { metadata: { user_id: userId } },
    locale: 'pt-BR',
  });

  return NextResponse.json({ url: session.url });
}
