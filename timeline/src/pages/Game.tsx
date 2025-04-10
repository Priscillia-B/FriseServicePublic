// src/pages/Game.tsx
import { useState, useEffect, useRef } from "react";
import fetchData from "../api";
import { Carte } from "../types";
import { TimelineBoard } from "../components/TimelineBoard";
import Modal from "../components/modals/Modal";
import ExitGameModal from "../components/modals/ExitGameModal";

export default function Game() {
  const [deck, setDeck] = useState<Carte[]>([]);
  const [placedCards, setPlacedCards] = useState<Carte[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [exitOpen, setExitOpen] = useState(false);

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
      placeCard(0);
      hasPlacedCard.current = true;
    }
  }, [deck]);

  //Fonction qui prend deux index de carte, et transfert la carte du premier index du deck vers placedCards à l'emplacement du second index
  const placeCard = (indexTo: number) => {
    const cardToPlace = deck[currentCardIndex];
    const newDeck = [...deck];
    newDeck.splice(currentCardIndex, 1);
    setDeck(newDeck);

    const newPlacedCards = [...placedCards];
    if (indexTo >= newPlacedCards.length) {
      newPlacedCards.push(cardToPlace);
    } else {
      newPlacedCards.splice(indexTo, 0, cardToPlace);
    }
    setPlacedCards(newPlacedCards);
  };

  //Fonction pour récupérer la carte en cours
  const getCurrentCard = () => {
    if (deck.length > 0) {
      return deck[currentCardIndex];
    }
    return null;
  };

  return (
    // Le padding top déplace le contenu vers le haut et le padding bottom laisse de l'espace en bas
    <div className="flex flex-col items-center bg-white min-h-screen pt-12 pb-40">
      <h1 className="text-3xl font-bold mb-8">Jeu TimeLine</h1>

      {/* TimelineBoard */}
      <TimelineBoard cards={placedCards} onClick={placeCard} />

      <button
        className="absolute top-0 left-0 text-white font-semibold bg-red-500 py-1 px-2 rounded m-4 cursor-pointer"
        onClick={() => setExitOpen(true)}
      >
        Quitter la partie
      </button>

      {exitOpen && (
        <Modal>
          <ExitGameModal setExitOpen={setExitOpen} />
        </Modal>
      )}
    </div>
  );
}
