/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { ref, set, onValue } from 'firebase/database';
import { database } from '../firebase';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const UserDashboard = ({ userId }) => {
  const [donation, setDonation] = useState({
    item: '',
    type: '',
    amount: '',
    location: '',
    phone: '',
    description: ''
  });

  const [donationsList, setDonationsList] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    if (!userId) {
      setError('User ID is not defined. Please log in again.');
      return;
    }

    const donationsRef = ref(database, 'donations');
    onValue(donationsRef, (snapshot) => {
      const data = snapshot.val();
      const donationsArray = data ? Object.entries(data).map(([key, value]) => ({ id: key, ...value })) : [];
      // Filter donations to only include those donated by the current user
      const userDonations = donationsArray.filter(donation => donation.userId === userId);
      setDonationsList(userDonations);
    });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonation((prevDonation) => ({
      ...prevDonation,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    if (!userId) {
      setError('User ID is not defined. Please log in again.');
      return;
    }

    const donationRef = ref(database, 'donations/' + Date.now());
    set(donationRef, { ...donation, userId }) // Include userId in the donation data
      .then(() => {
        alert('Donation submitted successfully!');
        setDonation({
          item: '',
          type: '',
          amount: '',
          location: '',
          phone: '',
          description: ''
        });
      })
      .catch((error) => {
        setError('Error submitting donation: ' + error.message);
      });
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      alert('Logged out successfully!');
      navigate('/login'); // Redirect to the login page
    }).catch((error) => {
      setError('Error logging out: ' + error.message);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r  from-gray-500 to-fuchsia-900 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative mt-56 ">
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
        <h2 className="text-2xl font-bold mb-6">Donation Form</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Item</label>
            <input
              type="text"
              name="item"
              value={donation.item}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Type</label>
            <input
              type="text"
              name="type"
              value={donation.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Amount</label>
            <input
              type="number"
              name="amount"
              value={donation.amount}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={donation.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={donation.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={donation.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Submit Donation
          </button>
        </form>
        <h2 className="text-2xl font-bold mt-6 mb-4 text-blue-700">Donated Items</h2>
        <div className="max-h-64 overflow-y-auto text-black-80"> 
          {donationsList.map((donation, index) => (
            <div key={index} className="bg-gray-100 p-4 mb-2 rounded-lg shadow text-black-100">
              <p><strong>Item:</strong> {donation.item}</p>
              <p><strong>Type:</strong> {donation.type}</p>
              <p><strong>Amount:</strong> {donation.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
