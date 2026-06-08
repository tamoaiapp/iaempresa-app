"use client";
import Image from "next/image";
import { useState } from "react";

/* ── Feature flags pra esconder seções sem material real ────────────────── */
const HAS_TESTIMONIALS = false; // ativar quando tiver 4+ depoimentos reais
const HAS_FOUNDER_PHOTO = false; // ativar quando tiver foto + CNPJ

/* ── Conteúdo ────────────────────────────────────────────────────────────── */
const features = [
  {
    platform: "youtube",
    color: "#eef2f9",
    bg: "rgba(255,255,255,0.04)",
    border: "rgba(255,255,255,0.1)",
    logo: (
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect width="28" height="28" rx="7" fill="#FF0000" />
          <path d="M21.5 9.5s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.4 6.4 14 6.4 14 6.4s-2.4 0-4.7.2c-.4.1-1.2.1-2 .9-.6.6-.8 2-.8 2S6.3 11.1 6.3 12.6v1.4c0 1.5.2 3 .2 3s.2 1.4.8 2c.8.8 1.8.7 2.3.8C11 20 14 20 14 20s2.4 0 4.7-.2c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.5.2-3v-1.4c0-1.5-.2-3-.2-3zm-8.8 6v-5.2l5.4 2.6-5.4 2.6z" fill="white" />
        </svg>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect width="28" height="28" rx="7" fill="url(#ig2)" />
          <defs>
            <linearGradient id="ig2" x1="0" y1="28" x2="28" y2="0">
              <stop stopColor="#f9a825" /><stop offset="0.4" stopColor="#e1306c" /><stop offset="1" stopColor="#833ab4" />
            </linearGradient>
          </defs>
          <rect x="7" y="7" width="14" height="14" rx="4" stroke="white" strokeWidth="1.8" fill="none" />
          <circle cx="14" cy="14" r="3.5" stroke="white" strokeWidth="1.8" fill="none" />
          <circle cx="18.2" cy="9.8" r="1" fill="white" />
        </svg>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect width="28" height="28" rx="7" fill="#010101" />
          <path d="M19.5 7h-2.8v9.4a2.4 2.4 0 0 1-2.4 2.3 2.4 2.4 0 0 1-2.4-2.3 2.4 2.4 0 0 1 2.4-2.3c.2 0 .5 0 .7.1V11a5.2 5.2 0 0 0-.7 0 5.2 5.2 0 0 0-5.2 5.2 5.2 5.2 0 0 0 5.2 5.2 5.2 5.2 0 0 0 5.2-5.2V11.3a7 7 0 0 0 4 1.2V9.7a4.2 4.2 0 0 1-4-2.7z" fill="white" />
        </svg>
        <span style={{ fontSize: "0.78rem", color: "#8394b0", marginLeft: 2 }}>+ qualquer fonte</span>
      </div>
    ),
    title: "Baixa vídeos do YouTube, Instagram e TikTok",
    desc: "Cole o link do canal, perfil ou vídeo — de qualquer plataforma. O PostMaster baixa, converte para 9:16 e posta sozinho. Roda 24h.",
  },
  {
    platform: "youtube_post",
    color: "#ff4242",
    bg: "rgba(255,0,0,0.06)",
    border: "rgba(255,0,0,0.22)",
    logo: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="7" fill="#FF0000" />
        <path d="M21.5 9.5s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.4 6.4 14 6.4 14 6.4s-2.4 0-4.7.2c-.4.1-1.2.1-2 .9-.6.6-.8 2-.8 2S6.3 11.1 6.3 12.6v1.4c0 1.5.2 3 .2 3s.2 1.4.8 2c.8.8 1.8.7 2.3.8C11 20 14 20 14 20s2.4 0 4.7-.2c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.5.2-3v-1.4c0-1.5-.2-3-.2-3zm-8.8 6v-5.2l5.4 2.6-5.4 2.6z" fill="white" />
      </svg>
    ),
    title: "Posta no YouTube com SEO automatizado",
    desc: "Upload via Chrome real (sem API que dá ban), título/descrição/tags geradas por IA local, formato 16:9 1080p — pronto pra monetizar.",
  },
  {
    platform: "dub",
    color: "#ff8c42",
    bg: "rgba(255,140,66,0.07)",
    border: "rgba(255,140,66,0.22)",
    logo: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="7" fill="rgba(255,140,66,0.18)" />
        <path d="M9 11v6M12 9v10M15 12v4M18 10v8M21 13v2" stroke="#ff8c42" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Dublagem e narração 100% local",
    desc: "Whisper transcreve, Qwen traduz, Piper TTS (Faber ou Cadu BR). Vídeo gringo vira PT-BR ou vídeo seu ganha voz de IA — sem custo de API.",
  },
  {
    platform: "dense",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.07)",
    border: "rgba(167,139,250,0.22)",
    logo: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="7" fill="rgba(167,139,250,0.18)" />
        <path d="M7 8h14M7 12h10M7 16h13M7 20h7" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Corte inteligente de podcast 1h → 10min",
    desc: "IA lê a transcrição inteira e seleciona os trechos mais densos — gera um vídeo de 8-16min ideal pra monetização YouTube.",
  },
  {
    platform: "instagram",
    color: "#e1306c",
    bg: "rgba(225,48,108,0.08)",
    border: "rgba(225,48,108,0.2)",
    logo: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="7" fill="url(#ig)" />
        <defs>
          <linearGradient id="ig" x1="0" y1="28" x2="28" y2="0">
            <stop stopColor="#f9a825" /><stop offset="0.4" stopColor="#e1306c" /><stop offset="1" stopColor="#833ab4" />
          </linearGradient>
        </defs>
        <rect x="7" y="7" width="14" height="14" rx="4" stroke="white" strokeWidth="1.8" fill="none" />
        <circle cx="14" cy="14" r="3.5" stroke="white" strokeWidth="1.8" fill="none" />
        <circle cx="18.2" cy="9.8" r="1" fill="white" />
      </svg>
    ),
    title: "Posta Reels no Instagram sozinho",
    desc: "Conecta sua conta uma vez. O app abre, faz o upload, coloca a legenda e publica — tudo headless, sem abrir tela.",
  },
  {
    platform: "tiktok",
    color: "#00f2ea",
    bg: "rgba(0,242,234,0.06)",
    border: "rgba(0,242,234,0.2)",
    logo: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="7" fill="#010101" />
        <path d="M19.5 7h-2.8v9.4a2.4 2.4 0 0 1-2.4 2.3 2.4 2.4 0 0 1-2.4-2.3 2.4 2.4 0 0 1 2.4-2.3c.2 0 .5 0 .7.1V11a5.2 5.2 0 0 0-.7 0 5.2 5.2 0 0 0-5.2 5.2 5.2 5.2 0 0 0 5.2 5.2 5.2 5.2 0 0 0 5.2-5.2V11.3a7 7 0 0 0 4 1.2V9.7a4.2 4.2 0 0 1-4-2.7z" fill="white" />
      </svg>
    ),
    title: "Posta no TikTok em múltiplas contas",
    desc: "Várias contas TikTok em paralelo, cada uma com seu canal e ritmo. Ele faz o upload e publica com legenda gerada por IA.",
  },
  {
    platform: "ia",
    color: "#a855f7",
    bg: "rgba(168,85,247,0.08)",
    border: "rgba(168,85,247,0.2)",
    logo: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="7" fill="url(#ia)" />
        <defs><linearGradient id="ia" x1="0" y1="0" x2="28" y2="28"><stop stopColor="#6366f1" /><stop offset="1" stopColor="#a855f7" /></linearGradient></defs>
        <text x="6" y="20" fontSize="14" fontWeight="800" fill="white" fontFamily="monospace">IA</text>
      </svg>
    ),
    title: "Legenda com IA embutida — sem pagar API",
    desc: "IA local gera legenda com hashtags para cada vídeo. Sem ChatGPT, sem mensalidade, sem limite. Funciona offline.",
  },
  {
    platform: "schedule",
    color: "#16c784",
    bg: "rgba(22,199,132,0.08)",
    border: "rgba(22,199,132,0.2)",
    logo: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="7" fill="rgba(22,199,132,0.15)" />
        <circle cx="14" cy="14" r="7" stroke="#16c784" strokeWidth="2" fill="none" />
        <path d="M14 9v5l3 3" stroke="#16c784" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Posta no horário certo, todo dia",
    desc: "Defina uma janela (ex: 08h–22h) ou intervalo fixo. Ele posta na hora certa todos os dias — você não precisa fazer nada.",
  },
  {
    platform: "filter",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.2)",
    logo: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="7" fill="rgba(245,158,11,0.15)" />
        <path d="M7 9h14M10 14h8M13 19h2" stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
    title: "Filtra e nunca repete o mesmo vídeo",
    desc: "Duração mínima/máxima, palavras bloqueadas, pula vídeos já postados. Só sai conteúdo que você aprovaria.",
  },
];

