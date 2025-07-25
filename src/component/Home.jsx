import { Container, Row, Col } from "react-bootstrap";
import panePintau from "../img/Pane Pintau.JPG";
import lievito from "../img/lievito.png";

const Home = function () {
  return (
    <div className="home-section">
      <div className="image-home d-flex justify-content-center align-items-center">
        <div className="text-center p-4 rounded">
          <h1 className="text-light fs-1 fst-italic">
            Settant’anni di pane, passione e tradizione
          </h1>
        </div>
      </div>
      <Container fluid className="py-5 bg-white mx-0">
        <div className="title d-flex align-items-center justify-content-center my-5">
          <h2 className="fw-bold text-center m-0">Chi Siamo</h2>
        </div>

        <p className="lead text-center home-description">
          Il Panificio Firinu, nato quasi per caso da un’intuizione di nonno
          Salvatore, porta avanti la sua attività a conduzione familiare dal
          1957.
        </p>
        <p className="lead text-center home-description">
          In quegli anni, a Paulilatino, piccolo paese nel cuore della Sardegna,
          l’arte del pane era una tradizione profondamente radicata: ogni
          settimana, in ogni casa, le donne si dedicavano con cura alla
          preparazione del pane.
        </p>
        <p className="lead text-center home-description">
          In questo contesto, aprire un panificio fu una vera scommessa. Una
          scommessa vinta, che si rivelò anche una piccola rivoluzione: offrire
          pane fresco ogni giorno, buono come quello fatto in casa, significava
          ridurre il carico di lavoro per le massaie senza rinunciare alla
          qualità.
        </p>
        <p className="lead text-center home-description">
          L’attività fu poi sviluppata dal figlio di nonno Salvatore, Mariano,
          che ha guidato il panificio trasmettendo la sua passione e tutte le
          sue conoscenze ai figli e oggi anche ai nipoti.
        </p>
        <p className="lead text-center home-description">
          Settant'anni di esperienza in cui abilità manuali, saperi antichi,
          innovazioni tecniche e tecnologiche hanno saputo fondersi ma sempre
          nel rispetto delle ricette tradizionali.
        </p>
        <p className="lead text-center home-description">
          Ancora oggi, infatti, il Panificio Firinu continua a puntare su ciò
          che rende unico il pane di una volta: l'utilizzo del lievito madre,
          che garantisce digeribilità, profumo e durata; la lavorazione a mano e
          la decorazione artigianale, fatta con cura e secondo la tradizione.
        </p>
      </Container>
      <Container fluid className="py-5">
        <div className="title d-flex align-items-center justify-content-center mb-4">
          <h2 className="fw-bold m-0">Il Lievito Madre</h2>
        </div>
        <Row className="align-items-center ps-4 pe-4">
          <Col md={12} lg={6} className="order-1 order-lg-2 mb-4 mb-md-0">
            <img
              src={lievito}
              alt="Lievito"
              className="img-fluid rounded shadow p-4 fixed-image"
            />
          </Col>
          <Col md={12} lg={6} className="order-2 order-lg-1">
            <p className="lead text-center home-description">
              Il lievito madre, o "Su Fremmentazzu", è un impasto vivo ottenuto
              da farina e acqua, in cui si sviluppano naturalmente fermenti
              lattici e saccaromiceti. Questi microrganismi, grazie alla
              fermentazione, producono anidride carbonica e permettono
              all’impasto di crescere lentamente e in modo naturale.
            </p>
            <p className="lead text-center home-description">
              Il segreto per mantenerlo attivo è il rinfresco quotidiano: ogni
              giorno se ne preleva una parte, si aggiungono acqua e farina, e si
              dà il via a una nuova fermentazione. È un piccolo rito fatto di
              gesti semplici ma fondamentali, che ci permette di ottenere un
              ottimo prodotto senza bisogno di additivi.
            </p>
            <p className="lead text-center home-description">
              Ogni lievito madre ha un carattere unico: cambia con l’ambiente,
              la farina, l’acqua e le mani che lo curano. Per questo
              rappresenta, da sempre, una vera firma del panificatore.
            </p>
            <p className="lead text-center home-description">
              La fermentazione è lenta, ma è proprio questa lentezza a fare la
              differenza: più tempo significa più gusto, più digeribilità, più
              qualità.
            </p>
          </Col>
        </Row>
      </Container>
      <Container fluid className="py-5 bg-white mx-0">
        <div className="title d-flex align-items-center justify-content-center mb-4">
          <h2 className="fw-bold m-0">Pane pintau</h2>
        </div>
        <Row className="align-items-center ps-4 pe-4">
          <Col md={6} className="mb-4 mb-md-0">
            <img
              src={panePintau}
              alt="Pane Pintau"
              className="img-fluid rounded shadow p-4 fixed-image"
            />
          </Col>
          <Col md={6}>
            <p className="lead text-center home-description">
              Il Pane Pintau è un pane tradizionale sardo, decorato interamente
              a mano con pazienza, tecnica e creatività. Il suo nome deriva da
              "sa pintadura", l’arte dell’incisione decorativa che lo
              caratterizza, e prende forma in pani di varia dimensione: "su
              coccoi" o "su tureddu".
            </p>
            <p className="lead text-center home-description">
              Per realizzarlo servono gesti precisi tramandati da generazioni e
              strumenti semplici ma sapienti: lame per tagli profondi e motivi
              smerlati, forbici per rifiniture sottili, rotelle per incisioni
              leggere e "su pintapane", un piccolo ago di ferro schiacciato in
              punta con cui si tracciano motivi unici.
            </p>
            <p className="lead text-center home-description">
              Le decorazioni raffigurano spesso cuori, fiori, foglie e ogni Pane
              Pintau è diverso dall’altro, un piccolo capolavoro che racconta
              una storia.
            </p>
            <p className="lead text-center home-description">
              Proprio per questo viene preparato in occasioni speciali o su
              richiesta
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
