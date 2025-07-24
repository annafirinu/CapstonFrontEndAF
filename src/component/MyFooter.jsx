import { Row, Col } from "react-bootstrap";
import logo from "../img/LogoPanificio.png";

const MyFooter = () => (
  <footer className="footer-custom">
    <Row className="text-center mt-5">
      <Col xs={{ span: 6, offset: 3 }}>
        <Row className="row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-4">
          <Col>
            <Row>
              <Col xs={12}>
                <p className="fw-bold">DOVE SIAMO</p>
                <p>Via M.D'Azeglio,1</p>
                <p>09070 Paulilatino -OR-</p>
                <p>
                  <a
                    className="text-white-50"
                    href="https://www.google.it/maps/place/Firinu+Stefano+%26+C.+snc/@40.0824984,8.763314,674m/data=!3m2!1e3!4b1!4m6!3m5!1s0x12ddb96bc0e8987b:0x3e97edc7e8086119!8m2!3d40.0824984!4d8.7658889!16s%2Fg%2F11f5h8jfj6!5m1!1e2?entry=ttu&g_ep=EgoyMDI1MDcxNS4xIKXMDSoASAFQAw%3D%3D"
                    alt="footer link"
                  >
                    Google Maps
                  </a>
                </p>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col xs={12}>
                <p className="fw-bold">ORARI</p>
                <p>Lunedi - Sabato</p>
                <p>07:00 - 13:00</p>
                <p>Domenica CHIUSO</p>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col xs={12} className="footer-links">
                <p className="fw-bold">CONTATTI</p>
                <p>
                  <a href="tel:+393425056307" className="text-white-50">
                    +39 3425056307
                  </a>
                </p>
                <p>panificiofirinu@gmail.it</p>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col xs={12} className="footer-links">
                <p className="fw-bold">SEGUICI</p>
                <p>
                  <a className="text-white-50" href="/" alt="footer link">
                    <i class="bi bi-instagram"></i>
                  </a>
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="text-left mb-2">
            <img
              src={logo}
              alt="Logo Panificio"
              height="60"
              className="d-inline-block align-top"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="text-left mb-2 mt-2 copyright">
            © 1957-{new Date().getFullYear()} Panificio artigianale Firinu
            Stefano & c. snc
          </Col>
        </Row>
      </Col>
    </Row>
  </footer>
);

export default MyFooter;
