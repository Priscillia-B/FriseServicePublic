// src/components/TimelineBoard.tsx
import React from 'react';
import { Carte } from '../types';
import FrontCard from '../cards/FrontCard';

interface TimelineBoardProps {
  cards: Carte[];
  onClick: (indexTo: number) => void;
}

export const TimelineBoard: React.FC<TimelineBoardProps> = ({ cards, onClick }) => {
  return (
    <div
      className="
        /* Largeur à ~90% de l'écran, mais limitée à 1200px de large */
        w-[100%]
        max-w-[1800px]
        /* Hauteur fixe, par exemple 22rem (~352px) si tu veux */
        h-[22rem]
        mx-auto           /* centre le conteneur */
        overflow-x-auto   /* scroll horizontal */
        overflow-y-hidden /* pas de scroll vertical */
        bg-gray-200
        rounded
        border
        border-gray-400
        p-4
        flex
        items-start
      "
    >
      <div className="flex space-x-4 whitespace-nowrap">
        {cards.map((card, i) => ( <>
            <PlaceButton key={i+1000} to={i} onClick={onClick} />
            <FrontCard key={card.id} card={card} />
            </>
        ))}
        <PlaceButton key={1000} to={cards.length} onClick={onClick} />
      </div>
    </div>
  );

  interface PlaceButtonProps {
    to: number;
    onClick: (indexTo: number) => void;
  }

  function PlaceButton({ to, onClick }: PlaceButtonProps) {
    return (
      <button
        onClick={() => onClick(to)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      > + </button>
    );
  }
};
