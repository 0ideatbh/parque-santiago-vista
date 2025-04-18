
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PropertyImageCarouselProps {
  images: string[];
  title: string;
}

const PropertyImageCarousel = ({ images, title }: PropertyImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="carousel-container relative h-96 mb-6 rounded-lg overflow-hidden">
      <button 
        onClick={goToPrevious} 
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 z-10"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button 
        onClick={goToNext} 
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 z-10"
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      
      <div className="h-full relative">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-slide absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100 z-20' : 'opacity-0 z-10'
            }`}
          >
            <img
              src={image}
              alt={`${title} - Image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyImageCarousel;
