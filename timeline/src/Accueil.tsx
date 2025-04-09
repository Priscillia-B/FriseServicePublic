import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlay,
  faUsers, 
  faTrophy, 
  faBalanceScale, 
  faHeartbeat, 
  faHouse, 
  faGraduationCap, 
  faShieldHalved 
} from '@fortawesome/free-solid-svg-icons';
import "tailwindcss";

function Accueil() {
  const [nbPlayers, setNbPlayers] = useState<number | null>(null);
  const [nbPoints, setNbPoints] = useState<number | null>(null);

  const handleStart = () => {
    console.log("Nombre de joueurs :", nbPlayers);
    console.log("Points pour gagner :", nbPoints);
  };

  return (
    <div className="relative h-screen w-screen bg-gradient-to-b from-[#E5ECF4] to-[#cfd8e8] flex flex-col items-center justify-center font-sans overflow-hidden">

      {/* Watermark géant */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -rotate-12 text-[140px] font-bold text-[#2D2DA0] opacity-5 select-none pointer-events-none z-0">
        Republik’Line
      </div>

      {/* Icône décorative */}
      <div className="absolute bottom-10 left-10 opacity-10 text-[80px] text-[#2D2DA0] select-none pointer-events-none z-0">
        ⚖️
      </div>

      {/* Carte d'accueil */}
      <div className="bg-[#E63946] rounded-2xl p-10 w-full max-w-lg text-white shadow-xl z-10">
        <h1 className="text-4xl font-bold text-center mb-8">Republik’Line</h1>

        <div className="space-y-6">
          {/* Nombre de joueurs */}
          <div>
            <label className="block text-lg font-medium mb-2 flex items-center gap-2">
              Nombre de joueurs
              <FontAwesomeIcon icon={faUsers} />
            </label>
            <select
              className="w-full p-3 rounded-md bg-white text-black border-none text-lg focus:outline-none"
              onChange={(e) => setNbPlayers(parseInt(e.target.value))}
              defaultValue=""
            >
              <option value="" disabled>Choisir...</option>
              {[2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n} joueur{n > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Nombre de points */}
          <div>
            <label className="block text-lg font-medium mb-2 flex items-center gap-2">
              Points pour gagner
              <FontAwesomeIcon icon={faTrophy} />
            </label>
            <input
              type="number"
              placeholder="Ex: 10"
              className="w-full p-3 rounded-md bg-white text-black border-none text-lg focus:outline-none"
              value={nbPoints ?? ''}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value >= 1 || isNaN(value)) {
                  setNbPoints(value);
                }
              }}
              min="1"
            />
          </div>

          {/* Bouton Start */}
          <button
            onClick={handleStart}
            className="w-full bg-[#2D2DA0] hover:bg-[#1c1c80] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-3 mt-6 text-lg cursor-pointer transform transition-transform duration-300 hover:scale-105"
          >
            <FontAwesomeIcon icon={faPlay} />
            Démarrer la partie
          </button>
        </div>
      </div>

      {/* Slogan en bas */}
      <p className="mt-8 text-gray-600 text-sm text-center italic z-10">
        “Rétablis l'histoire dans le bon ordre !”
      </p>

      {/* Icônes supplémentaires en bas */}
      <div className="absolute bottom-20 flex gap-6">
        <FontAwesomeIcon icon={faBalanceScale} className="text-3xl text-[#2D2DA0]" />
        <FontAwesomeIcon icon={faHeartbeat} className="text-3xl text-[#2D2DA0]" />
        <FontAwesomeIcon icon={faHouse} className="text-3xl text-[#2D2DA0]" />
        <FontAwesomeIcon icon={faGraduationCap} className="text-3xl text-[#2D2DA0]" />
        <FontAwesomeIcon icon={faShieldHalved} className="text-3xl text-[#2D2DA0]" />
      </div>
    </div>
  );
}

export default Accueil;
