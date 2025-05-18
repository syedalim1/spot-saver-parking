import React from "react";
import { Link } from "react-router-dom";
import {
  CarFront,
  Mail,
  Phone,
  Instagram,
  Twitter,
  Facebook,
  MapPin,
  Shield,
  Heart,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-purple-900 text-white mt-auto">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-5">
              <CarFront className="h-7 w-7 mr-2 text-yellow-300" />
              <span className="font-bold text-xl text-white">SmartPark</span>
            </div>
            <p className="text-blue-200 mb-4">
              Finding the perfect parking spot made easy. Save time and hassle
              with SmartPark's convenient booking system.
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition duration-200"
              >
                <Facebook className="h-5 w-5 text-blue-200" />
              </a>
              <a
                href="#"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition duration-200"
              >
                <Twitter className="h-5 w-5 text-blue-200" />
              </a>
              <a
                href="#"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition duration-200"
              >
                <Instagram className="h-5 w-5 text-blue-200" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-yellow-300">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-blue-200 hover:text-white transition duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/find-slot"
                  className="text-blue-200 hover:text-white transition duration-200"
                >
                  Find a Slot
                </Link>
              </li>
              <li>
                <Link
                  to="/my-bookings"
                  className="text-blue-200 hover:text-white transition duration-200"
                >
                  My Bookings
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-blue-200 hover:text-white transition duration-200"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-yellow-300">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-blue-300" />
                <span className="text-blue-200">support@smartpark.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-blue-300" />
                <span className="text-blue-200">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-blue-300" />
                <span className="text-blue-200">
                  123 Parking Avenue, New York, NY 10001
                </span>
              </li>
            </ul>
          </div>

          {/* Values */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-yellow-300">
              Our Values
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Shield className="h-4 w-4 mr-2 text-blue-300" />
                <span className="text-blue-200">Reliability</span>
              </li>
              <li className="flex items-center">
                <Heart className="h-4 w-4 mr-2 text-blue-300" />
                <span className="text-blue-200">Customer Satisfaction</span>
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-blue-300" />
                <span className="text-blue-200">Convenient Locations</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-200 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} SmartPark Inc. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-blue-200 text-sm hover:text-white transition duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-blue-200 text-sm hover:text-white transition duration-200"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-blue-200 text-sm hover:text-white transition duration-200"
            >
              FAQ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
