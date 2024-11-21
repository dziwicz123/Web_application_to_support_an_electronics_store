import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/LoginPage.css";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import Button from "@mui/material/Button";
import AppNavbar from "../components/Navbar";
import AppFooter from "../components/Footer";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:8081/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const res = await response.json();

      if (response.ok && res.status && res.user) {
        sessionStorage.setItem("user", JSON.stringify(res.user));

        // Save basket ID
        if (res.basketId) {
          sessionStorage.setItem("basketId", res.basketId);
        }

        // Redirect based on user type
        if (res.user.userType === "ADMIN") {
          navigate("/admin");
        } else {
          const redirectTo = location.state?.from || "/"; // Redirect to the intended page or home
          navigate(redirectTo);
        }
      } else if (response.status === 403) {
        // Handle banned account
        setErrorMessage(res.message || "Your account is banned. Please contact support.");
      } else {
        // Handle other errors
        setErrorMessage(res.message || "Failed to log in. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("An error occurred while trying to log in. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
                    maxWidth: "400px"
                  }}
              >
                <Card.Body className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                  <h2 className="fw-bold mb-2" style={{ color: "#102C57" }}>Zaloguj się</h2>
                  <p className="mb-5" style={{ color: "#576b89" }}>Podaj swój login i hasło!</p>

                  {errorMessage && <p className="text-danger">{errorMessage}</p>}

                  <Form onSubmit={handleSubmit} className="w-100">
                    <Form.Group className="mb-4" controlId="formEmail">
                      <Form.Label
                          className={`label-visible`}
                          style={{ color: "#102C57" }}
                      >
                        Email
                      </Form.Label>
                      <Form.Control
                          type="email"
                          placeholder="Email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          size="lg"
                          className="mdb-input"
                      />
                      <Form.Control.Feedback type="invalid">
                        Podaj prawidłowy adres email.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formPassword">
                      <Form.Label
                          className={`label-visible`}
                          style={{ color: "#102C57" }}
                      >
                        Hasło
                      </Form.Label>
                      <Form.Control
                          type="password"
                          placeholder="Hasło"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          size="lg"
                          className="mdb-input"
                      />
                      <Form.Control.Feedback type="invalid">
                        Hasło jest wymagane.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <div className="d-grid gap-2 col-6 mx-auto">
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
                          disabled={isLoading}
                      >
                        {isLoading ? "Logging in..." : "Zaloguj się"}
                      </Button>
                    </div>
                  </Form>
                  <div style={{ textAlign: "center", marginTop: "1rem" }}>
                    <p className="mb-0">
                      Nie masz konta{" "}
                      <Link to="/register" style={{ color: "#102C57" }}>
                        Zarejestruj się
                      </Link>
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

export default LoginPage;
