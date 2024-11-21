import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  Typography,
  Button,
  Divider,
  Box,
} from '@mui/material';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';
import CartSummary from './CartSummary';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CartZone = () => {
  const [items, setItems] = useState(() => {
    const storedItems = sessionStorage.getItem('cart');
    return storedItems ? JSON.parse(storedItems) : [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const handleQuantityChange = (id, newQuantity) => {
    setItems(items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity > 0 ? newQuantity : 1 } : item
    ));
  };

  const handleRemove = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleDelivery = () => {
    if (items.length === 0) {
      alert("Twój koszyk jest pusty. Dodaj produkty do koszyka przed przejściem do dostawy.");
      return;
    }
    const user = sessionStorage.getItem('user');
    if (user) {
      navigate('/delivery');
    } else {
      navigate('/login');
    }
  };

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const productText = itemCount === 1 ? 'produkt' : 'produkty';

  return (
      <Box sx={{ backgroundColor: '#DAC0A3', py: 5, margin: 1}}>
        <Container>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              <Card sx={{ borderRadius: 5, backgroundColor: '#EADBC8' }}>
                {/* Zastąpienie CardContent komponentem Box */}
                <Box sx={{ padding: 0 }}>
                  <Grid container spacing={0}>
                    <Grid item xs={12} md={8}>
                      <Box sx={{ padding: '40px' }}>
                        <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 5 }}>
                          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#102C57' }}>
                            Koszyk
                          </Typography>
                          <Typography variant="subtitle1" sx={{ color: '#102C57' }}>
                            {itemCount} {productText}
                          </Typography>
                        </Grid>

                        <Divider sx={{ my: 4, borderColor: '#DAC0A3' }} />

                        {items.length > 0 ? (
                            items.map(item => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onQuantityChange={handleQuantityChange}
                                    onRemove={handleRemove}
                                />
                            ))
                        ) : (
                            <Typography variant="subtitle1" sx={{ color: '#102C57' }}>
                              Twój koszyk jest pusty
                            </Typography>
                        )}

                        <Box sx={{ paddingTop: '20px' }}>
                          <Button
                              startIcon={<ArrowBack />}
                              component={Link}
                              to="/"
                              variant="text"
                              sx={{ color: '#102C57' }}
                          >
                            Kontynuuj zakupy
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ backgroundColor: '#AE9982' }}>
                      <CartSummary
                          itemCount={itemCount}
                          totalPrice={totalPrice}
                          onDelivery={handleDelivery}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
  );
};

export default CartZone;
