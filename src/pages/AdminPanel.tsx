
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Plus, Search } from 'lucide-react';
import Layout from '../components/layout/Layout';
import PropertyForm from '../components/admin/PropertyForm';
import BookingsList from '../components/admin/BookingsList';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { mockProperties, mockBookings } from '../data/mockData';
import { Property, Booking } from '../types';

const AdminPanel = () => {
  const [user, setUser] = useState<{ name: string; role: 'admin' | 'investor' } | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('properties');
  const navigate = useNavigate();
  
  // Check if user is admin
  useEffect(() => {
    const currentUserStr = localStorage.getItem('currentUser');
    if (currentUserStr) {
      const currentUser = JSON.parse(currentUserStr);
      if (currentUser.role === 'admin') {
        setUser(currentUser);
      } else {
        toast.error('You do not have permission to access the admin panel');
        navigate('/');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);
  
  // Fetch properties and bookings
  useEffect(() => {
    if (user) {
      // Simulate API calls to Supabase
      setProperties(mockProperties);
      setFilteredProperties(mockProperties);
      setBookings(mockBookings);
    }
  }, [user]);
  
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    
    if (value.trim() === '') {
      setFilteredProperties(properties);
      return;
    }
    
    const searchValue = value.toLowerCase();
    const filtered = properties.filter(property => 
      property.title.toLowerCase().includes(searchValue) || 
      property.address.toLowerCase().includes(searchValue)
    );
    
    setFilteredProperties(filtered);
  };
  
  const handleAddProperty = () => {
    setSelectedProperty(null);
    setIsFormOpen(true);
  };
  
  const handleEditProperty = (property: Property) => {
    setSelectedProperty(property);
    setIsFormOpen(true);
  };
  
  const handleDeleteProperty = (propertyId: string) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      // Simulate API call to Supabase
      const updatedProperties = properties.filter(p => p.id !== propertyId);
      setProperties(updatedProperties);
      setFilteredProperties(updatedProperties);
      toast.success('Property deleted successfully');
    }
  };
  
  const handlePropertyFormSubmit = (property: Partial<Property>) => {
    setIsSubmitting(true);
    
    // Simulate API call to Supabase
    setTimeout(() => {
      if (selectedProperty) {
        // Update existing property
        const updatedProperties = properties.map(p => 
          p.id === selectedProperty.id ? { ...p, ...property } : p
        );
        setProperties(updatedProperties);
        setFilteredProperties(updatedProperties);
        toast.success('Property updated successfully');
      } else {
        // Add new property
        const newProperty = {
          id: `${properties.length + 1}`,
          ...property as Property
        };
        const updatedProperties = [...properties, newProperty];
        setProperties(updatedProperties);
        setFilteredProperties(updatedProperties);
        toast.success('Property added successfully');
      }
      
      setIsFormOpen(false);
      setIsSubmitting(false);
    }, 1000);
  };
  
  const handleViewBooking = (booking: Booking) => {
    toast.info(`Viewing booking details for ${booking.guest_name}`);
    // In a real application, this would open a modal with booking details
  };
  
  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      // Simulate API call to Supabase
      const updatedBookings = bookings.filter(b => b.id !== bookingId);
      setBookings(updatedBookings);
      toast.success('Booking cancelled successfully');
    }
  };
  
  const handleApproveBooking = (bookingId: string) => {
    // Simulate API call to Supabase
    toast.success('Booking approved successfully');
    // In a real application, you would update the booking status in the database
  };
  
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  if (!user) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="py-20 text-center">
            <p className="text-gray-500">Loading admin panel...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout user={user} onLogout={handleLogout}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-realty-blue">Admin Panel</h1>
            <p className="text-gray-600 mt-1">Manage properties and bookings</p>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="properties">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div className="relative w-full md:w-64 mb-4 md:mb-0">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Button onClick={handleAddProperty} className="bg-realty-blue hover:bg-realty-navy">
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
            </div>
            
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Address
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProperties.length > 0 ? (
                      filteredProperties.map((property) => (
                        <tr key={property.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{property.title}</div>
                            <div className="text-xs text-gray-500">ID: {property.id}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{property.address}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-semibold text-realty-coral">€{property.price.toLocaleString()}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${property.availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {property.availability ? 'Available' : 'Sold'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditProperty(property)}
                              className="mr-2"
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteProperty(property.id)}
                              className="text-red-600 border-red-600 hover:bg-red-50"
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                          No properties found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="bookings">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <BookingsList 
                bookings={bookings} 
                properties={properties}
                onViewBooking={handleViewBooking}
                onCancelBooking={handleCancelBooking}
                onApproveBooking={handleApproveBooking}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedProperty ? 'Edit Property' : 'Add New Property'}
            </DialogTitle>
          </DialogHeader>
          <PropertyForm 
            property={selectedProperty || undefined}
            onSubmit={handlePropertyFormSubmit}
            onCancel={() => setIsFormOpen(false)}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default AdminPanel;
