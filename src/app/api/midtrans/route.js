import { NextResponse } from "next/server";
import midtransClient from "midtrans-client";
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    // Ambil data notifikasi dari Midtrans
    const notificationJson = await request.json();

    // Inisialisasi Midtrans Client untuk cek keaslian notifikasi
    let apiClient = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });

    // Verifikasi notifikasi ke server Midtrans
    const statusResponse =
      await apiClient.transaction.notification(notificationJson);

    let orderId = statusResponse.order_id;
    let transactionStatus = statusResponse.transaction_status;
    let fraudStatus = statusResponse.fraud_status;

    // Ambil ID Booking asli dari Order ID (ORDER-1-169876543 -> 1)
    // Kita pecah stringnya untuk dapat angka di tengah
    const bookingId = parseInt(orderId.split("-")[1]);

    console.log(
      `Notifikasi diterima untuk Booking ID: ${bookingId}, Status: ${transactionStatus}`,
    );

    // Update status di database kita
    if (transactionStatus == "capture" || transactionStatus == "settlement") {
      if (fraudStatus == "accept") {
        // Pembayaran sukses! Ubah status jadi CONFIRMED
        await prisma.booking.update({
          where: { id: bookingId },
          data: { status: "CONFIRMED" },
        });
      }
    } else if (
      transactionStatus == "cancel" ||
      transactionStatus == "deny" ||
      transactionStatus == "expire"
    ) {
      // Pembayaran gagal! Ubah status jadi REJECTED
      await prisma.booking.update({
        where: { id: bookingId },
        data: { status: "REJECTED" },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("WEBHOOK ERROR:", error);
    return NextResponse.json(
      { error: "Gagal memproses webhook" },
      { status: 500 },
    );
  }
}
