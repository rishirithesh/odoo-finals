import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ElectricBorder from '../components/ElectricBorder';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error('Please fill in all fields');
      setLoading(false);
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error('Please enter a valid email address');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token, role } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      toast.success(`Login successful! Welcome, ${role}.`);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <ElectricBorder color="#6366F1" speed={1} chaos={0.5} thickness={3} style={{ borderRadius: 16 }}>
        <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-lg shadow-xl w-96 transform transition-all hover:scale-105 z-10 border border-gray-700">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">Login to Manufacturing App</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 bg-gray-700 text-white placeholder-gray-400"
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-6 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 bg-gray-700 text-white placeholder-gray-400"
            disabled={loading}
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="w-4 h-4 border-2 border-t-2 border-white rounded-full animate-spin mr-2"></span>
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </button>
          <p className="mt-4 text-center text-gray-300">
            <a href="/forgot-password" className="text-indigo-400 hover:underline">Forgot Password?</a> |{' '}
            <a href="/signup" className="text-indigo-400 hover:underline">Signup</a>
          </p>
        </form>
      </ElectricBorder>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;