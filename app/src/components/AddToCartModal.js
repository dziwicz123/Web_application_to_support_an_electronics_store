import React from "react";
import { Modal, Fade, Backdrop, Box, Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { keyframes } from "@mui/system";

const bounce = keyframes`
    0% { transform: scale(0.8); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
`;

const AddToCartModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 350,
            bgcolor: "background.paper",
            border: "1px solid #ddd",
            boxShadow: 24,
            p: 4,
            textAlign: "center",
            borderRadius: 2,
            background: "linear-gradient(135deg, #f5f5f5 0%, #fafafa 100%)",
          }}
        >
          <CheckCircleIcon
            sx={{
              color: "green",
              fontSize: 50,
              mb: 2,
              animation: `${bounce} 1s ease-in-out`,
            }}
          />
          <Typography
            variant="h6"
            component="h2"
            sx={{ mb: 3, color: "#333" }}
          >
            Dodano do koszyka!
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}
          >
            <Button
              variant="outlined"
              sx={{
                borderColor: "green",
                color: "green",
                "&:hover": {
                  backgroundColor: "green",
                  color: "white",
                  borderColor: "green",
                },
                flex: 1,
                padding: "10px 20px",
              }}
              onClick={handleClose}
            >
              Kontynuj zakupy
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "green",
                "&:hover": {
                  backgroundColor: "darkgreen",
                },
                flex: 1,
                padding: "10px 20px",
              }}
              onClick={() => {
                window.location.href = "/cart";
              }}
            >
              Przejdź do koszyka
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddToCartModal;
