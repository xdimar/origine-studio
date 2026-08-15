import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'origine-studio-secret-key');

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Cari user berdasarkan email
    const user = await prisma.booking.findFirst({
      where: { customerEmail: email }
    });

    if (!user) {
      return NextResponse.json({ error: "Email belum terdaftar" }, { status: 404 });
    }

    // Cek password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "Password salah" }, { status: 401 });
    }

    // Bikin Token JWT
    const token = await new SignJWT({ id: user.id, email: user.customerEmail })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(secret);

    return NextResponse.json({ success: true, token });
  } catch (error) {
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}