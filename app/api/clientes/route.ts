import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabase, supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// POST /api/clientes — cria novo cliente para o revendedor
export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!auth) return NextResponse.json({ error: 'Sem autorização' }, { status: 401 });

  const { data: { user } } = await supabase.auth.getUser(auth);
  if (!user) return NextResponse.json({ error: 'Token inválido' }, { status: 401 });

  const db = supabaseAdmin();

  // Verifica assinatura ativa
  const { data: rev } = await db.from('revendedores')
    .select('slug, subscription_status')
    .eq('id', user.id)
    .single();

  if (!rev || rev.subscription_status !== 'active') {
    return NextResponse.json({ error: 'Assinatura inativa' }, { status: 403 });
  }

  const { ferramenta, nomeCliente, nomeNegocio } = await req.json();
  if (!ferramenta || !nomeCliente) {
    return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
  }

  // Gera slug e senha
  const slug = nomeCliente.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

  const senha = Math.floor(1000 + Math.random() * 9000).toString();
  const senhaHash = await bcrypt.hash(senha, 10);

  const { data, error } = await db.from('clientes').insert({
    revendedor_id: user.id,
    ferramenta,
    slug,
    senha_hash: senhaHash,
    nome_negocio: nomeNegocio || nomeCliente,
    nome_cliente: nomeCliente,
  }).select('id, slug').single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  const url = `https://iaempresa.app/${ferramenta}/${rev.slug}/${data.slug}`;
  return NextResponse.json({ id: data.id, url, senha });
}

// GET /api/clientes?ferramenta=chatbot — lista clientes do revendedor
export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!auth) return NextResponse.json({ error: 'Sem autorização' }, { status: 401 });

  const { data: { user } } = await supabase.auth.getUser(auth);
  if (!user) return NextResponse.json({ error: 'Token inválido' }, { status: 401 });

  const ferramenta = req.nextUrl.searchParams.get('ferramenta');
  const db = supabaseAdmin();

  let q = db.from('clientes').select('*').eq('revendedor_id', user.id).eq('ativo', true).order('created_at', { ascending: false });
  if (ferramenta) q = q.eq('ferramenta', ferramenta);

  const { data, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}
