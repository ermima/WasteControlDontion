/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const Header = ({ toggleSidebar, onLogout }) => {
  return (
    <div className="bg-gray-800 text-white p-4 fixed w-full z-50 flex justify-between items-center">
      <button className="md:hidden text-white" onClick={toggleSidebar}>
        ☰
      </button>
      <h1 className="text-xl font-bold">Resource Waste Control and Donation Application</h1>
      <button onClick={onLogout} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">
        Logout
      </button>
    </div>
  );
};

export default Header;