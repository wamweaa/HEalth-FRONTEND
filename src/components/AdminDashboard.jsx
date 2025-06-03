import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUsers, deleteUser, updateUserRole } from '../services/adminServices';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      // Optimistic update - remove user from local state immediately
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user. Please try again.");
      fetchUsers(); // Fallback: refresh data
    }
  };

  const handleUpdateRole = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      // Optimistic update - update role in local state immediately
      setUsers(users.map(user => 
        user.id === userId ? {...user, role: newRole} : user
      ));
    } catch (error) {
      console.error("Error updating role:", error);
      setError("Failed to update user role. Please try again.");
      fetchUsers(); // Fallback: refresh data
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <h2>Welcome, {currentUser?.email}</h2>
      
      {error && (
        <div className="error-message" style={{ color: 'red', margin: '10px 0' }}>
          {error}
        </div>
      )}
      
      <div className="user-management">
        <h3>User Management</h3>
        {loading ? (
          <p>Loading users...</p>
        ) : users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Email</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Role</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '8px' }}>{user.email}</td>
                  <td style={{ padding: '8px' }}>
                    <select 
                      value={user.role}
                      onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                      style={{ padding: '5px' }}
                    >
                      <option value="admin">Admin</option>
                      <option value="doctor">Doctor</option>
                      <option value="pharmacist">Pharmacist</option>
                      <option value="patient">Patient</option>
                    </select>
                  </td>
                  <td style={{ padding: '8px' }}>
                    <button 
                      onClick={() => handleDeleteUser(user.id)}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#ff4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;