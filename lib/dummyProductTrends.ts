export interface TrendData {
  year: string;
  volume: number;
}

export interface ProductTrend {
  id: number;
  title: string;
  volume: string;
  growth: string;
  description: string;
  status: "exploding" | "regular";
  trendData: TrendData[];
}

export const dummyProductTrends: ProductTrend[] = [
  {
    id: 1,
    title: "Beet Gummies",
    volume: "6.6K",
    growth: "+99X+",
    description: "Beetroot-based gelatinous supplement.",
    status: "exploding",
    trendData: [
      { year: "2020", volume: 10 },
      { year: "2021", volume: 15 },
      { year: "2022", volume: 30 },
      { year: "2023", volume: 70 },
      { year: "2024", volume: 90 },
    ],
  },
  {
    id: 2,
    title: "Uppbeat",
    volume: "18.1K",
    growth: "+7600%",
    description: "uppbeat is a music platform that provides creators with a collection of free, high-quality music for their...",
    status: "regular",
    trendData: [
      { year: "2020", volume: 5 },
      { year: "2021", volume: 10 },
      { year: "2022", volume: 50 },
      { year: "2023", volume: 40 },
      { year: "2024", volume: 70 },
    ],
  },
  {
    id: 3,
    title: "Hair Peptide Serum",
    volume: "880",
    growth: "+1067%",
    description: "A hair care product that contains peptides, amino acids, and other ingredients to nourish and...",
    status: "exploding",
    trendData: [
      { year: "2020", volume: 20 },
      { year: "2021", volume: 25 },
      { year: "2022", volume: 40 },
      { year: "2023", volume: 50 },
      { year: "2024", volume: 80 },
    ],
  },
  {
    id: 4,
    title: "Magnacut",
    volume: "8.1K",
    growth: "+8900%",
    description: "A high-performance stainless steel for knife blades...",
    status: "exploding",
    trendData: [
      { year: "2020", volume: 10 },
      { year: "2021", volume: 15 },
      { year: "2022", volume: 30 },
      { year: "2023", volume: 70 },
      { year: "2024", volume: 90 },
    ],
  },
  {
    id: 5,
    title: "Codeium",
    volume: "74K",
    growth: "+99X+",
    description: "An AI-powered code completion tool...",
    status: "exploding",
    trendData: [
      { year: "2020", volume: 5 },
      { year: "2021", volume: 10 },
      { year: "2022", volume: 50 },
      { year: "2023", volume: 40 },
      { year: "2024", volume: 70 },
    ],
  },
  {
    id: 6,
    title: "Oversized Gym Shirt",
    volume: "9.9K",
    growth: "+9800%",
    description: "Comfortable and stylish oversized t-shirt for gym wear...",
    status: "regular",
    trendData: [
      { year: "2020", volume: 20 },
      { year: "2021", volume: 25 },
      { year: "2022", volume: 40 },
      { year: "2023", volume: 50 },
      { year: "2024", volume: 80 },
    ],
  },
]; 