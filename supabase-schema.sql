-- ============================================================
-- IAEmpresa SaaS — Schema Supabase
-- Rode no SQL Editor do Supabase dashboard
-- ============================================================

-- Tabela de revendedores (um por conta auth.users)
CREATE TABLE IF NOT EXISTS public.revendedores (
  id                    UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome                  TEXT NOT NULL DEFAULT '',
  slug                  TEXT NOT NULL UNIQUE,
  subscription_status   TEXT NOT NULL DEFAULT 'inactive', -- 'inactive' | 'active' | 'canceled'
  stripe_customer_id    TEXT,
  stripe_subscription_id TEXT,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabela de clientes (criados pelo revendedor para cada ferramenta)
CREATE TABLE IF NOT EXISTS public.clientes (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  revendedor_id UUID NOT NULL REFERENCES public.revendedores(id) ON DELETE CASCADE,
  ferramenta    TEXT NOT NULL,   -- 'chatbot' | 'agenda' | 'crm' | 'cobranca' | 'fideliza' | 'fidelidade' | 'orcamento' | 'cardapio'
  nome_cliente  TEXT NOT NULL,
  nome_negocio  TEXT NOT NULL,
  slug          TEXT NOT NULL,
  senha_hash    TEXT NOT NULL,   -- bcrypt hash do PIN de 4 dígitos
  instance_id   TEXT,            -- ID da instância Zapro (futuro)
  ativo         BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (revendedor_id, ferramenta, slug)
);

-- RLS: revendedores só lêem/editam o próprio registro
ALTER TABLE public.revendedores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "revendedor_own" ON public.revendedores
  USING (auth.uid() = id);

-- RLS: revendedores só lêem/editam os próprios clientes
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "clientes_own" ON public.clientes
  USING (
    revendedor_id IN (
      SELECT id FROM public.revendedores WHERE id = auth.uid()
    )
  );

-- Service role ignora RLS (usado pelas APIs)
-- Nenhuma política adicional necessária — supabaseAdmin() usa service_role key

-- Índices para consultas frequentes
CREATE INDEX IF NOT EXISTS idx_clientes_revendedor ON public.clientes(revendedor_id);
CREATE INDEX IF NOT EXISTS idx_clientes_ferramenta ON public.clientes(ferramenta);
CREATE INDEX IF NOT EXISTS idx_clientes_slug ON public.clientes(revendedor_id, ferramenta, slug);
CREATE INDEX IF NOT EXISTS idx_revendedores_slug ON public.revendedores(slug);
