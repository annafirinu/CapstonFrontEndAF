import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Table,
  Alert,
} from "react-bootstrap";
import axiosClient from "../api/axiosClient";

const Backoffice = () => {
  const [prodotti, setProdotti] = useState([]);
  const [prenotazione, setPrenotazione] = useState([]);
  const [messaggi, setMessaggi] = useState([]);
  const [formData, setFormData] = useState({
    nome: "",
    descrizione: "",
    allergeni: "",
    prezzo: "",
    disponibile: true,
    immagineFile: null,
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProdotti();
    fetchPrenotazioni();
    fetchMessaggi();
  }, []);

  const fetchProdotti = async () => {
    try {
      const res = await axiosClient.get("/prodotti");
      setProdotti(res.data.content || res.data.prodotti || []);
    } catch (err) {
      console.error("Errore nel fetch dei prodotti:", err);
    }
  };

  const fetchPrenotazioni = async () => {
    try {
      const res = await axiosClient.get("/prenotazioni");
      const data = res.data;
      const prenotazioni = Array.isArray(data) ? data : data.content || [];
      setPrenotazione(prenotazioni);
    } catch (err) {
      console.error("Errore nel fetch delle prenotazioni:", err);
      setPrenotazione([]);
    }
  };

  const fetchMessaggi = async () => {
    try {
      const res = await axiosClient.get("/messaggi");
      setMessaggi(res.data.content || []);
    } catch (err) {
      console.error("Errore nel fetch dei messaggi:", err);
    }
  };

  const toggleDisponibilita = async (id, nuovaDisponibilita) => {
    try {
      const prodotto = prodotti.find((p) => p.id === id);
      if (!prodotto) return;

      const prodottoAggiornato = {
        nome: prodotto.nome,
        descrizione: prodotto.descrizione,
        allergeni: prodotto.allergeni,
        prezzo: prodotto.prezzo,
        disponibile: nuovaDisponibilita,
      };

      await axiosClient.put(`/prodotti/${id}`, prodottoAggiornato);
      fetchProdotti();
    } catch (error) {
      console.error("Errore nell'aggiornamento della disponibilità:", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (name === "immagineFile") {
      setFormData({ ...formData, immagineFile: files[0] });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddProdotto = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const prodottoData = {
        nome: formData.nome,
        descrizione: formData.descrizione,
        allergeni: formData.allergeni,
        prezzo: formData.prezzo,
        disponibile: formData.disponibile,
      };

      const res = await axiosClient.post("/prodotti", prodottoData);
      const newProdotto = res.data;

      if (formData.immagineFile) {
        const formImageData = new FormData();
        formImageData.append("file", formData.immagineFile);

        await axiosClient.patch(`/prodotti/${newProdotto.id}`, formImageData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setSuccess("Prodotto aggiunto con successo!");
      setFormData({
        nome: "",
        descrizione: "",
        allergeni: "",
        prezzo: "",
        disponibile: true,
        immagineFile: null,
      });
      fetchProdotti();
      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      console.error(err);
      setError("Errore durante l'aggiunta del prodotto.");
      setTimeout(() => setError(""), 5000);
    }
  };

  const eliminaProdotto = async (id) => {
    try {
      if (window.confirm("Sei sicuro di voler eliminare questo prodotto?")) {
        await axiosClient.delete(`/prodotti/${id}`);
        fetchProdotti();
      }
    } catch (err) {
      console.error("Errore eliminazione prodotto:", err);
    }
  };

  const eliminaPrenotazione = async (id) => {
    try {
      await axiosClient.delete(`/prenotazioni/${id}`);
      fetchPrenotazioni();
    } catch (err) {
      console.error("Errore eliminazione prenotazione:", err);
    }
  };

  const eliminaMessaggio = async (id) => {
    try {
      await axiosClient.delete(`/messaggi/${id}`);
      fetchMessaggi();
    } catch (err) {
      console.error("Errore eliminazione messaggio:", err);
    }
  };

  return (
    <Container fluid className="home-section font-carousel px-5 py-2">
      {/* Aggiungi prodotto */}
      <Card className="shadow border-0 bg-white rounded-4 p-2 mb-4">
        <div className="title d-flex ps-2 my-4">
          <h2 className="fw-bold text-center m-0">
            Aggiungi un nuovo prodotto
          </h2>
        </div>
        <Form onSubmit={handleAddProdotto}>
          <Row className="g-3">
            <Col md={6}>
              <Form.Control
                placeholder="Nome"
                name="nome"
                value={formData.nome}
                onChange={handleFormChange}
                required
              />
            </Col>
            <Col md={6}>
              <Form.Control
                type="number"
                placeholder="Prezzo (€)"
                name="prezzo"
                value={formData.prezzo}
                onChange={handleFormChange}
                step="0.01"
                required
              />
            </Col>
            <Col md={12}>
              <Form.Control
                as="textarea"
                placeholder="Descrizione"
                name="descrizione"
                rows={2}
                value={formData.descrizione}
                onChange={handleFormChange}
              />
            </Col>
            <Col md={12}>
              <Form.Control
                placeholder="Allergeni"
                name="allergeni"
                value={formData.allergeni}
                onChange={handleFormChange}
              />
            </Col>
            <Col md={6}>
              <Form.Check
                type="checkbox"
                label="Disponibile"
                name="disponibile"
                checked={formData.disponibile}
                onChange={handleFormChange}
              />
            </Col>
            <div>
              <Col md={6}>
                <Form.Control
                  type="file"
                  name="immagineFile"
                  accept="image/*"
                  onChange={handleFormChange}
                />
              </Col>
            </div>
          </Row>

          {success && (
            <Alert variant="success" className="mt-3">
              {success}
            </Alert>
          )}
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}

          <Button type="submit" variant="outline-dark" className="w-100 mt-3">
            Aggiungi Prodotto
          </Button>
        </Form>
      </Card>

      {/* Prodotti */}
      <Card className="shadow border-0 bg-white rounded-4 p-2 mb-4">
        <div className="title d-flex ps-2 my-4">
          <h2 className="fw-bold text-center m-0">Prodotti esistenti</h2>
        </div>
        {prodotti.length === 0 ? (
          <p className="text-muted">Nessun prodotto disponibile.</p>
        ) : (
          <Table bordered responsive>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Prezzo</th>
                <th>Allergeni</th>
                <th>Descrizione</th>
                <th>Disponibile</th>
                <th>Immagine</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {prodotti.map((p) => (
                <tr key={p.id}>
                  <td>{p.nome}</td>
                  <td>€ {Number(p.prezzo).toFixed(2)}</td>
                  <td>{p.allergeni}</td>
                  <td>{p.descrizione}</td>
                  <td>
                    <Form.Check
                      type="switch"
                      id={`switch-disponibile-${p.id}`}
                      label={p.disponibile ? "Disponibile" : "Non disponibile"}
                      checked={p.disponibile}
                      onChange={() => toggleDisponibilita(p.id, !p.disponibile)}
                    />
                  </td>
                  <td>
                    {p.immagineProdotto ? (
                      <img
                        src={p.immagineProdotto}
                        alt={p.nome}
                        style={{ width: "80px", height: "auto" }}
                      />
                    ) : (
                      <span className="text-muted">Nessuna immagine</span>
                    )}
                  </td>
                  <td>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => eliminaProdotto(p.id)}
                    >
                      Elimina
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>

      {/* Prenotazioni */}
      <Card className="shadow border-0 bg-white rounded-4 p-2 mb-4">
        <div className="title d-flex ps-2 my-4">
          <h2 className="fw-bold text-center m-0">Prenotazioni ricevute</h2>
        </div>
        {prenotazione.length === 0 ? (
          <p className="text-muted">Nessuna prenotazione al momento.</p>
        ) : (
          <Table bordered responsive className="table-sm">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Data</th>
                <th>Prodotti</th>
                <th>Telefono</th>
                <th>Email</th>
                <th>Note</th>
                <th>Elimina</th>
              </tr>
            </thead>
            <tbody>
              {prenotazione.map((o) => (
                <tr key={o.id}>
                  <td>{o.nomeCliente}</td>
                  <td>{o.dataRitiro}</td>
                  <td>
                    <ul className="mb-0">
                      {(o.prenotazioneProdotti || []).map((p, i) => (
                        <li key={i}>
                          {p.quantita} {p.tipoQuantita?.toLowerCase()} -{" "}
                          {p.prodotto.nome}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{o.telefono}</td>
                  <td>{o.email}</td>
                  <td>{o.note}</td>
                  <td>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => eliminaPrenotazione(o.id)}
                    >
                      Elimina
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>

      {/* Messaggi */}
      <Card className="shadow border-0 bg-white rounded-4 p-2 mt-4 mb-4">
        <div className="title d-flex ps-2 my-4">
          <h2 className="fw-bold text-center m-0">Messaggi ricevuti</h2>
        </div>
        {messaggi.length === 0 ? (
          <p className="text-muted">Nessun messaggio ricevuto.</p>
        ) : (
          <Table bordered responsive className="table-sm">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Messaggio</th>
                <th>Elimina</th>
              </tr>
            </thead>
            <tbody>
              {messaggi.map((m) => (
                <tr key={m.id}>
                  <td>{m.nome}</td>
                  <td>{m.email}</td>
                  <td>{m.messaggio}</td>
                  <td>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => eliminaMessaggio(m.id)}
                    >
                      Elimina
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </Container>
  );
};

export default Backoffice;