const steps = [
  { n: "1", title: "Instala em 2 minutos", desc: "Baixa, instala no Windows e abre. Sem configuração técnica. Funciona em qualquer PC ou notebook." },
  { n: "2", title: "Conecta sua(s) conta(s)", desc: "Entra no YouTube, Instagram ou TikTok normalmente pela janela de login. Sessão fica salva — não precisa entrar de novo." },
  { n: "3", title: "Escolhe a estratégia", desc: "Repostar canal, traduzir vídeo gringo, narrar com IA, viralizar TikTok, crescer Instagram — escolhe o fluxo e cola a fonte (canal ou link de vídeo direto)." },
  { n: "4", title: "Clica em Iniciar e esquece", desc: "O PostMaster roda em segundo plano e posta sozinho. Você pode fechar a janela — ele continua." },
];

const painPoints = [
  {
    title: "1 hora por dia editando Reel",
    desc: "Baixar vídeo, cortar pra 9:16, escrever legenda, escolher hashtag, agendar. Todo santo dia.",
  },
  {
    title: "Esquece de postar, perde o ritmo",
    desc: "Algoritmo cai. Quando você lembra, a janela do horário bom já passou. Engagement despenca.",
  },
  {
    title: "Concorrente posta 5x ao dia",
    desc: "Você posta 2x na semana porque dá trabalho. Ele cresce em volume — não em talento. Em qualidade.",
  },
  {
    title: "Ferramenta com mensalidade pesada",
    desc: "Outras ferramentas cobram R$80 a R$200 por mês. Em 1 ano você gasta o preço de 10 PostMasters.",
  },
];

