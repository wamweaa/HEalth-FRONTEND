import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming you have an auth context
import { Button, Container, Typography, Box, Alert } from '@mui/material'; // Using Material-UI for styling
import LockIcon from '@mui/icons-material/Lock';
import { logUnauthorizedAccess } from '../services/auditLogService'; // Audit logging service

const Unauthorized = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth(); // Get current user and logout function from auth context

  // Log unauthorized access attempt
  useEffect(() => {
    if (currentUser) {
      logUnauthorizedAccess({
        userId: currentUser.id,
        userRole: currentUser.role,
        attemptedAction: 'Access unauthorized page',
        timestamp: new Date().toISOString()
      });
    }
  }, [currentUser]);

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handleGoHome = () => {
    navigate('/'); // Navigate to home page
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login'); // Redirect to login after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <LockIcon sx={{ fontSize: 80, color: 'error.main' }} />
      </Box>
      
      <Typography variant="h4" gutterBottom>
        Access Denied
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 3 }}>
        You don't have permission to access this page with your current role.
      </Typography>

      {currentUser && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Logged in as: <strong>{currentUser.email}</strong> (Role: {currentUser.role})
        </Alert>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleGoBack}
          sx={{ minWidth: 120 }}
        >
          Go Back
        </Button>
        
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={handleGoHome}
          sx={{ minWidth: 120 }}
        >
          Home
        </Button>
        
        <Button 
          variant="text" 
          color="error" 
          onClick={handleLogout}
          sx={{ minWidth: 120 }}
        >
          Logout
        </Button>
      </Box>

      {currentUser?.role === 'patient' && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="body2" color="text.secondary">
            If you believe this is an error, please contact your healthcare provider.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Unauthorized;