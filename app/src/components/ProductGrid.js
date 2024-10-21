import React from 'react';
import { Grid } from '@mui/material';
import ProductCard from './ProductCard';

function ProductGrid({ products, onAddToBasket }) {
    return (
        <Grid container spacing={2} sx={{ marginTop: 4 }}>
            {products.map(product => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                    <ProductCard product={product} onAddToBasket={onAddToBasket} />
                </Grid>
            ))}
        </Grid>
    );
}

export default ProductGrid;
