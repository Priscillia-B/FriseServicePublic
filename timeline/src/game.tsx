// src/pages/Game.tsx
import React, { useState, useEffect } from 'react';
import { TimelineBoard } from './components/TimelineBoard';
import { Carte } from './types';
import fetchData from './api'; // Assurez-vous que le chemin est correct

export default function Game() {
  const [cards, setCards] = useState<Carte[]>([]);

  useEffect(() => {
    fetchData()
      .then((data) => {
        setCards(data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des cartes:', error);
      });
  }, []);

  return (
    // Le padding top déplace le contenu vers le haut et le padding bottom laisse de l'espace en bas
    <div className="flex flex-col items-center bg-white min-h-screen pt-12 pb-40">
      <h1 className="text-3xl font-bold mb-8">Jeu TimeLine</h1>
      
      {/* Affichage de toutes les cartes récupérées via fetchData */}
      <TimelineBoard cards={cards} />
    </div>
  );
}
