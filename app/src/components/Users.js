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
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Pagination,
    Stack,
} from '@mui/material';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [openBan, setOpenBan] = useState(false);
    const [banUser, setBanUser] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/users', { withCredentials: true });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    // Pagination calculations
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const filteredUsers = users.filter((user) => user.userType !== 'ADMIN');
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // Handle Ban Actions
    const handleBanClick = (user) => {
        setBanUser(user);
        setOpenBan(true);
    };

    const handleBanClose = () => {
        setOpenBan(false);
        setBanUser(null);
    };

    const handleBanConfirm = async () => {
        try {
            const response = await axios.put(`http://localhost:8081/api/users/${banUser.id}/ban`, null, {
                withCredentials: true,
            });
            const updatedUser = response.data;
            setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
            handleBanClose();
        } catch (error) {
            console.error('Error banning user:', error);
        }
    };

    return (
        <Container>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Imię</TableCell>
                            <TableCell>Nazwisko</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Telefon</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Akcje</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentUsers.map((user, index) => (
                            <TableRow
                                key={user.id}
                                sx={{
                                    backgroundColor: index % 2 === 0 ? '#FEFAF6' : '#EADBC8',
                                    '&:hover': {
                                        backgroundColor: '#D1C4E9',
                                    },
                                    opacity: user.ban ? 0.6 : 1,
                                }}
                            >
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>{user.ban ? 'Zbanowany' : 'Aktywny'}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleBanClick(user)}
                                        disabled={user.ban}
                                    >
                                        Ban
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <Stack spacing={2} sx={{ mt: 2 }} alignItems="center">
                <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
            </Stack>

            {/* Ban Confirmation Dialog */}
            <Dialog open={openBan} onClose={handleBanClose}>
                <DialogTitle>Ban użytkownika</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Czy na pewno chcesz zbanować użytkownika {banUser?.name} {banUser?.lastName}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleBanClose} color="primary">
                        Anuluj
                    </Button>
                    <Button onClick={handleBanConfirm} color="secondary">
                        Ban
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Users;
