import React from "react";
import AppNavbar from "../components/Navbar";
import AppFooter from "../components/Footer";
import { Container } from "@mui/material";

const Terms = () => {
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
        <h1>Regulamin</h1>
        <h2>1. Postanowienia ogólne</h2>
        <p>
          Niniejszy regulamin określa zasady korzystania ze sklepu internetowego
          TECHPOL.
        </p>

        <h2>2. Definicje</h2>
        <p>
          <strong>Sprzedawca</strong> - TECHPOL, z siedzibą w Łodzi,
          <br />
          <strong>Klient</strong> - osoba fizyczna, prawna lub jednostka
          organizacyjna nieposiadająca osobowości prawnej, która dokonuje
          zamówienia w Sklepie.
          <br />
          <strong>Sklep</strong> - serwis internetowy,
           za pośrednictwem którego Klient może składać zamówienia.
        </p>

        <h2>3. Zasady korzystania ze sklepu</h2>
        <p>
          3.1. Klient może korzystać ze Sklepu zgodnie z jego przeznaczeniem.
          <br />
          3.2. Klient zobowiązany jest do korzystania ze Sklepu w sposób zgodny
          z prawem oraz niniejszym regulaminem.
        </p>

        <h2>4. Składanie zamówień</h2>
        <p>
          4.1. Klient może składać zamówienia 24 godziny na dobę, 7 dni w
          tygodniu.
          <br />
          4.2. Zamówienia są realizowane w dni robocze.
          <br />
          4.3. W celu złożenia zamówienia, Klient powinien dodać wybrane
          produkty do koszyka, a następnie wypełnić formularz zamówienia.
        </p>

        <h2>5. Płatności</h2>
        <p>
          5.1. Klient może dokonać płatności za zamówienie za pomocą dostępnych
          w Sklepie metod płatności.
          <br />
          5.2. Szczegółowe informacje na temat dostępnych metod płatności
          znajdują się na stronie Sklepu.
        </p>

        <h2>6. Dostawa</h2>
        <p>
          6.1. Dostawa zamówionych produktów odbywa się na terenie Polski.
          <br />
          6.2. Koszty dostawy są podane na stronie Sklepu i są zależne od
          wybranej metody dostawy.
        </p>

        <h2>7. Prawo odstąpienia od umowy</h2>
        <p>
          7.1. Klient ma prawo odstąpić od umowy w terminie 14 dni od dnia
          otrzymania zamówienia.
          <br />
          7.2. Aby skorzystać z prawa odstąpienia od umowy, Klient powinien
          złożyć oświadczenie o odstąpieniu od umowy w formie pisemnej lub za
          pomocą formularza dostępnego na stronie Sklepu.
        </p>

        <h2>8. Reklamacje</h2>
        <p>
          8.1. Klient ma prawo do złożenia reklamacji w przypadku stwierdzenia
          wad fizycznych zamówionych produktów.
          <br />
          8.2. Reklamacje należy składać w formie pisemnej na adres Sprzedawcy
          lub za pomocą formularza dostępnego na stronie Sklepu.
        </p>

        <h2>9. Postanowienia końcowe</h2>
        <p>
          9.1. W sprawach nieuregulowanych niniejszym regulaminem mają
          zastosowanie przepisy prawa polskiego.
          <br />
        </p>
      </Container>
      <AppFooter />
    </>
  );
};

export default Terms;
