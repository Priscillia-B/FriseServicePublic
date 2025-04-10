// src/components/TimelineBoard.tsx
import React from 'react';
import { Carte } from '../types';
import FrontCard from './cards/FrontCard';
import BackCard from './cards/BackCard';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TimelineBoardProps {
  cards: Carte[];
  onTempClick: (indexTo: number) => void;
  currentCard: Carte;
  tempIndex?: number;
}

export const TimelineBoard: React.FC<TimelineBoardProps> = ({ cards, onTempClick, currentCard, tempIndex }) => {
  return (
      <div
      className="
        w-full
        max-w-[1800px]
        min-h-[10rem] /* Réduit la hauteur du composant */
        h-auto /* Hauteur auto pour que ça s'adapte à son contenu */
        mx-auto
        overflow-x-auto
        overflow-y-hidden
        bg-[#cfd8e8]
        p-4
        flex
        items-center /* Centrer verticalement le contenu */
      "
    >
      <div className="flex space-x-4 whitespace-nowrap items-center">
        {cards.map((card, i) => (<>
          <PlaceButton key={i + 1000} to={i} onClick={onTempClick} />
          {tempIndex !== undefined && tempIndex === i && (
            <BackCard key={i + 500} card={currentCard} />
          )}
          <FrontCard key={card.id} card={card} />
        </>
        ))}
        {tempIndex !== undefined && tempIndex === cards.length && (
          <BackCard key="tempCard-end" card={currentCard} />
        )}
        <PlaceButton key={999} to={cards.length} onClick={onTempClick} />
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
        className="bg-blue-500 text-white p-3 rounded-full flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-blue-400 cursor-pointer"
        style={{ width: '40px', height: '40px' }} /* Taille réduite du bouton */
      >
        <FontAwesomeIcon icon={faPlus} className="text-white text-lg" />
      </button>
    );
  }
};

