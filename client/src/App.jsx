import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import Navbar from './components/Navbar.jsx';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import AdminDashboard from './pages/AdminDashBoard.jsx'

import './styles.css';
import SalathEndMessage from './pages/SalathEndMessage.jsx';


export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<SalathEndMessage />} />
          <Route path="/login" element={<SalathEndMessage />} />
          <Route path="/signup" element={<SalathEndMessage />} />
          <Route path="/dashboard" element={<SalathEndMessage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/panel" element={<AdminPanel />} />
          <Route path="/admin/dashboard" element={<AdminDashboard/>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
