import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// GET /api/robodabet/check-token?token=XXX
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token || token.length < 8) {
    return NextResponse.json({ valid: false, reason: "token inválido" }, { status: 400 });
  }

  const sb = supabaseAdmin();
  const { data: row, error } = await sb
    .from("robodabet_tokens")
    .select("token, mp_payment_id, first_access_at, last_access_at, access_count, access_ips")
    .eq("token", token)
    .maybeSingle();

  if (error) {
    console.error("[robodabet check-token] supabase err:", error.message);
    return NextResponse.json({ valid: false, reason: "erro interno" }, { status: 500 });
  }

  if (!row) {
    return NextResponse.json({ valid: false, reason: "token não encontrado" }, { status: 404 });
  }

  const xff = req.headers.get("x-forwarded-for") || "";
  const ip =
    xff.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const now = new Date().toISOString();
  const currentIps: string[] = Array.isArray(row.access_ips) ? row.access_ips : [];
  const newIps = currentIps.includes(ip) ? currentIps : [...currentIps, ip].slice(-50);

  const newCount = (row.access_count || 0) + 1;
  const firstAccessAt = row.first_access_at || now;

  await sb
    .from("robodabet_tokens")
    .update({
      access_count: newCount,
      last_access_at: now,
      first_access_at: firstAccessAt,
      access_ips: newIps,
    })
    .eq("token", token);

  return NextResponse.json({
    valid: true,
    payment_id: row.mp_payment_id,
    first_access_at: firstAccessAt,
    last_access_at: now,
    access_count: newCount,
  });
}
