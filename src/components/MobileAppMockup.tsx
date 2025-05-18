import React from "react";
import { Phone, Smartphone } from "lucide-react";

const MobileAppMockup = () => {
  return (
    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
      <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
      <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px]">
        <div className="h-full w-full bg-white dark:bg-gray-900 flex flex-col">
          {/* Status Bar */}
          <div className="bg-blue-600 text-white py-2 px-4 flex justify-between items-center">
            <div className="text-xs">9:41</div>
            <div className="flex space-x-1 items-center">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,21L15.6,16.2C14.6,15.45 13.35,15 12,15C10.65,15 9.4,15.45 8.4,16.2L12,21" />
                <path d="M12,3C7.95,3 4.21,4.34 1.2,6.6L3,9C5.5,7.12 8.62,6 12,6C15.38,6 18.5,7.12 21,9L22.8,6.6C19.79,4.34 16.05,3 12,3" />
                <path d="M12,9C9.3,9 6.81,9.89 4.8,11.4L6.6,13.8C8.1,12.67 9.97,12 12,12C14.03,12 15.9,12.67 17.4,13.8L19.2,11.4C17.19,9.89 14.7,9 12,9" />
              </svg>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17,2 L7,2 C6.1,2 5.2,2.9 5.2,4 L5,22 L12,19 L19,22 L19,4 C19,2.9 18.1,2 17,2 Z" />
              </svg>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4,4H20V20H4V4M6,8V6H10V8H6M12,6H18V8H12V6M6,12V10H10V12H6M12,10H18V12H12V10M6,16V14H10V16H6M12,14H18V16H12V14" />
              </svg>
            </div>
          </div>

          {/* App Header */}
          <div className="bg-blue-500 text-white py-4 px-4">
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-bold">SmartPark</h1>
              <div className="bg-white bg-opacity-20 rounded-full p-1">
                <Smartphone className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 bg-white bg-opacity-10 rounded-lg p-2 flex items-center">
              <svg
                className="h-4 w-4 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
              <span className="text-sm">Find parking near me</span>
            </div>
          </div>

          {/* App Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Nearby Parking Spots
              </h2>

              {/* Parking Spot Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 mb-3 border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between">
                  <div className="w-3/4">
                    <h3 className="font-semibold text-sm">Downtown Garage</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      0.3 miles away
                    </p>
                    <div className="flex items-center mt-1">
                      <div className="flex text-yellow-400">
                        <svg
                          className="w-3 h-3 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <svg
                          className="w-3 h-3 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <svg
                          className="w-3 h-3 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <svg
                          className="w-3 h-3 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <svg
                          className="w-3 h-3 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                        4.8 (254)
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">
                      $3.50
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      per hour
                    </p>
                    <div className="mt-2">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        8 spots left
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Parking Spot Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 mb-3 border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between">
                  <div className="w-3/4">
                    <h3 className="font-semibold text-sm">City Center Plaza</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      0.5 miles away
                    </p>
                    <div className="flex items-center mt-1">
                      <div className="flex text-yellow-400">
                        <svg
                          className="w-3 h-3 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <svg
                          className="w-3 h-3 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <svg
                          className="w-3 h-3 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <svg
                          className="w-3 h-3 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <svg
                          className="w-3 h-3 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                        4.7 (188)
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">
                      $2.75
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      per hour
                    </p>
                    <div className="mt-2">
                      <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                        3 spots left
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Parking Spot Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 mb-3 border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between">
                  <div className="w-3/4">
                    <h3 className="font-semibold text-sm">West Side Garage</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      0.8 miles away
                    </p>
                    <div className="flex items-center mt-1">
                      <div className="flex text-yellow-400">
                        <svg
                          className="w-3 h-3 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <svg
                          className="w-3 h-3 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <svg
                          className="w-3 h-3 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <svg
                          className="w-3 h-3 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <svg
                          className="w-3 h-3 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                        4.5 (142)
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">
                      $4.25
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      per hour
                    </p>
                    <div className="mt-2">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        15 spots left
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* App Navigation */}
          <div className="bg-white dark:bg-gray-800 py-3 border-t border-gray-200 dark:border-gray-700 flex justify-around">
            <div className="flex flex-col items-center">
              <svg
                className="w-6 h-6 text-blue-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
              <span className="text-xs text-blue-500">Home</span>
            </div>
            <div className="flex flex-col items-center">
              <svg
                className="w-6 h-6 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Search
              </span>
            </div>
            <div className="flex flex-col items-center">
              <svg
                className="w-6 h-6 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
              </svg>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Bookings
              </span>
            </div>
            <div className="flex flex-col items-center">
              <svg
                className="w-6 h-6 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Profile
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAppMockup;
