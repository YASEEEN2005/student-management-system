import React from "react";

export default function Topbar() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-gray-800 text-2xl sm:text-3xl lg:text-4xl font-bold">
            School Admin
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-base sm:text-lg text-gray-700 font-semibold bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-2 rounded-full shadow-inner">
            Welcome, Principal
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:rotate-12">
            P
          </div>
        </div>
      </div>
    </header>
  );
}
