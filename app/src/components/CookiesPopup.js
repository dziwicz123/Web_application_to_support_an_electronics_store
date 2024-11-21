import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const CookiesPopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const isPopupShown = sessionStorage.getItem('cookiesPopupShown');
    if (!isPopupShown) {
      setOpen(true);
    }
  }, []);

  const handleAccept = () => {
    setOpen(false);
    sessionStorage.setItem('cookiesPopupShown', 'true');
  };

  const handleDecline = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleDecline}
      aria-labelledby="cookies-dialog-title"
      aria-describedby="cookies-dialog-description"
    >
      <DialogTitle
        id="cookies-dialog-title"
        style={{
          textAlign: 'center',
          fontSize: '1.5rem',
          backgroundColor: '#2c3e50',
          color: 'white',
          padding: '16px',
        }}
      >
        Polityka Cookies
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="cookies-dialog-description"
          style={{
            fontSize: '1rem',
            padding: '16px',
            textAlign: 'center',
          }}
        >
          Ta strona używa plików cookies, aby zapewnić najlepsze wrażenia na naszej stronie.
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center', padding: '8px 24px 24px' }}>
        <Button
          onClick={handleDecline}
          style={{
            color: '#f50057',
            borderColor: '#f50057',
            marginRight: '8px',
          }}
          variant="outlined"
        >
          Akceptuję tylko wymagane
        </Button>
        <Button
          onClick={handleAccept}
          style={{
            backgroundColor: '#3f51b5',
            color: 'white',
          }}
          variant="contained"
        >
          Akceptuję wszystkie
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CookiesPopup;
