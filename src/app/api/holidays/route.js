import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET: Ambil semua tanggal libur
export async function GET() {
  try {
    const holidays = await prisma.holiday.findMany({
      orderBy: { date: "asc" },
    });
    return NextResponse.json(holidays);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data libur" },
      { status: 500 },
    );
  }
}

// POST: Tambah tanggal libur
export async function POST(request) {
  try {
    const { date, description } = await request.json();

    const existing = await prisma.holiday.findUnique({ where: { date } });
    if (existing) {
      return NextResponse.json(
        { error: "Tanggal ini sudah ditandai libur" },
        { status: 400 },
      );
    }

    const newHoliday = await prisma.holiday.create({
      data: { date, description },
    });

    return NextResponse.json({ success: true, holiday: newHoliday });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal menambah libur" },
      { status: 500 },
    );
  }
}
