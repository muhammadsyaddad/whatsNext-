// app/api/trends/daily/route.ts

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { BigQuery } from '@google-cloud/bigquery';

// Inisialisasi Supabase Client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Inisialisasi BigQuery Client
// Akan otomatis membaca dari GOOGLE_APPLICATION_CREDENTIALS
const bigquery = new BigQuery();

async function getDailyGoogleTrendsFromBigQuery() {
  console.log('Menjalankan query ke BigQuery untuk tren harian...');

  // Query ini mengambil 25 istilah paling tren di Indonesia pada tanggal terakhir yang tersedia
  const query = `
      SELECT term
      FROM \`bigquery-public-data.google_trends.international_top_terms\`
      WHERE country_name = 'Indonesia' 
      AND refresh_date = (
        SELECT MAX(refresh_date) 
        FROM \`bigquery-public-data.google_trends.international_top_terms\`
        WHERE country_name = 'Indonesia'
      )
      ORDER BY rank ASC
      LIMIT 25;
  `;

  const options = {
    query: query,
    location: 'US', // Lokasi dataset publik Google Trends
  };

  try {
    const [rows] = await bigquery.query(options);
    console.log(`Query BigQuery berhasil, mendapatkan ${rows.length} baris.`);
    return rows.map(row => row.term);
  } catch (error) {
    console.error('ERROR saat query BigQuery:', error);
    throw error;
  }
}

export async function GET() {
  console.log('API endpoint tren harian via BigQuery dipanggil');

  try {
    const trendTitles = await getDailyGoogleTrendsFromBigQuery();

    if (!trendTitles || trendTitles.length === 0) {
      return NextResponse.json({ message: 'Tidak ada data tren harian yang ditemukan dari BigQuery.' }, { status: 404 });
    }

    console.log(`Berhasil mendapatkan ${trendTitles.length} tren dari BigQuery.`);

    // Menyimpan ke Supabase
    const productsToInsert = trendTitles.map(title => ({ 
        title: title,
        source: 'google_trends_daily' // Tandai sumbernya dengan jelas
    }));

    const { error } = await supabase
      .from('trending_products')
      .upsert(productsToInsert, { onConflict: 'title' });

    if (error) {
      throw new Error(`Supabase Error: ${error.message}`);
    }
    
    const successMessage = `STRATEGI BARU BERHASIL! ${trendTitles.length} sinyal harian dari BigQuery berhasil disimpan.`;
    console.log(successMessage);
    return NextResponse.json({ message: successMessage, data: productsToInsert });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan tidak diketahui';
    console.error('Terjadi kesalahan fatal di endpoint:', errorMessage);
    return NextResponse.json({ message: `Kesalahan Internal Server: ${errorMessage}` }, { status: 500 });
  }
}