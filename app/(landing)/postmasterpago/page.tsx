"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";

const DOWNLOAD_URL = "https://github.com/tamoaiapp/postmaster/releases/latest/download/PostMaster-Setup.exe";
const VIDEO_URL = "https://ddpyvdtgxemyxltgtxsh.supabase.co/storage/v1/object/public/videos/como-liberar-postmaster.mp4";

// Token simples — bypass para suporte (clientes que pagaram mas não viram a página de aprovado)
const BYPASS_KEY = "POSTMASTER2026OK";

function PaidContent() {
  const params = useSearchParams();
  const statusParam = params.get("status");
  const paymentId = params.get("payment_id") || params.get("collection_id");
  const tokenParam = params.get("token");
  const bypass = params.get("acesso") === BYPASS_KEY;

  // Estado inicial:
  // - token presente → "verificando_token" enquanto bate na API
  // - bypass / status=aprovado → aprovado direto
  // - status=pendente → polling
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

  // 1) Validação de token (?token=XXX)
  useEffect(() => {
    if (!tokenParam) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/postmaster/check-token?token=${encodeURIComponent(tokenParam)}`, {
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

  // 2) Polling do pagamento (?payment_id=...&status=pendente) — quando aprovar, redireciona pra URL com token
  useEffect(() => {
    if (verifiedStatus !== "pendente" || !paymentId) return;
    setPolling(true);

    const checkStatus = async () => {
      try {
        const res = await fetch(`/api/postmaster/check-payment?id=${paymentId}`, { cache: "no-store" });
        const data = await res.json();
        if (data.approved) {
          // Se já temos token gerado pelo backend → redireciona pra URL definitiva com token
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
          ? "rgba(210,153,34,0.12)"
          : isFailed
          ? "rgba(239,68,68,0.12)"
          : "rgba(63,185,80,0.12)",
        border: `1px solid ${
          isPending || isVerifyingToken
            ? "rgba(210,153,34,0.3)"
            : isFailed
            ? "rgba(239,68,68,0.3)"
            : "rgba(63,185,80,0.3)"
        }`,
        borderRadius: 16, padding: "1.25rem 1.75rem",
        marginBottom: "2rem", textAlign: "center",
      }}>
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
            : "Obrigado pela compra! Assista o vídeo abaixo e clique em baixar."}
        </p>
        {isPending && polling && (
          <div style={{ marginTop: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#a78bfa", fontSize: "0.85rem" }}>
            <span style={{ display: "inline-block", width: 14, height: 14, border: "2px solid #a78bfa", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
            Verificando... ({tentativas})
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          </div>
        )}
      </div>

      {/* Aviso discreto de link compartilhado */}
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
          {/* Chamada do video */}
          <div style={{
            background: "linear-gradient(135deg, rgba(245,158,11,0.14), rgba(245,158,11,0.06))",
            border: "1.5px solid rgba(245,158,11,0.4)",
            borderRadius: 16, padding: "1.25rem 1.5rem",
            marginBottom: "1.25rem", textAlign: "center",
          }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>📺</div>
            <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "#f59e0b", marginBottom: "0.3rem" }}>
              Assista esse vídeo antes de instalar
            </div>
            <p style={{ fontSize: "0.88rem", color: "#eef2f9", lineHeight: 1.5 }}>
              Mostro como liberar a instalação no Windows em menos de 1 minuto.
            </p>
          </div>

          {/* Video player HTML5 — vertical 9:16 */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "2rem",
          }}>
            <video
              controls
              playsInline
              preload="metadata"
              poster=""
              style={{
                width: "100%",
                maxWidth: 360,
                aspectRatio: "9 / 16",
                borderRadius: 16,
                background: "#000",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "block",
              }}
            >
              <source src={VIDEO_URL} type="video/mp4" />
              Seu navegador não suporta vídeo HTML5.
            </video>
          </div>

          {/* Download */}
          <div style={{
            background: "linear-gradient(135deg,rgba(99,102,241,0.12),rgba(168,85,247,0.08))",
            border: "1px solid rgba(99,102,241,0.25)",
            borderRadius: 18, padding: "2rem",
            textAlign: "center",
          }}>
            <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>⬇</div>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "0.5rem" }}>
              PostMaster — Download
            </h2>
            <p style={{ color: "#8394b0", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
              Versão 1.0.0 · Windows 10/11
            </p>
            <a
              href={DOWNLOAD_URL}
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                color: "#fff", padding: "0.95rem 2.75rem",
                borderRadius: 14, fontWeight: 700, fontSize: "1.05rem",
                textDecoration: "none",
                boxShadow: "0 4px 24px rgba(99,102,241,0.4)",
              }}
            >
              ⬇ Baixar PostMaster.exe
            </a>
            <p style={{ color: "#4e5c72", fontSize: "0.8rem", marginTop: "1.25rem" }}>
              Dúvidas? <a href="mailto:contato@iaempresa.app" style={{ color: "#8394b0" }}>contato@iaempresa.app</a>
            </p>
          </div>
        </>
      )}

      <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
        <Link href="/postmaster" style={{ color: "#8394b0", fontSize: "0.875rem", textDecoration: "none" }}>
          ← Voltar para a página do PostMaster
        </Link>
      </div>
    </div>
  );
}

export default function PostmasterPagoPage() {
  return (
    <>
      <div style={{
        background: "linear-gradient(180deg,#0a0b14 0%,var(--bg) 100%)",
        padding: "1.5rem 1.25rem 0",
        textAlign: "center",
        borderBottom: "1px solid var(--line)",
      }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{
            display: "inline-block",
            background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)",
            color: "#a78bfa", borderRadius: 20, padding: "0.3rem 1rem",
            fontSize: "0.8rem", fontWeight: 600, marginBottom: "1rem",
          }}>
            ⬡ PostMaster
          </div>
        </div>
      </div>
      <Suspense fallback={<div style={{ textAlign: "center", padding: "4rem", color: "#8394b0" }}>Carregando...</div>}>
        <PaidContent />
      </Suspense>
    </>
  );
}
