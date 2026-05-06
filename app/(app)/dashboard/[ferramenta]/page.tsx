'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { getFerramenta } from '@/lib/ferramentas';

interface Cliente {
  id: string;
  nome_cliente: string;
  nome_negocio: string;
  slug: string;
  created_at: string;
}

interface NovoCliente { url: string; senha: string; nomeCliente: string }

export default function FerramDashPage() {
  const router = useRouter();
  const { ferramenta } = useParams<{ ferramenta: string }>();
  const ferram = getFerramenta(ferramenta);

  const [loading, setLoading] = useState(true);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [novoNome, setNovoNome] = useState('');
  const [novoNegocio, setNovoNegocio] = useState('');
  const [criando, setCriando] = useState(false);
  const [novo, setNovo] = useState<NovoCliente | null>(null);
  const [token, setToken] = useState('');
  const [revendedorSlug, setRevendedorSlug] = useState('');

  async function carregarClientes(tk: string) {
    const res = await fetch(`/api/clientes?ferramenta=${ferramenta}`, { headers: { Authorization: `Bearer ${tk}` } });
    if (res.ok) setClientes(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    async function init() {
      const { data } = await supabase.auth.getSession();
      if (!data.session) { router.replace('/login'); return; }
      const tk = data.session.access_token;
      setToken(tk);
      const { data: rev } = await supabase.from('revendedores').select('slug, subscription_status').eq('id', data.session.user.id).single();
      if (!rev || rev.subscription_status !== 'active') { router.replace('/planos'); return; }
      setRevendedorSlug(rev.slug);
      carregarClientes(tk);
    }
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ferramenta]);

  async function handleNovoCliente(e: React.FormEvent) {
    e.preventDefault();
    if (!novoNome.trim()) return;
    setCriando(true);
    const res = await fetch('/api/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ferramenta, nomeCliente: novoNome, nomeNegocio: novoNegocio || novoNome }),
    });
    const data = await res.json();
    if (res.ok) {
      setNovo({ url: data.url, senha: data.senha, nomeCliente: novoNome });
      setNovoNome('');
      setNovoNegocio('');
      carregarClientes(token);
    }
    setCriando(false);
  }

  if (!ferram) return <div style={{ padding: 40, color: 'var(--muted)' }}>Ferramenta não encontrada.</div>;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'Outfit, sans-serif' }}>
      {/* Header */}
      <div style={{ background: 'rgba(7,8,11,0.9)', borderBottom: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', gap: 16, height: 60 }}>
          <Link href="/dashboard" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: 13 }}>← Dashboard</Link>
          <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.1)' }} />
          <span style={{ fontSize: 16, fontWeight: 700 }}>{ferram.emoji} {ferram.nome}</span>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 20px' }}>

        {/* Novo cliente gerado */}
        {novo && (
          <div style={{ background: 'rgba(22,199,132,0.08)', border: '1px solid rgba(22,199,132,0.3)', borderRadius: 16, padding: '20px 24px', marginBottom: 28 }}>
            <div style={{ fontWeight: 700, color: '#16c784', marginBottom: 12 }}>✅ Cliente {novo.nomeCliente} criado!</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 8 }}>Envie essas informações para o seu cliente:</div>
            <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: '12px 16px', fontFamily: 'monospace', fontSize: 13, marginBottom: 12 }}>
              <div>🔗 Link: <strong style={{ color: 'var(--text)' }}>{novo.url}</strong></div>
              <div style={{ marginTop: 6 }}>🔑 Senha: <strong style={{ color: '#a78bfa' }}>{novo.senha}</strong></div>
            </div>
            <button onClick={() => {
              navigator.clipboard.writeText(`Acesse: ${novo.url}\nSenha: ${novo.senha}`);
            }} style={{ background: 'rgba(22,199,132,0.15)', border: '1px solid rgba(22,199,132,0.3)', color: '#16c784', borderRadius: 8, padding: '6px 14px', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
              Copiar para enviar no WhatsApp
            </button>
            <button onClick={() => setNovo(null)} style={{ background: 'none', border: 'none', color: 'var(--dim)', fontSize: 12, cursor: 'pointer', marginLeft: 12 }}>Fechar</button>
          </div>
        )}

        {/* Formulário novo cliente */}
        <div style={{ background: 'var(--card)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, padding: '24px', marginBottom: 28 }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>+ Novo cliente</div>
          <form onSubmit={handleNovoCliente} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <input value={novoNome} onChange={e => setNovoNome(e.target.value)} placeholder="Nome do cliente" required
              style={{ flex: '1 1 200px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '10px 14px', color: 'var(--text)', fontSize: 14 }} />
            <input value={novoNegocio} onChange={e => setNovoNegocio(e.target.value)} placeholder="Nome do negócio (opcional)"
              style={{ flex: '1 1 200px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '10px 14px', color: 'var(--text)', fontSize: 14 }} />
            <button type="submit" disabled={criando}
              style={{ background: `linear-gradient(135deg, ${ferram.cor}, ${ferram.cor}bb)`, color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontWeight: 700, fontSize: 14, cursor: criando ? 'wait' : 'pointer', flexShrink: 0 }}>
              {criando ? 'Criando...' : 'Gerar link + senha'}
            </button>
          </form>
        </div>

        {/* Lista de clientes */}
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>Clientes ativos ({clientes.length})</h2>
        </div>

        {loading && <div style={{ color: 'var(--muted)', fontSize: 13 }}>Carregando...</div>}

        {!loading && clientes.length === 0 && (
          <div style={{ background: 'var(--card)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '40px', textAlign: 'center', color: 'var(--muted)', fontSize: 14 }}>
            Nenhum cliente ainda. Adicione o primeiro acima.
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {clientes.map(c => {
            const url = `https://iaempresa.app/${ferramenta}/${revendedorSlug}/${c.slug}`;
            return (
              <div key={c.id} style={{ background: 'var(--card)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 2 }}>{c.nome_negocio}</div>
                  <div style={{ color: 'var(--dim)', fontSize: 12 }}>{url}</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => navigator.clipboard.writeText(url)}
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--muted)', borderRadius: 8, padding: '6px 12px', fontSize: 12, cursor: 'pointer' }}>
                    Copiar link
                  </button>
                  <a href={url} target="_blank" rel="noopener noreferrer"
                    style={{ background: `${ferram.cor}18`, border: `1px solid ${ferram.cor}44`, color: ferram.cor, borderRadius: 8, padding: '6px 12px', fontSize: 12, textDecoration: 'none', fontWeight: 600 }}>
                    Abrir →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
