"use client";

import { useState } from "react";

export default function ClientAreaPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setToken(data.token);
        fetchBookings(data.token);
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage("Gagal terhubung ke server");
    }
    setIsLoading(false);
  };

  const fetchBookings = async (tkn) => {
    const res = await fetch("/api/auth/bookings", {
      headers: { Authorization: `Bearer ${tkn}` },
    });
    const data = await res.json();
    setBookings(data);
  };

  // Tampilan jika belum login
  if (!token) {
    return (
      <main className="min-h-screen bg-dark flex items-center justify-center px-6 py-24">
        <div className="max-w-md w-full bg-maroon/10 border border-gold/30 rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-gold text-center mb-2">
            Client Area
          </h1>
          <p className="text-gray-400 text-center text-sm mb-6">
            Login untuk melihat hasil foto Anda
          </p>

          {message && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-500 text-red-300 rounded-lg text-sm text-center">
              {message}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-dark border border-gray-600 rounded-lg p-3 focus:outline-none focus:border-gold"
                placeholder="email@kamu.com"
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
                placeholder="Password saat booking"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gold text-dark py-3 rounded-full font-bold hover:bg-white transition-colors disabled:bg-gray-600">
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  // Tampilan jika sudah login
  return (
    <main className="min-h-screen bg-dark text-white px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gold">Riwayat Booking Anda</h1>
          <button
            onClick={() => setToken(null)}
            className="text-sm border border-gray-600 px-4 py-2 rounded-full hover:border-gold hover:text-gold transition-colors">
            Logout
          </button>
        </div>

        <div className="space-y-4">
          {bookings.length === 0 ? (
            <p className="text-gray-400 text-center">
              Belum ada riwayat booking.
            </p>
          ) : (
            bookings.map((b) => (
              <div
                key={b.id}
                className="bg-maroon/10 border border-gold/20 rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Booking #{b.id}
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    {b.bookingDate} • {b.bookingTime}
                  </p>
                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs ${b.status === "COMPLETED" ? "bg-teal-900/50 text-teal-300" : "bg-yellow-900/50 text-yellow-300"}`}>
                    Status: {b.status}
                  </span>
                </div>
                <div>
                  {b.status === "COMPLETED" && b.gdriveLink ? (
                    <a
                      href={b.gdriveLink}
                      target="_blank"
                      className="bg-gold text-dark px-6 py-3 rounded-full font-bold hover:bg-white transition-colors inline-block">
                      Lihat & Download Foto
                    </a>
                  ) : (
                    <span className="text-sm text-gray-500 italic">
                      Foto belum siap
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
