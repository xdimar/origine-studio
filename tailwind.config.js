/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tema Origine Studio
        maroon: {
          DEFAULT: '#5C0A0A', // Maroon peat
          light: '#800020', // Maroon lebih terang
        },
        gold: {
          DEFAULT: '#D4AF37', // Emas
          light: '#F4E4BC', // Emas pucat
        },
        dark: '#121212', // Hitam peat
      },
      fontFamily: {
        // Nanti kita tambah font keren di sini
      }
    },
  },
  plugins: [],
}