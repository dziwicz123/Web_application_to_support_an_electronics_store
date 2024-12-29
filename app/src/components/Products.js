import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
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
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';

function Products() {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editOpen, setEditOpen] = useState(false);
    const [editProductData, setEditProductData] = useState({
        id: "",
        productName: "",
        category: null,  // lub categoryId
        description: "",
        price: 0,
        cutPrice: 0,
        producer: "",
        quantityType: "",
    });

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    // Pobieramy listę posortowanych i paginowanych produktów
    const fetchProducts = async (pageNumber) => {
        try {
            const response = await axios.get(
                `http://localhost:8081/api/products/admin?page=${pageNumber}`
            );
            const pageData = response.data;
            console.log("Page data:", pageData);
            setProducts(pageData.content);
            setTotalPages(pageData.totalPages);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value - 1); // MUI liczy strony od 1, Spring od 0
    };

    const handleClickOpen = (product) => {
        setSelectedProduct(product);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedProduct(null);
    };

    const handleDelete = async () => {
        if (!selectedProduct) return;
        try {
            await axios.delete(
                `http://localhost:8081/api/products/${selectedProduct.id}`,
                { withCredentials: true }
            );
            fetchProducts(currentPage);
            handleClose();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    // Otwiera dialog edycji i ustawia dane produktu w stanie
    const handleEditOpen = (product) => {
        setEditProductData({
            id: product.id,
            productName: product.productName,
            category: product.category,
            description: product.description,
            price: product.price,
            cutPrice: product.cutPrice,
            producer: product.producer,
            quantityType: product.quantityType,
        });
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    // Obsługa zmian w polach edycji
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditProductData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Aktualizacja produktu - wysyłanie PUT
    const handleUpdate = async () => {
        console.log("PUT to:", `http://localhost:8081/api/products/${editProductData.id}`);
        try {
            await axios.put(
                `http://localhost:8081/api/products/${editProductData.id}`,
                editProductData
            );
            fetchProducts(currentPage);
            setEditOpen(false);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Produkty
            </Typography>
            <TableContainer
                component={Paper}
                sx={{
                    minWidth: '1350px',
                    mt: 2,
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nazwa produktu</TableCell>
                            <TableCell>Kategoria</TableCell>
                            <TableCell sx={{ width: 400 }}>Opis</TableCell>
                            <TableCell>Cena</TableCell>
                            <TableCell>Cena promocyjna</TableCell>
                            <TableCell>Producent</TableCell>
                            <TableCell>Stan magazynu</TableCell>
                            <TableCell>Edytuj</TableCell>
                            <TableCell>Usuń</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product, index) => (
                            <TableRow
                                key={product.id}
                                sx={{
                                    backgroundColor: index % 2 === 0 ? '#FEFAF6' : '#EADBC8',
                                    '&:hover': { backgroundColor: '#D1C4E9' },
                                }}
                            >
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product.productName}</TableCell>
                                <TableCell>
                                    {product.category?.categoryName || 'Brak kategorii'}
                                </TableCell>
                                <TableCell sx={{ width: 400 }}>
                                    {product.description}
                                </TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.cutPrice}</TableCell>
                                <TableCell>
                                    {product.producer || 'Brak danych'}
                                </TableCell>
                                <TableCell>
                                    {product.quantityType || 'Brak danych'}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="warning"
                                        onClick={() => handleEditOpen(product)}
                                    >
                                        Edytuj
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleClickOpen(product)}
                                    >
                                        Usuń
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Paginacja */}
            <Stack spacing={2} sx={{ mt: 2 }} alignItems="center">
                <Pagination
                    count={totalPages}
                    page={currentPage + 1}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Stack>

            {/* Dialog usuwania produktu */}
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

            {/* Dialog edytowania produktu */}
            <Dialog
                open={editOpen}
                onClose={handleEditClose}
                PaperProps={{
                    style: {
                        backgroundColor: '#EADBC8',
                        borderRadius: '12px',
                    },
                }}
            >
                <DialogTitle style={{ color: '#102C57', fontWeight: 'bold' }}>
                    Edytuj produkt
                </DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ color: '#102C57' }}>
                        Zmień dane produktu i kliknij „Zapisz”.
                    </DialogContentText>

                    {/* Wyświetlenie ID w polu tekstowym (tylko do odczytu) */}
                    <TextField
                        label="ID produktu"
                        name="id"
                        fullWidth
                        variant="outlined"
                        value={editProductData.id}
                        margin="dense"
                        InputProps={{
                            style: { backgroundColor: '#FEFAF6', borderRadius: '12px' },
                            readOnly: true, // Uniemożliwia edycję ID
                        }}
                        InputLabelProps={{ style: { color: '#102C57' } }}
                    />

                    <TextField
                        margin="dense"
                        label="Nazwa produktu"
                        name="productName"
                        fullWidth
                        variant="outlined"
                        value={editProductData.productName}
                        onChange={handleEditChange}
                        InputLabelProps={{ style: { color: '#102C57' } }}
                        InputProps={{ style: { backgroundColor: '#FEFAF6', borderRadius: '12px' } }}
                    />
                    <TextField
                        margin="dense"
                        label="Opis"
                        name="description"
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={5}
                        value={editProductData.description}
                        onChange={handleEditChange}
                        InputLabelProps={{ style: { color: '#102C57' } }}
                        InputProps={{ style: { backgroundColor: '#FEFAF6', borderRadius: '12px' } }}
                    />
                    <TextField
                        margin="dense"
                        label="Cena"
                        name="price"
                        type="number"
                        fullWidth
                        variant="outlined"
                        value={editProductData.price}
                        onChange={handleEditChange}
                        InputLabelProps={{ style: { color: '#102C57' } }}
                        InputProps={{ style: { backgroundColor: '#FEFAF6', borderRadius: '12px' } }}
                    />
                    <TextField
                        margin="dense"
                        label="Cena promocyjna"
                        name="cutPrice"
                        type="number"
                        fullWidth
                        variant="outlined"
                        value={editProductData.cutPrice}
                        onChange={handleEditChange}
                        InputLabelProps={{ style: { color: '#102C57' } }}
                        InputProps={{ style: { backgroundColor: '#FEFAF6', borderRadius: '12px' } }}
                    />
                    <TextField
                        margin="dense"
                        label="Producent"
                        name="producer"
                        fullWidth
                        variant="outlined"
                        value={editProductData.producer}
                        onChange={handleEditChange}
                        InputLabelProps={{ style: { color: '#102C57' } }}
                        InputProps={{ style: { backgroundColor: '#FEFAF6', borderRadius: '12px' } }}
                    />

                    {/* Wybór stanu magazynu */}
                    <FormControl
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        sx={{
                            backgroundColor: '#FEFAF6',
                            borderRadius: '12px',
                        }}
                    >
                        <InputLabel style={{ color: '#102C57' }}>Stan magazynu</InputLabel>
                        <Select
                            name="quantityType"
                            value={editProductData.quantityType || ''}
                            onChange={handleEditChange}
                            label="Stan magazynu"
                            inputProps={{
                                style: { backgroundColor: '#FEFAF6', borderRadius: '12px' },
                            }}
                        >
                            <MenuItem value="NORMAL">Normalny</MenuItem>
                            <MenuItem value="FEW">Mało</MenuItem>
                            <MenuItem value="NONE">Brak</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'space-between', p: 2 }}>
                    <Button
                        onClick={handleEditClose}
                        style={{
                            backgroundColor: '#FEFAF6',
                            color: '#102C57',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            height: '3rem',
                        }}
                    >
                        Anuluj
                    </Button>
                    <Button
                        onClick={handleUpdate}
                        style={{
                            backgroundColor: '#102C57',
                            color: '#FEFAF6',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            height: '3rem',
                        }}
                    >
                        Zapisz
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default Products;
