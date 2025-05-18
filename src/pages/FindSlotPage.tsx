import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Car,
  CreditCard,
  Filter,
  ChevronRight,
  Star,
  Shield,
  Zap,
  AlertCircle,
  Loader2,
  LayoutList,
  Map,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import WeatherWidget from "@/components/WeatherWidget";

// Interfaces for location data
interface Location {
  id: string;
  name: string;
  address: string;
  daily_rate: number; // Changed from price to match Supabase column
  has_security: boolean; // Added to match Supabase
  created_at: string; // Added to match Supabase
  amenities: string; // Changed from string[] to string to match Supabase structure
  // Adding computed properties that will be derived
  price?: number;
  rating?: number;
  available_slots?: number;
  image?: string;
}

// Fetch locations from Supabase
const fetchLocations = async (): Promise<Location[]> => {
  // Sample hardcoded data instead of fetching from Supabase
  const locations = [
    {
      id: "9c30294f-c0f2-4c73-8cd3-71fc46fefb1e",
      name: "Downtown Parking Lot",
      address: "123 Main St, Anytown",
      daily_rate: 24.99,
      has_security: true,
      amenities: "EV Charging, CCTV, 24/7 Security",
      created_at: "2025-05-18T13:05:46.760439+00:00",
    },
    {
      id: "729c0ddb-3c50-4125-98b0-be0c78b36644",
      name: "City Center Garage",
      address: "456 Central Ave, Anytown",
      daily_rate: 19.99,
      has_security: true,
      amenities: "Covered Parking, Elevator Access",
      created_at: "2025-05-18T13:05:46.760439+00:00",
    },
    {
      id: "07c19832-4502-4c9e-8e12-e3ea1b7f4ec5",
      name: "Riverside Park & Ride",
      address: "789 Waterfront Dr, Anytown",
      daily_rate: 15.99,
      has_security: false,
      amenities: "Open Air, Near Public Transport",
      created_at: "2025-05-18T13:05:46.760439+00:00",
    },
  ];

  // Process the data to add derived properties
  const processedLocations = locations.map((location) => {
    // Parse amenities if it's a string
    const amenitiesList =
      typeof location.amenities === "string"
        ? location.amenities.split(",").map((a) => a.trim())
        : [];

    return {
      ...location,
      // Derive price from daily_rate
      price: location.daily_rate / 24, // Convert daily rate to hourly
      // Generate a random rating between 3.5 and 5.0
      rating: 3.5 + Math.random() * 1.5,
      // Generate a random number of available slots
      available_slots: Math.floor(Math.random() * 20) + 1,
      // Set a default image for demo purposes
      image:
        "https://images.unsplash.com/photo-1470224114660-3f6686c562eb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      // Add parsed amenities for filtering
      parsedAmenities: amenitiesList,
    };
  });

  return processedLocations as unknown as Location[];
};

