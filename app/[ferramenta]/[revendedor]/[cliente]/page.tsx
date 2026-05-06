'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getFerramenta } from '@/lib/ferramentas';

const TOOLS_LABELS: Record<string, { instrucoes: string[] }> = {
  chatbot:    { instrucoes: ['Responde clientes automaticamente no WhatsApp', 'Disponível 24 horas por dia, 7 dias por semana', 'Configurado especialmente para o seu negócio'] },
  agenda:     { instrucoes: ['Seus clientes agendam pelo WhatsApp', 'Você recebe confirmação automática', 'Sem conflitos de horário'] },
  crm:        { instrucoes: ['Cadastro completo dos seus clientes', 'Disparo de mensagens segmentadas', 'Histórico de atendimento'] },
  cobranca:   { instrucoes: ['Cobranças enviadas automaticamente no dia certo', 'Lembretes antes do vencimento', 'Relatório de inadimplência'] },
  fideliza:   { instrucoes: ['IA envia mensagem no momento certo', 'Reativa clientes inativos automaticamente', 'Mensagens personalizadas por perfil'] },
  fidelidade: { instrucoes: ['Cartão de selos digital pelo WhatsApp', 'Cliente acumula pontos automaticamente', 'Prêmios configuráveis'] },
  orcamento:  { instrucoes: ['Formulário de orçamento no seu site ou WhatsApp', 'Orçamento enviado automaticamente por e-mail', 'Dashboard de orçamentos enviados'] },
  cardapio:   { instrucoes: ['Cardápio digital com QR Code', 'Cliente faz pedido pelo WhatsApp', 'Atualização instantânea de itens e preços'] },
};

