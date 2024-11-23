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
  Rating,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AppNavbar from "../components/Navbar";
import AppFooter from "../components/Footer";
import axios from "axios";
import { useParams } from "react-router-dom";
import AddToCartModal from "../components/AddToCartModal";
import Opinion from "../components/Opinion";
import OpinionEdit from "../components/OpinionEdit";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState(null);

  const user = JSON.parse(sessionStorage.getItem("user"));



  const fetchUserComment = async () => {
    try {
      // Pobieranie wszystkich komentarzy użytkownika na podstawie e-maila
      const userCommentsResponse = await axios.get(
          `http://localhost:8081/api/comments/user/${user.email}`
      );
      const userComments = userCommentsResponse.data;

      // Sprawdzenie, czy użytkownik ma już komentarz do danego produktu
      const userProductComment = userComments.find(
          (comment) => comment.productId === parseInt(productId)
      );
      setUserComment(userProductComment);
    } catch (error) {
      console.error("Error fetching user comment:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const productCommentsResponse = await axios.get(
          `http://localhost:8081/api/comments/product/${productId}`
      );
      const allProductComments = productCommentsResponse.data;
      setComments(allProductComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const fetchProduct = async () => {
    try {
      const productResponse = await axios.get(
          `http://localhost:8081/api/products/${productId}/dto`
      );
      setProduct(productResponse.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchUserComment(); // Pobieranie komentarza użytkownika
      fetchComments();
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
      quantity: quantity,
    };

    const existingProductIndex = cart.findIndex((item) => item.id === product.id);

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

  const formatLine = (line) => {
    const parts = line.split(":");
    if (parts.length > 1) {
      return (
          <>
            {parts[0]}: <strong>{parts.slice(1).join(":").trim()}</strong>
          </>
      );
    }
    return line;
  };

  return (
      <>
        <AppNavbar />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Container
              maxWidth="lg"
              sx={{
                py: 3,
                marginTop: 3,
                marginBottom: 3,
                borderRadius: 7,
                backgroundColor: "#f8f4ee",
                height: "100%",
              }}
          >
            <Grid container spacing={4} alignItems="flex-start">
              <Grid item xs={12}>
                <Typography
                    variant="h4"
                    gutterBottom
                    component="div"
                    sx={{ mt: 2, mb: 2, textAlign: "center" }}
                >
                  {product.productName}
                </Typography>
              </Grid>
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
              <Grid item xs={12} md={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Paper elevation={2} sx={{ p: 2, height: "100%" }}>
                      {product.cutPrice && (
                          <Typography sx={{ color: "green", fontWeight: "bold" }} gutterBottom>
                            Oszczędź {product.price - product.cutPrice} zł
                          </Typography>
                      )}
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: "bold", mr: 2 }}>
                          {product.cutPrice ? product.cutPrice : product.price} zł
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                          <Rating
                              value={product.rating || 0}
                              precision={0.5}
                              readOnly
                              size="large"
                          />
                          <Typography variant="body2" sx={{ ml: 1, color: "gray" }}>
                            ({product.reviewCount || 0})
                          </Typography>
                        </Box>
                      </Box>
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

            <Grid item xs={12} sx={{ mt: 4 }}>
              <Typography
                  variant="h5"
                  gutterBottom
                  component="div"
                  sx={{ mb: 1 }}
              >
                Opis Produktu
              </Typography>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="body1">
                  {descriptionLines.map((line, index) => (
                      <span key={index}>
                    {formatLine(line)}
                        <br />
                  </span>
                  ))}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sx={{ mt: 4 }}>
              {/* Wyświetlanie sekcji opinii tylko, gdy użytkownik jest zalogowany */}
              {user ? (
                  <>
                    {userComment ? (
                        <OpinionEdit
                            existingOpinion={userComment}
                            productId={productId}
                            onOpinionUpdated={() => {
                              fetchUserComment();
                              fetchComments();
                              fetchProduct();
                            }}
                        />
                    ) : (
                        <Opinion
                            productId={productId}
                            onOpinionAdded={() => {
                              fetchUserComment();
                              fetchComments();
                              fetchProduct();
                            }}
                        />
                    )}
                  </>
              ) : (
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Zaloguj się, aby dodać swoją opinię o tym produkcie.
                  </Typography>
              )}

              <Typography variant="h5" gutterBottom>
                Komentarze
              </Typography>

              {/* Display Other Users' Comments */}
              {comments.map((comment) => (
                  <Paper elevation={1} sx={{ p: 2, mb: 2 }} key={comment.id}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      {comment.username}
                    </Typography>
                    <Rating value={comment.rating} precision={0.5} readOnly size="small" />
                    <Typography variant="body2">{comment.description}</Typography>
                  </Paper>
              ))}
            </Grid>
          </Container>
        </Box>
        <AddToCartModal open={openModal} handleClose={handleCloseModal} />
        <AppFooter />
      </>
  );
};

export default ProductPage;
