import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardMedia,
  Grid,
  Container,
  Paper,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AppNavbar from "../components/Navbar";
import AppFooter from "../components/Footer";
import axios from "axios";
import { useParams } from "react-router-dom";
import AddToCartModal from "../components/AddToCartModal";
const ProductPage = () => {
  const { productId } = useParams(); // Get product ID from route parameters
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:8081/api/products/${productId}`);
          setProduct(response.data);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };

      fetchProduct();
    } else {
      console.error("Product ID is undefined");
    }
  }, [productId]);

  const handleChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    const cartProduct = {
      ...product,
      quantity: quantity
    };

    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += quantity;
    } else {
      cart.push(cartProduct);
    }

    sessionStorage.setItem("cart", JSON.stringify(cart));
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  const formattedDescription = product.description.replace(/\\r\\n|\\n/g, "\n");
  const descriptionLines = formattedDescription.split("\n");
  const descriptionLines4 = formattedDescription.split("\n").slice(0, 4);

  return (
      <>
        <AppNavbar />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Container maxWidth="lg" sx={{ py: 3, marginTop: 3,
            marginBottom: 3,
            borderRadius: 7, backgroundColor: "white", height: "100%" }}>
            <Grid container spacing={4} alignItems="flex-start">
              <Grid item xs={12} md={4}>
                <Card elevation={0}>
                  <CardMedia
                      component="img"
                      image={product.image}
                      alt={product.productName}
                      sx={{ width: "100%", height: "auto" }}
                  />
                </Card>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="h4" gutterBottom component="div" sx={{ mt: 2, mb: 2 }}>
                  {product.productName}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Paper elevation={2} sx={{ p: 2 }}>
                      <Typography variant="body1" gutterBottom>
                        {descriptionLines4.map((line, index) => (
                            <span key={index}>
                          {line}
                              <br />
                        </span>
                        ))}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper elevation={2} sx={{ p: 2, height: "100%" }}>
                      {product.cutPrice && (
                          <Typography sx={{ color: "green", fontWeight: "bold" }} gutterBottom>
                            Oszczędź {product.price - product.cutPrice} zł
                          </Typography>
                      )}
                      <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
                        {product.cutPrice ? product.cutPrice : product.price} zł
                      </Typography>
                      <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
                        <FormControl size="small" sx={{ width: "70px", mr: 1 }}>
                          <Select
                              labelId="quantity-label"
                              id="quantity"
                              value={quantity}
                              onChange={handleChange}
                          >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                          </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            color="success"
                            sx={{ flexGrow: 1 }}
                            startIcon={<ShoppingCartIcon />}
                            onClick={handleAddToCart}
                        >
                          Dodaj do koszyka
                        </Button>
                      </Box>
                      <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
                        <CheckCircleOutlineIcon sx={{ color: "green", mr: 1 }} />
                        <Typography variant="body2" sx={{ color: "green" }}>
                          Dostępny
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom component="div" sx={{ mt: 2, mb: 1 }}>
                Opis Produktu:
              </Typography>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="body1">
                  {descriptionLines.map((line, index) => (
                      <span key={index}>
                    {line}
                        <br />
                  </span>
                  ))}
                </Typography>
              </Paper>
            </Grid>
          </Container>
        </Box>
        <AddToCartModal open={openModal} handleClose={handleCloseModal} />
        <AppFooter />
      </>
  );
};

export default ProductPage;
