import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Container, CssBaseline, Typography, Box, Paper } from "@mui/material";
import UserSidebar from "../components/UserSidebar";
import OrderSection from "../components/OrderSection";
import UserComments from "../components/UserComments";
import AppNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Profile.css";

const Profile = () => {
    const [activeSection, setActiveSection] = useState("orders");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        try {
            // Dekodujemy token
            const decoded = jwtDecode(token);
            // Z backendu: .withSubject(user.getEmail()), .withClaim("userId", user.getId()), itd.
            const userData = {
                userId: decoded.userId,            // <- ważne, żebyś w backendzie dodał userId w tokenie
                name: decoded.name || "Nieznajomy",
                email: decoded.sub,               // zakładamy, że sub = email
                userType: decoded.userType || "USER",
            };
            setUser(userData);
        } catch (error) {
            console.error("Error decoding token:", error);
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("basketId");
        navigate("/");
    };

    const renderSection = () => {
        switch (activeSection) {
            case "orders":
                // Przekazujemy user (z userId) do OrderSection
                return <OrderSection user={user} />;
            case "comments":
                return <UserComments />;
            default:
                return <OrderSection user={user} />;
        }
    };

    if (!user) {
        return null; // lub spinner "loading..."
    }

    return (
        <>
            <AppNavbar />
            <CssBaseline />
            <Container
                maxWidth="lg"
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    mt: 4,
                    mb: 4,
                }}
            >
                <Box
                    sx={{
                        width: "240px",
                        mr: 4,
                    }}
                >
                    <UserSidebar
                        activeSection={activeSection}
                        setActiveSection={setActiveSection}
                        onLogout={handleLogout}
                    />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Paper
                        elevation={3}
                        sx={{
                            padding: 3,
                            backgroundColor: "#EADBC8",
                        }}
                    >
                        <Box mb={4}>
                            <Typography variant="h4" gutterBottom>
                                Cześć, {user.name}
                            </Typography>
                            {renderSection()}
                        </Box>
                    </Paper>
                </Box>
            </Container>
            <Footer />
        </>
    );
};

export default Profile;
