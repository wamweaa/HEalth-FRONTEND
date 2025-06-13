import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000';

// Get all pending prescriptions
export const getPendingPrescriptions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/prescriptions/pending`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching pending prescriptions:', error);
    throw error;
  }
};

// Fulfill a prescription
export const fulfillPrescription = async (prescriptionId) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/prescriptions/${prescriptionId}/fulfill`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fulfilling prescription:', error);
    throw error;
  }
};

// Get current inventory
export const getInventory = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/inventory`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching inventory:', error);
    throw error;
  }
};

// Update medication stock
export const updateMedicationStock = async (medicationId, newStock) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/inventory/${medicationId}`,
      { stock: newStock },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating medication stock:', error);
    throw error;
  }
};

// Get low stock alerts
export const getLowStockAlerts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/inventory/alerts`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching low stock alerts:', error);
    throw error;
  }
};