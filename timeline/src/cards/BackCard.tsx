import React from "react";
import { Carte } from "../types";

export default function BackCard({ card }: { card: Carte }) {
  return (
    <div className="relative bg-[#E63946] rounded-2xl shadow-lg  pb-8 text-black flex flex-col justify-start gap-2 text-sm w-48 h-52 text-center">
      <div className="bg-[#2D2DA0] font-semibold rounded-t-2xl py-2 text-white w-full absolute top-0 border-b border-[#E5ECF4]">
        {card.thematique}
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 text-xl font-bold text-white break-word">
        {card.titre}
      </div>
    </div>
  );
}
