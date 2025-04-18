
import { useState, useEffect } from 'react';
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-realty-blue mb-2">
            Kristian's Parque Santiago Properties
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover luxury properties in the heart of Tenerife's most exclusive resort complex.
          </p>
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
