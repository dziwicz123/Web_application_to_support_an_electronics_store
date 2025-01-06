import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Paper, Typography, Button, Pagination, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import jwtDecode from 'jwt-decode'; // Upewnij się, że importujesz poprawnie

const stripePromise = loadStripe('pk_test_51PQtgQ03dG9DcKmUHYPxw5W8tRpSdhpIuHvWH5KRsSi7WXxvD32zFrpWTM43eBLZJfWWh7vbzrJi9rrO2BviI6pK00bBqaArZu'); // podmień na swój klucz publiczny

function parseLocalDateTimeArray(dateArray) {
    // dateArray = [yyyy, MM, dd, HH, mm, ss]
    // Uwaga: w JS miesiące liczymy od 0, więc trzeba odjąć 1
    if (!Array.isArray(dateArray) || dateArray.length < 3) return null;
    const [year, month, day, hour = 0, minute = 0, second = 0] = dateArray;
    return new Date(year, month - 1, day, hour, minute, second);
}

const OrderSection = ({ user }) => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    // Stany do paginacji
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5; // Liczba zamówień na stronę

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/order/all', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                let fetchedOrders = response.data;

                // Posortuj od najnowszych do najstarszych
                fetchedOrders.sort((a, b) => {
                    const dateA = a.orderDate ? parseLocalDateTimeArray(a.orderDate) : new Date(0);
                    const dateB = b.orderDate ? parseLocalDateTimeArray(b.orderDate) : new Date(0);
                    return dateB - dateA;
                });

                setOrders(fetchedOrders);
                setCurrentPage(1); // Resetowanie strony po pobraniu zamówień
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

    // Wyliczamy indeksy zamówień dla aktualnej strony
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = userOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(userOrders.length / ordersPerPage);

    // Handler zmiany strony
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <Box mb={4} style={{ color: '#000' }}>
            <Typography variant="h6" style={{ color: '#000' }}>
                Zamówienia
            </Typography>

            {currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                    <Paper key={order.id} elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
                        <Typography variant="body1">
                            <strong>
                                {order.state === 'DELIVERED' ? 'Zakończone' : 'W toku'}
                            </strong>
                        </Typography>
                        <Typography variant="body2" style={{ color: '#888888' }}>
                            {order.orderDate
                                ? parseLocalDateTimeArray(order.orderDate).toLocaleDateString()
                                : 'Brak'}
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
                ))
            ) : (
                <Typography>Brak zamówień do wyświetlenia.</Typography>
            )}

            {/* Komponent paginacji */}
            {totalPages > 1 && (
                <Stack spacing={2} sx={{ mt: 2 }} alignItems="center">
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Stack>
            )}
        </Box>
    );
};

export default OrderSection;
