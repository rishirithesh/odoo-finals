import React, { useState } from 'react';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import InteractiveBackground from '../components/InteractiveBackground';
import { mockBOM } from '../utils/mockData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BOM = () => {
  const [components, setComponents] = useState(mockBOM.components);
  const [operations, setOperations] = useState(mockBOM.operations);
  const [newComponent, setNewComponent] = useState({ item: '', quantity: 0 });
  const [newOperation, setNewOperation] = useState({ name: '', duration: 0 });

  const handleAddComponent = (e) => {
    e.preventDefault();
    setComponents([...components, newComponent]);
    setNewComponent({ item: '', quantity: 0 });
    toast.success('Component added!');
  };

  const handleAddOperation = (e) => {
    e.preventDefault();
    setOperations([...operations, newOperation]);
    setNewOperation({ name: '', duration: 0 });
    toast.success('Operation added!');
  };

  return (
    <>
      <InteractiveBackground />
      <div className="relative min-h-screen flex">
        <SidebarLeft />
        <div className="flex-1 p-6 md:p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">Bills of Material</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">Components</h3>
              <table className="w-full bg-gray-800 rounded-lg shadow-xl mb-4">
                <thead>
                  <tr className="bg-indigo-600 text-white">
                    <th className="p-4">Item</th>
                    <th className="p-4">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {components.map((c, i) => (
                    <tr key={i} className="hover:bg-gray-700 transition duration-200">
                      <td className="p-4 text-white">{c.item}</td>
                      <td className="p-4 text-white">{c.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <form onSubmit={handleAddComponent} className="bg-gray-800 p-4 rounded-lg shadow-2xl border border-gray-700">
                <input
                  type="text"
                  placeholder="Item"
                  value={newComponent.item}
                  onChange={(e) => setNewComponent({ ...newComponent, item: e.target.value })}
                  className="w-full px-4 py-2 mb-2 bg-gray-700 text-white border border-gray-600 rounded-md"
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={newComponent.quantity}
                  onChange={(e) => setNewComponent({ ...newComponent, quantity: e.target.value })}
                  className="w-full px-4 py-2 mb-2 bg-gray-700 text-white border border-gray-600 rounded-md"
                />
                <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
                  Add Component
                </button>
              </form>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">Operations</h3>
              <table className="w-full bg-gray-800 rounded-lg shadow-xl mb-4">
                <thead>
                  <tr className="bg-indigo-600 text-white">
                    <th className="p-4">Name</th>
                    <th className="p-4">Duration (mins)</th>
                  </tr>
                </thead>
                <tbody>
                  {operations.map((o, i) => (
                    <tr key={i} className="hover:bg-gray-700 transition duration-200">
                      <td className="p-4 text-white">{o.name}</td>
                      <td className="p-4 text-white">{o.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <form onSubmit={handleAddOperation} className="bg-gray-800 p-4 rounded-lg shadow-2xl border border-gray-700">
                <input
                  type="text"
                  placeholder="Operation Name"
                  value={newOperation.name}
                  onChange={(e) => setNewOperation({ ...newOperation, name: e.target.value })}
                  className="w-full px-4 py-2 mb-2 bg-gray-700 text-white border border-gray-600 rounded-md"
                />
                <input
                  type="number"
                  placeholder="Duration (mins)"
                  value={newOperation.duration}
                  onChange={(e) => setNewOperation({ ...newOperation, duration: e.target.value })}
                  className="w-full px-4 py-2 mb-2 bg-gray-700 text-white border border-gray-600 rounded-md"
                />
                <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
                  Add Operation
                </button>
              </form>
            </div>
          </div>
        </div>
        <SidebarRight />
        <ToastContainer />
      </div>
    </>
  );
};

export default BOM;