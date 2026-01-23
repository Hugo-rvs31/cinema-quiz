import React, { useEffect, useMemo, useState } from "react";
import Navigation from "../components/Navigation";
import axios from "axios";

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const Home = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("/cinema-quiz/db-cinema.json")
      .then((res) => {
        const imgs = res.data.films.map((f) => f.image);
        setImages(imgs);
      })
      .catch(console.error);
  }, []);

  const shuffledImages = useMemo(() => shuffleArray(images), [images]);

  return (
    <div className="home">
      <div className="home-grid">
        {shuffledImages.map((img, index) => (
          <div
            key={index}
            className="grid-cell"
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>

      <div className="game-rules-box">
        <h1>Quiz Cinéma</h1>
        <div className="game-rules">
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
