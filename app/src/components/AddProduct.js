import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Grid,
    Typography,
    Container,
    Alert,
    Card,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from '@mui/material';
import '../styles/LoginPage.css';
import axios from 'axios';

function AddProduct() {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [imagePath, setImagePath] = useState('');
    const [price, setPrice] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/categories');
                setCategories(response.data);
            } catch (error) {
                setError('Failed to load categories. Please try again.');
            }
        };

        fetchCategories();
    }, []);

    const validateForm = () => {
        const errors = {};
        if (!productName) errors.productName = 'Product name is required.';
        if (!description) errors.description = 'Description is required.';
        if (!imagePath) errors.imagePath = 'Image path is required.';
        if (!price || price <= 0) errors.price = 'Price must be greater than 0.';
        if (!categoryId || categoryId === '0') errors.categoryId = 'Select a valid category.';
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Ensure required fields are present
        if (!productName || !description || !imagePath || !price || !categoryId) {
            setError('All required fields must be filled.');
            return;
        }

        try {
            const product = {
                productName,
                description,
                image: imagePath,
                price: parseFloat(price),
                categoryId: parseInt(categoryId),
            };

            const response = await axios.post('http://localhost:8081/api/products/add', product, {
                headers: { 'Content-Type': 'application/json' },
            });
            setSuccess('Product added successfully!');
            setError(null);
            setProductName('');
            setDescription('');
            setImagePath('');
            setPrice('');
            setCategoryId('');
        } catch (error) {
            setError('Error adding product: ' + (error.response?.data || error.message));
            setSuccess(null);
        }
    };


    const inputStyle = {
        backgroundColor: '#FEFAF6',
        borderRadius: '12px',
    };

    return (
        <Container
            maxWidth="lg"
            style={{
                marginTop: 0,
                padding: '1rem',
                backgroundColor: 'transparent',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Card
                style={{
                    backgroundColor: '#EADBC8',
                    borderRadius: '12px',
                    maxWidth: '500px',
                    padding: '2rem',
                    boxShadow: 'none',
                }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                    style={{ textAlign: 'center', color: '#102C57' }}
                >
                    Dodaj produkt
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nazwa produktu"
                                fullWidth
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                error={!!validationErrors.productName}
                                helperText={validationErrors.productName}
                                InputLabelProps={{ style: { color: '#102C57' } }}
                                InputProps={{ style: inputStyle }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Opis"
                                fullWidth
                                multiline
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                error={!!validationErrors.description}
                                helperText={validationErrors.description}
                                InputLabelProps={{ style: { color: '#102C57' } }}
                                InputProps={{ style: inputStyle }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Ścieżka do zdjęcia"
                                fullWidth
                                value={imagePath}
                                onChange={(e) => setImagePath(e.target.value)}
                                error={!!validationErrors.imagePath}
                                helperText={validationErrors.imagePath}
                                InputLabelProps={{ style: { color: '#102C57' } }}
                                InputProps={{ style: inputStyle }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Cena"
                                fullWidth
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                error={!!validationErrors.price}
                                helperText={validationErrors.price}
                                InputLabelProps={{ style: { color: '#102C57' } }}
                                InputProps={{ style: inputStyle }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth style={{ backgroundColor: '#FEFAF6', borderRadius: '12px' }}>
                                <InputLabel style={{ color: '#102C57' }}>Kategoria</InputLabel>
                                <Select
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                    error={!!validationErrors.categoryId}
                                    displayEmpty
                                    inputProps={{ style: inputStyle }}
                                >
                                    <MenuItem value="0">
                                        <em>Dodaj kategorię</em>
                                    </MenuItem>
                                    {categories.map((category) => (
                                        <MenuItem key={category.id} value={category.id}>
                                            {category.categoryName}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {validationErrors.categoryId && <Typography color="error" variant="caption">{validationErrors.categoryId}</Typography>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                type="submit"
                                fullWidth
                                style={{
                                    backgroundColor: '#102C57',
                                    color: '#FEFAF6',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    height: '3rem',
                                }}
                            >
                                Dodaj produkt
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </Container>
    );
}

export default AddProduct;
