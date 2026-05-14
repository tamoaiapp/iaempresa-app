import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * GET /api/download/zapbot
 * Redireciona pro instalador .exe mais recente publicado em
 * github.com/tamoaiapp/zapbot/releases/latest. Resolve dinamicamente
 * porque o nome do asset muda a cada versão (ex: ZapBot-Setup-0.1.2.exe).
 *
 * Usar em vez de hardcodear releases/latest/download/<nome> — o GitHub
 * só baixa direto se o <nome> bater exato; senão redireciona pra página
 * de release e confunde o usuário.
 */
export async function GET() {
  try {
    const res = await fetch(
      "https://api.github.com/repos/tamoaiapp/zapbot/releases/latest",
      {
        headers: { Accept: "application/vnd.github+json" },
        // Cache 5 min na borda — release não muda toda hora
        next: { revalidate: 300 },
      },
    );

    if (!res.ok) {
      console.error("[download zapbot] github api err:", res.status);
      return NextResponse.redirect(
        "https://github.com/tamoaiapp/zapbot/releases/latest",
        302,
      );
    }

    const data = (await res.json()) as {
      assets?: { name: string; browser_download_url: string }[];
    };

    const exe = data.assets?.find(
      (a) => a.name.endsWith(".exe") && !a.name.endsWith(".blockmap"),
    );

    if (!exe) {
      console.error("[download zapbot] sem .exe no release");
      return NextResponse.redirect(
        "https://github.com/tamoaiapp/zapbot/releases/latest",
        302,
      );
    }

    return NextResponse.redirect(exe.browser_download_url, 302);
  } catch (e) {
    console.error("[download zapbot] err:", e);
    return NextResponse.redirect(
      "https://github.com/tamoaiapp/zapbot/releases/latest",
      302,
    );
  }
}
