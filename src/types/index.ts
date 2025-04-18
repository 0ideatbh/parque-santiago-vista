
export interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  description: string;
  images: string[];
  availability: boolean;
  location?: {
    lat: number;
    lng: number;
  };
}

export interface Investor {
  id: string;
  name: string;
  email: string;
  invested_properties: string[];
}

export interface Booking {
  id: string;
  property_id: string;
  start_date: string;
  end_date: string;
  guest_name: string;
  total_price: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'investor';
}

export interface PropertyFilters {
  minPrice?: number;
  maxPrice?: number;
  availability?: boolean;
  searchTerm?: string;
}

export interface ChartData {
  name: string;
  value: number;
}

export interface OccupancyData {
  month: string;
  occupancyRate: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
}
