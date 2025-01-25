import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Paper, Typography, Divider, Pagination, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const UserComments = () => {
    const [comments, setComments] = useState([]);

    // Stan do paginacji
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 3; // np. 3 komentarze na stronę

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            console.error("No token found, user is not logged in.");
            return;
        }
        try {
            const decoded = jwtDecode(token); // Import domyślny: import jwtDecode from 'jwt-decode';
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

    // Wyliczamy indeksy do paginacji
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

    // Obliczamy łączną liczbę stron (co najmniej 1)
    const totalPagesRaw = Math.ceil(comments.length / commentsPerPage);
    const totalPages = totalPagesRaw < 1 ? 1 : totalPagesRaw;

    // Obsługa zmiany strony
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Twoje Komentarze
            </Typography>

            {/* Renderujemy komentarze z aktualnej strony */}
            {currentComments.length > 0 ? (
                currentComments.map((comment) => (
                    // <Link> obejmuje cały <Paper>, co sprawia,
                    // że kliknięcie w dowolne miejsce komentarza
                    // przenosi do strony /product/{productId}
                    <Link
                        key={comment.id}
                        to={`/product/${comment.productId}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <Paper
                            elevation={3}
                            sx={{
                                mb: 2,
                                p: 2,
                                backgroundColor: '#FEFAF6',
                                borderLeft: '4px solid #102C57',
                                display: 'flex',         // <-- ułożenie w wierszu
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 2,
                            }}
                        >
                            {/* Sekcja ze zdjęciem produktu (lewa strona) */}
                            <Box
                                sx={{
                                    width: 80,
                                    height: 80,
                                    flexShrink: 0,         // nie pozwalamy się zmniejszać
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

                            {/* Sekcja z treścią komentarza (prawa strona) */}
                            <Box flex="1">
                                <Typography variant="body1" gutterBottom>
                                    <strong>Produkt:</strong> {comment.productName}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Ocena:</strong> {comment.rating}/5
                                </Typography>
                                <Typography variant="body2">
                                    {comment.description}
                                </Typography>
                                <Divider sx={{ mt: 1 }} />
                            </Box>
                        </Paper>
                    </Link>
                ))
            ) : (
                <Typography>Brak komentarzy do wyświetlenia.</Typography>
            )}

            {/* Komponent paginacji - zawsze widoczny */}
            <Stack spacing={2} sx={{ mt: 2 }} alignItems="center">
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Stack>
        </Box>
    );
};

export default UserComments;
