import React from "react";
import AppNavbar from "../components/Navbar";
import AppFooter from "../components/Footer";
import { Container } from "@mui/material";

const CustomerService = () => {
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
                <h1>Obsługa klienta</h1>
                <h2>Kontakt</h2>
                <p>
                    Masz pytania, uwagi lub potrzebujesz pomocy w złożeniu zamówienia?
                    Skontaktuj się z nami:
                </p>
                <ul>
                    <li>Email: techpol@gmail.com</li>
                    <li>Telefon: +48 123 456 789</li>
                </ul>

                <h2>Reklamacje i zwroty</h2>
                <p>
                    Jeśli produkt okazał się wadliwy lub nie spełnia Twoich oczekiwań,
                    możesz złożyć reklamację lub dokonać zwrotu.
                    Szczegóły znajdziesz w naszym <strong>Regulaminie</strong>.
                </p>

                <h2>FAQs</h2>
                <p>
                    Zapoznaj się z najczęściej zadawanymi pytaniami, aby szybko
                    uzyskać odpowiedzi na podstawowe wątpliwości dotyczące zakupów
                    w TECHPOL.
                </p>
            </Container>
            <AppFooter />
        </>
    );
};

export default CustomerService;
