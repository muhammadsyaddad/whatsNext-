// app/api/signals/tiktok/route.ts

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';

// Inisialisasi Supabase Client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  console.log('API Pengumpul Sinyal TikTok dipanggil');

  try {
    const apiKey = process.env.SCRAPER_API_KEY;
    if (!apiKey) {
      throw new Error('SCRAPER_API_KEY tidak ditemukan.');
    }

    const targetUrl = 'https://www.tiktok.com/trending';
    const scraperApiUrl = `http://api.scraperapi.com?api_key=${apiKey}&url=${encodeURIComponent(targetUrl)}&render=true`;

    console.log(`Memanggil ScraperAPI untuk URL TikTok: ${targetUrl}`);
    const response = await fetch(scraperApiUrl);

    if (!response.ok) {
      throw new Error(`ScraperAPI gagal: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const videoTitles: string[] = [];
    const titleSelector = '[data-e2e="video-desc"]';

    console.log(`Mencari deskripsi video dengan selector: "${titleSelector}"`);
    
    $(titleSelector).each((_index, element) => {
      const title = $(element).text().trim();
      if (title) {
        const cleanTitle = title.replace(/#\w+/g, '').replace(/@\w+/g, '').trim();
        if (cleanTitle) {
            videoTitles.push(cleanTitle);
        }
      }
    });

    if (videoTitles.length === 0) {
      return NextResponse.json({ message: 'Gagal mengekstrak konten dari TikTok.' }, { status: 404 });
    }
    
    const uniqueTitles = Array.from(new Set(videoTitles));
    console.log(`BERHASIL! Mengekstrak ${uniqueTitles.length} deskripsi video unik.`);

    // --- Menyimpan Sinyal ke Supabase ---
    console.log('Menyimpan sinyal TikTok ke tabel "signals"...');

    // PERBAIKAN: Menghapus baris 'status' agar sesuai dengan skema Anda
    const signalsToInsert = uniqueTitles.map(title => ({ 
      keyword: title,
      source: 'tiktok_trending'
    }));

    const { error } = await supabase
      .from('signals')
      .upsert(signalsToInsert, { onConflict: 'keyword' });

    if (error) {
      throw new Error(`Supabase Error: ${error.message}`);
    }
    
    const successMessage = `Luar Biasa! ${uniqueTitles.length} sinyal dari TikTok berhasil disimpan.`;
    console.log(successMessage);
    return NextResponse.json({ message: successMessage, data: signalsToInsert });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan tidak diketahui';
    console.error('Terjadi kesalahan fatal:', errorMessage);
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}