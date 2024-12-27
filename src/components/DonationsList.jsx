/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { database, auth } from '../firebase';
import { ref, remove } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';

const DonationsList = ({ donationsList, handleUpdateDonation }) => {
  // State to manage currently editing donation
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedDonation, setEditedDonation] = useState({
    item: '',
    type: '',
    amount: '',
    location: '',
    phone: '',
    description: '',
    date: new Date().toISOString(),
  });

  // State to manage deletion confirmation
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  
  // State to manage current user ID
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleEditClick = (index, donation) => {
    setEditingIndex(index);
    setEditedDonation(donation);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDonation((prevDonation) => ({
      ...prevDonation,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateDonation(editingIndex, editedDonation);
    setEditingIndex(null);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    const donationRef = ref(database, `donations/${deleteId}`);
    remove(donationRef)
      .then(() => {
        handleUpdateDonation((prevList) => prevList.filter((donation) => donation.id !== deleteId));
        setShowConfirm(false);
        setDeleteId(null);
      })
      .catch((error) => {
        console.error('Error deleting donation:', error);
      });
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setDeleteId(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col m-4 bg-gradient-to-r from-blue-400 to-blue-100 p-3 w-full md:w-96 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mt-6 mb-4 text-blue-700">Donated Items</h2>
      <div className="m-4 overflow-y-auto text-black-80 max-w-96 max-h-150">
        {donationsList.map((donation, index) => (
          <div key={index} className="bg-gray-100 p-4 mb-2 rounded-lg shadow text-black-100">
            {editingIndex === index ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700">አይነት(ምግብ፣ ቅሳቁስ ወዘተ)</label>
                  <input
                    type="text"
                    name="item"
                    value={editedDonation.item}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border bg-transparent border-blue-500 rounded-lg text-black"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">
                    አይነት(ምግብ ከሆነ የታሸገ፣ የበሰለ፤ ወዘተ; የአይነት ድጋፍ ከሆነ የዕቃው አይነት
                  </label>
                  <input
                    type="text"
                    name="type"
                    value={editedDonation.type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border bg-transparent border-blue-500 rounded-lg text-black"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">መጠን(ኪግ ፣ ብዛት ወዘተ)</label>
                  <input
                    type="number"
                    name="amount"
                    value={editedDonation.amount}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border bg-transparent border-blue-500 rounded-lg text-black"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">አድራሻ(በዝርዝር)</label>
                  <input
                    type="text"
                    name="location"
                    value={editedDonation.location}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border bg-transparent border-blue-500 rounded-lg text-black"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">የስልክ ቁጥር</label>
                  <input
                    type="tel"
                    name="phone"
                    value={editedDonation.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border bg-transparent border-blue-500 rounded-lg text-black"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">ተጨማሪ ገለፃ</label>
                  <textarea
                    name="description"
                    value={editedDonation.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border bg-transparent border-blue-500 rounded-lg text-black"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                  Update Donation
                </button>
              </form>
            ) : (
              <>
                <p>
                  <strong>Item:</strong> {donation.item}
                </p>
                <p>
                  <strong>Type:</strong> {donation.type}
                </p>
                <p>
                  <strong>Amount:</strong> {donation.amount}
                </p>
                <p>
                  <strong>Location:</strong> {donation.location}
                </p>
                <p>
                  <strong>Phone:</strong> {donation.phone}
                </p>
                <p>
                  <strong>Description:</strong> {donation.description}
                </p>
                <p>
                  <strong>Date:</strong> {new Date(donation.date).toLocaleDateString()}
                </p>
                <p className="text-blue-600">
                  <strong>Checked status:</strong> {donation.checked ? '✔️✔️' : '❌'}
                </p>
                {donation.checked && (
                  <p className="text-green-600">
                    <strong>Thank you for your donation!</strong>
                  </p>
                )}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditClick(index, donation)}
                    className={`mt-2 py-1 px-3 rounded-lg ${
                      donation.checked
                        ? 'bg-yellow-400 bg-opacity-70 text-gray-700 text-opacity-40 cursor-not-allowed'
                        : 'bg-yellow-500 text-white hover:bg-yellow-600'
                    }`}
                    disabled={donation.checked} // Disable edit button if checked
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(donation.id)}
                    className={`mt-2  ${donation.checked 
                      ? "bg-red-400 bg-opacity-70 text-gray-700 text-opacity-40 cursor-not-allowed" 
                      :"bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                      
                    }`}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
          <div className="bg-white p-3 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-red-700">Confirm Deletion</h2>
            <p className="font-serif font-bold text-black-100">
              <span className="text-red-700 font-serif font-bold underline">Warning: </span>
              መረጃውን እያጠፉ ነው! ይሂንን ከስጦታ ዝርዝር ለማጥፋት እርግጠኛ ነዎት?
            </p>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              >
                አዎ
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
              >
                አልፈልግም
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default DonationsList;