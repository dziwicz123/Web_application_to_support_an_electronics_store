import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Divider } from '@mui/material';

const UserComments = () => {
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userJson = sessionStorage.getItem('user');
        const loggedUser = userJson ? JSON.parse(userJson) : null;
        setUser(loggedUser);

        if (loggedUser && loggedUser.email) {
            const fetchComments = async () => {
                try {
                    const response = await axios.get(`http://localhost:8081/api/comments/user/${loggedUser.email}`, {
                        withCredentials: true,
                    });
                    setComments(response.data);
                } catch (error) {
                    console.error('Error fetching user comments:', error);
                }
            };

            fetchComments();
        }
    }, []);

    if (!user) {
        return <Typography>Loading...</Typography>;
    }

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
