import React, { useState, useEffect } from "react";
import { Container, CssBaseline, Typography, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import OrderSection from "../components/OrderSection";
import AppNavbar from "../components/Navbar";
import Footer from "../components/Footer";

const Profile = () => {
  const [activeSection, setActiveSection] = useState("orders");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userJson = sessionStorage.getItem("user");
    if (userJson) {
      setUser(JSON.parse(userJson));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("user");

    sessionStorage.removeItem("basket");
    navigate("/");
  };

  const renderSection = () => {
    switch (activeSection) {
      case "orders":
        return <OrderSection />;
      default:
        return <OrderSection />;
    }
  };

  if (!user) {
    return null; // or a loading indicator
  }

  return (
      <>
        <AppNavbar />
      <CssBaseline />
      <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "row", mt: 4, mb: 4 }}>
        <Box sx={{ width: "240px", mr: 4 }}>
          <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} onLogout={handleLogout} />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Paper elevation={3} sx={{ padding: 3, backgroundColor: "#F5F5F5" }}>
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
