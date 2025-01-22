import React, { useState } from "react";
import { Button, TextField, Typography, Rating, Paper } from "@mui/material";
import axios from "axios";

const Opinion = ({ productId, onOpinionAdded }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    const token = sessionStorage.getItem("token");

    const handleSubmit = async () => {
        if (rating < 1 || rating > 5) {
            alert("Ocena musi być w zakresie od 1 do 5");
            return;
        }
        if (!comment.trim()) {
            alert("Komentarz nie może być pusty");
            return;
        }

        setLoading(true);

        try {
            await axios.post(
                "http://localhost:8081/api/comments",
                {
                    productId,
                    rating,
                    description: comment,
                    // NIE WYSYŁAMY userId, bo bierzemy z tokena
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Opinia została dodana");
            onOpinionAdded();
        } catch (error) {
            console.error("Error submitting opinion:", error);
            alert("Nie udało się przesłać opinii");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6">Dodaj opinię</Typography>
            <Rating
                name="rating"
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
                sx={{ my: 2 }}
            />
            <TextField
                label="Twoja opinia"
                multiline
                fullWidth
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                sx={{ mb: 2 }}
            />
            <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
                sx={{ backgroundColor: "#1976d2", color: "#fff" }}
            >
                Dodaj
            </Button>
        </Paper>
    );
};

export default Opinion;
