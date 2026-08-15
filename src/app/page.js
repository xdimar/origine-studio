"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State untuk menu mobile
  const [contactMsg, setContactMsg] = useState(""); // <-- Tambahan untuk form kontak

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen bg-dark flex flex-col overflow-x-hidden">
      {/* === NAVBAR === */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-dark/80 backdrop-blur-md border-b border-gold/20 py-3"
            : "bg-transparent py-5"
        }`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-luxury font-bold text-gold tracking-wider">
            Origine<span className="text-white">Studio</span>
          </Link>

          {/* Menu Desktop ( Layar Besar ) - Tombol Admin dihapus */}
          <div className="hidden md:flex space-x-10">
            <a
              href="#beranda"
              className="text-sm text-gray-300 hover:text-gold transition-colors uppercase tracking-widest">
              Beranda
            </a>
            <a
              href="#tentang"
              className="text-sm text-gray-300 hover:text-gold transition-colors uppercase tracking-widest">
              Tentang
            </a>
            <a
              href="#koleksi"
              className="text-sm text-gray-300 hover:text-gold transition-colors uppercase tracking-widest">
              Koleksi
            </a>
            <a
              href="#kontak"
              className="text-sm text-gray-300 hover:text-gold transition-colors uppercase tracking-widest">
              Kontak
            </a>{" "}
            {/* <-- TAMBAHKAN INI */}
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

          {/* Tombol Menu Hamburger ( Layar HP ) */}
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

        {/* Menu Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-dark/95 backdrop-blur-lg border-b border-gold/20 py-6 flex flex-col items-center space-y-6 animate-[fadeIn_0.3s_ease-in-out]">
            <a
              href="#beranda"
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-gold transition-colors uppercase tracking-widest">
              Beranda
            </a>
            <a
              href="#tentang"
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-gold transition-colors uppercase tracking-widest">
              Tentang
            </a>
            <a
              href="#koleksi"
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-gold transition-colors uppercase tracking-widest">
              Koleksi
            </a>
            <a
              href="#koleksi"
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-gold uppercase tracking-widest">
              Koleksi
            </a>
            <a
              href="#kontak"
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-gold uppercase tracking-widest">
              Kontak
            </a>{" "}
            {/* <-- TAMBAHKAN INI */}
            <Link
              href="/booking"
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-gold transition-colors uppercase tracking-widest">
              Booking
            </Link>
            <Link
              href="/client-area"
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-gold transition-colors uppercase tracking-widest">
              Client Area
            </Link>
          </div>
        )}
      </nav>

      {/* === HERO SECTION === */}
      <div
        id="beranda"
        className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-maroon to-black z-0"></div>
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[120px] z-0 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-maroon-light/20 rounded-full blur-[100px] z-0"></div>

        <div className="relative z-10 text-center px-6 animate-[fadeIn_1.5s_ease-in-out]">
          <div className="inline-block mb-4">
            <span className="text-gold text-xs md:text-sm tracking-[0.4em] uppercase border border-gold/30 px-4 py-1 rounded-full">
              Premium Photo Studio
            </span>
          </div>

          <h1 className="font-luxury text-5xl md:text-9xl font-bold text-white tracking-wider drop-shadow-2xl">
            Origine Studio
          </h1>

          <div className="my-6 flex items-center justify-center">
            <div className="h-[1px] w-10 md:w-20 bg-gold/50"></div>
            <p className="mx-3 md:mx-4 text-base md:text-xl text-gold tracking-[0.3em] uppercase font-light">
              Timeless your memories
            </p>
            <div className="h-[1px] w-10 md:w-20 bg-gold/50"></div>
          </div>

          <p className="text-gray-400 max-w-md mx-auto mb-10 text-sm md:text-base">
            Abadikan momen berharga Anda dengan kualitas seni fotographi yang
            mewah dan tak terlupakan.
          </p>

          <Link href="/booking">
            <button className="px-8 md:px-10 py-3 md:py-4 bg-maroon text-white rounded-full text-base md:text-lg font-semibold border border-gold hover:bg-gold hover:text-dark transition-all duration-300 shadow-lg shadow-maroon/50 hover:scale-105">
              booking sekarang!!
            </button>
          </Link>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <svg
            className="w-6 h-6 text-gold/70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>

      {/* === TENTANG KAMI (ABOUT) === */}
      <section id="tentang" className="py-24 px-6 border-t border-gold/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-gold text-sm tracking-[0.3em] uppercase">
              Tentang Kami
            </span>
            <h2 className="font-luxury text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              Elegansi dalam Setiap Bingkai
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4 text-sm md:text-base">
              Origine Studio lahir dari passion untuk mengabadikan momen paling
              berharga menjadi karya seni yang abadi. Kami menggabungkan konsep
              modern luxury dengan sentuhan estetika Gen-Z, menghadirkan
              pengalaman pemotretan yang tidak hanya menghasilkan foto, tetapi
              juga cerita.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8 text-sm md:text-base">
              Didukung oleh tim fotografer profesional dan perlengkapan studio
              kelas dunia, kami siap menjadikan setiap potret Anda sebuah
              mahakarya yang timeless.
            </p>
            <Link
              href="/layanan"
              className="inline-block text-gold border-b-2 border-gold hover:text-gold-light hover:border-gold-light transition-colors pb-1 tracking-wider text-sm md:text-base">
              Lihat Layanan Kami
            </Link>
          </div>

          <div className="relative h-[300px] md:h-[500px] group">
            <div className="absolute inset-0 bg-gradient-to-t from-maroon to-transparent rounded-3xl opacity-50 z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1542038784456-1ea4d2f6b6cc?q=80&w=1974&auto=format&fit=crop"
              alt="Origine Studio"
              className="w-full h-full object-cover rounded-3xl grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </section>

      {/* === KOLEKSI FOTO (PORTFOLIO) === */}
      <section
        id="koleksi"
        className="py-24 px-6 bg-maroon/5 border-t border-gold/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-gold text-sm tracking-[0.3em] uppercase">
              Portfolio
            </span>
            <h2 className="font-luxury text-4xl md:text-5xl font-bold text-white mt-4">
              Koleksi Terbaik Kami
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[150px] md:auto-rows-[200px]">
            <div className="col-span-2 row-span-2 group relative overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=2070&auto=format&fit=crop"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                alt="Foto 1"
              />
            </div>
            <div className="col-span-2 group relative overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1492288991661-058aa541ff43?q=80&w=2070&auto=format&fit=crop"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                alt="Foto 2"
              />
            </div>
            <div className="group relative overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1457972729786-0411a3b2b626?q=80&w=2070&auto=format&fit=crop"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                alt="Foto 3"
              />
            </div>
            <div className="group relative overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?q=80&w=2070&auto=format&fit=crop"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                alt="Foto 4"
              />
            </div>
            <div className="col-span-2 group relative overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1504636397512-0e506e4e5a82?q=80&w=2070&auto=format&fit=crop"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                alt="Foto 5"
              />
            </div>
          </div>
        </div>
      </section>

      {/* === KONTAK === */}
      <section
        id="kontak"
        className="py-24 px-6 border-t border-gold/10 bg-maroon/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Teks & Info Kontak */}
          <div>
            <span className="text-gold text-sm tracking-[0.3em] uppercase">
              Hubungi Kami
            </span>
            <h2 className="font-luxury text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              Mari Abadikan Momenmu
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Punya pertanyaan, ide konsep, atau ingin konsultasi paket foto?
              Tim Origine Studio siap membantu mewujudkan visi Anda. Hubungi
              kami sekarang!
            </p>

            <div className="space-y-6">
              {/* WhatsApp */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-maroon flex items-center justify-center text-gold border border-gold/30">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">
                    WhatsApp
                  </p>
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    className="text-white hover:text-gold transition-colors">
                    +62 812-3456-7890
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-maroon flex items-center justify-center text-gold border border-gold/30">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">
                    Email
                  </p>
                  <a
                    href="mailto:hello@originestudio.com"
                    className="text-white hover:text-gold transition-colors">
                    hello@originestudio.com
                  </a>
                </div>
              </div>

              {/* Alamat */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-maroon flex items-center justify-center text-gold border border-gold/30">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">
                    Lokasi Studio
                  </p>
                  <p className="text-white">
                    Jl. Senja Indah No. 12, Kota Kreatif
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Pesan */}
          <div className="bg-black/40 backdrop-blur-xl border border-gold/30 rounded-3xl p-8 shadow-2xl">
            {contactMsg ? (
              <div className="text-center py-10">
                <svg
                  className="w-16 h-16 text-gold mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Pesan Terkirim!
                </h3>
                <p className="text-gray-400">
                  Terima kasih telah menghubungi kami. Kami akan segera membalas
                  pesan Anda.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setContactMsg("terkirim");
                }}
                className="space-y-5">
                <h3 className="font-luxury text-2xl text-gold mb-4">
                  Kirim Pesan
                </h3>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nama kamu"
                    className="w-full bg-dark/80 border border-gray-700 rounded-xl py-3 px-4 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="email@kamu.com"
                    className="w-full bg-dark/80 border border-gray-700 rounded-xl py-3 px-4 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Pesan
                  </label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Tulis pertanyaan atau ide konsepmu di sini..."
                    className="w-full bg-dark/80 border border-gray-700 rounded-xl py-3 px-4 focus:outline-none focus:border-gold transition-colors resize-none"></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold text-dark py-3 rounded-xl font-bold hover:bg-white transition-colors tracking-wide">
                  Kirim Pesan
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="py-12 px-6 border-t border-gold/10 text-center">
        <h3 className="font-luxury text-3xl text-gold mb-4">Origine Studio</h3>
        <p className="text-gray-500 text-sm mb-4">Timeless Your Memories</p>
        <div className="flex justify-center space-x-4 md:space-x-6 mb-6 text-xs md:text-sm text-gray-400">
          <a href="#beranda" className="hover:text-gold transition-colors">
            Beranda
          </a>
          <a href="#tentang" className="hover:text-gold transition-colors">
            Tentang
          </a>
          <a href="#koleksi" className="hover:text-gold transition-colors">
            Koleksi
          </a>
          <Link href="/booking" className="hover:text-gold transition-colors">
            Booking
          </Link>
        </div>
        <p className="text-gray-600 text-xs">
          © {new Date().getFullYear()} Origine Studio. All Rights Reserved.
        </p>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
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
