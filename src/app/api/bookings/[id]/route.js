import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// API untuk Update Data Booking (Approve, Reject, Add G-Drive)
export async function PATCH(request, { params }) {
  try {
    // Next.js versi baru kadang butuh di-await
    const resolvedParams = await Promise.resolve(params);
    const id = parseInt(resolvedParams.id);

    const body = await request.json();

    // Data yang bisa diupdate
    const updatedBooking = await prisma.booking.update({
      where: { id: id },
      data: {
        status: body.status,
        gdriveLink: body.gdriveLink || null, // Kalau kosong, simpan null
      },
    });

    return NextResponse.json({ success: true, booking: updatedBooking });
  } catch (error) {
    // Cetak error asli ke terminal VS Code
    console.error("ERROR UPDATE:", error);
    return NextResponse.json(
      { error: "Gagal update data: " + error.message },
      { status: 500 },
    );
  }
}
