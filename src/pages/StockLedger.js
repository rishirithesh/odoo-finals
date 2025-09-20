import React, { useState } from 'react';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import InteractiveBackground from '../components/InteractiveBackground';
import { mockStock, mockProducts } from '../utils/mockData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StockLedger = () => {
  const [selectedProduct, setSelectedProduct] = useState(mockProducts[0].id);
  const [movementType, setMovementType] = useState('in');
  const [quantity, setQuantity] = useState(0);
  const [stock, setStock] = useState(mockStock);

  const handleAddMovement = (e) => {
    e.preventDefault();
    const product = mockProducts.find(p => p.id === selectedProduct);
    const newMovement = {
      id: stock.length + 1,
      product: product.name,
      movementType,
      quantity,
      balance: movementType === 'in' ? stock[stock.length - 1]?.balance + quantity : stock[stock.length - 1]?.balance - quantity || quantity,
    };
    setStock([...stock, newMovement]);
    toast.success('Stock movement recorded!');
    console.log('New Movement', newMovement);
  };

  return (
    <>
      <InteractiveBackground />
      <div className="relative min-h-screen flex">
        <SidebarLeft />
        <div className="flex-1 p-6 md:p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">Stock Ledger</h2>
          <table className="w-full bg-gray-800 rounded-lg shadow-xl mb-8">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="p-4">ID</th>
                <th className="p-4">Product</th>
                <th className="p-4">Movement Type</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Balance</th>
              </tr>
            </thead>
            <tbody>
              {stock.map((s) => (
                <tr key={s.id} className="hover:bg-gray-700 transition duration-200 cursor-pointer">
                  <td className="p-4 text-white">{s.id}</td>
                  <td className="p-4 text-white">{s.product}</td>
                  <td className="p-4 text-white">{s.movementType}</td>
                  <td className="p-4 text-white">{s.quantity}</td>
                  <td className="p-4 text-white">{s.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <form onSubmit={handleAddMovement} className="bg-gray-800 p-6 rounded-lg shadow-2xl border border-gray-700">
            <h3 className="text-2xl font-bold mb-4 text-white">Add Stock Movement</h3>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full px-4 py-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded-md"
            >
              {mockProducts.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <select
              value={movementType}
              onChange={(e) => setMovementType(e.target.value)}
              className="w-full px-4 py-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded-md"
            >
              <option value="in">In</option>
              <option value="out">Out</option>
            </select>
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-4 py-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded-md"
            />
            <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
              Add Movement
            </button>
          </form>
        </div>
        <SidebarRight />
        <ToastContainer />
      </div>
    </>
  );
};

export default StockLedger;