// src/cards/FrontCard.tsx
import React from 'react';
import { Carte } from '../types';

export default function FrontCard({ card }: { card: Carte }) {
  return (
    <div className="bg-[#E5ECF4] rounded-2xl shadow-lg pb-8 text-black flex flex-col items-center justify-center gap-2 text-sm w-64">
      <div className="bg-[#2D2DA0] font-semibold rounded-3xl py-1 text-white w-full text-center">
        {card.thematique}
      </div>

      <div className="bg-[#E63946] font-semibold rounded-2xl py-1 mb-4 text-white w-16 text-center">
        {card.date}
      </div>

      <p className="text-xl font-bold text-center mb-4 text-[#E63946] break-words">
        {card.titre}
      </p>

      <p className="italic text-[#E63946]">{card.type}</p>
    </div>
  );
}
