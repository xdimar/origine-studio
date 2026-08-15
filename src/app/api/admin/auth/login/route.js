import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "origine-studio-secret-key",
);

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin)
      return NextResponse.json(
        { error: "Email tidak ditemukan" },
        { status: 404 },
      );

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid)
      return NextResponse.json({ error: "Password salah" }, { status: 401 });

    const token = await new SignJWT({
      id: admin.id,
      email: admin.email,
      role: "ADMIN",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1d")
      .sign(secret);

    // Simpan token ke cookie agar browser otomatis kirim saat akses /admin
    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 hari
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Gagal login" }, { status: 500 });
  }
}
