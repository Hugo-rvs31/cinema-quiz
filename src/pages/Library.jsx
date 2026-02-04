import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Navigation from "../components/Navigation";
import { useNavigate } from "react-router-dom";

const Library = () => {
  const [films, setFilms] = useState([]);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("title-asc");
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Fetch des films
  useEffect(() => {
    axios
      .get("/cinema-quiz/db-cinema.json")
      .then((res) => {
        setFilms(res.data.films);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Films filtrés + triés
  const filteredFilms = useMemo(() => {
    let result = [...films];

    // --- SEARCH (title + realisateur, case insensitive)
    if (search.trim() !== "") {
      const value = search.toLowerCase();

      result = result.filter((film) => {
        const title = film.title?.toLowerCase() || "";
        const realisateur = film.realisateur?.toLowerCase() || "";

        const acteurs = film.acteurs_principaux || [];
        const matchActor = acteurs.some((actor) =>
          actor.toLowerCase().includes(value),
        );

        return (
          title.includes(value) || realisateur.includes(value) || matchActor
        );
      });
    }

    // --- SORT
    if (sortType === "title-asc") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortType === "title-desc") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    if (sortType === "year-asc") {
      result.sort((a, b) => Number(a.annee) - Number(b.annee));
    }

    if (sortType === "year-desc") {
      result.sort((a, b) => Number(b.annee) - Number(a.annee));
    }

    return result;
  }, [films, search, sortType]);

  return (
    <div className="library">
      <Navigation />
      {showScrollTop && (
        <button className="scroll-top-btn" onClick={scrollToTop}>
          ↑
        </button>
      )}
      <h1>Bibliothèque de films</h1>

      <div className="library-tools">
        <input
          type="text"
          placeholder="Rechercher par titre, réalisateur ou acteur..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="title-asc">Titre A → Z</option>
          <option value="title-desc">Titre Z → A</option>
          <option value="year-asc">Année croissante</option>
          <option value="year-desc">Année décroissante</option>
        </select>
      </div>

      <div className="library-grid">
        {filteredFilms.map((film) => (
          <div key={film.id} className="library-card">
            <div
              className="library-image"
              onClick={() => navigate(`/library/${film.id}`)}
            >
              <img src={film.image} alt={film.title} />

              <div className="library-overlay">
                <h3 className="title">{film.title}</h3>
              </div>
            </div>

            <p className="annee">
              <strong>film sorti en {film.annee}</strong>
            </p>
            <p className="realisateur">Réalisé par {film.realisateur}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
