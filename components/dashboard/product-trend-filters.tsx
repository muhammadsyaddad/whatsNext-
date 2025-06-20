import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface ProductTrendFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export function ProductTrendFilters({ searchQuery, setSearchQuery }: ProductTrendFiltersProps) {
  return (
    <div className="w-full space-y-4">
      {/* Mobile Layout */}
      <div className="block lg:hidden space-y-3">
        {/* Search Bar - Full width on mobile */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-10 w-full transition-shadow duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Filter Controls - 2x2 Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <span className="text-xs font-medium text-muted-foreground">SORT BY</span>
            <Select>
              <SelectTrigger className="w-full transition-shadow duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:border-transparent">
                <SelectValue placeholder="Growth" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="growth">Growth</SelectItem>
                <SelectItem value="volume">Volume</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-1">
            <span className="text-xs font-medium text-muted-foreground">FILTER BY</span>
            <Select>
              <SelectTrigger className="w-full transition-shadow duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:border-transparent">
                <SelectValue placeholder="5 Years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5years">5 Years</SelectItem>
                <SelectItem value="1year">1 Year</SelectItem>
                <SelectItem value="6months">6 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-1">
            <span className="text-xs font-medium text-muted-foreground">STATUS</span>
            <Select>
              <SelectTrigger className="w-full transition-shadow duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:border-transparent">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="exploding">Exploding</SelectItem>
                <SelectItem value="regular">Regular</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-1">
            <span className="text-xs font-medium text-muted-foreground">TYPE</span>
            <Select>
              <SelectTrigger className="w-full transition-shadow duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:border-transparent">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="brands">Brands</SelectItem>
                <SelectItem value="non-brands">Non-Brands</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-col lg:flex-row gap-4 items-start lg:items-center w-full lg:w-auto">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium whitespace-nowrap">SORT BY:</span>
          <Select>
            <SelectTrigger className="w-[150px] transition-shadow duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:border-transparent">
              <SelectValue placeholder="Growth" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="growth">Growth</SelectItem>
              <SelectItem value="volume">Volume</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium whitespace-nowrap">FILTER BY:</span>
          <Select>
            <SelectTrigger className="w-[150px] transition-shadow duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:border-transparent">
              <SelectValue placeholder="5 Years" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5years">5 Years</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Select>
          <SelectTrigger className="w-[150px] transition-shadow duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:border-transparent">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="exploding">Exploding</SelectItem>
            <SelectItem value="regular">Regular</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px] transition-shadow duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:border-transparent">
            <SelectValue placeholder="Brands + Non-Brands" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="brands">Brands</SelectItem>
            <SelectItem value="non-brands">Non-Brands</SelectItem>
          </SelectContent>
        </Select>
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-10 w-full md:w-full transition-shadow duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}