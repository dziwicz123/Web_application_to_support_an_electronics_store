import React from "react";
import { Container, Box } from "@mui/material";
import AppNavbar from "../components/Navbar";
import AppFooter from "../components/Footer";
import ImageSlider from "../components/Slider";
import PromotedProducts from "../components/PromotedProducts";
import PromotionalProducts from "../components/PromotionalProducts";

function HomePage() {
    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                <AppNavbar />

                <ImageSlider />

                <Container
                    maxWidth="lg"
                    sx={{
                        py: 3,
                        marginTop: 3,
                        marginBottom: 3,
                        borderRadius: 7,
                        backgroundColor: "#f8f4ee",
                    }}
                >
                    <PromotedProducts />
                </Container>

                <Container
                    maxWidth="lg"
                    sx={{
                        py: 3,
                        marginTop: 3,
                        marginBottom: 3,
                        borderRadius: 7,
                        backgroundColor: "#f8f4ee",
                    }}
                >
                    <PromotionalProducts />
                </Container>

                {/*<CookiesPopup />*/}

                <AppFooter />
            </Box>
        </>
    );
}

export default HomePage;
