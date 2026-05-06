'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { FERRAMENTAS } from '@/lib/ferramentas';

interface Stats { ferramenta: string; total: number }

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState('');
  const [status, setStatus] = useState('');
  const [stats, setStats] = useState<Stats[]>([]);
  const [totalClientes, setTotalClientes] = useState(0);

  useEffect(() => {
    async function carregar() {
      const { data } = await supabase.auth.getSession();
      if (!data.session) { router.replace('/login'); return; }

      const token = data.session.access_token;
      const headers = { Authorization: `Bearer ${token}` };

      // Busca dados do revendedor
      const { data: rev } = await supabase.from('revendedores')
        .select('nome, subscription_status').eq('id', data.session.user.id).single();

      if (!rev) { router.replace('/planos'); return; }
      if (rev.subscription_status !== 'active') { router.replace('/planos'); return; }

      setNome(rev.nome || data.session.user.email?.split('@')[0] || '');
      setStatus(rev.subscription_status);

      // Busca clientes agrupados por ferramenta
      const res = await fetch('/api/clientes', { headers });
      if (res.ok) {
        const clientes: { ferramenta: string }[] = await res.json();
        setTotalClientes(clientes.length);
        const grouped = FERRAMENTAS.map(f => ({
          ferramenta: f.id,
          total: clientes.filter(c => c.ferramenta === f.id).length,
        }));
        setStats(grouped);
      }
      setLoading(false);
    }
    carregar();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace('/login');
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div style={{ color: 'var(--muted)', fontSize: 14 }}>Carregando...</div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'Outfit, sans-serif' }}>
      {/* Header */}
      <div style={{ background: 'rgba(7,8,11,0.9)', borderBottom: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
          <div style={{ fontWeight: 900, fontSize: 18, background: 'linear-gradient(135deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            IA Empresa
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: 'var(--muted)', fontSize: 13 }}>Olá, {nome}</span>
            <button onClick={handleLogout} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--muted)', borderRadius: 8, padding: '5px 12px', fontSize: 12, cursor: 'pointer' }}>Sair</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 20px' }}>
        {/* Resumo */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 36 }}>
          {[
            { label: 'Clientes ativos', valor: totalClientes, cor: '#6366f1' },
            { label: 'Ferramentas disponíveis', valor: FERRAMENTAS.length, cor: '#a855f7' },
            { label: 'Plano', valor: 'Revendedor', cor: '#16c784' },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--card)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '20px 20px' }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: s.cor }}>{s.valor}</div>
              <div style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Ferramentas */}
        <div style={{ marginBottom: 12 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>Ferramentas</h2>
          <p style={{ color: 'var(--muted)', fontSize: 13 }}>Clique em uma ferramenta para gerenciar os clientes dela.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
          {FERRAMENTAS.map(f => {
            const stat = stats.find(s => s.ferramenta === f.id);
            const total = stat?.total ?? 0;
            return (
              <Link key={f.id} href={`/dashboard/${f.id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'var(--card)',
                  border: `1px solid rgba(255,255,255,0.07)`,
                  borderRadius: 18, padding: '20px',
                  cursor: 'pointer', transition: 'border-color 0.2s',
                  borderLeft: `3px solid ${f.cor}`,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div style={{ fontSize: 26 }}>{f.emoji}</div>
                    <div style={{ background: total > 0 ? `${f.cor}22` : 'rgba(255,255,255,0.04)', color: total > 0 ? f.cor : 'var(--dim)', borderRadius: 20, padding: '3px 10px', fontSize: 12, fontWeight: 700 }}>
                      {total} cliente{total !== 1 ? 's' : ''}
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{f.nome}</div>
                  <div style={{ color: 'var(--muted)', fontSize: 12, lineHeight: 1.5 }}>{f.desc}</div>
                  <div style={{ marginTop: 14, fontSize: 12, color: f.cor, fontWeight: 600 }}>
                    {total === 0 ? '+ Adicionar primeiro cliente' : '→ Gerenciar clientes'}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
