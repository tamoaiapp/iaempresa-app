import Anthropic from "@anthropic-ai/sdk";

/**
 * Cliente Anthropic lazy-init. Se ANTHROPIC_API_KEY nao estiver no env,
 * retorna null e quem chama deve degradar pra "fala com humano".
 */

let _client: Anthropic | null = null;

export function getAnthropic(): Anthropic | null {
  if (_client) return _client;
  const key = (process.env.ANTHROPIC_API_KEY ?? "").trim();
  if (!key) return null;
  _client = new Anthropic({ apiKey: key });
  return _client;
}

export const HAIKU_MODEL = (process.env.ANTHROPIC_MODEL_HAIKU ?? "claude-haiku-4-5-20251001").trim();
