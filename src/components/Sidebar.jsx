/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const sidebarRef = useRef(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isOpen) {
        toggleSidebar();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  return (
    <div
      ref={sidebarRef}
      className={`sidebar bg-gray-800 text-white w-64 h-full fixed md:relative md:w-64 md:h-auto md:flex md:flex-col transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 z-40 pt-20 shadow-lg`}
      role="navigation"
      aria-label="Sidebar Navigation"
    >
      <button
        className="md:hidden text-white p-4"
        onClick={toggleSidebar}
        aria-label="Close Sidebar"
      >
        ✕
      </button>
      <ul className="space-y-2 p-4">
        <li>
          <Link
            to="/admindashboard"
            className="block hover:bg-gray-700 p-2 rounded transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/verified-donated-items"
            className="block hover:bg-gray-700 p-2 rounded transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Verified Items
          </Link>
        </li>
        <li>
          <Link
            to="/unverified-donated-items"
            className="block hover:bg-red-700 p-2 rounded transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Unverified Items
          </Link>
        </li>
        <li>
          <Link
            to="/generate-reports"
            className="block hover:bg-gray-700 p-2 rounded transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Generate Reports
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;