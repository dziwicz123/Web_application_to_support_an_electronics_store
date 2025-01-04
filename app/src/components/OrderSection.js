import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PQtgQ03dG9...'); // podmień na swój klucz publiczny

const OrderSection = ({ user }) => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Jeśli nie ma tokenu — redirect do /login
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        // Pobieramy listę zamówień od backendu z nagłówkiem Authorization
        const fetchOrders = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:8081/api/order/all',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,  // <-- ważne
                        },
                    }
                );
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [navigate]);

    // Funkcja obsługująca płatność
    const handlePayment = async (order) => {
        try {
            const token = sessionStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            // Usuwamy poprzedni basketId (o ile istnieje)
            sessionStorage.removeItem('basketId');
            // Zapisujemy nowy
            sessionStorage.setItem('basketId', order.basket.id);

            // Tworzymy sesję płatności w Stripe
            const stripe = await stripePromise;
            const stripeResponse = await axios.post(
                'http://localhost:8081/api/payment/create-checkout-session',
                {
                    amount: order.basket.totalPrice,
                    currency: 'pln',
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // <-- ważne
                    },
                }
            );

            const sessionId = stripeResponse.data.sessionId;

            // Przekierowanie do Stripe Checkout
            const { error } = await stripe.redirectToCheckout({ sessionId });
            if (error) {
                console.error('Error redirecting to Stripe Checkout:', error);
            }
        } catch (error) {
            console.error('Error creating payment session:', error);
        }
    };

    // Filtrowanie zamówień tylko dla zalogowanego usera
    // Zwróć uwagę, że w tokenie musisz mieć userId -> user.userId
    // W bazie: order.basket.user.id
    const userOrders = user
        ? orders.filter((order) => order.basket.user.id === user.userId)
        : [];

    return (
        <Box mb={4} style={{ color: '#000' }}>
            <Typography variant="h6" style={{ color: '#000' }}>
                Zamówienia
            </Typography>

            {userOrders.map((order) => (
                <Paper key={order.id} elevation={3} style={{ padding: '16px', marginTop: '16px'}}>
                    <Typography variant="body1">
                        <strong>
                            {order.state === 'DELIVERED' ? 'Zakończone' : 'W toku'}
                        </strong>
                    </Typography>
                    <Typography variant="body2" style={{ color: '#888888' }}>
                        {new Date(order.orderDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" style={{ color: '#888888' }}>
                        nr {order.id}
                    </Typography>
                    <Typography variant="h6" style={{ marginTop: '8px' }}>
                        {order.basket.totalPrice.toFixed(2)} zł
                    </Typography>

                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                        <Box display="flex" alignItems="center">
                            {order.basket.basketProducts.map((product) => (
                                <img
                                    key={product.id}
                                    src={product.product.image || 'https://via.placeholder.com/50'}
                                    alt={`Product ${product.product.productName}`}
                                    style={{ width: '50px', height: '50px', marginRight: '8px' }}
                                />
                            ))}
                        </Box>
                        {order.type === 'UNPAID' && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handlePayment(order)}
                            >
                                Zapłać
                            </Button>
                        )}
                    </Box>
                </Paper>
            ))}
        </Box>
    );
};

export default OrderSection;
