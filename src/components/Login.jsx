/* eslint-disable react/prop-types */
import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { database } from '../firebase';

const Login = ({ setUserId }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [showReset, setShowReset] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUserId(user.uid); // Set the userId
        navigate('/dashboard');
        alert('እንኳን ደህና መጡ። በተሳካ ሁኔታ ገብተዋል!');
        
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        alert('Password reset email sent!');
        setShowReset(false);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      set(ref(database, 'users/' + user.uid), {
        email: user.email
      });
      alert('User registered successfully!');
    })
    .catch((error) => {
      alert(error.message);
    });
  };

  return (
    <>
    
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-500 to-fuchsia-900">
     
      <div className="w-full max-w-md p-8 space-y-6 bg-gradient-to-r from-white-100 to-gray-100 rounded shadow-md">
        
        {showReset ? (
          <form onSubmit={handleResetPassword}>
            <h2 className="text-2xl font-bold text-center text-black-100">የይለፍ ቃል ይቀይሩ</h2>
           
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="ኢሜል"
              required
              className="w-full px-3 py-2 mt-4 border rounded"
            />
            <button type="submit" className="w-full px-3 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-700">
              የይለፍ ቃል ይቀይሩ
            </button>
            <p className="mt-4 text-center text-black">
              የይለፍ ቃልቀን ያስታውሳሉ?{' '}
              <a href="#" onClick={() => setShowReset(false)} className="text-blue-500 hover:underline">
                ይግቡ
              </a>
            </p>
          </form>
        ) : showRegister ? (
          <form onSubmit={handleRegister}>
            <h2 className="text-2xl font-bold text-center text-black" >መመዝገቢያ</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ኢሜል"
              required
              className="w-full px-3 py-2 mt-4 border rounded"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="የይለፍ ቃል"
              required
              className="w-full px-3 py-2 mt-4 border rounded"
            />
            <button type="submit" className="w-full px-3 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-700">
              ይመዝገቡ
            </button>
            <p className="mt-4 text-center text-black-100">
              ካሁን በፊት ተመዝግበዋል?{' '}
              <a href="#" onClick={() => setShowRegister(false)} className="text-blue-500 hover:underline">
                ይግቡ
              </a>
            </p>
          </form>
          
        ) : (
          <form onSubmit={handleLogin}>
             
            <h2 className="text-2xl font-bold text-center text-blue-700">መግቢያ</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ኢሜል"
              required
              className="w-full px-3 py-2 mt-4 border rounded"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="የይለፍ ቃል"
              required
              className="w-full px-3 py-2 mt-4 border rounded"
            />
            <button type="submit" className="w-full px-3 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-700">
              ይግቡ
            </button>
            <p className="mt-4 text-center text-black-100">
              የይለፍ ቃል ረስተዋል?{' '}
              <a href="#" onClick={() => setShowReset(true)} className="text-blue-500 hover:underline">
                የይለፍ ቃል ይቀይሩ
              </a>
            </p>
            <p className="mt-4 text-center text-black-100">
              ካሁን በፊት አልተመዘገቡም?{' '}
              <a href="#" onClick={() => setShowRegister(true)} className="text-blue-500 hover:underline">
                ይመዝገቡ
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
    
    </>
    
  );
  
};

export default Login;
