import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

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

    const handleClickOpen = (user) => {
        setSelectedUser(user);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedUser(null);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8081/api/users/${selectedUser.id}`, { withCredentials: true });
            setUsers(users.filter(user => user.id !== selectedUser.id));
            handleClose();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Użytkownicy
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Imię</TableCell>
                            <TableCell>Nazwisko</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Telefon</TableCell>
                            <TableCell>Hasło</TableCell>
                            <TableCell>Akcje</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>{user.password}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="secondary" onClick={() => handleClickOpen(user)}>
                                        Usuń
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Usuń użytkownika</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Czy na pewno chcesz usunąć użytkownika {selectedUser?.name} {selectedUser?.lastName}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Anuluj
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Usuń
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Users;
