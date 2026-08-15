import { NextResponse } from "next/server";
import midtransClient from "midtrans-client";
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const { bookingId } = await request.json();

    // Ambil data booking dari database
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });
    if (!booking)
      return NextResponse.json(
        { error: "Booking tidak ditemukan" },
        { status: 404 },
      );

    // Hitung jumlah DP (50%)
    const dpAmount = Math.ceil(booking.totalPrice * 0.5);

    // Konfigurasi Midtrans
    let snap = new midtransClient.Snap({
      isProduction: false, // false karena kita masih pakai Sandbox
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });

    // Buat parameter transaksi
    let parameter = {
      transaction_details: {
        order_id: `ORDER-${booking.id}-${Date.now()}`,
        gross_amount: dpAmount,
      },
      credit_card: { secure: true },
      customer_details: {
        first_name: booking.customerName,
        email: booking.customerEmail,
        phone: booking.customerPhone,
      },
    };

    // Minta Midtrans buatkan link pembayaran
    const transaction = await snap.createTransaction(parameter);

    // Dapatkan token untuk frontend
    const transactionToken = transaction.token;

    return NextResponse.json({ success: true, token: transactionToken });
  } catch (error) {
    console.error("MIDTRANS ERROR:", error);
    return NextResponse.json(
      { error: "Gagal membuat pembayaran: " + error.message },
      { status: 500 },
    );
  }
}
