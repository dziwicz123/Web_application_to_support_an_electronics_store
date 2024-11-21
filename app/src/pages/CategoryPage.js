import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box, Pagination } from "@mui/material";
import AppNavbar from "../components/Navbar";
import AppFooter from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import ProductFilter from "../components/ProductFilter";
import axios from 'axios';

function CategoryPage() {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        producers: [],
        priceFrom: '',
        priceTo: '',
    });
    const [page, setPage] = useState(1);
    const itemsPerPage = 12;

    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/categories/${categoryId}/products`);
                console.log('Fetched category data:', response.data);
                setProducts(response.data.products);
                setCategoryName(response.data.categoryName);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch category data:', error);
            }
        };

        fetchCategoryData();
    }, [categoryId]);

    const applyFilters = (products, filters) => {
        return products.filter(product => {
            const meetsPriceFrom = filters.priceFrom ? product.price >= filters.priceFrom : true;
            const meetsPriceTo = filters.priceTo ? product.price <= filters.priceTo : true;
            const meetsProducers = filters.producers.length > 0 ? filters.producers.some(producer => product.productName.toLowerCase().includes(producer.toLowerCase())) : true;

            return meetsPriceFrom && meetsPriceTo && meetsProducers;
        });
    };

    const handleFilterChange = (newFilters) => {
        console.log(newFilters);
        setFilters(newFilters);
    };

    const handleAddToBasket = (productId) => {
        // Handle add to basket logic here if needed
        console.log(`Product ${productId} added to basket`);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const filteredProducts = applyFilters(products, filters);
    const paginatedProducts = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                <AppNavbar />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        py: 3,
                        marginTop: 3,
                        marginBottom: 3,
                        borderRadius: 7,
                        width: '100%',
                    }}
                >
                    <Box sx={{ mr: 1, minWidth: '250px' }}>
                        <ProductFilter onFilterChange={handleFilterChange} categoryId={categoryId} />
                    </Box>
                    <Container
                        maxWidth="lg"
                        sx={{
                            flex: 1,
                            py: 3,
                            borderRadius: 7,
                            backgroundColor: "#f8f4ee",
                            marginLeft: 4,
                            marginRight: 0,
                            paddingLeft: '8px',
                            paddingRight: '8px',
                        }}
                    >
                        {isLoading ? (
                            <Typography variant="h4" align="center">
                                Loading...
                            </Typography>
                        ) : (
                            <>
                                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", mb: 2 }}>
                                    <Typography variant="h3" paragraph>
                                        {categoryName}
                                    </Typography>
                                    <Typography sx={{ color: "gray", ml: 2 }} variant="h5" paragraph>
                                        ({filteredProducts.length} wyniki)
                                    </Typography>
                                </Box>
                                <Box sx={{ textAlign: "justify" }}>
                                    <ProductGrid products={paginatedProducts} onAddToBasket={handleAddToBasket} />
                                </Box>
                                {pageCount > 1 && (
                                    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                                        <Pagination
                                            count={pageCount}
                                            page={page}
                                            onChange={handlePageChange}
                                            color="primary"
                                        />
                                    </Box>
                                )}
                            </>
                        )}
                    </Container>
                </Box>
                <AppFooter />
            </Box>
        </>
    );
}

export default CategoryPage;
