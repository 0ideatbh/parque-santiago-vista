
import { Percent, TrendingUp, Home, Calendar } from 'lucide-react';

interface PropertyStatsCardProps {
  propertyId: string;
  title: string;
  occupancyRate: number;
  totalRevenue: number;
  totalBookings: number;
}

const PropertyStatsCard = ({ propertyId, title, occupancyRate, totalRevenue, totalBookings }: PropertyStatsCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2 text-realty-blue line-clamp-1">{title}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="flex items-center">
          <div className="bg-teal-100 p-3 rounded-full mr-3">
            <Percent className="h-5 w-5 text-teal-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Occupancy Rate</p>
            <p className="text-xl font-semibold">{occupancyRate}%</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="bg-amber-100 p-3 rounded-full mr-3">
            <TrendingUp className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="text-xl font-semibold">€{totalRevenue.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="bg-indigo-100 p-3 rounded-full mr-3">
            <Calendar className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Bookings</p>
            <p className="text-xl font-semibold">{totalBookings}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <a 
          href={`/property/${propertyId}`}
          className="text-realty-blue hover:text-realty-navy text-sm font-medium inline-flex items-center"
        >
          <Home className="h-4 w-4 mr-1" />
          View Property Details
        </a>
      </div>
    </div>
  );
};

export default PropertyStatsCard;
