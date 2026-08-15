import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET: Ambil semua layanan
export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { id: "desc" },
    });
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data layanan" },
      { status: 500 },
    );
  }
}

// POST: Tambah layanan baru
export async function POST(request) {
  try {
    const data = await request.json();

    // Pastikan data tidak undefined, kalau kosong isi string kosong ""
    const name = data.name || "";
    const category = data.category || "";
    const description = data.description || "";

    // Pastikan angka valid, kalau kosong isi 0
    const price = parseInt(data.price) || 0;
    const durationMinutes = parseInt(data.durationMinutes) || 0;
    const maxPax = parseInt(data.maxPax) || 1;
    const discount = parseInt(data.discount) || 0; // <-- BARIS INI YANG HILANGSSSSSSSS

    if (!name || !category) {
      return NextResponse.json(
        { error: "Nama dan Kategori wajib diisi" },
        { status: 400 },
      );
    }

    const newService = await prisma.service.create({
      data: {
        name,
        category,
        price,
        discount: parseInt(discount) || 0, // <-- TAMBAHKAN INI
        durationMinutes,
        description,
        maxPax,
      },
    });

    return NextResponse.json({ success: true, service: newService });
  } catch (error) {
    console.error("SAVE SERVICE ERROR:", error);
    return NextResponse.json(
      { error: "Gagal menambah layanan: " + error.message },
      { status: 500 },
    );
  }
}
