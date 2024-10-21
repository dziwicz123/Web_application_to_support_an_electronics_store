import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'Laptopy, tablety i GSM w promocji',
    imgPath: 'https://cdn.evergage.com/promotions/xkomspzoo/xkom/iiS3C/vq4IG.jpg',
    description: '6/128GB Midnight Black - najlepsza cena'
  },
  {
    label: 'Poznaj G4M3R Elite',
    imgPath: 'https://cdn.x-kom.pl/i/img/banners/1442x316,,36782f11ff0b4bc3ab50bea4b4407f85.jpg?filters=trim',
    description: '6/128GB Midnight Black - najlepsza cena'
  },
  {
    label: 'Letnia oferta Xiaomi',
    imgPath: 'https://cdn.x-kom.pl/i/img/banners/1140x250,,9257735184e84b2f8806c5c467456cef.jpg?filters=trim',
    description: '6/128GB Midnight Black - najlepsza cena'
  },
  {
    label: 'Laptop dla nauczyciela',
    imgPath: 'https://cdn.x-kom.pl/i/img/banners/1442x316,,04dcb2b700df42d5aec3342390698d89.jpg?filters=trim',
    description: '6/128GB Midnight Black - najlepsza cena'
  },
  {
    label: 'Urządzenia peryferyjne taniej do 31%',
    imgPath: 'https://cdn.x-kom.pl/i/img/banners/1442x316,,bb8ab9eb1a654dd7877e39a1ade07e23.jpg?filters=trim',
    description: '6/128GB Midnight Black - najlepsza cena'
  },
  {
    label: 'Premiera iPad Pro M4',
    imgPath: 'https://cdn.x-kom.pl/i/img/banners/1442x316,,02c51335b248482f86a1772023dc2e68.jpg?filters=trim',
    description: '256GB Wi-Fi Gwiezdna Szarość'
  },
  {
    label: 'Dell cashback',
    imgPath: 'https://cdn.x-kom.pl/i/img/banners/1442x316,,1475a9d9371b4411831193667915dad4.jpg?filters=trim',
    description: '27CG552EUX'
  }
];

function Slider() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep(prevActiveStep => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => (prevActiveStep - 1 + maxSteps) % maxSteps);
  };

  const handleStepChange = step => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', mx: 'auto', boxShadow: 4, borderRadius: '25px' }}>
      <Button
        onClick={handleBack}
        sx={{
          position: 'absolute',
          left: '-24px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
          backgroundColor: 'white',
          borderRadius: '8px',
          minWidth: '48px',
          height: '48px',
          color: 'black',
          boxShadow: 2,
          '&:hover': {
            backgroundColor: '#f0f0f0'
          }
        }}
      >
        <KeyboardArrowLeft />
      </Button>

      <Box sx={{ overflow: 'hidden', borderRadius: '25px' }}>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {images.map((step, index) => (
            <Box key={step.label} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img
                src={step.imgPath}
                alt={step.label}
                style={{ width: '100%', display: 'block' }}
              />
            </Box>
          ))}
        </AutoPlaySwipeableViews>
      </Box>

      <Button
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: '-24px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
          backgroundColor: 'white',
          borderRadius: '8px',
          minWidth: '48px',
          height: '48px',
          color: 'black',
          boxShadow: 2,
          '&:hover': {
            backgroundColor: '#f0f0f0'
          }
        }}
      >
        <KeyboardArrowRight />
      </Button>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        {images.map((step, index) => (
          <Button
            key={step.label}
            onClick={() => handleStepChange(index)}
            sx={{
              mx: 1,
              color: activeStep === index ? 'black' : 'grey.700',
              fontWeight: activeStep === index ? 'bold' : 'normal',
              borderTop: activeStep === index ? '3px solid black' : 'none'
            }}
          >
            {step.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
}

export default Slider;
