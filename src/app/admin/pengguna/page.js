"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminUsersPage() {
  const [admins, setAdmins] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setAdmins(data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage("Admin baru berhasil ditambahkan!");
      setEmail("");
      setPassword("");
      fetchAdmins();
    } else {
      setMessage(data.error || "Gagal menambah admin.");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin hapus akun admin ini?")) {
      await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      fetchAdmins();
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-luxury text-3xl text-gold mb-2">Kelola Admin</h1>
        <p className="text-gray-400 text-sm">
          Daftar akun yang memiliki akses ke panel ini.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Form Tambah Admin */}
        <div className="bg-maroon/10 border border-gold/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gold mb-4">
            Tambah Admin Baru
          </h2>

          {message && (
            <div className="mb-4 p-3 bg-green-900/50 border border-green-500 text-green-300 rounded-lg text-sm">
              {message}
            </div>
          )}

          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Email Admin
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-dark border border-gray-600 rounded-lg p-3 focus:outline-none focus:border-gold"
                placeholder="admin2@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-dark border border-gray-600 rounded-lg p-3 focus:outline-none focus:border-gold"
                placeholder="Minimal 6 karakter"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gold text-dark py-3 rounded-full font-bold hover:bg-white transition-colors">
              Daftarkan Admin
            </button>
          </form>
        </div>

        {/* Info Keamanan */}
        <div className="bg-maroon/10 border border-gold/20 rounded-2xl p-6 flex flex-col justify-center">
          <div className="text-center">
            <svg
              className="w-12 h-12 text-gold mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
            <h3 className="text-xl font-bold text-white mb-2">
              Keamanan Terjamin
            </h3>
            <p className="text-gray-400 text-sm">
              Halaman pendaftaran publik (/admin/register) telah dinonaktifkan
              otomatis setelah akun pertama dibuat. Hanya Admin yang sudah login
              yang bisa menambahkan admin baru.
            </p>
          </div>
        </div>
      </div>

      {/* Tabel Daftar Admin */}
      <div className="bg-maroon/10 border border-gold/20 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-maroon text-gold border-b border-gold/30">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Email Admin</th>
              <th className="p-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {admins.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-8 text-center text-gray-400">
                  Tidak ada admin.
                </td>
              </tr>
            ) : (
              admins.map((a) => (
                <tr
                  key={a.id}
                  className="border-b border-gold/10 hover:bg-maroon/20 transition-colors">
                  <td className="p-4 text-gray-400">#{a.id}</td>
                  <td className="p-4 font-semibold text-white">{a.email}</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="px-4 py-1 bg-red-700 hover:bg-red-600 rounded-md text-xs font-bold">
                      Hapus
                    </button>
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
