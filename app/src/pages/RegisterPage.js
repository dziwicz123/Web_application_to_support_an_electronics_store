import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Container, Row, Col, Card } from "react-bootstrap";
import Button from "@mui/material/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/RegisterPage.css";
import AppNavbar from "../components/Navbar";
import AppFooter from "../components/Footer";

function RegisterPage() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      try {
        const response = await fetch("http://localhost:8081/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const userData = await response.json();
          console.log("User registered successfully:", userData);

          // Perform login after registration
          const loginResponse = await fetch("http://localhost:8081/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
            }),
          });

          if (loginResponse.ok) {
            const loginData = await loginResponse.json();
            console.log("Login response:", loginData);

            // Sprawdzamy, czy mamy token
            if (loginData.status && loginData.token) {
              // Zapisujemy token
              sessionStorage.setItem("token", loginData.token);

              // Jeżeli wciąż jest basketId, zapisujemy koszyk
              if (loginData.basketId) {
                sessionStorage.setItem("basketId", loginData.basketId);
              }

              // Przekierowujemy na stronę główną lub do /admin
              if (loginData.token.userType === "ADMIN") {
                navigate("/admin");
              } else {
                navigate("/");
              }
            } else {
              console.error("Failed to log in:", loginData.message);
            }
          } else {
            console.error("Failed to log in:", loginResponse.statusText);
          }
        } else {
          console.error("Failed to register user:", response.statusText);
        }
      } catch (error) {
        console.error("Error registering user:", error);
      }
      setValidated(true);
    }
    setValidated(true);
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
      <>
        <AppNavbar />
        <Container fluid>
          <Row className="justify-content-center align-items-center h-100">
            <Col xs={12}>
              <Card
                  className="my-5 mx-auto"
                  style={{
                    backgroundColor: "#EADBC8", // Light background color
                    borderRadius: "1rem",
                    maxWidth: "900px"
                  }}
              >
                <Card.Body className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                  <h2 className="fw-bold mb-2 text-uppercase" style={{ color: "#102C57" }}>Zarejestruj się</h2>
                  <p className="mb-3" style={{ color: "#576b89" }}>
                    Podaj swoje dane aby stworzyć konto.
                  </p>
                  <Form
                      noValidate
                      validated={validated}
                      onSubmit={handleSubmit}
                      className="w-100"
                  >
                    <Row className="mb-3">
                      <Form.Group as={Col} md="6" controlId="formFirstName">
                        <Form.Label style={{ color: "#102C57" }}>Imię</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Imię"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            size="lg"
                        />
                        <Form.Control.Feedback type="invalid">
                          Imię jest wymagane
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} md="6" controlId="formLastName">
                        <Form.Label style={{ color: "#102C57" }}>Nazwisko</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nazwisko"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            size="lg"
                        />
                        <Form.Control.Feedback type="invalid">
                          Nazwisko jest wymagane
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group as={Col} md="6" controlId="formEmail">
                        <Form.Label style={{ color: "#102C57" }}>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            size="lg"
                        />
                        <Form.Control.Feedback type="invalid">
                          Podaj prawidłowy adres email
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} md="6" controlId="formPhone">
                        <Form.Label style={{ color: "#102C57" }}>Numer Telefonu</Form.Label>
                        <Form.Control
                            type="tel"
                            placeholder="Numer Telefonu"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            pattern="^\d{9}$"
                            size="lg"
                        />
                        <Form.Control.Feedback type="invalid">
                          Numer telefonu musi mieć 9 cyfr
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group as={Col} md="6" controlId="formPassword">
                        <Form.Label style={{ color: "#102C57" }}>Hasło</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Hasło"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            size="lg"
                        />
                        <Form.Control.Feedback type="invalid">
                          Hasło jest wymagane
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} md="6" controlId="formConfirmPassword">
                        <Form.Label style={{ color: "#102C57" }}>Potwierdź hasło</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Potwierdź hasło"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            pattern={formData.password}
                            size="lg"
                        />
                        <Form.Control.Feedback type="invalid">
                          Hasła muszą być takie same
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="d-grid gap-2 col-6 mx-auto" style={{ marginTop: "2rem" }}>
                      <Button
                          type="submit"
                          sx={{
                            backgroundColor: "#102C57",
                            color: "#FEFAF6",
                            borderRadius: "4px",
                            fontSize: "1rem",
                            '&:hover': {
                              backgroundColor: "#0F044C",
                            },
                          }}
                      >
                        Zarejestruj się
                      </Button>
                    </Row>
                  </Form>
                  <div className="text-center pt-3">
                    <p className="mb-0">
                      Masz już konto{" "}
                      <a href="/login" style={{ color: "#102C57" }} className="fw-bold">
                        Zaloguj się
                      </a>
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <AppFooter />
      </>
  );
}

export default RegisterPage;
