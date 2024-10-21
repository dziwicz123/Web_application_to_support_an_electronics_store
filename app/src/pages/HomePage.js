import React from "react";
import { Container, Box } from "@mui/material";
import AppNavbar from "../components/Navbar";
import AppFooter from "../components/Footer";
import ProductZone from "../components/ProductZone";
import Slider from "../components/Slider";
import CookiesPopup from "../components/CookiesPopup";

function HomePage() {
    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                <AppNavbar />
                <Container
                    maxWidth="lg"
                    sx={{
                        py: 3,
                        marginTop: 3,
                        marginBottom: 3,
                        borderRadius: 7,
                        backgroundColor: "white",
                    }}
                >
                    <Slider />
                    <ProductZone />
                    <CookiesPopup/>
                </Container>
                <AppFooter />
            </Box>
        </>
    );
}

export default HomePage;
