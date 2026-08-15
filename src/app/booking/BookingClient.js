"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function BookingClient({ serviceId }) {
  const [service, setService] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [holidays, setHolidays] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (serviceId) {
      fetch("/api/services")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            const found = data.find((s) => s.id === parseInt(serviceId));
            if (found) setService(found);
          }
        });
    }

    // Ambil slot jam dari database
    fetch("/api/timeslots")
      .then((res) => res.json())
      .then((data) => setTimeSlots(data.map((t) => t.time)));

    // Ambil tanggal libur dari database
    fetch("/api/holidays")
      .then((res) => res.json())
      .then((data) => setHolidays(data.map((h) => h.date))); // Simpan array of string dates
  }, [serviceId]);
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    if (holidays.includes(selectedDate)) {
      setMessage(
        "Maaf, studio tutup pada tanggal ini. Silakan pilih tanggal lain.",
      );
      setSelectedDate("");
    } else {
      setMessage("");
      setSelectedDate(selectedDate);
    }
  };

  const handleBooking = async () => {
    if (
      !selectedDate ||
      !selectedTime ||
      !paymentMethod ||
      !name ||
      !phone ||
      !email ||
      !password
    ) {
      setMessage("Mohon lengkapi semua data terlebih dahulu!");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: service.id,
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          bookingDate: selectedDate,
          bookingTime: selectedTime,
          paymentMethod: paymentMethod,
          password: password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        if (paymentMethod === "DP") {
          const payRes = await fetch("/api/payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bookingId: data.booking.id }),
          });
          const payData = await payRes.json();
          if (payData.success) {
            window.snap.pay(payData.token, {
              onSuccess: function (result) {
                setMessage("Pembayaran berhasil! Booking dikonfirmasi.");
              },
              onPending: function (result) {
                setMessage("Menunggu pembayaran Anda.");
              },
              onError: function (result) {
                setMessage("Pembayaran gagal.");
              },
            });
          }
        } else {
          setMessage("Booking berhasil! Kode booking: #" + data.booking.id);
        }
      } else {
        setMessage(data.error || "Gagal melakukan booking.");
      }
    } catch (error) {
      setMessage("Terjadi kesalahan jaringan.");
    }
    setIsLoading(false);
  };

  // Jika layanan belum dipilih
  if (!service) {
    return (
      <main className="min-h-screen bg-dark text-white flex flex-col items-center justify-center px-6 text-center pt-20">
        <h1 className="font-luxury text-3xl md:text-4xl text-gold mb-4">
          Layanan Belum Dipilih
        </h1>
        <p className="text-gray-400 mb-8">
          Silakan pilih layanan terlebih dahulu sebelum melakukan booking.
        </p>
        <Link
          href="/layanan"
          className="px-8 py-3 bg-gold text-dark rounded-full font-bold hover:bg-white transition-colors">
          Lihat Layanan
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-dark text-white overflow-x-hidden">
      {/* === NAVBAR === */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-md border-b border-gold/20 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-luxury font-bold text-gold tracking-wider">
            Origine<span className="text-white">Studio</span>
          </Link>
          <div className="hidden md:flex space-x-10">
            <Link
              href="/"
              className="text-sm text-gray-300 hover:text-gold uppercase tracking-widest">
              Beranda
            </Link>
            <Link
              href="/layanan"
              className="text-sm text-gray-300 hover:text-gold uppercase tracking-widest">
              Layanan
            </Link>
            <Link
              href="/booking"
              className="text-sm text-gold uppercase tracking-widest">
              Booking
            </Link>
            <Link
              href="/client-area"
              className="text-sm text-gray-300 hover:text-gold uppercase tracking-widest">
              Client Area
            </Link>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gold z-50">
            {menuOpen ? (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-dark/95 backdrop-blur-lg border-b border-gold/20 py-6 flex flex-col items-center space-y-6 animate-[fadeIn_0.3s_ease-in-out]">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-gold uppercase tracking-widest">
              Beranda
            </Link>
            <Link
              href="/layanan"
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-gold uppercase tracking-widest">
              Layanan
            </Link>
            <Link
              href="/booking"
              onClick={() => setMenuOpen(false)}
              className="text-gold uppercase tracking-widest">
              Booking
            </Link>
            <Link
              href="/client-area"
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-gold uppercase tracking-widest">
              Client Area
            </Link>
          </div>
        )}
      </nav>

      {/* === KONTEN BOOKING === */}
      <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-gold text-sm tracking-[0.3em] uppercase">
            Form Pemesanan
          </span>
          <h1 className="font-luxury text-4xl md:text-6xl font-bold text-white mt-4">
            Konfirmasi Booking
          </h1>
          <div className="w-24 h-1 bg-maroon mx-auto rounded-full mt-4"></div>
        </div>

        {message && (
          <div
            className={`mb-8 p-4 rounded-lg text-center ${message.includes("berhasil") || message.includes("Pembayaran") ? "bg-green-900/50 border border-green-500 text-green-300" : "bg-red-900/50 border border-red-500 text-red-300"}`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Kolom Kiri: Form Input */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-maroon/10 border border-gold/20 rounded-2xl p-6">
              <h2 className="font-luxury text-2xl text-gold mb-4">
                1. Pilih Tanggal
              </h2>
              <input
                type="date"
                className="w-full bg-dark text-white border border-gold/30 rounded-lg p-3 focus:outline-none focus:border-gold [color-scheme:dark]"
                value={selectedDate}
                onChange={handleDateChange} // <-- UBAH MENJADI INI
              />
            </div>

            <div className="bg-maroon/10 border border-gold/20 rounded-2xl p-6">
              <h2 className="font-luxury text-2xl text-gold mb-4">
                2. Pilih Jam{" "}
                <span className="text-sm text-gray-400 font-sans">
                  (Kapasitas 3 Klien/Jam)
                </span>
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {timeSlots.map((time) => {
                  const isFull = time === "11:00" || time === "14:30";
                  return (
                    <button
                      key={time}
                      disabled={isFull}
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 rounded-lg border transition-all ${
                        isFull
                          ? "bg-gray-800 text-gray-600 border-gray-700 cursor-not-allowed line-through"
                          : selectedTime === time
                            ? "bg-gold text-dark border-gold font-bold"
                            : "bg-dark text-white border-gray-600 hover:border-gold"
                      }`}>
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-maroon/10 border border-gold/20 rounded-2xl p-6 space-y-4">
              <h2 className="font-luxury text-2xl text-gold mb-4">
                3. Data Diri
              </h2>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama kamu"
                  className="w-full bg-dark border border-gray-600 rounded-lg p-3 focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Nomor WhatsApp
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  className="w-full bg-dark border border-gray-600 rounded-lg p-3 focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@kamu.com"
                  className="w-full bg-dark border border-gray-600 rounded-lg p-3 focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Buat Password (Untuk Login Melihat Foto)
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full bg-dark border border-gray-600 rounded-lg p-3 focus:outline-none focus:border-gold"
                />
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Ringkasan Pesanan */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-maroon/20 border border-gold/30 rounded-2xl p-6">
              <h2 className="font-luxury text-2xl text-gold mb-6">Ringkasan</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Layanan</span>
                  <span className="text-white text-right">{service.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Durasi</span>
                  <span className="text-white">
                    {service.durationMinutes} Menit
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tanggal</span>
                  <span className="text-white">{selectedDate || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Jam</span>
                  <span className="text-white">{selectedTime || "-"}</span>
                </div>

                <div className="border-t border-gold/20 my-4"></div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Harga</span>
                  <div className="text-right">
                    {service.discount > 0 ? (
                      <>
                        <span className="block text-sm text-gray-500 line-through">
                          Rp {service.price.toLocaleString("id-ID")}
                        </span>
                        <span className="text-2xl font-bold text-gold">
                          Rp{" "}
                          {Math.round(
                            service.price -
                              service.price * (service.discount / 100),
                          ).toLocaleString("id-ID")}
                        </span>
                        <span className="block text-xs text-green-400">
                          Diskon {service.discount}% diterapkan!
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-gold">
                        Rp {service.price.toLocaleString("id-ID")}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer p-2 border border-gray-600 rounded-lg hover:border-gold">
                  <input
                    type="radio"
                    name="payment"
                    value="DP"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-gold"
                  />
                  <span className="text-sm text-white">
                    Bayar DP 50% (Online)
                  </span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer p-2 border border-gray-600 rounded-lg hover:border-gold">
                  <input
                    type="radio"
                    name="payment"
                    value="TEMPAT"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-gold"
                  />
                  <span className="text-sm text-white">Bayar di Tempat</span>
                </label>
              </div>

              <button
                onClick={handleBooking}
                disabled={isLoading || !paymentMethod}
                className={`w-full mt-6 py-3 rounded-full font-bold transition-all flex justify-center items-center ${
                  isLoading
                    ? "bg-gray-600 text-gray-300 cursor-wait"
                    : paymentMethod
                      ? "bg-gold text-dark hover:bg-white"
                      : "bg-gray-700 text-gray-500 cursor-not-allowed"
                }`}>
                {isLoading ? "Memproses..." : "Konfirmasi Booking"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
