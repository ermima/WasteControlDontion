import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { About, Contact, Experience, Hero, Works, Navbar, Footer } from './components';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import GenerateReports from './components/GenerateReports'; // Import the GenerateReports component
import UnverifiedDonatedItems from './components/UnverifiedDonatedItems';
import VerifiedDonatedItems from './components/VerifiedItems';
const App = () => {
  const [userId, setUserId] = useState(null);

  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'></div>
        <Routes>
          <Route path="/login" element={<Login setUserId={setUserId} />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard userId={userId} />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/generate-reports" element={<GenerateReports />} /> {/* Add GenerateReports route */}
          <Route path="/unverified-donated-items" element={<UnverifiedDonatedItems />} /> {/* Add UnverifiedDonatedItems route */}
          <Route path="/verified-donated-items" element={<VerifiedDonatedItems />} /> {/* Add UnverifiedDonatedItems route */}
          <Route path="/home" element={<Hero />} />
          <Route path="/" element={
            <>
              <Navbar />
              <Hero />
              <Works />
              <About />
              <Experience />
              <div className='relative z-0'>
                <Contact />
                <Footer />
              </div>
            </>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
