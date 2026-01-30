import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CinemaQuiz from "./pages/CinemaQuiz";
import Library from "./pages/Library";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<CinemaQuiz />} />
        <Route path="*" element={<Home />} />
        <Route path="/library" element={<Library />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
