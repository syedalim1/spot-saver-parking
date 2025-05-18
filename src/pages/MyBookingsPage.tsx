import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import {
  AlertCircle,
  Info,
  Loader2,
  Calendar,
  Search,
  ChevronDown,
  Filter,
  Clock,
  MapPin,
  CreditCard,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    .from("bookings")
    .select(
      `
      id,
      booking_date,
      duration_hours,
      total_price,
      status,
      created_at,
      locations (name),
      parking_slots (slot_number)
    `
    )
    .eq("user_id", userId)
    .order("booking_date", { ascending: false });

  if (error) {
    console.error("Error fetching bookings:", error);
    throw new Error(error.message);
  }
  console.log("Fetched bookings:", data);
  return data as Booking[];
};

const BookingStats = ({ bookings }: { bookings: Booking[] }) => {
  const totalBookings = bookings.length;
  const activeBookings = bookings.filter(
    (booking) => booking.status === "confirmed"
  ).length;
  const totalSpent = bookings.reduce(
    (sum, booking) => sum + booking.total_price,
    0
  );

  const upcomingBooking = bookings.find(
    (booking) =>
      booking.status === "confirmed" &&
      new Date(booking.booking_date) > new Date()
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-600 text-sm font-medium">
                Total Bookings
              </p>
              <h3 className="text-3xl font-bold text-blue-800 mt-1">
                {totalBookings}
              </h3>
            </div>
            <div className="bg-blue-500 p-2 rounded-full">
              <Calendar className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-green-600 text-sm font-medium">
                Active Bookings
              </p>
              <h3 className="text-3xl font-bold text-green-800 mt-1">
                {activeBookings}
              </h3>
            </div>
            <div className="bg-green-500 p-2 rounded-full">
              <Clock className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-purple-600 text-sm font-medium">Total Spent</p>
              <h3 className="text-3xl font-bold text-purple-800 mt-1">
                ${totalSpent.toFixed(2)}
              </h3>
            </div>
            <div className="bg-purple-500 p-2 rounded-full">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-amber-600 text-sm font-medium">Next Booking</p>
              <h3 className="text-xl font-bold text-amber-800 mt-1">
                {upcomingBooking
                  ? new Date(upcomingBooking.booking_date).toLocaleDateString(
                      undefined,
                      { month: "short", day: "numeric" }
                    )
                  : "None"}
              </h3>
            </div>
            <div className="bg-amber-500 p-2 rounded-full">
              <MapPin className="h-6 w-6 text-white" />
            </div>
          </div>
          {upcomingBooking && (
            <p className="text-amber-700 text-sm mt-2">
              {upcomingBooking.locations?.name || "Unknown location"}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const MyBookingsPage = () => {
  const { user, loading: authLoading } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [showSampleData, setShowSampleData] = useState(false);

  const {
    data: bookings,
    isLoading,
    error,
    isError,
  } = useQuery<Booking[], Error>({
    queryKey: ["userBookings", user?.id],
    queryFn: () => {
      if (!user?.id) {
        throw new Error("User not authenticated");
      }
      return fetchUserBookings(user.id);
    },
    enabled: !!user && !authLoading, // Only run query if user is available and auth is not loading
  });

  // Sample mock data for demonstration when no bookings exist
  const sampleBookings: Booking[] = [
    {
      id: "sample-1",
      booking_date: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
      duration_hours: 3,
      total_price: 21.99,
      status: "confirmed",
      locations: { name: "Premium Downtown Garage" },
      parking_slots: { slot_number: "A1" },
      created_at: new Date().toISOString(),
    },
    {
      id: "sample-2",
      booking_date: new Date(Date.now() + 86400000 * 7).toISOString(), // 7 days from now
      duration_hours: 5,
      total_price: 49.95,
      status: "confirmed",
      locations: { name: "Central Park Executive Lot" },
      parking_slots: { slot_number: "P2" },
      created_at: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    },
    {
      id: "sample-3",
      booking_date: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
      duration_hours: 2,
      total_price: 10.98,
      status: "completed",
      locations: { name: "Riverside Transit Hub" },
      parking_slots: { slot_number: "R4" },
      created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    },
    {
      id: "sample-4",
      booking_date: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
      duration_hours: 4,
      total_price: 27.96,
      status: "cancelled",
      locations: { name: "Downtown Garage" },
      parking_slots: { slot_number: "C2" },
      created_at: new Date(Date.now() - 86400000 * 12).toISOString(),
    },
  ];

  const displayedBookings =
    bookings && bookings.length > 0
      ? bookings
      : showSampleData
      ? sampleBookings
      : [];

  const filteredBookings = displayedBookings.filter((booking) => {
    const matchesSearch =
      !searchTerm ||
      booking.locations?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      booking.parking_slots?.slot_number
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus = !statusFilter || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getBadgeColor = (status: string | null) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (authLoading || (isLoading && !!user)) {
    return (
      <div className="container mx-auto px-6 py-12 pt-24 min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        <p className="text-lg text-gray-600 mt-4">Loading your bookings...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-6 py-12 pt-24 min-h-screen flex flex-col items-center justify-center text-center">
        <Info className="h-12 w-12 text-blue-600 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Denied</h1>
        <p className="text-lg text-gray-600 mb-6">
          Please log in to view your bookings.
        </p>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link to="/auth">Login / Sign Up</Link>
        </Button>
      </div>
    );
  }

  if (isError && error) {
    return (
      <div className="container mx-auto px-6 py-12 pt-24 min-h-screen flex flex-col items-center justify-center text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Error Loading Bookings
        </h1>
        <p className="text-lg text-red-600 mb-6">
          We encountered an issue fetching your bookings: {error.message}
        </p>
        <p className="text-sm text-gray-500">
          Please try again later or contact support if the problem persists.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 pt-24 min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 -mx-4 sm:-mx-6 px-4 sm:px-6 py-8 mb-8 text-white rounded-b-3xl shadow-lg">
        <h1 className="text-4xl font-bold mb-2 text-white">My Bookings</h1>
        <p className="text-blue-100">
          Manage and track all your parking reservations
        </p>
      </div>

      {bookings && bookings.length > 0 ? (
        <>
          <BookingStats bookings={bookings} />

          <Card className="shadow-xl border-none">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 pb-2 rounded-t-xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle className="text-2xl text-gray-800">
                    Your Reservations
                  </CardTitle>
                  <CardDescription>
                    Here's a list of your past and upcoming parking
                    reservations.
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="text"
                      placeholder="Search bookings..."
                      className="pl-9 w-full sm:w-auto focus-visible:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full sm:w-auto">
                        <Filter className="h-4 w-4 mr-2" />
                        {statusFilter
                          ? statusFilter.charAt(0).toUpperCase() +
                            statusFilter.slice(1)
                          : "All Statuses"}
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                        All Statuses
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setStatusFilter("confirmed")}
                      >
                        Confirmed
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setStatusFilter("cancelled")}
                      >
                        Cancelled
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setStatusFilter("completed")}
                      >
                        Completed
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 border-b-0">
                      <TableHead>Location</TableHead>
                      <TableHead>Slot</TableHead>
                      <TableHead>Booking Date</TableHead>
                      <TableHead className="text-right">
                        Duration (Hours)
                      </TableHead>
                      <TableHead className="text-right">Total Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Booked On</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings && filteredBookings.length > 0 ? (
                      filteredBookings.map((booking) => (
                        <TableRow
                          key={booking.id}
                          className="hover:bg-blue-50 transition duration-150"
                        >
                          <TableCell className="font-medium">
                            {booking.locations?.name || "N/A"}
                          </TableCell>
                          <TableCell>
                            {booking.parking_slots?.slot_number || "N/A"}
                          </TableCell>
                          <TableCell>
                            {new Date(booking.booking_date).toLocaleDateString(
                              undefined,
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            {booking.duration_hours}
                          </TableCell>
                          <TableCell className="text-right font-semibold">
                            ${booking.total_price.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`${getBadgeColor(booking.status)}`}
                            >
                              {booking.status
                                ? booking.status.charAt(0).toUpperCase() +
                                  booking.status.slice(1)
                                : "Unknown"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-500 text-sm">
                            {new Date(booking.created_at).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="text-center py-8 text-gray-500"
                        >
                          No bookings match your search criteria.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                  <TableCaption>
                    Showing {filteredBookings?.length || 0} of{" "}
                    {displayedBookings.length} bookings
                  </TableCaption>
                </Table>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="space-y-8">
          <div className="relative overflow-hidden bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100 to-transparent -mr-8 -mt-8 rounded-full opacity-70"></div>
            <div className="relative">
              <div className="flex items-center justify-center mb-6">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                  <Info className="h-12 w-12 text-blue-600" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
                No Bookings Found
              </h2>
              <p className="text-gray-600 text-center mb-8 max-w-lg mx-auto">
                You haven't made any bookings yet. Ready to find the perfect
                parking spot for your vehicle?
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Link to="/find-slot">
                    <MapPin className="h-5 w-5 mr-2" />
                    Find a Parking Slot
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setShowSampleData(!showSampleData)}
                >
                  {showSampleData ? "Hide Demo View" : "See Demo View"}
                </Button>
              </div>
            </div>
          </div>

          {showSampleData && (
            <>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <Info className="h-5 w-5 text-blue-500" />
                  <h3 className="font-medium text-blue-700">
                    Sample Bookings Demo
                  </h3>
                </div>
                <p className="text-sm text-blue-600">
                  This is a demonstration view showing how your bookings will
                  appear once you start making reservations.
                </p>
              </div>

              <BookingStats bookings={sampleBookings} />

              <Card className="shadow-xl border-none">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 pb-2 rounded-t-xl">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <CardTitle className="text-2xl text-gray-800">
                        Sample Reservations
                      </CardTitle>
                      <CardDescription>
                        Here's how your bookings will appear after you make
                        reservations.
                      </CardDescription>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                      <div className="relative w-full sm:w-auto">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          type="text"
                          placeholder="Search bookings..."
                          className="pl-9 w-full sm:w-auto focus-visible:ring-blue-500"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full sm:w-auto"
                          >
                            <Filter className="h-4 w-4 mr-2" />
                            {statusFilter
                              ? statusFilter.charAt(0).toUpperCase() +
                                statusFilter.slice(1)
                              : "All Statuses"}
                            <ChevronDown className="h-4 w-4 ml-2" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => setStatusFilter(null)}
                          >
                            All Statuses
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setStatusFilter("confirmed")}
                          >
                            Confirmed
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setStatusFilter("cancelled")}
                          >
                            Cancelled
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setStatusFilter("completed")}
                          >
                            Completed
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50 border-b-0">
                          <TableHead>Location</TableHead>
                          <TableHead>Slot</TableHead>
                          <TableHead>Booking Date</TableHead>
                          <TableHead className="text-right">
                            Duration (Hours)
                          </TableHead>
                          <TableHead className="text-right">
                            Total Price
                          </TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Booked On</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredBookings.map((booking) => (
                          <TableRow
                            key={booking.id}
                            className="hover:bg-blue-50 transition duration-150"
                          >
                            <TableCell className="font-medium">
                              {booking.locations?.name || "N/A"}
                            </TableCell>
                            <TableCell>
                              {booking.parking_slots?.slot_number || "N/A"}
                            </TableCell>
                            <TableCell>
                              {new Date(
                                booking.booking_date
                              ).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </TableCell>
                            <TableCell className="text-right">
                              {booking.duration_hours}
                            </TableCell>
                            <TableCell className="text-right font-semibold">
                              ${booking.total_price.toFixed(2)}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={`${getBadgeColor(booking.status)}`}
                              >
                                {booking.status
                                  ? booking.status.charAt(0).toUpperCase() +
                                    booking.status.slice(1)
                                  : "Unknown"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-gray-500 text-sm">
                              {new Date(
                                booking.created_at
                              ).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      <TableCaption>
                        Sample data - these are not real bookings
                      </TableCaption>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 py-3 px-6">
                  <div className="flex justify-between w-full text-sm">
                    <div className="text-gray-500">
                      Create your first booking to see your actual reservations
                      here
                    </div>
                    <Link
                      to="/find-slot"
                      className="text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                    >
                      Book Now <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </CardFooter>
              </Card>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Features You'll Get
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                          <Clock className="h-6 w-6 text-green-600" />
                        </div>
                        <h4 className="font-medium text-gray-800 mb-2">
                          Real-time Updates
                        </h4>
                        <p className="text-sm text-gray-600">
                          Receive instant notifications about your booking
                          status and changes.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                          <Calendar className="h-6 w-6 text-blue-600" />
                        </div>
                        <h4 className="font-medium text-gray-800 mb-2">
                          Booking History
                        </h4>
                        <p className="text-sm text-gray-600">
                          Access your complete booking history and easily rebook
                          previous locations.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                          <CreditCard className="h-6 w-6 text-purple-600" />
                        </div>
                        <h4 className="font-medium text-gray-800 mb-2">
                          Easy Payments
                        </h4>
                        <p className="text-sm text-gray-600">
                          Securely manage payments and view your transaction
                          history in one place.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
