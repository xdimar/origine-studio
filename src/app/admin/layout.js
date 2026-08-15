"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  // Jangan tampilkan sidebar kalau di halaman login/register/forgot
  if (
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/admin/register") ||
    pathname.startsWith("/admin/forgot-password")
  ) {
    return <>{children}</>;
  }

  const handleLogout = () => {
    document.cookie =
      "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/admin/login");
  };

  const menu = [
    { name: "Dashboard", href: "/admin" },
    { name: "Booking Masuk", href: "/admin/booking" },
    { name: "Kelola Layanan", href: "/admin/layanan" },
    { name: "Kelola Kategori", href: "/admin/kategori" },
    { name: "Jadwal Studio", href: "/admin/jadwal" },
    { name: "Jam Operasional", href: "/admin/jam-operasional" },
    { name: "Kelola Admin", href: "/admin/pengguna" },
  ];

  return (
    <div className="min-h-screen bg-dark text-white flex flex-col md:flex-row">
      {/* === Topbar untuk Mobile === */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gold/20 py-4 px-6 flex justify-between items-center">
        <Link
          href="/admin"
          className="font-luxury text-xl text-gold tracking-wider">
          Origine<span className="text-white">Admin</span>
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gold z-50">
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

      {/* Overlay gelap saat menu mobile dibuka */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}></div>
      )}

      {/* === SIDEBAR KIRI === */}
      <aside
        className={`fixed z-50 top-0 left-0 h-full w-64 bg-black/40 border-r border-gold/20 flex flex-col transition-transform duration-300 md:translate-x-0 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6 border-b border-gold/20 hidden md:block">
          <h1 className="font-luxury text-2xl text-gold tracking-wider">
            Origine<span className="text-white">Admin</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">Studio Management</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 mt-16 md:mt-0 overflow-y-auto">
          {menu.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)} // Tutup menu saat diklik di HP
                className={`block py-3 px-4 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-maroon text-gold font-semibold border-l-4 border-gold"
                    : "text-gray-400 hover:bg-maroon/20 hover:text-white border-l-4 border-transparent"
                }`}>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gold/20">
          <button
            onClick={handleLogout}
            className="w-full text-left py-3 px-4 rounded-lg text-gray-500 hover:bg-red-900/30 hover:text-red-400 transition-colors flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* === AREA KONTEN KANAN === */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto pt-24 md:pt-8 h-screen">
        {children}
      </main>
    </div>
  );
}
