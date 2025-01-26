"use client";
import { useState } from "react";

const DashboardHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-blue-500/40 text-white fixed w-full z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left: Logo */}
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>

        {/* Hamburger Menu Button (Small Screens) */}
        <button
          className="sm:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {/* Center: Search bar (Visible on larger screens) */}
        <div className="hidden sm:flex flex-1 max-w-lg mx-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 pl-10 pr-4 rounded-md text-gray-800 placeholder-gray-400 border border-blue-500 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16l-4-4m0 0l4-4m-4 4h16"
              />
            </svg>
          </div>
        </div>

        {/* Right: Profile Section */}
        <div className="hidden sm:flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/32"
            alt="User avatar"
            className="h-8 w-8 rounded-full"
          />
          <span className="font-medium">Admin</span>
        </div>
      </div>

      {/* Dropdown Menu (Small Screens) */}
      {isMenuOpen && (
        <nav className="sm:hidden bg-blue-700">
          <ul className="flex flex-col text-center text-white py-4">
            <li className="py-2 hover:bg-blue-500">
              <a href="/admin" className="block">
                Admin
              </a>
            </li>
            <li className="py-2 hover:bg-blue-500">
              <a href="/admin/destinations" className="block">
                Destinations
              </a>
            </li>
            <li className="py-2 hover:bg-blue-500">
              <a href="/search" className="block">
                Search
              </a>
            </li>
            <li className="py-2 hover:bg-blue-500">
              <a href="/logout" className="block">
                Logout
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default DashboardHeader;
