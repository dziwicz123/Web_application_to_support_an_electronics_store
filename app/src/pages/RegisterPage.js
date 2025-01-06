import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Container, Row, Col, Card } from "react-bootstrap";
import Button from "@mui/material/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/RegisterPage.css";
import AppNavbar from "../components/Navbar";
import AppFooter from "../components/Footer";

// Importujemy Zod
import { z } from "zod";

// Zmieniony schemat walidacyjny (tylko @ w emailu)
const registerSchema = z
    .object({
      name: z.string().min(1, { message: "Imię jest wymagane" }),
      lastName: z.string().min(1, { message: "Nazwisko jest wymagane" }),
      // Zamiast "z.string().email()" używamy:
      email: z.string().includes("@", { message: "Adres email musi zawierać @" }),
      phone: z
          .string()
          .regex(/^\d{9}$/, { message: "Numer telefonu musi mieć 9 cyfr" }),
      password: z.string().min(1, { message: "Hasło jest wymagane" }),
      confirmPassword: z.string().min(1, { message: "Hasło jest wymagane" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Hasła muszą być takie same",
    });

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Stan przechowujący błędy z walidacji Zod
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});

    try {
      // Walidacja danych z formularza
      registerSchema.parse(formData);

      // Logika wysyłania danych do backendu
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

        // Po poprawnej rejestracji – logowanie
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

          if (loginData.status && loginData.token) {
            sessionStorage.setItem("token", loginData.token);

            if (loginData.basketId) {
              sessionStorage.setItem("basketId", loginData.basketId);
            }

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
      // Obsługa błędów walidacji (ZodError)
      if (error.errors) {
        const zodErrors = {};
        error.errors.forEach((err) => {
          zodErrors[err.path[0]] = err.message;
        });
        setErrors(zodErrors);
      } else {
        console.error("Error registering user:", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
                    backgroundColor: "#EADBC8",
                    borderRadius: "1rem",
                    maxWidth: "900px",
                  }}
              >
                <Card.Body className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                  <h2
                      className="fw-bold mb-2 text-uppercase"
                      style={{ color: "#102C57" }}
                  >
                    Zarejestruj się
                  </h2>
                  <p className="mb-3" style={{ color: "#576b89" }}>
                    Podaj swoje dane, aby stworzyć konto.
                  </p>

                  <Form noValidate onSubmit={handleSubmit} className="w-100">
                    <Row className="mb-3">
                      <Form.Group as={Col} md="6" controlId="formFirstName">
                        <Form.Label style={{ color: "#102C57" }}>
                          Imię
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Imię"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            size="lg"
                            isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group as={Col} md="6" controlId="formLastName">
                        <Form.Label style={{ color: "#102C57" }}>
                          Nazwisko
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nazwisko"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            size="lg"
                            isInvalid={!!errors.lastName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.lastName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                      <Form.Group as={Col} md="6" controlId="formEmail">
                        <Form.Label style={{ color: "#102C57" }}>Email</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            size="lg"
                            isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group as={Col} md="6" controlId="formPhone">
                        <Form.Label style={{ color: "#102C57" }}>
                          Numer Telefonu
                        </Form.Label>
                        <Form.Control
                            type="tel"
                            placeholder="Numer Telefonu"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            size="lg"
                            isInvalid={!!errors.phone}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.phone}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                      <Form.Group as={Col} md="6" controlId="formPassword">
                        <Form.Label style={{ color: "#102C57" }}>
                          Hasło
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Hasło"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            size="lg"
                            isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group as={Col} md="6" controlId="formConfirmPassword">
                        <Form.Label style={{ color: "#102C57" }}>
                          Potwierdź hasło
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Potwierdź hasło"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            size="lg"
                            isInvalid={!!errors.confirmPassword}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.confirmPassword}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>

                    <Row
                        className="d-grid gap-2 col-6 mx-auto"
                        style={{ marginTop: "2rem" }}
                    >
                      <Button
                          type="submit"
                          sx={{
                            backgroundColor: "#102C57",
                            color: "#FEFAF6",
                            borderRadius: "4px",
                            fontSize: "1rem",
                            "&:hover": {
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
                      <a
                          href="/login"
                          style={{ color: "#102C57" }}
                          className="fw-bold"
                      >
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
