import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ExitGameLoopModal({
  setExitOpen,
}: {
  setExitOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Lance l'effet après le montage
    setTimeout(() => setVisible(true), 10);
  }, []);

  return (
    <div
      className={`
        bg-white p-4 rounded-lg shadow-xl
        transform transition-all duration-300 ease-out
        ${visible ? "scale-100 opacity-100" : "scale-90 opacity-0"}
      `}
    >
      <p className="text-gray-900 text-lg font-bold">
        Voulez-vous vraiment quitter la partie ?
      </p>
      <div className="flex justify-center mt-4">
        <button
          className="mr-2 bg-red-500 text-white font-semibold cursor-pointer px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 hover:scale-105"
          onClick={() => setExitOpen(false)}
        >
          Annuler
        </button>
        <button
          className="bg-green-500 text-white font-semibold cursor-pointer px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 hover:scale-105"
          onClick={() => navigate("/")}
        >
          Valider
        </button>
      </div>
    </div>
  );
}
