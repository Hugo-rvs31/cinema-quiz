import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <NavLink
      id="navigation"
      to={isHome ? "/cinema-quiz" : "/"}
      className={isHome ? "nav-home" : "nav-quiz"}
    >
      {isHome ? "Démarrer le quiz Cinéma" : "Accueil"}
    </NavLink>
  );
};

export default Navigation;