/* ── 3 caminhos pra ganhar dinheiro ── */
const moneyTracks = [
  {
    key: "youtube",
    accent: "#ff0000",
    bg: "rgba(255,0,0,0.06)",
    border: "rgba(255,0,0,0.22)",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect width="36" height="36" rx="9" fill="#FF0000" />
        <path d="M27.5 12.5s-.25-1.8-1-2.55c-1-1-2-1-2.5-1.05C20 8.6 18 8.6 18 8.6s-3 0-5.7.25c-.55.05-1.5.05-2.5 1.05-.75.75-1 2.55-1 2.55S8.5 14.4 8.5 16.2v1.6c0 1.8.3 3.7.3 3.7s.25 1.8 1 2.55c1 1 2.3.95 2.95 1.05C14.5 25.5 18 25.5 18 25.5s3 0 5.7-.25c.55-.05 1.5-.05 2.5-1.05.75-.75 1-2.55 1-2.55s.3-1.9.3-3.7v-1.6c0-1.8-.3-3.7-.3-3.7zm-11.2 7.7v-6.5l6.6 3.25-6.6 3.25z" fill="white" />
      </svg>
    ),
    label: "YouTube",
    headline: "Monetize com o Programa de Parcerias",
    desc: "Vídeo longo (8-16min) é o conteúdo que mais paga no YouTube. PostMaster monta sua biblioteca em escala — sem você editar nada.",
    bullets: [
      { t: "Reposta vídeos de canais grandes", d: "Cole o link do canal, ele baixa, re-edita 16:9 com sua marca d'água e publica no seu canal." },
      { t: "Corta podcast em vídeo de 10min", d: "Pega um podcast longo do YouTube, separa os melhores trechos (corte denso por IA) e gera um vídeo pronto pra monetizar." },
      { t: "Traduz vídeo gringo pra PT-BR", d: "Whisper + Qwen + Piper (tudo local). Pega vídeo em inglês/espanhol, gera dublagem PT-BR e publica — vídeo gringo viral fica disponível pro brasileiro." },
      { t: "Narração com IA do seu roteiro", d: "Vídeo já em PT-BR? Substitui sua voz por voz de IA profissional (Faber ou Cadu). Útil pra quem não quer aparecer/falar." },
    ],
  },
  {
    key: "tiktok",
    accent: "#00f2ea",
    bg: "rgba(0,242,234,0.05)",
    border: "rgba(0,242,234,0.22)",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect width="36" height="36" rx="9" fill="#010101" />
        <path d="M25 9h-3.6v12a3.1 3.1 0 0 1-3.1 3 3.1 3.1 0 0 1-3.1-3 3.1 3.1 0 0 1 3.1-3c.3 0 .65 0 .9.1V14a6.7 6.7 0 0 0-.9 0 6.7 6.7 0 0 0-6.7 6.7 6.7 6.7 0 0 0 6.7 6.7 6.7 6.7 0 0 0 6.7-6.7v-6.3a9 9 0 0 0 5.1 1.55v-3.6a5.4 5.4 0 0 1-5.1-3.45z" fill="white" />
      </svg>
    ),
    label: "TikTok",
    headline: "Crie viral todo dia + monetize de 3 jeitos",
    desc: "TikTok recompensa volume + retenção. PostMaster posta 3-6 cortes virais por dia com legenda dinâmica — fluxo de receita em 3 frentes.",
    bullets: [
      { t: "Vídeo viral em formato dinâmico", d: "Auto-edit IA estilo TikTok: face track, corte de silêncio, karaokê das legendas, hashtag por IA. Tudo automático." },
      { t: "Monetiza com Creator Rewards", d: "Vídeos longos (≥60s) com alto retention pagam via TikTok Creator Rewards. PostMaster mantém o ritmo de upload diário sem você lembrar." },
      { t: "Vende seu produto na bio", d: "Bio com link da sua loja, infoproduto ou serviço. Cada Reel que viraliza puxa tráfego direto pro link." },
      { t: "Ganha seguidor pra vender depois", d: "Volume de posts = mais alcance = perfil grande. Perfil grande = autoridade pra qualquer venda que você quiser fazer." },
    ],
  },
  {
    key: "instagram",
    accent: "#e1306c",
    bg: "rgba(225,48,108,0.06)",
    border: "rgba(225,48,108,0.22)",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect width="36" height="36" rx="9" fill="url(#igmoney)" />
        <defs>
          <linearGradient id="igmoney" x1="0" y1="36" x2="36" y2="0">
            <stop stopColor="#f9a825" /><stop offset="0.4" stopColor="#e1306c" /><stop offset="1" stopColor="#833ab4" />
          </linearGradient>
        </defs>
        <rect x="9" y="9" width="18" height="18" rx="5" stroke="white" strokeWidth="2.2" fill="none" />
        <circle cx="18" cy="18" r="4.5" stroke="white" strokeWidth="2.2" fill="none" />
        <circle cx="23.4" cy="12.6" r="1.3" fill="white" />
      </svg>
    ),
    label: "Instagram",
    headline: "Cresce o perfil pra vender o que você quiser",
    desc: "No Instagram não tem monetização direta forte — o jogo é VENDA. PostMaster faz o trabalho duro de crescer o perfil pra você vender com autoridade.",
    bullets: [
      { t: "Reels diários sem você grudar no celular", d: "Posta 3-6 Reels por dia com legenda IA, hashtag e horário de pico. Alcance orgânico que precisa de volume." },
      { t: "Cresce até virar perfil de autoridade", d: "Perfil de 1k não vende. Perfil de 50k vende qualquer coisa que você colocar na bio. Volume + tempo = autoridade." },
      { t: "Vende produto/serviço na bio", d: "Loja, infoproduto, consultoria, link de afiliado. Cada Reel viral entrega tráfego direto pra sua oferta." },
      { t: "Múltiplas contas em paralelo", d: "Roda 1 conta por nicho (fitness, finanças, receita, etc) em paralelo. Diversifica fontes de tráfego sem custo extra." },
    ],
  },
];

const comparison = [
  ["Tempo por post", "1h–1h30 (baixar, cortar, legenda, agendar)", "0 minuto — automático"],
  ["Posts por mês", "2 a 8 (quando lembra)", "Até 180 (6 por dia, 30 dias)"],
  ["Custo da IA de legenda", "R$30–R$80/mês (ChatGPT API)", "R$ 0 — embutida"],
  ["Mensalidade da ferramenta", "R$80–R$200/mês", "Pagamento único"],
  ["Funciona enquanto você dorme", "Não", "Sim — 24h"],
  ["Múltiplas contas em paralelo", "Não (ou muito caro)", "Ilimitadas"],
];

const faqs = [
  {
    q: "Como eu ganho dinheiro com o PostMaster?",
    a: "São 3 caminhos: (1) YouTube — vídeos de 8-16min monetizam via Programa de Parcerias; o PostMaster reposta vídeos, corta podcasts longos, traduz vídeos gringos e narra com IA. (2) TikTok — vídeos virais (≥60s com bom retention) pagam via Creator Rewards, e a bio gera tráfego pra produto/serviço. (3) Instagram — perfil grande vende qualquer coisa que estiver na bio (loja, infoproduto, afiliado). Você escolhe a estratégia, o PostMaster executa em escala todo dia.",
  },
  {
    q: "Minha conta pode ser banida?",
    a: "O PostMaster posta como humano — sessão real de navegador, intervalos naturais, sem APIs não oficiais (que são o que a Meta detecta e bane). É o mesmo comportamento de quem abre o Instagram no PC e posta manualmente. Recomendamos começar com intervalo de 2h+ entre posts nos primeiros dias para criar histórico. Clientes têm contas rodando há meses sem problema seguindo essa prática.",
  },
  {
    q: "É legal? Vai contra os termos do Instagram/TikTok?",
    a: "Você está usando seu próprio computador, com sua própria sessão logada, postando seu conteúdo (ou conteúdo onde você tem permissão de uso). O PostMaster não usa API privada da Meta nem do TikTok — é navegação automatizada do que você faria manualmente. Não inventa interação, não compra seguidor, não dá like falso. É automação de rotina sua.",
  },
  {
    q: "Funciona no Mac ou Linux?",
    a: "Por enquanto apenas Windows 10 e 11. Versão Mac está no roadmap mas sem data confirmada. Se você usa Mac, considere instalar em qualquer PC velho que tenha em casa — o PostMaster roda em hardware modesto.",
  },
  {
    q: "E os vídeos postados — ranqueiam bem?",
    a: "Sim. O PostMaster posta como qualquer Reel/TikTok normal — com legenda, hashtag e horário de pico. Quem ranqueia é o algoritmo, e ele olha o conteúdo, não a forma como foi postado. Se o vídeo é bom (gancho forte, retenção), ele ranqueia igual ao postado manualmente.",
  },
  {
    q: "Preciso deixar o PC ligado?",
    a: "Sim, o PC precisa estar ligado e com internet para baixar e postar. Mas não precisa ser potente — qualquer notebook serve. Muitos clientes deixam um notebook velho ligado 24h só rodando o app.",
  },
  {
    q: "A IA de legenda é paga?",
    a: "Não. A IA vem embutida no app — sem Ollama, sem ChatGPT, sem custo extra. Gera legendas ilimitadas, com hashtags, sem mensalidade.",
  },
  {
    q: "Posso usar em várias contas ao mesmo tempo?",
    a: "Sim. Crie uma automação para cada conta — pode ser 1, pode ser 20. Cada uma roda em paralelo, com seu próprio canal-fonte, ritmo e horário. Sem limite por conta.",
  },
  {
    q: "E se não funcionar para mim?",
    a: "7 dias de garantia total. Se não gostar por qualquer motivo, manda um e-mail e devolvo 100% do valor. Sem burocracia, sem perguntar por quê.",
  },
  {
    q: "Como recebo o app depois de comprar?",
    a: "Após o pagamento aprovado (Pix em ~30 segundos, cartão em ~5 minutos), você recebe um e-mail com o link de download direto e instruções. O instalador é Windows EXE — você baixa, executa e instala em 2 minutos.",
  },
  {
    q: "Recebo atualizações novas?",
    a: "Sim — o PostMaster atualiza sozinho via auto-updater. Você sempre fica na versão mais nova sem precisar baixar de novo. Por 1 ano após a compra, todas as atualizações de funcionalidade entram automaticamente.",
  },
  {
    q: "Qual hardware mínimo?",
    a: "Windows 10 ou 11, 4 GB de RAM, 5 GB de espaço em disco. Praticamente qualquer notebook dos últimos 8 anos roda tranquilo. Não precisa de placa de vídeo.",
  },
  {
    q: "Funciona pra perfil profissional/criador? Ou só pessoal?",
    a: "Funciona pra qualquer tipo de conta — pessoal, criador, profissional, business. A diferença não está na conta, está em como você configura: quem é criador costuma postar mais cortes do próprio canal de YouTube, quem é loja costuma fazer Reels de produto, e quem é dark-page faz curadoria de canal alheio.",
  },
];

