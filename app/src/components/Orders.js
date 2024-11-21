import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, TableSortLabel } from '@mui/material';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [editingStatus, setEditingStatus] = useState({});
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/order/all', { withCredentials: true });
                const sortedData = sortData(response.data, 'asc');
                setOrders(sortedData);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const sortData = (data, order) => {
        return data.sort((a, b) => {
            if (order === 'asc') {
                return a.basket.id - b.basket.id;
            } else {
                return b.basket.id - a.basket.id;
            }
        });
    };

    const handleSort = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        const sortedData = sortData([...orders], newSortOrder);
        setSortOrder(newSortOrder);
        setOrders(sortedData);
    };

    const handleStatusChange = async (id, newState) => {
        try {
            const response = await axios.patch(
                `http://localhost:8081/api/order/update/${id}`,
                { state: newState }, // Updated payload format
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            setOrders(orders.map(order => (order.id === id ? response.data : order)));
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const handleSelectChange = (id, event) => {
        const newState = event.target.value;
        setEditingStatus({ ...editingStatus, [id]: newState });
        handleStatusChange(id, newState);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Zamówienia
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sortDirection={sortOrder}>
                                <TableSortLabel
                                    active={true}
                                    direction={sortOrder}
                                    onClick={handleSort}
                                >
                                    Koszyk ID
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Całkowita cena</TableCell>
                            <TableCell>Data zamówienia</TableCell>
                            <TableCell>Data wysyłki</TableCell>
                            <TableCell>Status zamówienia</TableCell>
                            <TableCell>Typ płatności</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.basket.id}</TableCell>
                                <TableCell>{order.basket.totalPrice}</TableCell>
                                <TableCell>{order.orderDate}</TableCell>
                                <TableCell>{order.shipDate ? order.shipDate : 'Nie wysłano'}</TableCell>
                                <TableCell>
                                    <Select
                                        value={editingStatus[order.id] || order.state}
                                        onChange={(event) => handleSelectChange(order.id, event)}
                                    >
                                        <MenuItem value="PENDING">PENDING</MenuItem>
                                        <MenuItem value="CONFIRMED">CONFIRMED</MenuItem>
                                        <MenuItem value="SHIPPED">SHIPPED</MenuItem>
                                        <MenuItem value="DELIVERED">DELIVERED</MenuItem>
                                        <MenuItem value="CANCELLED">CANCELLED</MenuItem>
                                    </Select>
                                </TableCell>
                                <TableCell>{order.type}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default Orders;
