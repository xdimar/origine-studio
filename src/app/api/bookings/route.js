import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs'; // <-- TAMBAHKAN INI

// FUNGSI POST (Untuk Klien Booking) - Sudah ada sebelumnya
export async function POST(request) {
  try {
    const data = await request.json();
    const {
      serviceId,
      customerName,
      customerEmail,
      customerPhone,
      bookingDate,
      bookingTime,
      paymentMethod,
      password, // <-- TAMBAHKAN INI
    } = data;

    const service = await prisma.service.findUnique({
      where: { id: parseInt(serviceId) },
    });
    if (!service) {
      return NextResponse.json(
        { error: "Layanan tidak ditemukan" },
        { status: 404 },
      );
    }

    const existingBookings = await prisma.booking.count({
      where: {
        bookingDate: bookingDate,
        bookingTime: bookingTime,
        status: { in: ["PENDING", "CONFIRMED"] },
      },
    });

    if (existingBookings >= 3) {
      return NextResponse.json(
        {
          error:
            "Maaf, slot jam ini sudah penuh (Kapasitas 3 klien). Silakan pilih jam lain.",
        },
        { status: 400 },
      );
    }
    // Hitung harga setelah diskon (jika ada)
    let finalPrice = service.price;
    if (service.discount > 0) {
      finalPrice = service.price - (service.price * (service.discount / 100));
    }

    const newBooking = await prisma.booking.create({
      data: {
        customerName,
        customerEmail,
        customerPhone,
        bookingDate,
        bookingTime,
        paymentMethod,
        status: "PENDING",
        totalPrice: Math.round(finalPrice), // <-- GUNAKAN finalPrice
        serviceId: service.id,
        password: await bcrypt.hash(password, 10) // Simpan password terenkripsi
      },
    });

    return NextResponse.json({ success: true, booking: newBooking });
  } catch (error) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server: " + error.message },
      { status: 500 },
    );
  }
}

// FUNGSI GET (Untuk Admin Melihat Data) - Baru ditambahkan
export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { id: "desc" }, // Urutkan dari yang paling baru
    });
    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data" },
      { status: 500 },
    );
  }
}
