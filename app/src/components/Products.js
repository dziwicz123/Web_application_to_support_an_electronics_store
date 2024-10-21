import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TablePagination } from '@mui/material';

function Products() {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/products', { withCredentials: true });
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleClickOpen = (product) => {
        setSelectedProduct(product);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedProduct(null);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8081/api/products/${selectedProduct.id}`, { withCredentials: true });
            setProducts(products.filter(product => product.id !== selectedProduct.id));
            handleClose();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <Container>
        <Typography variant="h4" gutterBottom>
            Produkty
        </Typography>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nazwa produktu</TableCell>
                        <TableCell>Kategoria</TableCell>
                        <TableCell>Opis</TableCell>
                        <TableCell>Cena</TableCell>
                        <TableCell>Cena promocyjna</TableCell>
                        <TableCell>Akcje</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>{product.id}</TableCell>
                            <TableCell>{product.productName}</TableCell>
                            <TableCell>{product.category?.categoryName}</TableCell>
                            <TableCell>{product.description}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.cutPrice}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="secondary" onClick={() => handleClickOpen(product)}>
                                    Usuń
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>

        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Usuń produkt</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Czy na pewno chcesz usunąć produkt {selectedProduct?.productName}?
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
}

export default Products;
