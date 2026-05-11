-- ============================================================
-- ZapBot — Tokens de acesso pós-pagamento
-- Rode no SQL Editor do Supabase dashboard
-- (mesmo padrão do postmaster_tokens, schema espelhado)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.zapbot_tokens (
  token             TEXT PRIMARY KEY,
  mp_payment_id     TEXT NOT NULL UNIQUE,
  payer_email       TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  first_access_at   TIMESTAMPTZ,
  last_access_at    TIMESTAMPTZ,
  access_count      INTEGER NOT NULL DEFAULT 0,
  access_ips        JSONB NOT NULL DEFAULT '[]'::jsonb
);

-- Lookup por payment_id (idempotência do webhook)
CREATE UNIQUE INDEX IF NOT EXISTS idx_zapbot_tokens_payment
  ON public.zapbot_tokens(mp_payment_id);

-- Detectar tokens muito acessados (compartilhamento)
CREATE INDEX IF NOT EXISTS idx_zapbot_tokens_access_count
  ON public.zapbot_tokens(access_count DESC);

-- RLS: bloqueia tudo do cliente. Só o service_role (APIs server-side) acessa.
ALTER TABLE public.zapbot_tokens ENABLE ROW LEVEL SECURITY;

-- Nenhuma política pública → service_role bypassa RLS automaticamente.
-- Cliente direto via supabase-js anon NÃO consegue ler.

COMMENT ON TABLE public.zapbot_tokens IS
  'Tokens únicos gerados após pagamento aprovado do ZapBot. Cada token
   está atrelado a um mp_payment_id e rastreia IPs de acesso pra detectar
   compartilhamento de link.';
