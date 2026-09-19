import { NextResponse } from "next/server";
import { db } from "@/db";
import { leads } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const name = String(body?.name ?? "").trim().slice(0, 120);
    const phone = String(body?.phone ?? "").trim().slice(0, 40);

    if (name.length < 2 || phone.length < 8) {
      return NextResponse.json(
        { ok: false, error: "Informe seu nome e um telefone/WhatsApp válido." },
        { status: 400 },
      );
    }

    await db.insert(leads).values({ name, phone });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[leads] falha ao salvar:", error);
    return NextResponse.json(
      { ok: false, error: "Não foi possível salvar agora." },
      { status: 500 },
    );
  }
}
