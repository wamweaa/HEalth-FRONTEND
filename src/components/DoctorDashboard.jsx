import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getPatients, createPrescription } from '../services/doctorService';

const DoctorDashboard = () => {
  const { currentUser } = useAuth();
  const [patients, setPatients] = useState([]);
  const [newPrescription, setNewPrescription] = useState({
    patientId: "",
    medication: "",
    dosage: "",
    instructions: "",
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPrescription(newPrescription);
      alert("Prescription created successfully!");
      setNewPrescription({
        patientId: "",
        medication: "",
        dosage: "",
        instructions: "",
      });
    } catch (error) {
      console.error("Error creating prescription:", error);
    }
  };

  return (
    <div className="doctor-dashboard">
      <h1>Doctor Dashboard</h1>
      <h2>Welcome, Dr. {currentUser?.email}</h2>

      <div className="prescription-form">
        <h3>Create New Prescription</h3>
        <form onSubmit={handleSubmit}>
          <select
            value={newPrescription.patientId}
            onChange={(e) => setNewPrescription({ ...newPrescription, patientId: e.target.value })}
          >
            <option value="">Select Patient</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Medication"
            value={newPrescription.medication}
            onChange={(e) => setNewPrescription({ ...newPrescription, medication: e.target.value })}
          />
          <input
            type="text"
            placeholder="Dosage"
            value={newPrescription.dosage}
            onChange={(e) => setNewPrescription({ ...newPrescription, dosage: e.target.value })}
          />
          <textarea
            placeholder="Instructions"
            value={newPrescription.instructions}
            onChange={(e) => setNewPrescription({ ...newPrescription, instructions: e.target.value })}
          />
          <button type="submit">Submit Prescription</button>
        </form>
      </div>
    </div>
  );
};

export default DoctorDashboard;