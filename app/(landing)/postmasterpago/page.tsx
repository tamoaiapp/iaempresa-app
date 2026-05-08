"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";

const DOWNLOAD_URL = "https://github.com/tamoaiapp/postmaster/releases/latest/download/PostMaster-Setup.exe";

// Token simples — quem tem essa key bypassa a checagem (uso pós-suporte)
const BYPASS_KEY = "POSTMASTER2026OK";

const antivirusSteps = [
  {
    title: "Windows Defender SmartScreen (mais comum)",
    steps: [
      'Ao abrir o instalador, aparece "O Windows protegeu seu computador"',
      'Clique em "Mais informações" (link pequeno abaixo do texto)',
      'Aparece o botão "Executar assim mesmo" — clique nele',
      "O instalador abre normalmente",
    ],
    color: "#6366f1",
  },
  {
    title: "Windows Defender Antivírus (quarentena)",
    steps: [
      'Abra o menu Iniciar e busque "Segurança do Windows"',
      'Clique em "Proteção contra vírus e ameaças"',
      'Role até "Ameaças atuais" e clique em "Histórico de proteção"',
      'Encontre o PostMaster na lista e clique em "Permitir"',
    ],
    color: "#3fb950",
  },
  {
    title: "Avast / AVG",
    steps: [
      "Abra o Avast/AVG e vá em Configurações",
      'Clique em "Exceções" ou "Lista de permissões"',
      'Adicione a pasta onde instalou o PostMaster (ex: C:\\PostMaster)',
      "Feche e abra o PostMaster normalmente",
    ],
    color: "#f59e0b",
  },
  {
    title: "Kaspersky",
    steps: [
      "Abra o Kaspersky e clique em Configurações",
      'Vá em "Proteção" → "Controle de aplicativos"',
      'Encontre o PostMaster e mude para "Confiável"',
      "Ou adicione a pasta do app às exclusões",
    ],
    color: "#dd2a7b",
  },
];

