import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getPendingPrescriptions, fulfillPrescription, getInventory } from '../services/pharmacistService';

const PharmacistDashboard = () => {
  const { currentUser } = useAuth();
  const [prescriptions, setPrescriptions] = useState([]);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetchPrescriptions();
    fetchInventory();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const data = await getPendingPrescriptions();
      setPrescriptions(data);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    }
  };

  const fetchInventory = async () => {
    try {
      const data = await getInventory();
      setInventory(data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  const handleFulfill = async (prescriptionId) => {
    try {
      await fulfillPrescription(prescriptionId);
      fetchPrescriptions(); // Refresh list
      fetchInventory(); // Update stock levels
    } catch (error) {
      console.error("Error fulfilling prescription:", error);
    }
  };

  return (
    <div className="pharmacist-dashboard">
      <h1>Pharmacist Dashboard</h1>
      <h2>Welcome, {currentUser?.email}</h2>

      <div className="pending-prescriptions">
        <h3>Pending Prescriptions</h3>
        <ul>
          {prescriptions.map((prescription) => (
            <li key={prescription.id}>
              <p>Patient: {prescription.patientName}</p>
              <p>Medication: {prescription.medication}</p>
              <button onClick={() => handleFulfill(prescription.id)}>Fulfill</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="inventory">
        <h3>Current Inventory</h3>
        <table>
          <thead>
            <tr>
              <th>Medication</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PharmacistDashboard;