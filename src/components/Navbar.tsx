import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CarFront,
  LogOut,
  UserCircle2,
  BookOpen,
  Home,
  CalendarCheck,
  Bell,
  ParkingCircle,
  CreditCard,
  Clock,
  Info,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeToggle from "./ThemeToggle";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const { user, profile, signOut, loading } = useAuth();
  const [notificationCount, setNotificationCount] = useState(3);

  const clearNotifications = () => {
    setNotificationCount(0);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-900 dark:to-purple-900 shadow-lg fixed w-full z-50 top-0">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center text-white hover:text-yellow-200 transition duration-300"
        >
          <ParkingCircle className="h-8 w-8 mr-2" />
          <span className="font-bold text-xl">SmartPark</span>
        </Link>
        <div className="space-x-2 flex items-center">
          <Link
            to="/"
            className="hidden md:flex items-center text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
          >
            <Home className="h-4 w-4 mr-1.5" />
            <span>Home</span>
          </Link>
          <Link
            to="/find-slot"
            className="hidden md:flex items-center text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
          >
            <BookOpen className="h-4 w-4 mr-1.5" />
            <span>Find a Slot</span>
          </Link>
          {user && (
            <Link
              to="/my-bookings"
              className="hidden md:flex items-center text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
            >
              <CalendarCheck className="h-4 w-4 mr-1.5" />
              <span>My Bookings</span>
            </Link>
          )}

          <ThemeToggle />

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-white hover:bg-white/10 rounded-full"
                >
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs"
                    >
                      {notificationCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 mt-1" align="end">
                <DropdownMenuLabel className="font-semibold">
                  Notifications
                  {notificationCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2 text-xs text-blue-600 hover:text-blue-800"
                      onClick={clearNotifications}
                    >
                      Mark all as read
                    </Button>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <div className="max-h-[300px] overflow-y-auto">
                  <DropdownMenuItem className="flex items-start p-3 cursor-default hover:bg-blue-50">
                    <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                      <CreditCard className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Payment Successful</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Your payment of $28.50 for Downtown Garage was
                        successful.
                      </p>
                      <p className="text-xs text-gray-400 mt-1">Just now</p>
                    </div>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="flex items-start p-3 cursor-default hover:bg-blue-50">
                    <div className="bg-orange-100 p-2 rounded-full mr-3 mt-1">
                      <Clock className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Booking Reminder</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Your parking at City Center Plaza begins in 1 hour.
                      </p>
                      <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                    </div>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="flex items-start p-3 cursor-default hover:bg-blue-50">
                    <div className="bg-green-100 p-2 rounded-full mr-3 mt-1">
                      <Info className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Special Offer</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Get 15% off your next booking with code SUMMER15.
                      </p>
                      <p className="text-xs text-gray-400 mt-1">2 days ago</p>
                    </div>
                  </DropdownMenuItem>

                  {notificationCount === 0 && (
                    <div className="p-4 text-center text-gray-500">
                      <p>No new notifications</p>
                    </div>
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {loading ? (
            <div className="text-white/70 px-3 py-2 text-sm font-medium">
              Loading...
            </div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 text-white bg-white/10 hover:bg-white/20 focus:bg-white/20"
                >
                  <UserCircle2 className="h-5 w-5" />
                  <span className="max-w-[100px] truncate hidden md:inline-block">
                    {profile?.full_name || user.email}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 mt-1 border border-blue-100"
                align="end"
              >
                <DropdownMenuLabel className="font-semibold text-blue-800 dark:text-blue-400">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900">
                  <Link to="/profile" className="flex items-center w-full">
                    <UserCircle2 className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900">
                  <Link to="/my-bookings" className="flex items-center w-full">
                    <CalendarCheck className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span>My Bookings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={signOut}
                  className="text-red-600 hover:!text-red-600 hover:!bg-red-50 dark:hover:!bg-red-900/30 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to="/auth"
              className="bg-white text-blue-600 hover:bg-yellow-100 px-4 py-2 rounded-md text-sm font-medium shadow-sm transition duration-200"
            >
              Login / Sign Up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
