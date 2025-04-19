
import { useState, useEffect } from 'react';
import { Waves, UtensilsCrossed, PalmTree } from 'lucide-react';
import Layout from '../components/layout/Layout';
import PropertyCard from '../components/properties/PropertyCard';
import PropertyFilter from '../components/properties/PropertyFilter';
import { Button } from '@/components/ui/button';
import { mockProperties } from '../data/mockData';
import { Property, PropertyFilters } from '../types';

const Index = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<PropertyFilters>({});
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchProperties = async () => {
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
        <div className="relative mb-12 overflow-hidden rounded-xl shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-realty-deep-blue/80 to-realty-royal-navy/80 z-10"></div>
          <div className="relative z-20 text-white text-center py-24 px-6">
            <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-4 text-realty-warm-sand">
              Find Your Slice of Paradise in Parque Santiago
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-white/90 font-light leading-relaxed mb-8">
              With Kristian Stefanov Realtor, unlock exclusive listings, insider insights, and seamless buying or rental experiences in Playa de las Américas.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button 
                size="lg"
                className="bg-realty-luxe-gold text-realty-deep-blue hover:bg-opacity-90 font-semibold text-lg px-8"
              >
                Contact Kristian
              </Button>
            </div>
          </div>
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21"
              alt="Parque Santiago Resort" 
              className="w-full h-full object-cover opacity-50"
            />
          </div>
        </div>

        <div className="mb-16 text-center max-w-4xl mx-auto">
          <div className="flex justify-center gap-8 mb-8">
            <div className="flex flex-col items-center">
              <div className="p-3 bg-realty-warm-sand rounded-full mb-2">
                <Waves className="w-6 h-6 text-realty-deep-blue" />
              </div>
              <span className="text-sm">Pools</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-3 bg-realty-warm-sand rounded-full mb-2">
                <PalmTree className="w-6 h-6 text-realty-deep-blue" />
              </div>
              <span className="text-sm">Beach</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-3 bg-realty-warm-sand rounded-full mb-2">
                <UtensilsCrossed className="w-6 h-6 text-realty-deep-blue" />
              </div>
              <span className="text-sm">Dining</span>
            </div>
          </div>
          
          <p className="text-lg text-gray-700 leading-relaxed mb-12">
            Nestled on Tenerife's sun-drenched southern coast, Parque Santiago is a resort-style village just steps from Playa de las Américas. Terraced gardens, saltwater pools, on-site dining & shops, and direct beach access create a year-round holiday vibe on the coveted "Golden Mile." Investors and holiday-home seekers love its unbeatable location and Kristian's deep local expertise.
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

        <div className="mt-16 mb-12 text-center bg-realty-warm-sand/20 rounded-xl p-12">
          <h2 className="text-3xl font-playfair font-bold text-realty-deep-blue mb-4">
            Ready to explore the best that Parque Santiago has to offer?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Contact Kristian today for a personalized consultation and step into your Tenerife dream home.
          </p>
          <Button 
            size="lg"
            className="bg-realty-luxe-gold text-realty-deep-blue hover:bg-opacity-90 font-semibold"
          >
            Get in Touch
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