const FindSlotPage = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [duration, setDuration] = useState<number>(2);
  const [locationQuery, setLocationQuery] = useState<string>("");
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [activeTab, setActiveTab] = useState("list");
  const [mapView, setMapView] = useState(false);
  const [selectedCity, setSelectedCity] = useState("New York");
  const [filters, setFilters] = useState({
    secure: false,
    covered: false,
    ev: false,
    priceMax: 10,
  });

  // Fetch locations using React Query
  const {
    data: locations,
    isLoading,
    isError,
    error,
  } = useQuery<Location[], Error>({
    queryKey: ["locations"],
    queryFn: fetchLocations,
  });

  // Initialize filtered locations when data is fetched
  useEffect(() => {
    if (locations) {
      setFilteredLocations(locations);
    }
  }, [locations]);

  const handleSearch = () => {
    if (!locations) return;

    // Apply filters
    const filtered = locations.filter((loc) => {
      // Get amenities as array for filtering
      const amenitiesList =
        typeof loc.amenities === "string"
          ? loc.amenities.split(",").map((a) => a.trim())
          : [];

      // Filter by price
      if (loc.price && loc.price > filters.priceMax) return false;

      // Filter by amenities
      if (filters.secure && !loc.has_security) return false;
      if (filters.covered && !amenitiesList.includes("Covered")) return false;
      if (filters.ev && !amenitiesList.includes("EV Charging")) return false;

      // If there's a location search term, filter by name or address
      if (
        locationQuery &&
        !loc.name.toLowerCase().includes(locationQuery.toLowerCase()) &&
        !loc.address.toLowerCase().includes(locationQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    });

    setFilteredLocations(filtered);
  };

  const selectLocation = (locationId: string) => {
    // Navigate to booking details page with parameters
    navigate(`/booking-details/${locationId}`, {
      state: {
        locationId,
        date: date?.toISOString(),
        duration,
      },
    });
  };

  // Helper function to get amenities as an array
  const getAmenities = (location: Location): string[] => {
    if (typeof location.amenities === "string") {
      return location.amenities.split(",").map((a) => a.trim());
    }
    return [];
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-12 pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Loading Locations
          </h2>
          <p className="text-gray-600">
            Please wait while we fetch available parking spots...
          </p>
        </div>
      </div>
    );
  }

  if (isError && error) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-12 pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Error Loading Locations
          </h2>
          <p className="text-red-600 mb-4">{error.message}</p>
          <p className="text-gray-600 mb-6">
            We encountered an issue while fetching the parking locations. Please
            try again later.
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 pt-24 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Find Parking Spots
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Search and book parking slots in advance
          </p>
        </div>
        <div className="mt-4 md:mt-0 w-full md:w-auto">
          <WeatherWidget city={selectedCity} />
        </div>
      </div>

      {/* Search and Filter Section */}
      <Card className="mb-8 border-blue-100 dark:border-blue-800">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="location" className="mb-2 block">
                Location
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="location"
                  type="text"
                  placeholder="Enter city or location"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  className="pl-10"
                />
                <Select
                  value={selectedCity}
                  onValueChange={(value) => setSelectedCity(value)}
                >
                  <SelectTrigger className="mt-2 bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New York">New York</SelectItem>
                    <SelectItem value="Chicago">Chicago</SelectItem>
                    <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                    <SelectItem value="San Francisco">San Francisco</SelectItem>
                    <SelectItem value="Miami">Miami</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="date" className="mb-2 block">
                Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <div className="mt-4">
                <Label htmlFor="duration" className="mb-2 block">
                  Duration: {duration} {duration === 1 ? "hour" : "hours"}
                </Label>
                <Slider
                  id="duration"
                  min={1}
                  max={24}
                  step={1}
                  value={[duration]}
                  onValueChange={(value) => setDuration(value[0])}
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
                Filters
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="secure-filter" className="cursor-pointer">
                    Secure Parking
                  </Label>
                  <Switch
                    id="secure-filter"
                    checked={filters.secure}
                    onCheckedChange={(checked) =>
                      setFilters({ ...filters, secure: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="covered-filter" className="cursor-pointer">
                    Covered Parking
                  </Label>
                  <Switch
                    id="covered-filter"
                    checked={filters.covered}
                    onCheckedChange={(checked) =>
                      setFilters({ ...filters, covered: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="ev-filter" className="cursor-pointer">
                    EV Charging
                  </Label>
                  <Switch
                    id="ev-filter"
                    checked={filters.ev}
                    onCheckedChange={(checked) =>
                      setFilters({ ...filters, ev: checked })
                    }
                  />
                </div>

                <div>
                  <Label className="mb-2 block">
                    Max Price: ${filters.priceMax}/hour
                  </Label>
                  <Slider
                    min={5}
                    max={50}
                    step={1}
                    value={[filters.priceMax]}
                    onValueChange={(value) =>
                      setFilters({ ...filters, priceMax: value[0] })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <div className="flex space-x-2">
              <Button variant="outline" className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>

              <Button
                variant="outline"
                className="flex items-center"
                onClick={() => setMapView(!mapView)}
              >
                {mapView ? (
                  <>
                    <LayoutList className="mr-2 h-4 w-4" />
                    List View
                  </>
                ) : (
                  <>
                    <Map className="mr-2 h-4 w-4" />
                    Map View
                  </>
                )}
              </Button>
            </div>

            <Button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* View Toggle */}
      <div className="mb-6">
        <Tabs
          defaultValue={activeTab}
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="list" className="text-base py-2">
              <LayoutList className="h-4 w-4 mr-2" />
              List View
            </TabsTrigger>
            <TabsTrigger value="map" className="text-base py-2">
              <Map className="h-4 w-4 mr-2" />
              Map View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            {/* Results Section - List View */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
                <p className="text-gray-600 mt-4">
                  Loading parking locations...
                </p>
              </div>
            ) : isError ? (
              <div className="bg-red-50 text-red-800 p-4 rounded-lg">
                <p className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Error loading locations: {error?.message || "Unknown error"}
                </p>
              </div>
            ) : filteredLocations.length === 0 ? (
              <div className="bg-blue-50 text-blue-800 p-6 rounded-lg text-center">
                <Car className="h-12 w-12 mx-auto mb-3 text-blue-600" />
                <p className="text-lg font-medium">No parking spots found</p>
                <p className="mt-1">
                  Try adjusting your filters or search criteria
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLocations.map((location) => (
                  <Card
                    key={location.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow border-blue-100 dark:border-blue-800"
                  >
                    <div className="relative h-48">
                      <img
                        src={
                          location.image ||
                          "https://images.unsplash.com/photo-1470224114660-3f6686c562eb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                        }
                        alt={location.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge
                          variant="secondary"
                          className="bg-blue-600 text-white hover:bg-blue-700"
                        >
                          ${location.daily_rate.toFixed(2)}/day
                        </Badge>
                      </div>
                      {location.has_security && (
                        <div className="absolute top-3 left-3">
                          <Badge
                            variant="outline"
                            className="bg-white/90 dark:bg-black/60 flex items-center space-x-1"
                          >
                            <Shield className="h-3 w-3 text-green-600" />
                            <span>Secure</span>
                          </Badge>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                            {location.name}
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 flex items-center">
                            <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                            {location.address}
                          </p>
                        </div>
                        {location.rating && (
                          <div className="flex items-center bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500 px-2 py-1 rounded-md">
                            <Star className="h-4 w-4 mr-1 fill-current" />
                            <span>{location.rating.toFixed(1)}</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 flex justify-between items-center">
                        <div>
                          {location.available_slots !== undefined && (
                            <p className="text-sm">
                              <span
                                className={
                                  location.available_slots > 5
                                    ? "text-green-600 dark:text-green-400 font-medium"
                                    : location.available_slots > 0
                                    ? "text-orange-600 dark:text-orange-400 font-medium"
                                    : "text-red-600 dark:text-red-400 font-medium"
                                }
                              >
                                {location.available_slots} spots
                              </span>{" "}
                              available
                            </p>
                          )}
                          <div className="flex flex-wrap mt-2 gap-1">
                            {location.amenities &&
                              typeof location.amenities === "string" &&
                              location.amenities
                                .split(",")
                                .slice(0, 2)
                                .map((amenity, i) => (
                                  <Badge
                                    key={i}
                                    variant="outline"
                                    className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                                  >
                                    {amenity.trim()}
                                  </Badge>
                                ))}
                          </div>
                        </div>
                        <Button
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => selectLocation(location.id)}
                        >
                          Book Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="map">
            {/* Map View */}
            <Card className="w-full overflow-hidden border-blue-100 dark:border-blue-800 h-[600px]">
              <CardContent className="p-0 h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <div className="text-center p-6">
                  <Map className="h-16 w-16 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Map View
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    Interactive map showing parking locations would be displayed
                    here in a real implementation, using Google Maps or a
                    similar service.
                  </p>
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                    Enable Location Services
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FindSlotPage;
