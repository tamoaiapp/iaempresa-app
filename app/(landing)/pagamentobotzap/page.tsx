"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";

// Resolve dinamicamente via /api/download/zapbot — busca o asset .exe mais
// recente em github.com/tamoaiapp/zapbot/releases/latest. Não precisa atualizar
// o filename aqui a cada release nova (0.1.1 → 0.1.2 → ...).
const DOWNLOAD_URL = "/api/download/zapbot";

// Bypass token for support (rare cases where someone paid but didn't see the approved page).
const BYPASS_KEY = "ZAPBOT2026OK";

function PaidContent() {
  const params = useSearchParams();
  const statusParam = params.get("status");
  const paymentId = params.get("payment_id") || params.get("collection_id");
  const tokenParam = params.get("token");
  const bypass = params.get("acesso") === BYPASS_KEY;

  const initialStatus: "verificando_token" | "pendente" | "aprovado" | "falhou" | null = tokenParam
    ? "verificando_token"
    : bypass
      ? "aprovado"
      : statusParam === "aprovado"
        ? "aprovado"
        : statusParam === "falhou"
          ? "falhou"
          : statusParam === "pendente"
            ? "pendente"
            : null;

  const [verifiedStatus, setVerifiedStatus] = useState<typeof initialStatus>(initialStatus);
  const [polling, setPolling] = useState(false);
  const [tentativas, setTentativas] = useState(0);
  const [accessCount, setAccessCount] = useState<number | null>(null);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);

  // 1) Token validation (?token=XXX)
  useEffect(() => {
    if (!tokenParam) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/zapbot/check-token?token=${encodeURIComponent(tokenParam)}`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (cancelled) return;
        if (data.valid) {
          setTokenValid(true);
          setAccessCount(typeof data.access_count === "number" ? data.access_count : null);
          setVerifiedStatus("aprovado");
        } else {
          setTokenValid(false);
          setVerifiedStatus("falhou");
        }
      } catch {
        if (!cancelled) {
          setTokenValid(false);
          setVerifiedStatus("falhou");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [tokenParam]);

  // 2) Payment polling — when approved, redirect to the URL with token
  useEffect(() => {
    if (verifiedStatus !== "pendente" || !paymentId) return;
    setPolling(true);

    const checkStatus = async () => {
      try {
        const res = await fetch(`/api/zapbot/check-payment?id=${paymentId}`, { cache: "no-store" });
        const data = await res.json();
        if (data.approved) {
          if (data.downloadUrl) {
            window.location.href = data.downloadUrl;
            return;
          }
          setVerifiedStatus("aprovado");
          setPolling(false);
        }
      } catch {
        /* ignore */
      }
      setTentativas((t) => t + 1);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 3000);
    const timeout = setTimeout(() => clearInterval(interval), 5 * 60 * 1000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [verifiedStatus, paymentId]);

  const isVerifyingToken = verifiedStatus === "verificando_token";
  const isPending = verifiedStatus === "pendente";
  const isApproved = verifiedStatus === "aprovado";
  const isFailed = verifiedStatus === "falhou";
  const isInvalidToken = !!tokenParam && tokenValid === false;
  const showShareWarning = !!tokenParam && tokenValid === true && (accessCount ?? 0) > 1;

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "2.5rem 1.25rem 5rem" }}>
      {/* Status banner */}
      <div
        style={{
          background:
            isPending || isVerifyingToken
              ? "rgba(210,153,34,0.12)"
              : isFailed
                ? "rgba(239,68,68,0.12)"
                : "rgba(37,211,102,0.12)",
          border: `1px solid ${
            isPending || isVerifyingToken
              ? "rgba(210,153,34,0.3)"
              : isFailed
                ? "rgba(239,68,68,0.3)"
                : "rgba(37,211,102,0.3)"
          }`,
          borderRadius: 16,
          padding: "1.25rem 1.75rem",
          marginBottom: "2rem",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "2.25rem", marginBottom: "0.4rem" }}>
          {isPending || isVerifyingToken ? "⏳" : isFailed ? "⚠️" : "✅"}
        </div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.4rem" }}>
          {isVerifyingToken
            ? "Validando seu acesso..."
            : isPending
              ? "Aguardando confirmação do pagamento"
              : isInvalidToken
                ? "Link inválido ou expirado"
                : isFailed
                  ? "Não foi possível liberar o acesso"
                  : "Pagamento confirmado!"}
        </h1>
        <p style={{ color: "#8394b0", fontSize: "0.92rem" }}>
          {isVerifyingToken
            ? "Verificando seu token de acesso, isso leva 1 segundo."
            : isInvalidToken
              ? "O link que você usou não corresponde a nenhuma compra. Se você comprou, abra o e-mail original ou fale com o suporte."
              : isPending
                ? polling
                  ? "Estamos verificando seu pagamento automaticamente. Assim que o banco confirmar, o download aparecerá aqui."
                  : "Seu pagamento está sendo processado. Atualize a página em alguns instantes."
                : "Obrigado pela compra! Siga as instruções abaixo para instalar."}
        </p>
        {isPending && polling && (
          <div
            style={{
              marginTop: "1rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#25D366",
              fontSize: "0.85rem",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 14,
                height: 14,
                border: "2px solid #25D366",
                borderTopColor: "transparent",
                borderRadius: "50%",
                animation: "spin 0.7s linear infinite",
              }}
            />
            Verificando... ({tentativas})
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          </div>
        )}
      </div>

      {/* Share-warning */}
      {showShareWarning && (
        <div
          style={{
            background: "rgba(245,158,11,0.08)",
            border: "1px solid rgba(245,158,11,0.25)",
            borderRadius: 12,
            padding: "0.85rem 1.1rem",
            marginBottom: "1.5rem",
            textAlign: "center",
            color: "#f59e0b",
            fontSize: "0.85rem",
          }}
        >
          ⚠️ Esse link foi acessado {accessCount} vezes — se compartilhou, considere baixar e enviar o app direto.
        </div>
      )}

      {isApproved && (
        <>
          {/* SmartScreen warning — Windows tip */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(245,158,11,0.14), rgba(245,158,11,0.06))",
              border: "1.5px solid rgba(245,158,11,0.4)",
              borderRadius: 16,
              padding: "1.25rem 1.5rem",
              marginBottom: "1.25rem",
            }}
          >
            <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "#f59e0b", marginBottom: "0.5rem" }}>
              ⚠️ O Windows pode mostrar um aviso azul (SmartScreen)
            </div>
            <p style={{ fontSize: "0.88rem", color: "#eef2f9", lineHeight: 1.6 }}>
              Como o app ainda não tem certificado da Microsoft (eles cobram caro), o Windows mostra um aviso. Pra liberar:
            </p>
            <ol
              style={{
                fontSize: "0.88rem",
                color: "#c8d6f0",
                lineHeight: 1.7,
                paddingLeft: "1.25rem",
                marginTop: "0.5rem",
              }}
            >
              <li>Clique no botão de download abaixo</li>
              <li>Se aparecer o aviso azul: clique em <b>&quot;Mais informações&quot;</b></li>
              <li>Depois clique em <b>&quot;Executar assim mesmo&quot;</b></li>
            </ol>
          </div>

          {/* Download */}
          <div
            style={{
              background: "linear-gradient(135deg,rgba(37,211,102,0.12),rgba(18,140,126,0.08))",
              border: "1px solid rgba(37,211,102,0.25)",
              borderRadius: 18,
              padding: "2rem",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>⬇</div>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "0.5rem" }}>
              ZapBot — Download
            </h2>
            <p style={{ color: "#8394b0", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
              Versão 0.1.1 · Windows 10/11 · 88MB · atualiza sozinho
            </p>
            <a
              href={DOWNLOAD_URL}
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg,#25D366,#128C7E)",
                color: "#fff",
                padding: "0.95rem 2.75rem",
                borderRadius: 14,
                fontWeight: 700,
                fontSize: "1.05rem",
                textDecoration: "none",
                boxShadow: "0 4px 24px rgba(37,211,102,0.4)",
              }}
            >
              ⬇ Baixar ZapBot-Setup.exe
            </a>
            <p style={{ color: "#4e5c72", fontSize: "0.8rem", marginTop: "1.25rem" }}>
              Dúvidas?{" "}
              <a href="mailto:contato@iaempresa.app" style={{ color: "#8394b0" }}>
                contato@iaempresa.app
              </a>
            </p>
          </div>

          {/* Next steps */}
          <div
            style={{
              marginTop: "1.5rem",
              background: "var(--card)",
              border: "1px solid var(--line)",
              borderRadius: 14,
              padding: "1.25rem 1.5rem",
            }}
          >
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              Próximos passos
            </h3>
            <ol style={{ fontSize: "0.88rem", color: "#c8d6f0", lineHeight: 1.7, paddingLeft: "1.25rem" }}>
              <li>Execute o ZapBot-Setup.exe (siga o aviso azul se aparecer)</li>
              <li>Aguarde o ambiente preparar (~10s)</li>
              <li>A IA local começa a baixar automaticamente (~2GB, primeira vez)</li>
              <li>Escaneie o QR Code do WhatsApp no seu celular</li>
              <li>Pronto — o bot responde 24h por dia</li>
            </ol>
          </div>
        </>
      )}

      <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
        <Link
          href="/zapbot"
          style={{ color: "#8394b0", fontSize: "0.875rem", textDecoration: "none" }}
        >
          ← Voltar para a página do ZapBot
        </Link>
      </div>
    </div>
  );
}

export default function PagamentoBotZapPage() {
  return (
    <>
      <div
        style={{
          background: "linear-gradient(180deg,#0a0b14 0%,var(--bg) 100%)",
          padding: "1.5rem 1.25rem 0",
          textAlign: "center",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div
            style={{
              display: "inline-block",
              background: "rgba(37,211,102,0.12)",
              border: "1px solid rgba(37,211,102,0.3)",
              color: "#25D366",
              borderRadius: 20,
              padding: "0.3rem 1rem",
              fontSize: "0.8rem",
              fontWeight: 600,
              marginBottom: "1rem",
            }}
          >
            ⏻ ZapBot
          </div>
        </div>
      </div>
      <Suspense
        fallback={
          <div style={{ textAlign: "center", padding: "4rem", color: "#8394b0" }}>Carregando...</div>
        }
      >
        <PaidContent />
      </Suspense>
    </>
  );
}
