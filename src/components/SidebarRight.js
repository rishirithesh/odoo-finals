import React from 'react';

const SidebarRight = () => {
  return (
    <div className="fixed top-0 right-0 h-full w-64 bg-indigo-800 text-white p-4 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Master Menu</h2>
      <ul>
        <li className="mb-2">
          <a href="/orders" className="hover:text-indigo-300 transition duration-200">Manufacturing Orders</a>
        </li>
        <li className="mb-2">
          <a href="/workorders" className="hover:text-indigo-300 transition duration-200">Work Orders</a>
        </li>
        <li className="mb-2">
          <a href="/workcenters" className="hover:text-indigo-300 transition duration-200">Work Centers</a>
        </li>
        <li className="mb-2">
          <a href="/stock" className="hover:text-indigo-300 transition duration-200">Stock Ledger</a>
        </li>
        <li className="mb-2">
          <a href="/bom" className="hover:text-indigo-300 transition duration-200">Bills of Material</a>
        </li>
      </ul>
    </div>
  );
};

export default SidebarRight;