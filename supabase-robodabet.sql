-- ============================================================
-- Robô da Bet — Tokens de acesso pós-pagamento
-- Rode no SQL Editor do Supabase dashboard
-- (mesmo padrão do postmaster_tokens / zapbot_tokens)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.robodabet_tokens (
  token             TEXT PRIMARY KEY,
  mp_payment_id     TEXT NOT NULL UNIQUE,
  payer_email       TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  first_access_at   TIMESTAMPTZ,
  last_access_at    TIMESTAMPTZ,
  access_count      INTEGER NOT NULL DEFAULT 0,
  access_ips        JSONB NOT NULL DEFAULT '[]'::jsonb
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_robodabet_tokens_payment
  ON public.robodabet_tokens(mp_payment_id);

CREATE INDEX IF NOT EXISTS idx_robodabet_tokens_access_count
  ON public.robodabet_tokens(access_count DESC);

ALTER TABLE public.robodabet_tokens ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.robodabet_tokens IS
  'Tokens únicos gerados após pagamento aprovado do Robô da Bet (R$69).
   Cada token atrelado a um mp_payment_id, rastreia IPs pra detectar
   compartilhamento de link.';
