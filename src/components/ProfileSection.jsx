/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const ProfileSection = ({ profile, handleProfileChange, handleProfilePictureChange, handleProfileSubmit, handleDeleteAccount, error }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const settingsRef = useRef(null);
  const editProfileRef = useRef(null);

  const toggleEdit = useCallback(() => {
    setIsEditing(!isEditing);
  }, [isEditing]);

  const toggleDelete = useCallback(() => {
    setIsDeleting(!isDeleting);
    setConfirmDelete(false); // Reset confirm delete state
  }, [isDeleting]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleProfileSubmit(e);
    setIsEditing(false); // Hide the form after submitting
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setConfirmDelete(true); // Show the confirmation text
  };

  const confirmDeleteAccount = (e) => {
    e.preventDefault();
    handleDeleteAccount();
    setIsDeleting(false); // Hide the delete section after submitting
  };

  const handleClickOutside = (event) => {
    if (settingsRef.current && !settingsRef.current.contains(event.target)) {
      setIsDeleting(false);
    }
    if (editProfileRef.current && !editProfileRef.current.contains(event.target)) {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col mb-3 bg-gradient-to-r from-blue-400 to-blue-100 p-3 rounded-lg shadow-lg"
    >
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col md:flex-row items-center space-x-1 relative">
          <div className="relative mb-4 md:mb-0">
            {profile.profilePicture ? (
              <img src={profile.profilePicture} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-blue-800 font-bold font-serif">Profile</span>
              </div>
            )}
            <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer" aria-label="Upload Profile Picture">
              <span className="text-xl">+</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="hidden"
              />
            </label>
          </div>
          <div className="text-center md:text-left">
            <p className="text-primary font-bold font-serif">{profile.email}</p>
          </div>
        </div>
        <motion.span
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleDelete}
          className="text-2xl cursor-pointer text-primary mt-4 md:mt-0"
          aria-label="Open Settings"
        >
          &#9881; Settings
        </motion.span>
      </div>
      <motion.a
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        href="#"
        onClick={toggleEdit}
        className="w-full md:w-auto max-w-40 text-2xl font-bold mb-3 text-primary underline text-center md:text-left"
        aria-label="Edit Profile"
      >
        Edit Profile
      </motion.a>
      {isEditing && (
        <div ref={editProfileRef}>
          {error && <div className="mb-4 text-red-500">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
                aria-label="Email"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Update Email
            </motion.button>
          </form>
        </div>
      )}
      {isDeleting && (
        <div ref={settingsRef} className="mt-4 w-full md:w-96 bg-gradient-to-r from-blue-500 to-blue-100 p-3 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-red-500">Delete Account</h2>
          {confirmDelete ? (
            <>
              <p className="text-gray-700"><span className='text-red-600 font-bold font-serif'>Warning!</span> Are you sure you want to delete your account? This action will disable your account for 30 days.</p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={confirmDeleteAccount}
                className="mt-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                aria-label="Confirm Delete Account"
              >
                Confirm Delete
              </motion.button>
            </>
          ) : (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDelete}
              className="mt-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              aria-label="Delete Account"
            >
              Delete Account
            </motion.button>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default ProfileSection;