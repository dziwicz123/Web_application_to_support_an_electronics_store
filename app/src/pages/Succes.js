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

            sessionStorage.removeItem('basketId');
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
                }}
            >
                <Container maxWidth="sm" style={{ textAlign: "center" }}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        p={3}
                        boxShadow={3}
                        borderRadius={8}
                        backgroundColor={"white"}
                    >
                        <CheckCircleIcon style={{ fontSize: 80, color: "green" }} />
                        <Typography variant="h4" gutterBottom>
                            Płatność przebiegła pomyślnie!
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Dziękujemy za dokonanie płatności. Twoja transakcja została
                            pomyślnie zakończona.
                        </Typography>
                        <Button variant="contained" color="primary" href="/">
                            Powrót do strony głównej
                        </Button>
                    </Box>
                </Container>
            </Box>
            <Footer />
        </>
    );
};

export default PaymentSuccess;
