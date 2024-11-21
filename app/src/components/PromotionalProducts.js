import React, { useEffect, useState } from "react";
import ProductGrid from "../components/ProductGrid";
import axios from "axios";

function PromotionalProducts() {
    const [promotionalProducts, setPromotionalProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:8081/api/products/dto");

                // Filter products with a promotional price (cutPrice) and limit to 4
                const promos = response.data.filter(product => product.cutPrice != null).slice(0, 4);
                setPromotionalProducts(promos);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            <div>
                <h2>Promocje</h2>
                <ProductGrid products={promotionalProducts} />
            </div>
        </>
    );
}

export default PromotionalProducts;
