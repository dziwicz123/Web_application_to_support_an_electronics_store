import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    Button,
    Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddToCartModal from "./AddToCartModal";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleImageClick = () => {
        navigate(`/product/${product.id}`);
    };

    const [hover, setHover] = useState(false);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const addToCart = () => {
        // Pobierz istniejący koszyk
        let cart = JSON.parse(sessionStorage.getItem("cart") || "[]");

        // Sprawdź, czy produkt już istnieje w koszyku
        const existingProduct = cart.find((p) => p.id === product.id);

        if (existingProduct) {
            // Zwiększ ilość, jeśli produkt już istnieje
            existingProduct.quantity += 1;
        } else {
            // Dodaj nowy produkt z kategorią
            const productToAdd = {
                id: product.id,
                productName: product.productName,
                price: product.price,
                cutPrice: product.cutPrice,
                image: product.image,
                categoryName: product.categoryName, // Dodaj nazwę kategorii
                quantity: 1,
            };
            cart.push(productToAdd);
        }

        // Zapisz koszyk w sessionStorage
        sessionStorage.setItem("cart", JSON.stringify(cart));

        // Otwórz modal z potwierdzeniem
        handleOpen();
    };


    // Render stars with golden color and half-stars
    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => {
            const starRating = index + 1;

            if (rating >= starRating) {
                return <StarIcon key={index} sx={{ color: "gold" }} />;
            } else if (rating >= starRating - 0.5) {
                return <StarHalfIcon key={index} sx={{ color: "gold" }} />;
            } else {
                return <StarBorderIcon key={index} sx={{ color: "gold" }} />;
            }
        });
    };

    return (
        <>
            <Card
                elevation={hover ? 8 : 1}
                sx={{
                    position: "relative",
                    overflow: "hidden",
                    transition: "elevation 0.3s",
                    height: 330,
                }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <CardActionArea onClick={handleImageClick}>
                    <CardMedia
                        component="img"
                        sx={{
                            height: 130,
                            width: 1,
                            objectFit: "contain",
                        }}
                        image={product.image}
                        alt={product.productName}
                    />
                </CardActionArea>
                <CardContent
                    sx={{
                        height: 200,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography
                        gutterBottom
                        variant="subtitle2"
                        component="div"
                        sx={{
                            textAlign: "left",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            hyphens: "auto",
                            wordBreak: "break-word",
                            overflowWrap: "break-word",
                        }}
                    >
                        {product.productName}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            mb: 1,
                        }}
                    >
                        {renderStars(product.rating)}
                        <Typography
                            variant="body2"
                            component="span"
                            sx={{ ml: 1, color: "gray" }}
                        >
                            ({product.reviewCount || 0})
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            {product.cutPrice && (
                                <Typography
                                    variant="body2"
                                    component="div"
                                    sx={{
                                        textDecoration: "line-through",
                                        color: "gray",
                                        marginRight: "10px",
                                    }}
                                >
                                    {product.cutPrice} zł
                                </Typography>
                            )}
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    fontWeight: "bold",
                                }}
                            >
                                {product.price} zł
                            </Typography>
                        </Box>
                        <Button
                            variant="outlined"
                            sx={{
                                borderColor: "#102C57",
                                borderWidth: 2,
                                color: "#102C57",
                                "&:hover": {
                                    backgroundColor: "#102C57",
                                    color: "white",
                                    borderColor: "#102C57",
                                },
                                opacity: hover ? 1 : 0,
                                transition: "opacity 0.3s",
                                pointerEvents: hover ? "auto" : "none",
                            }}
                            size="small"
                            onClick={addToCart}
                        >
                            <ShoppingCartIcon />
                        </Button>
                    </Box>
                </CardContent>
            </Card>
            <AddToCartModal open={open} handleClose={handleClose} />
        </>
    );
};

export default ProductCard;
