 "use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface VolumeTrendChartProps {
  data: {
    year: string;
    volume: number;
  }[];
}

const chartConfig = {
  volume: {
    label: "Volume",
    color: "hsl(var(--primary))", // Using primary color for consistency with shadcn/ui theme
  },
} satisfies ChartConfig

export function VolumeTrendChart({ data }: VolumeTrendChartProps) {
  return (
    <ChartContainer config={chartConfig} className="h-[100px] w-full">
      <LineChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
          top: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="year"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideIndicator hideLabel />} />
        <Line
          dataKey="volume"
          type="monotone"
          stroke="var(--color-volume)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  )
}