/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { ref, set, push } from 'firebase/database';
import DonationForm from './DonationForm'; // Adjust the import based on your file structure
import { database } from './firebase'; // Adjust the import based on your Firebase setup

const DonationPage = () => {
  const [donation, setDonation] = useState({
    item: '',
    type: '',
    amount: '',
    location: '',
    phone: '',
    description: '',
    date: '', // This will be set on form submission
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonation((prevDonation) => ({
      ...prevDonation,
      [name]: value,
    }));
  };

  const handleDonationSubmit = (donationWithDate) => {
    const donationsRef = ref(database, 'donations');
    set(push(donationsRef), donationWithDate)
      .then(() => {
        console.log('Donation submitted successfully!');
        // Optionally reset the form
        setDonation({
          item: '',
          type: '',
          amount: '',
          location: '',
          phone: '',
          description: '',
          date: '',
        });
      })
      .catch((error) => {
        console.error('Error submitting donation:', error);
      });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Make a Donation</h1>
      <DonationForm donation={donation} handleChange={handleChange} handleSubmit={handleDonationSubmit} />
    </div>
  );
};

export default DonationPage;