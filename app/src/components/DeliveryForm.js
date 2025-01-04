import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid, FormHelperText } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { jwtDecode } from "jwt-decode";

// Podmień na swój klucz publiczny Stripe
const stripePromise = loadStripe('pk_test_51PQtgQ03dG9DcKmUHYPxw5W8tRpSdhpIuHvWH5KRsSi7WXxvD32zFrpWTM43eBLZJfWWh7vbzrJi9rrO2BviI6pK00bBqaArZu');

const DeliveryForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    street: '',
    city: '',
    postalCode: ''
  });

  const [errors, setErrors] = useState({});

  /**
   * Walidacja poszczególnych pól
   */
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
        error = /^[0-9]{2}-[0-9]{3}$/.test(value) ? '' : 'Podaj poprawny kod pocztowy (format XX-XXX)';
        break;
      default:
        break;
    }
    return error;
  };

  /**
   * Obsługa zmian w polach formularza
   */
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

  /**
   * Obsługa przesłania formularza
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Walidacja wszystkich pól przed wysłaniem
    const newErrors = Object.keys(form).reduce((acc, key) => {
      const error = validateField(key, form[key]);
      if (error) acc[key] = error;
      return acc;
    }, {});
    setErrors(newErrors);

    // Jeśli brak błędów -> kontynuujemy
    if (Object.values(newErrors).every((x) => x === '')) {
      try {
        // 1. Pobierz token z sessionStorage
        const token = sessionStorage.getItem('token');
        if (!token) {
          // Jeśli nie ma tokenu, to przekieruj do /login
          navigate('/login');
          return;
        }

        // 2. Dekoduj token, by uzyskać email (assuming sub = email)
        const decoded = jwtDecode(token);
        const userEmail = decoded.sub; // sprawdź w backendzie czy sub = email

        // 3. Pobierz lub stwórz basketId
        let basketId = sessionStorage.getItem('basketId');
        if (!basketId) {
          // Jeśli nie ma w sessionStorage, to tworzymy nowy koszyk
          // (o ile Twój backend to obsługuje, np. endpoint /api/basket/add)
          const newBasketResponse = await axios.post(
              'http://localhost:8081/api/basket/add',
              {}, // Brak ciała, bo backend może pobierać usera z tokenu
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Wysyłamy token w nagłówku
                },
              }
          );
          basketId = newBasketResponse.data.id;
          sessionStorage.setItem('basketId', basketId);
        }

        // 4. Pobierz koszyk z sessionStorage
        const cart = JSON.parse(sessionStorage.getItem('cart'));
        if (!cart || cart.length === 0) {
          console.error('Brak produktów w koszyku.');
          return;
        }

        // 5. Wylicz łączną cenę
        const totalPrice = cart.reduce((total, item) => total + item.quantity * item.price, 0);

        // 6. Zbuduj payload do /api/order
        const payload = {
          basketId: parseInt(basketId, 10),
          address: form, // ulica, miasto, kod pocztowy
          products: cart.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
          email: userEmail,
          totalPrice,
        };

        // 7. Wyślij żądanie utworzenia zamówienia
        const response = await axios.post(
            'http://localhost:8081/api/order',
            payload,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
        );

        console.log('Order created successfully:', response.data);

        // 8. Usunięcie koszyka z sessionStorage (bo zamówienie już utworzone)
        sessionStorage.removeItem('cart');

        // 9. Przejście do płatności Stripe
        const stripe = await stripePromise;
        const stripeResponse = await axios.post(
            'http://localhost:8081/api/payment/create-checkout-session',
            {
              amount: totalPrice,
              currency: 'pln',
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
        );

        const sessionId = stripeResponse.data.sessionId;
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error('Error redirecting to Stripe:', error);
        }
      } catch (error) {
        console.error('Error during order creation:', error);
      }
    }
  };

  return (
      <Container
          maxWidth="sm"
          sx={{
            py: 3,
            mt: 3,
            mb: 3,
            borderRadius: 7,
            backgroundColor: '#EADBC8',
            color: '#102C57'
          }}
      >
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
              <Button
                  type="submit"
                  variant="contained"
                  sx={{ backgroundColor: '#102C57', color: '#FEFAF6' }}
              >
                Dalej
              </Button>
            </Grid>
          </Grid>
        </form>
        <FormHelperText sx={{ mt: 2, color: '#102C57' }}>
          * Pola wymagane
        </FormHelperText>
      </Container>
  );
};

export default DeliveryForm;
