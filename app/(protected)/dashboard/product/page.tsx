"use client";

import { useState } from "react";
import { ProductTrendFilters } from "@/components/dashboard/product-trend-filters";
import { ProductsGrid } from "@/components/dashboard/product-trend-grid";
import { dummyProductTrends } from "@/lib/dummyProductTrends";

export default function ProductPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTrends = dummyProductTrends.filter((trend) =>
    trend.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTryExample = () => {
    setSearchQuery("iPhone 15");
  };

  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl space-y-6">
      <h1 className="text-3xl font-bold">Trend Database</h1>
      <ProductTrendFilters 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
      />
      <ProductsGrid 
        trends={filteredTrends} 
        onTryExample={handleTryExample}
      />
    </div>
  );
}