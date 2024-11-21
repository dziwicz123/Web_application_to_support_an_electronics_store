import React, { useState, useEffect } from "react";
import axios from "axios";
import { Paper, Typography, Box, Button } from "@mui/material";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/order/all', { withCredentials: true });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
      <>
        <Typography variant="h6">Historia zamówień</Typography>
        {orders.map((order) => (
            <Paper key={order.id} style={{ padding: "16px", marginBottom: "16px" }}>
              <Box mt={2}>
                <Box mb={2} borderBottom="1px solid #ddd" pb={1}>
                  <Typography>
                    <strong>Order #:</strong> {order.id}
                  </Typography>
                  <Typography>
                    <strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
                  </Typography>
                  <Typography>
                    <strong>Status:</strong> {order.state}
                  </Typography>
                  <Typography>
                    <strong>Total:</strong> ${order.basket.totalPrice.toFixed(2)}
                  </Typography>
                  <Button
                      variant="contained"
                      style={{ marginTop: "16px", backgroundColor: "#3f51b5", color: "#fff" }}
                  >
                    View Details
                  </Button>
                </Box>
              </Box>
            </Paper>
        ))}
      </>
  );
};

export default UserOrders;
