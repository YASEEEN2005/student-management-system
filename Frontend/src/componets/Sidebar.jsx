import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ to, children, variant, className = "" }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block px-6 py-3 rounded-xl text-base font-medium transition-all duration-300 transform hover:scale-105 ${className} ${
        variant === "logout"
          ? isActive
            ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg hover:shadow-xl"
            : "text-red-600 hover:bg-red-50 hover:text-red-700 bg-white/80 border border-red-200"
          : isActive
          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl"
          : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 bg-white/80"
      }`
    }
  >
    {children}
  </NavLink>
);

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gradient-to-b from-white to-slate-50 shadow-2xl border-r border-gray-200 hidden md:block backdrop-blur-sm fixed top-0 left-0 h-full z-40">
      <div className="p-8 flex flex-col h-full">
        <div className="text-2xl font-bold mb-8 text-gray-800 drop-shadow-sm">
          Admin Panel
        </div>
        <nav className="flex flex-col space-y-2 flex-1">
          <NavItem to="/admin/students">Students</NavItem>
          <NavItem to="/admin/teachers">Teachers</NavItem>
        </nav>
        <div className="mt-auto pt-4 border-t border-gray-200">
          <NavItem to="/login" variant="logout">
            Log Out
          </NavItem>
        </div>
      </div>
    </aside>
  );
}
