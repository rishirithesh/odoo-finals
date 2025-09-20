import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InteractiveBackground from '../components/InteractiveBackground';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('');
  const [kpis, setKpis] = useState({ completed: 0, inProgress: 0, delayed: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [ordersRes, kpisRes] = await Promise.all([
          axios.get('http://localhost:5000/api/orders', { params: { status } }),
          axios.get('http://localhost:5000/api/kpis'),
        ]);
        setOrders(ordersRes.data);
        setKpis(kpisRes.data);
      } catch (err) {
        toast.error('Failed to load data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Poll every 30 seconds for real-time updates (optional, remove if not needed)
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [status]);

  return (
    <>
      <InteractiveBackground />
      <div className="relative min-h-screen flex">
        <SidebarLeft />
        <div className="flex-1 p-6 md:p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">Manufacturing Dashboard</h2>
          {loading ? (
            <div className="flex justify-center">
              <div className="w-12 h-12 border-4 border-t-4 border-indigo-500 border-solid rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-800 p-4 rounded-lg shadow-xl text-center text-white border border-gray-700">
                  <h3 className="text-xl font-semibold">Completed Orders</h3>
                  <p className="text-2xl">{kpis.completed}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-xl text-center text-white border border-gray-700">
                  <h3 className="text-xl font-semibold">In-Progress Orders</h3>
                  <p className="text-2xl">{kpis.inProgress}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-xl text-center text-white border border-gray-700">
                  <h3 className="text-xl font-semibold">Delayed Orders</h3>
                  <p className="text-2xl">{kpis.delayed}</p>
                </div>
              </div>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mb-4 p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              >
                <option value="">All Status</option>
                <option value="planned">Planned</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
                <option value="canceled">Canceled</option>
              </select>
              <table className="w-full bg-gray-800 rounded-lg shadow-xl">
                <thead>
                  <tr className="bg-indigo-600 text-white">
                    <th className="p-4">ID</th>
                    <th className="p-4">Product</th>
                    <th className="p-4">Quantity</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-700 transition duration-200 cursor-pointer"
                    >
                      <td className="p-4 text-white">{order.id}</td>
                      <td className="p-4 text-white">{order.product}</td>
                      <td className="p-4 text-white">{order.quantity}</td>
                      <td className="p-4 text-white">{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
        <SidebarRight />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
};

export default Dashboard;