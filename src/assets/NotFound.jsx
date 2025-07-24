import { Link, useNavigate } from "react-router-dom";

const NotFound = function () {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-5 pt-5 ">
      <h2>404 - Pagina non trovata</h2>
      <p>
        Vuoi tornare in <Link to="/">HOME</Link>?
      </p>
    </div>
  );
};

export default NotFound;
