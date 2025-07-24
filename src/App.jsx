import "./App.css";
import "./index.css";
import MyNav from "./component/MyNav";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "react-multi-carousel/lib/styles.css";

import MyFooter from "./component/MyFooter";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Prodotti from "./component/Prodotti";
import Prenota from "./component/Prenota";
import Contatti from "./component/Contatti";
import PrivateRoute from "./component/PrivateRoute";
import Backoffice from "./component/Backoffice";
import NotFound from "./assets/NotFound";
import Login from "./component/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <main className="d-flex flex-column min-vh-100 body">
          <MyNav tema="dark" />
          <div className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/prodotti" element={<Prodotti />} />
              <Route path="/prenota" element={<Prenota />} />
              <Route path="/contatti" element={<Contatti />} />
              <Route
                path="/backoffice"
                element={
                  <PrivateRoute>
                    {" "}
                    <Backoffice />{" "}
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
              <Route path="/admin-login-123" element={<Login />} />
            </Routes>
          </div>
          <MyFooter />
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
