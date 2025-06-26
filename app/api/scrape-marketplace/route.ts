// 3. FILE: app/api/scrape-marketplace/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Simplified scraping function (tanpa puppeteer untuk testing)
async function mockScrapeMarketplace(keyword: string) {
  // Mock data untuk testing - nanti bisa diganti dengan puppeteer
  const mockResults = {
    shopee: {
      marketplace: 'Shopee',
      totalResults: Math.floor(Math.random() * 500) + 100,
      avgPrice: Math.floor(Math.random() * 1000000) + 50000,
      results: []
    },
    tokopedia: {
      marketplace: 'Tokopedia', 
      totalResults: Math.floor(Math.random() * 400) + 80,
      avgPrice: Math.floor(Math.random() * 1200000) + 60000,
      results: []
    },
    lazada: {
      marketplace: 'Lazada',
      totalResults: Math.floor(Math.random() * 300) + 50,
      avgPrice: Math.floor(Math.random() * 800000) + 40000,
      results: []
    }
  };

  return mockResults;
}

export async function POST(request: NextRequest) {
  try {
    const { keyword } = await request.json();

    if (!keyword) {
      return NextResponse.json({ error: 'Keyword is required' }, { status: 400 });
    }

    // Scrape data (menggunakan mock untuk testing)
    const results = await mockScrapeMarketplace(keyword);

    // Insert product ke database
    const { data: product, error: productError } = await supabase
      .from('trending_products')
      .insert({
        title: keyword,
        category: 'Electronics',
        description: `Trending product: ${keyword}`,
        status: (results.shopee?.totalResults || 0) > 200 ? 'exploding' : 'regular'
      })
      .select()
      .single();

    if (productError) {
      console.error('Product insert error:', productError);
      throw productError;
    }

    // Insert volume data untuk setiap marketplace
    const volumeData = [];
    const today = new Date().toISOString().split('T')[0];

    if (results.shopee) {
      volumeData.push({
        product_id: product.id,
        marketplace_id: 'shopee-id',
        volume: results.shopee.totalResults,
        price_range: `Rp ${results.shopee.avgPrice.toLocaleString('id-ID')}`,
        growth_percentage: Math.random() * 50,
        recorded_date: today
      });
    }

    if (results.tokopedia) {
      volumeData.push({
        product_id: product.id,
        marketplace_id: 'tokopedia-id', 
        volume: results.tokopedia.totalResults,
        price_range: `Rp ${results.tokopedia.avgPrice.toLocaleString('id-ID')}`,
        growth_percentage: Math.random() * 50,
        recorded_date: today
      });
    }

    if (results.lazada) {
      volumeData.push({
        product_id: product.id,
        marketplace_id: 'lazada-id',
        volume: results.lazada.totalResults, 
        price_range: `Rp ${results.lazada.avgPrice.toLocaleString('id-ID')}`,
        growth_percentage: Math.random() * 50,
        recorded_date: today
      });
    }

    if (volumeData.length > 0) {
      const { error: volumeError } = await supabase
        .from('product_volumes')
        .insert(volumeData);

      if (volumeError) {
        console.error('Volume insert error:', volumeError);
        // Don't throw, product sudah berhasil dibuat
      }
    }

    return NextResponse.json({
      success: true,
      data: results,
      productId: product.id
    });

  } catch (error) {
    console.error('Scraping error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to scrape marketplace data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}