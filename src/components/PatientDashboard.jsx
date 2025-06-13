import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getPatientPrescriptions } from '../services/patientService';

const PatientDashboard = () => {
  const { currentUser } = useAuth();
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const data = await getPatientPrescriptions(currentUser.id);
      setPrescriptions(data);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    }
  };

  return (
    <div className="patient-dashboard">
      <h1>Patient Dashboard</h1>
      <h2>Welcome, {currentUser?.email}</h2>

      <div className="my-prescriptions">
        <h3>My Prescriptions</h3>
        {prescriptions.length === 0 ? (
          <p>No prescriptions found.</p>
        ) : (
          <ul>
            {prescriptions.map((prescription) => (
              <li key={prescription.id}>
                <p>Medication: {prescription.medication}</p>
                <p>Dosage: {prescription.dosage}</p>
                <p>Instructions: {prescription.instructions}</p>
                <p>Status: {prescription.status}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;