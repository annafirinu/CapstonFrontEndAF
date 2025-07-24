import { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const isLoggedIn = !!localStorage.getItem("token");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axiosClient.post("/auth/login", credentials);
      localStorage.setItem("token", response.data);
      navigate("/backoffice");
    } catch (err) {
      setError("Credenziali non valide o errore nel login.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login-123");
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100 home-section "
    >
      <Card
        className="p-4 shadow login-container w-100 bg-card shadow border-0"
        style={{ maxWidth: 400 }}
      >
        <h2
          className="mb-3 fw-bold text-center title"
          style={{ color: "#3e2f1c" }}
        >
          Login Admin
        </h2>

        <Form className="text-center" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Control
              type="text"
              name="username"
              placeholder="Username"
              value={credentials.username}
              onChange={handleChange}
              required
              className="form-control-custom"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="form-control-custom"
            />
          </Form.Group>

          {error && <Alert variant="danger">{error}</Alert>}

          <Button type="submit" className="btn w-100" variant="outline-dark">
            Login
          </Button>
        </Form>

        {isLoggedIn && (
          <Button
            onClick={handleLogout}
            className="btn   mt-3"
            variant="outline-dark"
          >
            Logout
          </Button>
        )}
      </Card>
    </Container>
  );
};

export default Login;
