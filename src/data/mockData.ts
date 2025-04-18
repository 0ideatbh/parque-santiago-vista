
import { Property, Investor, Booking, User } from '../types';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Luxury Beachfront Villa',
    address: 'Parque Santiago III, Playa de Las Americas, Tenerife',
    price: 450000,
    description: 'Stunning beachfront villa with direct ocean access. This property features 3 bedrooms, 2 bathrooms, a private pool, and breathtaking views of the Atlantic. Recently renovated with high-end finishes.',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    availability: true,
    location: {
      lat: 28.0526,
      lng: -16.7286
    }
  },
  {
    id: '2',
    title: 'Modern Ocean View Apartment',
    address: 'Parque Santiago IV, Playa de Las Americas, Tenerife',
    price: 320000,
    description: 'Contemporary apartment with stunning ocean views. This 2-bedroom, 2-bathroom unit offers an open floor plan, modern kitchen, and large balcony perfect for enjoying the sunset.',
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    availability: true,
    location: {
      lat: 28.0536,
      lng: -16.7296
    }
  },
  {
    id: '3',
    title: 'Family Resort Bungalow',
    address: 'Parque Santiago I, Playa de Las Americas, Tenerife',
    price: 280000,
    description: 'Spacious family bungalow in the heart of the resort. Features include 2 bedrooms, 2 bathrooms, a fully equipped kitchen, and access to community pools and gardens.',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    availability: true,
    location: {
      lat: 28.0546,
      lng: -16.7276
    }
  },
  {
    id: '4',
    title: 'Exclusive Penthouse Suite',
    address: 'Parque Santiago II, Playa de Las Americas, Tenerife',
    price: 550000,
    description: 'Luxurious penthouse suite with panoramic views. This 3-bedroom, 3-bathroom unit features a spacious rooftop terrace, high-end appliances, and direct access to the beach.',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    availability: false,
    location: {
      lat: 28.0516,
      lng: -16.7266
    }
  },
  {
    id: '5',
    title: 'Poolside Garden Apartment',
    address: 'Parque Santiago V, Playa de Las Americas, Tenerife',
    price: 290000,
    description: 'Beautiful ground-floor apartment with direct access to the pool and garden areas. Features 1 bedroom, 1 bathroom, a fully equipped kitchen, and a private terrace.',
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1600566752841-f1a69a6985e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1600566752355-35658a914297?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    availability: true,
    location: {
      lat: 28.0556,
      lng: -16.7306
    }
  }
];

export const mockInvestors: Investor[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    invested_properties: ['1', '3']
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    invested_properties: ['2', '4']
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    invested_properties: ['3', '5']
  }
];

export const mockBookings: Booking[] = [
  {
    id: '1',
    property_id: '1',
    start_date: '2024-05-01',
    end_date: '2024-05-10',
    guest_name: 'David Wilson',
    total_price: 2500
  },
  {
    id: '2',
    property_id: '1',
    start_date: '2024-05-15',
    end_date: '2024-05-22',
    guest_name: 'Emma Davis',
    total_price: 2100
  },
  {
    id: '3',
    property_id: '2',
    start_date: '2024-05-05',
    end_date: '2024-05-12',
    guest_name: 'Robert Garcia',
    total_price: 1800
  },
  {
    id: '4',
    property_id: '3',
    start_date: '2024-05-10',
    end_date: '2024-05-17',
    guest_name: 'Jennifer Lee',
    total_price: 1600
  },
  {
    id: '5',
    property_id: '5',
    start_date: '2024-05-20',
    end_date: '2024-05-27',
    guest_name: 'Thomas Martinez',
    total_price: 1400
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin'
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'investor'
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    role: 'investor'
  }
];

export const mockOccupancyData: { [key: string]: any[] } = {
  '1': [
    { month: 'Jan', occupancyRate: 75 },
    { month: 'Feb', occupancyRate: 82 },
    { month: 'Mar', occupancyRate: 68 },
    { month: 'Apr', occupancyRate: 79 },
    { month: 'May', occupancyRate: 85 },
    { month: 'Jun', occupancyRate: 90 }
  ],
  '2': [
    { month: 'Jan', occupancyRate: 65 },
    { month: 'Feb', occupancyRate: 72 },
    { month: 'Mar', occupancyRate: 78 },
    { month: 'Apr', occupancyRate: 69 },
    { month: 'May', occupancyRate: 75 },
    { month: 'Jun', occupancyRate: 80 }
  ],
  '3': [
    { month: 'Jan', occupancyRate: 60 },
    { month: 'Feb', occupancyRate: 65 },
    { month: 'Mar', occupancyRate: 70 },
    { month: 'Apr', occupancyRate: 75 },
    { month: 'May', occupancyRate: 80 },
    { month: 'Jun', occupancyRate: 85 }
  ],
  '4': [
    { month: 'Jan', occupancyRate: 70 },
    { month: 'Feb', occupancyRate: 75 },
    { month: 'Mar', occupancyRate: 80 },
    { month: 'Apr', occupancyRate: 85 },
    { month: 'May', occupancyRate: 90 },
    { month: 'Jun', occupancyRate: 95 }
  ],
  '5': [
    { month: 'Jan', occupancyRate: 55 },
    { month: 'Feb', occupancyRate: 60 },
    { month: 'Mar', occupancyRate: 65 },
    { month: 'Apr', occupancyRate: 70 },
    { month: 'May', occupancyRate: 75 },
    { month: 'Jun', occupancyRate: 80 }
  ]
};

export const mockRevenueData: { [key: string]: any[] } = {
  '1': [
    { month: 'Jan', revenue: 8500 },
    { month: 'Feb', revenue: 9200 },
    { month: 'Mar', revenue: 7800 },
    { month: 'Apr', revenue: 8900 },
    { month: 'May', revenue: 9500 },
    { month: 'Jun', revenue: 10200 }
  ],
  '2': [
    { month: 'Jan', revenue: 6500 },
    { month: 'Feb', revenue: 7200 },
    { month: 'Mar', revenue: 7800 },
    { month: 'Apr', revenue: 6900 },
    { month: 'May', revenue: 7500 },
    { month: 'Jun', revenue: 8000 }
  ],
  '3': [
    { month: 'Jan', revenue: 5800 },
    { month: 'Feb', revenue: 6300 },
    { month: 'Mar', revenue: 6800 },
    { month: 'Apr', revenue: 7200 },
    { month: 'May', revenue: 7700 },
    { month: 'Jun', revenue: 8200 }
  ],
  '4': [
    { month: 'Jan', revenue: 9500 },
    { month: 'Feb', revenue: 10200 },
    { month: 'Mar', revenue: 10800 },
    { month: 'Apr', revenue: 11400 },
    { month: 'May', revenue: 12000 },
    { month: 'Jun', revenue: 12600 }
  ],
  '5': [
    { month: 'Jan', revenue: 4800 },
    { month: 'Feb', revenue: 5300 },
    { month: 'Mar', revenue: 5800 },
    { month: 'Apr', revenue: 6200 },
    { month: 'May', revenue: 6700 },
    { month: 'Jun', revenue: 7200 }
  ]
};
