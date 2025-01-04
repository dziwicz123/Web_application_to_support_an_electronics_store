import React, { useState, useEffect } from 'react';
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Select,
    MenuItem,
    TableSortLabel,
    Pagination,
    Stack,
    Typography,
} from '@mui/material';
import axios from 'axios';

function parseLocalDateTimeArray(dateArray) {
    // dateArray = [yyyy, MM, dd, HH, mm, ss]
    // Uwaga: w JS miesiące liczymy od 0, więc trzeba odjąć 1
    if (!Array.isArray(dateArray) || dateArray.length < 3) return null;
    const [year, month, day, hour = 0, minute = 0, second = 0] = dateArray;
    return new Date(year, month - 1, day, hour, minute, second);
}

function Orders() {
    const [orders, setOrders] = useState([]);
    const [editingStatus, setEditingStatus] = useState({});
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10;

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

    // Pagination calculations
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(orders.length / ordersPerPage);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
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
                        {currentOrders.map((order, index) => (
                            <TableRow
                                key={order.id}
                                sx={{
                                    backgroundColor: index % 2 === 0 ? '#FEFAF6' : '#EADBC8',
                                    '&:hover': {
                                        backgroundColor: '#D1C4E9',
                                    },
                                }}
                            >
                                <TableCell>{order.basket.id}</TableCell>
                                <TableCell>{order.basket.totalPrice}</TableCell>
                                <TableCell>
                                    {order.orderDate
                                        ? parseLocalDateTimeArray(order.orderDate).toLocaleDateString()
                                        : 'Brak'}
                                </TableCell>
                                <TableCell>
                                    {order.shipDate
                                        ? parseLocalDateTimeArray(order.shipDate).toLocaleDateString()
                                        : 'Nie wysłano'}
                                </TableCell>
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

            {/* Pagination */}
            <Stack spacing={2} sx={{ mt: 2 }} alignItems="center">
                <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
            </Stack>
        </Container>
    );
}

export default Orders;
