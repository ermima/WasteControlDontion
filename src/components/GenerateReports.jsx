/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { database } from '../firebase';
import Sidebar from './Sidebar';

const GenerateReports = () => {
  const [donations, setDonations] = useState([]);
  const [report, setReport] = useState('');
  const [todayDonations, setTodayDonations] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const donationsRef = ref(database, 'donations');
    onValue(donationsRef, (snapshot) => {
      const data = snapshot.val();
      const donationsArray = data ? Object.entries(data).map(([key, value]) => ({ id: key, ...value })) : [];
      setDonations(donationsArray);

      // Filter donations to only include today's donations
      const today = new Date().toISOString().split('T')[0];
      const todayDonations = donationsArray.filter(donation => donation.date && donation.date.split('T')[0] === today);
      setTodayDonations(todayDonations);
    });
  }, []);

  const generateReport = () => {
    const totalDonations = donations.length;
    const verifiedDonations = donations.filter(donation => donation.checked).length;

    // Count the number of each item type
    const itemCounts = donations.reduce((acc, donation) => {
      acc[donation.item] = (acc[donation.item] || 0) + 1;
      return acc;
    }, {});

    // Create a string representation of the item counts
    const itemCountsString = Object.entries(itemCounts)
      .map(([item, count]) => `${item}: ${count}`)
      .join('\n');

    const reportContent = `Total Donations: ${totalDonations}\nVerified Donations: ${verifiedDonations}\n\nItems Donated:\n${itemCountsString}`;
    setReport(reportContent);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    // Perform any logout logic here if needed
    navigate('/');
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-grow" style={{ backgroundImage: "url('/AdminBack.png')" }}>
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center fixed w-full z-50">
          <h1 className="text-xl font-bold">Resource Waste Control and Donation Application</h1>
          <div className="flex items-center">
            <button className="md:hidden text-white p-4" onClick={toggleSidebar}>
              ☰
            </button>
          </div>
        </header>
        
        <div className="pt-16 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full  max-w-screen-lg relative">
            <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 ml-4 flex float-end">
              Logout
            </button>
            <h2 className="text-2xl font-bold mb-4">Generate Reports</h2>
            <button onClick={generateReport} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
              Generate Report
            </button>
            {report && (
              <div className="mt-4 text-black-100 bg-gray-100 p-4 rounded-lg shadow">
                <pre>{report}</pre>
              </div>
            )}
            <h2 className="text-2xl font-bold text-black-100 mt-6 mb-4">Todays Donations</h2>
            <p className='text-black-100'> Today donated items: {todayDonations.length}</p>
            {todayDonations.length > 0 ? (
              <div className="mt-4 text-black-100 bg-gray-100 p-4 rounded-lg shadow">
                {todayDonations.map((donation) => (
                  <div key={donation.id} className="mb-4">
                    <p><strong>Item:</strong> {donation.item}</p>
                    <p><strong>Type:</strong> {donation.type}</p>
                    <p><strong>Amount:</strong> {donation.amount}</p>
                    <p><strong>Location:</strong> {donation.location}</p>
                    <p><strong>Phone:</strong> {donation.phone}</p>
                    <p><strong>Description:</strong> {donation.description}</p>
                    <p><strong>Date:</strong> {new Date(donation.date).toLocaleString()}</p>
                    <p><strong>Checked:</strong> {donation.checked ? '✔️' : '❌'}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No donations made today.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateReports;
