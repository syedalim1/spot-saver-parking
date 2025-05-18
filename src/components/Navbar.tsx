
import React from 'react';
import { Link } from 'react-router-dom';
import { CarFront, LogOut, UserCircle2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, profile, signOut, loading } = useAuth();

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center text-oceanBlue hover:text-sky-700">
          <CarFront className="h-8 w-8 mr-2" />
          <span className="font-bold text-xl">SmartPark</span>
        </Link>
        <div className="space-x-4 flex items-center">
          <Link to="/" className="text-gray-700 hover:text-oceanBlue px-3 py-2 rounded-md text-sm font-medium">Home</Link>
          <Link to="/find-slot" className="text-gray-700 hover:text-oceanBlue px-3 py-2 rounded-md text-sm font-medium">Find a Slot</Link>
          {user && (
            <Link to="/my-bookings" className="text-gray-700 hover:text-oceanBlue px-3 py-2 rounded-md text-sm font-medium">My Bookings</Link>
          )}
          
          {loading ? (
            <div className="text-gray-700 px-3 py-2 text-sm font-medium">Loading...</div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <UserCircle2 className="h-5 w-5" />
                  <span>{profile?.full_name || user.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled> {/* Placeholder for profile page */}
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={signOut} className="text-red-600 hover:!text-red-600 hover:!bg-red-50 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth" className="bg-oceanBlue hover:bg-sky-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Login / Sign Up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
