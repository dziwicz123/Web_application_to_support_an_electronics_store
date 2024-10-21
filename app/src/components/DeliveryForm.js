import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid, FormHelperText } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your kay'); // Replace with your Stripe public key

const DeliveryForm = () => {
  const [form, setForm] = useState({
    address: '',
    city: '',
    postalCode: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'address':
        error = value ? '' : 'Adres jest wymagany';
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

    // Validate form fields
    const newErrors = Object.keys(form).reduce((acc, key) => {
      const error = validateField(key, form[key]);
      if (error) acc[key] = error;
      return acc;
    }, {});

    setErrors(newErrors);

    // Check if there are no validation errors
    if (Object.values(newErrors).every(x => x === '')) {
      try {
        // Retrieve basket, cart, and user from session storage
        const basket = JSON.parse(sessionStorage.getItem('basket'));
        sessionStorage.setItem('basketId', basket.id); // Store basket ID in session storage
        const cart = JSON.parse(sessionStorage.getItem('cart')); // Assuming cart contains product IDs, quantities, and prices
        const user = JSON.parse(sessionStorage.getItem('user'));

        if (basket && basket.id && cart && cart.length > 0 && user && user.email) {
          // Calculate total price
          const totalPrice = cart.reduce((total, item) => total + (item.quantity * item.price), 0);

          // Create payload
          const payload = {
            basketId: basket.id,
            address: form,
            products: cart.map(item => ({
              productId: item.id,
              quantity: item.quantity,
              price: item.price
            })),
            email: user.email,
            totalPrice: totalPrice
          };

          // Send request to create order details
          const response = await axios.post('http://localhost:8081/api/order', payload, { withCredentials: true });

          console.log('Order Details created:', response.data);

          // Clear cart and basket
          sessionStorage.removeItem('cart');
          sessionStorage.removeItem('basket');

          // Fetch the new basket for the user from the database
          const newBasketResponse = await axios.get(`http://localhost:8081/api/basket/user/${user.id}`, { withCredentials: true });

          if (newBasketResponse.data) {
            sessionStorage.setItem('basket', JSON.stringify(newBasketResponse.data));
          } else {
            console.error('No new basket found for the user');
          }

          // Create Stripe payment session
          const stripe = await stripePromise;
          const stripeResponse = await axios.post('http://localhost:8081/api/payment/create-checkout-session', {
            amount: totalPrice,
            currency: 'pln',
          });


          const sessionId = stripeResponse.data.sessionId;

          // Redirect to Stripe Checkout
          const { error } = await stripe.redirectToCheckout({
            sessionId: sessionId,
          });

          if (error) {
            console.error('Error redirecting to Stripe Checkout:', error);
          }
        } else {
          console.error('No basket, products, or user email found in session storage');
        }
      } catch (error) {
        console.error('Error creating order details:', error);
      }
    }
  };

  return (
      <Container maxWidth="sm" sx={{ py: 3, marginTop: 3, marginBottom: 3, borderRadius: 7, backgroundColor: 'white' }}>
        <Typography variant="h4" gutterBottom>
          Adres Zamówienia
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                  fullWidth
                  label="Ulica i Numer domu / mieszkania"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  error={!!errors.address}
                  helperText={errors.address}
                  required
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
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Dalej
              </Button>
            </Grid>
          </Grid>
        </form>
        <FormHelperText sx={{ mt: 2 }}>* Pola wymagane</FormHelperText>
      </Container>
  );
};

export default DeliveryForm;
