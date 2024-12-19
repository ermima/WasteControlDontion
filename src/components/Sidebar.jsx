/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar bg-gray-800 text-white w-64 h-full fixed md:relative md:w-64 md:h-auto md:flex md:flex-col transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 z-40 pt-20 shadow-lg`}>
      <button className="md:hidden text-white p-4" onClick={toggleSidebar}>
        ✕
      </button>
      <ul className="space-y-2 p-4">
        <li>
          <Link to="/admindashboard" className="block hover:bg-gray-700 p-2 rounded transition duration-200">Dashboard</Link>
        </li>
        <li>
          <Link to="/verified-donated-items" className="block hover:bg-gray-700 p-2 rounded transition duration-200">Verified Items</Link>
        </li>
        <li>
          <Link to="/unverified-donated-items" className="block hover:bg-gray-700 p-2 rounded transition duration-200">Unverified Items</Link>
        </li>
        <li>
          <Link to="/generate-reports" className="block hover:bg-gray-700 p-2 rounded transition duration-200">Generate Reports</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;