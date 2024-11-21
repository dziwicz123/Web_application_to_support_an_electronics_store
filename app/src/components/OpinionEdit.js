import React, { useState } from "react"; // Import useState
import { Button, TextField, Typography, Rating, Paper } from "@mui/material"; // Import komponentów MUI
import axios from "axios"; // Import axios

const OpinionEdit = ({ existingOpinion, productId, onOpinionUpdated }) => {
    // Zainicjalizuj wartości domyślne
    const [rating, setRating] = useState(existingOpinion ? existingOpinion.rating : 0);
    const [comment, setComment] = useState(existingOpinion ? existingOpinion.description : "");
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (!existingOpinion) {
        // Jeśli brak opinii, renderuj pusty fragment
        return null;
    }

    const handleUpdate = async () => {
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
            await axios.put(`http://localhost:8081/api/comments/${existingOpinion.id}`, {
                productId,
                userId: user.id,
                rating,
                description: comment,
            });

            alert("Opinia została zaktualizowana");
            onOpinionUpdated();
        } catch (error) {
            console.error("Error updating opinion:", error);
            alert("Nie udało się zaktualizować opinii");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6">Edytuj swoją opinię</Typography>
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
                onClick={handleUpdate}
                disabled={loading}
                sx={{ backgroundColor: "#1976d2", color: "#fff" }}
            >
                Edytuj
            </Button>
        </Paper>
    );
};

export default OpinionEdit;
