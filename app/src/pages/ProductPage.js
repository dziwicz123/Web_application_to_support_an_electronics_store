import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Typography,
    Card,
    CardMedia,
    Container,
    Paper,
    FormControl,
    MenuItem,
    Select,
    Rating,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import AppNavbar from "../components/Navbar";
import AppFooter from "../components/Footer";
import AddToCartModal from "../components/AddToCartModal";
import Opinion from "../components/Opinion";
import OpinionEdit from "../components/OpinionEdit";

const ProductPage = () => {
    // Pobieramy ID produktu z parametrów adresu URL
    const { productId } = useParams();

    // Stany potrzebne do obsługi produktu, koszyka oraz komentarzy
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [openModal, setOpenModal] = useState(false);
    const [comments, setComments] = useState([]);
    const [userComment, setUserComment] = useState(null);

    // Nowe stany na podstawie tokenu
    const [token, setToken] = useState(null);
    const [userEmail, setUserEmail] = useState(null);

    /**
     * 1. Sprawdzamy w sessionStorage, czy mamy 'token'.
     * 2. Jeśli tak, dekodujemy go i wyciągamy userEmail z `sub` (wg. JwtUtil).
     */
    useEffect(() => {
        const storedToken = sessionStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            try {
                const decoded = jwtDecode(storedToken);
                // zakładamy, że 'sub' = email użytkownika
                setUserEmail(decoded.sub || null);
            } catch (err) {
                console.error("Error decoding JWT:", err);
            }
        }
    }, []);

    // Funkcja do pobierania informacji o jednym produkcie z API
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

    // Funkcja do pobierania wszystkich komentarzy (opinii) dotyczących danego produktu
    const fetchComments = async () => {
        try {
            const productCommentsResponse = await axios.get(
                `http://localhost:8081/api/comments/product/${productId}`
            );
            setComments(productCommentsResponse.data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    /**
     * Funkcja do pobierania opinii zalogowanego użytkownika dla danego produktu
     * z użyciem emaila zdekodowanego z tokena (userEmail).
     */
    const fetchUserComment = async () => {
        if (!userEmail) return; // brak email -> brak zalogowanego usera

        try {
            // Pobierz komentarze użytkownika (z endpointu /api/comments/user/{email})
            const userCommentsResponse = await axios.get(
                `http://localhost:8081/api/comments/user/${userEmail}`
            );
            const userComments = userCommentsResponse.data;

            // Sprawdź, czy użytkownik ma już komentarz dla tego konkretnego produktu
            const userProductComment = userComments.find(
                (comment) => comment.productId === parseInt(productId, 10)
            );
            setUserComment(userProductComment);
        } catch (error) {
            console.error("Error fetching user comment:", error);
        }
    };

    // useEffect — wywołujemy nasze funkcje (fetchProduct, fetchComments, fetchUserComment) po załadowaniu komponentu
    useEffect(() => {
        if (productId) {
            fetchProduct();
            fetchComments();
            fetchUserComment();
        } else {
            console.error("Product ID is undefined");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId, userEmail]);
    /**
     * Uwaga: dodajemy 'userEmail' do zależności w useEffect,
     * żeby jeżeli zalogujemy się/zmienimy userEmail, to ponownie pobrało userComment.
     */

        // Obsługa zmiany ilości w select'cie
    const handleChange = (event) => {
            setQuantity(event.target.value);
        };

    // Obsługa dodania do koszyka
    const handleAddToCart = () => {
        const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

        // Dodajemy lub aktualizujemy produkt w koszyku
        const existingProductIndex = cart.findIndex((item) => item.id === product.id);
        if (existingProductIndex !== -1) {
            // Jeśli produkt już istnieje w koszyku, zwiększamy ilość
            cart[existingProductIndex].quantity += quantity;
        } else {
            // W przeciwnym razie dodajemy nowy produkt
            cart.push({ ...product, quantity });
        }

        // Zapisujemy koszyk w sessionStorage
        sessionStorage.setItem("cart", JSON.stringify(cart));
        // Otwieramy modal potwierdzający dodanie do koszyka
        setOpenModal(true);
    };

    // Zamknięcie modala po dodaniu do koszyka
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    // Jeśli produkt jeszcze się ładuje, wyświetlamy tymczasowy komunikat
    if (!product) {
        return <Typography>Loading...</Typography>;
    }

    // Formatowanie opisu produktu (zamiana \n na nowe linie itd.)
    const formattedDescription = product.description?.replace(/\\r\\n|\\n/g, "\n");
    const descriptionLines = formattedDescription?.split("\n") || [];

    // Pomocnicza funkcja do wyróżniania nazwy parametru w opisie
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

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => {
            const starRating = index + 1;

            if (rating >= starRating) {
                return <StarIcon key={index} sx={{ color: "gold" }} fontSize="large" />;
            } else if (rating >= starRating - 0.5) {
                return <StarHalfIcon key={index} sx={{ color: "gold" }} fontSize="large" />;
            } else {
                return <StarBorderIcon key={index} sx={{ color: "gold" }} fontSize="large" />;
            }
        });
    };

    const isUserLoggedIn = !!(token && userEmail);

    return (
        <>
            <AppNavbar />

            <Container
                maxWidth="lg"
                sx={{
                    py: 4,
                    backgroundColor: "#f8f4ee",
                    marginTop: 5,
                    marginBottom: 5,
                    borderRadius: 6,
                }}
            >
                {/* Nazwa produktu */}
                <Typography
                    variant="h4"
                    gutterBottom
                    component="div"
                    sx={{ mt: 2, mb: 2, textAlign: "center" }}
                >
                    {product.productName}
                </Typography>

                {/* Sekcja główna: obrazek + prawa kolumna z ceną i przyciskami */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",
                    }}
                >
                    {/* Lewa część: obrazek produktu */}
                    <Card elevation={0} sx={{ mr: 4 }}>
                        <CardMedia
                            component="img"
                            image={product.image}
                            alt={product.productName}
                            sx={{ width: "400px", height: "auto" }}
                        />
                    </Card>

                    {/* Prawa część: cena, rating, dostępność, dodawanie do koszyka */}
                    <Paper
                        elevation={2}
                        sx={{
                            p: 5,
                            width: "400px",
                            height: "auto",
                            textAlign: "right",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            borderRadius: 4,
                            ml: 8,
                        }}
                    >
                        {/* Wyświetlenie informacji o rabacie (jeśli jest) */}
                        {product.cutPrice && (
                            <Typography
                                sx={{ color: "green", fontWeight: "bold", fontSize: "32px" }}
                            >
                                Zaoszczędź {product.price - product.cutPrice} zł
                            </Typography>
                        )}

                        {/* Główna cena */}
                        <Typography variant="h2" sx={{ fontWeight: "bold", fontSize: "48px" }}>
                            {product.cutPrice || product.price} zł
                        </Typography>

                        {/* Ocena (rating) + liczba recenzji */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                ml: "auto",
                                mt: 2,
                            }}
                        >
                            {renderStars(product.rating || 0)}
                            <Typography
                                sx={{
                                    ml: 1,
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    color: "gray",
                                }}
                            >
                                ({product.reviewCount || 0})
                            </Typography>
                        </Box>

                        {/* Status dostępności (oparty np. o pole isAvailable w bazie) */}
                        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                            {/* Kółko z odpowiednim kolorem */}
                            <Box
                                sx={{
                                    width: "12px",
                                    height: "12px",
                                    borderRadius: "50%",
                                    backgroundColor:
                                        product.quantityType === "NORMAL"
                                            ? "green"
                                            : product.quantityType === "FEW"
                                                ? "orange"
                                                : "red", // Domyślnie "red" jeśli "NONE" lub brak danych
                                    mr: 1,
                                }}
                            />
                            {/* Tekst wyświetlający się obok */}
                            <Typography
                                sx={{ color: "black", fontWeight: "bold", fontSize: "28px" }}
                            >
                                {product.quantityType === "NORMAL"
                                    ? "Dostępny"
                                    : product.quantityType === "FEW"
                                        ? "Ostatnie sztuki"
                                        : "Niedostępny"}
                            </Typography>
                        </Box>

                        {/* Dodawanie produktu do koszyka (select + przycisk) */}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                mt: 4,
                                width: "100%",
                            }}
                        >
                            <FormControl
                                variant="outlined"
                                size="medium"
                                sx={{ width: "120px", mr: 3 }}
                                disabled={product.quantityType === "NONE"}
                            >
                                <Select value={quantity} onChange={handleChange}>
                                    {[1, 2, 3, 4].map((q) => (
                                        <MenuItem key={q} value={q}>
                                            {q}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button
                                variant="contained"
                                color="success"
                                sx={{
                                    width: "200px",
                                    height: "60px",
                                    fontSize: "22px",
                                    fontWeight: "bold",
                                }}
                                onClick={handleAddToCart}
                                disabled={product.quantityType === "NONE"}
                                startIcon={<ShoppingCartIcon />}
                            >
                                Dodaj
                            </Button>
                        </Box>
                    </Paper>
                </Box>

                {/* Opis produktu */}
                <Typography variant="h5" sx={{ mt: 4 }}>
                    Opis Produktu
                </Typography>
                <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
                    <Typography variant="body1">
                        {descriptionLines.map((line, index) => (
                            <span key={index}>
                {formatLine(line)}
                                <br />
              </span>
                        ))}
                    </Typography>
                </Paper>

                {/* Sekcja komentarzy / opinii */}
                <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
                    Komentarze
                </Typography>

                {/* Jeśli użytkownik (token) jest zalogowany, pokaż formularz opinii (lub edycji) */}
                {isUserLoggedIn ? (
                    userComment ? (
                        // Komponent do edycji opinii
                        <OpinionEdit
                            existingOpinion={userComment}
                            productId={productId}
                            onOpinionUpdated={() => {
                                // Po aktualizacji opinii odświeżamy dane
                                fetchUserComment();
                                fetchComments();
                                fetchProduct();
                            }}
                        />
                    ) : (
                        // Komponent do dodania nowej opinii
                        <Opinion
                            productId={productId}
                            onOpinionAdded={() => {
                                // Po dodaniu opinii odświeżamy dane
                                fetchUserComment();
                                fetchComments();
                                fetchProduct();
                            }}
                        />
                    )
                ) : (
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        Zaloguj się, aby dodać swoją opinię o tym produkcie.
                    </Typography>
                )}

                {/* Wyświetlanie istniejących komentarzy (pozostałych użytkowników) */}
                {comments.map((comment) => (
                    <Paper
                        elevation={3}
                        sx={{
                            p: 3,
                            mb: 3,
                            borderRadius: 4,
                        }}
                        key={comment.id}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                {comment.username}
                            </Typography>
                            <Rating
                                value={comment.rating}
                                precision={0.5}
                                readOnly
                                size="medium"
                            />
                        </Box>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                            {comment.description}
                        </Typography>
                    </Paper>
                ))}
            </Container>

            <AddToCartModal open={openModal} handleClose={handleCloseModal} />

            <AppFooter />
        </>
    );
};

export default ProductPage;
