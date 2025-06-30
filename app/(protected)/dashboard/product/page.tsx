// FILE: page.tsx (Updated)
"use client"; // <- Ini penting untuk membuat halaman menjadi Client Component

import { useEffect, useState } from "react";

// Tipe data untuk sinyal yang kita terima dari API
interface TrendSignal {
  query: string;
  source: string;
}

export default function ProductPage() {

  // State untuk menyimpan daftar tren
  const [trends, setTrends] = useState<TrendSignal[]>([]);
  // State untuk melacak status loading
  const [isLoading, setIsLoading] = useState(true);
  // State untuk menyimpan pesan error jika terjadi
  const [error, setError] = useState<string | null>(null);

  // useEffect akan berjalan saat komponen pertama kali dimuat
  useEffect(() => {
    // Fungsi untuk mengambil data dari API kita
    async function fetchGoogleTrends() {
      try {
        // Panggil endpoint API yang sudah kita buat
        const response = await fetch('/api/trends/google');

        if (!response.ok) {
          // Jika respons tidak OK (bukan status 2xx), lempar error
          throw new Error(`Gagal mengambil data: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Simpan data yang berhasil didapat ke dalam state
        setTrends(data.data || []);
      } catch (err: any) {
        // Jika terjadi error saat fetching, simpan pesan errornya
        setError(err.message);
        console.error("Error fetching trends:", err);
      } finally {
        // Apapun hasilnya (sukses atau gagal), hentikan loading
        setIsLoading(false);
      }
    }

    // Panggil fungsi tersebut
    fetchGoogleTrends();
  }, []); // Array kosong `[]` berarti useEffect hanya berjalan sekali

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          🔥 Tren E-commerce Terbaru
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          Daftar kata kunci yang sedang naik daun, diambil langsung dari Google Trends Indonesia.
        </p>
      </div>

      {/* Tampilkan konten berdasarkan state */}
      <div className="mt-8">
        {isLoading && <p>Memuat data tren...</p>}

        {error && <p className="text-red-500">Terjadi kesalahan: {error}</p>}
        
        {!isLoading && !error && (
          <div className="grid gap-4">
            {trends.length > 0 ? (
              <ul className="list-disc pl-5">
                {trends.map((trend, index) => (
                  <li key={index} className="mb-2 text-lg">
                    {trend.query}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Tidak ada tren yang ditemukan saat ini.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}