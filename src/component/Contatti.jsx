import { useState, useEffect } from "react";

import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import axiosClient from "../api/axiosClient";

const Contatti = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    messaggio: "",
  });

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      await axiosClient.post("/messaggi", formData);
      setSuccess("Messaggio inviato con successo!");
      setFormData({ nome: "", email: "", messaggio: "" });
    } catch (err) {
      setError(
        err.response?.data?.message || "Errore nell'invio del messaggio."
      );
    }
  };

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [success, error]);

  return (
    <div className="home-section py-3">
      <Container>
        <div className="title d-flex align-items-center justify-content-center my-5">
          <h2 className="fw-bold text-center m-0">Contattaci</h2>
        </div>
        <Row className="gy-4 align-items-start">
          <Col lg={6} className="pe-lg-5 text-md-center text-sm-center">
            <p className="lead text-center home-description my-2">
              Siamo felici di poter essere al tuo fianco e ascoltare ogni tua
              esigenza. Se hai domande, dubbi o semplicemente vuoi soddisfare
              una curiosità, non esitare a contattarci.
            </p>
            <p className="lead text-center home-description my-3">
              Puoi inviarci un messaggio tramite il form accanto: è semplice,
              veloce e ti permette di raccontarci tutto ciò che desideri, in
              qualsiasi momento. Ci impegniamo a rispondere con attenzione e
              cortesia, perché ogni tuo messaggio è importante per noi.
            </p>
            <p className="lead text-center home-description my-3">
              I campi sono obbligatori. Ti assicuriamo che i tuoi dati saranno
              trattati con riservatezza.
            </p>
            <p className="lead text-center home-description my-3">
              Se preferisci un contatto più diretto, puoi chiamarci al nostro
              <a href="tel:+393425056307"> numero di telefono.</a>
            </p>
          </Col>

          <Col lg={6} className="ps-lg-5 pb-5 text-md-center text-sm-center">
            <Form
              onSubmit={handleSubmit}
              className="bg-card p-4 rounded-4 shadow"
            >
              <Form.Group className="mb-3" controlId="nome">
                <Form.Label className="d-block text-start">Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Inserisci il tuo nome"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label className="d-block text-start">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Inserisci la tua email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="messaggio">
                <Form.Label className="d-block text-start">
                  Messaggio
                </Form.Label>
                <Form.Control
                  as="textarea"
                  name="messaggio"
                  value={formData.messaggio}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Scrivi qui il tuo messaggio"
                  required
                />
              </Form.Group>

              {success && (
                <Alert
                  variant="success"
                  dismissible
                  onClose={() => setSuccess(null)}
                >
                  {success}
                </Alert>
              )}

              {error && (
                <Alert
                  variant="danger"
                  dismissible
                  onClose={() => setError(null)}
                >
                  {error}
                </Alert>
              )}

              <Button type="submit" variant="outline-dark" className="w-100">
                Invia messaggio
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contatti;
