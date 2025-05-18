import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  CheckCircle2,
  Clock,
  MapPin,
  Car,
  ArrowLeft,
  CreditCard,
  Info,
  Calendar,
  ShieldCheck,
  Star,
  ChevronLeft,
  ChevronRight,
  Phone,
  Tag,
  Users,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";

// Mock data for parking locations
const PARKING_LOCATIONS = [
  {
    id: "loc1",
    name: "Premium Downtown Garage",
    address: "123 Main St, Financial District",
    price: 6.99,
    rating: 4.8,
    availableSlots: 12,
    amenities: [
      "24/7 Security",
      "EV Fast Charging",
      "Valet Service",
      "Car Wash",
      "CCTV Monitoring",
    ],
    images: [
      "https://images.unsplash.com/photo-1470224114660-3f6686c562eb?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1621977717126-e29965156cb1?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1610984337706-542ffe5e3c11?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    ],
    image:
      "https://images.unsplash.com/photo-1470224114660-3f6686c562eb?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    description:
      "Our flagship downtown parking facility offering premium amenities and convenient access to the financial district. Featuring top-tier security, EV charging stations, and optional valet service.",
    operatingHours: "24/7",
    contactPhone: "+1 (555) 123-4567",
    slots: [
      {
        id: "A1",
        number: "A1",
        type: "premium",
        available: true,
        features: ["Extra Wide", "Near Exit"],
      },
      {
        id: "A2",
        number: "A2",
        type: "premium",
        available: true,
        features: ["Corner Spot", "Easy Access"],
      },
      {
        id: "B1",
        number: "B1",
        type: "compact",
        available: true,
        features: ["Economy Rate"],
      },
      {
        id: "B2",
        number: "B2",
        type: "compact",
        available: false,
        features: ["Economy Rate"],
      },
      {
        id: "C1",
        number: "C1",
        type: "standard",
        available: true,
        features: ["Standard Size"],
      },
      {
        id: "C2",
        number: "C2",
        type: "standard",
        available: false,
        features: ["Standard Size"],
      },
      {
        id: "D1",
        number: "D1",
        type: "ev",
        available: true,
        features: ["Tesla Supercharger", "Premium Location"],
      },
      {
        id: "D2",
        number: "D2",
        type: "ev",
        available: true,
        features: ["Universal EV Charger", "Premium Location"],
      },
    ],
    reviews: [
      {
        id: 1,
        user: "John D.",
        rating: 5,
        comment: "Excellent service and very secure facility. Will use again!",
        date: "2023-12-15",
      },
      {
        id: 2,
        user: "Sarah M.",
        rating: 4,
        comment:
          "Great location, but a bit pricey. The valet service was worth it though.",
        date: "2023-11-22",
      },
      {
        id: 3,
        user: "Robert T.",
        rating: 5,
        comment:
          "The EV charging stations are fast and always available. Perfect for my daily commute.",
        date: "2024-01-05",
      },
    ],
  },
  {
    id: "loc2",
    name: "Central Park Executive Lot",
    address: "456 Park Avenue, Midtown",
    price: 9.99,
    rating: 4.6,
    availableSlots: 18,
    amenities: [
      "Covered Parking",
      "24/7 Security",
      "Car Detailing",
      "Digital Entry",
      "Indoor Waiting Area",
    ],
    images: [
      "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1494337095615-b5f370aad75f?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    ],
    image:
      "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    description:
      "Experience luxury parking in the heart of the city. Our executive lot offers premium services including covered parking, car detailing, and an indoor waiting area with complimentary refreshments.",
    operatingHours: "6:00 AM - 12:00 AM",
    contactPhone: "+1 (555) 987-6543",
    slots: [
      {
        id: "P1",
        number: "P1",
        type: "premium",
        available: true,
        features: ["Reserved Executive", "Direct Elevator Access"],
      },
      {
        id: "P2",
        number: "P2",
        type: "premium",
        available: true,
        features: ["Reserved Executive", "Near Entrance"],
      },
      {
        id: "P3",
        number: "P3",
        type: "standard",
        available: true,
        features: ["Standard Size", "Covered"],
      },
      {
        id: "P4",
        number: "P4",
        type: "compact",
        available: true,
        features: ["Economy Rate", "Covered"],
      },
      {
        id: "P5",
        number: "P5",
        type: "compact",
        available: false,
        features: ["Economy Rate", "Covered"],
      },
      {
        id: "P6",
        number: "P6",
        type: "premium",
        available: true,
        features: ["VIP Section", "Valet Priority"],
      },
    ],
    reviews: [
      {
        id: 1,
        user: "Michael B.",
        rating: 5,
        comment:
          "Exceptional service! The car detailing service exceeded my expectations.",
        date: "2024-01-18",
      },
      {
        id: 2,
        user: "Emily K.",
        rating: 4,
        comment:
          "Beautifully maintained facility with excellent security. A bit expensive but worth it.",
        date: "2023-12-05",
      },
      {
        id: 3,
        user: "David W.",
        rating: 5,
        comment:
          "The executive slots are perfectly located. Makes my daily routine so much better.",
        date: "2024-02-11",
      },
    ],
  },
  {
    id: "loc3",
    name: "Riverside Transit Hub",
    address: "789 Waterfront Drive, Riverside",
    price: 4.99,
    rating: 4.4,
    availableSlots: 25,
    amenities: [
      "Public Transit Access",
      "Bicycle Storage",
      "24/7 Access",
      "Monthly Passes",
      "CCTV Surveillance",
    ],
    images: [
      "https://images.unsplash.com/photo-1590674899484-15aa421693d3?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1562515310-5b432b08c5fc?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1583674078256-9873a2817276?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    ],
    image:
      "https://images.unsplash.com/photo-1590674899484-15aa421693d3?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    description:
      "Perfect for commuters, our Riverside Transit Hub offers convenient parking with direct access to public transportation. We also provide secure bicycle storage for eco-friendly commuters.",
    operatingHours: "24/7",
    contactPhone: "+1 (555) 456-7890",
    slots: [
      {
        id: "R1",
        number: "R1",
        type: "standard",
        available: true,
        features: ["Near Transit Stop"],
      },
      {
        id: "R2",
        number: "R2",
        type: "standard",
        available: true,
        features: ["Near Transit Stop"],
      },
      {
        id: "R3",
        number: "R3",
        type: "standard",
        available: true,
        features: ["Covered Walkway"],
      },
      {
        id: "R4",
        number: "R4",
        type: "compact",
        available: true,
        features: ["Economy Rate"],
      },
      {
        id: "R5",
        number: "R5",
        type: "compact",
        available: false,
        features: ["Economy Rate"],
      },
      {
        id: "R6",
        number: "R6",
        type: "ev",
        available: true,
        features: ["Universal EV Charger"],
      },
    ],
    reviews: [
      {
        id: 1,
        user: "Thomas H.",
        rating: 4,
        comment:
          "Very convenient for daily commuting. The direct access to the bus station is a huge time saver.",
        date: "2023-11-30",
      },
      {
        id: 2,
        user: "Laura M.",
        rating: 5,
        comment:
          "The monthly passes are a great value. I've been using this lot for a year now.",
        date: "2024-01-22",
      },
      {
        id: 3,
        user: "Angela P.",
        rating: 4,
        comment:
          "I love that I can store my bike securely. Perfect for my hybrid commute.",
        date: "2023-12-18",
      },
    ],
  },
];

const BookingDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [parkingLocation, setParkingLocation] = useState<any>(null);
  const [bookingInfo, setBookingInfo] = useState<any>({
    date: new Date(),
    duration: 2,
    selectedSlot: null,
    addons: {
      carWash: false,
      valet: false,
      extendedInsurance: false,
    },
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  // Handle location state passed from FindSlotPage
  useEffect(() => {
    if (location.state) {
      const { date, duration } = location.state;
      if (date) {
        setBookingInfo((prev) => ({
          ...prev,
          date: new Date(date),
          duration: duration || 2,
        }));
      }
    }
  }, [location.state]);

  // Find parking location by ID
  useEffect(() => {
    if (id) {
      const foundLocation = PARKING_LOCATIONS.find((loc) => loc.id === id);
      if (foundLocation) {
        setParkingLocation(foundLocation);
      } else {
        navigate("/find-slot"); // Redirect if location not found
      }
    }
  }, [id, navigate]);

  // Calculate total price when relevant factors change
  useEffect(() => {
    if (parkingLocation) {
      let price = parkingLocation.price * bookingInfo.duration;

      // Add addon prices
      if (bookingInfo.addons.carWash) price += 15;
      if (bookingInfo.addons.valet) price += 10;
      if (bookingInfo.addons.extendedInsurance) price += 5;

      setTotalPrice(price);
    }
  }, [parkingLocation, bookingInfo]);

  // Toggle addon selection
  const toggleAddon = (addon: string) => {
    setBookingInfo((prev) => ({
      ...prev,
      addons: {
        ...prev.addons,
        [addon]: !prev.addons[addon],
      },
    }));
  };

  // Select parking slot
  const selectSlot = (slotId: string) => {
    setBookingInfo((prev) => ({
      ...prev,
      selectedSlot: slotId,
    }));
  };

  // Handle booking confirmation
  const confirmBooking = () => {
    // Here you would normally make an API call to create the booking
    // Since we're not modifying the database, we'll just simulate success
    setBookingComplete(true);

    // Close dialog
    setShowConfirmDialog(false);

    // In a real app, you might redirect to booking confirmation or bookings list
    setTimeout(() => {
      navigate("/my-bookings");
    }, 3000);
  };

  if (!parkingLocation) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-12 pt-24 min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md text-center p-8">
          <CardContent>
            <div className="mb-4">
              <Car className="h-12 w-12 mx-auto text-blue-600 animate-pulse" />
            </div>
            <CardTitle className="mb-2">Loading Parking Details...</CardTitle>
            <CardDescription>
              Please wait while we fetch the location information.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (bookingComplete) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-12 pt-24 min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-700">
              Booking Confirmed!
            </CardTitle>
            <CardDescription>
              Your parking slot has been successfully reserved.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-gray-600">
              You'll be redirected to your bookings page in a moment...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 pt-24 min-h-screen">
      {/* Header with back button */}
      <div className="mb-6 flex items-center">
        <Button
          variant="ghost"
          onClick={() => navigate("/find-slot")}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Search
        </Button>
        <h1 className="text-3xl font-bold text-gray-800">
          Complete Your Booking
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Location Info */}
        <div className="lg:col-span-2">
          <Card className="mb-8 overflow-hidden border-blue-100">
            {/* Image Gallery */}
            <div className="relative">
              {parkingLocation.images ? (
                <div className="h-64 overflow-hidden relative">
                  <div
                    className="flex transition-transform duration-300"
                    style={{ transform: `translateX(${-100 * 0}%)` }}
                  >
                    {parkingLocation.images.map((img, index) => (
                      <div key={index} className="w-full h-64 flex-shrink-0">
                        <img
                          src={img}
                          alt={`${parkingLocation.name} - Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={() => {
                      /* Previous image logic */
                    }}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={() => {
                      /* Next image logic */
                    }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={parkingLocation.image}
                    alt={parkingLocation.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h2 className="text-2xl font-bold text-white">
                  {parkingLocation.name}
                </h2>
                <div className="flex items-center mt-1">
                  <MapPin className="h-4 w-4 text-white/80 mr-1" />
                  <p className="text-white/80 text-sm">
                    {parkingLocation.address}
                  </p>
                </div>
              </div>
            </div>

            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Location Details
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {parkingLocation.description ||
                      "A convenient parking location with competitive rates."}
                  </p>

                  <div className="flex items-center mb-2">
                    <Clock className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="text-sm text-gray-600">
                      Operating Hours:{" "}
                    </span>
                    <span className="text-sm font-medium ml-1">
                      {parkingLocation.operatingHours || "24/7"}
                    </span>
                  </div>

                  <div className="flex items-center mb-2">
                    <Phone className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="text-sm text-gray-600">Contact: </span>
                    <span className="text-sm font-medium ml-1">
                      {parkingLocation.contactPhone || "Not available"}
                    </span>
                  </div>

                  <div className="flex items-center mb-2">
                    <Tag className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="text-sm text-gray-600">Rate: </span>
                    <span className="text-sm font-medium ml-1">
                      ${parkingLocation.price.toFixed(2)} / hour
                    </span>
                  </div>

                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-amber-400 mr-2" />
                    <span className="text-sm text-gray-600">Rating: </span>
                    <span className="text-sm font-medium ml-1">
                      {parkingLocation.rating.toFixed(1)} / 5
                    </span>
                    {parkingLocation.reviews && (
                      <span className="text-xs text-gray-500 ml-1">
                        ({parkingLocation.reviews.length} reviews)
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Amenities</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {parkingLocation.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {parkingLocation.reviews &&
                parkingLocation.reviews.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Customer Reviews
                    </h3>
                    <div className="space-y-4">
                      {parkingLocation.reviews.map((review) => (
                        <div
                          key={review.id}
                          className="border border-gray-100 rounded-lg p-4 bg-gray-50"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                                <Users className="h-4 w-4 text-blue-600" />
                              </div>
                              <span className="font-medium">{review.user}</span>
                            </div>
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "text-amber-400 fill-amber-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 mt-2 text-sm">
                            {review.comment}
                          </p>
                          <p className="text-gray-400 text-xs mt-2">
                            {review.date}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </CardContent>
          </Card>

          {/* Parking Slots Section */}
          <Card className="mb-8 overflow-hidden border-blue-100">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-lg text-blue-800">
                Select a Parking Slot
              </CardTitle>
              <CardDescription>
                Choose from {parkingLocation.availableSlots} available parking
                spaces
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {parkingLocation.slots.map((slot) => (
                  <div
                    key={slot.id}
                    className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${
                      !slot.available
                        ? "bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed"
                        : bookingInfo.selectedSlot === slot.id
                        ? "bg-blue-50 border-blue-300 ring-2 ring-blue-300"
                        : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                    }`}
                    onClick={() => slot.available && selectSlot(slot.id)}
                  >
                    <div
                      className={`text-lg font-bold mb-1 ${
                        bookingInfo.selectedSlot === slot.id
                          ? "text-blue-700"
                          : !slot.available
                          ? "text-gray-400"
                          : "text-gray-700"
                      }`}
                    >
                      {slot.number}
                    </div>
                    <div
                      className={`text-xs uppercase font-medium mb-2 ${
                        !slot.available
                          ? "text-gray-400"
                          : slot.type === "premium"
                          ? "text-purple-500"
                          : slot.type === "ev"
                          ? "text-green-500"
                          : "text-gray-500"
                      }`}
                    >
                      {slot.type}
                    </div>
                    {slot.features && slot.features.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {slot.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="text-xs text-gray-500 flex items-center justify-center"
                          >
                            <CheckCircle2 className="h-3 w-3 mr-1 text-blue-500" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    )}
                    {!slot.available && (
                      <Badge
                        variant="outline"
                        className="mt-2 bg-red-50 text-red-600 border-red-200"
                      >
                        Occupied
                      </Badge>
                    )}
                  </div>
                ))}
              </div>

              {!bookingInfo.selectedSlot && (
                <div className="mt-4 flex items-center">
                  <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                  <p className="text-sm text-amber-600">
                    Please select a parking slot to continue
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Booking Summary */}
        <div className="lg:col-span-1">
          <Card className="border-blue-100 sticky top-24">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-medium text-gray-700 mb-2">
                  {parkingLocation.name}
                </h3>
                <p className="text-sm text-gray-500 mb-1 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {format(bookingInfo.date, "MMMM d, yyyy")}
                </p>
                <p className="text-sm text-gray-500 mb-1 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {bookingInfo.duration} hour
                  {bookingInfo.duration !== 1 ? "s" : ""}
                </p>
                {bookingInfo.selectedSlot && (
                  <p className="text-sm text-gray-500 flex items-center">
                    <Car className="h-4 w-4 mr-1" />
                    Slot:{" "}
                    {
                      parkingLocation.slots.find(
                        (s: any) => s.id === bookingInfo.selectedSlot
                      )?.number
                    }
                  </p>
                )}
              </div>

              <div className="border-b pb-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">
                    Base Price ({bookingInfo.duration}h)
                  </span>
                  <span className="font-medium">
                    ${(parkingLocation.price * bookingInfo.duration).toFixed(2)}
                  </span>
                </div>

                {bookingInfo.addons.carWash && (
                  <div className="flex justify-between">
                    <span className="text-sm">Car Wash</span>
                    <span className="font-medium">$15.00</span>
                  </div>
                )}

                {bookingInfo.addons.valet && (
                  <div className="flex justify-between">
                    <span className="text-sm">Valet Service</span>
                    <span className="font-medium">$10.00</span>
                  </div>
                )}

                {bookingInfo.addons.extendedInsurance && (
                  <div className="flex justify-between">
                    <span className="text-sm">Extended Insurance</span>
                    <span className="font-medium">$5.00</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center font-semibold text-lg">
                <span>Total Price</span>
                <span className="text-blue-700">${totalPrice.toFixed(2)}</span>
              </div>

              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
                disabled={!bookingInfo.selectedSlot}
                onClick={() => setShowConfirmDialog(true)}
              >
                Complete Booking
              </Button>

              {!bookingInfo.selectedSlot && (
                <div className="text-center text-sm text-red-500">
                  Please select a parking slot to continue
                </div>
              )}

              <div className="text-xs text-gray-500 flex items-center justify-center">
                <ShieldCheck className="h-3 w-3 mr-1" />
                Secure payment processing
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Booking Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Your Booking</DialogTitle>
            <DialogDescription>
              Please review your booking details before confirming.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="border rounded-lg p-4 bg-blue-50">
              <h4 className="font-medium text-blue-800 mb-2">
                Booking Details
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{parkingLocation.name}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">
                    {format(bookingInfo.date, "MMMM d, yyyy")}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">
                    {bookingInfo.duration} hour
                    {bookingInfo.duration !== 1 ? "s" : ""}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Parking Slot:</span>
                  <span className="font-medium">
                    {
                      parkingLocation.slots.find(
                        (s: any) => s.id === bookingInfo.selectedSlot
                      )?.number
                    }
                  </span>
                </li>
                <li className="flex justify-between font-semibold border-t pt-2 mt-2">
                  <span>Total Price:</span>
                  <span className="text-blue-700">
                    ${totalPrice.toFixed(2)}
                  </span>
                </li>
              </ul>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                By confirming this booking, you agree to our terms and
                conditions.
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmBooking}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Confirm & Pay
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingDetailsPage;
