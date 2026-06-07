"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";

const DOWNLOAD_URL = "https://github.com/tamoaiapp/robodabet/releases/latest/download/RoboDaBet-Setup.exe";
const BYPASS_KEY = "ROBODABET2026OK";

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

  // 1) Validação de token
  useEffect(() => {
    if (!tokenParam) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/robodabet/check-token?token=${encodeURIComponent(tokenParam)}`, {
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
    return () => { cancelled = true; };
  }, [tokenParam]);

  // 2) Polling PIX
  useEffect(() => {
    if (verifiedStatus !== "pendente" || !paymentId) return;
    setPolling(true);

    const checkStatus = async () => {
      try {
        const res = await fetch(`/api/robodabet/check-payment?id=${paymentId}`, { cache: "no-store" });
        const data = await res.json();
        if (data.approved) {
          if (data.downloadUrl) {
            window.location.href = data.downloadUrl;
            return;
          }
          setVerifiedStatus("aprovado");
          setPolling(false);
        }
      } catch { /* ignora */ }
      setTentativas((t) => t + 1);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 3000);
    const timeout = setTimeout(() => clearInterval(interval), 5 * 60 * 1000);
    return () => { clearInterval(interval); clearTimeout(timeout); };
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
      <div style={{
        background: isPending || isVerifyingToken
          ? "rgba(255,215,0,0.10)"
          : isFailed
          ? "rgba(239,68,68,0.10)"
          : "rgba(0,255,136,0.10)",
        border: `1px solid ${
          isPending || isVerifyingToken
            ? "rgba(255,215,0,0.3)"
            : isFailed
            ? "rgba(239,68,68,0.3)"
            : "rgba(0,255,136,0.3)"
        }`,
        borderRadius: 16, padding: "1.5rem 1.75rem",
        marginBottom: "2rem", textAlign: "center",
      }}>
        <div style={{ marginBottom: "0.6rem", display: "flex", justifyContent: "center" }}>
          {isPending || isVerifyingToken ? (
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#ffd700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          ) : isFailed ? (
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          ) : (
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          )}
        </div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.4rem", color: "#e8f5ee" }}>
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
        <p style={{ color: "#9ec5b1", fontSize: "0.92rem", lineHeight: 1.5 }}>
          {isVerifyingToken
            ? "Verificando seu token de acesso — leva 1 segundo."
            : isInvalidToken
            ? "O link que você usou não corresponde a nenhuma compra. Se você comprou, abra o e-mail original ou fale com o suporte."
            : isPending
            ? polling
              ? "Estamos verificando seu PIX a cada 3 segundos. Assim que o banco confirmar, o download aparece aqui automaticamente. Não feche a página."
              : "Seu pagamento está sendo processado. Atualize a página em alguns instantes."
            : "Obrigado pela compra. Baixe agora o Robô da Bet pra Windows."}
        </p>
        {isPending && polling && (
          <div style={{ marginTop: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#ffd700", fontSize: "0.85rem" }}>
            <span style={{ display: "inline-block", width: 14, height: 14, border: "2px solid #ffd700", borderTopColor: "transparent", borderRadius: "50%", animation: "rb-spin 0.7s linear infinite" }} />
            Verificando PIX... ({tentativas})
            <style>{`@keyframes rb-spin { to { transform: rotate(360deg) } }`}</style>
          </div>
        )}
      </div>

      {/* Aviso link compartilhado */}
      {showShareWarning && (
        <div style={{
          background: "rgba(245,158,11,0.08)",
          border: "1px solid rgba(245,158,11,0.25)",
          borderRadius: 12, padding: "0.85rem 1.1rem",
          marginBottom: "1.5rem", textAlign: "center",
          color: "#f59e0b", fontSize: "0.85rem",
        }}>
          ⚠️ Esse link foi acessado {accessCount} vezes — se compartilhou, considere baixar e enviar o app direto.
        </div>
      )}

      {isApproved && (
        <>
          {/* Download */}
          <div style={{
            background: "linear-gradient(135deg, rgba(0,255,136,0.12), rgba(255,215,0,0.06))",
            border: "1px solid rgba(0,255,136,0.3)",
            borderRadius: 18, padding: "2rem",
            textAlign: "center",
            marginBottom: "1.5rem",
          }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.75rem" }}>
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </div>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "0.4rem", color: "#e8f5ee" }}>
              Robô da Bet — Download
            </h2>
            <p style={{ color: "#9ec5b1", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
              Windows 10/11 · Auto-update embutido
            </p>
            <a
              href={DOWNLOAD_URL}
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #00ff88, #00b86b)",
                color: "#001a0d",
                padding: "1rem 2.75rem",
                borderRadius: 14, fontWeight: 800, fontSize: "1.05rem",
                textDecoration: "none",
                boxShadow: "0 0 24px rgba(0,255,136,0.4)",
              }}
            >
              ⬇ Baixar instalador (.exe)
            </a>
            <p style={{ color: "#5e7d6f", fontSize: "0.8rem", marginTop: "1.25rem", lineHeight: 1.55 }}>
              Se o Windows alertar que o arquivo é desconhecido, clique em{" "}
              <strong style={{ color: "#9ec5b1" }}>&quot;Mais informações&quot;</strong> →{" "}
              <strong style={{ color: "#9ec5b1" }}>&quot;Executar mesmo assim&quot;</strong>.
            </p>
          </div>

          {/* Salve esse link */}
          {tokenParam && (
            <div style={{
              background: "rgba(168,85,247,0.05)",
              border: "1px solid rgba(168,85,247,0.2)",
              borderRadius: 14,
              padding: "1.1rem 1.4rem",
              marginBottom: "1.5rem",
              textAlign: "center",
            }}>
              <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#c4a5ff", marginBottom: "0.35rem" }}>
                💾 Salve esse link
              </div>
              <p style={{ color: "#9ec5b1", fontSize: "0.85rem", lineHeight: 1.55 }}>
                Esse é o seu link permanente de download. Salva nos favoritos —
                se precisar reinstalar, é só voltar aqui.
              </p>
            </div>
          )}

          {/* Passos */}
          <div style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 14,
            padding: "1.5rem 1.75rem",
            marginBottom: "1.5rem",
          }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#e8f5ee", marginBottom: "0.85rem" }}>
              Próximos passos
            </h3>
            <ol style={{ color: "#c8e0d0", fontSize: "0.88rem", lineHeight: 1.75, paddingLeft: "1.2rem", margin: 0 }}>
              <li>Dê duplo-clique no arquivo baixado</li>
              <li>Se o Windows alertar, escolha <strong>&quot;Mais informações&quot; → &quot;Executar mesmo assim&quot;</strong></li>
              <li>Aguarde a instalação (uns 30s)</li>
              <li>Abra o Robô da Bet — o onboarding vai te guiar</li>
              <li>Travou? Use o botão <strong>&quot;Ajuda&quot;</strong> dentro do app (TamoIA responde direto)</li>
            </ol>
          </div>
        </>
      )}

      <div style={{ textAlign: "center", marginTop: "2.5rem", fontSize: "0.85rem", color: "#5e7d6f" }}>
        Dúvidas?{" "}
        <a
          href="https://wa.me/5511967245795"
          style={{ color: "#00ff88", textDecoration: "none", fontWeight: 600 }}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp +55 11 96724-5795
        </a>
        {" · "}
        <a href="mailto:contato@iaempresa.app" style={{ color: "#9ec5b1" }}>contato@iaempresa.app</a>
      </div>

      <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
        <Link href="/robodabet" style={{ color: "#5e7d6f", fontSize: "0.85rem", textDecoration: "none" }}>
          ← Voltar para a página do Robô da Bet
        </Link>
      </div>
    </div>
  );
}

export default function RoboDaBetPagoPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: `
        radial-gradient(circle at 20% 10%, rgba(0,255,136,0.10), transparent 50%),
        radial-gradient(circle at 80% 90%, rgba(255,215,0,0.05), transparent 50%),
        #050808`,
      color: "#e8f5ee",
      fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>
      <div style={{
        padding: "1.5rem 1.25rem 0",
        textAlign: "center",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(0,255,136,0.12)", border: "1px solid rgba(0,255,136,0.3)",
            color: "#00ff88", borderRadius: 20, padding: "0.3rem 1rem",
            fontSize: "0.8rem", fontWeight: 700, marginBottom: "1rem", letterSpacing: "0.05em",
          }}>
            ROBÔ DA BET
          </div>
        </div>
      </div>
      <Suspense fallback={<div style={{ textAlign: "center", padding: "4rem", color: "#9ec5b1" }}>Carregando...</div>}>
        <PaidContent />
      </Suspense>
    </div>
  );
}
