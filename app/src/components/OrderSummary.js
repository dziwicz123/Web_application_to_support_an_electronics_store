import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Divider, Box, Paper, Grid, Button } from '@mui/material';

const OrderSummary = ({ products, totalPrice, address, onPurchase }) => {
  return (
    <Container maxWidth="md" sx={{ py: 3, marginTop: 3, marginBottom: 3 }}>
      <Paper elevation={3} sx={{ borderRadius: 7, padding: 3, backgroundColor: '#fafafa' }}>
        <Typography variant="h4" gutterBottom sx={{ borderBottom: '2px solid #3f51b5', paddingBottom: 1 }}>
          Podsumowanie Zamówienia
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Adres Dostawy:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {address.firstName} {address.lastName}<br />
                {address.address}<br />
                {address.city}, {address.postalCode}<br />
                {address.phone}<br />
                {address.email}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Produkty:
              </Typography>
              <List>
                {products.map((product, index) => (
                  <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <ListItemText primary={product.name} />
                    <Typography variant="body2">{`Cena: ${product.price} zł`}</Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              <Typography variant="h6">
                Łączna Cena: {totalPrice} zł
              </Typography>
              <Button variant="contained" color="primary" onClick={onPurchase}>
                Kupuję i płacę
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default OrderSummary;
