import React from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';

const CurrentOrders = () => {
  return (
    <Paper style={{ padding: '16px', marginBottom: '16px' }}>
      <Typography variant="h6">Current Orders</Typography>
      <Box mt={2}>
        <Box mb={2} borderBottom="1px solid #ddd" pb={1}>
          <Typography><strong>Order #:</strong> 67890</Typography>
          <Typography><strong>Date:</strong> 2024-05-10</Typography>
          <Typography><strong>Estimated Delivery:</strong> 2024-05-17</Typography>
          <Typography><strong>Status:</strong> Shipped</Typography>
          <Typography><strong>Total:</strong> $150.00</Typography>
          <Button variant="outlined" color="primary" style={{ marginTop: '8px' }}>
            View Details
          </Button>
        </Box>
        {/* Repeat order blocks as needed */}
      </Box>
    </Paper>
  );
};

export default CurrentOrders;
