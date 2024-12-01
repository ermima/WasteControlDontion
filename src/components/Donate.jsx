/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
const Donate = () => {
  const [form, setForm] = useState({
    type: '',
    amount: '',
    location: '',
    additionalInfo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value, 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Donation form submitted', form);
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <motion.div>
      <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow-md w-full max-w-lg'>
        <h2 className='text-2xl font-bold mb-4'>Donate Your Resources</h2>
        <label className='block mb-2'>
          <span className='text-gray-700'>Type of Resource</span>
          <input
            type='text'
            name='type'
            value={form.type}
            onChange={handleChange}
            className='block w-full mt-1 p-2 border rounded'
            placeholder='e.g., Food, Clothes, Electronics'
            required
          />
        </label>
        <label className='block mb-2'>
          <span className='text-gray-700'>Amount</span>
          <input
            type='text'
            name='amount'
            value={form.amount}
            onChange={handleChange}
            className='block w-full mt-1 p-2 border rounded'
            placeholder='e.g., 10 kg, 5 items'
            required
          />
        </label>
        <label className='block mb-2'>
          <span className='text-gray-700'>Location</span>
          <input
            type='text'
            name='location'
            value={form.location}
            onChange={handleChange}
            className='block w-full mt-1 p-2 border rounded'
            placeholder='Your location'
            required
          />
        </label>
        <label className='block mb-4'>
          <span className='text-gray-700'>Additional Information</span>
          <textarea
            name='additionalInfo'
            value={form.additionalInfo}
            onChange={handleChange}
            className='block w-full mt-1 p-2 border rounded'
            placeholder='Any additional information'
            rows={4}
          />
        </label>
        <button type='submit' className='bg-blue-500 text-white py-2 px-4 rounded'>
          Submit Donation
        </button>
      </form>
      </motion.div>
    </div>
  );
};

export default Donate;
