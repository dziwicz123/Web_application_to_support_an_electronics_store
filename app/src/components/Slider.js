import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import { Box, Typography, GlobalStyles } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const images = [
    {
        src: '/hand.jpeg',
        title: 'Nowoczesne Technologie w Twoich Rękach',
    },
    {
        src: '/home.jpeg',
        title: 'Smart Home: Wygoda i Nowoczesność',
    },
    {
        src: '/desk.jpeg',
        title: 'Laptop i Akcesoria do Twojego Biura',
    },
];

const ImageSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    };

    const handleTitleClick = (index) => {
        sliderRef.current.slickGoTo(index);
    };

    return (
        <>
            {/* Globalne style dla strzałek */}
            <GlobalStyles
                styles={{
                    '.slick-prev:before, .slick-next:before': {
                        fontSize: '40px',
                        color: '#f8f4ee',
                    },
                    '.slick-prev, .slick-next': {
                        width: '50px',
                        height: '50px',
                    },
                    '.slick-prev': {
                        left: '-60px', // Przesunięcie strzałki w lewo poza slajder
                        zIndex: 1,
                    },
                    '.slick-next': {
                        right: '-60px', // Przesunięcie strzałki w prawo poza slajder
                        zIndex: 1,
                    },
                }}
            />
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 3, lineHeight: 0 }}>
                <Box sx={{ width: '999px', position: 'relative', lineHeight: 0 }}>
                    <Slider ref={sliderRef} {...settings}>
                        {images.map((image, index) => (
                            <Box key={index} sx={{ padding: 0, margin: 0, lineHeight: 0 }}>
                                <img
                                    src={image.src}
                                    alt={image.title}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        maxHeight: '600px',
                                        objectFit: 'cover',
                                        padding: '0',
                                        margin: '0',
                                        display: 'block',
                                        borderTopLeftRadius: '20px',
                                        borderTopRightRadius: '20px',
                                    }}
                                />
                            </Box>
                        ))}
                    </Slider>
                    {/* Tytuły pod slajderem */}
                    <Box
                        sx={{
                            width: '999px',
                            backgroundColor: '#f8f4ee',
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            padding: '0',
                            margin: '0',
                            borderBottomLeftRadius: '20px',
                            borderBottomRightRadius: '20px',
                            boxSizing: 'border-box',
                            height: '100px',
                            mt: 0,
                        }}
                    >
                        {images.map((image, index) => (
                            <Box
                                key={index}
                                sx={{
                                    flex: 1,
                                    textAlign: 'center',
                                }}
                            >
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        display: 'inline-block',
                                        width: '333px',
                                        height: '100px',
                                        fontSize: '1.5rem',
                                        borderBottomLeftRadius: '20px',
                                        borderBottomRightRadius: '20px',
                                        backgroundColor: currentSlide === index ? '#DFDBD6' : 'transparent',
                                        color: '#102C57',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s, color 0.3s',
                                        '&:hover': {
                                            backgroundColor: '#DFDBD6',
                                            color: '#102C57',
                                        },
                                        margin: 0,
                                        padding: 0,
                                    }}
                                    onClick={() => handleTitleClick(index)}
                                >
                                    {image.title}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default ImageSlider;
