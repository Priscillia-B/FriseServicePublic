import React from "react";
import { useNavigate } from "react-router-dom";

export default function ExitGameLoopModal({
  setExitOpen,
}: {
  setExitOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  return (
    <div className="bg-white p-4 rounded-lg shadow-xl">
      <p className="text-gray-900 text-lg font-bold">
        Voulez-vous vraiment quitter la partie ?
      </p>
      <div className="flex justify-center mt-4">
        <button
          className="mr-2 bg-red-500 text-white font-semibold cursor-pointer px-4 py-2 rounded-lg"
          onClick={() => setExitOpen(false)}
        >
          Annuler
        </button>
        <button
          className="bg-green-500 text-white font-semibold cursor-pointer px-4 py-2 rounded-lg"
          onClick={() => navigate("/")}
        >
          Valider
        </button>
      </div>
    </div>
  );
}
