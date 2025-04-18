
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Layout from '../components/layout/Layout';
import PropertyImageCarousel from '../components/properties/PropertyImageCarousel';
import BookingForm from '../components/properties/BookingForm';
import MapView from '../components/properties/MapView';
import { mockProperties } from '../data/mockData';
import { Property } from '../types';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchProperty = async () => {
      // In a real app, this would be a call to Supabase
      setTimeout(() => {
        const foundProperty = mockProperties.find(p => p.id === id) || null;
        setProperty(foundProperty);
        setIsLoading(false);
      }, 500);
    };
    
    fetchProperty();
  }, [id]);
  
  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="py-20 text-center">
            <p className="text-gray-500">Loading property details...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!property) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="py-20 text-center">
            <p className="text-gray-500">Property not found.</p>
            <Link to="/" className="mt-4 inline-flex items-center text-realty-blue hover:text-realty-navy font-medium">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to properties
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-realty-blue hover:text-realty-navy font-medium">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to properties
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold text-realty-blue mb-2">{property.title}</h1>
        <p className="text-gray-600 mb-6">{property.address}</p>
        
        {property.location && <MapView location={property.location} title={property.title} />}
        
        <PropertyImageCarousel images={property.images} title={property.title} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-realty-blue">About this property</h2>
              <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Price</h3>
                    <p className="text-lg font-semibold text-realty-coral">€{property.price.toLocaleString()}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Status</h3>
                    <p className={`text-lg font-semibold ${property.availability ? 'text-green-600' : 'text-red-600'}`}>
                      {property.availability ? 'Available' : 'Sold'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-span-1">
            <BookingForm propertyId={property.id} price={property.price} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PropertyDetail;
