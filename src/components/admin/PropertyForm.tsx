
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Property } from '../../types';

interface PropertyFormProps {
  property?: Property;
  onSubmit: (property: Partial<Property>) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const PropertyForm = ({ property, onSubmit, onCancel, isSubmitting }: PropertyFormProps) => {
  const [title, setTitle] = useState(property?.title || '');
  const [address, setAddress] = useState(property?.address || '');
  const [price, setPrice] = useState(property?.price?.toString() || '');
  const [description, setDescription] = useState(property?.description || '');
  const [images, setImages] = useState(property?.images?.join(', ') || '');
  const [availability, setAvailability] = useState(property?.availability ?? true);
  const [latitude, setLatitude] = useState(property?.location?.lat?.toString() || '');
  const [longitude, setLongitude] = useState(property?.location?.lng?.toString() || '');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !address || !price || !description) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const imageArray = images
      .split(',')
      .map(img => img.trim())
      .filter(img => img !== '');
    
    if (imageArray.length === 0) {
      toast.error('Please add at least one image URL');
      return;
    }
    
    const formData: Partial<Property> = {
      title,
      address,
      price: Number(price),
      description,
      images: imageArray,
      availability,
    };
    
    if (latitude && longitude) {
      formData.location = {
        lat: Number(latitude),
        lng: Number(longitude),
      };
    }
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Property Title*</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter property title"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address">Address*</Label>
        <Input
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter property address"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="price">Price (€)*</Label>
        <Input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter property price"
          min="0"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description*</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter property description"
          rows={4}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="images">Images (comma-separated URLs)*</Label>
        <Textarea
          id="images"
          value={images}
          onChange={(e) => setImages(e.target.value)}
          placeholder="Enter image URLs separated by commas"
          rows={2}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="latitude">Latitude</Label>
          <Input
            id="latitude"
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="e.g. 28.0526"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="longitude">Longitude</Label>
          <Input
            id="longitude"
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="e.g. -16.7286"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          id="availability"
          checked={availability}
          onCheckedChange={setAvailability}
        />
        <Label htmlFor="availability">Property is available</Label>
      </div>
      
      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-realty-blue hover:bg-realty-navy"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : property ? 'Update Property' : 'Add Property'}
        </Button>
      </div>
    </form>
  );
};

export default PropertyForm;
