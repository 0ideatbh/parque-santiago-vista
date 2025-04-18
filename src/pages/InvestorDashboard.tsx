
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Layout from '../components/layout/Layout';
import OccupancyChart from '../components/charts/OccupancyChart';
import RevenueChart from '../components/charts/RevenueChart';
import PropertyStatsCard from '../components/charts/PropertyStatsCard';
import { mockProperties, mockInvestors, mockOccupancyData, mockRevenueData, mockBookings } from '../data/mockData';
import { Property } from '../types';

const InvestorDashboard = () => {
  const [user, setUser] = useState<{ name: string; role: 'admin' | 'investor'; id: string } | null>(null);
  const [investedProperties, setInvestedProperties] = useState<Property[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  // Check if user is investor
  useEffect(() => {
    const currentUserStr = localStorage.getItem('currentUser');
    if (currentUserStr) {
      const currentUser = JSON.parse(currentUserStr);
      if (currentUser.role === 'investor') {
        setUser(currentUser);
      } else if (currentUser.role === 'admin') {
        // Allow admins to view the investor dashboard too
        setUser(currentUser);
      } else {
        toast.error('You do not have permission to access the investor dashboard');
        navigate('/');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);
  
  // Fetch investor properties
  useEffect(() => {
    if (user) {
      // Simulate API calls to Supabase
      setTimeout(() => {
        let propertyIds: string[] = [];
        
        if (user.role === 'investor') {
          const investor = mockInvestors.find(inv => inv.email === user.email);
          propertyIds = investor?.invested_properties || [];
        } else if (user.role === 'admin') {
          // Admins can see all properties
          propertyIds = mockProperties.map(p => p.id);
        }
        
        const properties = mockProperties.filter(p => propertyIds.includes(p.id));
        setInvestedProperties(properties);
        
        if (properties.length > 0) {
          setSelectedPropertyId(properties[0].id);
        }
        
        setIsLoading(false);
      }, 1000);
    }
  }, [user]);
  
  const getPropertyBookings = (propertyId: string) => {
    return mockBookings.filter(booking => booking.property_id === propertyId);
  };
  
  const calculateTotalRevenue = (propertyId: string) => {
    const bookings = getPropertyBookings(propertyId);
    return bookings.reduce((total, booking) => total + booking.total_price, 0);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  if (isLoading) {
    return (
      <Layout user={user || undefined} onLogout={handleLogout}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="py-20 text-center">
            <p className="text-gray-500">Loading investor dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (investedProperties.length === 0) {
    return (
      <Layout user={user || undefined} onLogout={handleLogout}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-realty-blue mb-4">Investor Dashboard</h1>
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <p className="text-gray-600 mb-4">You don't have any invested properties yet.</p>
            <a 
              href="/"
              className="inline-block bg-realty-blue hover:bg-realty-navy text-white px-4 py-2 rounded"
            >
              Browse Properties
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout user={user || undefined} onLogout={handleLogout}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-realty-blue mb-2">Investor Dashboard</h1>
        <p className="text-gray-600 mb-8">Track the performance of your property investments</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {investedProperties.map(property => {
            const propertyId = property.id;
            const bookings = getPropertyBookings(propertyId);
            const totalRevenue = calculateTotalRevenue(propertyId);
            const occupancyData = mockOccupancyData[propertyId] || [];
            const latestOccupancy = occupancyData.length > 0 ? occupancyData[occupancyData.length - 1].occupancyRate : 0;
            
            return (
              <PropertyStatsCard 
                key={propertyId}
                propertyId={propertyId}
                title={property.title}
                occupancyRate={latestOccupancy}
                totalRevenue={totalRevenue}
                totalBookings={bookings.length}
              />
            );
          })}
        </div>
        
        {selectedPropertyId && (
          <>
            <div className="mb-6">
              <label htmlFor="property-select" className="block text-sm font-medium text-gray-700 mb-2">
                Select Property for Detailed Analysis
              </label>
              <select
                id="property-select"
                value={selectedPropertyId}
                onChange={(e) => setSelectedPropertyId(e.target.value)}
                className="block w-full max-w-md rounded-md border-gray-300 shadow-sm focus:border-realty-blue focus:ring-realty-blue"
              >
                {investedProperties.map(property => (
                  <option key={property.id} value={property.id}>
                    {property.title}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <OccupancyChart data={mockOccupancyData[selectedPropertyId] || []} />
              <RevenueChart data={mockRevenueData[selectedPropertyId] || []} />
            </div>
            
            <div className="bg-white shadow rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-realty-blue">Recent Bookings</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Guest
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Check-in
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Check-out
                      </th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {getPropertyBookings(selectedPropertyId).length > 0 ? (
                      getPropertyBookings(selectedPropertyId).map(booking => (
                        <tr key={booking.id}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">{booking.guest_name}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">{booking.start_date}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">{booking.end_date}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-right font-semibold">
                            €{booking.total_price.toLocaleString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-4 py-2 text-center text-gray-500">
                          No bookings found for this property.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default InvestorDashboard;
