import React, { useEffect } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AppNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const PaymentSuccess = () => {
    useEffect(() => {
        const basketId = sessionStorage.getItem("basketId");
        if (basketId) {
            // Call backend to update payment status
            axios
                .patch(`http://localhost:8081/api/order/update-payment-status/${basketId}`, {
                    paymentStatus: "PAID",
                })
                .then((response) => {
                    console.log("Payment status updated successfully:", response.data);
                })
                .catch((error) => {
                    console.error("Error updating payment status:", error);
                });

            sessionStorage.removeItem("basketId");
        }
    }, []);

    return (
        <>
            <AppNavbar />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    py: 3,
                    marginTop: 3,
                    marginBottom: 3,
                    borderRadius: 7,
                    width: "100%",
                    backgroundColor: "#DAC0A3", // Główne tło
                }}
            >
                <Container
                    maxWidth="sm"
                    sx={{
                        textAlign: "center",
                        backgroundColor: "#EADBC8", // Jasne tło wewnątrz
                        borderRadius: 3,
                        py: 4,
                        boxShadow: 3,
                    }}
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mb={2}
                    >
                        <CheckCircleIcon
                            sx={{ fontSize: 80, color: "#102C57", mb: 2 }} // ikona w ciemnym niebieskim
                        />
                        <Typography variant="h4" gutterBottom sx={{ color: "#0F044C" }}>
                            Płatność przebiegła pomyślnie!
                        </Typography>
                        <Typography variant="body1" gutterBottom sx={{ color: "#102C57" }}>
                            Dziękujemy za dokonanie płatności. Twoja transakcja została
                            pomyślnie zakończona.
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        href="/"
                        sx={{
                            backgroundColor: "#102C57", // ciemny niebieski
                            color: "#FEFAF6",           // jasny tekst
                            "&:hover": {
                                backgroundColor: "#0F044C", // jeszcze ciemniejszy niebieski przy hoverze
                            },
                        }}
                    >
                        Powrót do strony głównej
                    </Button>
                </Container>
            </Box>
            <Footer />
        </>
    );
};

export default PaymentSuccess;
