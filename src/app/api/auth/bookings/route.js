import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "origine-studio-secret-key",
);

export async function GET(request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const token = authHeader.replace("Bearer ", "");
    const { payload } = await jwtVerify(token, secret);

    // Ambil semua booking milik email ini
    const bookings = await prisma.booking.findMany({
      where: { customerEmail: payload.email },
      orderBy: { id: "desc" },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ error: "Token tidak valid" }, { status: 401 });
  }
}
