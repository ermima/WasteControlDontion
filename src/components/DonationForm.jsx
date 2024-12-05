/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { motion } from 'framer-motion';

const DonationForm = ({ donation, handleChange, handleSubmit }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='m-4 p-3 w-full md:w-96 bg-gradient-to-r from-blue-400 to-blue-100 rounded-lg shadow-lg'
    >
      <h2 className="text-2xl font-bold mt-6 mb-4 text-black-100">Donation Form</h2>
      <form onSubmit={handleSubmit} className='border border-blue-400 rounded-lg p-2'>
        <div className="mb-4 max-w-96">
          <label className="block text-gray-700">አይነት(ምግብ፣ ቅሳቁስ ወዘተ)</label>
          <input
            type="text"
            name="item"
            value={donation.item}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-primary bg-transparent"
            required
          />
        </div>
        <div className="mb-4 max-w-96">
          <label className="block text-gray-700">አይነት(ምግብ ከሆነ የታሸገ፣ የበሰለ፤ ወዘተ; የአይነት ድጋፍ ከሆነ የዕቃው አይነት)</label>
          <input
            type="text"
            name="type"
            value={donation.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-primary bg-transparent"
            required
          />
        </div>
        <div className="mb-4 max-w-96">
          <label className="block text-gray-700">መጠን(ኪግ ፣ ብዛት ወዘተ)</label>
          <input
            type="text"
            name="amount"
            value={donation.amount}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-primary bg-transparent"
            required
          />
        </div>
        <div className="mb-4 max-w-96">
          <label className="block text-gray-700">አድራሻ (በዝርዝር)</label>
          <input
            type="text"
            name="location"
            value={donation.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-primary bg-transparent"
            required
          />
        </div>
        <div className="mb-4 max-w-96">
          <label className="block text-gray-700">ስልክ ቁጥር</label>
          <input
            type="tel"
            name="phone"
            value={donation.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-primary bg-transparent"
            required
          />
        </div>
        <div className="mb-4 max-w-96">
          <label className="block text-gray-700">ተጨማሪ ገለፃ</label>
          <textarea
            name="description"
            value={donation.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-primary bg-transparent"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full max-w-96 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Submit Donation
        </button>
      </form>
    </motion.div>
  );
};

export default DonationForm;
