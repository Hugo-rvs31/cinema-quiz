import React from "react";
import Navigation from "../components/Navigation";

const Home = () => {
  return (
    <div className="home">
      <div className="game-rules-box">
        <h1>Quiz Cinéma</h1>
        <div className="game-rules">
          {" "}
          Trouvez le film correspondant à l'image en moins de 10 secondes.{" "}
          <br /> Plus vous trouvez de films, plus votre score final sera élevé,{" "}
          chaque film vaut 1 point de 1 à 20 films, puis 2 points de 21 à 40
          films (le jeu fonctionne par palier de 20 films) et ainsi de suite
          <br /> Êtes-vous prêt à tester vos connaissances cinéma ?
        </div>
        <Navigation />
      </div>
    </div>
  );
};

export default Home;
