import React from "react";
import { Paper, Typography, Box, Button } from "@mui/material";

const UserInfo = () => (
  <>
    <Typography variant="h6" style={{ color: "#000" }}>
      Dane do zamówień
    </Typography>
    <Paper
      style={{ padding: "16px", marginBottom: "16px", backgroundColor: "#fff" }}
    >
      <Box mt={2} style={{ color: "#000" }}>
        <Typography variant="body1">
          <strong>Imię i nazwisko:</strong> Jan Kowalski
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> jan.kowalski@example.com
        </Typography>
        <Typography variant="body1">
          <strong>Adres:</strong> 123 Main St, Miasto, Kraj
        </Typography>
      </Box>
      <Button
        variant="contained"
        style={{ marginTop: "16px", backgroundColor: "#3f51b5", color: "#fff" }}
      >
        Edytuj dane
      </Button>
    </Paper>
  </>
);

export default UserInfo;
