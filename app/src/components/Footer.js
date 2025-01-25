import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  return (
      <footer
          style={{
            backgroundColor: "#45526e",
            color: "white",
            textAlign: "center",
          }}
      >
        <Container className="p-4 pb-0">
          <Row>
            <Col md={3} lg={3} xl={3} className="mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">TECHPOL</h6>
              <p>
                Twoje miejsce na najwyższej jakości elektronikę i akcesoria.
                Oferujemy szeroki wybór produktów, aby zaspokoić wszystkie Twoje
                potrzeby technologiczne.
              </p>
            </Col>

            <Col md={3} lg={3} xl={3} className="mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Produkty</h6>
              {/* Linki do kategorii */}
              <Link
                  to="/category/1"
                  style={{ textDecoration: "none", color: "inherit" }}
              >
                <p>Laptopy i komputery</p>
              </Link>
              <Link
                  to="/category/2"
                  style={{ textDecoration: "none", color: "inherit" }}
              >
                <p>Smartfony</p>
              </Link>
              <Link
                  to="/category/3"
                  style={{ textDecoration: "none", color: "inherit" }}
              >
                <p>Monitory</p>
              </Link>
              <Link
                  to="/category/4"
                  style={{ textDecoration: "none", color: "inherit" }}
              >
                <p>Smartwatche</p>
              </Link>
            </Col>

            <Col md={3} lg={3} xl={3} className="mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Przydatne linki</h6>

              {/* O nas */}
              <Link to="/about" style={{ textDecoration: "none", color: "inherit" }}>
                <p>O nas</p>
              </Link>

              {/* Obsługa klienta */}
              <Link to="/customer-service" style={{ textDecoration: "none", color: "inherit" }}>
                <p>Obsługa klienta</p>
              </Link>

              {/* Regulamin */}
              <Link to="/terms" style={{ textDecoration: "none", color: "inherit" }}>
                <p>Regulamin</p>
              </Link>

              {/* Polityka prywatności */}
              <Link to="/privacy-policy" style={{ textDecoration: "none", color: "inherit" }}>
                <p>Polityka prywatności</p>
              </Link>
            </Col>


            <Col md={3} lg={3} xl={3} className="mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Kontakt</h6>
              <p>
                <HomeIcon /> Łódź, Polska
              </p>
              <p>
                <EmailIcon /> techpol@gmail.com
              </p>
              <p>
                <PhoneIcon /> +48 123 456 789
              </p>
            </Col>
          </Row>

          <hr className="my-3" />

          <Row className="d-flex align-items-center">
            <Col md={7} lg={8} className="text-center text-md-start">
              <div className="p-3">
                © {new Date().getFullYear()} Prawa autorskie: TECHPOL
              </div>
            </Col>
            <Col md={5} lg={4} className="text-center text-md-end">
              <Button variant="outline-light" className="btn-floating m-1">
                <FacebookIcon />
              </Button>
              <Button variant="outline-light" className="btn-floating m-1">
                <TwitterIcon />
              </Button>
              <Button variant="outline-light" className="btn-floating m-1">
                <GoogleIcon />
              </Button>
              <Button variant="outline-light" className="btn-floating m-1">
                <InstagramIcon />
              </Button>
            </Col>
          </Row>
        </Container>
      </footer>
  );
};

export default Footer;
