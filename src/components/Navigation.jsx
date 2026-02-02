import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";
  const isFilmDetails = location.pathname.startsWith("/library/");
  const isLibrary = location.pathname === "/library";

  // 👉 Si on est sur FilmDetails, on ne met pas de "to"
  if (isFilmDetails) {
    return (
      <button
        id="navigation"
        className="nav-library"
        onClick={() => navigate(-1)}
      >
        Retour à la bibliothèque
      </button>
    );
  }

  return (
    <NavLink
      id="navigation"
      to={isHome ? "/quiz" : "/"}
      className={isHome ? "nav-home" : isLibrary ? "nav-library" : "nav-quiz"}
    >
      {isHome
        ? "Démarrer le quiz Cinéma"
        : isLibrary
          ? "Retour à l’accueil"
          : "Accueil"}
    </NavLink>
  );
};

export default Navigation;
