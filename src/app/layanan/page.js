"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function LayananPage() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [resServices, resCategories] = await Promise.all([
        fetch("/api/services").then((res) => res.json()),
        fetch("/api/categories").then((res) => res.json()),
      ]);

      setServices(resServices);
      setCategories([{ id: 0, name: "Semua" }, ...resCategories]);
    };
    fetchData();
  }, []);

  // Filter layanan berdasarkan kategori DAN kata kunci pencarian
  const filteredServices = services.filter((service) => {
    const matchCategory =
      activeCategory === "Semua" || service.category === activeCategory;
    const matchSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

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
              className="text-sm text-gray-300 hover:text-gold transition-colors uppercase tracking-widest">
              Beranda
            </Link>
            <Link
              href="/layanan"
              className="text-sm text-gold transition-colors uppercase tracking-widest">
              Layanan
            </Link>
            <Link
              href="/booking"
              className="text-sm text-gray-300 hover:text-gold transition-colors uppercase tracking-widest">
              Booking
            </Link>
            <Link
              href="/client-area"
              className="text-sm text-gray-300 hover:text-gold transition-colors uppercase tracking-widest">
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
              className="text-gold uppercase tracking-widest">
              Layanan
            </Link>
            <Link
              href="/booking"
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-gold uppercase tracking-widest">
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

      {/* === KONTEN LAYANAN === */}
      <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-gold text-sm tracking-[0.3em] uppercase">
            Pricelist & Services
          </span>
          <h1 className="font-luxury text-4xl md:text-6xl font-bold text-white mt-4 mb-4">
            Layanan Kami
          </h1>
          <div className="w-24 h-1 bg-maroon mx-auto rounded-full mb-4"></div>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            Temukan paket foto yang sesuai dengan momen spesialmu. Kualitas
            premium, hasil memuaskan.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12 relative">
          <input
            type="text"
            placeholder="Cari layanan... (misal: Wisuda, Basic)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark/80 border border-gray-700 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:border-gold transition-colors text-white placeholder:text-gray-600"
          />
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </span>
        </div>

        {/* Filter Kategori Horizontal Scroll (Swipeable) */}
        <div className="flex gap-3 mb-16 overflow-x-auto pb-4 px-2 -mx-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.name)}
              className={`px-6 py-2 rounded-full border text-sm whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat.name
                  ? "bg-maroon text-white border-gold shadow-lg shadow-maroon/50"
                  : "bg-transparent text-gray-400 border-gray-700 hover:border-gold hover:text-gold"
              }`}>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid Kartu Layanan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-20">
              <p className="text-xl mb-2">Layanan tidak ditemukan</p>
              <p className="text-sm">Coba kata kunci atau kategori lain.</p>
            </div>
          ) : (
            filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-maroon/10 backdrop-blur-sm border border-gold/20 rounded-2xl p-8 flex flex-col items-center text-center hover:border-gold hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-gold/10 group">
                <span className="text-xs text-gold uppercase tracking-widest mb-3 bg-dark/50 px-3 py-1 rounded-full">
                  {service.category}
                </span>
                <h2 className="font-luxury text-3xl font-bold text-white mb-2 group-hover:text-gold transition-colors">
                  {service.name}
                </h2>
                <p className="text-gray-400 text-sm mb-6 min-h-[40px]">
                  {service.description}
                </p>

                <div className="mb-8 flex flex-col items-center">
                  {service.discount > 0 ? (
                    <>
                      <span className="inline-block bg-red-900/60 text-red-300 text-xs px-3 py-1 rounded-full mb-3 uppercase tracking-wider font-bold">
                        Promo {service.discount}%
                      </span>
                      {/* Harga Asli (Coret) di atas, ukuran lebih kecil di HP */}
                      <span className="text-base md:text-lg text-gray-500 line-through mb-1">
                        Rp {service.price.toLocaleString("id-ID")}
                      </span>
                      {/* Harga Diskon di bawah, ukuran menyesuaikan layar */}
                      <span className="text-3xl md:text-4xl font-bold text-gold">
                        Rp{" "}
                        {Math.round(
                          service.price -
                            service.price * (service.discount / 100),
                        ).toLocaleString("id-ID")}
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl md:text-4xl font-bold text-gold">
                      Rp {service.price.toLocaleString("id-ID")}
                    </span>
                  )}
                  <div className="flex justify-center gap-4 mt-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-gold/70"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      {service.durationMinutes} Menit
                    </span>
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-gold/70"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                      Max {service.maxPax} Orang
                    </span>
                  </div>
                </div>

                <Link
                  href={`/booking?serviceId=${service.id}`}
                  className="mt-auto w-full">
                  <button className="w-full px-8 py-3 bg-maroon text-white rounded-full border border-gold/50 hover:bg-gold hover:text-dark transition-all duration-300 font-semibold tracking-wide">
                    Booking Sekarang
                  </button>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>

      {/* CSS untuk menyembunyikan scrollbar tapi tetap bisa di-swipe */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
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