const BTN = {
  background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
  color: "#fff", borderRadius: 14, fontWeight: 800,
  border: "none", cursor: "pointer",
  boxShadow: "0 4px 32px rgba(99,102,241,0.45)",
};

const BTN_GHOST = {
  background: "rgba(255,255,255,0.05)",
  color: "#eef2f9", borderRadius: 14, fontWeight: 700,
  border: "1px solid rgba(255,255,255,0.12)", cursor: "pointer",
};

async function handleCheckout(setLoading: (v: boolean) => void) {
  setLoading(true);
  try {
    const res = await fetch("/api/checkout/postmaster", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else alert("Erro ao iniciar pagamento. Tente novamente.");
  } catch {
    alert("Erro ao conectar. Tente novamente.");
  } finally {
    setLoading(false);
  }
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: "var(--card)", border: "1px solid var(--line)", borderRadius: 14,
      overflow: "hidden", transition: "border-color 0.2s",
      borderColor: open ? "rgba(99,102,241,0.4)" : "var(--line)",
    }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%", textAlign: "left", background: "none", border: "none",
          padding: "1.1rem 1.5rem", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem",
          color: "#eef2f9", fontSize: "0.975rem", fontWeight: 700, fontFamily: "inherit",
        }}>
        <span>{q}</span>
        <span style={{
          flexShrink: 0, width: 24, height: 24, borderRadius: "50%",
          background: open ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.05)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "transform 0.25s, background 0.2s",
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          color: open ? "#a78bfa" : "#8394b0", fontSize: "1.1rem", lineHeight: 1,
        }}>+</span>
      </button>
      <div style={{
        maxHeight: open ? 400 : 0, overflow: "hidden", transition: "max-height 0.3s ease",
      }}>
        <div style={{ padding: "0 1.5rem 1.25rem", color: "#8394b0", fontSize: "0.92rem", lineHeight: 1.65 }}>{a}</div>
      </div>
    </div>
  );
}

