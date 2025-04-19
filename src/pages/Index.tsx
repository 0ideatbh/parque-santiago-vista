
import { useState, useEffect } from 'react';
import { Images } from 'lucide-react';
import Layout from '../components/layout/Layout';
import PropertyCard from '../components/properties/PropertyCard';
import PropertyFilter from '../components/properties/PropertyFilter';
import { mockProperties } from '../data/mockData';
import { Property, PropertyFilters } from '../types';

const Index = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<PropertyFilters>({});
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading properties from Supabase
  useEffect(() => {
    const fetchProperties = async () => {
      // In a real app, this would be a call to Supabase
      setTimeout(() => {
        setProperties(mockProperties);
        setFilteredProperties(mockProperties);
        setIsLoading(false);
      }, 500);
    };
    
    fetchProperties();
  }, []);
  
  const handleFilterChange = (newFilters: PropertyFilters) => {
    setFilters(newFilters);
    
    let filtered = [...properties];
    
    if (newFilters.searchTerm) {
      const searchTerm = newFilters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        property => 
          property.title.toLowerCase().includes(searchTerm) || 
          property.address.toLowerCase().includes(searchTerm) ||
          property.description.toLowerCase().includes(searchTerm)
      );
    }
    
    if (newFilters.minPrice) {
      filtered = filtered.filter(property => property.price >= (newFilters.minPrice || 0));
    }
    
    if (newFilters.maxPrice) {
      filtered = filtered.filter(property => property.price <= (newFilters.maxPrice || Number.MAX_VALUE));
    }
    
    if (newFilters.availability) {
      filtered = filtered.filter(property => property.availability);
    }
    
    setFilteredProperties(filtered);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative mb-12 overflow-hidden rounded-xl shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-realty-deep-blue/70 to-realty-royal-navy/70 z-10"></div>
          <div className="relative z-20 text-white text-center py-20 px-6">
            <h1 className="text-5xl font-playfair font-bold mb-4 text-realty-warm-sand">
              Kristian's Parque Santiago Properties
            </h1>
            <p className="text-xl max-w-2xl mx-auto text-white/90 font-light">
              Discover luxury properties in the heart of Tenerife's most exclusive resort complex. 
              Indulge in sophisticated living and exceptional investment opportunities.
            </p>
            <div className="mt-8 flex justify-center items-center space-x-4">
              <button className="px-6 py-3 bg-realty-luxe-gold text-realty-deep-blue hover:bg-opacity-90 rounded-lg font-semibold transition-colors">
                Explore Properties
              </button>
              <button className="px-6 py-3 border-2 border-white text-white hover:bg-white/10 rounded-lg font-semibold transition-colors">
                Learn More
              </button>
            </div>
          </div>
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1721322800607-8c38375eef04" 
              alt="Luxury Parque Santiago Property" 
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute bottom-4 right-4 bg-white/20 rounded-full p-2 text-white">
              <Images className="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <PropertyFilter onFilterChange={handleFilterChange} currentFilters={filters} />
        
        {isLoading ? (
          <div className="py-20 text-center">
            <p className="text-gray-500">Loading properties...</p>
          </div>
        ) : filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-gray-500">No properties found. Try adjusting your filters.</p>
            <button 
              onClick={() => handleFilterChange({})}
              className="mt-4 text-realty-blue hover:text-realty-navy font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;
