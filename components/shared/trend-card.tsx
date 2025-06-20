"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { VolumeTrendChart } from "@/components/charts/volume-trend-chart"
import { MarketplaceComparison } from "@/components/shared/marketplace-comparison"

interface MarketplaceData {
  id: string;
  name: string;
  volume: number;
  growth: number;
  priceRange: string;
  logoUrl: string;
}

interface TrendCardProps {
  title: string;
  volume: string;
  growth: string;
  description: string;
  status: "exploding" | "regular";
  trendData: { year: string; volume: number }[];
  marketplaceData: MarketplaceData[];
  category: string;
  imageUrl?: string;
}

export function TrendCard({ 
  title, 
  volume, 
  growth, 
  description, 
  status, 
  trendData,
  marketplaceData,
  category,
  imageUrl
}: TrendCardProps) {
  return (
    <Card className="w-full flex flex-col h-full min-h-[450px] sm:min-h-[480px]">
      <CardHeader className="pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-sm sm:text-lg font-semibold leading-tight line-clamp-2 mb-1">
              {title}
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              {category}
            </Badge>
          </div>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <span className="text-lg sm:text-xl font-bold text-primary whitespace-nowrap">
              {volume}
            </span>
            <span className="text-xs sm:text-sm font-medium text-green-500 whitespace-nowrap">
              {growth}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3 sm:pb-4 pt-0 px-3 sm:px-6 flex flex-col flex-1">
        {/* Product Image */}
        {imageUrl && (
          <div className="h-20 sm:h-24 mb-3 bg-gray-100 rounded-md overflow-hidden">
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Chart section */}
        <div className="h-20 sm:h-24 mb-4 sm:mb-3 -mx-1">
          <VolumeTrendChart data={trendData} />
        </div>

        {/* Marketplace Comparison */}
        <div className="mb-4">
          <h4 className="text-xs font-medium text-muted-foreground mb-2">
            Perbandingan Marketplace:
          </h4>
          <MarketplaceComparison data={marketplaceData} />
        </div>

        {/* Description */}
        <div className="relative flex-1 mb-4 sm:mb-4 min-h-[48px] sm:min-h-[60px]">
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 sm:line-clamp-3 leading-relaxed">
            {description}
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-3 sm:h-6 bg-gradient-to-t from-card to-transparent pointer-events-none opacity-80"></div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-between sm:items-center mt-auto">
          <Badge 
            variant={status === "exploding" ? "default" : "secondary"} 
            className="text-xs font-medium h-7 sm:h-8 px-2 sm:px-3 flex items-center justify-center sm:justify-start w-full sm:w-auto"
          >
            {status === "exploding" ? "🚀 EXPLODING" : "📈 TRENDING"}
          </Badge>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs font-medium h-7 sm:h-8 px-2 sm:px-3 w-full sm:w-auto"
          >
            LIHAT DETAIL
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}