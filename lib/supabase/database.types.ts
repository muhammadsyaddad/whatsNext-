export type Database = {
    public: {
      Tables: {
        trending_products: {
          Row: {
            id: string
            title: string
            category: string
            description: string
            status: 'exploding' | 'regular'
            image_url: string | null
            created_at: string
            updated_at: string
          }
          Insert: {
            id?: string
            title: string
            category: string
            description: string
            status?: 'exploding' | 'regular'
            image_url?: string | null
            created_at?: string
            updated_at?: string
          }
          Update: {
            id?: string
            title?: string
            category?: string
            description?: string
            status?: 'exploding' | 'regular'
            image_url?: string | null
            updated_at?: string
          }
        }
        marketplaces: {
          Row: {
            id: string
            name: string
            base_url: string
            logo_url: string | null
            created_at: string
          }
          Insert: {
            id: string
            name: string
            base_url: string
            logo_url?: string | null
            created_at?: string
          }
        }
        product_volumes: {
          Row: {
            id: string
            product_id: string
            marketplace_id: string
            volume: number
            price_range: string
            growth_percentage: number
            recorded_date: string
          }
          Insert: {
            id?: string
            product_id: string
            marketplace_id: string
            volume: number
            price_range: string
            growth_percentage: number
            recorded_date: string
          }
        }
      }
    }
  }