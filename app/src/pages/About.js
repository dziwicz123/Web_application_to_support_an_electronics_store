import React from "react";
import AppNavbar from "../components/Navbar";
import AppFooter from "../components/Footer";
import { Container } from "@mui/material";

const About = () => {
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
                <h1>O nas</h1>
                <p>
                    Witaj w <strong>TECHPOL</strong>! Jesteśmy sklepem internetowym
                    specjalizującym się w najnowszej elektronice oraz innowacyjnych akcesoriach.
                </p>
                <p>
                    Nasz zespół składa się z pasjonatów nowych technologii, którzy
                    każdego dnia starają się dostarczyć produkty najwyższej jakości
                    w najlepszych cenach. Działamy na rynku od wielu lat, zapewniając
                    obsługę klienta na najwyższym poziomie.
                </p>
                <p>
                    Serdecznie zapraszamy do zapoznania się z naszą ofertą i skorzystania
                    z usług TECHPOL!
                </p>
            </Container>
            <AppFooter />
        </>
    );
};

export default About;
