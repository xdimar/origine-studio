import "./globals.css";

export const metadata = {
  title: "Origine Studio - Timeless Your Memories",
  description: "Modern Luxury Photo Studio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        {/* Font Playfair Display (Judul) & Inter (Teks) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        {/* Script Midtrans (Jangan dihapus) */}
        <script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={
            process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY
          }></script>
      </head>
      <body
        className="bg-dark text-white"
        style={{ fontFamily: "Inter, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
