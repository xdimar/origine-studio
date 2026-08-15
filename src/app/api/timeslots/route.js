import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET: Ambil semua slot jam (urutkan berdasarkan jam)
export async function GET() {
  try {
    const slots = await prisma.timeSlot.findMany({ orderBy: { time: "asc" } });
    return NextResponse.json(slots);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil jam operasional" },
      { status: 500 },
    );
  }
}

// POST: Tambah slot jam baru
export async function POST(request) {
  try {
    const { time } = await request.json();

    const existing = await prisma.timeSlot.findUnique({ where: { time } });
    if (existing) {
      return NextResponse.json({ error: "Jam ini sudah ada" }, { status: 400 });
    }

    const newSlot = await prisma.timeSlot.create({ data: { time } });
    return NextResponse.json({ success: true, slot: newSlot });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menambah jam" }, { status: 500 });
  }
}
