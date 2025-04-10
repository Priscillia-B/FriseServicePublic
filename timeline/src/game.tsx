// src/pages/Game.tsx
import React, { useState, useEffect, useRef } from 'react';
import fetchData from './api';
import { Carte } from './types';
import { TimelineBoard } from './components/TimelineBoard';
import { Carte } from './types';
import fetchData from './api'; // Assurez-vous que le chemin est correct

export default function Game() {
  const [deck, setDeck] = useState<Carte[]>([]);
  const [placedCards, setPlacedCards] = useState<Carte[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);

  // Temporaire (peut-être)
  const hasPlacedCard = useRef(false);

  useEffect(() => {
    fetchData().then((data) => {
      console.log("Data fetched:", data);
      setDeck(data);
      setCurrentCardIndex(Math.floor(Math.random() * data.length));
    });
  }, []);

  useEffect(() => {
    if (deck.length > 0 && !hasPlacedCard.current) {
      placeCard(currentCardIndex, 0);
      hasPlacedCard.current = true;
      }
  }, [deck]);

  //Fonction qui prend deux index de carte, et transfert la carte du premier index du deck vers placedCards à l'emplacement du second index
  const placeCard = (indexFrom: number, indexTo: number) => {
    const cardToPlace = deck[indexFrom];
    const newDeck = [...deck];
    newDeck.splice(indexFrom, 1);
    setDeck(newDeck);

    const newPlacedCards = [...placedCards];
    if (indexTo >= newPlacedCards.length) {
      newPlacedCards.push(cardToPlace);
    } else {
      newPlacedCards.splice(indexTo, 0, cardToPlace);
    }
    setPlacedCards(newPlacedCards);
  }

  //Fonction pour récupérer la carte en cours
  const getCurrentCard = () => {
    if (deck.length > 0) {
      return deck[currentCardIndex];
    }
    return null;
  }
    

  return (
    // Le padding top déplace le contenu vers le haut et le padding bottom laisse de l'espace en bas
    <div className="flex flex-col items-center bg-white min-h-screen pt-12 pb-40">
      <h1 className="text-3xl font-bold mb-8">Jeu TimeLine</h1>
      
      {/* TimelineBoard */}
      <TimelineBoard cards={placedCards} />
    </div>
  );
}
