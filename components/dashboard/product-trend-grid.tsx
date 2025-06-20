"use client"

import { TrendCard } from '@/components/shared/trend-card';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

// Import atau define ProductTrend type - sesuaikan dengan struktur dummyProductTrends
interface ProductTrend {
  id: string;
  title: string;
  volume: number;
  growth: number;
  description: string;
  status: string;
  trendData: { year: string; volume: number }[];
  // Tambahkan properties lain sesuai dengan dummyProductTrends
  imageUrl?: string;
}

interface ProductsGridProps {
  trends: ProductTrend[];
  selectedCategory?: string;
  onTryExample?: () => void;
}

export function ProductsGrid({ trends, selectedCategory = 'Semua', onTryExample }: ProductsGridProps) {
  if (trends.length === 0) {
    return (
      <div className="text-center py-12">
        <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">
          Belum ada produk trending
        </h3>
        <p className="text-muted-foreground mb-4">
          Mulai tambahkan produk untuk melihat tren marketplace Indonesia
        </p>
        {onTryExample && (
          <Button onClick={onTryExample}>
            Coba dengan "iPhone 15"
          </Button>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          Produk Trending
        </h2>
        <p className="text-sm text-muted-foreground">
          {trends.length} produk ditemukan
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {trends.map((product) => (
          <TrendCard
            key={product.id}
            title={product.title}
            volume={product.volume.toString()}
            growth={product.growth.toString()}
            description={product.description}
            status={product.status as "exploding" | "regular"}
            trendData={product.trendData}
            marketplaceData={[]} // Provide empty array if not available
            category="General" // Provide default category if not available
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </>
  );
}