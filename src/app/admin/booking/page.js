"use client";

import { useState, useEffect } from "react";

export default function AdminBookingPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const res = await fetch("/api/bookings");
    const data = await res.json();
    setBookings(data);
  };

  const handleUpdateStatus = async (id, status) => {
    await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: status }),
    });
    fetchBookings();
  };

  const handleComplete = async (id, link) => {
    if (!link) {
      alert("Masukkan link Google Drive terlebih dahulu!");
      return;
    }
    await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "COMPLETED", gdriveLink: link }),
    });
    fetchBookings();
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-luxury text-3xl text-gold mb-2">Booking Masuk</h1>
        <p className="text-gray-400 text-sm">
          Kelola pesanan klien, approve pembayaran, dan kirim link foto.
        </p>
      </div>

      <div className="bg-maroon/10 border border-gold/20 rounded-2xl overflow-hidden overflow-x-auto">
        <table className="w-full text-left min-w-[800px]">
          <thead className="bg-maroon text-gold border-b border-gold/30">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Nama Klien</th>
              <th className="p-4">Jadwal</th>
              <th className="p-4">Bayar</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-400">
                  Belum ada booking masuk.
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr
                  key={b.id}
                  className="border-b border-gold/10 hover:bg-maroon/20 transition-colors">
                  <td className="p-4 text-gray-400">#{b.id}</td>
                  <td className="p-4 font-semibold text-white">
                    {b.customerName}
                    <br />
                    <span className="text-xs text-gray-500">
                      {b.customerPhone}
                    </span>
                  </td>
                  <td className="p-4 text-gray-300">
                    {b.bookingDate}
                    <br />
                    {b.bookingTime}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${b.paymentMethod === "DP" ? "bg-blue-900/50 text-blue-300" : "bg-purple-900/50 text-purple-300"}`}>
                      {b.paymentMethod === "DP" ? "DP 50%" : "Bayar di Tempat"}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        b.status === "CONFIRMED"
                          ? "bg-green-900/50 text-green-300"
                          : b.status === "COMPLETED"
                            ? "bg-teal-900/50 text-teal-300"
                            : b.status === "REJECTED"
                              ? "bg-red-900/50 text-red-300"
                              : "bg-yellow-900/50 text-yellow-300"
                      }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {b.status === "PENDING" && (
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleUpdateStatus(b.id, "CONFIRMED")}
                          className="px-3 py-1 bg-green-700 hover:bg-green-600 rounded-md text-xs font-bold">
                          Approve
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(b.id, "REJECTED")}
                          className="px-3 py-1 bg-red-700 hover:bg-red-600 rounded-md text-xs font-bold">
                          Reject
                        </button>
                      </div>
                    )}

                    {b.status === "CONFIRMED" && (
                      <div className="flex gap-2 items-center justify-center">
                        <input
                          type="text"
                          placeholder="Paste Link G-Drive..."
                          className="bg-dark border border-gray-600 rounded-md p-1 text-xs w-40 text-white"
                          defaultValue={b.gdriveLink || ""}
                          id={`gdrive-${b.id}`}
                        />
                        <button
                          onClick={() =>
                            handleComplete(
                              b.id,
                              document.getElementById(`gdrive-${b.id}`).value,
                            )
                          }
                          className="px-3 py-1 bg-teal-700 hover:bg-teal-600 rounded-md text-xs font-bold whitespace-nowrap">
                          Selesai
                        </button>
                      </div>
                    )}

                    {b.status === "COMPLETED" && (
                      <a
                        href={b.gdriveLink}
                        target="_blank"
                        className="text-gold text-xs underline text-center block">
                        Lihat G-Drive
                      </a>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
