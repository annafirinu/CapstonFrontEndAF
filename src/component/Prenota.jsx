import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import axiosClient from "../api/axiosClient";
import dayjs from "dayjs";

const Prenota = () => {
  const [prodotti, setProdotti] = useState([]);
  const [prenotazione, setPrenotazione] = useState([]);
  const [formData, setFormData] = useState({
    nomeCliente: "",
    telefono: "",
    email: "",
    dataRitiro: "",
    note: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    axiosClient
      .get("/prodotti")
      .then((res) => {
        setProdotti(res.data.content || res.data.prodotti || []);
      })
      .catch((err) => console.error("Errore prodotti:", err));
  }, []);

  const aggiungiProdotto = (prodotto, quantita, tipoQuantita) => {
    if (!quantita || quantita <= 0 || !tipoQuantita) return;

    setPrenotazione((prev) => [
      ...prev,
      {
        prodottoId: prodotto.id,
        nome: prodotto.nome,
        quantita,
        tipoQuantita,
      },
    ]);
  };

  const rimuoviProdotto = (index) => {
    setPrenotazione((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const today = dayjs();
    const selectedDate = dayjs(formData.dataRitiro);
    if (selectedDate.diff(today, "day") < 2) {
      setError(
        "La data di ritiro deve essere almeno due giorni dopo quella odierna."
      );
      return;
    }

    if (prenotazione.length === 0) {
      setError("Aggiungi almeno un prodotto alla prenotazione.");
      return;
    }

    const payload = {
      ...formData,
      prodotti: prenotazione.map((p) => ({
        prodottoId: p.prodottoId,
        quantita: p.quantita,
        tipoQuantita: p.tipoQuantita,
      })),
    };

    try {
      await axiosClient.post("/prenotazioni", payload);
      setSuccess("Prenotazione inviata con successo!");
      setFormData({
        nomeCliente: "",
        telefono: "",
        email: "",
        dataRitiro: "",
        note: "",
      });
      setPrenotazione([]);

      setTimeout(() => setSuccess(""), 10000);
    } catch (err) {
      setError("Errore nell'invio della prenotazione.");
      setTimeout(() => setError(""), 10000);
    }
  };

  return (
    <Container fluid className="py-3 home-section font-carousel px-5">
      <div className="title d-flex align-items-center justify-content-center my-5">
        <h2 className="fw-bold text-center m-0">Ordina qui i tuoi prodotti</h2>
      </div>
      <p className="lead text-center home-description">
        Benvenuti nella sezione dedicata alle prenotazioni del nostro pane
        artigianale.
      </p>
      <p className="lead text-center home-description">
        Qui potete comodamente prenotare i vostri prodotti, garantendovi così la
        freschezza e la disponibilità che meritano.
      </p>
      <p className="lead text-center home-description">
        Vi ricordiamo che le prenotazioni devono essere effettuate con almeno
        due giorni di anticipo rispetto alla data desiderata di ritiro.
      </p>
      <p className="lead text-center home-description">
        Per esigenze di prenotazione con tempi più brevi, vi invitiamo a
        contattare direttamente il nostro
        <a href="tel:+393425056307"> numero telefonico </a>, dove saremo lieti
        di assistervi e valutare insieme la miglior soluzione possibile.
      </p>
      <p className="lead text-center home-description mb-5">
        Il nostro punto vendita, per il ritiro, è aperto dal lunedì al sabato,
        dalle 7:00 alle 13:00.
      </p>

      <Row>
        {/* Colonna sinistra */}
        <div className="  py-2 z-3">
          <Form.Control
            type="text"
            placeholder="Cerca un prodotto per nome..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ maxWidth: "300px" }}
          />
        </div>
        <Col lg={8} className="mb-4 pe-5 prodotti-col">
          <Row>
            {prodotti
              .filter((p) => p.nome.toLowerCase().includes(query.toLowerCase()))
              .map((p) => (
                <Col
                  key={p.id}
                  lg={4}
                  md={6}
                  sm={12}
                  className="mb-4 d-flex justify-content-center"
                >
                  <Card
                    className={`shadow border-0 bg-white rounded-4 fixed-width-card h-100 position-relative ${
                      !p.disponibile ? "prodotto-disabilitato" : ""
                    }`}
                  >
                    <Card.Img
                      variant="top"
                      src={
                        p.immagineProdotto ||
                        "https://via.placeholder.com/800x400"
                      }
                      alt={p.nome}
                      className="card-img-custom"
                    />
                    <Card.Body className="p-3 font-carousel text-center bg-card rounded-bottom-4 d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="mb-2 fw-bold card-title-color">
                          {p.nome}
                        </h5>
                        <p className="mb-2 card-text-color">
                          <strong>Ingredienti: </strong>
                          {p.descrizione}
                        </p>
                        <p className="mb-3 card-text-allergeni">
                          <strong>Allergeni:</strong> {p.allergeni}
                        </p>
                      </div>
                      {p.disponibile ? (
                        <div>
                          <p className="fw-bold fs-6 card-price-color">
                            Prezzo: € {p.prezzo.toFixed(2)} / kg
                          </p>
                          <Form
                            onSubmit={(e) => {
                              e.preventDefault();
                              const quantita = parseInt(
                                e.target.quantita.value
                              );
                              const tipoQuantita = e.target.tipoQuantita.value;
                              aggiungiProdotto(p, quantita, tipoQuantita);
                              e.target.reset();
                            }}
                            className="mt-auto d-flex flex-column gap-2"
                          >
                            <div className="d-flex gap-2">
                              <Form.Control
                                name="quantita"
                                type="number"
                                placeholder="Quantità"
                                min="1"
                                required
                                style={{ maxWidth: 100 }}
                              />
                              <Form.Select
                                name="tipoQuantita"
                                required
                                style={{ maxWidth: 150 }}
                              >
                                <option value="">Tipo quantità</option>
                                <option value="PEZZO">Pezzo/i</option>
                                <option value="KG">Kg</option>
                              </Form.Select>
                            </div>
                            <Button type="submit" variant="outline-dark">
                              Aggiungi
                            </Button>
                          </Form>
                        </div>
                      ) : (
                        <p className="text-danger fw-bold mt-3">
                          Non disponibile
                        </p>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Col>

        {/* Colonna destra */}
        <Col lg={4}>
          <Card className="mb-4 bg-card shadow border-0 rounded-4">
            <Card.Body>
              <h5>Prodotti selezionati:</h5>
              {prenotazione.length === 0 && (
                <p className="text-muted">Nessun prodotto aggiunto</p>
              )}
              <ul className="list-unstyled">
                {prenotazione.map((p, i) => (
                  <li
                    key={i}
                    className="d-flex justify-content-between align-items-center prodotto-selezionato-item"
                  >
                    <span>
                      {p.nome} - {p.quantita} {p.tipoQuantita.toLowerCase()}
                    </span>
                    <Button
                      onClick={() => rimuoviProdotto(i)}
                      className="btn-remove-prod"
                      aria-label="Rimuovi prodotto"
                    >
                      &times;
                    </Button>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="nomeCliente"
                placeholder="Nome e cognome cliente"
                value={formData.nomeCliente}
                onChange={handleFormChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="tel"
                name="telefono"
                placeholder="Telefono"
                value={formData.telefono}
                onChange={handleFormChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleFormChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Data di ritiro</Form.Label>
              <Form.Control
                type="date"
                name="dataRitiro"
                value={formData.dataRitiro}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="messaggio">
              <Form.Label>Note</Form.Label>
              <Form.Control
                as="textarea"
                name="note"
                value={formData.note}
                onChange={handleFormChange}
                placeholder="Scrivi qui se hai richieste particolari"
              />
            </Form.Group>

            {error && (
              <Alert variant="danger" dismissible onClose={() => setError("")}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert
                variant="success"
                dismissible
                onClose={() => setSuccess("")}
              >
                {success}
              </Alert>
            )}

            <Button type="submit" variant="outline-dark" className="w-100">
              Invia Prenotazione
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Prenota;
