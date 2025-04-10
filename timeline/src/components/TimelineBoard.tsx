// src/components/TimelineBoard.tsx
import React from "react";
import { Carte } from "../types";
import FrontCard from "./cards/FrontCard.tsx";

interface TimelineBoardProps {
  cards: Carte[];
}

export const TimelineBoard: React.FC<TimelineBoardProps> = ({ cards }) => {
  return (
    <div className="flex items-center justify-center bg-gray-200 rounded border border-gray-400 p-4">
      {cards.map((card) => (
        <FrontCard card={card} />
      ))}
    </div>
  );
};