export default function ClienteAcessoPage() {
  const { ferramenta, revendedor, cliente } = useParams<{ ferramenta: string; revendedor: string; cliente: string }>();
  const ferram = getFerramenta(ferramenta);

  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [autenticado, setAutenticado] = useState(false);
  const [nomeNegocio, setNomeNegocio] = useState('');
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem(`acesso_${ferramenta}_${revendedor}_${cliente}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      setNomeNegocio(parsed.nomeNegocio || '');
      setAutenticado(true);
    }
    setChecking(false);
  }, [ferramenta, revendedor, cliente]);

  async function handleEntrar(e: React.FormEvent) {
    e.preventDefault();
    if (pin.length < 4) return;
    setLoading(true);
    setErro('');
    const res = await fetch('/api/acesso', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ferramenta, revendedorSlug: revendedor, clienteSlug: cliente, senha: pin }),
    });
    const data = await res.json();
    if (res.ok && data.ok) {
      sessionStorage.setItem(`acesso_${ferramenta}_${revendedor}_${cliente}`, JSON.stringify({ token: data.token, nomeNegocio: data.nomeNegocio }));
      setNomeNegocio(data.nomeNegocio || '');
      setAutenticado(true);
    } else {
      setErro('Senha incorreta. Verifique com quem lhe enviou o link.');
    }
    setLoading(false);
  }

  function handleLogout() {
    sessionStorage.removeItem(`acesso_${ferramenta}_${revendedor}_${cliente}`);
    setAutenticado(false);
    setPin('');
  }

  if (!ferram) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#07080b', color: '#8394b0', fontFamily: 'Outfit, sans-serif' }}>
      Ferramenta não encontrada.
    </div>
  );

  if (checking) return null;

  if (autenticado) return <FerramentaApp ferram={ferram} nomeNegocio={nomeNegocio} onLogout={handleLogout} />;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#07080b', fontFamily: 'Outfit, sans-serif', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 400 }}>

        {/* Logo da ferramenta */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 52, marginBottom: 12 }}>{ferram.emoji}</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: '#eef2f9', marginBottom: 6 }}>{ferram.nome}</div>
          <div style={{ color: '#8394b0', fontSize: 14 }}>{ferram.desc}</div>
        </div>

        {/* Card de login */}
        <div style={{ background: '#111820', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '28px 24px' }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: '#eef2f9', marginBottom: 6 }}>Acessar minha conta</div>
          <div style={{ color: '#8394b0', fontSize: 13, marginBottom: 24 }}>Digite a senha de 4 dígitos que você recebeu</div>

          <form onSubmit={handleEntrar} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <input
              type="password"
              inputMode="numeric"
              pattern="[0-9]{4}"
              maxLength={4}
              value={pin}
              onChange={e => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="••••"
              required
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${erro ? '#ef4444' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 12,
                padding: '14px',
                color: '#eef2f9',
                fontSize: 28,
                fontWeight: 900,
                letterSpacing: 12,
                textAlign: 'center',
                boxSizing: 'border-box',
                outline: 'none',
              }}
            />
            {erro && <div style={{ color: '#ef4444', fontSize: 13, textAlign: 'center' }}>{erro}</div>}
            <button
              type="submit"
              disabled={loading || pin.length < 4}
              style={{
                background: pin.length === 4 ? `linear-gradient(135deg, ${ferram.cor}, ${ferram.cor}bb)` : 'rgba(255,255,255,0.06)',
                color: pin.length === 4 ? '#fff' : '#4e5c72',
                border: 'none',
                borderRadius: 12,
                padding: '13px',
                fontWeight: 700,
                fontSize: 15,
                cursor: loading || pin.length < 4 ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {loading ? 'Verificando...' : 'Entrar →'}
            </button>
          </form>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, color: '#4e5c72', fontSize: 12 }}>
          Não tem a senha? Peça para quem lhe enviou esse link.
        </div>
      </div>
    </div>
  );
}

function FerramentaApp({ ferram, nomeNegocio, onLogout }: {
  ferram: { id: string; nome: string; emoji: string; desc: string; cor: string };
  nomeNegocio: string;
  onLogout: () => void;
}) {
  const info = TOOLS_LABELS[ferram.id];

  return (
    <div style={{ minHeight: '100vh', background: '#07080b', fontFamily: 'Outfit, sans-serif' }}>
      {/* Header */}
      <div style={{ background: 'rgba(7,8,11,0.95)', borderBottom: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 58 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 20 }}>{ferram.emoji}</span>
            <span style={{ fontWeight: 800, fontSize: 16, color: '#eef2f9' }}>{ferram.nome}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: '#8394b0', fontSize: 13 }}>{nomeNegocio}</span>
            <button onClick={onLogout} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: '#8394b0', borderRadius: 8, padding: '5px 12px', fontSize: 12, cursor: 'pointer' }}>Sair</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '48px 20px' }}>
        {/* Boas-vindas */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>{ferram.emoji}</div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: '#eef2f9', marginBottom: 10 }}>
            Bem-vindo ao {ferram.nome}
          </h1>
          <p style={{ color: '#8394b0', fontSize: 15, lineHeight: 1.6 }}>
            {ferram.desc}
          </p>
        </div>

        {/* O que essa ferramenta faz */}
        <div style={{ background: '#111820', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, padding: '24px', marginBottom: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#eef2f9', marginBottom: 16 }}>O que você tem acesso</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {info?.instrucoes.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#8394b0' }}>
                <span style={{ color: ferram.cor, flexShrink: 0, marginTop: 1 }}>✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status */}
        <div style={{ background: `${ferram.cor}10`, border: `1px solid ${ferram.cor}30`, borderRadius: 16, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#16c784', flexShrink: 0, boxShadow: '0 0 8px #16c78470' }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#eef2f9', marginBottom: 3 }}>Sistema ativo</div>
            <div style={{ color: '#8394b0', fontSize: 13 }}>Sua ferramenta está configurada e funcionando. Em breve você verá o painel completo aqui.</div>
          </div>
        </div>

        {/* Suporte */}
        <div style={{ textAlign: 'center', marginTop: 40, color: '#4e5c72', fontSize: 13 }}>
          Precisa de ajuda? Fale com quem lhe deu acesso a essa ferramenta.
        </div>
      </div>
    </div>
  );
}
