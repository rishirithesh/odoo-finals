import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ElectricBorder from '../components/ElectricBorder';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleForgot = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot', { email });
      toast.success('OTP sent to console/email. Check console for OTP.');
      console.log('Simulated OTP: ' + res.data.otp); // Assume backend returns OTP for simulation
      navigate('/'); // Or to a verify OTP page if time allows
    } catch (err) {
      toast.error('Error sending OTP');
      console.error(err);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <ElectricBorder color="#6366F1" speed={1} chaos={0.5} thickness={3} style={{ borderRadius: 16 }}>
        <form
          onSubmit={handleForgot}
          className="bg-gray-800 p-8 rounded-lg shadow-2xl w-96 transform transition-all hover:scale-102 z-10 border border-gray-700"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-white">Forgot Password</h2>
          <div className="space-y-6">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 placeholder-gray-400"
              aria-label="Email"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200 shadow-md hover:shadow-lg"
          >
            Send OTP
          </button>
          <p className="mt-4 text-center text-gray-300">
            Back to{' '}
            <a href="/" className="text-indigo-400 hover:underline transition duration-200">
              Login
            </a>
          </p>
        </form>
      </ElectricBorder>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ForgotPassword;