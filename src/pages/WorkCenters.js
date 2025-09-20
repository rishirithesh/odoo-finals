import React, { useState } from 'react';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import InteractiveBackground from '../components/InteractiveBackground';
import { mockWorkCenters } from '../utils/mockData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WorkCenters = () => {
  const [workCenters, setWorkCenters] = useState(mockWorkCenters);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [costPerHour, setCostPerHour] = useState(0);
  const [downtime, setDowntime] = useState(false);

  const handleCreate = (e) => {
    e.preventDefault();
    const newWorkCenter = { id: workCenters.length + 1, name, location, costPerHour, downtime };
    setWorkCenters([...workCenters, newWorkCenter]);
    toast.success('Work Center created!');
    console.log('Created Work Center', newWorkCenter);
  };

  return (
    <>
      <InteractiveBackground />
      <div className="relative min-h-screen flex">
        <SidebarLeft />
        <div className="flex-1 p-6 md:p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">Work Centers</h2>
          <table className="w-full bg-gray-800 rounded-lg shadow-xl mb-8">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="p-4">ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Location</th>
                <th className="p-4">Cost/Hour</th>
                <th className="p-4">Downtime</th>
              </tr>
            </thead>
            <tbody>
              {workCenters.map((wc) => (
                <tr key={wc.id} className="hover:bg-gray-700 transition duration-200 cursor-pointer">
                  <td className="p-4 text-white">{wc.id}</td>
                  <td className="p-4 text-white">{wc.name}</td>
                  <td className="p-4 text-white">{wc.location}</td>
                  <td className="p-4 text-white">${wc.costPerHour}</td>
                  <td className="p-4 text-white">{wc.downtime ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <form onSubmit={handleCreate} className="bg-gray-800 p-6 rounded-lg shadow-2xl border border-gray-700">
            <h3 className="text-2xl font-bold mb-4 text-white">Create Work Center</h3>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded-md"
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded-md"
            />
            <input
              type="number"
              placeholder="Cost per Hour ($)"
              value={costPerHour}
              onChange={(e) => setCostPerHour(e.target.value)}
              className="w-full px-4 py-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded-md"
            />
            <label className="block mb-2 text-white">Downtime</label>
            <input
              type="checkbox"
              checked={downtime}
              onChange={(e) => setDowntime(e.target.checked)}
              className="mb-4"
            />
            <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
              Create
            </button>
          </form>
        </div>
        <SidebarRight />
        <ToastContainer />
      </div>
    </>
  );
};

export default WorkCenters;