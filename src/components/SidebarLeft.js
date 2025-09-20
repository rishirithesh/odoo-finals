import React from 'react';

const SidebarLeft = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-indigo-800 text-white p-4 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Profile Menu</h2>
      <ul>
        <li className="mb-2">
          <a href="/profile" className="hover:text-indigo-300 transition duration-200">My Profile</a>
        </li>
        <li className="mb-2">
          <a href="/reports" className="hover:text-indigo-300 transition duration-200">My Reports</a>
        </li>
      </ul>
    </div>
  );
};

export default SidebarLeft;