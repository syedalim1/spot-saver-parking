
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import { AlertCircle, Info, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface Booking {
  id: string;
  booking_date: string;
  duration_hours: number;
  total_price: number;
  status: string | null;
  locations: { name: string } | null; // Joined data
  parking_slots: { slot_number: string } | null; // Joined data
  created_at: string;
}

const fetchUserBookings = async (userId: string): Promise<Booking[]> => {
  console.log(`Fetching bookings for user ID: ${userId}`);
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      id,
      booking_date,
      duration_hours,
      total_price,
      status,
      created_at,
      locations (name),
      parking_slots (slot_number)
    `)
    .eq('user_id', userId)
    .order('booking_date', { ascending: false });

  if (error) {
    console.error('Error fetching bookings:', error);
    throw new Error(error.message);
  }
  console.log('Fetched bookings:', data);
  return data as Booking[];
};

const MyBookingsPage = () => {
  const { user, loading: authLoading } = useAuth();

  const { data: bookings, isLoading, error, isError } = useQuery<Booking[], Error>({
    queryKey: ['userBookings', user?.id],
    queryFn: () => {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }
      return fetchUserBookings(user.id);
    },
    enabled: !!user && !authLoading, // Only run query if user is available and auth is not loading
  });

  if (authLoading || (isLoading && !!user)) {
    return (
      <div className="container mx-auto px-6 py-12 pt-24 min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-oceanBlue" />
        <p className="text-lg text-gray-600 mt-4">Loading your bookings...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-6 py-12 pt-24 min-h-screen flex flex-col items-center justify-center text-center">
        <Info className="h-12 w-12 text-oceanBlue mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Denied</h1>
        <p className="text-lg text-gray-600 mb-6">
          Please log in to view your bookings.
        </p>
        <Button asChild>
          <Link to="/auth">Login / Sign Up</Link>
        </Button>
      </div>
    );
  }

  if (isError && error) {
    return (
      <div className="container mx-auto px-6 py-12 pt-24 min-h-screen flex flex-col items-center justify-center text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Error Loading Bookings</h1>
        <p className="text-lg text-red-600 mb-6">
          We encountered an issue fetching your bookings: {error.message}
        </p>
        <p className="text-sm text-gray-500">Please try again later or contact support if the problem persists.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 pt-24 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">My Bookings</h1>
      
      {bookings && bookings.length > 0 ? (
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Your Reservations</CardTitle>
            <CardDescription>Here's a list of your past and upcoming parking reservations.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Location</TableHead>
                  <TableHead>Slot</TableHead>
                  <TableHead>Booking Date</TableHead>
                  <TableHead className="text-right">Duration (Hours)</TableHead>
                  <TableHead className="text-right">Total Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Booked On</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.locations?.name || 'N/A'}</TableCell>
                    <TableCell>{booking.parking_slots?.slot_number || 'N/A'}</TableCell>
                    <TableCell>{new Date(booking.booking_date).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">{booking.duration_hours}</TableCell>
                    <TableCell className="text-right">${booking.total_price.toFixed(2)}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {booking.status ? booking.status.charAt(0).toUpperCase() + booking.status.slice(1) : 'Unknown'}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(booking.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableCaption>A list of your recent bookings.</TableCaption>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <div className="w-full max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg text-center">
          <Info className="h-10 w-10 text-oceanBlue mx-auto mb-4" />
          <p className="text-xl text-gray-700 mb-4">No Bookings Found</p>
          <p className="text-gray-500 mb-6">You haven't made any bookings yet. Ready to find a spot?</p>
          <Button asChild>
            <Link to="/find-slot">Find a Parking Slot</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
