import { NavLink, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isLibrary = location.pathname.startsWith("/library");

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
