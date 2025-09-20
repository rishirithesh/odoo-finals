import React, { useState } from 'react';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import InteractiveBackground from '../components/InteractiveBackground';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const [username, setUsername] = useState('User1');
  const [email, setEmail] = useState('user1@example.com');
  const [role, setRole] = useState('manager');

  const handleUpdate = (e) => {
    e.preventDefault();
    toast.success('Profile updated!');
    console.log('Updated Profile', { username, email, role });
  };

  return (
    <>
      <InteractiveBackground />
      <div className="relative min-h-screen flex">
        <SidebarLeft />
        <div className="flex-1 p-6 md:p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">My Profile</h2>
          <form onSubmit={handleUpdate} className="bg-gray-800 p-6 rounded-lg shadow-2xl border border-gray-700 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded-md"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded-md"
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded-md"
            >
              <option value="manager">Manager</option>
              <option value="operator">Operator</option>
              <option value="inventory">Inventory Manager</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
              Update Profile
            </button>
          </form>
        </div>
        <SidebarRight />
        <ToastContainer />
      </div>
    </>
  );
};

export default Profile;