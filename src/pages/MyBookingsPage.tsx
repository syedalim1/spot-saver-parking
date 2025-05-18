
import React from 'react';

const MyBookingsPage = () => {
  return (
    <div className="container mx-auto px-6 py-12 pt-24 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">My Bookings</h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl">
        View and manage your parking slot reservations here. You'll need to be logged in to see your bookings.
      </p>
      {/* Placeholder for bookings list */}
      <div className="w-full max-w-2xl p-8 bg-white shadow-lg rounded-lg">
        <p className="text-center text-gray-500">Booking management coming soon...</p>
      </div>
    </div>
  );
};

export default MyBookingsPage;
