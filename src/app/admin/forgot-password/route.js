"use client";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/admin/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage("Password berhasil diubah! Silakan login.");
    } else {
      setMessage(data.error);
    }
  };

  return (
    <main className="min-h-screen bg-dark flex items-center justify-center px-6 py-24 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-maroon/30 rounded-full blur-[150px] z-0 animate-pulse"></div>

      <div className="relative z-10 w-full max-w-md bg-black/40 backdrop-blur-xl border border-gold/30 rounded-3xl p-8 md:p-10 shadow-2xl">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="font-luxury text-3xl text-gold tracking-wider">
            Origine<span className="text-white">Admin</span>
          </Link>
          <p className="text-gray-400 text-sm mt-2 tracking-wide">
            Reset password akun admin
          </p>
        </div>

        {message && (
          <div
            className={`mb-6 p-3 rounded-lg text-sm text-center ${message.includes("berhasil") ? "bg-green-900/50 border border-green-500 text-green-300" : "bg-red-900/50 border border-red-500 text-red-300"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleReset} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Email Admin
            </label>
            <input
              type="email"
              placeholder="admin@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-dark/80 border border-gray-700 rounded-xl py-3 px-4 focus:outline-none focus:border-gold transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Password Baru
            </label>
            <input
              type="password"
              placeholder="Minimal 6 karakter"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-dark/80 border border-gray-700 rounded-xl py-3 px-4 focus:outline-none focus:border-gold transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gold text-dark py-3 rounded-xl font-bold hover:bg-white transition-colors tracking-wide">
            Reset Password
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/admin/login"
            className="text-sm text-gray-400 hover:text-gold transition-colors">
            Kembali ke Login
          </Link>
        </div>
      </div>
    </main>
  );
}
