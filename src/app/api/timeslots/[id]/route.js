import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// DELETE: Hapus slot jam
export async function DELETE(request, { params }) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const id = parseInt(resolvedParams.id);

    await prisma.timeSlot.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menghapus jam" }, { status: 500 });
  }
}
