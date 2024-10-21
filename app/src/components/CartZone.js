import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Divider } from '@mui/material';
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

  // Update session storage whenever the items change
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
      alert("Your cart is empty. Please add items to your cart before proceeding to delivery.");
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
    <section>
    <Container sx={{ py: 5 }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent sx={{ p: 0 }}>
              <Grid container spacing={0}>
                <Grid item lg={8}>
                  <div style={{ padding: '40px' }}>
                    <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 5 }}>
                      <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'black' }}>
                        Koszyk
                      </Typography>
                      <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                        {itemCount} {productText}
                      </Typography>
                    </Grid>

                    <Divider sx={{ my: 4 }} />

                    {items.length > 0 ? items.map(item => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onQuantityChange={handleQuantityChange}
                            onRemove={handleRemove}
                        />
                    )) : (
                        <Typography variant="subtitle1">
                          Twój koszyk jest pusty
                        </Typography>
                    )}

                    <div style={{ paddingTop: '20px' }}>
                      <Button startIcon={<ArrowBack />} component={Link} to="/" variant="text">
                        Kontynuj zakupy
                      </Button>
                    </div>
                  </div>
                </Grid>
                <Grid item lg={4} sx={{ backgroundColor: '#f5f5f5' }}>
                  <CartSummary
                      itemCount={itemCount}
                      totalPrice={totalPrice}
                      onDelivery={handleDelivery}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  </section>
  );
}

export default CartZone;
