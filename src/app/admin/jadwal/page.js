"use client";

import { useState, useEffect } from "react";

export default function AdminJadwalPage() {
  const [holidays, setHolidays] = useState([]);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    const res = await fetch("/api/holidays");
    const data = await res.json();
    setHolidays(data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!date) return;

    const res = await fetch("/api/holidays", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, description }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Tanggal libur berhasil ditambahkan!");
      setDate("");
      setDescription("");
      fetchHolidays();
    } else {
      setMessage(data.error || "Gagal menambah tanggal.");
    }
  };

  const handleDelete = async (id) => {
    if (
      confirm(
        "Hapus tanggal libur ini? Studio akan buka kembali di tanggal ini.",
      )
    ) {
      await fetch(`/api/holidays/${id}`, { method: "DELETE" });
      fetchHolidays();
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-luxury text-3xl text-gold mb-2">Jadwal Studio</h1>
        <p className="text-gray-400 text-sm">
          Atur tanggal di mana studio tutup/libur. Klien tidak dapat melakukan
          booking pada tanggal ini.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Tambah Libur */}
        <div className="bg-maroon/10 border border-gold/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gold mb-4">
            Tandai Tanggal Libur
          </h2>

          {message && (
            <div className="mb-4 p-3 bg-green-900/50 border border-green-500 text-green-300 rounded-lg text-sm">
              {message}
            </div>
          )}

          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Pilih Tanggal
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-dark text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:border-gold [color-scheme:dark]"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Keterangan (Opsional)
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Misal: Libur Nasional, Cuti Tahunan, dll"
                className="w-full bg-dark border border-gray-600 rounded-lg p-3 focus:outline-none focus:border-gold"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gold text-dark py-3 rounded-full font-bold hover:bg-white transition-colors">
              Kunci Tanggal
            </button>
          </form>
        </div>

        {/* List Tanggal Libur */}
        <div className="bg-maroon/10 border border-gold/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gold mb-4">
            Daftar Tanggal Tutup ({holidays.length})
          </h2>
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {holidays.length === 0 ? (
              <p className="text-center text-gray-500 py-8 text-sm">
                Studio buka setiap hari. Belum ada tanggal libur.
              </p>
            ) : (
              holidays.map((h) => (
                <div
                  key={h.id}
                  className="flex justify-between items-center bg-dark/50 border border-gray-700 rounded-lg p-4">
                  <div>
                    <p className="font-bold text-white">{h.date}</p>
                    <p className="text-xs text-gray-400">
                      {h.description || "Tanpa keterangan"}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(h.id)}
                    className="px-3 py-1 bg-red-700 hover:bg-red-600 rounded-md text-xs font-bold">
                    Buka Kembali
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
