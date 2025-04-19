import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { PropertyFilters } from '../../types';

interface PropertyFilterProps {
  onFilterChange: (filters: PropertyFilters) => void;
  currentFilters: PropertyFilters;
}

const PropertyFilter = ({ onFilterChange, currentFilters }: PropertyFilterProps) => {
  const [searchTerm, setSearchTerm] = useState(currentFilters.searchTerm || '');
  const [minPrice, setMinPrice] = useState<string>(currentFilters.minPrice?.toString() || '');
  const [maxPrice, setMaxPrice] = useState<string>(currentFilters.maxPrice?.toString() || '');
  const [availableOnly, setAvailableOnly] = useState<boolean>(currentFilters.availability || false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const filters: PropertyFilters = {
      searchTerm: searchTerm.trim() || undefined,
      minPrice: minPrice ? parseInt(minPrice, 10) : undefined,
      maxPrice: maxPrice ? parseInt(maxPrice, 10) : undefined,
      availability: availableOnly || undefined
    };
    
    onFilterChange(filters);
  };
  
  const handleReset = () => {
    setSearchTerm('');
    setMinPrice('');
    setMaxPrice('');
    setAvailableOnly(false);
    onFilterChange({});
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              {searchTerm && (
                <button 
                  type="button" 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minPrice">Min Price (€)</Label>
              <Input
                id="minPrice"
                type="number"
                placeholder="0"
                min="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="maxPrice">Max Price (€)</Label>
              <Input
                id="maxPrice"
                type="number"
                placeholder="Any"
                min="0"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="availableOnly"
              checked={availableOnly}
              onCheckedChange={setAvailableOnly}
            />
            <Label htmlFor="availableOnly">Show available properties only</Label>
          </div>
          
          <div className="flex justify-center space-x-2">
            <Button type="submit" className="bg-realty-blue hover:bg-realty-navy text-white">
              Apply Filters
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleReset}
              className="border-realty-blue text-realty-blue hover:bg-realty-blue/10"
            >
              Reset
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PropertyFilter;
