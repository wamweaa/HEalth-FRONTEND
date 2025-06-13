import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000';

// Get all prescriptions for a patient
export const getPatientPrescriptions = async (patientId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/patients/${patientId}/prescriptions`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching patient prescriptions:', error);
    throw error;
  }
};

// Request prescription refill
export const requestPrescriptionRefill = async (prescriptionId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/prescriptions/${prescriptionId}/refill`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error requesting prescription refill:', error);
    throw error;
  }
};

// Get patient profile
export const getPatientProfile = async (patientId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/patients/${patientId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching patient profile:', error);
    throw error;
  }
};

// Update patient profile
export const updatePatientProfile = async (patientId, profileData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/patients/${patientId}`,
      profileData,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating patient profile:', error);
    throw error;
  }
};

// Get patient notifications
export const getPatientNotifications = async (patientId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/patients/${patientId}/notifications`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching patient notifications:', error);
    throw error;
  }
};