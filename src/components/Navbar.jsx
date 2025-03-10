import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-200 dark:bg-gray-900 shadow-md">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Paste<span className="text-blue-500">App</span>
      </h1>

      {/* Navigation Links */}
      <div className="flex gap-6">
        <NavLink
          to="/"
          className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
        >
          Home
        </NavLink>

        <NavLink
          to="/pastes"
          className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
        >
          Pastes
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
