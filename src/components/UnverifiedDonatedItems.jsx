/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { ref, onValue, update } from 'firebase/database';
import { database } from '../firebase';
import Sidebar from './Sidebar';

const UnverifiedDonatedItems = () => {
  const [donationsList, setDonationsList] = useState([]);
  const [verifiedMessage, setVerifiedMessage] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [confirming, setConfirming] = useState(null);
  const [showVerifiedText, setShowVerifiedText] = useState(false);

  useEffect(() => {
    const donationsRef = ref(database, 'donations');
    onValue(donationsRef, (snapshot) => {
      const data = snapshot.val();
      const donationsArray = data ? Object.entries(data).map(([key, value]) => ({ id: key, ...value })) : [];
      donationsArray.sort((a, b) => new Date(b.date) - new Date(a.date));
      setDonationsList(donationsArray);
    });
  }, []);

  const handleCheck = (donationId, checked) => {
    setConfirming(donationId);
  };

  const confirmCheck = (donationId, checked) => {
    const donationRef = ref(database, `donations/${donationId}`);
    setShowVerifiedText(true);
    update(donationRef, { checked }).then(() => {
      setVerifiedMessage(donationId);
      
      setTimeout(() => {
        setShowVerifiedText(false);
        setVerifiedMessage(null);
        setDonationsList(prevList => prevList.map(donation => 
          donation.id === donationId ? { ...donation, checked: true } : donation
        ));
      }, 3000);
    });
    setConfirming(null);
  };

  const unverifiedDonations = donationsList.filter(donation => !donation.checked);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-grow"style={{ backgroundImage: "url('/AdminBack.png')" }} >
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center fixed w-full z-50">
          <h1 className="text-xl font-bold">Resource Waste Control and Donation Application</h1>
          <button className="md:hidden text-white p-4" onClick={toggleSidebar}>
            ☰
          </button>
        </header>
        <div className="pt-16 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative ">
            <h2 className="text-2xl font-bold mt-6 mb-4 text-blue-700">Unverified Donated Items</h2>
            <div className="max-h-96 overflow-y-auto text-black-80">
              {unverifiedDonations.map((donation, index) => (
                <div key={index} className="bg-gray-100 p-4 mb-2 rounded-lg shadow text-black-100">
                  <p><strong>Item:</strong> {donation.item}</p>
                  <p><strong>Type:</strong> {donation.type}</p>
                  <p><strong>Amount:</strong> {donation.amount}</p>
                  <p><strong>Location:</strong> {donation.location}</p>
                  <p><strong>Phone:</strong> {donation.phone}</p>
                  <p><strong>Description:</strong> {donation.description}</p>
                  <p><strong>User ID:</strong> {donation.userId}</p>
                  <label>
                    <input
                      type="checkbox"
                      checked={donation.checked || false}
                      onChange={(e) => handleCheck(donation.id, e.target.checked)}
                    />
                    Checked
                  </label>
                  {verifiedMessage === donation.id && (
                    <p className="text-green-500 mt-2">Verified</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        {confirming && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white text-black-100 p-6 rounded-lg shadow-lg">
              <p>Are you sure you want to verify this item?</p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => confirmCheck(confirming, true)}
                  className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 mr-2"
                >
                  Yes
                </button>
                <button
                  onClick={() => setConfirming(null)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                >
                  No
                </button>
              </div>
              {showVerifiedText && (
                <p className="text-green-500 mt-2">Verified</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnverifiedDonatedItems;
