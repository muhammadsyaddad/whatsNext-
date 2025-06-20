import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');

    // Query untuk mendapatkan trending products dengan data marketplace
    let query = supabase
      .from('trending_products')
      .select(`
        *,
        product_volumes (
          volume,
          price_range,
          growth_percentage,
          marketplaces (
            name,
            logo_url
          )
        ),
        volume_history (
          volume,
          year,
          month,
          marketplaces (
            name
          )
        )
      `)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) throw error;

    // Transform data untuk frontend
    const transformedData = data?.map(product => {
      // Calculate total volume across all marketplaces
      const totalVolume = product.product_volumes.reduce((sum: number, pv: any) => sum + pv.volume, 0);
      
      // Calculate average growth
      const avgGrowth = product.product_volumes.length > 0 
        ? product.product_volumes.reduce((sum: number, pv: any) => sum + (pv.growth_percentage || 0), 0) / product.product_volumes.length
        : 0;

      // Prepare marketplace data
      const marketplaceData = product.product_volumes.map((pv: any) => ({
        id: pv.marketplaces?.name?.toLowerCase() || 'unknown',
        name: pv.marketplaces?.name || 'Unknown',
        volume: pv.volume,
        growth: pv.growth_percentage || 0,
        priceRange: pv.price_range,
        logoUrl: pv.marketplaces?.logo_url || '/placeholder-logo.png'
      }));

      // Prepare trend data for chart
      const trendData = product.volume_history
        .reduce((acc: any[], vh: any) => {
          const key = `${vh.year}-${vh.month.toString().padStart(2, '0')}`;
          const existing = acc.find(item => item.year === key);
          
          if (existing) {
            existing.volume += vh.volume;
          } else {
            acc.push({
              year: key,
              volume: vh.volume
            });
          }
          
          return acc;
        }, [])
        .sort((a, b) => a.year.localeCompare(b.year))
        .slice(-12); // Last 12 months

      return {
        id: product.id,
        title: product.title,
        volume: totalVolume > 1000 ? `${(totalVolume / 1000).toFixed(1)}k` : totalVolume.toString(),
        growth: `+${avgGrowth.toFixed(1)}%`,
        description: product.description,
        status: product.status,
        category: product.category,
        imageUrl: product.image_url,
        trendData,
        marketplaceData
      };
    });

    return NextResponse.json({
      success: true,
      data: transformedData
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trending products' },
      { status: 500 }
    );
  }
}

// POST endpoint untuk menambah produk trending baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, category, description, imageUrl } = body;

    const { data, error } = await supabase
      .from('trending_products')
      .insert({
        title,
        category,
        description,
        image_url: imageUrl,
        status: 'regular'
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data
    });

  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json(
      { error: 'Failed to create trending product' },
      { status: 500 }
    );
  }
}