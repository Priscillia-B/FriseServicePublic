import { Carte } from "../../types";

export default function BackCard({ card }: { card: Carte }) {
  return (
    <div className="relative bg-[#E63946] rounded-2xl shadow-lg text-black flex flex-col justify-start gap-2 text-sm w-52 h-60 text-center group">
      <div className="bg-[#2D2DA0] font-semibold rounded-t-2xl py-2 text-white w-full absolute top-0 border-b border-[#E5ECF4] truncate">
        {card.thematique}
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 my-3 px-4 text-base font-bold text-white break-word limit-lines2 whitespace-normal truncate">
        {card.titre}
      </div>

      <div className="tooltip absolute left-full top-1/2 transform -translate-y-1/2 ml-2 bg-black text-white text-sm p-2 rounded-md w-max whitespace-normal opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
        {card.titre}
      </div>
    </div>
  );
}
