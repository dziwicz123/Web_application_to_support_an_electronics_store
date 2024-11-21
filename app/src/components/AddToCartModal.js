import React from "react";
import { Modal, Fade, Backdrop, Box, Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { keyframes } from "@mui/system";

const bounce = keyframes`
  0% { transform: scale(0.8); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

const palette = {
    color1: "#FEFAF6", // Najjaśniejszy
    color2: "#EADBC8", // Jasny
    color3: "#DAC0A3", // Średni
    color4: "#102C57", // Ciemny
    color5: "#0F044C", // Ciemniejszy
};

const AddToCartModal = ({ open, handleClose }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
                sx: {
                    backgroundColor: "rgba(0,0,0,0.5)",
                },
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
                        bgcolor: palette.color1,
                        border: `1px solid ${palette.color3}`,
                        boxShadow: 24,
                        p: 4,
                        textAlign: "center",
                        borderRadius: 2,
                        fontFamily: 'Roboto, sans-serif', // Dodano czcionkę
                    }}
                >
                    <CheckCircleIcon
                        sx={{
                            color: palette.color4,
                            fontSize: 50,
                            mb: 2,
                            animation: `${bounce} 1s ease-in-out`,
                        }}
                    />
                    <Typography
                        variant="h6"
                        component="h2"
                        sx={{ mb: 3, color: palette.color4, fontFamily: 'Roboto, sans-serif' }} // Dodano czcionkę
                    >
                        Dodano do koszyka!
                    </Typography>
                    <Box
                        sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}
                    >
                        <Button
                            variant="outlined"
                            sx={{
                                borderColor: palette.color4,
                                color: palette.color4,
                                "&:hover": {
                                    backgroundColor: palette.color4,
                                    color: palette.color1,
                                    borderColor: palette.color4,
                                },
                                flex: 1,
                                padding: "10px 20px",
                                borderRadius: '20px', // Dodano zaokrąglone rogi
                                boxShadow: '0px 2px 5px rgba(0,0,0,0.2)', // Dodano cień
                                fontSize: '1rem', // Zwiększono rozmiar czcionki
                                fontFamily: 'Roboto, sans-serif', // Dodano czcionkę
                            }}
                            onClick={handleClose}
                        >
                            Kontynuuj zakupy
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: palette.color4,
                                color: palette.color1,
                                "&:hover": {
                                    backgroundColor: palette.color5,
                                },
                                flex: 1,
                                padding: "10px 20px",
                                borderRadius: '20px', // Dodano zaokrąglone rogi
                                boxShadow: '0px 2px 5px rgba(0,0,0,0.2)', // Dodano cień
                                fontSize: '1rem', // Zwiększono rozmiar czcionki
                                fontFamily: 'Roboto, sans-serif', // Dodano czcionkę
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
