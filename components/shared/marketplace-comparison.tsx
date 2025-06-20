import { Badge } from "@/components/ui/badge"

interface MarketplaceData {
  id: string;
  name: string;
  volume: number;
  growth: number;
  priceRange: string;
  logoUrl: string;
}

interface MarketplaceComparisonProps {
  data: MarketplaceData[];
}

export function MarketplaceComparison({ data }: MarketplaceComparisonProps) {
  // Sort by volume desc to show highest first
  const sortedData = [...data].sort((a, b) => b.volume - a.volume);
  
  return (
    <div className="space-y-2">
      {sortedData.map((marketplace, index) => (
        <div key={marketplace.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
          <div className="flex items-center gap-2 flex-1">
            <div className="flex items-center gap-1">
              <span className="text-xs font-medium text-muted-foreground">
                #{index + 1}
              </span>
              <img 
                src={marketplace.logoUrl} 
                alt={marketplace.name}
                className="w-4 h-4 rounded"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium truncate">
                  {marketplace.name}
                </span>
                <Badge 
                  variant={marketplace.growth > 0 ? "default" : "secondary"}
                  className="text-xs px-1 py-0 h-4"
                >
                  {marketplace.growth > 0 ? '+' : ''}{marketplace.growth}%
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground">
                {marketplace.priceRange}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-medium">
              {marketplace.volume.toLocaleString('id-ID')}
            </div>
            <div className="text-xs text-muted-foreground">
              produk
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}