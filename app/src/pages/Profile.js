import React, { useState, useEffect } from "react";
import { Container, CssBaseline, Typography, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
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
      case "comments":
        return <UserComments />;
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
        <Container
            maxWidth="lg"
            sx={{
              display: "flex",
              flexDirection: "row",
              mt: 4,
              mb: 4
        }}>
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
                  backgroundColor: "#EADBC8"
            }}>
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
