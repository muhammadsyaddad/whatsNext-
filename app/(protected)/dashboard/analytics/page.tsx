"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendChart } from "@/components/charts/trend-chart";

// Dummy data
const dummyTrends = [
  {
    id: 1,
    title: "TikTok Dance Challenge",
    category: "Entertainment",
    platform: "TikTok",
    trendScore: 95,
    searchVolume: "1.2M",
    estimatedRise: "2 weeks ago",
    isDeclining: false,
    trendData: [
      { month: "Jan", engagement: 30, reach: 80 },
      { month: "Feb", engagement: 45, reach: 120 },
      { month: "Mar", engagement: 75, reach: 200 },
      { month: "Apr", engagement: 95, reach: 300 },
    ],
  },
  {
    id: 2,
    title: "Instagram Reels Tutorial",
    category: "Education",
    platform: "Instagram",
    trendScore: 85,
    searchVolume: "800K",
    estimatedRise: "1 week ago",
    isDeclining: false,
    trendData: [
      { month: "Jan", engagement: 20, reach: 60 },
      { month: "Feb", engagement: 35, reach: 90 },
      { month: "Mar", engagement: 60, reach: 150 },
      { month: "Apr", engagement: 85, reach: 250 },
    ],
  },
  {
    id: 3,
    title: "YouTube Shorts Review",
    category: "Technology",
    platform: "YouTube",
    trendScore: 75,
    searchVolume: "500K",
    estimatedRise: "3 days ago",
    isDeclining: true,
    trendData: [
      { month: "Jan", engagement: 40, reach: 100 },
      { month: "Feb", engagement: 60, reach: 180 },
      { month: "Mar", engagement: 80, reach: 220 },
      { month: "Apr", engagement: 75, reach: 200 },
    ],
  },
];

const TrendCard = ({ trend }: { trend: typeof dummyTrends[0] }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{trend.title}</CardTitle>
          {trend.isDeclining && (
            <Badge variant="outline" className="ml-2">
              📉 Declining
            </Badge>
          )}
        </div>
        <div className="flex gap-2 mt-2">
          <Badge variant="secondary">{trend.platform}</Badge>
          <Badge variant="secondary">{trend.category}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Trend Score:</span>
            <span className="font-medium">{trend.trendScore}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Search Volume:</span>
            <span className="font-medium">{trend.searchVolume}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Rise Time:</span>
            <span className="font-medium">{trend.estimatedRise}</span>
          </div>
          <div className="mt-4">
            <TrendChart 
              data={trend.trendData}
              trendDirection={trend.isDeclining ? "down" : "up"}
              trendPercentage={calculateTrendPercentage(trend.trendData)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const calculateTrendPercentage = (data: typeof dummyTrends[0]["trendData"]) => {
  const firstValue = data[0].engagement;
  const lastValue = data[data.length - 1].engagement;
  return Math.round(((lastValue - firstValue) / firstValue) * 100);
};

export default function SocialMediaTrendsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("all");

  const filteredTrends = dummyTrends.filter((trend) => {
    const matchesSearch = trend.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = selectedPlatform === "all" || trend.platform === selectedPlatform;
    return matchesSearch && matchesPlatform;
  });

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Social Media Trends</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search trends..."
              className="pl-8 w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedPlatform}>
        <TabsList>
          <TabsTrigger value="all">All Platforms</TabsTrigger>
          <TabsTrigger value="TikTok">TikTok</TabsTrigger>
          <TabsTrigger value="Instagram">Instagram</TabsTrigger>
          <TabsTrigger value="YouTube">YouTube</TabsTrigger>
        </TabsList>
        <TabsContent value={selectedPlatform} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrends.map((trend) => (
              <TrendCard key={trend.id} trend={trend} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
