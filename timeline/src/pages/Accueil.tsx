// src/pages/Accueil.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Nécessaire pour la redirection
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faUsers,
  faTrophy,
  faBalanceScale,
  faHeartbeat,
  faHouse,
  faGraduationCap,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import "tailwindcss";

function Accueil() {
  const [nbPlayers, setNbPlayers] = useState<number | null>(null);
  const [nbPoints, setNbPoints] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); // Pour naviguer vers /game

  const handleStart = () => {
    if (nbPlayers === null || nbPoints === null) {
      setError("Veuillez remplir tous les champs avant de commencer !");
    } else if (nbPlayers < 2) {
      setError("Impossible de jouer seul !"); 
    } else {
      setError(null);
      // Passage des infos via state à la page Game
      navigate("/game", { state: { nbPlayers, nbPoints } });
    }
  };

  return (
    <div className="relative min-h-screen min-w-screen bg-gradient-to-b from-[#E5ECF4] to-[#cfd8e8] flex flex-col items-center justify-center font-sans overflow-hidden">
      {/* Watermark géant */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -rotate-12 text-[140px] font-bold text-[#2D2DA0] opacity-5 select-none pointer-events-none z-0">
        FriseServicePublic
      </div>

      {/* Icônes de fond réparties sur toute la surface */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <FontAwesomeIcon
          icon={faBalanceScale}
          className="absolute top-10 left-10 text-6xl text-[#2D2DA0] opacity-10"
        />
        <FontAwesomeIcon
          icon={faHeartbeat}
          className="absolute top-10 right-10 text-6xl text-[#2D2DA0] opacity-10"
        />
        <FontAwesomeIcon
          icon={faHouse}
          className="absolute bottom-10 left-10 text-6xl text-[#2D2DA0] opacity-10"
        />
        <FontAwesomeIcon
          icon={faGraduationCap}
          className="absolute bottom-10 right-10 text-6xl text-[#2D2DA0] opacity-10"
        />
        <FontAwesomeIcon
          icon={faShieldHalved}
          className="absolute top-10 left-1/2 transform -translate-x-1/2 text-6xl text-[#2D2DA0] opacity-10"
        />
      </div>

      {/* Carte d'accueil */}
      <div className="bg-[#E63946] rounded-2xl p-10 w-full max-w-lg text-white shadow-xl z-10">
        <h1 className="text-4xl font-bold text-center mb-8">
          FriseServicePublic
        </h1>
        <div className="space-y-6">
          {/* Nombre de joueurs */}
          <div>
            <label className="text-lg font-medium mb-2 flex items-center gap-2">
              Nombre de joueurs
              <FontAwesomeIcon icon={faUsers} />
            </label>
            <input
              type="number"
              placeholder="Ex: 2"
              className="w-full p-3 rounded-md bg-white text-black text-lg focus:outline-none"
              value={nbPlayers ?? ""}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (isNaN(value) || e.target.value === "") {
                  setNbPlayers(null);
                } else if (value >= 1) {
                  setNbPlayers(value);
                }
              }}
              min="1"
            />
          </div>

          {/* Nombre de points */}
          <div>
            <label className="block text-lg font-medium mb-2 flex items-center gap-2">
              Points de vie
              <FontAwesomeIcon icon={faTrophy} />
            </label>
            <input
              type="number"
              placeholder="Ex: 10"
              className="w-full p-3 rounded-md bg-white text-black text-lg focus:outline-none"
              value={nbPoints ?? ""}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (isNaN(value) || e.target.value === "") {
                  setNbPoints(null);
                } else if (value >= 1) {
                  setNbPoints(value);
                }
              }}
              min="1"
            />
          </div>

          {error && (
            <div className="text-white font-semibold">
              <p className="text-center">{error}</p>
            </div>
          )}

          {/* Bouton Démarrer la partie */}
          <button
            onClick={handleStart}
            className="w-full bg-[#2D2DA0] hover:bg-[#1c1c80] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-3 mt-6 text-lg cursor-pointer transform transition-transform duration-300 hover:scale-105"
          >
            <FontAwesomeIcon icon={faPlay} />
            Démarrer la partie
          </button>
        </div>
      </div>

      {/* Slogan */}
      <p className="mt-8 text-gray-600 text-sm text-center italic z-10">
        “Rétablis l'histoire dans le bon ordre !”
      </p>

      {/* Icônes supplémentaires en bas */}
      <div className="absolute bottom-20 flex gap-6">
        <FontAwesomeIcon
          icon={faBalanceScale}
          className="text-3xl text-[#2D2DA0]"
        />
        <FontAwesomeIcon
          icon={faHeartbeat}
          className="text-3xl text-[#2D2DA0]"
        />
        <FontAwesomeIcon icon={faHouse} className="text-3xl text-[#2D2DA0]" />
        <FontAwesomeIcon
          icon={faGraduationCap}
          className="text-3xl text-[#2D2DA0]"
        />
        <FontAwesomeIcon
          icon={faShieldHalved}
          className="text-3xl text-[#2D2DA0]"
        />
      </div>
    </div>
  );
}

export default Accueil;
