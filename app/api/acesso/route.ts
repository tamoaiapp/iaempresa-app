import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// POST /api/acesso — valida senha do cliente e retorna token de sessão
export async function POST(req: NextRequest) {
  const { ferramenta, revendedorSlug, clienteSlug, senha } = await req.json();

  if (!ferramenta || !revendedorSlug || !clienteSlug || !senha) {
    return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
  }

  const db = supabaseAdmin();

  const { data: rev } = await db.from('revendedores')
    .select('id')
    .eq('slug', revendedorSlug)
    .single();

  if (!rev) return NextResponse.json({ error: 'Revendedor não encontrado' }, { status: 404 });

  const { data: cliente } = await db.from('clientes')
    .select('id, senha_hash, nome_negocio, instance_id, ferramenta')
    .eq('revendedor_id', rev.id)
    .eq('ferramenta', ferramenta)
    .eq('slug', clienteSlug)
    .eq('ativo', true)
    .single();

  if (!cliente) return NextResponse.json({ error: 'Cliente não encontrado' }, { status: 404 });

  const ok = await bcrypt.compare(senha, cliente.senha_hash);
  if (!ok) return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 });

  // Token simples: base64 do cliente id + timestamp (para sessão no cookie)
  const token = Buffer.from(`${cliente.id}:${Date.now()}`).toString('base64');

  return NextResponse.json({
    ok: true,
    token,
    clienteId: cliente.id,
    nomeNegocio: cliente.nome_negocio,
    instanceId: cliente.instance_id,
    ferramenta: cliente.ferramenta,
  });
}
