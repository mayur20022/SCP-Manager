// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages/Components
import Header from './components/Header';
import FarmerRegistrationForm from './page/farmerForm/FarmerRegistraction';
import ScpRegisterPage from './page/scpForm/ScpRegistraction';
import ScpLogin from './page/scpForm/ScpLogin';
import DashboardLayout from './page/dashbord/DashbordLayout';
import { RequireAuth } from './Auth/RequireAuth';
import Footer from './components/Footer';

export default function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<ScpRegisterPage />} />
        <Route path="/login" element={<ScpLogin />} />

        <Route 
          path="/dashboard" 
          element={
            <RequireAuth>
              <DashboardLayout />
            </RequireAuth>
          } 
        />
        <Route 
          path="/dashboard/farmer-register" 
          element={
            <RequireAuth>
              <FarmerRegistrationForm />
            </RequireAuth>
          } 
        />
        
        {/* 404 Fallback (Optional) */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      <Footer/>
    </Router>
  );
}
