"use client";

import { useState, useEffect } from "react";

export default function AdminJamOperasionalPage() {
  const [slots, setSlots] = useState([]);
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    const res = await fetch("/api/timeslots");
    const data = await res.json();
    setSlots(data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!time) return;

    const res = await fetch("/api/timeslots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ time }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage(`Jam ${time} berhasil ditambahkan!`);
      setTime("");
      fetchSlots();
    } else {
      setMessage(data.error || "Gagal menambah jam.");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Hapus slot jam ini?")) {
      await fetch(`/api/timeslots/${id}`, { method: "DELETE" });
      fetchSlots();
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-luxury text-3xl text-gold mb-2">Jam Operasional</h1>
        <p className="text-gray-400 text-sm">
          Atur jam (slot waktu) yang tersedia untuk klien melakukan booking.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Tambah Jam */}
        <div className="bg-maroon/10 border border-gold/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gold mb-4">
            Tambah Slot Jam Baru
          </h2>

          {message && (
            <div className="mb-4 p-3 bg-green-900/50 border border-green-500 text-green-300 rounded-lg text-sm">
              {message}
            </div>
          )}

          <form onSubmit={handleAdd} className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm text-gray-400 mb-1">
                Pilih Jam
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-dark text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:border-gold [color-scheme:dark]"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-gold text-dark py-3 px-6 rounded-full font-bold hover:bg-white transition-colors h-[50px]">
              Tambah
            </button>
          </form>
          <p className="text-gray-500 text-xs mt-4">
            Contoh: 10:00, 10:30, 13:00, dll.
          </p>
        </div>

        {/* List Jam Operasional */}
        <div className="bg-maroon/10 border border-gold/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gold mb-4">
            Daftar Slot Tersedia ({slots.length})
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {slots.length === 0 ? (
              <p className="col-span-full text-center text-gray-500 py-8 text-sm">
                Belum ada jam diatur.
              </p>
            ) : (
              slots.map((s) => (
                <div
                  key={s.id}
                  className="relative group bg-dark/50 border border-gray-700 rounded-lg p-3 text-center">
                  <span className="text-white font-medium">{s.time}</span>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="absolute -top-2 -right-2 bg-red-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    x
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