// RevealSection: agora um simples wrapper que sempre renderiza visivel.
// Anteriormente fazia scroll reveal com IntersectionObserver, mas isso escondia
// a pagina inteira quando o observer nao disparava (SSR/Playwright/JS lento).
// Conteudo > animacao. Se quiser animar de volta, fazer com CSS only que
// termina visivel (animation-fill-mode: forwards).
function RevealSection({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={style}>{children}</div>;
}

export default function PostmasterPage() {
  const [loading, setLoading] = useState(false);
  const buy = () => handleCheckout(setLoading);

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", fontFamily: "'Outfit', sans-serif", minHeight: "100vh" }}>

      {/* ── Nav ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(7,8,11,0.93)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "0 1.5rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 58,
      }}>
        <a href="/postmaster" style={{ textDecoration: "none", fontWeight: 800, fontSize: "1.05rem", color: "#eef2f9", display: "inline-flex", alignItems: "center", gap: "0.45rem" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 28, height: 28, borderRadius: 7,
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            color: "#fff", fontWeight: 900, fontSize: "0.85rem", letterSpacing: "-0.02em",
          }}>PM</span>
          Post<span style={{ color: "#8b5cf6" }}>Master</span>
        </a>
        <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
          <button onClick={buy} disabled={loading} style={{
            ...BTN, padding: "0.45rem 1.25rem", fontSize: "0.875rem",
            cursor: loading ? "wait" : "pointer",
          }}>
            {loading ? "..." : "Quero agora — R$ 197"}
          </button>
        </div>
      </nav>

      {/* ── Faixa de urgência honesta — copy real ── */}
      <div style={{
        background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
        textAlign: "center", padding: "0.55rem 1rem",
        fontSize: "0.85rem", fontWeight: 600, color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap",
      }}>
        <span>🚀 Oferta de lançamento — <strong>R$ 197</strong> à vista (depois sobe pra R$ 297)</span>
      </div>

      {/* ── Hero ── */}
      <section style={{ background: "linear-gradient(180deg,#0a0b14 0%,var(--bg) 100%)", padding: "4.5rem 1.5rem 4rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          <h1 style={{
            textAlign: "center",
            fontSize: "clamp(2.4rem,5vw,4.2rem)",
            fontWeight: 900, lineHeight: 1.07, marginBottom: "1.1rem",
          }}>
            Ganhe dinheiro no{" "}
            <span style={{ color: "#ff4242" }}>YouTube</span>,{" "}
            <span style={{ color: "#69c9d0" }}>TikTok</span> e{" "}
            <span style={{ background: "linear-gradient(135deg,#f58529,#dd2a7b,#8134af)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Instagram
            </span>
            <br />com piloto automático
          </h1>

          <p style={{ textAlign: "center", fontSize: "1.1rem", color: "#8394b0", lineHeight: 1.7, maxWidth: 680, margin: "0 auto 2rem" }}>
            Monetização do YouTube, ads do TikTok, venda na bio do Instagram. PostMaster posta sozinho com IA local — você foca em escalar o que dá lucro, não em editar Reel.
          </p>

          {/* CTA principal — direto pra compra */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", marginBottom: "1.75rem" }}>
            <button onClick={buy} disabled={loading} style={{
              ...BTN, padding: "1.1rem 2.5rem", fontSize: "1.1rem",
              cursor: loading ? "wait" : "pointer", opacity: loading ? 0.7 : 1,
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
            }}>
              {loading ? "Redirecionando..." : "🚀 Quero automatizar — R$ 197"}
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", fontSize: "0.82rem", color: "#4e5c72", flexWrap: "wrap", justifyContent: "center" }}>
              <span>🔒 7 dias de garantia total</span>
              <span>·</span>
              <span>Pagamento único, sem mensalidade</span>
              <span>·</span>
              <a href="#como-funciona" style={{ color: "#8394b0", textDecoration: "none" }}>Ver como funciona ↓</a>
            </div>
          </div>

          {/* Trust badges */}
          <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "3.5rem" }}>
            {["Sem mensalidade", "IA grátis ilimitada", "YouTube + Instagram + TikTok", "Posts ilimitados", "Múltiplas contas"].map(t => (
              <span key={t} style={{ color: "#8394b0", fontSize: "0.82rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <span style={{ color: "#16c784" }}>✓</span> {t}
              </span>
            ))}
          </div>

          {/* Screenshot do app — sem stats inventados */}
          <div style={{ position: "relative" }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at 50% 0%,rgba(99,102,241,0.3) 0%,transparent 65%)",
              borderRadius: 20, pointerEvents: "none",
            }} />
            <div style={{
              background: "#161b27", border: "1px solid rgba(255,255,255,0.07)",
              borderBottom: "none", borderRadius: "16px 16px 0 0",
              padding: "0.55rem 1rem", display: "flex", alignItems: "center", gap: "0.5rem",
            }}>
              {["#ff5f57", "#febc2e", "#28c840"].map(c => (
                <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, display: "inline-block" }} />
              ))}
              <span style={{ flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: 6, padding: "0.18rem 0.75rem", fontSize: "0.74rem", color: "#4e5c72", marginLeft: "0.5rem" }}>
                PostMaster — dashboard
              </span>
            </div>
            <div style={{ border: "1px solid rgba(99,102,241,0.18)", borderTop: "none", borderRadius: "0 0 16px 16px", overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.6)", position: "relative" }}>
              <Image src="/postmaster-app.png" alt="PostMaster — dashboard" width={1100} height={580} style={{ display: "block", width: "100%", height: "auto" }} priority />

              {/* Live Activity overlay — mostra app trabalhando.
                  Eh CSS puro, sem JS, com animacao staggered nas linhas
                  pra criar sensacao de "logs chegando ao vivo". */}
              <style>{`
                @keyframes pm-pulse-dot {
                  0%, 100% { opacity: 1; transform: scale(1); }
                  50% { opacity: 0.55; transform: scale(0.85); }
                }
                @keyframes pm-log-fade {
                  0%, 18% { opacity: 0; transform: translateX(-4px); }
                  22%, 90% { opacity: 1; transform: translateX(0); }
                  100% { opacity: 0.4; transform: translateX(0); }
                }
                @keyframes pm-bar-progress {
                  0% { width: 0%; }
                  90%, 100% { width: 100%; }
                }
                .pm-live-dot { animation: pm-pulse-dot 1.4s ease-in-out infinite; }
                .pm-live-log { animation: pm-log-fade 6s ease-out infinite; opacity: 0; }
                .pm-live-log:nth-child(1) { animation-delay: 0s; }
                .pm-live-log:nth-child(2) { animation-delay: 1.5s; }
                .pm-live-log:nth-child(3) { animation-delay: 3s; }
                .pm-live-log:nth-child(4) { animation-delay: 4.5s; }
                .pm-live-bar { animation: pm-bar-progress 6s ease-out infinite; }
                @media (prefers-reduced-motion: reduce) {
                  .pm-live-dot, .pm-live-log, .pm-live-bar { animation: none !important; opacity: 1 !important; }
                }
                @media (max-width: 720px) {
                  .pm-live-overlay { display: none !important; }
                }
              `}</style>
              <div className="pm-live-overlay" style={{
                position: "absolute", bottom: 16, right: 16,
                background: "rgba(10,12,18,0.96)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(22,199,132,0.3)",
                borderRadius: 12,
                padding: "0.85rem 1rem",
                width: 280,
                boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.6rem", paddingBottom: "0.55rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <span className="pm-live-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: "#16c784", display: "inline-block", boxShadow: "0 0 8px rgba(22,199,132,0.7)" }} />
                  <span style={{ fontSize: "0.7rem", color: "#16c784", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Live activity</span>
                  <span style={{ marginLeft: "auto", fontSize: "0.65rem", color: "#4e5c72" }}>@rique_cortes</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.42rem", fontSize: "0.7rem", lineHeight: 1.45 }}>
                  <div className="pm-live-log" style={{ color: "#8394b0" }}>
                    <span style={{ color: "#4e5c72" }}>10:32 </span><span style={{ color: "#a78bfa" }}>▶</span> Job iniciado
                  </div>
                  <div className="pm-live-log" style={{ color: "#8394b0" }}>
                    <span style={{ color: "#4e5c72" }}>10:32 </span><span style={{ color: "#f59e0b" }}>⬇</span> Baixando vídeo do canal
                  </div>
                  <div className="pm-live-log" style={{ color: "#8394b0" }}>
                    <span style={{ color: "#4e5c72" }}>10:33 </span><span style={{ color: "#69c9d0" }}>✂</span> Cortando 9:16 + legenda IA
                  </div>
                  <div className="pm-live-log" style={{ color: "#c8d6f0", fontWeight: 600 }}>
                    <span style={{ color: "#4e5c72" }}>10:34 </span><span style={{ color: "#16c784" }}>✓</span> Postado no Instagram
                  </div>
                </div>
                <div style={{ marginTop: "0.65rem", paddingTop: "0.55rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.62rem", marginBottom: "0.3rem", color: "#4e5c72" }}>
                    <span>Próximo post</span>
                    <span>em ~6min</span>
                  </div>
                  <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
                    <div className="pm-live-bar" style={{ height: "100%", background: "linear-gradient(90deg,#16c784,#10b981)", width: 0 }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pain Points ── */}
      <RevealSection style={{ padding: "5rem 1.5rem", background: "var(--bg2)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 800, marginBottom: "0.6rem" }}>
            Você reconhece alguma dessas?
          </h2>
          <p style={{ textAlign: "center", color: "#8394b0", marginBottom: "3rem", fontSize: "1rem" }}>
            Se sim, o PostMaster foi feito pra você.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1.1rem" }}>
            {painPoints.map((p) => (
              <div key={p.title} style={{
                background: "var(--card)",
                border: "1px solid rgba(239,68,68,0.18)", borderRadius: 18, padding: "1.5rem",
              }}>
                <div style={{ fontSize: "1.4rem", marginBottom: "0.75rem" }}>😤</div>
                <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.4rem", color: "#eef2f9" }}>{p.title}</h3>
                <p style={{ color: "#8394b0", fontSize: "0.88rem", lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ── 3 caminhos pra ganhar dinheiro (uma seção por plataforma) ── */}
      <RevealSection style={{ padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{
              display: "inline-block", background: "rgba(22,199,132,0.12)",
              border: "1px solid rgba(22,199,132,0.28)", color: "#16c784",
              borderRadius: 20, padding: "0.35rem 1rem", fontSize: "0.78rem",
              fontWeight: 800, marginBottom: "1.25rem", letterSpacing: "0.04em",
            }}>
              💸 3 PLATAFORMAS, 3 CAMINHOS PRA MONETIZAR
            </div>
            <h2 style={{ fontSize: "clamp(1.9rem,4.2vw,2.6rem)", fontWeight: 900, marginBottom: "0.75rem", lineHeight: 1.15 }}>
              Não é sobre postar sozinho.<br />É sobre <span style={{ background: "linear-gradient(135deg,#16c784,#10b981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ganhar dinheiro</span> sozinho.
            </h2>
            <p style={{ color: "#8394b0", fontSize: "1rem", lineHeight: 1.7, maxWidth: 640, margin: "0 auto" }}>
              Cada plataforma paga de um jeito diferente. PostMaster cobre as 3 — você escolhe a estratégia, ele executa.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {moneyTracks.map((t) => (
              <div key={t.key} style={{
                background: t.bg, border: `1px solid ${t.border}`,
                borderRadius: 22, padding: "2rem 1.75rem",
                display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.4fr)",
                gap: "2rem", alignItems: "start",
              }} className="pm-money-row">
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.1rem" }}>
                    {t.icon}
                    <div style={{ fontWeight: 900, fontSize: "1.45rem", color: t.accent, letterSpacing: "-0.01em" }}>{t.label}</div>
                  </div>
                  <h3 style={{ fontWeight: 800, fontSize: "1.25rem", color: "#eef2f9", lineHeight: 1.3, marginBottom: "0.7rem" }}>
                    {t.headline}
                  </h3>
                  <p style={{ color: "#8394b0", fontSize: "0.93rem", lineHeight: 1.7 }}>{t.desc}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                  {t.bullets.map((b) => (
                    <div key={b.t} style={{
                      background: "rgba(255,255,255,0.025)",
                      border: "1px solid rgba(255,255,255,0.05)",
                      borderRadius: 12, padding: "0.9rem 1.05rem",
                      display: "flex", gap: "0.7rem", alignItems: "flex-start",
                    }}>
                      <span style={{ color: t.accent, fontSize: "1rem", fontWeight: 900, lineHeight: 1.45, flexShrink: 0 }}>→</span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "0.92rem", color: "#eef2f9", marginBottom: "0.2rem" }}>{b.t}</div>
                        <div style={{ fontSize: "0.83rem", color: "#8394b0", lineHeight: 1.55 }}>{b.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <style>{`
            @media (max-width: 720px) {
              .pm-money-row { grid-template-columns: 1fr !important; gap: 1.25rem !important; padding: 1.5rem 1.25rem !important; }
            }
          `}</style>
        </div>
      </RevealSection>

      {/* ── Features ── */}
      <RevealSection style={{ padding: "4rem 1.5rem", background: "var(--bg2)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 800, marginBottom: "0.6rem" }}>
            Recursos que tornam isso possível
          </h2>
          <p style={{ textAlign: "center", color: "#8394b0", marginBottom: "3rem", fontSize: "1rem" }}>
            Por trás dos 3 caminhos de monetização, esses recursos fazem o trabalho pesado.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.1rem" }}>
            {features.map((f) => (
              <div key={f.title} style={{
                background: f.bg,
                border: `1px solid ${f.border}`,
                borderRadius: 18, padding: "1.5rem",
              }}>
                <div style={{ marginBottom: "0.9rem" }}>{f.logo}</div>
                <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.4rem", color: f.color }}>{f.title}</h3>
                <p style={{ color: "#8394b0", fontSize: "0.88rem", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ── Comparison Manual vs PostMaster ── */}
      <RevealSection style={{ padding: "5rem 1.5rem", background: "var(--bg2)" }}>
        {/* @media: em telas <600px a tabela vira cards empilhados (Manual em cima,
            PostMaster embaixo) — fica legivel sem espremer texto. */}
        <style>{`
          @media (max-width: 600px) {
            .pm-cmp-header { display: none !important; }
            .pm-cmp-row { grid-template-columns: 1fr !important; gap: 0.5rem !important; padding: 1rem !important; }
            .pm-cmp-row > .pm-cmp-metric { font-size: 0.95rem !important; margin-bottom: 0.35rem !important; padding-bottom: 0.35rem !important; border-bottom: 1px solid rgba(255,255,255,0.05); }
            .pm-cmp-row > .pm-cmp-manual,
            .pm-cmp-row > .pm-cmp-pm { text-align: left !important; padding-left: 0.5rem; position: relative; }
            .pm-cmp-row > .pm-cmp-manual::before { content: 'Manual:'; color: #8394b0; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.06em; display: block; margin-bottom: 0.15rem; font-weight: 700; }
            .pm-cmp-row > .pm-cmp-pm::before { content: 'PostMaster:'; color: #a78bfa; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.06em; display: block; margin-bottom: 0.15rem; font-weight: 700; }
          }
        `}</style>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 800, marginBottom: "0.6rem" }}>
            Postando manual vs. PostMaster
          </h2>
          <p style={{ textAlign: "center", color: "#8394b0", marginBottom: "3rem", fontSize: "1rem" }}>
            A diferença não é fofa — é abismal.
          </p>
          <div style={{
            background: "var(--card)", border: "1px solid var(--line)",
            borderRadius: 18, overflow: "hidden",
          }}>
            <div className="pm-cmp-header" style={{
              display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr",
              background: "rgba(99,102,241,0.06)", padding: "0.85rem 1rem",
              fontSize: "0.78rem", fontWeight: 800, color: "#8394b0",
              textTransform: "uppercase", letterSpacing: "0.05em",
              borderBottom: "1px solid var(--line)",
            }}>
              <div></div>
              <div style={{ textAlign: "center" }}>Manual</div>
              <div style={{ textAlign: "center", color: "#a78bfa" }}>PostMaster</div>
            </div>
            {comparison.map(([metric, manual, pm], i) => (
              <div key={metric} className="pm-cmp-row" style={{
                display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr",
                padding: "1rem", alignItems: "center", gap: "0.5rem",
                borderBottom: i < comparison.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                fontSize: "0.88rem",
              }}>
                <div className="pm-cmp-metric" style={{ color: "#eef2f9", fontWeight: 600 }}>{metric}</div>
                <div className="pm-cmp-manual" style={{ textAlign: "center", color: "#8394b0" }}>{manual}</div>
                <div className="pm-cmp-pm" style={{ textAlign: "center", color: "#16c784", fontWeight: 600 }}>{pm}</div>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ── ROI / Savings ── */}
      <RevealSection style={{ padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 800, marginBottom: "0.75rem" }}>
            Conta a matemática
          </h2>
          <p style={{ color: "#8394b0", marginBottom: "2.5rem", fontSize: "1rem", lineHeight: 1.7 }}>
            1 hora por dia editando Reel × 30 dias = <strong style={{ color: "#eef2f9" }}>30 horas/mês</strong>.<br />
            Se sua hora vale R$ 30 (conservador), são <strong style={{ color: "#eef2f9" }}>R$ 900/mês de tempo seu</strong>.<br />
            O PostMaster custa <strong style={{ color: "#16c784" }}>R$ 197 uma vez</strong> e elimina essas 30h.
          </p>
          <div style={{
            background: "rgba(22,199,132,0.08)",
            border: "1px solid rgba(22,199,132,0.25)",
            borderRadius: 18, padding: "1.75rem 1.5rem",
            display: "inline-block", textAlign: "left",
          }}>
            <div style={{ fontSize: "0.85rem", color: "#8394b0", marginBottom: "0.4rem" }}>Em quanto tempo se paga:</div>
            <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "#16c784", lineHeight: 1 }}>6,5 dias</div>
            <div style={{ fontSize: "0.85rem", color: "#8394b0", marginTop: "0.4rem" }}>
              Depois disso é tempo recuperado — todo mês, pra sempre.
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ── Como funciona ── */}
      <RevealSection style={{ padding: "5rem 1.5rem", background: "var(--bg2)" }}>
        <div id="como-funciona" style={{ maxWidth: 740, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 800, marginBottom: "0.6rem" }}>
            Do zero ao primeiro Reel postado em 10 minutos
          </h2>
          <p style={{ textAlign: "center", color: "#8394b0", marginBottom: "3.5rem" }}>Simples assim.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", position: "relative" }}>
            <div style={{ position: "absolute", left: 27, top: 48, bottom: 48, width: 2, background: "rgba(99,102,241,0.2)" }} />
            {steps.map((s) => (
              <div key={s.n} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: "linear-gradient(135deg,#6366f1,#a855f7)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 900, fontSize: "1.1rem", flexShrink: 0, color: "#fff",
                  boxShadow: "0 0 0 4px rgba(99,102,241,0.15)", position: "relative", zIndex: 1,
                }}>{s.n}</div>
                <div style={{ paddingTop: "0.85rem" }}>
                  <h3 style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.35rem" }}>{s.title}</h3>
                  <p style={{ color: "#8394b0", fontSize: "0.9rem", lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <button onClick={buy} disabled={loading} style={{
              ...BTN, padding: "0.95rem 2.25rem", fontSize: "1rem",
              cursor: loading ? "wait" : "pointer", opacity: loading ? 0.7 : 1,
            }}>
              {loading ? "Aguarde..." : "Começar agora por R$ 197"}
            </button>
          </div>
        </div>
      </RevealSection>

      {/* ── Testimonials (escondido até ter material real) ── */}
      {HAS_TESTIMONIALS && (
        <RevealSection style={{ padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2 style={{ textAlign: "center", fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 800, marginBottom: "0.6rem" }}>
              Quem já usa
            </h2>
            <p style={{ textAlign: "center", color: "#8394b0", marginBottom: "3rem" }}>
              {/* TODO: substituir por testimonials reais quando o Tiago mandar prints/áudios */}
              [Espaço pra 4-6 depoimentos com print/foto/nome reais]
            </p>
          </div>
        </RevealSection>
      )}

      {/* ── Quem somos (escondido até ter foto + CNPJ) ── */}
      {HAS_FOUNDER_PHOTO && (
        <RevealSection style={{ padding: "5rem 1.5rem", background: "var(--bg2)" }}>
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2rem)", fontWeight: 800, marginBottom: "1rem" }}>
              Quem está por trás do PostMaster
            </h2>
            {/* TODO: foto + nome + 1 frase + CNPJ */}
          </div>
        </RevealSection>
      )}

      {/* ── Preço ── */}
      <RevealSection style={{ padding: "5rem 1.5rem", background: "var(--bg2)" }}>
        <div id="comprar" style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            display: "inline-block", background: "rgba(99,102,241,0.15)",
            border: "1px solid rgba(99,102,241,0.3)", color: "#a78bfa",
            borderRadius: 20, padding: "0.3rem 1rem", fontSize: "0.82rem",
            fontWeight: 700, marginBottom: "1.25rem",
          }}>
            🚀 Oferta de lançamento
          </div>
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 800, marginBottom: "0.5rem" }}>
            Pagamento único, seu pra sempre
          </h2>
          <p style={{ color: "#8394b0", marginBottom: "2rem" }}>Sem mensalidade. Sem limite. Paga uma vez e usa pra sempre.</p>

          <div style={{
            background: "linear-gradient(135deg,rgba(99,102,241,0.1),rgba(168,85,247,0.06))",
            border: "1px solid rgba(99,102,241,0.3)", borderRadius: 22, padding: "2.5rem 2rem",
          }}>
            <div style={{ marginBottom: "0.3rem" }}>
              <span style={{ fontSize: "1rem", color: "#4e5c72", textDecoration: "line-through", marginRight: "0.5rem" }}>R$ 297</span>
              <span style={{ fontSize: "0.82rem", background: "rgba(22,199,132,0.15)", color: "#16c784", borderRadius: 6, padding: "0.15rem 0.5rem", fontWeight: 700 }}>-34%</span>
            </div>
            <div style={{ fontSize: "clamp(3rem,8vw,4.5rem)", fontWeight: 900, lineHeight: 1, color: "#eef2f9" }}>
              R$ 197
            </div>
            <div style={{ color: "#8394b0", fontSize: "0.85rem", marginBottom: "2rem" }}>pagamento único · sem mensalidade · pra sempre</div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", textAlign: "left", marginBottom: "2rem" }}>
              {[
                "App PostMaster pra Windows 10/11",
                "Posta no YouTube + TikTok + Instagram",
                "Dublagem e narração com IA local (Whisper + Piper)",
                "Corte inteligente de podcast longo",
                "Título / descrição / tags SEO YouTube por IA",
                "Posts ilimitados, múltiplas contas em paralelo",
                "Atualizações grátis por 1 ano (auto-update)",
                "Suporte por e-mail",
              ].map(item => (
                <div key={item} style={{ fontSize: "0.93rem", color: "#c8d6f0", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ color: "#16c784" }}>✓</span>{item}
                </div>
              ))}
            </div>

            <button onClick={buy} disabled={loading} style={{
              ...BTN, display: "block", width: "100%",
              padding: "1.1rem", fontSize: "1.05rem",
              cursor: loading ? "wait" : "pointer", opacity: loading ? 0.7 : 1,
              marginBottom: "0.75rem",
            }}>
              {loading ? "Redirecionando..." : "🚀 Quero automatizar meu perfil"}
            </button>

            <div style={{
              display: "flex", alignItems: "center", gap: "0.6rem",
              background: "rgba(22,199,132,0.08)", border: "1px solid rgba(22,199,132,0.2)",
              borderRadius: 10, padding: "0.75rem 1rem", marginBottom: "1rem", textAlign: "left",
            }}>
              <span style={{ fontSize: "1.5rem" }}>🛡️</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#16c784" }}>7 dias de garantia total</div>
                <div style={{ fontSize: "0.8rem", color: "#8394b0" }}>Não gostou? Devolvo 100% do valor. Sem perguntas.</div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.72rem", color: "#4e5c72" }}>Pagamento via</span>
              <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                <span style={{ background: "rgba(255,255,255,0.06)", color: "#8394b0", padding: "0.15rem 0.45rem", borderRadius: 6, fontSize: "0.7rem", fontWeight: 700 }}>PIX</span>
                <span style={{ background: "rgba(255,255,255,0.06)", color: "#8394b0", padding: "0.15rem 0.45rem", borderRadius: 6, fontSize: "0.7rem", fontWeight: 700 }}>VISA</span>
                <span style={{ background: "rgba(255,255,255,0.06)", color: "#8394b0", padding: "0.15rem 0.45rem", borderRadius: 6, fontSize: "0.7rem", fontWeight: 700 }}>MASTER</span>
                <span style={{ background: "rgba(255,255,255,0.06)", color: "#8394b0", padding: "0.15rem 0.45rem", borderRadius: 6, fontSize: "0.7rem", fontWeight: 700 }}>Mercado Pago</span>
              </div>
            </div>

            <p style={{ color: "#4e5c72", fontSize: "0.78rem" }}>
              Após o pagamento você recebe o link de download por e-mail em até 10 minutos.
            </p>
          </div>
        </div>
      </RevealSection>

      {/* ── FAQ ── */}
      <RevealSection style={{ padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "1.8rem", fontWeight: 800, marginBottom: "0.6rem" }}>
            Dúvidas frequentes
          </h2>
          <p style={{ textAlign: "center", color: "#8394b0", marginBottom: "2.5rem", fontSize: "0.95rem" }}>
            Tem outra dúvida? <a href="mailto:contato@iaempresa.app" style={{ color: "#a78bfa" }}>Manda um e-mail</a> que eu respondo o mais rápido possível.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
            {faqs.map((f) => <FAQItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </RevealSection>

      {/* ── CTA final ── */}
      <RevealSection style={{ padding: "5rem 1.5rem", background: "var(--bg2)", textAlign: "center" }}>
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>⏰</div>
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.5rem)", fontWeight: 900, marginBottom: "0.75rem" }}>
            Ainda postando na mão?
          </h2>
          <p style={{ color: "#8394b0", marginBottom: "0.5rem", fontSize: "1rem", lineHeight: 1.7 }}>
            Cada dia sem automatizar é mais um dia de monetização YouTube, Creator Rewards do TikTok e venda no Instagram que escapa.
          </p>
          <p style={{ color: "#8394b0", marginBottom: "2rem", fontSize: "1rem" }}>
            Configure o PostMaster hoje. Em 10 minutos as 3 plataformas estão trabalhando pra você.
          </p>
          <button onClick={buy} disabled={loading} style={{
            ...BTN, padding: "1.1rem 2.5rem", fontSize: "1.1rem",
            cursor: loading ? "wait" : "pointer", opacity: loading ? 0.7 : 1,
            display: "inline-block",
          }}>
            {loading ? "Aguarde..." : "🚀 Quero automatizar agora — R$ 197"}
          </button>
          <div style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#4e5c72" }}>
            <s>R$ 297</s> → <strong style={{ color: "#eef2f9" }}>R$ 197</strong> · 🛡️ 7 dias de garantia · pagamento único
          </div>
        </div>
      </RevealSection>

      {/* ── Footer institucional ── */}
      <footer style={{
        padding: "3rem 1.5rem 2rem", background: "var(--bg)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "2rem", marginBottom: "2rem" }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: "1rem", color: "#eef2f9", marginBottom: "0.5rem" }}>
                iaempresa<span style={{ color: "#8b5cf6" }}>.app</span>
              </div>
              <p style={{ fontSize: "0.82rem", color: "#4e5c72", lineHeight: 1.6 }}>
                Software brasileiro de automação pra criadores e marcas que querem crescer no Instagram e TikTok.
              </p>
              {/* CNPJ vai aqui quando o user passar */}
              {/* <p style={{ fontSize: "0.74rem", color: "#4e5c72", marginTop: "0.5rem" }}>CNPJ XX.XXX.XXX/0001-YY</p> */}
            </div>
            <div>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#8394b0", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>Produto</div>
              <a href="#como-funciona" style={{ display: "block", color: "#8394b0", fontSize: "0.85rem", textDecoration: "none", marginBottom: "0.4rem" }}>Como funciona</a>
              <a href="#comprar" style={{ display: "block", color: "#8394b0", fontSize: "0.85rem", textDecoration: "none", marginBottom: "0.4rem" }}>Preço</a>
            </div>
            <div>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#8394b0", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>Suporte</div>
              <a href="mailto:contato@iaempresa.app" style={{ display: "block", color: "#8394b0", fontSize: "0.85rem", textDecoration: "none", marginBottom: "0.4rem" }}>contato@iaempresa.app</a>
            </div>
            <div>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#8394b0", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>Legal</div>
              <a href="/termos" style={{ display: "block", color: "#8394b0", fontSize: "0.85rem", textDecoration: "none", marginBottom: "0.4rem" }}>Termos de uso</a>
              <a href="/privacidade" style={{ display: "block", color: "#8394b0", fontSize: "0.85rem", textDecoration: "none", marginBottom: "0.4rem" }}>Privacidade</a>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1.5rem", textAlign: "center", fontSize: "0.75rem", color: "#4e5c72" }}>
            © {new Date().getFullYear()} iaempresa.app — Todos os direitos reservados.
          </div>
        </div>
      </footer>

    </div>
  );
}
