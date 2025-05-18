
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-6 py-4 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} SmartPark Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
