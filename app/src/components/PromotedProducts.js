import React, { useEffect, useState } from "react";
import ProductGrid from "../components/ProductGrid";
import axios from "axios";

function PromotedProducts() {
    const [recommendedProducts, setRecommendedProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:8081/api/products/dto");

                // Filter products with a rating above 4
                const filteredProducts = response.data.filter(product => product.rating > 4);

                // Shuffle and slice to get 8 recommended products
                const shuffled = filteredProducts.sort(() => 0.5 - Math.random());
                setRecommendedProducts(shuffled.slice(0, 8));
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);


    return (
        <>
            <div>
                <h2>Polecane</h2>
                <ProductGrid products={recommendedProducts} />
            </div>
        </>
    );
}

export default PromotedProducts;
