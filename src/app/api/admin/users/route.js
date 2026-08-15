import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

// GET: Ambil semua admin
export async function GET() {
  try {
    const admins = await prisma.admin.findMany({
      select: { id: true, email: true },
    });
    return NextResponse.json(admins);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data" },
      { status: 500 },
    );
  }
}

// POST: Tambah admin baru (Hanya bisa diakses jika sudah login)
export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Cek apakah email sudah dipakai
    const existing = await prisma.admin.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Email ini sudah terdaftar!" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await prisma.admin.create({
      data: { email, password: hashedPassword },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal menambah admin" },
      { status: 500 },
    );
  }
}
