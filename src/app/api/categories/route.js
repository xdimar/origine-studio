import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET: Ambil semua kategori
export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
  return NextResponse.json(categories);
}

// POST: Tambah kategori baru
export async function POST(request) {
  const { name } = await request.json();
  try {
    const newCategory = await prisma.category.create({ data: { name } });
    return NextResponse.json({ success: true, category: newCategory });
  } catch (error) {
    return NextResponse.json(
      { error: "Kategori sudah ada atau gagal ditambahkan" },
      { status: 500 },
    );
  }
}
