import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ElectricBorder from '../components/ElectricBorder';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('manager');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', { username, email, password, role });
      toast.success('Signup successful! Log in now.');
      navigate('/');
    } catch (err) {
      console.error('Signup Error Details:', err.response?.data || err.message);
      toast.error(`Signup failed: ${err.response?.data?.message || 'Unknown error'}`);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <ElectricBorder color="#6366F1" speed={1} chaos={0.5} thickness={3} style={{ borderRadius: 16 }}>
        <form
          onSubmit={handleSignup}
          className="bg-gray-800 p-8 rounded-lg shadow-2xl w-96 transform transition-all hover:scale-102 z-10 border border-gray-700"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-white">Signup for Manufacturing App</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 placeholder-gray-400"
              aria-label="Username"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 placeholder-gray-400"
              aria-label="Email"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 placeholder-gray-400"
              aria-label="Password"
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              aria-label="Role"
            >
              <option value="manager" className="text-gray-800">Manager</option>
              <option value="operator" className="text-gray-800">Operator</option>
              <option value="inventory" className="text-gray-800">Inventory Manager</option>
              <option value="admin" className="text-gray-800">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200 shadow-md hover:shadow-lg"
          >
            Signup
          </button>
          <p className="mt-4 text-center text-gray-300">
            Already have an account?{' '}
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

export default Signup;