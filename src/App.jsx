// import { useState } from 'react'

// import './App.css'
// import AdminDashboard from './components/AdminDashboard'
// import DoctorDashboard from './components/DoctorDashboard'
// import PharmacistDashboard from './components/PharamacistDashboard'
// import PatientDashboard from './components/PatientDashboard'

// function App() {

//   return (
//     <>
//     <AdminDashboard/>
//     <DoctorDashboard/>
//     <PharmacistDashboard/>
//     <PatientDashboard/>
//     </>
//   )
// }

// export default App
























import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import AdminDashboard from './components/AdminDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import PharmacistDashboard from './components/PharamacistDashboard';
import PatientDashboard from './components/PatientDashboard';
import Login from './components/Login';
// import Unauthorized from './components/Unauthorized';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}
          
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/doctor"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/pharmacist"
            element={
              <ProtectedRoute allowedRoles={['pharmacist']}>
                <PharmacistDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/patient"
            element={
              <ProtectedRoute allowedRoles={['patient']}>
                <PatientDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;