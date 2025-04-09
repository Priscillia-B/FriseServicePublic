import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import FrontCard from "./cards/FrontCard";
import { Carte } from "./types";

function App() {
  const [count, setCount] = useState(0);
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
    <div className="flex flex-col items-center bg-gradient-to-br from-zinc-900 to-purple-900 min-h-screen">
      <FrontCard card={exempleCarte} />
    </div>
  );
}

export default App;
