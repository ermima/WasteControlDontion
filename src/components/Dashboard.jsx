/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { ref, set, onValue, update } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { database } from '../firebase';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    description: ''
  });

  const [profile, setProfile] = useState({
    email: '',
    profilePicture: ''
  });

  const [donationsList, setDonationsList] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    if (!userId) {
      setError('User ID is not defined. Please log in again.');
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

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    if (!userId) {
      setError('User ID is not defined. Please log in again.');
      return;
    }

    const userRef = ref(database, `users/${userId}`);
    update(userRef, profile)
      .then(() => {
        alert('Profile updated successfully!');
      })
      .catch((error) => {
        setError('Error updating profile: ' + error.message);
      });
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      alert('Logged out successfully!');
      navigate('/'); 
    }).catch((error) => {
      setError('Error logging out: ' + error.message);
    });
  };

  const handleUpdateDonation = (index, updatedDonation) => {
    const donationId = donationsList[index].id;
    const donationRef = ref(database, `donations/${donationId}`);
    update(donationRef, updatedDonation)
      .then(() => {
        alert('Donation updated successfully!');
        const updatedDonationsList = [...donationsList];
        updatedDonationsList[index] = { ...updatedDonation, id: donationId };
        setDonationsList(updatedDonationsList);
      })
      .catch((error) => {
        setError('Error updating donation: ' + error.message);
      });
  };

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

  return (
    <div className="min-h-screen w-full bg-primary flex items-center justify-center">
      <Navbar2 /> 
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-500 to-slate-300  rounded-lg shadow-lg w-full relative mt-32"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLogout}
          className="absolute top-4 right-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
        >
          Logout
        </motion.button>
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
       <div>
         <Footer/>
       </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
