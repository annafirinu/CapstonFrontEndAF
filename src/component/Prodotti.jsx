import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import {
  Container,
  Spinner,
  Alert,
  Modal,
  Button,
  Card,
} from "react-bootstrap";
import Carousel from "react-multi-carousel";

const responsive = {
  largeDesktop: { breakpoint: { max: 4000, min: 1200 }, items: 5 },
  desktop: { breakpoint: { max: 1200, min: 992 }, items: 5 },
  tablet: { breakpoint: { max: 992, min: 768 }, items: 3 },
  mobile: { breakpoint: { max: 768, min: 0 }, items: 2 },
};

const Prodotti = () => {
  const [prodotti, setProdotti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [prodottoSelezionato, setProdottoSelezionato] = useState(null);
  const [loadingDettaglio, setLoadingDettaglio] = useState(false);
  const [erroreDettaglio, setErroreDettaglio] = useState("");

  useEffect(() => {
    const fetchProdotti = async () => {
      try {
        const res = await axiosClient.get("/prodotti");
        setProdotti(res.data.content);
      } catch (err) {
        setError("Errore nel caricamento dei prodotti.");
      } finally {
        setLoading(false);
      }
    };

    fetchProdotti();
  }, []);

  const apriDettaglio = async (id) => {
    setLoadingDettaglio(true);
    setErroreDettaglio("");
    try {
      const res = await axiosClient.get(`/prodotti/${id}`);
      setProdottoSelezionato(res.data);
    } catch (err) {
      setErroreDettaglio("Errore nel caricamento del prodotto.");
    } finally {
      setLoadingDettaglio(false);
    }
  };

  const chiudiDettaglio = () => {
    setProdottoSelezionato(null);
  };

  return (
    <div className="home-section">
      <div className="image-prodotti d-flex justify-content-center align-items-center">
        <div className="text-center p-4 rounded">
          <h1 className="text-light fs-2 fst-italic">I nostri prodotti</h1>
        </div>
      </div>

      <Container fluid className="py-5 bg-white mx-0">
        <p className="lead text-center home-description">
          Il Pane Pintau è un pane tradizionale sardo, decorato interamente a
          mano con pazienza, tecnica e creatività. Il suo nome deriva da sa
          pintadura, l’arte dell’incisione decorativa che lo caratterizza, e
          prende forma in impasti come il "su coccoi" o "su tureddu".
        </p>
        <p className="lead text-center home-description">
          Per realizzarlo servono gesti precisi tramandati da generazioni e
          strumenti semplici ma sapienti: lame per tagli profondi e motivi
          smerlati, forbici per rifiniture sottili, rotelle per incisioni
          leggere e su pintapane, un piccolo ago di ferro schiacciato in punta
          con cui si tracciano motivi unici.
        </p>
        <p className="lead text-center home-description">
          Le decorazioni raffigurano spesso cuori, fiori, foglie e sono frutto
          di un lavoro minuzioso, fatto completamente a mano . Ogni Pane Pintau
          è diverso dall’altro, un piccolo capolavoro che racconta una storia.
        </p>
        <p className="lead text-center home-description">
          Proprio per questo viene preparato in occasioni speciali o su
          richiesta
        </p>
        <p className="lead text-center home-description">
          Se vuoi provare i nostri prodotti non ti resta che{" "}
          <a href="http://localhost:5173/prenota">ordinarli qui!</a>
        </p>
      </Container>

      <Container className="mt-5">
        {loading && (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && (
          <Carousel
            responsive={responsive}
            infinite={false}
            autoPlay={false}
            swipeable
            draggable
            keyBoardControl
            containerClass="carousel-container"
            itemClass="px-1"
            arrows
            className="pb-5"
          >
            {prodotti.map((prodotto) => (
              <div
                key={prodotto.id}
                className="p-2"
                style={{ cursor: "pointer", height: "100%" }}
                onClick={() => apriDettaglio(prodotto.id)}
              >
                <div className="shadow rounded overflow-hidden h-100">
                  <img
                    src={
                      prodotto.immagineProdotto ||
                      "https://via.placeholder.com/300"
                    }
                    alt={prodotto.nome}
                    className="img-fluid"
                    style={{
                      height: "150px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div className="text-center text-black p-2 font-carousel">
                    <strong>{prodotto.nome}</strong>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        )}
      </Container>

      {/*Dettaglio Prodotto*/}
      <Modal
        show={!!prodottoSelezionato}
        onHide={chiudiDettaglio}
        dialogClassName="centered-modal"
        contentClassName="p-0 margin-top border-0 bg-transparent shadow-none"
        backdropClassName="transparent-backdrop"
      >
        <Modal.Body className="p-0 m-0 d-flex justify-content-center align-items-center">
          {loadingDettaglio ? (
            <div className="text-center py-5">
              <Spinner animation="border" />
            </div>
          ) : erroreDettaglio ? (
            <Alert variant="danger">{erroreDettaglio}</Alert>
          ) : prodottoSelezionato ? (
            <Card className="shadow border-0 bg-white rounded-4 fixed-width-card h-100">
              <Card.Img
                variant="top"
                src={
                  prodottoSelezionato.immagineProdotto ||
                  "https://via.placeholder.com/800x400"
                }
                alt={prodottoSelezionato.nome}
                className="img-fluid"
                style={{
                  maxHeight: "200px",
                  objectFit: "cover",
                  borderTopLeftRadius: "1rem",
                  borderTopRightRadius: "1rem",
                }}
              />
              <Card.Body className="p-3 font-carousel text-center bg-card rounded-bottom-4 d-flex flex-column">
                <h2 className="mb-3 fw-bold" style={{ color: "#3e2f1c" }}>
                  {prodottoSelezionato.nome}
                </h2>
                <p className="mb-4" style={{ color: "#5c4433" }}>
                  <strong>Ingredienti: </strong>
                  {prodottoSelezionato.descrizione}
                </p>
                <p className="mb-4" style={{ color: "#5c4433" }}>
                  <strong>Allergeni: </strong>
                  {prodottoSelezionato.allergeni}
                </p>
                <p className="fw-bold fs-5" style={{ color: "#7b4b29" }}>
                  Prezzo: € {prodottoSelezionato.prezzo.toFixed(2)} / kg
                </p>
                <Button
                  variant="outline-dark"
                  className="mt-4"
                  onClick={chiudiDettaglio}
                >
                  Chiudi
                </Button>
              </Card.Body>
            </Card>
          ) : null}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Prodotti;
