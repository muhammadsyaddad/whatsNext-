"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface TrendChartProps {
  data: {
    month: string;
    engagement: number;
    reach: number;
  }[];
  title?: string;
  description?: string;
  trendDirection?: "up" | "down";
  trendPercentage?: number;
}

const chartConfig = {
  engagement: {
    label: "Engagement",
    color: "hsl(var(--chart-1))",
  },
  reach: {
    label: "Reach",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function TrendChart({ 
  data, 
  title = "Trend Analysis",
  description = "Last 4 months",
  trendDirection = "up",
  trendPercentage = 0
}: TrendChartProps) {
  return (
    <Card className="border-none shadow-none">
      <CardHeader className="p-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
            height={100}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="engagement"
              type="monotone"
              stroke="var(--color-engagement)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="reach"
              type="monotone"
              stroke="var(--color-reach)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="p-0 flex-col gap-1 text-pretty text-center text-xs">
        <div className="flex items-center gap-1 font-medium leading-none">
          {trendDirection === "up" ? (
            <>
              Trending up by {trendPercentage}% <TrendingUp className="size-3" />
            </>
          ) : (
            <>
              Trending down by {trendPercentage}% <TrendingDown className="size-3" />
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  )
} 