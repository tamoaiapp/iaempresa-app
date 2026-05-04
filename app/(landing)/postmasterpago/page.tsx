"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

const DOWNLOAD_URL = "https://drive.google.com/uc?id=SEU_ID_AQUI"; // troque após subir o .exe

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
  const status = params.get("status");
  const isPending = status === "pendente";

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
          {isPending ? "Pagamento em análise" : "Pagamento confirmado!"}
        </h1>
        <p style={{ color: "#8394b0", fontSize: "0.95rem" }}>
          {isPending
            ? "Seu pagamento está sendo processado. Assim que confirmado, o download ficará disponível. Volte a esta página em instantes."
            : "Obrigado pela compra! Faça o download abaixo e siga o passo a passo de instalação."}
        </p>
      </div>

      {!isPending && (
        <>
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
              Versão 1.0.0 · Windows 10/11 · ~200 MB
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
                ["1", "Baixe o arquivo PostMaster.exe acima"],
                ["2", "Instale o Ollama gratuitamente em ollama.com — clique em \"Download\" e siga o instalador"],
                ["3", 'Abra o terminal (Win+R → digite "cmd" → Enter) e rode: ollama pull qwen2.5:0.5b'],
                ["4", "Instale o yt-dlp: acesse github.com/yt-dlp/yt-dlp/releases e baixe o yt-dlp.exe — coloque em C:\\Windows\\System32"],
                ["5", "Execute o PostMaster.exe. Se o Windows bloquear, veja as instruções abaixo."],
                ["6", "Clique em \"Contas\" → adicione sua conta do Instagram ou TikTok"],
                ["7", "Clique em \"Nova automação\" e configure fonte, filtros e horário"],
                ["8", "Clique em Iniciar — pronto, o bot roda sozinho!"],
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
              O PostMaster é um app seguro. Por ser novo e não ter certificado digital (assinatura de código caro), alguns antivírus podem alertar. Siga as instruções do seu antivírus:
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
