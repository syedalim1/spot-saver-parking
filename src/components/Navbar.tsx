
import React from 'react';
import { Link } from 'react-router-dom';
import { CarFront } from 'lucide-react'; // Using a car icon

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center text-oceanBlue hover:text-sky-700">
          <CarFront className="h-8 w-8 mr-2" />
          <span className="font-bold text-xl">SmartPark</span>
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-oceanBlue px-3 py-2 rounded-md text-sm font-medium">Home</Link>
          <Link to="/find-slot" className="text-gray-700 hover:text-oceanBlue px-3 py-2 rounded-md text-sm font-medium">Find a Slot</Link>
          <Link to="/my-bookings" className="text-gray-700 hover:text-oceanBlue px-3 py-2 rounded-md text-sm font-medium">My Bookings</Link>
          {/* Authentication buttons will be added here later with Clerk */}
          <Link to="/auth" className="bg-oceanBlue hover:bg-sky-700 text-white px-4 py-2 rounded-md text-sm font-medium">
            Login / Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
