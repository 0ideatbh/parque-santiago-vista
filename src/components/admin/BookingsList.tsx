
import { Booking, Property } from '../../types';
import { CalendarX2, CheckCircle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BookingsListProps {
  bookings: Booking[];
  properties: Property[];
  onViewBooking: (booking: Booking) => void;
  onCancelBooking: (bookingId: string) => void;
  onApproveBooking: (bookingId: string) => void;
}

const BookingsList = ({ 
  bookings, 
  properties, 
  onViewBooking,
  onCancelBooking,
  onApproveBooking
}: BookingsListProps) => {
  const getPropertyTitle = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId);
    return property?.title || 'Unknown Property';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (bookings.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No bookings found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Property
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Guest
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Check-in
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Check-out
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {getPropertyTitle(booking.property_id)}
                </div>
                <div className="text-xs text-gray-500">ID: {booking.property_id}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{booking.guest_name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{formatDate(booking.start_date)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{formatDate(booking.end_date)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">€{booking.total_price.toLocaleString()}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onViewBooking(booking)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onApproveBooking(booking.id)}
                    className="text-green-600 hover:text-green-800"
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onCancelBooking(booking.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <CalendarX2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsList;
