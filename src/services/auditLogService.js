export const logUnauthorizedAccess = async (logData) => {
  try {
    // Implement your audit log API call here
    // Example:
    // await fetch('/api/audit-logs', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(logData)
    // });
    console.log('Unauthorized access logged:', logData);
  } catch (error) {
    console.error('Failed to log unauthorized access:', error);
  }
};