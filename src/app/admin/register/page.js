"use client";
import { useState } from "react";
import Link from "next/link";

export default function AdminRegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/admin/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage("Akun admin berhasil dibuat! Silakan login.");
      setEmail("");
      setPassword("");
    } else {
      setMessage(data.error);
    }
  };

  return (
    <main className="min-h-screen bg-dark flex items-center justify-center px-6 py-24 relative overflow-hidden">
      {/* Efek Background */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-maroon/30 rounded-full blur-[150px] z-0 animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[120px] z-0"></div>

      <div className="relative z-10 w-full max-w-md bg-black/40 backdrop-blur-xl border border-gold/30 rounded-3xl p-8 md:p-10 shadow-2xl">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="font-luxury text-3xl text-gold tracking-wider">
            Origine<span className="text-white">Admin</span>
          </Link>
          <p className="text-gray-400 text-sm mt-2 tracking-wide">
            Daftar akun pemilik studio
          </p>
        </div>

        {message && (
          <div className="mb-6 p-3 bg-blue-900/50 border border-blue-500 text-blue-300 rounded-lg text-sm text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          {/* Input Email */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </span>
              <input
                type="email"
                placeholder="admin@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-dark/80 border border-gray-700 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-gold transition-colors"
                required
              />
            </div>
          </div>

          {/* Input Password */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Password</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </span>
              <input
                type="password"
                placeholder="Minimal 6 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-dark/80 border border-gray-700 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-gold transition-colors"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gold text-dark py-3 rounded-xl font-bold hover:bg-white transition-colors tracking-wide">
            Daftar Sekarang
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="px-4 text-xs text-gray-500 uppercase">atau</span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        {/* Tombol Kembali ke Login */}
        <Link
          href="/admin/login"
          className="block w-full text-center py-3 border border-gold/50 text-gold rounded-xl font-semibold hover:bg-maroon hover:border-maroon transition-colors tracking-wide">
          Kembali ke Login
        </Link>
      </div>
    </main>
  );
}
