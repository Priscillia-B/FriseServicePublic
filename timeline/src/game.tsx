// src/pages/Game.tsx
import React, { useState, useEffect } from 'react';
import fetchData from './api';
import { Carte } from './types';
import { TimelineBoard } from './components/TimelineBoard';

export default function Game() {
  const [cards, setCards] = useState<Carte[]>([]);

  // Exemple de fetch asynchrone (si tu utilises fetchData)
  useEffect(() => {
    fetchData().then((data) => {
      setCards(data);
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-3xl font-bold mb-8">Jeu TimeLine</h1>
      
      {/* TimelineBoard */}
      <TimelineBoard cards={cards} />
    </div>
  );
}
