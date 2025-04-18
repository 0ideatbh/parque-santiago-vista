
import { useState } from 'react';
import { toast } from 'sonner';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BookingFormProps {
  propertyId: string;
  price: number;
}

const BookingForm = ({ propertyId, price }: BookingFormProps) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [guestName, setGuestName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const calculateTotalPrice = () => {
    if (!startDate || !endDate) return price;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Simple calculation: base price per night * number of nights
    return Math.max(1, diffDays) * (price / 100); // Assuming price is per night in cents
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startDate || !endDate || !guestName) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (new Date(startDate) > new Date(endDate)) {
      toast.error('Check-in date cannot be after check-out date');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call to Supabase
    setTimeout(() => {
      toast.success('Booking request submitted successfully!');
      setStartDate('');
      setEndDate('');
      setGuestName('');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Book this Property</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Check-in Date</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="startDate"
              type="date"
              className="pl-10"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]} // Today or later
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="endDate">Check-out Date</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="endDate"
              type="date"
              className="pl-10"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || new Date().toISOString().split('T')[0]}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="guestName">Guest Name</Label>
          <Input
            id="guestName"
            type="text"
            placeholder="Enter your full name"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            required
          />
        </div>
        
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Total Price:</span>
            <span className="text-realty-coral font-bold">€{calculateTotalPrice().toLocaleString()}</span>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-realty-blue hover:bg-realty-navy"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Book Now'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
