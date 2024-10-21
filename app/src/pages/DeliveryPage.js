import React from "react";
import DeliveryForm from "../components/DeliveryForm";
import AppNavbar from "../components/Navbar";
import AppFooter from "../components/Footer";
import { Container } from "@mui/system";
const Delivery = () => {
  return (
    <div>
      <AppNavbar />
      <Container>
        <DeliveryForm />
      </Container>
      <AppFooter />
    </div>
  );
};

export default Delivery;
