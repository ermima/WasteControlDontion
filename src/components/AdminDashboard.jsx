/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';
import Sidebar from './Sidebar';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const AllDonatedItems = () => {
  const [donationsList, setDonationsList] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const donationsRef = ref(database, 'donations');
    onValue(donationsRef, (snapshot) => {
      const data = snapshot.val();
      const donationsArray = data ? Object.entries(data).map(([key, value]) => ({ id: key, ...value })) : [];
      donationsArray.sort((a, b) => new Date(b.date) - new Date(a.date));
      setDonationsList(donationsArray);
    });
  }, []);

  const groupedDonations = donationsList.reduce((acc, donation) => {
    const date = dayjs(donation.date).format('YYYY-MM-DD');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(donation);
    return acc;
  }, {});

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100">
      <div className="flex-grow">
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center fixed w-full z-50 shadow-md">
          <h1 className="text-xl font-bold">Resource Waste Control and Donation Application</h1>
          <div className="flex items-center">
            <button className="md:hidden text-white p-4" onClick={toggleSidebar}>
              ☰
            </button>
            <button 
              onClick={handleLogout} 
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200 ml-4"
            >
              Logout
            </button>
          </div>
        </header>
        <div className='flex flex-row'>
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <main className="pt-24 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 w-full"> {/* Added w-full */}
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl overflow-hidden"> {/* Added overflow-hidden */}
              <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">All Donated Items</h2>
              <div className="max-h-96 overflow-y-auto w-full">
                {Object.keys(groupedDonations).map((date) => (
                  <div key={date} className="mb-4">
                    <h3 className="text-xl font-semibold mb-2 text-green-700">{date}</h3>
                    {groupedDonations[date].map((donation, index) => (
                      <div key={index} className="bg-gray-100 p-4 mb-2 rounded-lg shadow text-black">
                        <p><strong>Donated Day:</strong> {new Date(donation.date).toLocaleDateString()}</p>
                        <p><strong>Item:</strong> {donation.item}</p>
                        <p><strong>Type:</strong> {donation.type}</p>
                        <p><strong>Amount:</strong> {donation.amount}</p>
                        <p><strong>Location:</strong> {donation.location}</p>
                        <p><strong>Phone:</strong> {donation.phone}</p>
                        <p><strong>Description:</strong> {donation.description}</p>
                        <p><strong>User ID:</strong> {donation.userId}</p>
                        <p><strong>Checked:</strong> {donation.checked ? '✔️' : '❌'}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AllDonatedItems;