function PaidContent() {
  const params = useSearchParams();
  const statusParam = params.get("status");
  const paymentId = params.get("payment_id") || params.get("collection_id");
  const bypass = params.get("acesso") === BYPASS_KEY;

  // Status local: começa com o do query param, mas pode ser atualizado pelo polling
  const [verifiedStatus, setVerifiedStatus] = useState<"pendente" | "aprovado" | "falhou" | null>(
    bypass ? "aprovado" : (statusParam === "aprovado" ? "aprovado" : statusParam === "falhou" ? "falhou" : statusParam === "pendente" ? "pendente" : null)
  );
  const [polling, setPolling] = useState(false);
  const [tentativas, setTentativas] = useState(0);

  // Polling: quando o status é "pendente" e temos um payment_id, verifica a cada 3s
  useEffect(() => {
    if (verifiedStatus !== "pendente" || !paymentId) return;
    setPolling(true);

    const checkStatus = async () => {
      try {
        const res = await fetch(`/api/postmaster/check-payment?id=${paymentId}`, { cache: "no-store" });
        const data = await res.json();
        if (data.approved) {
          setVerifiedStatus("aprovado");
          setPolling(false);
        }
      } catch { /* ignora erro de rede, tenta de novo */ }
      setTentativas((t) => t + 1);
    };

    // Primeira checagem imediata
    checkStatus();
    const interval = setInterval(checkStatus, 3000);

    // Para de tentar depois de 5 minutos (100 tentativas)
    const timeout = setTimeout(() => clearInterval(interval), 5 * 60 * 1000);

    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [verifiedStatus, paymentId]);

  const isPending = verifiedStatus === "pendente";
  const isApproved = verifiedStatus === "aprovado";

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "3rem 1.25rem 5rem" }}>

      {/* Status banner */}
      <div style={{
        background: isPending
          ? "rgba(210,153,34,0.12)"
          : "rgba(63,185,80,0.12)",
        border: `1px solid ${isPending ? "rgba(210,153,34,0.3)" : "rgba(63,185,80,0.3)"}`,
        borderRadius: 16, padding: "1.5rem 2rem",
        marginBottom: "2.5rem", textAlign: "center",
      }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
          {isPending ? "⏳" : "✅"}
        </div>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          {isPending ? "Aguardando confirmação do pagamento" : "Pagamento confirmado!"}
        </h1>
        <p style={{ color: "#8394b0", fontSize: "0.95rem" }}>
          {isPending
            ? polling
              ? "Estamos verificando seu pagamento automaticamente. Assim que o banco confirmar, o download aparecerá aqui (geralmente em até 30 segundos)."
              : "Seu pagamento está sendo processado. Atualize a página em alguns instantes para liberar o download."
            : "Obrigado pela compra! Faça o download abaixo e siga o passo a passo de instalação."}
        </p>
        {isPending && polling && (
          <div style={{ marginTop: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#a78bfa", fontSize: "0.85rem" }}>
            <span style={{ display: "inline-block", width: 14, height: 14, border: "2px solid #a78bfa", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
            Verificando... ({tentativas})
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          </div>
        )}
      </div>

      {isApproved && (
        <>
          {/* AVISO IMPORTANTE — Windows SmartScreen */}
          <div style={{
            background: "linear-gradient(135deg, rgba(245,158,11,0.14), rgba(245,158,11,0.06))",
            border: "1.5px solid rgba(245,158,11,0.4)",
            borderRadius: 16, padding: "1.5rem 1.75rem",
            marginBottom: "1.5rem",
          }}>
            <div style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
              <div style={{ fontSize: "1.75rem", lineHeight: 1, flexShrink: 0 }}>⚠️</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: "1.05rem", marginBottom: "0.5rem", color: "#f59e0b" }}>
                  IMPORTANTE — Leia antes de instalar
                </div>
                <p style={{ fontSize: "0.92rem", color: "#eef2f9", lineHeight: 1.6, marginBottom: "0.875rem" }}>
                  Quando você executar o instalador, o <strong>Windows vai mostrar uma tela azul dizendo &quot;O Windows protegeu seu computador&quot;</strong>. Isso é normal — acontece com todo aplicativo de automação de IA. <strong>O PostMaster é seguro</strong>.
                </p>
                <div style={{
                  background: "rgba(0,0,0,0.25)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 10,
                  padding: "0.875rem 1rem",
                  fontSize: "0.88rem",
                  color: "#eef2f9",
                  lineHeight: 1.7,
                }}>
                  <div style={{ fontWeight: 700, marginBottom: "0.5rem", color: "#a78bfa" }}>👉 Como destravar (3 cliques):</div>
                  <div>1. Quando aparecer a tela azul, clique em <strong style={{ color: "#fff" }}>&quot;Mais informações&quot;</strong> (link pequeno embaixo do texto)</div>
                  <div>2. Clique no botão <strong style={{ color: "#fff" }}>&quot;Executar assim mesmo&quot;</strong> que vai aparecer</div>
                  <div>3. O instalador abre normalmente — pronto!</div>
                </div>
                <p style={{ fontSize: "0.82rem", color: "#8394b0", marginTop: "0.75rem", lineHeight: 1.5 }}>
                  Se o seu antivírus (Avast, Kaspersky, AVG) também bloquear, role a página para ver as instruções por antivírus.
                </p>
              </div>
            </div>
          </div>

          {/* Download */}
          <div style={{
            background: "linear-gradient(135deg,rgba(99,102,241,0.12),rgba(168,85,247,0.08))",
            border: "1px solid rgba(99,102,241,0.25)",
            borderRadius: 18, padding: "2rem",
            marginBottom: "2.5rem", textAlign: "center",
          }}>
            <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>⬇</div>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "0.5rem" }}>
              PostMaster — Download
            </h2>
            <p style={{ color: "#8394b0", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
              Versão 1.0.0 · Windows 10/11 · Instalador completo
            </p>
            <a
              href={DOWNLOAD_URL}
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                color: "#fff", padding: "0.9rem 2.5rem",
                borderRadius: 14, fontWeight: 700, fontSize: "1.05rem",
                textDecoration: "none",
                boxShadow: "0 4px 24px rgba(99,102,241,0.4)",
              }}
            >
              ⬇ Baixar PostMaster.exe
            </a>
            <p style={{ color: "#4e5c72", fontSize: "0.8rem", marginTop: "1rem" }}>
              Lembre: ao executar, clique em <strong style={{ color: "#a78bfa" }}>&quot;Mais informações&quot;</strong> → <strong style={{ color: "#a78bfa" }}>&quot;Executar assim mesmo&quot;</strong>
            </p>
            <p style={{ color: "#4e5c72", fontSize: "0.8rem", marginTop: "0.5rem" }}>
              Dúvidas? <a href="mailto:contato@iaempresa.app" style={{ color: "#8394b0" }}>contato@iaempresa.app</a>
            </p>
          </div>

          {/* Instalação passo a passo */}
          <div style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "1.5rem" }}>
              📋 Como instalar
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                ["1", "Baixe o arquivo PostMaster-Setup.exe acima e execute — ele instala automaticamente"],
                ["2", "Se o Windows bloquear, clique em \"Mais informações\" → \"Executar assim mesmo\" (veja instruções abaixo)"],
                ["3", "Instale o yt-dlp: baixe o yt-dlp.exe em github.com/yt-dlp/yt-dlp/releases e coloque em C:\\Windows\\System32"],
                ["4", "Abra o PostMaster — a IA já vem embutida, não precisa instalar nada mais"],
                ["5", "Clique em \"Contas\" → adicione sua conta do Instagram ou TikTok (login normal)"],
                ["6", "Clique em \"Nova automação\", cole o link do canal do YouTube e configure os filtros"],
                ["7", "Defina o horário de postagem (ex: 08h–22h, a cada 60 min)"],
                ["8", "Clique em Iniciar — pronto! O PostMaster posta sozinho enquanto o PC estiver ligado"],
              ].map(([n, text]) => (
                <div key={n} style={{
                  display: "flex", gap: "1rem", alignItems: "flex-start",
                  background: "var(--card)", border: "1px solid var(--line)",
                  borderRadius: 12, padding: "0.875rem 1rem",
                }}>
                  <span style={{
                    background: "linear-gradient(135deg,#6366f1,#a855f7)",
                    color: "#fff", width: 28, height: 28, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 800, fontSize: "0.8rem", flexShrink: 0,
                  }}>{n}</span>
                  <span style={{ fontSize: "0.9rem", lineHeight: 1.5, paddingTop: 4 }}>{text as string}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Antivírus */}
          <div>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.5rem" }}>
              🛡️ O antivírus bloqueou? Veja como resolver
            </h2>
            <p style={{ color: "#8394b0", fontSize: "0.9rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>
              O PostMaster é um app seguro. Como acontece com todo aplicativo de automação de IA, alguns antivírus podem alertar. Siga as instruções do seu antivírus:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {antivirusSteps.map((av) => (
                <div key={av.title} style={{
                  background: "var(--card)", border: "1px solid var(--line)",
                  borderRadius: 14, overflow: "hidden",
                }}>
                  <div style={{
                    background: `${av.color}18`,
                    borderBottom: "1px solid var(--line)",
                    padding: "0.75rem 1.25rem",
                    display: "flex", alignItems: "center", gap: "0.6rem",
                  }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: av.color, flexShrink: 0 }} />
                    <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>{av.title}</span>
                  </div>
                  <div style={{ padding: "1rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {av.steps.map((step, i) => (
                      <div key={i} style={{ display: "flex", gap: "0.75rem", fontSize: "0.875rem", color: "#8394b0", lineHeight: 1.5 }}>
                        <span style={{ color: av.color, fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              background: "rgba(63,185,80,0.08)", border: "1px solid rgba(63,185,80,0.2)",
              borderRadius: 12, padding: "1rem 1.25rem", marginTop: "1.25rem",
              fontSize: "0.875rem", color: "#8394b0", lineHeight: 1.6,
            }}>
              💡 <strong style={{ color: "#eef2f9" }}>Dica:</strong> Se continuar com problemas, entre em contato:{" "}
              <a href="mailto:contato@iaempresa.app" style={{ color: "#a78bfa" }}>contato@iaempresa.app</a> — respondemos em até 24h.
            </div>
          </div>
        </>
      )}

      <div style={{ textAlign: "center", marginTop: "3rem" }}>
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
        padding: "2rem 1.25rem 0",
        textAlign: "center",
        borderBottom: "1px solid var(--line)",
        marginBottom: "0",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
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
