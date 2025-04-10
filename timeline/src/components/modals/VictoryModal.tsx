import { useNavigate } from "react-router-dom";

export default function VictoryModal({ winnerId }: { winnerId: number }) {
  const navigate = useNavigate();
  return (
    <div className="bg-[#E5ECF4] h-2/5 w-2/5 rounded-2xl shadow-xl p-6 text-center flex items-center justify-center">
      <div>
        <h2 className="text-5xl font-semibold text-[#2D2DA0] mb-4">
          Victoire !
        </h2>
        <p className="text-2xl font-bold text-[#E63946]">
          Le joueur {winnerId} a gagné !
        </p>
        <button
          className="mt-12 bg-[#2D2DA0] text-white px-4 py-2 rounded-full hover:bg-[#1c1c80] cursor-pointer transform transition-transform duration-300 hover:scale-105"
          onClick={() => navigate("/")}
        >
          Retour au menu
        </button>
      </div>
    </div>
  );
}
