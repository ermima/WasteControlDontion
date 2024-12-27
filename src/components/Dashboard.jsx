/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from 'react';
import { ref, onValue, update, set } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { database } from '../firebase';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBell } from 'react-icons/fa';
import Navbar2 from './Navbar2';
import ProfileSection from './ProfileSection';
import DonationForm from './DonationForm';
import DonationsList from './DonationsList';
import Footer from './Footer';

const Dashboard = ({ userId }) => {
  const [donation, setDonation] = useState({
    item: '',
    type: '',
    amount: '',
    location: '',
    phone: '',
    description: '',
    date: new Date().toISOString() // Ensure date is stored in ISO format
  });

  const [profile, setProfile] = useState({
    email: '',
    profilePicture: ''
  });

  const [donationsList, setDonationsList] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    if (!userId) {
      setError('የዕርስዎን መለያ ማግኘት አልተቻለም. እባክዎ እንደገና ይግቡ።');
      return;
    }

    const userRef = ref(database, `users/${userId}`);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProfile({
          email: data.email,
          profilePicture: data.profilePicture || ''
        });
      }
    });

    const donationsRef = ref(database, 'donations');
    onValue(donationsRef, (snapshot) => {
      const data = snapshot.val();
      const donationsArray = data ? Object.entries(data).map(([key, value]) => ({ id: key, ...value })) : [];
      // Filter donations to only include those donated by the current user
      const userDonations = donationsArray.filter(donation => donation.userId === userId);
      setDonationsList(userDonations);
    });

    const notificationsRef = ref(database, `notifications/${userId}`);
    onValue(notificationsRef, (snapshot) => {
      const data = snapshot.val();
      const notificationsArray = data ? Object.entries(data).map(([key, value]) => ({ id: key, ...value })) : [];
      setNotifications(notificationsArray);
    });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonation((prevDonation) => ({
      ...prevDonation,
      [name]: value
    }));
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const storage = getStorage();
      const storageReference = storageRef(storage, `profilePictures/${userId}`);
      uploadBytes(storageReference, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setProfile((prevProfile) => ({
            ...prevProfile,
            profilePicture: url
          }));
          const userRef = ref(database, `users/${userId}`);
          update(userRef, { profilePicture: url });
        });
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    if (!userId) {
      setError('የዕርስዎን መለያ ማግኘት አልተቻለም. እባክዎ እንደገና ይግቡ።');
      return;
    }

    const donationRef = ref(database, 'donations/' + Date.now());
    set(donationRef, { ...donation, userId }) // Include userId in the donation data
      .then(() => {
        alert('በተሳካ ሁኔታ ማስገባት ችለዋል። እናመሰግናለን!');
        setDonation({
          item: '',
          type: '',
          amount: '',
          location: '',
          phone: '',
          description: '',
          date: new Date().toISOString() // Reset date to current date
        });
      })
      .catch((error) => {
        setError('Error submitting donation: ' + error.message);
      });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    if (!userId) {
      setError('የዕርስዎን መለያ ማኘት አልተቻለም። እባክዎ እንደገና ይግቡ።');
      return;
    }

    const userRef = ref(database, `users/${userId}`);
    update(userRef, profile)
      .then(() => {
        alert('በተሳካ ሁኔታ መቀየር ችለዋል!');
      })
      .catch((error) => {
        setError('Error updating profile: ' + error.message);
      });
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      alert('በትክክል እየወጡ ነው!');
      navigate('/');
    }).catch((error) => {
      setError('Error logging out: ' + error.message);
    });
  };

  const handleUpdateDonation = useCallback((index, updatedDonation) => {
    const donationId = donationsList[index].id;
    const donationRef = ref(database, `donations/${donationId}`);
    update(donationRef, updatedDonation)
      .then(() => {
        alert('ብተሳካ ሁኔታ አሻሽለዋል!');
        const updatedDonationsList = [...donationsList];
        updatedDonationsList[index] = { ...updatedDonation, id: donationId };
        setDonationsList(updatedDonationsList);
      })
      .catch((error) => {
        setError('Error updating donation: ' + error.message);
      });
  }, [donationsList]);

  const handleDeleteAccount = () => {
    const userRef = ref(database, `users/${userId}`);
    update(userRef, { disabled: true })
      .then(() => {
        alert('Account will be disabled for 30 days before deletion.');
        handleLogout();
      })
      .catch((error) => {
        setError('Error disabling account: ' + error.message);
      });
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const unreadNotifications = notifications.filter(notification => !notification.read).length > 0;

  return (
    <>
      <Navbar2 />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-r from-blue-500 to-slate-300 p-5 mt-24 w-full"
      >
        <div className='mt-4 flex flex-row md:flex-col sm:flex-col sm:space-y-2 p-3 w-full space-y-4 md:space-y-3 md:space-x-10'>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLogout}
            className="absolute top-4 right-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
          >
            Logout
          </motion.button>
          <div className='absolute top-4 right-32'>
            <FaBell
              className={`text-2xl cursor-pointer ${unreadNotifications ? 'text-red-500' : 'text-gray-500'}`}
              onClick={toggleNotifications}
            />
            {showNotifications && (
              <div className='fixed inset-0 flex items-center justify-center z-50'>
                <div className='absolute inset-0 bg-black opacity-50'></div>
                <div className='bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50'>
                  <h2 className='text-xl font-bold mb-2 text-blue-700'>Notifications</h2>
                  <div className='max-h-48 overflow-y-auto'>
                    {notifications.map((notification, index) => (
                      <div key={index} className='bg-gray-100 text-black-100 p-2 mb-2 rounded-lg shadow'>
                        <p>{notification.message}</p>
                        <p className='text-sm text-gray-500'>{new Date(notification.timestamp).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={toggleNotifications}
                    className='mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600'
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className='relative'>
            <div className='mt-12'>
              <h1 className='text-[32px]'>እንኳን ደህና መጡ። በተሳካ ሁኔታ ገብተዋል!</h1>
            </div>
          </div>
        </div>
        <ProfileSection
          profile={profile}
          handleProfileChange={handleProfileChange}
          handleProfilePictureChange={handleProfilePictureChange}
          handleProfileSubmit={handleProfileSubmit}
          handleDeleteAccount={handleDeleteAccount}
          error={error}
        />
        <div className='mt-4 flex flex-col md:flex-row p-3 w-full space-y-4 md:space-y-0 md:space-x-10'>
          <DonationForm
            donation={donation}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
          <DonationsList
            donationsList={donationsList}
            handleUpdateDonation={handleUpdateDonation}
          />
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default Dashboard;