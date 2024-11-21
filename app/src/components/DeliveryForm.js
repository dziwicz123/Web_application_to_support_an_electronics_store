import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid, FormHelperText } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PQtgQ03dG9DcKmUHYPxw5W8tRpSdhpIuHvWH5KRsSi7WXxvD32zFrpWTM43eBLZJfWWh7vbzrJi9rrO2BviI6pK00bBqaArZu'); // Replace with your Stripe public key

const DeliveryForm = () => {
  const [form, setForm] = useState({
    street: '',
    city: '',
    postalCode: ''
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'street':
        error = value ? '' : 'Ulica i numer domu są wymagane';
        break;
      case 'city':
        error = value ? '' : 'Miasto jest wymagane';
        break;
      case 'postalCode':
        error = /^[0-9]{2}-[0-9]{3}$/.test(value) ? '' : 'Podaj poprawny kod pocztowy';
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = Object.keys(form).reduce((acc, key) => {
      const error = validateField(key, form[key]);
      if (error) acc[key] = error;
      return acc;
    }, {});

    setErrors(newErrors);

    if (Object.values(newErrors).every((x) => x === '')) {
      try {
        const basketId = sessionStorage.getItem('basketId'); // Poprawione odwołanie do basketId
        const cart = JSON.parse(sessionStorage.getItem('cart'));
        const user = JSON.parse(sessionStorage.getItem('user'));

        if (basketId && cart && cart.length > 0 && user && user.email) {
          const totalPrice = cart.reduce((total, item) => total + item.quantity * item.price, 0);

          const payload = {
            basketId: parseInt(basketId, 10), // basketId jako liczba
            address: form, // Zmieniona struktura adresu
            products: cart.map((item) => ({
              productId: item.id,
              quantity: item.quantity,
              price: item.price,
            })),
            email: user.email,
            totalPrice,
          };

          const response = await axios.post('http://localhost:8081/api/order', payload, { withCredentials: true });

          console.log('Order created successfully:', response.data);

          sessionStorage.removeItem('cart');
          sessionStorage.removeItem('basketId'); // Usuwanie używanego basketId

          const stripe = await stripePromise;
          const stripeResponse = await axios.post(
              'http://localhost:8081/api/payment/create-checkout-session',
              {
                amount: totalPrice,
                currency: 'pln',
              },
              { withCredentials: true }
          );

          const sessionId = stripeResponse.data.sessionId;

          const { error } = await stripe.redirectToCheckout({ sessionId });
          if (error) {
            console.error('Error redirecting to Stripe:', error);
          }
        } else {
          console.error('Basket, products, or user data is missing in session storage');
        }
      } catch (error) {
        console.error('Error during order creation:', error);
      }
    }
  };

  return (
      <Container maxWidth="sm" sx={{ py: 3, mt: 3, mb: 3, borderRadius: 7, backgroundColor: '#EADBC8', color: '#102C57' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#102C57' }}>
          Adres Zamówienia
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                  fullWidth
                  label="Ulica i Numer domu / mieszkania"
                  name="street"
                  value={form.street}
                  onChange={handleChange}
                  error={!!errors.street}
                  helperText={errors.street}
                  required
                  InputLabelProps={{ style: { color: '#102C57' } }}
                  sx={{
                    backgroundColor: 'white',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#102C57',
                      },
                    },
                  }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                  fullWidth
                  label="Miasto"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  error={!!errors.city}
                  helperText={errors.city}
                  required
                  InputLabelProps={{ style: { color: '#102C57' } }}
                  sx={{
                    backgroundColor: 'white',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#102C57',
                      },
                    },
                  }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                  fullWidth
                  label="Kod Pocztowy"
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleChange}
                  error={!!errors.postalCode}
                  helperText={errors.postalCode}
                  required
                  InputLabelProps={{ style: { color: '#102C57' } }}
                  sx={{
                    backgroundColor: 'white',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#102C57',
                      },
                    },
                  }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" sx={{ backgroundColor: '#102C57', color: '#FEFAF6' }}>
                Dalej
              </Button>
            </Grid>
          </Grid>
        </form>
        <FormHelperText sx={{ mt: 2, color: '#102C57' }}>* Pola wymagane</FormHelperText>
      </Container>
  );
};

export default DeliveryForm;
