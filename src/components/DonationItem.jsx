/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const DonationItem = ({ donation, handleUnverify, sendThankYouMessage, sentMessages }) => {
  return (
    <div className="bg-gray-100 p-4 mb-2 rounded-lg shadow text-black-100">
      <p><strong>Item:</strong> {donation.item}</p>
      <p><strong>Type:</strong> {donation.type}</p>
      <p><strong>Amount:</strong> {donation.amount}</p>
      <p><strong>Location:</strong> {donation.location}</p>
      <p><strong>Phone:</strong> {donation.phone}</p>
      <p><strong>Description:</strong> {donation.description}</p>
      <p><strong>User ID:</strong> {donation.userId}</p>
      <p><strong>Checked:</strong> {donation.checked ? '✔️ '  : '❌'}</p>
      <button
        onClick={() => handleUnverify(donation.id)}
        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 mt-2"
      >
        Unverify
      </button>
      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2 text-blue-700">Thank You Message</h3>
        <textarea
          value="ስላደረጉት መልካም ነገር ምስጋናችን ከልብ ነው። በመልካም ተግባርዎ እንዲቀጥሉ እናበረታታለም። እናመሰናለን።"
          readOnly
          className="w-full p-2 border rounded-lg text-black-100 bg-transparent border-green-700"
        />
      </div>
      <button
        onClick={() => sendThankYouMessage(donation.id, donation.userId)}
        id={`thankYouButton-${donation.id}`}
        className={`bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 mt-2 ${sentMessages[donation.id] ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={sentMessages[donation.id]}
      >
        Send Thank You
      </button>
    </div>
  );
};

export default DonationItem;