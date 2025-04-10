// src/pages/Game.tsx
import React, { useState, useEffect, useRef } from 'react';
import fetchData from './api';
import { Carte } from './types';
import { TimelineBoard } from './components/TimelineBoard';

export default function Game() {
  const [deck, setDeck] = useState<Carte[]>([]);
  const [placedCards, setPlacedCards] = useState<Carte[]>([]);
  const [tempPlaced, setTempPlaced] = useState<Carte[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // Temporaire (peut-être)
  const hasPlacedCard = useRef(false);

  useEffect(() => {
    fetchData().then((data) => {
      console.log("Data fetched:", data);
      setDeck(data);
      setCurrentCardIndex(Math.floor(Math.random() * data.length));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (deck.length > 0 && !hasPlacedCard.current) {
      placedCards.push(getCurrentCard());
      placeCard(0);
      hasPlacedCard.current = true;
      }
  }, [deck]);

  //Fonction qui prend un index de carte, et transfert la carte actuelle du deck vers placedCards à l'emplacement de l'index
  const placeCard = (indexTo: number) => {
    const cardToPlace = deck[currentCardIndex];
    /*const newDeck = [...deck];
    newDeck.splice(currentCardIndex, 1);
    setDeck(newDeck);*/

    const newPlacedCards = [...placedCards];
    if (indexTo >= newPlacedCards.length) {
      newPlacedCards.push(cardToPlace);
    } else {
      newPlacedCards.splice(indexTo, 0, cardToPlace);
    }
    setTempPlaced(newPlacedCards);
    //setCurrentCardIndex(Math.floor(Math.random() * newDeck.length));
  }

  //Fonction pour récupérer la carte en cours
  const getCurrentCard = () => {
      return deck[currentCardIndex];
  }
    

  return (
    <div className="flex flex-col items-center bg-white min-h-screen pt-12 pb-40">
      {loading ? (
        <h1 className="text-3xl font-bold mb-8">Chargement...</h1>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-8">Jeu TimeLine</h1>
          <TimelineBoard cards={tempPlaced} onClick={placeCard} />
        </>
      )}
    </div>
  );
}
