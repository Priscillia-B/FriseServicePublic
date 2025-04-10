import { useEffect, useState } from "react";
import { Carte } from "../../types";

export default function DetailsCardModal({
  card,
  onClose,
}: {
  card: Carte;
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Délai léger pour déclencher l'animation
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-opacity-30 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className={`
          bg-[#E5ECF4] rounded-2xl p-6 w-full max-w-md text-black shadow-xl
          transform transition-all duration-300 ease-out
          ${visible ? "scale-100 opacity-100" : "scale-90 opacity-0"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-[#2D2DA0] mb-1 whitespace-normal break-words">
          {card.thematique}
        </h2>


        <hr className="text-[#2D2DA0] mb-3"></hr>
        <h2 className="text-lg font-semibold text-[#E63946] mb-4 whitespace-normal break-words">
          {card.titre}
        </h2>

        <p className="font-semibold mt-6 text-[#2D2DA0] text-lg">Description</p>

        <p className="text-base font-medium text-[#2D2DA0] whitespace-normal break-words">
          {card.detail}
        </p>

        <button
          onClick={onClose}
          className="mt-6 bg-[#E63946] font-bold text-white px-4 py-2 rounded-full hover:bg-red-600 transition cursor-pointer hover:scale-105"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}
