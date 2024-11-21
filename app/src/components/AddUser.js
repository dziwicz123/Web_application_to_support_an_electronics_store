import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  Alert,
  Card,
} from '@mui/material';
import '../styles/LoginPage.css';
import axios from 'axios';

function AddUser() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/api/register', {
        name: firstName,
        lastName: lastName,
        email: email,
        phone: phoneNumber,
        password: password,
      });

      if (response.status === 200) {
        setSuccess('User added successfully');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
        setPassword('');
        setConfirmPassword('');
        setError(null);
      }
    } catch (error) {
      setError('Error adding user: ' + (error.response?.data?.message || error.message));
      setSuccess(null);
    }
  };

  const inputStyle = {
    backgroundColor: '#FEFAF6',
    borderRadius: '12px', // Adjust this value to match the border radius of the Card
    overflow: 'hidden', // Prevent content from exceeding rounded borders
  };

  return (
      <Container className="login-container" maxWidth="sm">
        <Card
            style={{
              backgroundColor: '#EADBC8',
              borderRadius: '12px', // Match with TextField styles
              maxWidth: '500px',
              padding: '2rem',
            }}
        >
          <Typography
              variant="h4"
              gutterBottom
              style={{ textAlign: 'center', color: '#102C57' }}
          >
            Dodaj użytkownika
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                    label="Imię"
                    fullWidth
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    InputLabelProps={{
                      style: { color: '#102C57' },
                    }}
                    InputProps={{
                      style: inputStyle,
                    }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    label="Nazwisko"
                    fullWidth
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    InputLabelProps={{
                      style: { color: '#102C57' },
                    }}
                    InputProps={{
                      style: inputStyle,
                    }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    label="Email"
                    fullWidth
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputLabelProps={{
                      style: { color: '#102C57' },
                    }}
                    InputProps={{
                      style: inputStyle,
                    }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    label="Numer telefonu"
                    fullWidth
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    InputLabelProps={{
                      style: { color: '#102C57' },
                    }}
                    InputProps={{
                      style: inputStyle,
                    }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    label="Hasło"
                    fullWidth
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputLabelProps={{
                      style: { color: '#102C57' },
                    }}
                    InputProps={{
                      style: inputStyle,
                    }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    label="Potwierdź hasło"
                    fullWidth
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    InputLabelProps={{
                      style: { color: '#102C57' },
                    }}
                    InputProps={{
                      style: inputStyle,
                    }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    style={{
                      backgroundColor: '#102C57',
                      color: '#FEFAF6',
                      borderRadius: '12px', // Same as other components
                      fontSize: '1rem',
                      height: '3rem',
                    }}
                >
                  Dodaj użytkownika
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Container>
  );
}

export default AddUser;
