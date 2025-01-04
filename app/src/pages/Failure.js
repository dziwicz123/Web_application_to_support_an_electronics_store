import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import AppNavbar from "../components/Navbar";
import Footer from "../components/Footer";

const PaymentFailure = () => {
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
                        <ErrorIcon
                            sx={{
                                fontSize: 80,
                                color: "red",
                                mb: 2,
                            }}
                        />
                        <Typography
                            variant="h4"
                            gutterBottom
                            sx={{ color: "#0F044C" }}
                        >
                            Płatność nie powiodła się!
                        </Typography>
                        <Typography
                            variant="body1"
                            gutterBottom
                            sx={{ color: "#102C57" }}
                        >
                            Przepraszamy, ale wystąpił problem z Twoją transakcją.
                            Prosimy spróbować ponownie.
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

export default PaymentFailure;
