'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { FERRAMENTAS } from '@/lib/ferramentas';

export default function PlanosPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.replace('/login');
      else setChecking(false);
    });
  }, [router]);

  async function handleAssinar() {
    setLoading(true);
    setErro('');
    const { data } = await supabase.auth.getSession();
    if (!data.session) { router.replace('/login'); return; }

    const res = await fetch('/api/checkout/stripe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: data.session.user.id, email: data.session.user.email }),
    });
    const json = await res.json();
    if (json.url) window.location.href = json.url;
    else { setErro('Erro ao iniciar pagamento.'); setLoading(false); }
  }

  if (checking) return null;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'var(--bg)' }}>
      <div style={{ width: '100%', maxWidth: 460 }}>

        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 26, fontWeight: 900, marginBottom: 6 }}>Acesso completo</div>
          <div style={{ color: 'var(--muted)', fontSize: 15 }}>Todas as ferramentas, um único plano</div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(168,85,247,0.08))', border: '1px solid rgba(99,102,241,0.35)', borderRadius: 20, padding: '28px 24px', marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 4 }}>Plano Revendedor</div>
              <div style={{ color: 'var(--muted)', fontSize: 13 }}>Acesso a todas as ferramentas</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#a78bfa' }}>R$97</div>
              <div style={{ color: 'var(--muted)', fontSize: 12 }}>/mês</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {FERRAMENTAS.map(f => (
              <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
                <span style={{ color: '#16c784', fontSize: 15 }}>✓</span>
                <span>{f.emoji} {f.nome} — {f.desc}</span>
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, marginTop: 4 }}>
              <span style={{ color: '#16c784', fontSize: 15 }}>✓</span>
              <span>🔗 Links personalizados para seus clientes</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
              <span style={{ color: '#16c784', fontSize: 15 }}>✓</span>
              <span>📊 Dashboard para gerenciar todos</span>
            </div>
          </div>

          {erro && <div style={{ color: '#ef4444', fontSize: 13, marginBottom: 12 }}>{erro}</div>}

          <button onClick={handleAssinar} disabled={loading}
            style={{ width: '100%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', border: 'none', borderRadius: 12, padding: '14px', fontWeight: 700, fontSize: 16, cursor: loading ? 'wait' : 'pointer' }}>
            {loading ? 'Redirecionando...' : 'Assinar por R$97/mês →'}
          </button>

          <div style={{ textAlign: 'center', marginTop: 12, color: 'var(--dim)', fontSize: 12 }}>
            Pagamento seguro via Stripe · Cancele quando quiser
          </div>
        </div>
      </div>
    </div>
  );
}
