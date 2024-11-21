import React from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';

const OrderHistory = () => {
  return (
    <>
    <Typography variant="h6" style={{ color: '#000' }}>Historia Zamówień</Typography>
    <Paper style={{ padding: '16px', marginBottom: '16px', backgroundColor: '#fff' }}>
      <Box mt={2} style={{ color: '#000' }}>
        <Box mb={2} borderBottom="1px solid #ddd" pb={1}>
          <Typography variant="body1"><strong>Numer zamówienia:</strong> 12345</Typography>
          <Typography variant="body1"><strong>Data:</strong> 2024-05-01</Typography>
          <Typography variant="body1"><strong>Status:</strong> Dostarczone</Typography>
          <Typography variant="body1"><strong>Razem:</strong> $100.00</Typography>
          <Button variant="outlined" style={{ marginTop: '8px', borderColor: '#3f51b5', color: '#3f51b5' }}>
            Zobacz szczegóły
          </Button>
        </Box>
        {/* Repeat order blocks as needed */}
      </Box>
    </Paper>
    </>
  );
};

export default OrderHistory;
