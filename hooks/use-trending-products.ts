import { useState, useEffect } from 'react';

interface MarketplaceData {
  id: string;
  name: string;
  volume: number;
  growth: number;
  priceRange: string;
  logoUrl: string;
}

interface TrendingProduct {
  id: string;
  title: string;
  volume: string;
  growth: string;
  description: string;
  status: "exploding" | "regular";
  category: string;
  imageUrl?: string;
  trendData: { year: string; volume: number }[];
  marketplaceData: MarketplaceData[];
}

export function useTrendingProducts(limit: number = 10, category?: string) {
  const [products, setProducts] = useState<TrendingProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          limit: limit.toString(),
          ...(category && { category })
        });

        const response = await fetch(`/api/trending-products?${params}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch products');
        }

        setProducts(result.data || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [limit, category]);

  const refetch = () => {
    setLoading(true);
    setError(null);
    fetchProducts();
  };

  return {
    products,
    loading,
    error,
    refetch
  };
}

// Hook untuk scraping marketplace data
export function useMarketplaceScraper() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrapeProduct = async (keyword: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/scrape-marketplace', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to scrape marketplace data');
      }

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    scrapeProduct,
    loading,
    error
  };
}