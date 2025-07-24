import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { isAdminAuthenticated } from "../utils/auth";
import logo from "../img/LogoPanificio.png";

const MyNav = function (props) {
  const location = useLocation();

  return (
    <Navbar collapseOnSelect expand="lg" className="navbar-custom fixed-top">
      <Container className="px-30">
        <Link to="/" className="navbar-brand">
          <img
            src={logo}
            alt="Logo Panificio"
            height="60"
            className="d-inline-block align-top"
          />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto gap-4">
            <Link
              className={
                location.pathname === "/" ? "nav-link active" : "nav-link"
              }
              to="/"
            >
              HOME
            </Link>
            <Link
              className={
                location.pathname === "/prodotti"
                  ? "nav-link active"
                  : "nav-link"
              }
              to="/prodotti"
            >
              PRODOTTI
            </Link>
            <Link
              className={
                location.pathname === "/prenota"
                  ? "nav-link active"
                  : "nav-link"
              }
              to="/prenota"
            >
              ORDINA
            </Link>
            <Link
              className={
                location.pathname === "/contatti"
                  ? "nav-link active"
                  : "nav-link"
              }
              to="/contatti"
            >
              CONTATTI
            </Link>

            {isAdminAuthenticated() && (
              <Link
                className={
                  location.pathname === "/backoffice"
                    ? "nav-link active"
                    : "nav-link"
                }
                to="/backoffice"
              >
                BACKOFFICE
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNav;
