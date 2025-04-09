import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import FrontCard from "./cards/FrontCard";
import { Carte } from "./types";

function App() {
  const exempleCarte: Carte = {
    id: 1,
    thematique: "Écologie",
    type: "Article",
    titre: "Changement climatique",
    date: 2020,
    detail:
      "Cet article explore les conséquences du réchauffement climatique sur la biodiversité.",
  };

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen bg-white">
      <FrontCard card={exempleCarte} />
    </div>
  );
}

export default App;
