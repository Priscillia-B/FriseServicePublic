import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import "tailwindcss";

function Accueil() {
  const [nbPlayers, setNbPlayers] = useState<number | null>(null);
  const [nbPoints, setNbPoints] = useState<number | null>(null);

  const handleStart = () => {
    console.log("Nombre de joueurs :", nbPlayers);
    console.log("Points pour gagner :", nbPoints);
  };

  return (
    <div className="h-screen w-screen bg-[#E63946] flex items-center justify-center font-sans ">
      <div className="bg-[#E63946] rounded-2xl p-8 w-full max-w-lg text-white shadow-xl ">
        <h1 className="text-4xl font-bold text-center mb-8">Republik’Line</h1>

        <div className="space-y-6">
          {/* Nombre de joueurs */}
          <div>
            <label className="block text-lg font-medium mb-2">Nombre de joueurs</label>
            <select
              className="w-full p-3 rounded-md bg-white text-black border-none text-lg focus:outline-none"
              onChange={(e) => setNbPlayers(parseInt(e.target.value))}
              defaultValue=""
            >
              <option value="" disabled>Choisir...</option>
              {[2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>{n} joueur{n > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          {/* Nombre de points */}
          <div>
            <label className="block text-lg font-medium mb-2">Points pour gagner</label>
            <input
              type="number"
              placeholder="Ex: 10"
              className="w-full p-3 rounded-md bg-white text-black border-none text-lg focus:outline-none"
              value={nbPoints ?? ''}
              onChange={(e) => setNbPoints(parseInt(e.target.value))}
            />
          </div>

          {/* Bouton Start */}
          <button
            onClick={handleStart}
            className="w-full bg-[#2D2DA0] hover:bg-[#1c1c80] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-3 mt-6 text-lg"
          >
            <FontAwesomeIcon icon={faPlay} />
            Démarrer la partie
          </button>
        </div>
      </div>
    </div>
  );
}

export default Accueil;
