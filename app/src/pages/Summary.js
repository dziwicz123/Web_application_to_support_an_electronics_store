import React from "react";
import OrderSummary from "../components/OrderSummary";
import AppNavbar from "../components/Navbar";
import AppFooter from "../components/Footer";
const orderData = {
  products: [
    { name: "Product 1", price: 100 },
    { name: "Product 2", price: 200 },
  ],
  totalPrice: 300,
  address: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123456789",
    address: "123 Main St, Apt 4B",
    city: "Warsaw",
    postalCode: "00-001",
  },
};

const OrderSummaryPage = () => {
  return (
    <>
      <AppNavbar />
      <OrderSummary
        products={orderData.products}
        totalPrice={orderData.totalPrice}
        address={orderData.address}
      />
      <AppFooter />
    </>
  );
};

export default OrderSummaryPage;
