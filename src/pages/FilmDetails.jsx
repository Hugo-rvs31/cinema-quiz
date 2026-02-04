import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navigation from "../components/Navigation";

const FilmDetails = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);

  useEffect(() => {
    axios
      .get("/cinema-quiz/db-cinema.json")
      .then((res) => {
        const found = res.data.films.find((f) => String(f.id) === String(id));
        setFilm(found);
      })
      .catch(console.error);
  }, [id]);

  if (!film) return <p>Chargement...</p>;

  return (
    <div className="film-details">
      <Navigation />

      <h1>{film.title}</h1>

      <div className="film-details-box">
        <img src={film.image} alt={film.title} />

        <div className="infos">
          <p>
            <strong>Année :</strong> {film.annee}
          </p>

          <p>
            <strong>Réalisateur :</strong> {film.realisateur}
          </p>

          {film.acteurs_principaux && film.acteurs_principaux.length > 0 && (
            <div className="acteurs">
              <strong>Acteurs principaux :</strong>
              <ul>
                {film.acteurs_principaux.map((actor, index) => (
                  <li key={index}>{actor}</li>
                ))}
              </ul>
            </div>
          )}

          <p className="synopsis">{film.synopsis}</p>
        </div>
      </div>
    </div>
  );
};

export default FilmDetails;
