
import { useEffect, useRef } from 'react';

interface MapViewProps {
  location?: {
    lat: number;
    lng: number;
  };
  title: string;
}

const MapView = ({ location, title }: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // In a real implementation, we would use Mapbox here.
    // For the MVP, we'll display a placeholder
    const displayMap = () => {
      if (mapRef.current && location) {
        const mapPlaceholder = document.createElement('div');
        mapPlaceholder.className = 'h-full w-full flex items-center justify-center bg-gray-200';
        mapPlaceholder.innerHTML = `
          <div class="text-center">
            <p class="text-lg font-medium text-gray-700">Map View</p>
            <p class="text-sm text-gray-500">Location: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}</p>
            <p class="text-xs text-gray-400 mt-2">This is a placeholder for the Mapbox integration.</p>
          </div>
        `;
        
        mapRef.current.innerHTML = '';
        mapRef.current.appendChild(mapPlaceholder);
      }
    };
    
    displayMap();
  }, [location]);

  if (!location) {
    return (
      <div className="bg-gray-100 rounded-lg p-4 mb-6">
        <p className="text-gray-500 text-center">No location information available</p>
      </div>
    );
  }

  return (
    <div className="map-container mb-6" ref={mapRef}>
      <div className="h-full w-full flex items-center justify-center bg-gray-200">
        <p className="text-gray-500">Loading map...</p>
      </div>
    </div>
  );
};

export default MapView;
