import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// PATCH: Update nama kategori
export async function PATCH(request, { params }) {
  const id = parseInt(params.id);
  const { name } = await request.json();
  try {
    await prisma.category.update({ where: { id }, data: { name } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal update kategori" },
      { status: 500 },
    );
  }
}

// DELETE: Hapus kategori
export async function DELETE(request, { params }) {
  const id = parseInt(params.id);
  try {
    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal menghapus kategori" },
      { status: 500 },
    );
  }
}
