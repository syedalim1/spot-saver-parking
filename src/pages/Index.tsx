import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Car,
  Check,
  Shield,
  Clock,
  MapPin,
  CreditCard,
  Star,
  Zap,
  Award,
  Users,
  ChevronRight,
} from "lucide-react";
import MobileAppMockup from "@/components/MobileAppMockup";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with Background Image */}
      <div className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600880673167-ef3a30bc9b0d?q=80&w=1470')",
          }}
        ></div>

        <div className="container mx-auto px-6 py-24 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Find Perfect Parking{" "}
              <span className="text-blue-300">in Seconds</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Seamlessly book parking spots anywhere in the city with our smart
              parking solution. Save time, money, and eliminate parking stress.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/find-slot">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-blue-500 hover:bg-blue-400 text-white font-medium px-8 py-6 rounded-lg shadow-lg transition-all hover:translate-y-[-2px]"
                >
                  Find Parking Now <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white border-white hover:text-white font-medium px-8 py-6 rounded-lg transition-all"
                >
                  Sign Up Free
                </Button>
              </Link>
            </div>

            <div className="flex items-center mt-12 text-blue-200">
              <div className="flex -space-x-2 mr-4">
                <img
                  src="https://i.pravatar.cc/150?img=1"
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-blue-500"
                />
                <img
                  src="https://i.pravatar.cc/150?img=2"
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-blue-500"
                />
                <img
                  src="https://i.pravatar.cc/150?img=3"
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-blue-500"
                />
              </div>
              <p>
                Joined by <span className="font-bold">5,000+</span> drivers this
                month
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose SmartPark?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We've simplified parking so you can focus on what matters.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <div className="bg-blue-50 p-8 rounded-xl hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Real-Time Availability
              </h3>
              <p className="text-gray-600">
                See which parking slots are available right now, with instant
                updates.
              </p>
            </div>

            <div className="bg-blue-50 p-8 rounded-xl hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Premium Locations
              </h3>
              <p className="text-gray-600">
                Access exclusive parking spots in premium locations across the
                city.
              </p>
            </div>

            <div className="bg-blue-50 p-8 rounded-xl hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                <CreditCard className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Seamless Payments
              </h3>
              <p className="text-gray-600">
                Pay securely for exactly the time you need with multiple payment
                options.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
            <div>
              <p className="text-4xl md:text-5xl font-bold text-blue-600">
                300+
              </p>
              <p className="text-gray-600 mt-2">Parking Locations</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-blue-600">
                15K+
              </p>
              <p className="text-gray-600 mt-2">Happy Users</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-blue-600">
                99%
              </p>
              <p className="text-gray-600 mt-2">Satisfaction Rate</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-blue-600">
                24/7
              </p>
              <p className="text-gray-600 mt-2">Customer Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find and book parking in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-500 text-white text-xl font-bold rounded-full w-12 h-12 flex items-center justify-center mb-6 mx-auto">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Search Location
              </h3>
              <p className="text-gray-600">
                Enter your destination or browse nearby parking locations on the
                map.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-500 text-white text-xl font-bold rounded-full w-12 h-12 flex items-center justify-center mb-6 mx-auto">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Reserve a Spot
              </h3>
              <p className="text-gray-600">
                Select your desired time and confirm your reservation in
                seconds.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-500 text-white text-xl font-bold rounded-full w-12 h-12 flex items-center justify-center mb-6 mx-auto">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Park Hassle-Free
              </h3>
              <p className="text-gray-600">
                Use the app to access the parking area and enjoy your
                hassle-free parking.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile App Section */}
      <div className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Take SmartPark With You Everywhere
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Download our mobile app for an even better parking experience.
                Manage your bookings on the go, get real-time notifications, and
                unlock exclusive mobile-only features.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      GPS Navigation
                    </h3>
                    <p className="text-gray-600">
                      Get turn-by-turn directions directly to your parking spot
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      Extend Your Booking
                    </h3>
                    <p className="text-gray-600">
                      Running late? Extend your parking time directly from the
                      app
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      QR Code Access
                    </h3>
                    <p className="text-gray-600">
                      Scan to enter and exit parking facilities without physical
                      tickets
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <a href="#" className="inline-block">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
                    alt="Get it on Google Play"
                    className="h-12"
                  />
                </a>
                <a href="#" className="inline-block">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/2560px-Download_on_the_App_Store_Badge.svg.png"
                    alt="Download on the App Store"
                    className="h-12"
                  />
                </a>
              </div>
            </div>

            <div className="lg:w-1/2 flex justify-center">
              <MobileAppMockup />
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trusted by thousands of drivers every day
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <img
                    src="https://i.pravatar.cc/150?img=11"
                    alt="User"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Sarah Johnson
                    </h4>
                    <p className="text-gray-600 text-sm">Daily Commuter</p>
                  </div>
                </div>
                <div className="flex text-yellow-400">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </div>
              <p className="text-gray-600 italic">
                "SmartPark has transformed my daily commute. No more circling
                blocks looking for parking!"
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <img
                    src="https://i.pravatar.cc/150?img=32"
                    alt="User"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Michael Chen
                    </h4>
                    <p className="text-gray-600 text-sm">Business Traveler</p>
                  </div>
                </div>
                <div className="flex text-yellow-400">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The premium secured spots give me peace of mind when I'm
                traveling for business meetings."
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <img
                    src="https://i.pravatar.cc/150?img=44"
                    alt="User"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Emily Rodriguez
                    </h4>
                    <p className="text-gray-600 text-sm">Weekend Explorer</p>
                  </div>
                </div>
                <div className="flex text-yellow-400">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Finding parking downtown used to be a nightmare. Now I book
                ahead and my weekend plans are stress-free!"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Parking Experience?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of drivers who save time and money with SmartPark.
          </p>
          <Link to="/find-slot">
            <Button
              size="lg"
              className="bg-white hover:bg-gray-100 text-blue-700 font-medium px-8 py-6 rounded-lg shadow-lg transition-all hover:translate-y-[-2px]"
            >
              Get Started Now <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
