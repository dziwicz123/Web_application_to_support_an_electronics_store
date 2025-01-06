import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Paper, Typography, Divider, Pagination, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const UserComments = () => {
    const [comments, setComments] = useState([]);

    // Stan do paginacji
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 3; // np. 3 komentarze na stronę (zmień wg potrzeb)

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            console.error("No token found, user is not logged in.");
            return;
        }
        try {
            const decoded = jwtDecode(token);
            const email = decoded.sub;
            const fetchComments = async () => {
                try {
                    const response = await axios.get(
                        `http://localhost:8081/api/comments/user/${email}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
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

    // Wyliczamy indeksy początkowy i końcowy w zależności od aktualnej strony
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

    // Ilość stron = zaokrąglony w górę iloraz (liczba wszystkich komentarzy / komentarze na stronę)
    const totalPages = Math.ceil(comments.length / commentsPerPage);

    // Handler zmiany strony
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Twoje Komentarze
            </Typography>

            {/* Renderujemy tylko komentarze z aktualnej strony */}
            {currentComments.length > 0 ? (
                currentComments.map((comment) => (
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
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Box mr={2} flex="1">
                                <Typography variant="body1" gutterBottom>
                                    <strong>Produkt:</strong>{' '}
                                    <Link
                                        to={`/product/${comment.productId}`}
                                        style={{
                                            textDecoration: 'none',
                                            color: 'black'
                                        }}
                                    >
                                        {comment.productName}
                                    </Link>
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Ocena:</strong> {comment.rating}/5
                                </Typography>
                                <Typography variant="body2">
                                    {comment.description}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    width: 80,
                                    height: 80
                                }}
                            >
                                {comment.productImage && (
                                    <img
                                        src={comment.productImage}
                                        alt={`Zdjęcie produktu: ${comment.productName}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                )}
                            </Box>
                        </Box>
                        <Divider style={{ margin: '8px 0' }} />
                    </Paper>
                ))
            ) : (
                <Typography>Brak komentarzy do wyświetlenia.</Typography>
            )}

            {/* Komponent paginacji */}
            {comments.length > 0 && (
                <Stack spacing={2} sx={{ mt: 2 }} alignItems="center">
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Stack>
            )}
        </Box>
    );
};

export default UserComments;
