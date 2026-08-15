"use client";

import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    pending: 0,
    confirmed: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    // Ambil data untuk statistik
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const pending = data.filter((b) => b.status === "PENDING").length;
          const confirmed = data.filter((b) => b.status === "CONFIRMED").length;
          const revenue = data
            .filter((b) => b.status !== "REJECTED")
            .reduce((sum, b) => sum + b.totalPrice, 0);

          setStats({
            totalBookings: data.length,
            pending,
            confirmed,
            totalRevenue: revenue,
          });
        }
      });
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-luxury text-3xl text-gold mb-2">Dashboard</h1>
        <p className="text-gray-400 text-sm">
          Selamat datang kembali, Admin Origine Studio.
        </p>
      </div>

      {/* Grid Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Card Total Booking */}
        <div className="bg-maroon/10 border border-gold/20 rounded-2xl p-6 hover:border-gold transition-colors">
          <div className="flex justify-between items-start mb-4">
            <span className="text-gray-400 text-sm">Total Booking</span>
            <div className="p-2 bg-maroon rounded-lg">
              <svg
                className="w-5 h-5 text-gold"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>
          <h3 className="text-4xl font-bold text-white">
            {stats.totalBookings}
          </h3>
          <p className="text-green-400 text-xs mt-2">Semua waktu</p>
        </div>

        {/* Card Menunggu Approve */}
        <div className="bg-maroon/10 border border-gold/20 rounded-2xl p-6 hover:border-gold transition-colors">
          <div className="flex justify-between items-start mb-4">
            <span className="text-gray-400 text-sm">Menunggu Approve</span>
            <div className="p-2 bg-maroon rounded-lg">
              <svg
                className="w-5 h-5 text-yellow-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          <h3 className="text-4xl font-bold text-white">{stats.pending}</h3>
          <p className="text-yellow-400 text-xs mt-2">Perlu tindakan</p>
        </div>

        {/* Card Sudah Confirm */}
        <div className="bg-maroon/10 border border-gold/20 rounded-2xl p-6 hover:border-gold transition-colors">
          <div className="flex justify-between items-start mb-4">
            <span className="text-gray-400 text-sm">Booking Confirm</span>
            <div className="p-2 bg-maroon rounded-lg">
              <svg
                className="w-5 h-5 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          <h3 className="text-4xl font-bold text-white">{stats.confirmed}</h3>
          <p className="text-green-400 text-xs mt-2">Siap dilayani</p>
        </div>

        {/* Card Total Pendapatan */}
        <div className="bg-maroon/10 border border-gold/20 rounded-2xl p-6 hover:border-gold transition-colors">
          <div className="flex justify-between items-start mb-4">
            <span className="text-gray-400 text-sm">Estimasi Pendapatan</span>
            <div className="p-2 bg-maroon rounded-lg">
              <svg
                className="w-5 h-5 text-gold"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gold mt-2">
            Rp {stats.totalRevenue.toLocaleString("id-ID")}
          </h3>
          <p className="text-gray-500 text-xs mt-2">Dari booking aktif</p>
        </div>
      </div>

      {/* Quick Actions / Info */}
      <div className="bg-maroon/10 border border-gold/20 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-gold mb-4">Aktivitas Terbaru</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-800 pb-4">
            <div>
              <p className="text-white font-medium">
                Sistem berjalan dengan baik
              </p>
              <p className="text-gray-500 text-sm">
                Tidak ada error pada server
              </p>
            </div>
            <span className="text-xs text-green-400 bg-green-900/30 px-3 py-1 rounded-full">
              Online
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Kuota Harian Studio</p>
              <p className="text-gray-500 text-sm">
                Maksimal 3 klien per slot jam
              </p>
            </div>
            <span className="text-xs text-gold bg-maroon px-3 py-1 rounded-full">
              Aktif
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
