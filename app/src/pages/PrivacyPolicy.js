// src/pages/PrivacyPolicy.jsx
import React from "react";
import AppNavbar from "../components/Navbar";
import AppFooter from "../components/Footer";
import { Container } from "@mui/material";

const PrivacyPolicy = () => {
    return (
        <>
            <AppNavbar />
            <Container
                sx={{
                    py: 3,
                    marginTop: 3,
                    marginBottom: 3,
                    borderRadius: 7,
                    backgroundColor: "white",
                }}
            >
                <h1>Polityka prywatności</h1>
                <h2>1. Informacje ogólne</h2>
                <p>
                    Niniejsza Polityka prywatności określa zasady przetwarzania i
                    ochrony danych osobowych przekazanych przez Użytkowników w
                    związku z korzystaniem z usług TECHPOL.
                </p>

                <h2>2. Administrator danych</h2>
                <p>
                    Administratorem danych osobowych jest TECHPOL, z siedzibą w Łodzi.
                </p>

                <h2>3. Zakres zbieranych danych</h2>
                <p>
                    Podczas składania zamówień zbieramy m.in. dane niezbędne
                    do realizacji umowy, takie jak imię, nazwisko, adres,
                    adres e-mail, numer telefonu itp.
                </p>

                <h2>4. Cel przetwarzania danych</h2>
                <p>
                    Dane osobowe przetwarzane są w celu realizacji zamówień,
                    obsługi transakcji płatniczych, kontaktu z Użytkownikiem,
                    a także w celach marketingowych (jeśli Użytkownik wyrazi na to zgodę).
                </p>

                <h2>5. Uprawnienia Użytkownika</h2>
                <p>
                    Użytkownik ma prawo dostępu do swoich danych, możliwość
                    ich sprostowania, usunięcia lub ograniczenia przetwarzania,
                    a także prawo do przenoszenia danych.
                </p>
            </Container>
            <AppFooter />
        </>
    );
};

export default PrivacyPolicy;
