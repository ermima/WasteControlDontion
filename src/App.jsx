import  { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { About, Contact, Experience, Hero,Works, Navbar,Footer } from './components';
import Login from './components/Login'; // Import the Login component
import Register from './components/Register'; // Import the Register component
import Dashboard from './components/Dashboard'; // Import the UserDashboard component
import AdminDashboard from './components/AdminDashboard'; // Correct import for AdminDashboard
import AdminLogin from './components/AdminLogin'; // Correct import for AdminLogin

const App = () => {
  const [userId, setUserId] = useState(null);

  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          
        </div>
        <Routes>
          <Route path="/login" element={<Login setUserId={setUserId} />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} /> {/* Add Register route */}
          <Route path="/dashboard" element={<Dashboard userId={userId} />} /> {/* Add UserDashboard route */}
          <Route path="/admindashboard" element={<AdminDashboard />} /> {/* Add AdminDashboard route */}
          <Route path="/home" element={<Hero />} /> {/* Add Hero route */}
          <Route path="/" element={
            <>
            <Navbar />
              <Hero />
              <Works/>
              <About />
              
              <Experience />
              <div className='relative z-0'>
                <Contact />
                <Footer/>
              </div>
            </>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
