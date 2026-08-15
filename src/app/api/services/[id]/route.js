import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// PATCH: Update layanan
export async function PATCH(request, { params }) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const id = parseInt(resolvedParams.id);
    const data = await request.json();

    const name = data.name || "";
    const category = data.category || "";
    const description = data.description || "";
    const price = parseInt(data.price) || 0;
    const durationMinutes = parseInt(data.durationMinutes) || 0;
    const maxPax = parseInt(data.maxPax) || 1;

    await prisma.service.update({
      where: { id },
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("UPDATE SERVICE ERROR:", error);
    return NextResponse.json(
      { error: "Gagal update layanan: " + error.message },
      { status: 500 },
    );
  }
}

// DELETE: Hapus layanan
export async function DELETE(request, { params }) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const id = parseInt(resolvedParams.id);

    await prisma.service.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE SERVICE ERROR:", error);
    return NextResponse.json(
      { error: "Gagal menghapus layanan" },
      { status: 500 },
    );
  }
}
