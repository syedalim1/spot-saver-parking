
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // Using shadcn button

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 to-blue-200 pt-20">
      <div className="text-center p-6 md:p-12">
        <header className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-oceanBlue mb-4">
            Welcome to SmartPark
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            Your hassle-free solution for finding and reserving parking slots in advance.
          </p>
        </header>

        <section className="mb-12">
          <img 
            src="/placeholder.svg" // Replace with a relevant parking image if available
            alt="Smart Parking System" 
            className="w-full max-w-2xl mx-auto rounded-lg shadow-2xl mb-8 h-64 object-cover" 
          />
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Easily view available parking locations, check slot availability, and book your spot with just a few clicks. Manage your bookings and enjoy a seamless parking experience.
          </p>
          <Link to="/find-slot">
            <Button size="lg" className="bg-oceanBlue hover:bg-sky-700 text-white text-lg px-8 py-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              Find a Parking Slot Now
            </Button>
          </Link>
        </section>

        <section className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-semibold text-oceanBlue mb-3">Easy Booking</h3>
            <p className="text-gray-600">Select location, date, and duration. Book in minutes!</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-semibold text-oceanBlue mb-3">Real-time Availability</h3>
            <p className="text-gray-600">See which parking slots are free right now.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-semibold text-oceanBlue mb-3">Manage Bookings</h3>
            <p className="text-gray-600">View, update, or cancel your reservations with ease.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
