
import React from 'react';
import { Link } from 'react-router-dom';

const AuthPage = () => {
  return (
    <div className="container mx-auto px-6 py-12 pt-24 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome Back!</h1>
        <p className="text-gray-600 mb-8">
          Sign in or create an account to reserve parking slots and manage your bookings.
        </p>
        <div className="space-y-4">
          <button 
            className="w-full bg-oceanBlue hover:bg-sky-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-150 ease-in-out"
            onClick={() => alert('Clerk Sign In will be implemented here.')}
          >
            Sign In
          </button>
          <button 
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-150 ease-in-out"
            onClick={() => alert('Clerk Sign Up will be implemented here.')}
          >
            Create Account
          </button>
        </div>
        <p className="mt-6 text-sm text-gray-500">
          Go back to <Link to="/" className="text-oceanBlue hover:underline">Home</Link>.
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
