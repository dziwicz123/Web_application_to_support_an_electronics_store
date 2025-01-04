import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Divider } from '@mui/material';
import { jwtDecode } from "jwt-decode";

const UserComments = () => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            console.error("No token found, user is not logged in.");
            return;
        }

        try {
            // 1. Dekoduj token, aby uzyskać email z pola `sub` (lub innego claimu)
            const decoded = jwtDecode(token);
            const email = decoded.sub;
            // Załóżmy, że w JwtUtil masz .withSubject(user.getEmail()) => sub = email

            // 2. Wywołanie endpointu, z nagłówkiem Authorization
            const fetchComments = async () => {
                try {
                    const response = await axios.get(
                        `http://localhost:8081/api/comments/user/${email}`,
                        {
                            headers: {
                                "Authorization": `Bearer ${token}`
                            }
                        }
                    );
                    setComments(response.data);
                } catch (error) {
                    console.error('Error fetching user comments:', error);
                }
            };

            fetchComments();
        } catch (error) {
            console.error("Error decoding JWT token:", error);
        }
    }, []);

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Twoje Komentarze
            </Typography>
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <Paper
                        key={comment.id}
                        elevation={3}
                        style={{
                            marginBottom: '16px',
                            padding: '16px',
                            backgroundColor: '#FEFAF6',
                            borderLeft: '4px solid #102C57',
                        }}
                    >
                        <Typography variant="body1" gutterBottom>
                            <strong>Ocena:</strong> {comment.rating}/5
                        </Typography>
                        <Typography variant="body2">{comment.description}</Typography>
                        <Divider style={{ margin: '8px 0' }} />
                    </Paper>
                ))
            ) : (
                <Typography>Brak komentarzy do wyświetlenia.</Typography>
            )}
        </Box>
    );
};

export default UserComments;
