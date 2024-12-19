/* eslint-disable react/prop-types */
import { useState } from 'react';
import { auth, database } from '../firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword, sendEmailVerification, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar3';
import Footer from './Footer';

const Login = ({ setUserId }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [showReset, setShowReset] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(false);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        //if (user.emailVerified) {
          setUserId(user.uid); // Set the userId
          navigate('/dashboard');
       // } else {
         // setError('Please verify your email before logging in.');
          //auth.signOut();
        //}
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
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
        setError(error.message);
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        sendEmailVerification(user)
          .then(() => {
            set(ref(database, 'users/' + user.uid), {
              email: user.email
            });
            alert('Registered');
            setShowRegister(false);
          })
          .catch((error) => {
            setError(error.message);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUserId(user.uid); // Set the userId
        navigate('/dashboard');
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  

  return (
    <>
      <div className='bg-primary'>
        <Navbar />
      </div>
      <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/backg4.png')" }}>
        <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-75 rounded shadow-red-600">
          {error && <p className="text-red-500 text-center">{error}</p>}
          {showReset ? (
            <form onSubmit={handleResetPassword}>
              <h2 className="text-2xl font-bold text-center text-black-100">የይለፍ ቃል ይቀይሩ</h2>
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="ኢሜል"
                required
                className="w-full px-3 py-2 mt-4 border border-blue-600 text-black-100 rounded bg-transparent "
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
              <h2 className="text-2xl font-bold text-center text-black">መመዝገቢያ</h2>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ኢሜል"
                required
                className="w-full px-3 py-2 mt-4 border text-black-100 border-blue-600  rounded bg-transparent" 
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="የይለፍ ቃል"
                required
                className="w-full px-3 py-2 mt-4 text-black-100 border border-blue-600  rounded bg-transparent"
              />
              <button type="submit" className="w-full px-3 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? 'Registering...' : 'ይመዝገቡ'}
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
                className="w-full px-3 py-2 mt-4 text-black-100 border border-blue-600  rounded bg-transparent"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="የይለፍ ቃል"
                required
                className="w-full px-3 py-2 mt-4 text-black-100 border border-blue-600  rounded bg-transparent"
              />
              <button type="submit" className="w-full px-3 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'ይግቡ'}
              </button>
              
              <p className="mt-4 text-center text-black-100">
                የይለፍ ቃል ረስተዋል?{' '}
                <a href="#" onClick={() => setShowReset(true)} className="text-blue-500 hover:underline font-bold">
                  የይለፍ ቃል ይቀይሩ
                </a>
              </p>
              <p className="mt-4 text-center text-black-100">
                ካሁን በፊት አልተመዘገቡም?{' '}
                <a href="#" onClick={() => setShowRegister(true)} className="text-blue-500 hover:underline font-bold">
                  ይመዝገቡ
                </a>
              </p>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full px-3 py-2 mt-4 text-white bg-red-500 rounded hover:bg-red-700"
              >
                Sign in with Google
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
