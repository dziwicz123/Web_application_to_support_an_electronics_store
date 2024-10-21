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
            <ErrorIcon style={{ fontSize: 80, color: "red" }} />
            <Typography variant="h4" gutterBottom>
              Płatność nie powiodła się!
            </Typography>
            <Typography variant="body1" gutterBottom>
              Przepraszamy, ale wystąpił problem z Twoją transakcją. Prosimy spróbować ponownie.
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

export default PaymentFailure;
