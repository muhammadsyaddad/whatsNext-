import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import puppeteer from 'puppeteer';

type TrendingProduct = {
  id: string;
  title: string;
  category: string;
  description: string;
  status: 'exploding' | 'regular';
};

type ProductVolume = {
  product_id: string;
  marketplace_id: string;
  volume: number;
  price_range: string;
  growth_percentage: number;
  recorded_date: string;
};

const marketplaceIdMap: Record<string, string> = {
  shopee: 'shopee-id',
  tokopedia: 'tokopedia-id',
  lazada: 'lazada-id',
};

function calculateAvgPrice(results: any[]) {
  const prices = results
    .map(item => {
      const priceStr = item.price.replace(/[^\d]/g, '');
      return parseInt(priceStr) || 0;
    })
    .filter(price => price > 0);

  return prices.length > 0
    ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
    : 0;
}

async function scrapeShopee(keyword: string) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  try {
    const url = `https://shopee.co.id/search?keyword=${encodeURIComponent(keyword)}`;
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.waitForSelector('[data-sqe="item"]', { timeout: 10000 });

    const results = await page.evaluate(() => {
      const items = document.querySelectorAll('[data-sqe="item"]');
      return Array.from(items).slice(0, 20).map(item => {
        const title = item.querySelector('.Cve6sh')?.textContent || '';
        const price = item.querySelector('.r6l1aG')?.textContent || '';
        const sold = item.querySelector('.r6l1aG + div')?.textContent || '';
        return { title, price, sold };
      });
    });

    await browser.close();
    return {
      marketplace: 'Shopee',
      totalResults: results.length,
      avgPrice: calculateAvgPrice(results),
      results
    };
  } catch (error) {
    await browser.close();
    throw error;
  }
}

async function scrapeTokopedia(keyword: string) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  try {
    const url = `https://www.tokopedia.com/search?st=product&q=${encodeURIComponent(keyword)}`;
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.waitForSelector('[data-testid="divProductWrapper"]', { timeout: 10000 });

    const results = await page.evaluate(() => {
      const items = document.querySelectorAll('[data-testid="divProductWrapper"]');
      return Array.from(items).slice(0, 20).map(item => {
        const title = item.querySelector('[data-testid="spnSRPProdName"]')?.textContent || '';
        const price = item.querySelector('[data-testid="spnSRPProdPrice"]')?.textContent || '';
        const sold = item.querySelector('[data-testid="spnSRPProdBasicInfo"]')?.textContent || '';
        return { title, price, sold };
      });
    });

    await browser.close();
    return {
      marketplace: 'Tokopedia',
      totalResults: results.length,
      avgPrice: calculateAvgPrice(results),
      results
    };
  } catch (error) {
    await browser.close();
    throw error;
  }
}

async function scrapeLazada(keyword: string) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  try {
    const url = `https://www.lazada.co.id/catalog/?q=${encodeURIComponent(keyword)}`;
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.waitForSelector('[data-qa-locator="product-item"]', { timeout: 10000 });

    const results = await page.evaluate(() => {
      const items = document.querySelectorAll('[data-qa-locator="product-item"]');
      return Array.from(items).slice(0, 20).map(item => {
        const title = item.querySelector('.RfADt')?.textContent || '';
        const price = item.querySelector('.ooOxS')?.textContent || '';
        const sold = item.querySelector('.eXlzM')?.textContent || '';
        return { title, price, sold };
      });
    });

    await browser.close();
    return {
      marketplace: 'Lazada',
      totalResults: results.length,
      avgPrice: calculateAvgPrice(results),
      results
    };
  } catch (error) {
    await browser.close();
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { keyword } = await request.json();

    if (!keyword) {
      return NextResponse.json({ error: 'Keyword is required' }, { status: 400 });
    }

    const [shopeeData, tokopediaData, lazadaData] = await Promise.allSettled([
      scrapeShopee(keyword),
      scrapeTokopedia(keyword),
      scrapeLazada(keyword)
    ]);

    const results = {
      shopee: shopeeData.status === 'fulfilled' ? shopeeData.value : null,
      tokopedia: tokopediaData.status === 'fulfilled' ? tokopediaData.value : null,
      lazada: lazadaData.status === 'fulfilled' ? lazadaData.value : null
    };

    const { data: product, error: productError } = await supabase
      .from('trending_products')
      .insert({
        title: keyword,
        category: 'Electronics',
        description: `Trending product: ${keyword}`,
        status: results.shopee?.totalResults && results.shopee.totalResults > 100
          ? 'exploding'
          : 'regular'
      })
      .select()
      .single<TrendingProduct>();

    if (productError) throw productError;

    const volumeData: ProductVolume[] = [];

    const today = new Date().toISOString().split('T')[0];

    if (results.shopee) {
      volumeData.push({
        product_id: product.id,
        marketplace_id: marketplaceIdMap['shopee'],
        volume: results.shopee.totalResults,
        price_range: `Rp ${results.shopee.avgPrice.toLocaleString('id-ID')}`,
        growth_percentage: Math.random() * 50,
        recorded_date: today
      });
    }

    if (results.tokopedia) {
      volumeData.push({
        product_id: product.id,
        marketplace_id: marketplaceIdMap['tokopedia'],
        volume: results.tokopedia.totalResults,
        price_range: `Rp ${results.tokopedia.avgPrice.toLocaleString('id-ID')}`,
        growth_percentage: Math.random() * 50,
        recorded_date: today
      });
    }

    if (results.lazada) {
      volumeData.push({
        product_id: product.id,
        marketplace_id: marketplaceIdMap['lazada'],
        volume: results.lazada.totalResults,
        price_range: `Rp ${results.lazada.avgPrice.toLocaleString('id-ID')}`,
        growth_percentage: Math.random() * 50,
        recorded_date: today
      });
    }

    if (volumeData.length > 0) {
      const { error: volumeError } = await supabase
        .from('product_volumes')
        .insert<ProductVolume[]>(volumeData);

      if (volumeError) throw volumeError;
    }

    return NextResponse.json({
      success: true,
      data: results,
      productId: product.id
    });

  } catch (error) {
    console.error('Scraping error:', error);
    return NextResponse.json(
      { error: 'Failed to scrape marketplace data' },
      { status: 500 }
    );
  }
}
