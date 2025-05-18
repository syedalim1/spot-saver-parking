import React, { useState } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Mail,
  User,
  Bookmark,
  Calendar,
  Clock,
  Award,
} from "lucide-react";
import { Link } from "react-router-dom";
import LoyaltyProgram from "@/components/LoyaltyProgram";

const ProfilePage = () => {
  const { user, profile, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("info");

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12 pt-24 min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-oceanBlue" />
        <p className="text-lg text-gray-600 mt-4">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-6 py-12 pt-24 min-h-screen flex flex-col items-center justify-center text-center">
        <User className="h-12 w-12 text-oceanBlue mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Denied</h1>
        <p className="text-lg text-gray-600 mb-6">
          Please log in to view your profile.
        </p>
        <Button asChild>
          <Link to="/auth">Login / Sign Up</Link>
        </Button>
      </div>
    );
  }

  const initials = profile?.full_name
    ? profile.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : user.email?.substring(0, 2).toUpperCase() || "U";

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 pt-24 min-h-screen">
      {/* Profile Header Card */}
      <Card className="w-full max-w-4xl mx-auto mb-8 overflow-hidden rounded-xl shadow-xl bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-100">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <div className="flex flex-col items-center -mt-16 px-6 pb-6">
          <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${initials}`}
            />
            <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-white text-2xl">
              {initials}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-3xl font-bold mt-4 text-gray-800">
            {profile?.full_name || "Spot Saver User"}
          </h1>
          <p className="text-gray-600 flex items-center mt-1">
            <Mail className="h-4 w-4 mr-1" />
            {user.email}
          </p>
          <div className="flex gap-2 mt-3">
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-800 hover:bg-blue-200"
            >
              Premium Member
            </Badge>
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-800 hover:bg-green-200"
            >
              Verified
            </Badge>
          </div>
        </div>
      </Card>

      {/* Profile Content */}
      <Tabs
        defaultValue="info"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full max-w-4xl mx-auto"
      >
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="info" className="text-base py-3">
            <User className="h-4 w-4 mr-2" />
            Personal Info
          </TabsTrigger>
          <TabsTrigger value="bookings" className="text-base py-3">
            <Bookmark className="h-4 w-4 mr-2" />
            Booking Stats
          </TabsTrigger>
          <TabsTrigger value="settings" className="text-base py-3">
            <Clock className="h-4 w-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="rewards" className="text-base py-3">
            <Award className="h-4 w-4 mr-2" />
            Rewards
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-700">
                Personal Information
              </CardTitle>
              <CardDescription>
                Manage your personal information and account details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-blue-900">
                    Full Name
                  </h3>
                  <p className="text-xl font-semibold text-gray-800">
                    {profile?.full_name || "Not provided"}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-purple-900">
                    Email Address
                  </h3>
                  <p className="text-xl font-semibold text-gray-800">
                    {user.email}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-green-900">
                    Member Since
                  </h3>
                  <p className="text-xl font-semibold text-gray-800">
                    {new Date(user.created_at).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-700">
                Booking Statistics
              </CardTitle>
              <CardDescription>
                Your parking activity and booking statistics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-xl shadow-md">
                  <h3 className="text-blue-800 text-sm font-medium mb-2">
                    Total Bookings
                  </h3>
                  <p className="text-3xl font-bold text-blue-900">12</p>
                  <div className="mt-2 text-blue-700 text-sm">
                    +3 this month
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-xl shadow-md">
                  <h3 className="text-purple-800 text-sm font-medium mb-2">
                    Active Bookings
                  </h3>
                  <p className="text-3xl font-bold text-purple-900">2</p>
                  <div className="mt-2 text-purple-700 text-sm">
                    Next: Tomorrow
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-xl shadow-md">
                  <h3 className="text-green-800 text-sm font-medium mb-2">
                    Favorite Location
                  </h3>
                  <p className="text-xl font-bold text-green-900">
                    Downtown Garage
                  </p>
                  <div className="mt-2 text-green-700 text-sm">
                    Used 8 times
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-amber-50 p-4 rounded-lg flex items-center justify-between">
                <div>
                  <h3 className="text-amber-900 font-medium">
                    View Detailed History
                  </h3>
                  <p className="text-amber-800 text-sm">
                    See all your past and upcoming bookings
                  </p>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="bg-amber-100 border-amber-200 text-amber-900 hover:bg-amber-200"
                >
                  <Link to="/my-bookings">
                    <Calendar className="h-4 w-4 mr-2" />
                    My Bookings
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-amber-700">
                Account Settings
              </CardTitle>
              <CardDescription>
                Manage your account settings and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-red-50 p-5 rounded-lg border border-red-100">
                  <h3 className="text-lg font-medium text-red-800 mb-2">
                    Account Actions
                  </h3>
                  <p className="text-red-700 mb-4">
                    Sign out from your account or manage your account settings
                  </p>
                  <Button
                    onClick={signOut}
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Sign Out
                  </Button>
                </div>

                <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                  <h3 className="text-lg font-medium text-blue-800 mb-2">
                    Account Status
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant="outline"
                      className="bg-blue-100 text-blue-800 border-blue-200"
                    >
                      Active
                    </Badge>
                    <p className="text-blue-700">
                      Your account is in good standing
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-700">
                Loyalty Program
              </CardTitle>
              <CardDescription>
                Earn points with every booking and unlock exclusive rewards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoyaltyProgram />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
