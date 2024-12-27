/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { ref, onValue, update, push, set } from 'firebase/database';
import { database } from '../firebase';
import Sidebar from './Sidebar';
import DonationItem from './DonationItem';
import GenerateReport from './GenerateReport';
import { useNavigate } from 'react-router-dom';

const VerifiedDonatedItems = () => {
  const [donationsList, setDonationsList] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [report, setReport] = useState('');
  const [sentMessages, setSentMessages] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const donationsRef = ref(database, 'donations');
    onValue(donationsRef, (snapshot) => {
      const data = snapshot.val();
      const donationsArray = data ? Object.entries(data).map(([key, value]) => ({ id: key, ...value })) : [];
      donationsArray.sort((a, b) => new Date(b.date) - new Date(a.date));
      setDonationsList(donationsArray);
    });

    const sentMessagesRef = ref(database, 'sentMessages');
    onValue(sentMessagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSentMessages(data);
      }
    });
  }, []);

  const handleUnverify = (donationId) => {
    const donationRef = ref(database, `donations/${donationId}`);
    update(donationRef, { checked: false }).then(() => {
      setDonationsList(prevList => prevList.map(donation => 
        donation.id === donationId ? { ...donation, checked: false } : donation
      ));
    });
  };

  const generateReport = () => {
    const totalDonations = donationsList.length;
    const verifiedDonations = donationsList.filter(donation => donation.checked).length;

    const itemCounts = donationsList.reduce((acc, donation) => {
      acc[donation.item] = (acc[donation.item] || 0) + 1;
      return acc;
    }, {});

    const itemCountsString = Object.entries(itemCounts)
      .map(([item, count]) => `${item}: ${count}`)
      .join('\n');

    const reportContent = `Total Donations: ${totalDonations}\nVerified Donations: ${verifiedDonations}\n\nItems Donated:\n${itemCountsString}`;
    setReport(reportContent);
  };

  const sendThankYouMessage = (donationId, userId) => {
    const notificationRef = push(ref(database, `notifications/${userId}`));
    set(notificationRef, {
      message: "ስላደረጉት መልካም ነገር ምስጋናችን ከልብ ነው። በመልካም ተግባርዎ እንዲቀጥሉ እናበረታታለም። እናመሰናለን።",
      timestamp: Date.now()
    }).then(() => {
      alert('Thank you message sent successfully!');
      setSentMessages(prevState => ({ ...prevState, [donationId]: true }));
      const sentMessagesRef = ref(database, `sentMessages/${donationId}`);
      set(sentMessagesRef, true);
    }).catch((error) => {
      alert('Error sending thank you message: ' + error.message);
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-grow" style={{ backgroundImage: "url('/AdminBack.png')" }}>
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center fixed w-full z-50 shadow-md">
          <h1 className="text-xl font-bold">Resource Waste Control and Donation Application</h1>
          <button className="md:hidden text-white p-4" onClick={toggleSidebar}>
            ☰
          </button>
        </header>
        <div className="pt-20 md:pt-16 flex items-center justify-center">
          <div className="bg-white p-8 pt-20 rounded-lg shadow-lg w-full max-w-screen-lg relative">
            <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 flex float-end ml-auto">
              Logout
            </button>
            <h2 className="text-2xl font-bold mt-6 mb-4 text-blue-700">Verified Donated Items</h2>
            <div className="max-h-96 overflow-y-auto text-black-80">
              {donationsList.filter(donation => donation.checked).map((donation) => (
                <DonationItem
                  key={donation.id}
                  donation={donation}
                  handleUnverify={handleUnverify}
                  sendThankYouMessage={sendThankYouMessage}
                  sentMessages={sentMessages}
                />
              ))}
            </div>
            <GenerateReport
              generateReport={generateReport}
              report={report}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifiedDonatedItems;