import React from 'react';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import InteractiveBackground from '../components/InteractiveBackground';
import { mockReports } from '../utils/mockData';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Reports = () => {
  const handleExport = () => {
    toast.success('Report exported to console (CSV simulation)');
    console.log('Exported Report', mockReports);
  };

  return (
    <>
      <InteractiveBackground />
      <div className="relative min-h-screen flex">
        <SidebarLeft />
        <div className="flex-1 p-6 md:p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">Reports</h2>
          <table className="w-full bg-gray-800 rounded-lg shadow-xl mb-8">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="p-4">ID</th>
                <th className="p-4">Task</th>
                <th className="p-4">Duration (mins)</th>
                <th className="p-4">Completed</th>
              </tr>
            </thead>
            <tbody>
              {mockReports.map((r) => (
                <tr key={r.id} className="hover:bg-gray-700 transition duration-200">
                  <td className="p-4 text-white">{r.id}</td>
                  <td className="p-4 text-white">{r.task}</td>
                  <td className="p-4 text-white">{r.duration}</td>
                  <td className="p-4 text-white">{r.completed ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleExport} className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
            Export Report
          </button>
        </div>
        <SidebarRight />
        <ToastContainer />
      </div>
    </>
  );
};

export default Reports;