import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const { userId, nome, slug } = await req.json();
  const db = supabaseAdmin();

  // Garante slug único
  let finalSlug = slug;
  const { data: existing } = await db.from('revendedores').select('slug').eq('slug', slug).maybeSingle();
  if (existing) finalSlug = `${slug}${Math.floor(Math.random() * 99)}`;

  await db.from('revendedores').upsert({
    id: userId,
    nome,
    slug: finalSlug,
    subscription_status: 'inactive',
  }, { onConflict: 'id' });

  return NextResponse.json({ ok: true, slug: finalSlug });
}
