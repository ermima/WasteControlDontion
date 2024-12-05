/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [donationsList, setDonationsList] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    const donationsRef = ref(database, 'donations');
    onValue(donationsRef, (snapshot) => {
      const data = snapshot.val();
      const donationsArray = data ? Object.entries(data).map(([key, value]) => ({ id: key, ...value })) : [];
      // Sort donations by date in descending order
      donationsArray.sort((a, b) => new Date(b.date) - new Date(a.date));
      setDonationsList(donationsArray);
    });
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      alert('Logged out successfully!');
      navigate('/'); // Redirect to the login page
    }).catch((error) => {
      setError('Error logging out: ' + error.message);
    });
  };

  // Group donations by date
  const groupedDonations = donationsList.reduce((acc, donation) => {
    const date = window.dayjs(donation.date).format('YYYY-MM-DD'); // Use window.dayjs
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(donation);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-500 to-fuchsia-900 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
        <h2 className="text-2xl font-bold mt-6 mb-4 text-blue-700">All Donated Items</h2>
        <div className="max-h-64 overflow-y-auto text-black-80">
          {Object.keys(groupedDonations).map((date) => (
            <div key={date}>
              <h3 className="text-xl font-semibold mt-4 mb-2 text-green-700">{date}</h3>
              {groupedDonations[date].map((donation, index) => (
                <div key={index} className="bg-gray-100 p-4 mb-2 rounded-lg shadow text-black-100">
                  <p><strong>Item:</strong> {donation.item}</p>
                  <p><strong>Type:</strong> {donation.type}</p>
                  <p><strong>Amount:</strong> {donation.amount}</p>
                  <p><strong>Location:</strong> {donation.location}</p>
                  <p><strong>Phone:</strong> {donation.phone}</p>
                  <p><strong>Description:</strong> {donation.description}</p>
                  <p><strong>User ID:</strong> {donation.userId}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
