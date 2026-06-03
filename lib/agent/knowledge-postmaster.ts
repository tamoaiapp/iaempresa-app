/**
 * Knowledge base do PostMaster — alimentado no system prompt da TamoIA-Suporte.
 *
 * Toda info aqui precisa ser VERDADE. Se nao tiver certeza de algo, o prompt
 * orienta a TamoIA a dizer "deixa eu confirmar com o time" + abrir WhatsApp.
 */
export const POSTMASTER_KNOWLEDGE = `
# PostMaster — Knowledge Base

## O que é
Aplicativo desktop para Windows (10 e 11) que automatiza postagens em Instagram e TikTok.
Roda no PC do cliente (não é nuvem, não é app celular). Configurou uma vez, ele posta para sempre.

## Como funciona (fluxo)
1. Cliente cola um link de canal do YouTube (ou perfil IG / perfil TikTok / pasta local).
2. PostMaster baixa o vídeo, converte para formato vertical 9:16.
3. IA local gera legenda com hashtags.
4. App faz upload e publica na conta configurada (Instagram Reels e/ou TikTok).
5. Repete no intervalo definido pelo cliente (ex: a cada 2h, ou janela 8h-22h).

## Preço e oferta atual
- R$ 197 — pagamento único (Pix ou cartão até 3x sem juros).
- Preço cheio é R$ 297 (atualmente em oferta de lançamento por R$ 197).
- Inclui: app, IA de legenda embutida, posts ilimitados, múltiplas contas em paralelo, atualizações grátis por 1 ano, suporte por e-mail e WhatsApp.
- NÃO existe mensalidade. Nunca houve plano mensal. É só esse pagamento único.

## Garantia
- 7 dias de garantia total. Se o cliente não gostar por qualquer motivo, devolve 100% do valor.
- Sem burocracia, sem perguntar por quê. Basta mandar e-mail ou WhatsApp.

## Trial gratuito
- O cliente pode testar 24h grátis sem cartão pelo link iaempresa.app/postmaster/teste-24h
- Baixa o app inteiro (não é versão demo mutilada), usa por 24h tudo liberado, se gostar paga.
- Não há trava no app — confiamos no cliente. Quem não paga depois, não é perseguido.

## Suporte e contato humano
- WhatsApp: +55 11 96724-5795 (mesma linha de suporte para qualquer dúvida).
- E-mail: contato@iaempresa.app
- Resposta tipicamente em horário comercial Brasil.

## Hardware mínimo
- Windows 10 ou 11
- 4 GB de RAM
- 5 GB livres em disco
- Praticamente qualquer notebook dos últimos 8 anos roda. Não precisa de placa de vídeo.

## NÃO funciona em:
- Mac (versão Mac está no roadmap mas sem data confirmada)
- Linux (idem)
- Celular Android / iPhone
- Servidor cloud (precisa do PC ligado)

## Sobre banimento da conta
- O PostMaster posta como humano: sessão real de navegador, intervalos naturais, sem usar APIs não oficiais (que são o que a Meta detecta e bane).
- É o mesmo comportamento de quem abre o Instagram no PC e posta manualmente, só que automatizado.
- Recomendação prática: começar com intervalo de 2h+ entre posts nos primeiros dias para criar histórico.
- Clientes têm contas rodando há meses sem problema seguindo essa prática.
- Importante: o PostMaster NÃO compra seguidor, NÃO dá like falso, NÃO usa bot de interação. Só automatiza POSTAGEM do que o dono já decidiu postar.

## É legal? Vai contra termos de uso?
- Cliente usa o próprio computador, com a própria sessão logada, postando o próprio conteúdo (ou conteúdo onde tem permissão de uso).
- Não usa API privada da Meta nem do TikTok. É navegação automatizada do que o cliente faria manualmente.
- Não inventa interação. É automação de rotina do próprio cliente.

## Ranqueamento
- Os vídeos postados pelo PostMaster ranqueiam normalmente.
- O algoritmo olha o conteúdo (gancho, retenção, hashtags), não a forma como foi postado.
- Se o vídeo é bom, ranqueia igual ao postado manualmente.

## Precisa deixar PC ligado?
- Sim. O PC precisa estar ligado e com internet para baixar e postar.
- Não precisa ser PC potente. Muitos clientes deixam um notebook velho ligado 24h só rodando o app.

## IA de legenda — é paga?
- Não. A IA vem embutida no app, roda local. Sem Ollama, sem ChatGPT, sem custo extra.
- Gera legendas ilimitadas com hashtags. Funciona offline (depois do download inicial).

## Múltiplas contas
- Sim, ilimitadas. Cria uma automação para cada conta — pode ser 1, pode ser 20.
- Cada uma roda em paralelo, com seu próprio canal-fonte, ritmo e horário.

## Funciona pra que tipo de conta?
- Qualquer tipo: pessoal, criador, profissional, business.
- A diferença não está na conta, está em como configura. Criador usa pra cortes do próprio canal de YouTube, loja faz Reels de produto, dark-page faz curadoria.

## Como recebe o app depois de comprar?
- Após pagamento aprovado (Pix em ~30s, cartão em ~5min), recebe e-mail com link de download direto e instruções.
- O instalador é Windows EXE. Baixa, executa, instala em 2 minutos.

## Atualizações
- O PostMaster se atualiza sozinho via auto-updater. Sempre na versão mais nova sem baixar de novo.
- Por 1 ano após a compra, todas as atualizações de funcionalidade entram automáticas.

## Windows mostra "PC protegido" ao instalar
- Acontece com qualquer software desktop pequeno/novo no Windows.
- Cliente clica em "Mais informações" → "Executar assim mesmo" e instala normal.
- Tem vídeo explicativo na própria página de download que mostra esse passo.

## Tier de cliente (PostMaster)
- Não há tiers. Quem compra fica com a versão completa. Não tem PRO/FREE/BÁSICO.
- Único distintivo é o link de teste 24h (acesso liberado por convite/honestidade).

## Roadmap / futuro
- Versão Mac (sem data)
- Suporte a YouTube Shorts diretamente como destino (hoje só baixa do YT)
- Mais fontes (Reddit, sites de cortes)

## Limites de uso
- Posts ilimitados.
- Múltiplas contas ilimitadas.
- Sem cap diário, sem cap mensal.
- Único limite é o do próprio Instagram/TikTok (rate limits da plataforma, que o app respeita com intervalos naturais).
`.trim();
