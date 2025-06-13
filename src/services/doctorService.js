import { gql, request } from 'graphql-request';

const API_URL = 'http://127.0.0.1:5000/graphql';

// GraphQL Queries & Mutations
const GET_PATIENTS_QUERY = gql`
  query GetPatients {
    patients {
      id
      name
      email
    }
  }
`;

const CREATE_PRESCRIPTION_MUTATION = gql`
  mutation CreatePrescription(
    $patientId: ID!
    $medication: String!
    $dosage: String!
    $instructions: String!
  ) {
    createPrescription(
      patientId: $patientId
      medication: $medication
      dosage: $dosage
      instructions: $instructions
    ) {
      success
      message
      prescription {
        id
        medication
        dosage
        instructions
      }
    }
  }
`;

/**
 * Fetches all patients (Doctor only)
 * @returns {Promise<Array>} List of patients
 */
export const getPatients = async () => {
  try {
    const response = await request(API_URL, GET_PATIENTS_QUERY);
    return response.patients;
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
};

/**
 * Creates a new prescription (Doctor only)
 * @param {Object} prescriptionData - Prescription details
 * @param {string} prescriptionData.patientId - ID of the patient
 * @param {string} prescriptionData.medication - Medication name
 * @param {string} prescriptionData.dosage - Dosage instructions
 * @param {string} prescriptionData.instructions - Additional instructions
 * @returns {Promise<Object>} Success/error response
 */
export const createPrescription = async (prescriptionData) => {
  try {
    const response = await request(
      API_URL,
      CREATE_PRESCRIPTION_MUTATION,
      prescriptionData
    );
    return response.createPrescription;
  } catch (error) {
    console.error('Error creating prescription:', error);
    throw error;
  }
};