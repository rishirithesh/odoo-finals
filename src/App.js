import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import ManufacturingOrders from './pages/ManufacturingOrders';
import WorkOrders from './pages/WorkOrders';
import WorkCenters from './pages/WorkCenters';
import StockLedger from './pages/StockLedger';
import BOM from './pages/BOM';
import Profile from './pages/Profile';
import Reports from './pages/Reports';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container bg-blue-500">
        <div className="content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<ManufacturingOrders />} />
            <Route path="/workorders" element={<WorkOrders />} />
            <Route path="/workcenters" element={<WorkCenters />} />
            <Route path="/stock" element={<StockLedger />} />
            <Route path="/bom" element={<BOM />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;