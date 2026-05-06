export const FERRAMENTAS = [
  { id: 'chatbot',    nome: 'ZaproPro',       emoji: '🤖', desc: 'Chatbot WhatsApp 24h para atendimento automático',       cor: '#6366f1' },
  { id: 'agenda',     nome: 'ZapAgenda',      emoji: '📅', desc: 'Agendamento online pelo WhatsApp — cliente escolhe',     cor: '#ec4899' },
  { id: 'crm',        nome: 'ZapCRM',         emoji: '📊', desc: 'CRM com disparo de mensagens segmentadas via WhatsApp',  cor: '#14b8a6' },
  { id: 'cobranca',   nome: 'ZapCobrança',    emoji: '💰', desc: 'Cobranças automáticas no dia certo, sem esquecer',       cor: '#8b5cf6' },
  { id: 'fideliza',   nome: 'ZapFideliza',    emoji: '🎁', desc: 'IA que lembra dos clientes e manda mensagem na hora',    cor: '#a855f7' },
  { id: 'fidelidade', nome: 'ZapFidelidade',  emoji: '🏆', desc: 'Cartão de selos digital para fidelizar clientes',        cor: '#f59e0b' },
  { id: 'orcamento',  nome: 'ZapOrçamento',   emoji: '📋', desc: 'Formulário de orçamento com envio automático',           cor: '#3b82f6' },
  { id: 'cardapio',   nome: 'ZapCardápio',    emoji: '🍽️', desc: 'Cardápio digital com QR code e pedido pelo WhatsApp',   cor: '#10b981' },
] as const;

export type FerramId = typeof FERRAMENTAS[number]['id'];

export function getFerramenta(id: string) {
  return FERRAMENTAS.find(f => f.id === id);
}
