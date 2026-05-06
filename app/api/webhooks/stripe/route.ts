import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const db = supabaseAdmin();

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.user_id;
    const subId = session.subscription as string;
    if (userId) {
      await db.from('revendedores').upsert({
        id: userId,
        stripe_subscription_id: subId,
        stripe_customer_id: session.customer as string,
        subscription_status: 'active',
      }, { onConflict: 'id' });
    }
  }

  if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
    const sub = event.data.object as Stripe.Subscription;
    const userId = sub.metadata?.user_id;
    const status = event.type === 'customer.subscription.deleted' ? 'canceled'
      : sub.status === 'active' ? 'active' : 'inactive';
    if (userId) {
      await db.from('revendedores').update({ subscription_status: status }).eq('id', userId);
    }
  }

  return NextResponse.json({ ok: true });
}
