
import { Link } from 'react-router-dom';
import { Property } from '../../types';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const { id, title, address, price, images, availability } = property;

  return (
    <div className="property-card bg-white rounded-lg overflow-hidden shadow-md">
      <Link to={`/property/${id}`}>
        <div className="relative">
          <img 
            src={images[0]} 
            alt={title} 
            className="w-full h-48 object-cover"
          />
          {!availability && (
            <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-sm font-semibold">
              SOLD
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-realty-blue line-clamp-1">{title}</h3>
          <p className="text-gray-600 text-sm mt-1 line-clamp-1">{address}</p>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-realty-coral font-bold text-lg">
              €{price.toLocaleString()}
            </p>
            <span className="text-sm text-gray-500">
              {availability ? 'Available' : 'Sold'}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;
