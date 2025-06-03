import { gql, request } from 'graphql-request';

const API_URL = 'http://localhost:8000/graphql';

// GraphQL Queries & Mutations
const GET_USERS_QUERY = gql`
  query GetUsers {
    users {
      id
      email
      role
    }
  }
`;

const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      success
      message
    }
  }
`;

const UPDATE_USER_ROLE_MUTATION = gql`
  mutation UpdateUserRole($userId: ID!, $newRole: String!) {
    updateUserRole(userId: $userId, newRole: $newRole) {
      success
      message
    }
  }
`;

/**
 * Fetches all users (Admin only)
 * @returns {Promise<Array>} List of users
 */
export const getUsers = async () => {
  try {
    const response = await request(API_URL, GET_USERS_QUERY);
    return response.users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

/**
 * Deletes a user (Admin only)
 * @param {string} userId - ID of the user to delete
 * @returns {Promise<Object>} Success/error response
 */
export const deleteUser = async (userId) => {
  try {
    const response = await request(API_URL, DELETE_USER_MUTATION, { userId });
    return response.deleteUser;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

/**
 * Updates a user's role (Admin only)
 * @param {string} userId - ID of the user to update
 * @param {string} newRole - New role (admin/doctor/pharmacist/patient)
 * @returns {Promise<Object>} Success/error response
 */
export const updateUserRole = async (userId, newRole) => {
  try {
    const response = await request(API_URL, UPDATE_USER_ROLE_MUTATION, {
      userId,
      newRole,
    });
    return response.updateUserRole;
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
};