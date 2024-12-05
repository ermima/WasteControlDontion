/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Navbar3 from './Navbar3';
import Footer from './Footer';
const AdminLogin = () => {
  const [email, setEmail] = useState(''); // Set to empty string
  const [password, setPassword] = useState(''); // Set to empty string
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const adminEmail = 'ermiasantigegn21@gmail.com';
    const adminPassword = '212121';
    createUserWithEmailAndPassword(auth, adminEmail, adminPassword)
      .then((userCredential) => {
        // Successfully registered
        console.log('Admin user registered:', userCredential.user);
      })
      .catch((error) => {
        if (error.code !== 'auth/email-already-in-use') {
          setError('Error registering admin user: ' + error.message);
        }
      });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const auth = getAuth();
    const adminEmail = 'ermiasantigegn21@gmail.com';

    if (email !== adminEmail) {
      setError("It's not admin email");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Successfully logged in
        navigate('/admindashboard'); // Redirect to the dashboard
      })
      .catch((error) => {
        setError('Error logging in: ' + error.message);
      });
  };

  return (
    <>
    <Navbar3/>
      <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/admin.png')" }}>
      <div className="bg-white bg-opacity-35 font-extralight p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold font-serif mb-6 text-blue-700">Admin Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-300 shadow appearance-none border rounded w-full py-2 px-3 text-black-100 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-slate-300 shadow appearance-none border rounded w-full py-2 px-3 text-black-100 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AdminLogin;
